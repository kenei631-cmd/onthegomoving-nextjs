import type { Metadata } from "next";
import ResidentialMoversLanding from "@/components/pages/landing/ResidentialMoversLanding";

export const metadata: Metadata = {
  title: "Residential Movers Seattle | On The Go Moving & Storage",
  description:
    "Family-owned residential movers serving Greater Seattle since 2009. Flat-rate pricing, 4.8★ rated, licensed & insured. Call (425) 761-8500.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <ResidentialMoversLanding />;
}
