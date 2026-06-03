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

const SITE_URL = "https://www.ifemeducation.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) return {};

  return {
    title: guide.title,
    description:
      guide.excerpt ??
      `A comprehensive guide on ${guide.title}. Everything Nigerian students need to know about ${guide.category}.`,
    alternates: { canonical: `/guides/${slug}` },
    openGraph: {
      title: `${guide.title} | IFEM Education`,
      description:
        guide.excerpt ??
        `Guide: ${guide.title}. ${guide.readTime} minute read on ${guide.category}.`,
      url: `/guides/${slug}`,
      type: "article",
    },
  };
}

export default async function GuideDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);

  if (!guide) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.excerpt ?? `Guide: ${guide.title}`,
    datePublished: guide._createdAt,
    author: {
      "@type": "Organization",
      name: "IFEM Education",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "IFEM Education",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/test.png` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guides/${slug}`,
    },
    articleSection: guide.category,
    timeRequired: `PT${guide.readTime}M`,
  };

  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <PageContentWrapper>
        {/* Back */}
        <div className="pb-4 mb-8 border-b border-sage/20 md:mb-12">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 text-forest hover:gap-3 transition-all text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 rounded"
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
                {guide.category}
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
