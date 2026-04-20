import type { Metadata } from "next";
import FAQ from "@/components/pages/FAQ";

// Force SSR on-demand — page components use React hooks (use client)
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Moving FAQ | Common Questions Answered | On The Go Moving",
  description: "Get answers to common moving questions: how much do movers cost, what's included, how to prepare, and more. On The Go Moving & Storage — (425) 761-8500.",
  alternates: {
    canonical: "https://onthegomoving.com/faq/",
  },
  openGraph: {
    title: "Moving FAQ | Common Questions Answered | On The Go Moving",
    description: "Get answers to common moving questions: how much do movers cost, what's included, how to prepare, and more. On The Go Moving & Storage — (425) 761-8500.",
    url: "https://onthegomoving.com/faq/",
  },
};

export default function Page() {
  return <FAQ />;
}
