import { customPortableTextComponents } from "@/components/portable-text-components";
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
    <main>
      <div className="pb-8 ">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-forest hover:gap-3 transition-all font-semibold mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Guides
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <section className="px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-forest bg-forest/10 rounded-full">
              {guide.category}
            </span>
            <span className="text-sm text-gray">
              {guide.readTime} mins read
            </span>
            <span className="text-sm text-gray">
              {formatDate(guide._createdAt)}
            </span>
          </div>

          <h1 className="font-serif text-5xl md:text-6xl font-bold text-charcoal mb-6 text-balance leading-tight">
            {guide.title}
          </h1>
        </div>
      </section>

      {/* Article Content */}
      <section className="flex-1 px-4 py-12 ">
        <div className="mx-auto max-w-3xl">
          <PortableText
            value={guide.content}
            components={customPortableTextComponents}
          />
        </div>
      </section>

      {/* Next Steps CTA */}
      <section className="py-16 md:py-24 px-4 bg-white border-t border-sage/30">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-4">
            Ready to Take Your Next Step?
          </h2>
          <p className="text-lg text-gray mb-8">
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
    </main>
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
