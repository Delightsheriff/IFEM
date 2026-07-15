import type { Metadata } from "next";
import { REVALIDATE } from "@/lib/revalidate";
export const revalidate = REVALIDATE;

import StoriesHero from "@/components/stories-hero";
import StudentJourney from "@/components/student-journey";
import { CTASection } from "@/components/ui/cta-section";
import { ProgramsSection } from "@/components/success-stories/ProgramsSection";
import {
  getSuccessStories,
  getFeaturedSuccessStories,
  getSiteStats,
} from "@/sanity/sanity";
import { resolveSiteStats } from "@/lib/site-stats";
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

      <StoriesHero stories={allStories} stats={stats} />
      <StudentJourney stories={journeyStories} />
      <ProgramsSection />

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
