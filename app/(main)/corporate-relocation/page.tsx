import type { Metadata } from "next";
import ServicePage from "@/components/pages/ServicePage";


export const metadata: Metadata = {
  title: "Corporate Relocation Services in Seattle | On The Go Moving",
  description: "Comprehensive corporate relocation services for businesses and employees moving to the Seattle area. Full-service moving, storage, and settling-in support.",
  alternates: {
    canonical: "https://onthegomoving.com/corporate-relocation/",
  },
  openGraph: {
    title: "Corporate Relocation Services in Seattle | On The Go Moving",
    description: "Comprehensive corporate relocation services for businesses and employees moving to the Seattle area. Full-service moving, storage, and settling-in support.",
    url: "https://onthegomoving.com/corporate-relocation/",
  },
};

export default function Page() {
  return <ServicePage slug="corporate-relocation" />;
}
