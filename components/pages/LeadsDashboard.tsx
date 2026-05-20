"use client";

// ==========================================================================
// ON THE GO MOVING — Leads Dashboard
// Client-side admin page that fetches form submissions from the
// /.netlify/functions/get-leads proxy and displays them ranked by source page.
//
// Access: /admin/leads/?key=otgm-admin-2025
// The ?key= param is passed to the Netlify Function for auth.
// ==========================================================================

import { useState, useEffect, useCallback } from "react";
import {
  BarChart2,
  RefreshCw,
  Lock,
  Users,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  Calendar,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Download,
  Trash2,
  AlertTriangle,
  Filter,
  DollarSign,
  CheckCircle2,
  XCircle,
  Clock,
  Briefcase,
} from "lucide-react";

interface Lead {
  id: string;
  createdAt: string;
  fullName: string;
  phone: string;
  email: string;
  moveDate: string;
  zipFrom: string;
  zipTo: string;
  moveType: string;
  moveSize: string;
  wantsStorage: string;
  sourcePage: string;
  sourceLabel: string;
  referrer?: string;
  ip?: string;
  userAgent?: string;
  webhookStatus?: string;
  // Supermove sync fields
  smProjectId?: string | null;
  smProjectNumber?: string | null;
  smStage?: string | null;
  smBookingStatus?: string | null;
  smTotalRevenue?: string | null;
  smCoordinator?: string | null;
  smSalesperson?: string | null;
  smIsCancelled?: boolean;
  smMoveDate?: string | null;
  smLastSyncedAt?: string | null;
  source?: string;
}

interface SourceGroup {
  sourcePage: string;
  count: number;
  leads: Lead[];
}

const ADMIN_KEY_STORAGE = "otgm_admin_key";
const DAYS_OPTIONS = [
  { label: "Last 30 days", value: 30 },
  { label: "Last 60 days", value: 60 },
  { label: "Last 90 days", value: 90 },
  { label: "Last 365 days", value: 365 },
];

