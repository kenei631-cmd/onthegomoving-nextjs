import type { Metadata } from "next";
import ServicePage from "@/components/pages/ServicePage";

// Force SSR on-demand — page components use React hooks (use client)
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Piano Moving Services in Seattle | On The Go Moving",
  description: "Expert piano movers in Seattle, Bellevue, and the Puget Sound. Upright, baby grand, and grand pianos moved safely with specialized equipment. (425) 761-8500.",
  alternates: {
    canonical: "https://onthegomoving.com/piano-moving/",
  },
  openGraph: {
    title: "Piano Moving Services in Seattle | On The Go Moving",
    description: "Expert piano movers in Seattle, Bellevue, and the Puget Sound. Upright, baby grand, and grand pianos moved safely with specialized equipment. (425) 761-8500.",
    url: "https://onthegomoving.com/piano-moving/",
  },
};

export default function Page() {
  return <ServicePage slug="piano-moving" />;
}
