import type { Metadata } from "next";
import ServicePage from "@/components/pages/ServicePage";

// Force SSR on-demand — page components use React hooks (use client)
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Freight Forwarding Services in Seattle | On The Go Moving",
  description: "Freight forwarding and logistics services from On The Go Moving & Storage in Redmond, WA. Reliable freight solutions for businesses and individuals.",
  alternates: {
    canonical: "https://onthegomoving.com/freight-forwarding-service/",
  },
  openGraph: {
    title: "Freight Forwarding Services in Seattle | On The Go Moving",
    description: "Freight forwarding and logistics services from On The Go Moving & Storage in Redmond, WA. Reliable freight solutions for businesses and individuals.",
    url: "https://onthegomoving.com/freight-forwarding-service/",
  },
};

export default function Page() {
  return <ServicePage slug="freight-forwarding-service" />;
}
