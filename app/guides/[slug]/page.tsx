import type { Metadata } from "next";

export const revalidate = 3600;

import { customPortableTextComponents } from "@/components/portable-text-components";
import PageContentWrapper from "@/components/ui/page-content-wrapper";
import { formatDate } from "@/lib/utils";
import { getGuideBySlug, getGuides } from "@/sanity/sanity";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PortableText } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShareGuide } from "@/components/share-guide";
import { ReadingProgress } from "@/components/reading-progress";
import { getGuideCategoryLabel } from "@/lib/guide-categories";
import type { Guide } from "@/interface/sanity";
import { GraduationCap } from "lucide-react";
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

  return {
    title,
    description,
    alternates: { canonical: `/guides/${slug}` },
    openGraph: {
      title: `${title} | IFEM Education`,
      description,
      url: `/guides/${slug}`,
      type: "article",
      ...(ogImages ? { images: ogImages } : {}),
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

  // "Read next" — up to 3 guides in the same category, excluding the
  // current one. Falls back to the most recent other guides so the
  // section never reads as a dead end.
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
    author: {
      "@type": "Organization",
      name: "IFEM Education",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "IFEM Education",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/test.png` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guides/${slug}`,
    },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <ReadingProgress />

      <PageContentWrapper>
        {/* Back */}
        <div className="pb-4 mb-8 border-b border-sage/20 md:mb-12">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 text-forest hover:gap-3 transition-all text-sm font-semibold focus-ring rounded-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Guides
            </Link>
          </div>
        </div>

        {/* Article header */}
        <section className="pb-8 md:pb-12">
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-block px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-forest bg-forest/8 border border-forest/15">
                {getGuideCategoryLabel(guide.category)}
              </span>
              <span className="text-xs text-gray">{guide.readTime} min read</span>
              <span className="hidden sm:inline text-xs text-gray/40">—</span>
              <span className="text-xs text-gray">{formatDate(guide._createdAt)}</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal leading-tight">
              {guide.title}
            </h1>
            {guide.excerpt && (
              <p className="mt-4 text-lg text-gray leading-relaxed max-w-2xl">
                {guide.excerpt}
              </p>
            )}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center bg-forest/8 shrink-0">
                <GraduationCap
                  className="h-4 w-4 text-forest"
                  aria-hidden="true"
                />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-charcoal">
                  IFEM Education editorial team
                </p>
                <p className="text-[11px] uppercase tracking-widest text-gray">
                  UK admissions counsellors
                </p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-sage/20">
              <ShareGuide
                title={guide.title}
                url={`${SITE_URL}/guides/${slug}`}
              />
            </div>
          </div>
        </section>

        {/* Article content */}
        <section className="pb-16 md:pb-20">
          <div className="mx-auto max-w-3xl">
            <PortableText
              value={guide.content}
              components={customPortableTextComponents}
            />
          </div>
        </section>

        {/* Read next */}
        {relatedGuides.length > 0 && (
          <section className="pb-16 md:pb-20 border-t border-sage/20 pt-12 md:pt-16">
            <div className="mx-auto max-w-5xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="block w-8 h-px bg-forest" aria-hidden="true" />
                <p className="text-forest font-sans text-xs font-semibold uppercase tracking-widest">
                  Read Next
                </p>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-charcoal mb-8 leading-tight">
                More {getGuideCategoryLabel(guide.category)} guides
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                {relatedGuides.map((related) => (
                  <Link
                    key={related._id}
                    href={`/guides/${related.slug.current}`}
                    className="group flex flex-col p-5 bg-white border border-sage/20 hover:border-forest/30 hover:shadow-md transition-all duration-200 focus:outline-none focus-ring"
                  >
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-block px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-forest bg-forest/8 border border-forest/15">
                        {getGuideCategoryLabel(related.category)}
                      </span>
                      <span className="text-[11px] text-gray whitespace-nowrap">
                        {related.readTime} min
                      </span>
                    </div>
                    <h3 className="font-serif text-base md:text-lg font-bold text-charcoal mb-2 group-hover:text-forest transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-gray text-xs leading-relaxed line-clamp-3 mb-3 flex-1">
                      {related.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-forest text-xs font-semibold group-hover:gap-2 transition-all">
                      Read
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-14 md:py-20 px-8 bg-forest -mx-4 md:-mx-6 text-white text-center">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-widest text-white/50 mb-4">
            Next Steps
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Take Your Next Step?
          </h2>
          <p className="text-white/70 text-base mb-8 max-w-xl mx-auto leading-relaxed">
            Get personalised guidance from our education consultants to help
            you achieve your UK education goals — completely free.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-forest font-semibold text-sm tracking-wide rounded-sm hover:bg-cream transition-colors"
          >
            Schedule a Free Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
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
