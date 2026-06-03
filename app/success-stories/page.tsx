import type { Metadata } from "next";

export const revalidate = 3600;

import StoriesHero from "@/components/stories-hero";
import StudentJourney from "@/components/student-journey";
import { CTASection } from "@/components/ui/cta-section";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  getSuccessStories,
  getFeaturedSuccessStories,
  getSiteStats,
} from "@/sanity/sanity";
import { resolveSiteStats } from "@/lib/site-stats";

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

import { SITE_URL } from "@/lib/site";

const PROGRAMS = [
  { title: "Undergraduate", desc: "Foundation years, Top-ups and Bachelor's degree programmes." },
  { title: "Postgraduate", desc: "Pre-Master's, Extended master's, Taught and Research master's and doctoral programmes." },
];

export default async function SuccessStories() {
  const [allStories, featuredStories, siteStats] = await Promise.all([
    getSuccessStories(),
    getFeaturedSuccessStories(),
    getSiteStats(),
  ]);

  // Pass the full list so the destination filter inside StudentJourney
  // can offer every option (it slices the visible cards itself).
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
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
          },
          author: { "@type": "Person", name: s.studentName },
          reviewBody: s.comment,
          itemReviewed: {
            "@type": "EducationalOrganization",
            name: s.schoolDestination,
          },
        })),
      }
    : null;

  return (
    <main className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {aggregateRatingSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
        />
      )}

      {/* Cinematic hero — passes real stats from CMS */}
      <StoriesHero stories={allStories} stats={stats} />

      {/* Student journey — testimonials */}
      <StudentJourney stories={journeyStories} />

      {/* Programs */}
      <section className="py-24 md:py-32 px-4 bg-white border-t border-sage/10">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="Study Levels"
            heading="Programs Our Students Excel In"
            subtitle="We guide students at every academic level, from undergraduate entry to doctoral research."
          />
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {PROGRAMS.map((program, i) => (
              <div
                key={program.title}
                className="group border border-sage/20 p-8 bg-cream hover:border-forest/30 hover:bg-white hover:shadow-md transition-all duration-200 relative"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-4 right-5 font-serif text-3xl font-bold text-sage/15 leading-none select-none"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-6 h-0.5 bg-forest mb-5" />
                <p className="font-semibold text-charcoal text-sm mb-2">
                  {program.title}
                </p>
                <p className="text-gray text-xs leading-relaxed">
                  {program.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
