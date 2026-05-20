/**
 * POST /api/upload-supermove-csv
 *
 * Accepts a multipart/form-data POST with a CSV file field named "csv".
 * Parses the Supermove combined_projects CSV format, upserts all records
 * into the leads table (insert new, update existing by project number).
 *
 * Security: requires X-Admin-Key header matching ADMIN_SECRET env var.
 */

import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

const STATUS_PRIORITY: Record<string, number> = {
  COMPLETED: 7,
  BOOKED: 6,
  HOLD: 3,
  LEAD: 2,
  CANCELLED: 1,
};

const STATUS_MAP: Record<string, string> = {
  LEAD: "New",
  HOLD: "On Hold",
  BOOKED: "Booked",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

const PROJECT_TYPE_MAP: Record<string, string> = {
  "Local Move": "house",
  "Labor Only": "labor",
  "Commercial Move": "commercial",
};

/** Simple RFC 4180-compliant CSV parser (no external deps). */
function parseCSV(text: string): Record<string, string>[] {
  text = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);

  const rows: string[][] = [];
  let current = "";
  let inQuotes = false;
  let fields: string[] = [];

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      if (inQuotes && text[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      fields.push(current);
      current = "";
    } else if (ch === "\n" && !inQuotes) {
      fields.push(current);
      rows.push(fields);
      fields = [];
      current = "";
    } else {
      current += ch;
    }
  }
  if (current || fields.length) {
    fields.push(current);
    if (fields.some((f) => f.trim())) rows.push(fields);
  }

  if (rows.length < 2) return [];
  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).map((row) => {
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      obj[h] = (row[i] ?? "").trim();
    });
    return obj;
  });
}

function getDbUrl(): string {
  const raw = process.env.DATABASE_URL || "";
  return raw.replace(/[?&]ssl-mode=[^&]*/i, "").replace(/[?&]ssl=[^&]*/i, "");
}

function normalizeStatus(status: string): string {
  const s = status.toUpperCase().replace(/\s+/g, "_");
  if (s.includes("CANCEL")) return "CANCELLED";
  if (s.includes("BOOK") || s.includes("CONFIRM")) return "BOOKED";
  if (s.includes("COMPLET")) return "COMPLETED";
  if (s.includes("HOLD")) return "HOLD";
  return "LEAD";
}

function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

