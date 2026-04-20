import type { Metadata } from "next";
import AdminLeads from "@/components/pages/AdminLeads";

export const metadata: Metadata = {
  title: "Admin — Leads Dashboard | On The Go Moving",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLeadsPage() {
  return <AdminLeads />;
}

// Force SSR on-demand — page components use React hooks (use client)
export const dynamic = 'force-dynamic';
