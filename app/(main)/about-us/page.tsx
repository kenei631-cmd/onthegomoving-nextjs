import type { Metadata } from "next";
import AboutUs from "@/components/pages/AboutUs";

// Force SSR on-demand — page components use React hooks (use client)
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "About Us | On The Go Moving & Storage",
  description: "Learn about On The Go Moving & Storage — Seattle's trusted movers since 2009. Licensed, insured, and committed to stress-free moves across the Puget Sound.",
  alternates: {
    canonical: "https://onthegomoving.com/about-us/",
  },
  openGraph: {
    title: "About Us | On The Go Moving & Storage",
    description: "Learn about On The Go Moving & Storage — Seattle's trusted movers since 2009. Licensed, insured, and committed to stress-free moves across the Puget Sound.",
    url: "https://onthegomoving.com/about-us/",
  },
};

export default function Page() {
  return <AboutUs />;
}
