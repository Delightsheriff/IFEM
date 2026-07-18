import type { Metadata } from "next";

export const revalidate = 3600;

import { CTASection } from "@/components/ui/cta-section";
import BranchesSection from "@/components/branches-section";
import { OfficeAddressStrip } from "@/components/contact/OfficeAddressStrip";
import { HeroFormSection } from "@/components/contact/HeroFormSection";
import { TeamSection } from "@/components/contact/TeamSection";
import { getBranches, getTeamMembers } from "@/sanity/sanity";

export const metadata: Metadata = {
  title: "Contact Us — Book a Free UK University Consultation",
  description:
    "Speak with an IFEM Education counsellor today. Book a free consultation, visit our offices in Nigeria, or message us to start your UK university application journey.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact IFEM Education | Free UK University Consultation",
    description:
      "Book a free consultation with our expert UK admission counsellors. Offices across Nigeria. No fees, no commitments.",
    url: "/contact",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Contact IFEM Education" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact IFEM Education — Book a Free Consultation",
    description: "Expert UK admission counsellors. Offices across Nigeria. Free, no commitment consultations.",
    images: ["/opengraph-image"],
  },
};

export default async function Contact() {
  const [branches, teamMembers] = await Promise.all([
    getBranches(),
    getTeamMembers(),
  ]);

  return (
    <div className="w-full">
      <OfficeAddressStrip branches={branches} />
      <HeroFormSection />
      <TeamSection teamMembers={teamMembers} />
      <BranchesSection branches={branches} />
      <CTASection
        variant="forest"
        heading="Not Sure Where to Start?"
        description="Check out our FAQ section or schedule a free consultation with one of our education advisors."
        primaryLink="/faq"
        primaryLabel="View FAQ"
        secondaryLink="/news-and-events"
        secondaryLabel="Read Our Articles"
      />
    </div>
  );
}
