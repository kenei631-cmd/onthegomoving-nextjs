import type { Metadata } from "next";
import PrivacyPolicy from "@/components/pages/PrivacyPolicy";


export const metadata: Metadata = {
  title: "Privacy Policy | On The Go Moving & Storage",
  description: "Read the privacy policy for On The Go Moving & Storage. We protect your personal information and never sell your data.",
  alternates: {
    canonical: "https://onthegomoving.com/privacy-policy/",
  },
  openGraph: {
    title: "Privacy Policy | On The Go Moving & Storage",
    description: "Read the privacy policy for On The Go Moving & Storage. We protect your personal information and never sell your data.",
    url: "https://onthegomoving.com/privacy-policy/",
  },
};

export default function Page() {
  return <PrivacyPolicy />;
}