function formatDate(iso: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatTime(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}

function formatCurrency(val: string | null | undefined): string {
  if (!val) return "$0";
  const n = parseFloat(String(val).replace(/[$,]/g, ""));
  if (isNaN(n)) return "$0";
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function parseCurrency(val: string | null | undefined): number {
  if (!val) return 0;
  const n = parseFloat(String(val).replace(/[$,]/g, ""));
  return isNaN(n) ? 0 : n;
}

function moveTypeBadge(type: string) {
  const map: Record<string, string> = {
    apartment: "bg-blue-100 text-blue-700",
    house: "bg-green-100 text-green-700",
    commercial: "bg-purple-100 text-purple-700",
  };
  return map[type] || "bg-gray-100 text-gray-600";
}

function stageBadgeClass(lead: Lead): string {
  if (lead.smIsCancelled || lead.smStage === "Cancelled") return "bg-red-100 text-red-700";
  if (lead.smStage === "Completed") return "bg-emerald-100 text-emerald-700";
  if (lead.smStage === "Booked") return "bg-green-100 text-green-700";
  if (lead.smStage === "On Hold") return "bg-yellow-100 text-yellow-700";
  if (lead.smStage === "New") return "bg-blue-100 text-blue-700";
  return "bg-gray-100 text-gray-500";
}

/** Returns true if a lead is a test entry (name or email contains "test") */
function isTestLead(lead: Lead): boolean {
  const lower = (s: string) => (s || "").toLowerCase();
  return lower(lead.fullName).includes("test") || lower(lead.email).includes("test");
}

/** Convert a YYYY-MM-DD string to start-of-day Date */
function dateFromInput(val: string): Date | null {
  if (!val) return null;
  const d = new Date(val + "T00:00:00");
  return isNaN(d.getTime()) ? null : d;
}

/** Convert a YYYY-MM-DD string to end-of-day Date */
function dateToInput(val: string): Date | null {
  if (!val) return null;
  const d = new Date(val + "T23:59:59");
  return isNaN(d.getTime()) ? null : d;
}

export default function LeadsDashboard() {
  const [adminKey, setAdminKey] = useState("");
  const [keyInput, setKeyInput] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastFetched, setLastFetched] = useState<Date | null>(null);
  const [expandedSource, setExpandedSource] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"bySource" | "allLeads" | "supermove">("bySource");
  const [sortField, setSortField] = useState<"createdAt" | "fullName" | "sourcePage">("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [filterMoveType, setFilterMoveType] = useState("");
  const [daysWindow, setDaysWindow] = useState(365);

  // Date-range filter state (YYYY-MM-DD strings for <input type="date">)
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Auto-delete test leads state
  const [deletingTests, setDeletingTests] = useState(false);
  const [deleteResult, setDeleteResult] = useState<{ deleted: number; failed: number } | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Load saved key from sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem(ADMIN_KEY_STORAGE);
    if (saved) setAdminKey(saved);
  }, []);

  const fetchLeads = useCallback(async (key: string, days = 365) => {
    setLoading(true);
    setError("");
    setDeleteResult(null);
    try {
      const res = await fetch(
        `/.netlify/functions/get-leads?key=${encodeURIComponent(key)}&per_page=200&days=${days}`
      );
      if (res.status === 401) {
        setError("Invalid admin key. Please try again.");
        setAdminKey("");
        sessionStorage.removeItem(ADMIN_KEY_STORAGE);
        return;
      }
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      setLeads(data.submissions || []);
      setLastFetched(new Date());
    } catch (err: any) {
      setError(err.message || "Failed to load leads.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-fetch when key is set
  useEffect(() => {
    if (adminKey) fetchLeads(adminKey, daysWindow);
  }, [adminKey, daysWindow, fetchLeads]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem(ADMIN_KEY_STORAGE, keyInput);
    setAdminKey(keyInput);
  };

  // ── Date-range filtering ──────────────────────────────────────────────────
  const applyDateRange = (lead: Lead): boolean => {
    const created = new Date(lead.createdAt);
    const from = dateFromInput(dateFrom);
    const to = dateToInput(dateTo);
    if (from && created < from) return false;
    if (to && created > to) return false;
    return true;
  };

  // All leads after date-range filter
  const dateFilteredLeads = leads.filter(applyDateRange);

  // Group leads by source page (date-filtered)
  const sourceGroups: SourceGroup[] = (() => {
    const map = new Map<string, Lead[]>();
    dateFilteredLeads.forEach((lead) => {
      const key = lead.sourcePage || "/";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(lead);
    });
    return Array.from(map.entries())
      .map(([sourcePage, ls]) => ({ sourcePage, count: ls.length, leads: ls }))
      .sort((a, b) => b.count - a.count);
  })();

  // ── Supermove stats (date-filtered) ──────────────────────────────────────
  const smLeads = dateFilteredLeads.filter((l) => l.smProjectNumber);
  const smByStage = smLeads.reduce<Record<string, Lead[]>>((acc, l) => {
    const stage = l.smIsCancelled ? "Cancelled" : (l.smStage || "Unknown");
    if (!acc[stage]) acc[stage] = [];
    acc[stage].push(l);
    return acc;
  }, {});

  const stageOrder = ["New", "On Hold", "Booked", "Completed", "Cancelled", "Unknown"];
  const stageColors: Record<string, string> = {
    New: "bg-blue-500",
    "On Hold": "bg-yellow-400",
    Booked: "bg-green-500",
    Completed: "bg-emerald-600",
    Cancelled: "bg-red-500",
    Unknown: "bg-gray-400",
  };
  const stageBg: Record<string, string> = {
    New: "bg-blue-50 border-blue-200",
    "On Hold": "bg-yellow-50 border-yellow-200",
    Booked: "bg-green-50 border-green-200",
    Completed: "bg-emerald-50 border-emerald-200",
    Cancelled: "bg-red-50 border-red-200",
    Unknown: "bg-gray-50 border-gray-200",
  };
  const stageText: Record<string, string> = {
    New: "text-blue-700",
    "On Hold": "text-yellow-700",
    Booked: "text-green-700",
    Completed: "text-emerald-700",
    Cancelled: "text-red-700",
    Unknown: "text-gray-600",
  };

  const totalRevenue = smLeads.reduce((s, l) => s + parseCurrency(l.smTotalRevenue), 0);
  const bookedRevenue = (smByStage["Booked"] || []).reduce((s, l) => s + parseCurrency(l.smTotalRevenue), 0);
  const completedRevenue = (smByStage["Completed"] || []).reduce((s, l) => s + parseCurrency(l.smTotalRevenue), 0);
  const cancelledRevenue = (smByStage["Cancelled"] || []).reduce((s, l) => s + parseCurrency(l.smTotalRevenue), 0);
  const conversionRate = dateFilteredLeads.length > 0
    ? Math.round(((smByStage["Booked"]?.length || 0) + (smByStage["Completed"]?.length || 0)) / dateFilteredLeads.length * 100)
    : 0;

  // Stats (date-filtered)
  const totalLeads = dateFilteredLeads.length;
  const thisWeek = dateFilteredLeads.filter((l) => {
    const d = new Date(l.createdAt);
    const now = new Date();
    const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  }).length;
  const moveTypes = ["apartment", "house", "commercial"];
  const moveTypeCounts = moveTypes.map((t) => ({
    type: t,
    count: dateFilteredLeads.filter((l) => l.moveType === t).length,
  }));

  // Filtered + sorted leads for the all-leads tab
  const filteredLeads = dateFilteredLeads
    .filter((l) => !filterMoveType || l.moveType === filterMoveType)
    .sort((a, b) => {
      const va = a[sortField] || "";
      const vb = b[sortField] || "";
      return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
    });

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("desc"); }
  };

  // Export CSV
  const exportCSV = () => {
    const headers = ["Date", "Name", "Phone", "Email", "Move Date", "From", "To", "Type", "Size", "Source Page", "Source Label", "SM Project", "SM Stage", "SM Revenue"];
    const rows = dateFilteredLeads.map((l) => [
      formatDate(l.createdAt),
      l.fullName,
      l.phone,
      l.email,
      l.moveDate,
      l.zipFrom,
      l.zipTo,
      l.moveType,
      l.moveSize,
      l.sourcePage,
      l.sourceLabel,
      l.smProjectNumber || "",
      l.smStage || "",
      l.smTotalRevenue || "",
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${(c || "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const suffix = dateFrom || dateTo
      ? `_${dateFrom || "start"}_to_${dateTo || "end"}`
      : `_${new Date().toISOString().slice(0, 10)}`;
    a.download = `otgm-leads${suffix}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Auto-delete test leads ────────────────────────────────────────────────
  const testLeads = leads.filter(isTestLead);

  const handleDeleteTestLeads = async () => {
    setShowDeleteConfirm(false);
    setDeletingTests(true);
    setDeleteResult(null);

    let deleted = 0;
    let failed = 0;

    for (const lead of testLeads) {
      try {
        const res = await fetch(
          `/.netlify/functions/delete-lead?key=${encodeURIComponent(adminKey)}&id=${encodeURIComponent(lead.id)}`,
          { method: "POST" }
        );
        const data = await res.json().catch(() => ({}));
        if (res.ok && data.success) {
          deleted++;
        } else {
          console.error("Delete failed for", lead.id, data);
          failed++;
        }
      } catch {
        failed++;
      }
    }

    setDeleteResult({ deleted, failed });
    setDeletingTests(false);
    await fetchLeads(adminKey, daysWindow);
  };

  // ── Login Screen ──────────────────────────────────────────────────────────
  if (!adminKey) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#1e3a0f] flex items-center justify-center">
              <Lock size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Leads Dashboard</h1>
              <p className="text-xs text-gray-500">On The Go Moving — Admin</p>
            </div>
          </div>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Admin Key</label>
              <input
                type="password"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="Enter admin key"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#75aa11]/30 focus:border-[#75aa11]"
                autoFocus
              />
            </div>
            <button
              type="submit"
              disabled={!keyInput}
              className="w-full py-2.5 bg-[#1e3a0f] hover:bg-[#2a5015] text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-50"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Main Dashboard ────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1e3a0f] text-white px-4 sm:px-6 py-4 sticky top-0 z-10 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <BarChart2 size={22} />
            <div>
              <h1 className="text-lg font-bold">Leads Dashboard</h1>
              <p className="text-xs text-green-300">On The Go Moving & Storage</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Days window selector */}
            <select
              value={daysWindow}
              onChange={(e) => setDaysWindow(Number(e.target.value))}
              className="text-sm bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-3 py-1.5 text-white focus:outline-none cursor-pointer"
            >
              {DAYS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} className="text-gray-900 bg-white">
                  {o.label}
                </option>
              ))}
            </select>
            {lastFetched && (
              <span className="text-xs text-green-300 hidden sm:block">
                Updated {formatTime(lastFetched.toISOString())}
              </span>
            )}
            <button
              onClick={() => fetchLeads(adminKey, daysWindow)}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors disabled:opacity-50"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
            <button
              onClick={exportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#75aa11] hover:bg-[#5e8a0d] rounded-lg text-sm transition-colors"
              title="Export leads as CSV"
            >
              <Download size={14} />
              {dateFrom || dateTo ? `CSV (${totalLeads})` : "CSV"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* Error */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Delete result notification */}
        {deleteResult && (
          <div className={`p-4 rounded-xl text-sm border ${deleteResult.failed === 0 ? "bg-green-50 border-green-200 text-green-800" : "bg-yellow-50 border-yellow-200 text-yellow-800"}`}>
            {deleteResult.deleted > 0 && (
              <span>✓ Deleted {deleteResult.deleted} test lead{deleteResult.deleted !== 1 ? "s" : ""}. </span>
            )}
            {deleteResult.failed > 0 && (
              <span>⚠ {deleteResult.failed} deletion{deleteResult.failed !== 1 ? "s" : ""} failed.</span>
            )}
          </div>
        )}

        {/* ── Date Range Filter + Test Lead Cleanup ── */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex items-end gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                <Filter size={14} />
                Date Range
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400 font-medium">From</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#75aa11]/30 focus:border-[#75aa11]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400 font-medium">To</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#75aa11]/30 focus:border-[#75aa11]"
                />
              </div>
              {(dateFrom || dateTo) && (
                <button
                  onClick={() => { setDateFrom(""); setDateTo(""); }}
                  className="text-xs text-gray-400 hover:text-red-500 underline pb-1.5 transition-colors"
                >
                  Clear
                </button>
              )}
              {(dateFrom || dateTo) && (
                <div className="text-xs text-[#75aa11] font-semibold pb-1.5">
                  {totalLeads} lead{totalLeads !== 1 ? "s" : ""} in range
                </div>
              )}
            </div>

            <div className="flex-1" />

            {/* Auto-delete test leads */}
            <div className="flex items-center gap-3">
              {testLeads.length > 0 ? (
                <>
                  <span className="text-xs text-amber-600 font-medium flex items-center gap-1">
                    <AlertTriangle size={13} />
                    {testLeads.length} test lead{testLeads.length !== 1 ? "s" : ""} detected
                  </span>
                  {!showDeleteConfirm ? (
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      disabled={deletingTests}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                    >
                      <Trash2 size={13} />
                      Delete Test Leads
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-red-600 font-medium">Delete {testLeads.length} test leads?</span>
                      <button
                        onClick={handleDeleteTestLeads}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors"
                      >
                        Yes, delete
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Trash2 size={12} />
                  No test leads
                </span>
              )}
              {deletingTests && (
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <RefreshCw size={12} className="animate-spin" />
                  Deleting…
                </span>
              )}
            </div>
          </div>

          {/* Test leads preview */}
          {testLeads.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-400 mb-2">Test leads to be deleted:</p>
              <div className="flex flex-wrap gap-2">
                {testLeads.map((l) => (
                  <span key={l.id} className="text-xs bg-amber-50 border border-amber-200 text-amber-700 px-2 py-0.5 rounded-full">
                    {l.fullName || l.email || l.id}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Loading skeleton */}
        {loading && leads.length === 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-5 animate-pulse">
                <div className="h-3 bg-gray-200 rounded w-2/3 mb-3" />
                <div className="h-7 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* ── Top Stats Cards ── */}
        {(!loading || leads.length > 0) && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold mb-2">
                <Users size={14} />
                {dateFrom || dateTo ? "LEADS IN RANGE" : "TOTAL LEADS"}
              </div>
              <div className="text-3xl font-bold text-gray-900">{totalLeads}</div>
              {(dateFrom || dateTo) && (
                <div className="text-xs text-gray-400 mt-1">{leads.length} total</div>
              )}
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold mb-2">
                <TrendingUp size={14} />
                LAST 7 DAYS
              </div>
              <div className="text-3xl font-bold text-[#75aa11]">{thisWeek}</div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold mb-2">
                <CheckCircle2 size={14} />
                CONVERSION RATE
              </div>
              <div className="text-3xl font-bold text-gray-900">{conversionRate}%</div>
              <div className="text-xs text-gray-400 mt-1">booked + completed</div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold mb-2">
                <DollarSign size={14} />
                TOTAL QUOTED REV
              </div>
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(String(totalRevenue))}</div>
              <div className="text-xs text-gray-400 mt-1">{smLeads.length} synced jobs</div>
            </div>
          </div>
        )}

        {/* ── Supermove Job Status Panel ── */}
        {smLeads.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
              <Briefcase size={16} className="text-[#1e3a0f]" />
              <h2 className="text-sm font-semibold text-gray-800">Supermove Job Status</h2>
              <span className="ml-auto text-xs text-gray-400">{smLeads.length} synced jobs</span>
            </div>

            {/* Stage breakdown cards */}
            <div className="p-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {stageOrder.map((stage) => {
                const stageLeads = smByStage[stage] || [];
                if (stageLeads.length === 0) return null;
                const rev = stageLeads.reduce((s, l) => s + parseCurrency(l.smTotalRevenue), 0);
                return (
                  <div
                    key={stage}
                    className={`rounded-xl p-4 border ${stageBg[stage] || "bg-gray-50 border-gray-200"}`}
                  >
                    <div className={`text-xs font-semibold mb-1 ${stageText[stage] || "text-gray-600"}`}>
                      {stage}
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stageLeads.length}</div>
                    <div className={`text-xs font-medium mt-1 ${stageText[stage] || "text-gray-500"}`}>
                      {formatCurrency(String(rev))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Revenue summary row */}
            <div className="px-5 pb-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle2 size={20} className="text-green-600 flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-green-700">Booked Revenue</div>
                  <div className="text-xl font-bold text-green-800">{formatCurrency(String(bookedRevenue))}</div>
                  <div className="text-xs text-green-600">{smByStage["Booked"]?.length || 0} jobs</div>
                </div>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
                <DollarSign size={20} className="text-emerald-600 flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-emerald-700">Completed Revenue</div>
                  <div className="text-xl font-bold text-emerald-800">{formatCurrency(String(completedRevenue))}</div>
                  <div className="text-xs text-emerald-600">{smByStage["Completed"]?.length || 0} jobs</div>
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                <XCircle size={20} className="text-red-500 flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-red-700">Cancelled (Lost)</div>
                  <div className="text-xl font-bold text-red-800">{formatCurrency(String(cancelledRevenue))}</div>
                  <div className="text-xs text-red-600">{smByStage["Cancelled"]?.length || 0} jobs</div>
                </div>
              </div>
            </div>

            {/* Stage bar chart */}
            <div className="px-5 pb-5">
              <div className="text-xs font-semibold text-gray-500 mb-2">Stage Distribution</div>
              <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
                {stageOrder.map((stage) => {
                  const count = smByStage[stage]?.length || 0;
                  if (count === 0) return null;
                  const pct = Math.round((count / smLeads.length) * 100);
                  return (
                    <div
                      key={stage}
                      className={`${stageColors[stage] || "bg-gray-400"} transition-all`}
                      style={{ width: `${pct}%` }}
                      title={`${stage}: ${count} (${pct}%)`}
                    />
                  );
                })}
              </div>
              <div className="flex flex-wrap gap-3 mt-2">
                {stageOrder.map((stage) => {
                  const count = smByStage[stage]?.length || 0;
                  if (count === 0) return null;
                  return (
                    <div key={stage} className="flex items-center gap-1.5 text-xs text-gray-600">
                      <div className={`w-2.5 h-2.5 rounded-full ${stageColors[stage] || "bg-gray-400"}`} />
                      {stage} ({count})
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Move type breakdown */}
        {dateFilteredLeads.length > 0 && (
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Leads by Move Type</h2>
            <div className="flex flex-wrap gap-3">
              {moveTypeCounts.map(({ type, count }) => (
                <div key={type} className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${moveTypeBadge(type)}`}>
                    {type}
                  </span>
                  <span className="text-sm font-bold text-gray-800">{count}</span>
                  <span className="text-xs text-gray-400">
                    ({totalLeads ? Math.round((count / totalLeads) * 100) : 0}%)
                  </span>
                </div>
              ))}
              {dateFilteredLeads.filter((l) => !l.moveType).length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-500">
                    unknown
                  </span>
                  <span className="text-sm font-bold text-gray-800">
                    {dateFilteredLeads.filter((l) => !l.moveType).length}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tabs */}
        {dateFilteredLeads.length > 0 && (
          <>
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
              <button
                onClick={() => setActiveTab("bySource")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "bySource"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                By Source Page
              </button>
              <button
                onClick={() => setActiveTab("allLeads")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "allLeads"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                All Leads
              </button>
              <button
                onClick={() => setActiveTab("supermove")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "supermove"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Supermove Jobs
                {smLeads.length > 0 && (
                  <span className="ml-1.5 bg-[#75aa11] text-white text-xs px-1.5 py-0.5 rounded-full">
                    {smLeads.length}
                  </span>
                )}
              </button>
            </div>

            {/* By Source Page Tab */}
            {activeTab === "bySource" && (
              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Leads Ranked by Source Page
                </h2>
                {sourceGroups.map((group, idx) => {
                  const isExpanded = expandedSource === group.sourcePage;
                  const pct = totalLeads ? Math.round((group.count / totalLeads) * 100) : 0;
                  return (
                    <div
                      key={group.sourcePage}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedSource(isExpanded ? null : group.sourcePage)}
                        className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="w-7 h-7 rounded-full bg-[#1e3a0f] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {idx + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="font-mono text-sm text-gray-800 truncate">
                              {group.sourcePage}
                            </span>
                            <a
                              href={`https://onthegomoving.com${group.sourcePage}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-gray-400 hover:text-[#75aa11] flex-shrink-0"
                            >
                              <ExternalLink size={12} />
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#75aa11] rounded-full transition-all duration-500"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-400 w-8 text-right">{pct}%</span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-2xl font-bold text-gray-900">{group.count}</div>
                          <div className="text-xs text-gray-400">lead{group.count !== 1 ? "s" : ""}</div>
                        </div>
                        <div className="text-gray-400 flex-shrink-0">
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="border-t border-gray-100 divide-y divide-gray-50">
                          {group.leads
                            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                            .map((lead) => (
                              <div key={lead.id} className={`px-4 py-3 flex flex-wrap items-start gap-x-6 gap-y-1.5 ${isTestLead(lead) ? "bg-amber-50/60" : "bg-gray-50/50"}`}>
                                <div className="min-w-0">
                                  <div className="font-semibold text-sm text-gray-900 flex items-center gap-2">
                                    {lead.fullName || "—"}
                                    {isTestLead(lead) && (
                                      <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-medium">TEST</span>
                                    )}
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    {formatDate(lead.createdAt)} at {formatTime(lead.createdAt)}
                                  </div>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-600">
                                  <Phone size={11} />
                                  <a href={`tel:${lead.phone}`} className="hover:text-[#75aa11]">{lead.phone || "—"}</a>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-600">
                                  <Mail size={11} />
                                  <a href={`mailto:${lead.email}`} className="hover:text-[#75aa11]">{lead.email || "—"}</a>
                                </div>
                                {lead.moveType && (
                                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${moveTypeBadge(lead.moveType)}`}>
                                    {lead.moveType}
                                  </span>
                                )}
                                {lead.moveDate && (
                                  <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <Calendar size={11} />
                                    {lead.moveDate}
                                  </div>
                                )}
                                {(lead.zipFrom || lead.zipTo) && (
                                  <div className="text-xs text-gray-500">
                                    {lead.zipFrom} → {lead.zipTo}
                                  </div>
                                )}
                                {lead.smProjectNumber && (
                                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${stageBadgeClass(lead)}`}>
                                    #{lead.smProjectNumber} · {lead.smIsCancelled ? "Cancelled" : lead.smStage}
                                  </span>
                                )}
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* All Leads Tab */}
            {activeTab === "allLeads" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex flex-wrap items-center gap-3">
                  <span className="text-sm font-semibold text-gray-700">Filter:</span>
                  <select
                    value={filterMoveType}
                    onChange={(e) => setFilterMoveType(e.target.value)}
                    className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#75aa11]/30"
                  >
                    <option value="">All move types</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="commercial">Commercial</option>
                  </select>
                  <span className="text-xs text-gray-400 ml-auto">{filteredLeads.length} leads</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-left">
                        <th className="px-4 py-3 text-xs font-semibold text-gray-500 cursor-pointer hover:text-gray-800" onClick={() => handleSort("createdAt")}>
                          Date {sortField === "createdAt" && (sortDir === "desc" ? "↓" : "↑")}
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold text-gray-500 cursor-pointer hover:text-gray-800" onClick={() => handleSort("fullName")}>
                          Name {sortField === "fullName" && (sortDir === "desc" ? "↓" : "↑")}
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold text-gray-500">Contact</th>
                        <th className="px-4 py-3 text-xs font-semibold text-gray-500">Move</th>
                        <th className="px-4 py-3 text-xs font-semibold text-gray-500 cursor-pointer hover:text-gray-800" onClick={() => handleSort("sourcePage")}>
                          Source {sortField === "sourcePage" && (sortDir === "desc" ? "↓" : "↑")}
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold text-gray-500">Supermove</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className={`hover:bg-gray-50/50 transition-colors ${isTestLead(lead) ? "bg-amber-50/40" : ""}`}>
                          <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                            <div>{formatDate(lead.createdAt)}</div>
                            <div className="text-gray-400">{formatTime(lead.createdAt)}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-medium text-gray-900 flex items-center gap-2">
                              {lead.fullName || "—"}
                              {isTestLead(lead) && (
                                <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-medium">TEST</span>
                              )}
                            </div>
                            {lead.moveDate && (
                              <div className="text-xs text-gray-400">Move: {lead.moveDate}</div>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-xs">
                              <a href={`tel:${lead.phone}`} className="text-gray-700 hover:text-[#75aa11] block">{lead.phone || "—"}</a>
                              <a href={`mailto:${lead.email}`} className="text-gray-400 hover:text-[#75aa11] block truncate max-w-[160px]">{lead.email || "—"}</a>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-col gap-1">
                              {lead.moveType && (
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize w-fit ${moveTypeBadge(lead.moveType)}`}>
                                  {lead.moveType}
                                </span>
                              )}
                              {(lead.zipFrom || lead.zipTo) && (
                                <span className="text-xs text-gray-400">{lead.zipFrom} → {lead.zipTo}</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <span className="font-mono text-xs text-gray-600 truncate max-w-[180px]">{lead.sourcePage || "/"}</span>
                              <a href={`https://onthegomoving.com${lead.sourcePage}`} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#75aa11] flex-shrink-0">
                                <ExternalLink size={11} />
                              </a>
                            </div>
                            {lead.sourceLabel && <div className="text-xs text-gray-400 italic">{lead.sourceLabel}</div>}
                          </td>
                          <td className="px-4 py-3">
                            {lead.smProjectNumber ? (
                              <div className="flex flex-col gap-1">
                                <a
                                  href={`https://app.supermove.co/projects/${lead.smProjectId}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs font-mono text-blue-600 hover:underline flex items-center gap-1"
                                >
                                  #{lead.smProjectNumber}
                                  <ExternalLink size={10} />
                                </a>
                                {lead.smStage && (
                                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium w-fit ${stageBadgeClass(lead)}`}>
                                    {lead.smIsCancelled ? "Cancelled" : lead.smStage}
                                  </span>
                                )}
                                {lead.smTotalRevenue && (
                                  <div className="text-xs text-gray-600 font-medium">
                                    {formatCurrency(lead.smTotalRevenue)}
                                  </div>
                                )}
                                {lead.smCoordinator && (
                                  <div className="text-xs text-gray-400">{lead.smCoordinator}</div>
                                )}
                              </div>
                            ) : (
                              <span className="text-xs text-gray-300">Not synced</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredLeads.length === 0 && (
                    <div className="py-12 text-center text-gray-400 text-sm">No leads match the current filter.</div>
                  )}
                </div>
              </div>
            )}

            {/* Supermove Jobs Tab */}
            {activeTab === "supermove" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-700">Filter by stage:</span>
                  {stageOrder.map((stage) => {
                    const count = smByStage[stage]?.length || 0;
                    if (count === 0) return null;
                    return (
                      <button
                        key={stage}
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${stageBg[stage] || "bg-gray-50 border-gray-200"} ${stageText[stage] || "text-gray-600"}`}
                      >
                        {stage} ({count})
                      </button>
                    );
                  })}
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-left">
                        <th className="px-4 py-3 text-xs font-semibold text-gray-500">Project</th>
                        <th className="px-4 py-3 text-xs font-semibold text-gray-500">Client</th>
                        <th className="px-4 py-3 text-xs font-semibold text-gray-500">Stage</th>
                        <th className="px-4 py-3 text-xs font-semibold text-gray-500">Revenue</th>
                        <th className="px-4 py-3 text-xs font-semibold text-gray-500">Move Date</th>
                        <th className="px-4 py-3 text-xs font-semibold text-gray-500">Coordinator</th>
                        <th className="px-4 py-3 text-xs font-semibold text-gray-500">Lead Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {smLeads
                        .sort((a, b) => {
                          // Sort: Booked first, then Completed, then New, then On Hold, then Cancelled
                          const order = ["Booked", "Completed", "New", "On Hold", "Cancelled"];
                          const stageA = a.smIsCancelled ? "Cancelled" : (a.smStage || "");
                          const stageB = b.smIsCancelled ? "Cancelled" : (b.smStage || "");
                          const ia = order.indexOf(stageA);
                          const ib = order.indexOf(stageB);
                          if (ia !== ib) return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
                          return parseCurrency(b.smTotalRevenue) - parseCurrency(a.smTotalRevenue);
                        })
                        .map((lead) => (
                          <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-4 py-3">
                              <a
                                href={`https://app.supermove.co/projects/${lead.smProjectId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-mono text-blue-600 hover:underline flex items-center gap-1"
                              >
                                #{lead.smProjectNumber}
                                <ExternalLink size={10} />
                              </a>
                            </td>
                            <td className="px-4 py-3">
                              <div className="font-medium text-gray-900 text-sm">{lead.fullName}</div>
                              <div className="text-xs text-gray-400">{lead.phone}</div>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${stageBadgeClass(lead)}`}>
                                {lead.smIsCancelled ? "Cancelled" : lead.smStage}
                              </span>
                            </td>
                            <td className="px-4 py-3 font-semibold text-gray-800 text-sm">
                              {formatCurrency(lead.smTotalRevenue)}
                            </td>
                            <td className="px-4 py-3 text-xs text-gray-500">
                              {lead.smMoveDate ? formatDate(lead.smMoveDate) : (lead.moveDate || "—")}
                            </td>
                            <td className="px-4 py-3 text-xs text-gray-500">
                              {lead.smCoordinator || "—"}
                            </td>
                            <td className="px-4 py-3 text-xs text-gray-400">
                              {formatDate(lead.createdAt)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  {smLeads.length === 0 && (
                    <div className="py-12 text-center text-gray-400 text-sm">No Supermove jobs synced yet.</div>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* Empty state */}
        {!loading && dateFilteredLeads.length === 0 && !error && (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
            <Users size={40} className="mx-auto text-gray-300 mb-3" />
            {leads.length > 0 && (dateFrom || dateTo) ? (
              <>
                <h3 className="text-lg font-semibold text-gray-700 mb-1">No leads in this date range</h3>
                <p className="text-sm text-gray-400">
                  Try adjusting the From / To dates, or clear the filter to see all {leads.length} leads.
                </p>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-gray-700 mb-1">No leads yet</h3>
                <p className="text-sm text-gray-400">
                  Form submissions will appear here once the site receives traffic.
                </p>
              </>
            )}
          </div>
        )}

        <div className="text-center text-xs text-gray-300 pb-4">
          On The Go Moving & Storage — Internal Admin Tool
        </div>
      </div>
    </div>
  );
}
