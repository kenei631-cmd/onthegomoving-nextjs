import type { Metadata } from "next";
import Locations from "@/components/pages/Locations";


export const metadata: Metadata = {
  title: "Local Movers Near You | On The Go Moving & Storage",
  description: "On The Go Moving & Storage serves 35+ cities across the greater Seattle area. Find your local movers in Bellevue, Redmond, Kirkland, Sammamish, and more.",
  alternates: {
    canonical: "https://onthegomoving.com/we-are-local/",
  },
  openGraph: {
    title: "Local Movers Near You | On The Go Moving & Storage",
    description: "On The Go Moving & Storage serves 35+ cities across the greater Seattle area. Find your local movers in Bellevue, Redmond, Kirkland, Sammamish, and more.",
    url: "https://onthegomoving.com/we-are-local/",
  },
};

export default function Page() {
  return <Locations />;
}
