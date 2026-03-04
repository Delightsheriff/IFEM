import StoriesHero from "@/components/stories-hero";
import JourneyScroll from "@/components/journey-scroll";
import CountUp from "@/components/count-up";
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

      {/* ── Journey Scroll — curated/featured stories only ── */}
      <JourneyScroll stories={journeyStories} />

      {/* ── Stats ── */}
      <section className="py-16 md:py-24 px-4 bg-white/50 backdrop-blur-sm border-y border-sage/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { value: 500, label: "Students Placed" },
              { value: 98, label: "Success Rate" },
              { value: 5, label: "Years Experience" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="font-serif text-4xl md:text-5xl font-bold text-forest mb-2">
                  <CountUp
                    from={0}
                    to={stat.value}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                  />
                  +
                </p>
                <p className="text-sm text-gray uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
