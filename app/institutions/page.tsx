import type { Metadata } from "next";
export const revalidate = 3600; // ISR — re-build at most once per hour
import { CTASection } from "@/components/ui/cta-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { UniversityCard } from "@/components/ui/university-card";
import { StatsBar } from "@/components/stats-bar";
import { FALLBACK_UNIVERSITIES } from "@/interface/universities";
import { getUniversities } from "@/sanity/sanity";
import { Stagger, StaggerChild } from "@/components/ui/animate";
import { Building2, Globe2, Handshake } from "lucide-react";

export const metadata: Metadata = {
  title: "40+ Partner UK Universities — Find Your Institution",
  description:
    "Browse IFEM Education's network of 40+ accredited UK partner universities. We have direct partnerships that get Nigerian students faster responses and guaranteed support.",
  alternates: { canonical: "/institutions" },
  openGraph: {
    title: "Partner UK Universities | IFEM Education",
    description:
      "40+ UK universities. Direct partnerships. Faster admissions. IFEM Education connects Nigerian students with the right UK institution — free of charge.",
    url: "/institutions",
  },
};

const WHY_PARTNER = [
  {
    icon: Building2,
    title: "Academic Excellence",
    description:
      "Each partner institution is recognised for high academic standards, research output, and quality teaching.",
  },
  {
    icon: Globe2,
    title: "Global Recognition",
    description:
      "Degrees from our partner universities are internationally recognised and valued by employers worldwide.",
  },
  {
    icon: Handshake,
    title: "Student Support",
    description:
      "Our partners provide comprehensive support services including career guidance, accommodation, and pastoral care.",
  },
];

export default async function Institutions() {
  const sanityUniversities = await getUniversities();
  const universities = sanityUniversities.length > 0 ? sanityUniversities : FALLBACK_UNIVERSITIES;

  return (
    <div className="w-full">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="bg-cream border-b border-sage/20 pt-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-8 h-px bg-forest" />
              <p className="text-forest font-sans text-xs font-semibold uppercase tracking-widest">
                Our Network
              </p>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-charcoal leading-tight mb-6">
              Partner Institutions
            </h1>
            <p className="text-gray text-lg leading-relaxed">
              We hold direct partnerships with 40+ universities and colleges
              across the UK — each carefully selected for academic excellence
              and strong student outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────────── */}
      <StatsBar variant="dark" />

      {/* ── Universities Grid ─────────────────────────────────── */}
      <section className="py-24 md:py-32 px-4 md:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="Explore Our Network"
            heading="Universities & Colleges"
            subtitle="Every institution in our network has been vetted for quality, student support, and visa compliance."
          />

          <Stagger className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {universities.map((uni) => (
              <StaggerChild key={uni._id}>
                <UniversityCard university={uni} />
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Why Our Partners ──────────────────────────────────── */}
      <section className="py-24 md:py-32 px-4 bg-white border-t border-sage/10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="Why Our Partners"
            heading="What Makes Our Institutions Stand Out"
          />

          <Stagger className="grid md:grid-cols-3 gap-px bg-sage/10">
            {WHY_PARTNER.map((feature, idx) => (
              <StaggerChild
                key={idx}
                className="group bg-white p-10 hover:bg-cream/50 transition-colors duration-300 relative"
              >
                <div className="w-10 h-10 bg-forest/8 flex items-center justify-center mb-6 group-hover:bg-forest transition-colors duration-300">
                  <feature.icon className="w-5 h-5 text-forest group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-sans font-semibold text-charcoal mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray text-sm leading-relaxed">
                  {feature.description}
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <CTASection
        variant="forest"
        heading="Find Your Perfect Institution"
        description="Not sure which university is right for you? Our expert counsellors will help match you with the ideal institution based on your goals and qualifications."
        primaryLink="/contact"
        primaryLabel="Get a Free Consultation"
        secondaryLink="/guides"
        secondaryLabel="Read Our Guides"
      />
    </div>
  );
}
