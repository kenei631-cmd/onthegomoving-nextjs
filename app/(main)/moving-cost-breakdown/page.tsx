import type { Metadata } from "next";
import MovingCostBreakdown from "@/components/pages/MovingCostBreakdown";

export const metadata: Metadata = {
  title: "Moving Cost Breakdown | On The Go Moving & Storage",
  description: "See a full breakdown of local moving costs by home size, crew size, and what affects your price. On The Go Moving serves Seattle, Bellevue, Redmond & the Eastside.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return <MovingCostBreakdown />;
}
