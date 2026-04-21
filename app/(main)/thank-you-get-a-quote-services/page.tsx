import type { Metadata } from "next";
import ThankYou from "@/components/pages/ThankYou";


export const metadata: Metadata = {
  title: "Thank You | On The Go Moving & Storage",
  description: "Thank you for requesting a free moving quote from On The Go Moving & Storage. We'll be in touch shortly to confirm your move details.",
  alternates: {
    canonical: "https://onthegomoving.com/thank-you-get-a-quote-services/",
  },
  openGraph: {
    title: "Thank You | On The Go Moving & Storage",
    description: "Thank you for requesting a free moving quote from On The Go Moving & Storage. We'll be in touch shortly to confirm your move details.",
    url: "https://onthegomoving.com/thank-you-get-a-quote-services/",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <ThankYou />;
}
