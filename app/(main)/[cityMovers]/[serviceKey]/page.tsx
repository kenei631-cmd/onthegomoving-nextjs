import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCATION_DATA } from "@/lib/locationData";
import CityServiceSubPage from "@/components/pages/CityServiceSubPage";

// Force SSR on-demand — page components use React hooks (use client)
export const dynamic = 'force-dynamic';

// All valid service keys
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

export async function generateStaticParams() {
  const params: { cityMovers: string; serviceKey: string }[] = [];
  for (const locationSlug of Object.keys(LOCATION_DATA)) {
    for (const serviceKey of SERVICE_KEYS) {
      params.push({ cityMovers: locationSlug, serviceKey });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cityMovers: string; serviceKey: string }>;
}): Promise<Metadata> {
  const { cityMovers, serviceKey } = await params;
  const locationData = LOCATION_DATA[cityMovers];
  if (!locationData) return {};

  const city = locationData.city;
  const serviceLabels: Record<string, string> = {
    residential: "Residential Moving",
    apartment: "Apartment Moving",
    packing: "Packing Services",
    storage: "Storage Services",
    office: "Office Moving",
    commercial: "Commercial Moving",
    senior: "Senior Moving",
    furniture: "Furniture Moving",
    piano: "Piano Moving",
    condo: "Condo Moving",
    appliance: "Appliance Moving",
    unpacking: "Unpacking Services",
    warehousing: "Warehousing Services",
  };

  const serviceLabel = serviceLabels[serviceKey] || serviceKey;
  const canonical = `https://onthegomoving.com/${cityMovers}/${serviceKey}/`;

  const title = `${serviceLabel} in ${city} | On The Go Moving & Storage`;
  const description = `Professional ${serviceLabel.toLowerCase()} in ${city}, WA. Licensed & insured movers serving ${city} and the greater Seattle area. Free quotes — (425) 761-8500.`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
    },
  };
}

export default async function CityServiceSubPageRoute({
  params,
}: {
  params: Promise<{ cityMovers: string; serviceKey: string }>;
}) {
  const { cityMovers, serviceKey } = await params;
  const locationData = LOCATION_DATA[cityMovers];
  if (!locationData) notFound();

  // Extract city slug (without -movers suffix)
  const citySlug = cityMovers
    .replace(/-movers$/, "")
    .replace(/-moving-services$/, "")
    .replace(/^moving-/, "");

  return <CityServiceSubPage citySlug={citySlug} serviceKey={serviceKey} />;
}
