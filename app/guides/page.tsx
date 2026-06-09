import type { Metadata } from "next";
export const revalidate = 3600;
import { Guide } from "@/interface/sanity";
import { getGuides } from "@/sanity/sanity";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { CTASection } from "@/components/ui/cta-section";
import PageContentWrapper from "@/components/ui/page-content-wrapper";
import { FadeUp } from "@/components/ui/animate";
import { GuidesExplorer } from "@/components/guides-explorer";

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
          <FadeUp mount className="max-w-2xl pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-8 h-px bg-forest" aria-hidden="true" />
              <p className="text-forest font-sans text-xs font-semibold uppercase tracking-widest">
                Resources
              </p>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal leading-tight mb-4">
              <span className="hero-blur-1">Resources &amp; Guides</span>
            </h1>
            <p className="text-gray leading-relaxed">
              Everything you need to know about studying in the UK — from visa
              requirements to financial planning, written by our expert
              counsellors.
            </p>
          </FadeUp>
        </PageContentWrapper>
      </div>

      {/* Explorer */}
      <PageContentWrapper>
        <div className="mx-auto max-w-6xl py-4">
          {guides.length > 0 ? (
            <GuidesExplorer guides={guides} />
          ) : (
            <div className="rounded-sm border border-sage/20 bg-sage/5 p-10 text-center min-h-72 flex flex-col items-center justify-center">
              <div className="w-10 h-10 bg-forest/10 text-forest rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-5 h-5" aria-hidden="true" />
              </div>
              <p className="font-serif text-xl font-semibold text-charcoal mb-2">
                No Guides Available
              </p>
              <p className="text-gray text-sm max-w-md mb-5">
                We&apos;re currently writing resources for your UK education journey.
                Check back soon — or get in touch with a counsellor today.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-forest hover:bg-forest-deep transition-colors focus-ring"
              >
                Contact Us for Help
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
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
