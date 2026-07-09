import type { Metadata } from "next";
export const revalidate = 3600;
import { Guide } from "@/interface/sanity";
import { getGuides } from "@/sanity/sanity";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { CTASection } from "@/components/ui/cta-section";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { IOReveal } from "@/components/animations/IOReveal";
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

const GUIDE_TOPICS = [
  { title: "Visa", desc: "UK Student visa requirements, timelines, and documentation" },
  { title: "Admissions", desc: "How to apply, deadlines, personal statements, and offers" },
  { title: "Finance", desc: "Tuition fees, scholarships, bursaries, and budgeting" },
  { title: "Life in the UK", desc: "Accommodation, travel, culture, and settling in" },
];

export default async function Guides() {
  const guides: Guide[] = await getGuides();

  return (
    <div className="w-full">
      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="bg-cream relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(0,107,56,0.04) 80px)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8 pt-16 pb-14 md:pt-20 md:pb-16">
          <FadeUp mount>
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-5">
                <span aria-hidden="true" className="block w-8 h-px bg-forest" />
                <SectionEyebrow tone="forest">Free Resources</SectionEyebrow>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-charcoal leading-[1.04] mb-6">
                <span className="hero-blur-1">Resources &amp;</span>{" "}
                <span className="hero-blur-2 text-forest">Guides</span>
              </h1>
              <p className="text-charcoal/55 text-lg leading-relaxed max-w-xl">
                Everything you need to know about studying in the UK — from visa requirements to financial planning,
                written by our expert counsellors.
              </p>

              {/* Topic pills */}
              <div className="flex flex-wrap gap-2 mt-8">
                {GUIDE_TOPICS.map((topic) => (
                  <span
                    key={topic.title}
                    title={topic.desc}
                    className="inline-flex items-center px-3 py-1.5 border border-sage/30 bg-white/70 text-[12px] font-medium text-charcoal/60 hover:border-forest hover:text-forest transition-colors duration-200 cursor-default"
                  >
                    {topic.title}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── GUIDES EXPLORER ─────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4 md:px-6 border-t border-sage/10 bg-white">
        <div className="mx-auto max-w-7xl">
          {guides.length > 0 ? (
            <GuidesExplorer guides={guides} />
          ) : (
            /* Premium empty state */
            <IOReveal>
              <div className="io-reveal">
                <div className="max-w-2xl mx-auto py-20 text-center">
                  <div className="w-14 h-14 bg-forest/8 flex items-center justify-center mx-auto mb-6">
                    <BookOpen aria-hidden="true" className="w-6 h-6 text-forest" />
                  </div>
                  <div className="w-8 h-px bg-forest mx-auto mb-6" aria-hidden="true" />
                  <h2 className="font-serif text-2xl font-bold text-charcoal mb-3">
                    Guides Coming Soon
                  </h2>
                  <p className="text-charcoal/50 text-[14px] leading-relaxed max-w-sm mx-auto mb-8">
                    Our counsellors are currently writing expert guides for your UK education journey.
                    Check back soon — or speak to a counsellor directly today.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-forest hover:bg-forest-deep text-white text-[13.5px] font-semibold px-6 py-3 transition-colors duration-200 focus-ring"
                  >
                    Contact a Counsellor
                    <ArrowRight aria-hidden="true" className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </IOReveal>
          )}
        </div>
      </section>

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
