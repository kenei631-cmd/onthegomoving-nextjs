import type { Metadata } from "next";
import RealEstateAgents from "@/components/pages/RealEstateAgents";

// Force SSR on-demand — page components use React hooks (use client)
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Moving Services for Real Estate Agents | On The Go Moving",
  description: "Partner with On The Go Moving & Storage to offer your clients seamless moving services. Preferred mover for Seattle-area real estate agents. Call (425) 761-8500.",
  alternates: {
    canonical: "https://onthegomoving.com/real-estate-agents/",
  },
  openGraph: {
    title: "Moving Services for Real Estate Agents | On The Go Moving",
    description: "Partner with On The Go Moving & Storage to offer your clients seamless moving services. Preferred mover for Seattle-area real estate agents. Call (425) 761-8500.",
    url: "https://onthegomoving.com/real-estate-agents/",
  },
};

export default function Page() {
  return <RealEstateAgents />;
}
