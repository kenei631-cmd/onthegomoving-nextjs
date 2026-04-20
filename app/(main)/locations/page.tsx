import type { Metadata } from "next";
import Locations from "@/components/pages/Locations";

// Force SSR on-demand — page components use React hooks (use client)
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Moving Service Locations | On The Go Moving & Storage",
  description: "On The Go Moving & Storage serves the greater Seattle area including Bellevue, Redmond, Kirkland, Sammamish, Issaquah, and 30+ more cities.",
  alternates: {
    canonical: "https://onthegomoving.com/we-are-local/",
  },
  openGraph: {
    title: "Moving Service Locations | On The Go Moving & Storage",
    description: "On The Go Moving & Storage serves the greater Seattle area including Bellevue, Redmond, Kirkland, Sammamish, Issaquah, and 30+ more cities.",
    url: "https://onthegomoving.com/we-are-local/",
  },
};

export default function Page() {
  return <Locations />;
}
