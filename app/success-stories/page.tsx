import type { Metadata } from "next";
import StoriesHero from "@/components/stories-hero";
import StudentJourney from "@/components/student-journey";
import { StatsBar } from "@/components/stats-bar";
import { CTASection } from "@/components/ui/cta-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getSuccessStories, getFeaturedSuccessStories } from "@/sanity/sanity";

export const metadata: Metadata = {
  title: "Success Stories",
  description:
    "Read real stories from students who achieved their UK education dreams with IFEM Education. 1800+ students placed with a 99.6% visa success rate.",
  alternates: { canonical: "/success-stories" },
  openGraph: {
    title: "Success Stories | IFEM Education",
    description:
      "Real stories from students who achieved their UK education dreams. 1800+ students placed with 99.6% visa success rate.",
    url: "/success-stories",
  },
};

const PROGRAMS = [
  "Undergraduate",
  "Master's Degrees",
  "PhD Programs",
  "Exchange Programs",
];

export default async function SuccessStories() {
  const [allStories, featuredStories] = await Promise.all([
    getSuccessStories(),
    getFeaturedSuccessStories(),
  ]);

  const journeyStories =
    featuredStories.length > 0 ? featuredStories : allStories.slice(0, 6);

  return (
    <main className="w-full">
      {/* Cinematic Hero */}
      <StoriesHero stories={allStories} />

      {/* Student Journey — testimonials and stories */}
      <StudentJourney stories={journeyStories} />

      {/* Stats */}
      <StatsBar variant="white" />

      {/* Programs */}
      <section className="py-24 md:py-32 px-4 bg-white border-t border-sage/10">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="Study Levels"
            heading="Programs Our Students Excel In"
            subtitle="We guide students at every academic level, from undergraduate entry to postgraduate research."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROGRAMS.map((program, i) => (
              <div
                key={program}
                className="group border border-sage/20 p-8 text-center bg-cream hover:border-forest/30 hover:bg-white transition-all duration-200 relative"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-4 left-4 font-serif text-3xl font-bold text-sage/15 leading-none select-none"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-semibold text-charcoal text-sm uppercase tracking-wide">
                  {program}
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
        description="Join hundreds of students who have transformed their lives through quality UK education. Your journey starts with a single step."
        primaryLink="/faq"
        primaryLabel="Learn More"
        secondaryLink="/contact"
        secondaryLabel="Start Your Journey"
      />
    </main>
  );
}
