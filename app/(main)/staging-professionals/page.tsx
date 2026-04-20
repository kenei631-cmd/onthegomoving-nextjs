import type { Metadata } from "next";
import StagingProfessionals from "@/components/pages/StagingProfessionals";

// Force SSR on-demand — page components use React hooks (use client)
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Moving Services for Staging Professionals | On The Go Moving",
  description: "On The Go Moving & Storage offers specialized moving and storage services for home staging professionals in the Seattle area. Fast, reliable, and careful.",
  alternates: {
    canonical: "https://onthegomoving.com/staging-professionals/",
  },
  openGraph: {
    title: "Moving Services for Staging Professionals | On The Go Moving",
    description: "On The Go Moving & Storage offers specialized moving and storage services for home staging professionals in the Seattle area. Fast, reliable, and careful.",
    url: "https://onthegomoving.com/staging-professionals/",
  },
};

export default function Page() {
  return <StagingProfessionals />;
}
