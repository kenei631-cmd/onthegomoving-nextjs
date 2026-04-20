import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/thank-you-get-a-quote-services/"],
      },
    ],
    sitemap: "https://onthegomoving.com/sitemap.xml",
    host: "https://onthegomoving.com",
  };
}
