import type { Metadata } from "next";

export const revalidate = 3600;

import { CTASection } from "@/components/ui/cta-section";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsBanner } from "@/components/home/StatsBanner";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ServicesSection } from "@/components/home/ServicesSection";
import { PartnerUniversities } from "@/components/home/PartnerUniversities";
import { SuccessStorySection } from "@/components/home/SuccessStorySection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { FALLBACK_UNIVERSITIES } from "@/interface/universities";
import { getFeaturedSuccessStories, getFeaturedUniversities, getSiteStats } from "@/sanity/sanity";
import { resolveSiteStats } from "@/lib/site-stats";

export const metadata: Metadata = {
  title: "IFEM Education — Free UK Admission & Visa for Nigerians",
  description:
    "Nigeria's leading UK education consultancy. 99.6% visa success rate, 47+ partner universities, free admission processing and visa guidance. Over 1,800 Nigerian students placed in top UK universities.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "IFEM Education — Free UK Admission & Visa for Nigerians",
    description:
      "Free UK university admission and visa processing. 99.6% visa success rate, 47+ partner institutions. Trusted by 1,800+ Nigerian students.",
    url: "/",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "IFEM Education — Nigeria's Gateway to UK Universities" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IFEM Education — Free UK Admission & Visa for Nigerians",
    description: "Free UK university admission and visa processing. 99.6% visa success rate, 47+ partner institutions. Trusted by 1,800+ Nigerian students.",
    images: ["/opengraph-image"],
  },
};

export default async function Home() {
  const [siteStats, sanityUniversities, featuredStories] = await Promise.all([
    getSiteStats(),
    getFeaturedUniversities(),
    getFeaturedSuccessStories(),
  ]);
  const spotlightStory = featuredStories[0] ?? null;
  const universities = sanityUniversities.length > 0 ? sanityUniversities : FALLBACK_UNIVERSITIES;
  const resolved = resolveSiteStats(siteStats);
  const stats = {
    studentsPlaced:        resolved.studentsPlaced,
    partnerUkUniversities: resolved.partnerUniversities,
    yearsOfExperience:     resolved.yearsInService,
    successRate:           resolved.visaSuccessRate,
  };

  return (
    <div className="w-full overflow-hidden">
      <HeroSection />
      <StatsBanner stats={stats} />
      <HowItWorks />
      <ServicesSection />
      <PartnerUniversities universities={universities} partnerCount={stats.partnerUkUniversities} />
      <SuccessStorySection spotlightStory={spotlightStory} stats={stats} />
      <NewsletterSection />
      <CTASection
        variant="forest"
        heading="Ready to Study in the UK?"
        description="Join over 1,800 students who have achieved their educational dreams with IFEM Education. Your journey starts with a free consultation."
        primaryLink="/contact"
        primaryLabel="Get In Touch"
        secondaryLink="/guides"
        secondaryLabel="Explore Our Guides"
      />
    </div>
  );
}