export async function POST(req: NextRequest) {
  // Auth check
  const adminKey = req.headers.get("x-admin-key") || "";
  const secret = process.env.ADMIN_SECRET || "otgm-admin-2025";
  if (adminKey !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let csvText = "";
  try {
    const formData = await req.formData();
    const file = formData.get("csv");
    if (!file || typeof file === "string") {
      return NextResponse.json(
        { error: "No CSV file provided. Use field name 'csv'." },
        { status: 400 }
      );
    }
    csvText = await (file as File).text();
  } catch {
    return NextResponse.json(
      { error: "Failed to parse form data" },
      { status: 400 }
    );
  }

  const rows = parseCSV(csvText);
  if (rows.length === 0) {
    return NextResponse.json(
      { error: "CSV is empty or could not be parsed" },
      { status: 400 }
    );
  }

  // Group rows by project number, keeping the most advanced status per project
  const projectMap: Record<string, Record<string, string>> = {};
  for (const row of rows) {
    const projectNum = (row["Project"] || row["project"] || "").trim();
    if (!projectNum) continue;

    const rawStatus = (row["Current Status"] || row["Status"] || "LEAD").trim();
    const normStatus = normalizeStatus(rawStatus);
    const priority = STATUS_PRIORITY[normStatus] || 0;

    if (
      !projectMap[projectNum] ||
      priority > (STATUS_PRIORITY[normalizeStatus(projectMap[projectNum]["_normStatus"] || "LEAD")] || 0)
    ) {
      projectMap[projectNum] = { ...row, _normStatus: normStatus };
    }
  }

  const projects = Object.values(projectMap);

  let conn: mysql.Connection | null = null;
  try {
    conn = await mysql.createConnection(getDbUrl());

    // Load existing leads for name-matching
    const [existingRows] = await conn.execute(
      "SELECT id, fullName, smProjectNumber FROM leads"
    ) as [Array<{id: number; fullName: string; smProjectNumber: string | null}>, unknown];

    const nameToId: Record<string, number> = {};
    const projectNumToId: Record<string, number> = {};
    for (const row of existingRows) {
      if (row.fullName) nameToId[normalizeName(row.fullName)] = row.id;
      if (row.smProjectNumber) projectNumToId[row.smProjectNumber] = row.id;
    }

    let inserted = 0;
    let updated = 0;
    let skipped = 0;

    for (const proj of projects) {
      const projectNum = proj["Project"] || "";
      const clientName = proj["Client"] || proj["client"] || "";
      const normStatus = proj["_normStatus"] || "LEAD";
      const stage = STATUS_MAP[normStatus] || "New";
      const revenue = parseFloat((proj["Revenue"] || "0").replace(/[$,]/g, "")) || 0;
      const salesperson = proj["Salesperson"] || proj["salesperson"] || null;
      const projectType = proj["Project Type"] || proj["project_type"] || null;
      const mappedType = projectType ? (PROJECT_TYPE_MAP[projectType] || null) : null;
      const isCancelled = normStatus === "CANCELLED" ? 1 : 0;

      // Parse dates
      const parseDate = (val: string) => {
        if (!val || val === "N/A" || val === "") return null;
        const d = new Date(val);
        return isNaN(d.getTime()) ? null : d.toISOString().slice(0, 19).replace("T", " ");
      };

      const createdAt = parseDate(proj["Created At"] || "");
      const sentAt = parseDate(proj["Sent At"] || "");
      const completedAt = parseDate(proj["Completed At"] || "");
      const hrsToSend = parseFloat(proj["Hrs to Send"] || "") || null;
      const hrsToComplete = parseFloat(proj["Hrs to Complete"] || "") || null;

      // Check if we already have this project number
      const existingId = projectNumToId[projectNum];
      if (existingId) {
        // Update existing record
        await conn.execute(
          `UPDATE leads SET
            smProjectNumber = ?, smStage = ?, smTotalRevenue = ?,
            smSalesperson = ?, smIsCancelled = ?,
            smProjectType = ?, smSentAt = ?, smCompletedAt = ?,
            smHrsToSend = ?, smHrsToComplete = ?
          WHERE id = ?`,
          [projectNum, stage, revenue, salesperson, isCancelled,
           mappedType, sentAt, completedAt, hrsToSend, hrsToComplete,
           existingId]
        );
        updated++;
        continue;
      }

      // Try to match by name to an existing form lead
      const normClient = normalizeName(clientName);
      const matchedId = nameToId[normClient];
      if (matchedId) {
        await conn.execute(
          `UPDATE leads SET
            smProjectNumber = ?, smStage = ?, smTotalRevenue = ?,
            smSalesperson = ?, smIsCancelled = ?,
            smProjectType = ?, smSentAt = ?, smCompletedAt = ?,
            smHrsToSend = ?, smHrsToComplete = ?
          WHERE id = ?`,
          [projectNum, stage, revenue, salesperson, isCancelled,
           mappedType, sentAt, completedAt, hrsToSend, hrsToComplete,
           matchedId]
        );
        updated++;
        continue;
      }

      // Insert as new Supermove-only record
      if (!clientName) { skipped++; continue; }

      const nameParts = clientName.trim().split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      await conn.execute(
        `INSERT INTO leads
          (firstName, lastName, fullName, email, phone, moveType,
           source, webhookStatus, smProjectNumber, smStage, smTotalRevenue,
           smSalesperson, smIsCancelled, smProjectType, smSentAt, smCompletedAt,
           smHrsToSend, smHrsToComplete, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          firstName, lastName, clientName, null, null,
          mappedType || "house",
          "supermove-import", "pending",
          projectNum, stage, revenue,
          salesperson, isCancelled,
          mappedType, sentAt, completedAt, hrsToSend, hrsToComplete,
          createdAt || new Date().toISOString().slice(0, 19).replace("T", " "),
        ]
      );
      inserted++;
    }

    await conn.end();

    return NextResponse.json({
      success: true,
      totalRows: rows.length,
      uniqueProjects: projects.length,
      inserted,
      updated,
      skipped,
    });
  } catch (err: unknown) {
    if (conn) try { await conn.end(); } catch {}
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
