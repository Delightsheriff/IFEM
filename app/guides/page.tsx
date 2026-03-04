import type { Metadata } from "next";
import { Guide } from "@/interface/sanity";

export const metadata: Metadata = {
  title: "Resources & Guides",
  description:
    "Comprehensive guides on studying in the UK — visa requirements, financial planning, university applications, and everything you need to know for your UK education journey.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Resources & Guides | IFEM Education",
    description:
      "Visa requirements, financial planning, university applications, and everything for your UK education journey.",
    url: "/guides",
  },
};
import { getGuides } from "@/sanity/sanity";
import Link from "next/link";
import { EmptyState } from "@/components/empty-state";
import { BookOpen } from "lucide-react";
import { CTASection } from "@/components/ui/cta-section";
import PageContentWrapper from "@/components/ui/page-content-wrapper";

export default async function Guides() {
  const guides: Guide[] = await getGuides();
  return (
    <PageContentWrapper>
      {/* Hero Section */}
      <section className="border-b border-sage/20 pb-6 mb-8 md:pb-8 md:mb-12">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-forest mb-3 md:mb-4 text-balance">
            Resources & Guides
          </h1>
          <p className="text-base md:text-lg text-gray leading-relaxed">
            Everything you need to know about studying in the UK. From visa
            requirements to financial planning, we&apos;ve got you covered with
            comprehensive guides.
          </p>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-6 md:py-8">
        <div className="mx-auto max-w-3xl">
          {guides.length > 0 ? (
            <div className="space-y-4">
              {guides.map((guide) => (
                <Link
                  key={guide._id}
                  href={`/guides/${guide.slug.current}`}
                  className="group block p-5 md:p-6 lg:p-8 bg-white border border-sage/30 rounded-lg hover:border-forest/30 hover:shadow-lg transition-all duration-300"
                >
                  {/* Category Badge */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-forest bg-forest/10 rounded-full">
                      {guide.category}
                    </span>
                    <span className="text-xs text-gray whitespace-nowrap">
                      {guide.readTime} mins read
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-serif text-xl md:text-2xl lg:text-3xl font-bold text-charcoal mb-2 md:mb-3 group-hover:text-forest transition-colors line-clamp-2">
                    {guide.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-charcoal text-sm md:text-base lg:text-lg leading-relaxed mb-3 md:mb-4 line-clamp-2">
                    {guide.excerpt}
                  </p>

                  {/* Read More Link */}
                  <div className="flex items-center gap-2 text-forest font-semibold group-hover:gap-3 transition-all">
                    Read Guide
                    <span className="text-xl">→</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<BookOpen className="w-6 h-6" />}
              title="No Guides Available"
              description="We're currently working on creating helpful resources and guides for your UK education journey. Check back soon for comprehensive guides on visas, financial planning, and more."
              ctaText="Contact Us for Help"
              onCta={() => (window.location.href = "/contact")}
              className="min-h-100"
            />
          )}
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        variant="forest"
        heading="Ready to Start Your Journey?"
        description="Get personalised guidance from our education consultants to find the perfect UK university for your goals."
        primaryLink="/contact"
        primaryLabel="Get Started Today"
      />
    </PageContentWrapper>
  );
}
