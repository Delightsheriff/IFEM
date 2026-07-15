import type { Metadata } from "next";
export const revalidate = 3600;
import { Guide } from "@/interface/sanity";
import { getGuides } from "@/sanity/sanity";
import { CTASection } from "@/components/ui/cta-section";
import { GuidesExplorer } from "@/components/guides-explorer";
import { ListHeroSection } from "@/components/guides/ListHeroSection";
import { EmptyGuidesState } from "@/components/guides/EmptyGuidesState";

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
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "IFEM Education UK Study Guides" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "UK Study Guides — Visa, Admissions & Financial Planning",
    description: "Free expert guides for Nigerian students on UK visas, admissions, fees, and life in the UK.",
    images: ["/opengraph-image"],
  },
};

export default async function Guides() {
  const guides: Guide[] = await getGuides();

  return (
    <div className="w-full">
      <ListHeroSection />

      <section className="border-t border-[#e2e2de] bg-white px-4 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          {guides.length > 0 ? (
            <GuidesExplorer guides={guides} />
          ) : (
            <EmptyGuidesState />
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
