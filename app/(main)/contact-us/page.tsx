import type { Metadata } from "next";
import ContactUs from "@/components/pages/ContactUs";


export const metadata: Metadata = {
  title: "Contact Us | On The Go Moving & Storage",
  description: "Get in touch with On The Go Moving & Storage. Call (425) 761-8500 or fill out our free quote form. Serving Seattle, Bellevue, Redmond & the greater Puget Sound.",
  alternates: {
    canonical: "https://onthegomoving.com/contact-us/",
  },
  openGraph: {
    title: "Contact Us | On The Go Moving & Storage",
    description: "Get in touch with On The Go Moving & Storage. Call (425) 761-8500 or fill out our free quote form. Serving Seattle, Bellevue, Redmond & the greater Puget Sound.",
    url: "https://onthegomoving.com/contact-us/",
  },
};

export default function Page() {
  return <ContactUs />;
}
