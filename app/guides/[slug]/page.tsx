import type { Metadata } from "next";

import { REVALIDATE } from "@/lib/revalidate";
export const revalidate = REVALIDATE;

import PageContentWrapper from "@/components/ui/page-content-wrapper";
import { getGuideBySlug, getGuides } from "@/sanity/sanity";
import { notFound } from "next/navigation";
import { BackNav } from "@/components/guides/BackNav";
import { ArticleHeader } from "@/components/guides/ArticleHeader";
import { ArticleContent } from "@/components/guides/ArticleContent";
import { RelatedGuides } from "@/components/guides/RelatedGuides";
import { GuideCTASection } from "@/components/guides/GuideCTASection";
import type { Guide } from "@/interface/sanity";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) return {};

  const title = guide.seoTitle ?? guide.title;
  const description =
    guide.seoDescription ??
    guide.excerpt ??
    `A comprehensive guide on ${guide.title}. Everything Nigerian students need to know about ${guide.category}.`;
  const ogImages = guide.ogImage?.url
    ? [{ url: guide.ogImage.url, alt: guide.ogImage.alt ?? guide.title }]
    : undefined;

  const ogImagesFinal = ogImages ?? [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }];

  return {
    title,
    description,
    alternates: { canonical: `/guides/${slug}` },
    openGraph: {
      title: `${title} | IFEM Education`,
      description,
      url: `/guides/${slug}`,
      type: "article",
      images: ogImagesFinal,
      ...(guide._createdAt ? { publishedTime: guide._createdAt } : {}),
      ...(guide._updatedAt ? { modifiedTime: guide._updatedAt } : {}),
      authors: ["https://www.ifemeducation.com/about"],
      tags: ["UK student visa", "UK university admissions", "study in UK", "Nigerian students"],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${title} | IFEM Education`,
      description,
      images: [ogImagesFinal[0].url],
    },
  };
}

export default async function GuideDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [guide, allGuides] = await Promise.all([
    getGuideBySlug(slug),
    getGuides(),
  ]);

  if (!guide) notFound();

  const sameCategory = allGuides.filter(
    (g: Guide) => g._id !== guide._id && g.category === guide.category,
  );
  const fallback = allGuides.filter((g: Guide) => g._id !== guide._id);
  const relatedGuides = (sameCategory.length > 0 ? sameCategory : fallback).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.excerpt ?? `Guide: ${guide.title}`,
    datePublished: guide._createdAt,
    dateModified: guide._updatedAt ?? guide._createdAt,
    author: { "@type": "Organization", name: "IFEM Education", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "IFEM Education",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/test.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guides/${slug}` },
    articleSection: guide.category,
    timeRequired: `PT${guide.readTime}M`,
    inLanguage: "en-GB",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
      { "@type": "ListItem", position: 3, name: guide.title, item: `${SITE_URL}/guides/${slug}` },
    ],
  };

  return (
    <div className="w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <PageContentWrapper>
        <BackNav />
        <ArticleHeader guide={guide} slug={slug} />
        <ArticleContent guide={guide} />
        <RelatedGuides guides={relatedGuides} category={guide.category} />
        <GuideCTASection />
      </PageContentWrapper>
    </div>
  );
}

export async function generateStaticParams() {
  const guides = await getGuides();
  if (!guides) return [];
  return guides.map((guide: { slug: { current: string } }) => ({
    slug: guide.slug.current,
  }));
}
