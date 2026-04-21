import type { Metadata } from "next";
import ServicePage from "@/components/pages/ServicePage";


export const metadata: Metadata = {
  title: "Specialty Moving Services in Seattle | On The Go Moving",
  description: "Expert handling for specialty items: pianos, safes, artwork, antiques, and more. On The Go Moving & Storage uses specialized equipment for safe transport.",
  alternates: {
    canonical: "https://onthegomoving.com/specialty-moving/",
  },
  openGraph: {
    title: "Specialty Moving Services in Seattle | On The Go Moving",
    description: "Expert handling for specialty items: pianos, safes, artwork, antiques, and more. On The Go Moving & Storage uses specialized equipment for safe transport.",
    url: "https://onthegomoving.com/specialty-moving/",
  },
};

export default function Page() {
  return <ServicePage slug="specialty-moving" />;
}
