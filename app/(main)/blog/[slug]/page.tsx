import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { POSTS_DATA } from "@/lib/blogData";
import BlogPost from "@/components/pages/BlogPost";

export async function generateStaticParams() {
  return Object.keys(POSTS_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS_DATA[slug];
  if (!post) return {};

  // Canonical always points to the root-level URL (no /blog/ prefix),
  // matching the live WordPress site. The Netlify redirect rule in netlify.toml
  // handles the actual 301 redirect from /blog/slug/ → /slug/.
  const canonical = `https://onthegomoving.com/${post.slug}/`;

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription,
      url: canonical,
      type: "article",
      publishedTime: post.dateISO,
      authors: [post.author],
      images: post.heroImage
        ? [{ url: post.heroImage, width: 1200, height: 630, alt: post.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle || post.title,
      description: post.metaDescription,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = POSTS_DATA[slug];
  if (!post) notFound();

  return <BlogPost slug={slug} />;
}
