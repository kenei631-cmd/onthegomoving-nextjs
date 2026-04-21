import type { Metadata } from "next";
import HomePageContent from "@/components/pages/Home";

export const metadata: Metadata = {
  title: "On The Go Moving & Storage | Seattle's Most Trusted Movers Since 2009",
  description:
    "Seattle's top-rated moving company since 2009. Residential, commercial, packing & storage services across the greater Puget Sound. Licensed & insured. Free quotes — call (425) 761-8500.",
  alternates: {
    canonical: "https://onthegomoving.com/",
  },
  openGraph: {
    title: "On The Go Moving & Storage | Seattle's Most Trusted Movers Since 2009",
    description:
      "Seattle's top-rated moving company since 2009. Residential, commercial, packing & storage services across the greater Puget Sound.",
    url: "https://onthegomoving.com/",
  },
};

export default function HomePage() {
  return <HomePageContent />;
}

