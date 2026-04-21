import type { Metadata } from "next";
import StorageServicesLanding from "@/components/pages/landing/StorageServicesLanding";

export const metadata: Metadata = {
  title: "Secure Storage Seattle | On The Go Moving & Storage",
  description:
    "Private vault storage at our secured Redmond, WA facility. We pick up, store, and deliver. 1 free month with any move. Call (425) 761-8500.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <StorageServicesLanding />;
}
