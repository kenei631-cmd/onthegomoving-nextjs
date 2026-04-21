import type { Metadata } from "next";
import Partners from "@/components/pages/Partners";


export const metadata: Metadata = {
  title: "Our Partners | On The Go Moving & Storage",
  description: "On The Go Moving & Storage partners with trusted local businesses across the Seattle area to provide comprehensive moving and relocation services.",
  alternates: {
    canonical: "https://onthegomoving.com/partners/",
  },
  openGraph: {
    title: "Our Partners | On The Go Moving & Storage",
    description: "On The Go Moving & Storage partners with trusted local businesses across the Seattle area to provide comprehensive moving and relocation services.",
    url: "https://onthegomoving.com/partners/",
  },
};

export default function Page() {
  return <Partners />;
}
