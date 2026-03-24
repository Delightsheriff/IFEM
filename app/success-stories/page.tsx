import type { Metadata } from "next";
import StoriesHero from "@/components/stories-hero";

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
import StudentJourney from "@/components/student-journey";
import { StatsBar } from "@/components/stats-bar";
import { CTASection } from "@/components/ui/cta-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { getSuccessStories, getFeaturedSuccessStories } from "@/sanity/sanity";

export default async function SuccessStories() {
  // All stories → hero gallery collage (maximum visual variety)
  // Featured stories → journey scroll (curated, high-quality selection)
  const [allStories, featuredStories] = await Promise.all([
    getSuccessStories(),
    getFeaturedSuccessStories(),
  ]);

  // If no featured stories exist yet, fall back to first 6 of all
  const journeyStories =
    featuredStories.length > 0 ? featuredStories : allStories.slice(0, 6);

  return (
    <main>
      {/* ── Cinematic Hero — uses ALL stories for visual richness ── */}
      <StoriesHero stories={allStories} />

      {/* ── Student Journey — testimonials and stories ── */}
      <StudentJourney stories={journeyStories} />

      {/* ── Stats ── */}
      <StatsBar variant="white" />

      {/* ── Programs ── */}
      <section className="py-16 md:py-24 px-4 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <SectionHeading heading="Programs Our Students Excel In" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Undergraduate",
              "Master's Degrees",
              "PhD Programs",
              "Exchange Programs",
            ].map((program) => (
              <Card key={program} className="text-center">
                <CardContent>
                  <p className="font-medium text-charcoal">{program}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTASection
        variant="forest"
        heading="Ready to Write Your Success Story?"
        description="Join hundreds of students who have transformed their lives through quality UK education. Your journey starts here."
        primaryLink="/faq"
        primaryLabel="Learn More"
        secondaryLink="/contact"
        secondaryLabel="Start Your Journey"
      />
    </main>
  );
}
