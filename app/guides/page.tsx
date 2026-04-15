import type { Metadata } from "next";
export const revalidate = 3600;
import { Guide } from "@/interface/sanity";
import { getGuides } from "@/sanity/sanity";
import Link from "next/link";
import { EmptyState } from "@/components/empty-state";
import { BookOpen, ArrowRight } from "lucide-react";
import { CTASection } from "@/components/ui/cta-section";
import PageContentWrapper from "@/components/ui/page-content-wrapper";
import { Stagger, StaggerChild } from "@/components/ui/animate";

export const metadata: Metadata = {
  title: "UK Study Guides — Visa, Admissions & Financial Planning",
  description:
    "Free guides for Nigerian students on how to apply to UK universities, get a UK student visa, plan finances, choose the right course, and prepare for life in the UK.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Resources & Guides | IFEM Education — UK Study Help for Nigerians",
    description:
      "Free, expert-written guides on UK student visa requirements, admission processes, tuition fees, scholarships, and IELTS for Nigerian students.",
    url: "/guides",
  },
};

export default async function Guides() {
  const guides: Guide[] = await getGuides();

  return (
    <div className="w-full">
      {/* Hero */}
      <div className="bg-cream border-b border-sage/20">
        <PageContentWrapper>
          <div className="max-w-2xl pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-8 h-px bg-forest" />
              <p className="text-forest font-sans text-xs font-semibold uppercase tracking-widest">
                Resources
              </p>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal leading-tight mb-4">
              Resources &amp; Guides
            </h1>
            <p className="text-gray leading-relaxed">
              Everything you need to know about studying in the UK — from visa
              requirements to financial planning, written by our expert
              counsellors.
            </p>
          </div>
        </PageContentWrapper>
      </div>

      {/* Guides Grid */}
      <PageContentWrapper>
        <div className="mx-auto max-w-3xl py-4">
          {guides.length > 0 ? (
            <Stagger className="space-y-3">
              {guides.map((guide) => (
                <StaggerChild key={guide._id}>
                <Link
                  href={`/guides/${guide.slug.current}`}
                  className="group block p-6 md:p-8 bg-white border border-sage/20 hover:border-forest/30 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className="inline-block px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-forest bg-forest/8 border border-forest/15">
                      {guide.category}
                    </span>
                    <span className="text-xs text-gray whitespace-nowrap shrink-0">
                      {guide.readTime} min read
                    </span>
                  </div>
                  <h2 className="font-serif text-xl md:text-2xl font-bold text-charcoal mb-2 group-hover:text-forest transition-colors line-clamp-2">
                    {guide.title}
                  </h2>
                  <p className="text-gray text-sm leading-relaxed mb-4 line-clamp-2">
                    {guide.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-forest text-sm font-semibold group-hover:gap-3 transition-all">
                    Read Guide
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
                </StaggerChild>
              ))}
            </Stagger>
          ) : (
            <EmptyState
              icon={<BookOpen className="w-6 h-6" />}
              title="No Guides Available"
              description="We are currently working on creating helpful resources and guides for your UK education journey. Check back soon for comprehensive guides on visas, financial planning, and more."
              ctaText="Contact Us for Help"
              onCta={() => (window.location.href = "/contact")}
              className="min-h-100"
            />
          )}
        </div>
      </PageContentWrapper>

      <CTASection
        variant="forest"
        heading="Ready to Start Your Journey?"
        description="Get personalised guidance from our education consultants to find the perfect UK university for your goals."
        primaryLink="/contact"
        primaryLabel="Get Started Today"
      />
    </div>
  );
}
