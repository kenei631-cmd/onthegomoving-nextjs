import type { Metadata } from "next";
import MovingSupplies from "@/components/pages/MovingSupplies";

// Force SSR on-demand — page components use React hooks (use client)
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Moving Supplies in Seattle | Boxes, Tape & Packing Materials",
  description: "Buy moving boxes, packing tape, bubble wrap, and more from On The Go Moving & Storage. Quality moving supplies delivered or available for pickup in Redmond, WA.",
  alternates: {
    canonical: "https://onthegomoving.com/moving-supplies/",
  },
  openGraph: {
    title: "Moving Supplies in Seattle | Boxes, Tape & Packing Materials",
    description: "Buy moving boxes, packing tape, bubble wrap, and more from On The Go Moving & Storage. Quality moving supplies delivered or available for pickup in Redmond, WA.",
    url: "https://onthegomoving.com/moving-supplies/",
  },
};

export default function Page() {
  return <MovingSupplies />;
}
