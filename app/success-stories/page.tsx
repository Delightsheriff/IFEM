import type { Metadata } from "next";
export const revalidate = 3600;

import StoriesHero from "@/components/stories-hero";
import StudentJourney from "@/components/student-journey";
import { CTASection } from "@/components/ui/cta-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { IOReveal } from "@/components/animations/IOReveal";
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
      <section className="py-24 md:py-32 px-4 bg-white border-t border-sage/10">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="Study Levels"
            heading="Programmes Our Students Excel In"
            subtitle="We guide students at every academic level, from undergraduate entry to doctoral research."
          />

          <div className="grid md:grid-cols-2 gap-px bg-sage/10 max-w-4xl mx-auto">
            {PROGRAMS.map((program) => (
              <IOReveal key={program.title}>
                <div className="io-reveal group bg-white hover:bg-cream transition-colors duration-300 p-10 relative overflow-hidden">
                  {/* Large ghost label */}
                  <span
                    aria-hidden="true"
                    className="absolute top-6 right-7 font-serif text-5xl font-bold text-sage/12 leading-none select-none group-hover:text-forest/10 transition-colors duration-300"
                  >
                    {program.label}
                  </span>
                  {/* Icon */}
                  <div className="w-11 h-11 bg-forest/8 flex items-center justify-center mb-6 group-hover:bg-forest transition-colors duration-300">
                    <program.icon aria-hidden="true" className="w-5 h-5 text-forest group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="w-8 h-px bg-forest mb-5" aria-hidden="true" />
                  <h3 className="font-serif font-bold text-charcoal text-xl mb-3">{program.title}</h3>
                  <p className="text-charcoal/50 text-[13.5px] leading-relaxed max-w-xs">{program.desc}</p>
                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-forest scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>
              </IOReveal>
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
