import { MetadataRoute } from "next";
import { LOCATION_DATA } from "@/lib/locationData";
import { POSTS_DATA } from "@/lib/blogData";

const BASE_URL = "https://onthegomoving.com";

const SERVICE_KEYS = [
  "residential",
  "apartment",
  "packing",
  "storage",
  "office",
  "commercial",
  "senior",
  "furniture",
  "piano",
  "condo",
  "appliance",
  "unpacking",
  "warehousing",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ── Static pages ──────────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/contact-us/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/about-us/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/we-are-local/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/blog/`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/faq/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/how-much-do-movers-cost/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/real-estate-agents/`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/moving-supplies/`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/team/`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/partners/`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/staging-professionals/`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/privacy-policy/`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // ── Service pages ─────────────────────────────────────────────────────────
  const servicePages: MetadataRoute.Sitemap = [
    "residential-moving",
    "commercial-moving",
    "packing-services",
    "storage-services",
    "labor-only-moving",
    "specialty-moving",
    "apartment-moving",
    "senior-moving",
    "warehousing-services",
    "office-moving",
    "piano-moving",
    "furniture-moving",
    "condo-moving",
    "corporate-relocation",
    "appliance-moving",
    "unpacking-services",
    "freight-forwarding-service",
  ].map((slug) => ({
    url: `${BASE_URL}/${slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // ── Location pages ────────────────────────────────────────────────────────
  const locationPages: MetadataRoute.Sitemap = Object.keys(LOCATION_DATA).map(
    (slug) => ({
      url: `${BASE_URL}/${slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })
  );

  // ── City × Service sub-pages ──────────────────────────────────────────────
  const cityServicePages: MetadataRoute.Sitemap = [];
  for (const locationSlug of Object.keys(LOCATION_DATA)) {
    for (const serviceKey of SERVICE_KEYS) {
      cityServicePages.push({
        url: `${BASE_URL}/${locationSlug}/${serviceKey}/`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      });
    }
  }

  // ── Blog posts ────────────────────────────────────────────────────────────
  const blogPosts: MetadataRoute.Sitemap = Object.values(POSTS_DATA).map(
    (post) => ({
      url: `${BASE_URL}/blog/${post.slug}/`,
      lastModified: post.dateISO ? new Date(post.dateISO) : now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })
  );

  return [
    ...staticPages,
    ...servicePages,
    ...locationPages,
    ...cityServicePages,
    ...blogPosts,
  ];
}
