import type { Metadata } from "next";
import ServicePage from "@/components/pages/ServicePage";

// Force SSR on-demand — page components use React hooks (use client)
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Senior Moving Services in Seattle | On The Go Moving",
  description: "Compassionate, patient senior moving services in Seattle and the Puget Sound. We help seniors downsize, pack, and move with care and respect.",
  alternates: {
    canonical: "https://onthegomoving.com/senior-moving/",
  },
  openGraph: {
    title: "Senior Moving Services in Seattle | On The Go Moving",
    description: "Compassionate, patient senior moving services in Seattle and the Puget Sound. We help seniors downsize, pack, and move with care and respect.",
    url: "https://onthegomoving.com/senior-moving/",
  },
};

export default function Page() {
  return <ServicePage slug="senior-moving" />;
}
