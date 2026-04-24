import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://onthegomoving.com"),
  title: {
    default: "On The Go Moving & Storage | Seattle's Most Trusted Movers",
    template: "%s | On The Go Moving & Storage",
  },
  description:
    "Professional moving company serving Seattle, Bellevue, Redmond & the greater Puget Sound since 2009. Licensed & insured. Free quotes. (425) 761-8500.",
  keywords: [
    "Seattle movers",
    "moving company Seattle",
    "Bellevue movers",
    "Redmond movers",
    "local movers Seattle",
    "moving and storage Seattle",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://onthegomoving.com",
    siteName: "On The Go Moving & Storage",
    title: "On The Go Moving & Storage | Seattle's Most Trusted Movers",
    description:
      "Professional moving company serving Seattle, Bellevue, Redmond & the greater Puget Sound since 2009. Licensed & insured. Free quotes.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "On The Go Moving & Storage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "On The Go Moving & Storage | Seattle's Most Trusted Movers",
    description:
      "Professional moving company serving Seattle, Bellevue, Redmond & the greater Puget Sound since 2009.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5PJR9KN');`,
          }}
        />
        {/* End Google Tag Manager */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Nunito+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5PJR9KN"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}
