import type { Metadata } from "next";
import ServicePage from "@/components/pages/ServicePage";


export const metadata: Metadata = {
  title: "Warehousing & Distribution Services | On The Go Moving",
  description: "Warehousing and distribution services from On The Go Moving & Storage in Redmond, WA. Secure storage vaults, inventory management, and delivery services.",
  alternates: {
    canonical: "https://onthegomoving.com/warehousing-distribution/",
  },
  openGraph: {
    title: "Warehousing & Distribution Services | On The Go Moving",
    description: "Warehousing and distribution services from On The Go Moving & Storage in Redmond, WA. Secure storage vaults, inventory management, and delivery services.",
    url: "https://onthegomoving.com/warehousing-distribution/",
  },
};

export default function Page() {
  return <ServicePage slug="warehousing-services" />;
}
