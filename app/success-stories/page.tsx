import type { Metadata } from "next";
import StoriesHero from "@/components/stories-hero";
import StudentJourney from "@/components/student-journey";
import { CTASection } from "@/components/ui/cta-section";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  getSuccessStories,
  getFeaturedSuccessStories,
  getAboutDetails,
} from "@/sanity/sanity";

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
  { title: "Undergraduate", desc: "Foundation years, Bachelor's degrees, and integrated Master's programmes." },
  { title: "Master's Degrees", desc: "Taught and research postgraduate degrees across all disciplines." },
  { title: "PhD Programs", desc: "Doctoral research at world-leading UK institutions." },
  { title: "Exchange Programs", desc: "Short-term study abroad and international exchange opportunities." },
];

export default async function SuccessStories() {
  const [allStories, featuredStories, details] = await Promise.all([
    getSuccessStories(),
    getFeaturedSuccessStories(),
    getAboutDetails(),
  ]);

  const journeyStories =
    featuredStories.length > 0 ? featuredStories : allStories.slice(0, 6);

  const stats = {
    studentsPlaced: details?.stats?.numberOfStudentsPlaced ?? 1800,
    successRate: details?.stats?.successRate ?? 99.6,
    yearsOfExperience: details?.stats?.yearsOfExperience ?? 10,
  };

  return (
    <main className="w-full">
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
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
