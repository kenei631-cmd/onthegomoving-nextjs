import type { Metadata } from "next";
import ServicePage from "@/components/pages/ServicePage";

// Force SSR on-demand — page components use React hooks (use client)
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Warehousing Services in Seattle | On The Go Moving",
  description: "Professional warehousing services from On The Go Moving & Storage. Secure storage vaults at our Redmond facility. Short and long-term options available.",
  alternates: {
    canonical: "https://onthegomoving.com/warehousing-services/",
  },
  openGraph: {
    title: "Warehousing Services in Seattle | On The Go Moving",
    description: "Professional warehousing services from On The Go Moving & Storage. Secure storage vaults at our Redmond facility. Short and long-term options available.",
    url: "https://onthegomoving.com/warehousing-services/",
  },
};

export default function Page() {
  return <ServicePage slug="warehousing-services" />;
}
