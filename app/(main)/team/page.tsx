import type { Metadata } from "next";
import Team from "@/components/pages/Team";

// Force SSR on-demand — page components use React hooks (use client)
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Our Team | On The Go Moving & Storage",
  description: "Meet the professional moving team at On The Go Moving & Storage. Experienced, background-checked, and dedicated to making your move stress-free.",
  alternates: {
    canonical: "https://onthegomoving.com/team/",
  },
  openGraph: {
    title: "Our Team | On The Go Moving & Storage",
    description: "Meet the professional moving team at On The Go Moving & Storage. Experienced, background-checked, and dedicated to making your move stress-free.",
    url: "https://onthegomoving.com/team/",
  },
};

export default function Page() {
  return <Team />;
}
