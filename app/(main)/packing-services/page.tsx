import type { Metadata } from "next";
import ServicePage from "@/components/pages/ServicePage";

// Force SSR on-demand — page components use React hooks (use client)
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Professional Packing Services in Seattle | On The Go Moving",
  description: "Full and partial packing services by trained professionals. We pack everything safely — fragile items, artwork, electronics, and more. Serving Seattle & the Puget Sound.",
  alternates: {
    canonical: "https://onthegomoving.com/packing-services/",
  },
  openGraph: {
    title: "Professional Packing Services in Seattle | On The Go Moving",
    description: "Full and partial packing services by trained professionals. We pack everything safely — fragile items, artwork, electronics, and more. Serving Seattle & the Puget Sound.",
    url: "https://onthegomoving.com/packing-services/",
  },
};

export default function Page() {
  return <ServicePage slug="packing-services" />;
}
