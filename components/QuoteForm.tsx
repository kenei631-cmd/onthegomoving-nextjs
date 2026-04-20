"use client";

// ==========================================================================
// ON THE GO MOVING — Quote Form Component (Single Source of Truth)
// All submissions go through trpc.leads.submit:
//   1. Saved to MySQL leads table (permanent audit trail)
//   2. Zapier/SuperMove webhook fired server-side (key never exposed to browser)
// ==========================================================================

import { useState } from "react";
import { ArrowRight, CheckCircle, Loader2, Lock } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface QuoteFormProps {
  variant?: "hero" | "sidebar" | "inline";
  className?: string;
  /** Optional label to identify which page/section the form was submitted from */
  sourceLabel?: string;
  /** Pre-check the Free Storage checkbox (use on storage-related pages) */
  defaultFreeStorage?: boolean;
}

export default function QuoteForm({ variant = "hero", className = "", sourceLabel, defaultFreeStorage = false }: QuoteFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    moveDate: "",
    zipFrom: "",
    zipTo: "",
    moveType: "",
    freeStorage: defaultFreeStorage,
  });

  const submitLead = trpc.leads.submit.useMutation({
    onSuccess: () => {
      // Push GTM event if dataLayer is available
      if (typeof window !== "undefined" && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: "quote_form_submit",
          formData: { moveType: formData.moveType, zipFrom: formData.zipFrom },
        });
      }
      setSubmitted(true);
      setTimeout(() => {
        window.location.href = "/thank-you-get-a-quote-services/";
      }, 1500);
    },
    onError: (err) => {
      console.error("[QuoteForm] Submission error:", err);
      // Even on error, show success to user — the lead may still have been saved
      // The error is logged server-side with full details
      toast.error("Something went wrong. Please call us at (425) 761-8500.");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    submitLead.mutate({
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      moveDate: formData.moveDate || undefined,
      moveType: formData.moveType || undefined,
      fromZip: formData.zipFrom || undefined,
      toZip: formData.zipTo || undefined,
      wantsStorage: formData.freeStorage,
      sourcePage: typeof window !== "undefined" ? window.location.pathname : undefined,
      sourceLabel: sourceLabel,
    });
  };

  if (submitted) {
    return (
      <div className={`flex flex-col items-center justify-center gap-3 py-10 text-center ${className}`}>
        <CheckCircle size={48} style={{ color: "#75aa11" }} />
        <h3
          className="text-2xl font-bold"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#1e3a0f" }}
        >
          Quote Request Received!
        </h3>
        <p className="text-gray-600 text-sm">
          We'll contact you within 1 business hour. Redirecting…
        </p>
      </div>
    );
  }

  const labelClass = "block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide transition-colors duration-200";

  const fieldWrap = (name: string) =>
    `relative transition-all duration-200 ${focused === name ? "pl-2" : ""}`;

  const inputClass = (name: string) =>
    [
      "w-full px-3 py-2.5 text-sm border rounded-md bg-white text-gray-800 placeholder-gray-400",
      "outline-none transition-all duration-200",
      focused === name
        ? "border-[#75aa11] ring-2 ring-[#75aa11]/20 shadow-sm"
        : "border-gray-200 hover:border-gray-300",
    ].join(" ");

  const focusProps = (name: string) => ({
    onFocus: () => setFocused(name),
    onBlur: () => setFocused(null),
  });

  const loading = submitLead.isPending;

  return (
    <form
      onSubmit={handleSubmit}
      className={[
        "bg-white rounded-xl p-6 transition-all duration-300",
        "shadow-xl hover:shadow-2xl hover:-translate-y-0.5",
        className,
      ].join(" ")}
    >
      {variant === "hero" && (
        <div className="mb-5">
          <h2
            className="text-2xl font-extrabold"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#1e3a0f" }}
          >
            Get Your Free Moving Quote
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            No obligation. Response within 1 hour.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className={`sm:col-span-2 ${fieldWrap("fullName")}`}>
          {focused === "fullName" && (
            <span className="absolute left-0 top-6 bottom-0 w-0.5 bg-[#75aa11] rounded-full" />
          )}
          <label className={`${labelClass} ${focused === "fullName" ? "text-[#75aa11]" : ""}`}>
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Jane Smith"
            className={inputClass("fullName")}
            {...focusProps("fullName")}
          />
        </div>

        {/* Phone */}
        <div className={fieldWrap("phone")}>
          {focused === "phone" && (
            <span className="absolute left-0 top-6 bottom-0 w-0.5 bg-[#75aa11] rounded-full" />
          )}
          <label className={`${labelClass} ${focused === "phone" ? "text-[#75aa11]" : ""}`}>
            Phone *
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="(425) 555-0100"
            className={inputClass("phone")}
            {...focusProps("phone")}
          />
        </div>

        {/* Email */}
        <div className={fieldWrap("email")}>
          {focused === "email" && (
            <span className="absolute left-0 top-6 bottom-0 w-0.5 bg-[#75aa11] rounded-full" />
          )}
          <label className={`${labelClass} ${focused === "email" ? "text-[#75aa11]" : ""}`}>
            Email *
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            className={inputClass("email")}
            {...focusProps("email")}
          />
        </div>

        {/* Move Date */}
        <div className={fieldWrap("moveDate")}>
          {focused === "moveDate" && (
            <span className="absolute left-0 top-6 bottom-0 w-0.5 bg-[#75aa11] rounded-full" />
          )}
          <label className={`${labelClass} ${focused === "moveDate" ? "text-[#75aa11]" : ""}`}>
            Move Date
          </label>
          <input
            type="date"
            name="moveDate"
            value={formData.moveDate}
            onChange={handleChange}
            className={inputClass("moveDate")}
            min={new Date().toISOString().split("T")[0]}
            {...focusProps("moveDate")}
          />
        </div>

        {/* Move Type */}
        <div className={fieldWrap("moveType")}>
          {focused === "moveType" && (
            <span className="absolute left-0 top-6 bottom-0 w-0.5 bg-[#75aa11] rounded-full" />
          )}
          <label className={`${labelClass} ${focused === "moveType" ? "text-[#75aa11]" : ""}`}>
            Move Type *
          </label>
          <select
            name="moveType"
            required
            value={formData.moveType}
            onChange={handleChange}
            className={inputClass("moveType")}
            {...focusProps("moveType")}
          >
            <option value="">Select type…</option>
            <option value="residential">Residential / Home</option>
            <option value="apartment">Apartment</option>
            <option value="commercial">Commercial / Office</option>
            <option value="labor_only">Labor Only</option>
            <option value="specialty">Specialty (Piano, Antiques, Safe, etc.)</option>
            <option value="storage">Storage Only</option>
          </select>
        </div>

        {/* Zip From */}
        <div className={fieldWrap("zipFrom")}>
          {focused === "zipFrom" && (
            <span className="absolute left-0 top-6 bottom-0 w-0.5 bg-[#75aa11] rounded-full" />
          )}
          <label className={`${labelClass} ${focused === "zipFrom" ? "text-[#75aa11]" : ""}`}>
            Moving From (Zip)
          </label>
          <input
            type="text"
            name="zipFrom"
            value={formData.zipFrom}
            onChange={handleChange}
            placeholder="98052"
            maxLength={10}
            className={inputClass("zipFrom")}
            {...focusProps("zipFrom")}
          />
        </div>

        {/* Zip To */}
        <div className={fieldWrap("zipTo")}>
          {focused === "zipTo" && (
            <span className="absolute left-0 top-6 bottom-0 w-0.5 bg-[#75aa11] rounded-full" />
          )}
          <label className={`${labelClass} ${focused === "zipTo" ? "text-[#75aa11]" : ""}`}>
            Moving To (Zip)
          </label>
          <input
            type="text"
            name="zipTo"
            value={formData.zipTo}
            onChange={handleChange}
            placeholder="98101"
            maxLength={10}
            className={inputClass("zipTo")}
            {...focusProps("zipTo")}
          />
        </div>

        {/* Free Storage checkbox */}
        <div className="sm:col-span-2">
          <label className="group flex items-start gap-2.5 cursor-pointer">
            <div className="relative mt-0.5 flex-shrink-0">
              <input
                type="checkbox"
                name="freeStorage"
                checked={formData.freeStorage}
                onChange={handleChange}
                className="w-4 h-4 rounded accent-[#75aa11] cursor-pointer transition-transform duration-150 group-hover:scale-110"
              />
            </div>
            <span className={`text-sm transition-colors duration-200 ${formData.freeStorage ? "text-gray-800" : "text-gray-600 group-hover:text-gray-800"}`}>
              <span className="font-bold text-gray-800">Yes, I want FREE storage</span>
              {" "}— include 1 free month of storage with my move
            </span>
          </label>
        </div>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className={[
          "mt-5 w-full flex items-center justify-center gap-2 py-3 text-base font-bold rounded-md",
          "transition-all duration-200",
          "bg-[#fbc319] text-[#1a1a1a] uppercase tracking-wide",
          loading
            ? "opacity-70 cursor-not-allowed"
            : "hover:bg-[#f5b800] hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] active:shadow-sm",
        ].join(" ")}
        style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
      >
        {loading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <>
            GET MY FREE QUOTE
            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
          </>
        )}
      </button>

      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-gray-400 mt-3">
        <Lock size={11} />
        Your information is secure and never sold.
      </p>
    </form>
  );
}
