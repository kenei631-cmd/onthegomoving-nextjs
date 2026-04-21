import type { Metadata } from "next";
import ServicePage from "@/components/pages/ServicePage";


export const metadata: Metadata = {
  title: "Labor Only Moving Services in Seattle | On The Go Moving",
  description: "Need help loading or unloading your truck or container? Our labor-only moving service provides professional movers without the truck. Serving the greater Seattle area.",
  alternates: {
    canonical: "https://onthegomoving.com/labor-only-moving/",
  },
  openGraph: {
    title: "Labor Only Moving Services in Seattle | On The Go Moving",
    description: "Need help loading or unloading your truck or container? Our labor-only moving service provides professional movers without the truck. Serving the greater Seattle area.",
    url: "https://onthegomoving.com/labor-only-moving/",
  },
};

export default function Page() {
  return <ServicePage slug="labor-only-moving" />;
}
