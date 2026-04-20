import type { Metadata } from "next";
import BlogPage from "@/components/pages/Blog";

// Force SSR on-demand — page components use React hooks (use client)
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Moving Tips & Resources Blog | On The Go Moving & Storage",
  description:
    "Expert moving tips, packing guides, and relocation resources from On The Go Moving & Storage. Serving Seattle, Bellevue, Redmond & the Puget Sound since 2009.",
  alternates: {
    canonical: "https://onthegomoving.com/blog/",
  },
  openGraph: {
    title: "Moving Tips & Resources Blog | On The Go Moving & Storage",
    description:
      "Expert moving tips, packing guides, and relocation resources from On The Go Moving & Storage.",
    url: "https://onthegomoving.com/blog/",
  },
};

export default function BlogListPage() {
  return <BlogPage />;
}
