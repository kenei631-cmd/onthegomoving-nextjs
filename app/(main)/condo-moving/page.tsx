import type { Metadata } from "next";
import ServicePage from "@/components/pages/ServicePage";

// Force SSR on-demand — page components use React hooks (use client)
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Condo Moving Services in Seattle | On The Go Moving",
  description: "Expert condo movers in Seattle, Bellevue, and the Puget Sound. We handle elevator reservations, building rules, and tight spaces. Free quotes — (425) 761-8500.",
  alternates: {
    canonical: "https://onthegomoving.com/condo-moving/",
  },
  openGraph: {
    title: "Condo Moving Services in Seattle | On The Go Moving",
    description: "Expert condo movers in Seattle, Bellevue, and the Puget Sound. We handle elevator reservations, building rules, and tight spaces. Free quotes — (425) 761-8500.",
    url: "https://onthegomoving.com/condo-moving/",
  },
};

export default function Page() {
  return <ServicePage slug="condo-moving" />;
}
