import type { Metadata } from "next";
import ServicePage from "@/components/pages/ServicePage";

// Force SSR on-demand — page components use React hooks (use client)
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Appliance Moving Services in Seattle | On The Go Moving",
  description: "Professional appliance movers in Seattle and the Puget Sound. We safely move refrigerators, washers, dryers, and more. Free quotes — (425) 761-8500.",
  alternates: {
    canonical: "https://onthegomoving.com/appliance-moving/",
  },
  openGraph: {
    title: "Appliance Moving Services in Seattle | On The Go Moving",
    description: "Professional appliance movers in Seattle and the Puget Sound. We safely move refrigerators, washers, dryers, and more. Free quotes — (425) 761-8500.",
    url: "https://onthegomoving.com/appliance-moving/",
  },
};

export default function Page() {
  return <ServicePage slug="appliance-moving" />;
}
