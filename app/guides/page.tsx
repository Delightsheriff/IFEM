import type { Metadata } from "next";
export const revalidate = 3600;
import { Guide } from "@/interface/sanity";
import { getGuides } from "@/sanity/sanity";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { CTASection } from "@/components/ui/cta-section";
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
      <section className="bg-[#fafaf7]">
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-16 md:px-10 md:pb-16 md:pt-20">
          <div className="max-w-3xl" data-reveal="fade-up">
            <p className="mb-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
              <span className="h-px w-6 bg-[#1a5c34]" />
              Free Resources
            </p>
            <h1
              className="mb-6 font-sans font-extrabold leading-[1.04] tracking-[-0.025em] text-[#111111]"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
            >
              <span className="hero-blur-1 block">Resources &amp;</span>
              <span className="hero-blur-2 block text-[#1a5c34]">Guides</span>
            </h1>
            <p className="mb-8 max-w-xl text-lg leading-relaxed text-[#5a5a5a]">
              Everything you need to know about studying in the UK — from visa requirements to financial planning,
              written by our expert counsellors.
            </p>
            {/* Topic pills */}
            <div className="flex flex-wrap gap-2">
              {GUIDE_TOPICS.map((topic) => (
                <span
                  key={topic.title}
                  title={topic.desc}
                  className="inline-flex cursor-default items-center rounded-full border border-[#e2e2de] bg-white px-3 py-1.5 text-[12px] font-medium text-[#7a7a7a] transition-colors duration-200 hover:border-[#1a5c34] hover:text-[#1a5c34]"
                >
                  {topic.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GUIDES EXPLORER ─────────────────────────────────────────── */}
      <section className="border-t border-[#e2e2de] bg-white px-4 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          {guides.length > 0 ? (
            <GuidesExplorer guides={guides} />
          ) : (
            <div className="mx-auto max-w-2xl py-20 text-center" data-reveal="fade-up">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f3ec]">
                <BookOpen aria-hidden="true" className="h-6 w-6 text-[#1a5c34]" />
              </div>
              <div className="mx-auto mb-6 h-px w-8 bg-[#1a5c34]" aria-hidden="true" />
              <h2 className="mb-3 font-sans text-2xl font-bold text-[#111111]">
                Guides Coming Soon
              </h2>
              <p className="mx-auto mb-8 max-w-sm text-[14px] leading-relaxed text-[#7a7a7a]">
                Our counsellors are currently writing expert guides for your UK education journey.
                Check back soon — or speak to a counsellor directly today.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-[#1a5c34] px-6 py-3 text-[13.5px] font-semibold text-white transition-colors duration-200 hover:bg-[#154a2a]"
              >
                Contact a Counsellor
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
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
