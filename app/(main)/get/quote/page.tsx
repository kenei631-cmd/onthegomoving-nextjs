import type { Metadata } from "next";
import QuoteLanding from "@/components/pages/landing/QuoteLanding";

export const metadata: Metadata = {
  title: "Get a Free Moving Quote | On The Go Moving & Storage",
  description:
    "Get a free flat-rate moving quote from On The Go Moving & Storage. Serving Greater Seattle since 2009. Licensed & insured. Call (425) 761-8500.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <QuoteLanding />;
}
