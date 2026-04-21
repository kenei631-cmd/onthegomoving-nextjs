import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCATION_DATA } from "@/lib/locationData";
import LocationPage from "@/components/pages/LocationPage";


// All valid location slugs for static generation
const LOCATION_SLUGS = Object.keys(LOCATION_DATA);

export async function generateStaticParams() {
  return LOCATION_SLUGS.map((slug) => ({ cityMovers: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cityMovers: string }>;
}): Promise<Metadata> {
  const { cityMovers } = await params;
  const data = LOCATION_DATA[cityMovers];
  if (!data) return {};

  const canonical = `https://onthegomoving.com/${data.slug}/`;

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: canonical,
    },
  };
}

export default async function LocationPageRoute({
  params,
}: {
  params: Promise<{ cityMovers: string }>;
}) {
  const { cityMovers } = await params;
  const data = LOCATION_DATA[cityMovers];
  if (!data) notFound();

  return <LocationPage slug={cityMovers} />;
}
