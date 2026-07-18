import type { Metadata } from "next";
export const revalidate = 3600;

import { CTASection } from "@/components/ui/cta-section";
import { HeroSection } from "@/components/about/HeroSection";
import { StatsBanner } from "@/components/about/StatsBanner";
import { DifferenceSection } from "@/components/about/DifferenceSection";
import { MissionSection } from "@/components/about/MissionSection";
import { FounderSection } from "@/components/about/FounderSection";
import { TeamSection } from "@/components/about/TeamSection";
import { ValuesSection } from "@/components/about/ValuesSection";
import { getAboutDetails, getSiteStats, getTeamMembers } from "@/sanity/sanity";
import { resolveSiteStats } from "@/lib/site-stats";

export const metadata: Metadata = {
  title: "About IFEM Education — Nigeria's Leading UK University Consultancy",
  description: "Founded in 2022, IFEM Education has placed 1,800+ Nigerian students in top UK universities with a 99.6% visa success rate. 100% free admission and visa processing.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About IFEM Education | Nigeria's Leading UK University Experts",
    description: "1,800+ students placed. 99.6% visa success rate. Free admission and visa processing since 2022.",
    url: "/about",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "IFEM Education Team" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About IFEM Education — Nigeria's Leading UK University Consultancy",
    description: "1,800+ students placed. 99.6% visa success rate. Free admission and visa processing since 2022.",
    images: ["/opengraph-image"],
  },
};

export default async function About() {
  const [teamMembers, aboutDetails, siteStats] = await Promise.all([
    getTeamMembers(), getAboutDetails(), getSiteStats(),
  ]);
  const resolved = resolveSiteStats(siteStats);
  const stats = [
    { label: "Students Placed",     value: resolved.studentsPlaced,    suffix: "+", sub: "Across Africa" },
    { label: "Partner Universities", value: resolved.partnerUniversities, suffix: "+", sub: "Across the UK" },
    { label: "Visa Success Rate",    value: resolved.visaSuccessRate,   suffix: "%", sub: "Proven Track Record" },
    { label: "Years in Service",     value: resolved.yearsInService,    suffix: "+", sub: "Est. 2022" },
  ];

  return (
    <div className="w-full">
      <HeroSection aboutDetails={aboutDetails} />
      <StatsBanner stats={stats} />
      <DifferenceSection />
      <MissionSection missions={aboutDetails?.missions ?? []} />
      <FounderSection
        founder={aboutDetails?.founder ?? null}
        coFounder={aboutDetails?.coFounder ?? null}
      />
      <TeamSection teamMembers={teamMembers} />
      <ValuesSection values={aboutDetails?.values ?? []} />

      <CTASection
        variant="forest"
        heading="Ready to Start Your Journey?"
        description="Join thousands of students who have successfully achieved their educational dreams with our guidance and support."
        primaryLink="/contact"
        primaryLabel="Get Started"
        secondaryLink="/news-and-events"
        secondaryLabel="Learn More"
      />
    </div>
  );
}
