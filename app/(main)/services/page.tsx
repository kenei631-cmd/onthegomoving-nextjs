import type { Metadata } from "next";
import Services from "@/components/pages/Services";

export const metadata: Metadata = {
  title: "Moving Services in Seattle & Eastside WA | On The Go Moving",
  description:
    "On The Go Moving & Storage offers residential, commercial, packing, storage, labor-only, specialty, apartment, and senior moving services in Greater Seattle, WA. Get a free quote today.",
  alternates: {
    canonical: "https://onthegomoving.com/services/",
  },
  openGraph: {
    title: "Moving Services in Seattle & Eastside WA | On The Go Moving",
    description:
      "On The Go Moving & Storage offers residential, commercial, packing, storage, labor-only, specialty, apartment, and senior moving services in Greater Seattle, WA.",
    url: "https://onthegomoving.com/services/",
  },
};

export default function Page() {
  return <Services />;
}
