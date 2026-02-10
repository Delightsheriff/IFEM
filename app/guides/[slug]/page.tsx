import { customPortableTextComponents } from "@/components/portable-text-components";
import PageContentWrapper from "@/components/ui/page-content-wrapper";
import { formatDate } from "@/lib/utils";
import { getGuideBySlug, getGuides } from "@/sanity/sanity";
import { ArrowLeft } from "lucide-react";
import { PortableText } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

async function GuideDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }
  return (
    <PageContentWrapper>
      {/* Back button */}
      <div className="pb-4 mb-6 md:pb-8 md:mb-12">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-forest hover:gap-3 transition-all font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Guides
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <section className="pb-8 md:pb-12">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4 md:mb-6">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-forest bg-forest/10 rounded-full">
              {guide.category}
            </span>
            <span className="text-sm text-gray">
              {guide.readTime} mins read
            </span>
            <span className="hidden sm:inline text-sm text-gray">•</span>
            <span className="text-sm text-gray">
              {formatDate(guide._createdAt)}
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-charcoal text-balance leading-tight">
            {guide.title}
          </h1>
        </div>
      </section>

      {/* Article Content */}
      <section className="flex-1 pb-12 md:pb-16">
        <div className="mx-auto max-w-3xl">
          <PortableText
            value={guide.content}
            components={customPortableTextComponents}
          />
        </div>
      </section>

      {/* Next Steps CTA */}
      <section className="py-12 md:py-16 lg:py-24 px-4 bg-white border-t border-sage/30 -mx-4 md:-mx-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-charcoal mb-3 md:mb-4">
            Ready to Take Your Next Step?
          </h2>
          <p className="text-base md:text-lg text-gray mb-6 md:mb-8">
            Get personalized guidance from our education consultants to help you
            achieve your UK education goals.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-forest text-white font-semibold rounded-lg hover:bg-forest/90 transition-colors"
          >
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </PageContentWrapper>
  );
}

export default GuideDetails;
export async function generateStaticParams() {
  const guides = await getGuides();
  if (!guides) return [];

  return guides.map((guide: { slug: { current: string } }) => ({
    slug: guide.slug.current,
  }));
}
