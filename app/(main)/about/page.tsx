import type { Metadata } from "next";
import AboutUs from "@/components/pages/AboutUs";


export const metadata: Metadata = {
  title: "About On The Go Moving & Storage",
  description: "On The Go Moving & Storage has been Seattle's trusted moving company since 2009. Licensed, insured, and dedicated to stress-free moves.",
  alternates: {
    canonical: "https://onthegomoving.com/about-us/",
  },
  openGraph: {
    title: "About On The Go Moving & Storage",
    description: "On The Go Moving & Storage has been Seattle's trusted moving company since 2009. Licensed, insured, and dedicated to stress-free moves.",
    url: "https://onthegomoving.com/about-us/",
  },
};

export default function Page() {
  return <AboutUs />;
}
