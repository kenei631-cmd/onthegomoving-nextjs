import type { Metadata } from "next";
import HowMuchDoMoversCost from "@/components/pages/HowMuchDoMoversCost";


export const metadata: Metadata = {
  title: "How Much Do Movers Cost in Seattle? | 2025 Price Guide",
  description: "Find out how much movers cost in Seattle in 2025. Average prices for local moves, hourly rates, and what's included. Get a free quote from On The Go Moving.",
  alternates: {
    canonical: "https://onthegomoving.com/how-much-do-movers-cost/",
  },
  openGraph: {
    title: "How Much Do Movers Cost in Seattle? | 2025 Price Guide",
    description: "Find out how much movers cost in Seattle in 2025. Average prices for local moves, hourly rates, and what's included. Get a free quote from On The Go Moving.",
    url: "https://onthegomoving.com/how-much-do-movers-cost/",
  },
};

export default function Page() {
  return <HowMuchDoMoversCost />;
}
