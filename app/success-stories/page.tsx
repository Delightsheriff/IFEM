import type { Metadata } from "next";
export const revalidate = 3600;

import StoriesHero from "@/components/stories-hero";
import StudentJourney from "@/components/student-journey";
import { CTASection } from "@/components/ui/cta-section";
import {
  getSuccessStories,
  getFeaturedSuccessStories,
  getSiteStats,
} from "@/sanity/sanity";
import { resolveSiteStats } from "@/lib/site-stats";
import { GraduationCap, Award } from "lucide-react";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Student Success Stories — Nigerian Students in UK Universities",
  description:
    "Read real testimonials from 1,800+ Nigerian students who gained admission to top UK universities through IFEM Education's free consultancy service. Real journeys, real results.",
  alternates: { canonical: "/success-stories" },
  openGraph: {
    title: "Success Stories | IFEM Education — Nigerian Students in the UK",
    description:
      "1,800+ real stories from Nigerian students who made it to UK universities with IFEM's free support. Undergraduate, Masters, PhD — all levels.",
    url: "/success-stories",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "IFEM Education Student Success Stories" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Success Stories — Nigerian Students in UK Universities",
    description: "1,800+ real stories from Nigerian students who made it to UK universities with IFEM's free support.",
    images: ["/opengraph-image"],
  },
};

const PROGRAMS = [
  {
    icon: GraduationCap,
    label: "01",
    title: "Undergraduate",
    desc: "Foundation years, top-up programmes, and full Bachelor's degrees across every discipline.",
  },
  {
    icon: Award,
    label: "02",
    title: "Postgraduate",
    desc: "Pre-Master's, extended Master's, taught and research Master's, and doctoral programmes.",
  },
];

export default async function SuccessStories() {
  const [allStories, featuredStories, siteStats] = await Promise.all([
    getSuccessStories(),
    getFeaturedSuccessStories(),
    getSiteStats(),
  ]);

  const journeyStories = allStories.length > 0 ? allStories : featuredStories;
  const resolved = resolveSiteStats(siteStats);
  const stats = {
    studentsPlaced: resolved.studentsPlaced,
    successRate: resolved.visaSuccessRate,
    yearsOfExperience: resolved.yearsInService,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Success Stories", item: `${SITE_URL}/success-stories` },
    ],
  };

  const aggregateRatingSchema = allStories.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          bestRating: "5",
          reviewCount: stats.studentsPlaced,
        },
        review: allStories.slice(0, 12).map((s) => ({
          "@type": "Review",
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
          author: { "@type": "Person", name: s.studentName },
          reviewBody: s.comment,
          itemReviewed: { "@type": "EducationalOrganization", name: s.schoolDestination },
        })),
      }
    : null;

  return (
    <main className="w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {aggregateRatingSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }} />
      )}

      {/* Cinematic hero with floating student photo tiles */}
      <StoriesHero stories={allStories} stats={stats} />

      {/* Testimonials grid + featured story */}
      <StudentJourney stories={journeyStories} />

      {/* ── STUDY LEVELS ──────────────────────────────────────────── */}
      <section className="border-t border-[#e2e2de] bg-white px-6 py-24 md:py-32 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center" data-reveal="fade-up">
            <p className="mb-4 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
              <span className="h-px w-6 bg-[#1a5c34]" />
              Study Levels
              <span className="h-px w-6 bg-[#1a5c34]" />
            </p>
            <h2
              className="mb-4 font-sans font-extrabold leading-[1.08] tracking-tight text-[#111111]"
              style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
            >
              Programmes Our Students Excel In
            </h2>
            <p className="mx-auto max-w-2xl text-[1rem] leading-[1.75] text-[#7a7a7a]">
              We guide students at every academic level, from undergraduate entry to doctoral research.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-px bg-[#e2e2de] md:grid-cols-2">
            {PROGRAMS.map((program, i) => (
              <div
                key={program.title}
                className="group relative overflow-hidden bg-white p-10 transition-colors duration-200 hover:bg-[#fafaf7]"
                data-reveal="fade-up"
                style={{ "--reveal-delay": `${i * 0.1}s` } as React.CSSProperties}
              >
                <span
                  aria-hidden="true"
                  className="absolute right-7 top-6 select-none font-sans text-5xl font-extrabold leading-none text-[#f3f3ef] transition-colors duration-200 group-hover:text-[#e8f3ec]"
                >
                  {program.label}
                </span>
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-lg bg-[#e8f3ec] transition-colors duration-200 group-hover:bg-[#1a5c34]">
                  <program.icon aria-hidden="true" className="h-5 w-5 text-[#1a5c34] transition-colors duration-200 group-hover:text-white" />
                </div>
                <div className="mb-5 h-px w-8 bg-[#1a5c34]" aria-hidden="true" />
                <h3 className="mb-3 font-sans text-xl font-bold text-[#111111]">{program.title}</h3>
                <p className="max-w-xs text-[13.5px] leading-relaxed text-[#7a7a7a]">{program.desc}</p>
                <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#1a5c34] transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        variant="forest"
        heading="Ready to Write Your Success Story?"
        description="Join hundreds of students who have transformed their lives through quality UK education. Your journey starts with a free consultation."
        primaryLink="/contact"
        primaryLabel="Start Your Journey"
        secondaryLink="/faq"
        secondaryLabel="Learn More"
      />
    </main>
  );
}
