import type { Metadata } from "next";
import ServicePage from "@/components/pages/ServicePage";

// Force SSR on-demand — page components use React hooks (use client)
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Business Movers in Seattle | On The Go Moving & Storage",
  description: "Professional business movers in Seattle and the Puget Sound. We relocate offices, warehouses, and commercial spaces with minimal disruption. (425) 761-8500.",
  alternates: {
    canonical: "https://onthegomoving.com/business-movers/",
  },
  openGraph: {
    title: "Business Movers in Seattle | On The Go Moving & Storage",
    description: "Professional business movers in Seattle and the Puget Sound. We relocate offices, warehouses, and commercial spaces with minimal disruption. (425) 761-8500.",
    url: "https://onthegomoving.com/business-movers/",
  },
};

export default function Page() {
  return <ServicePage slug="commercial-moving" />;
}
