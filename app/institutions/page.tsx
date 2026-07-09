import type { Metadata } from "next";
export const revalidate = 3600;
import { CTASection } from "@/components/ui/cta-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { InstitutionsExplorer } from "@/components/institutions-explorer";
import { StatsBar } from "@/components/stats-bar";
import { FALLBACK_UNIVERSITIES } from "@/interface/universities";
import { getUniversities } from "@/sanity/sanity";
import { Stagger, StaggerChild } from "@/components/ui/animate";
import { IOReveal } from "@/components/animations/IOReveal";
import { Banknote, Building2, Globe2 } from "lucide-react";
import { SITE_URL } from "@/lib/site";

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
      "Each partner institution is recognised for high academic standards, research output, and quality teaching environments.",
  },
  {
    icon: Globe2,
    title: "Global Recognition",
    description:
      "Degrees from our partner universities are internationally recognised and valued by employers worldwide.",
  },
  {
    icon: Banknote,
    title: "Financial Support",
    description:
      "Access to scholarship, bursary, and funding guidance to help you manage the cost of UK education.",
  },
];

export default async function Institutions() {
  const sanityUniversities = await getUniversities();
  const universities = sanityUniversities.length > 0 ? sanityUniversities : FALLBACK_UNIVERSITIES;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Partner Institutions", item: `${SITE_URL}/institutions` },
    ],
  };
  const universitiesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "IFEM Education Partner UK Universities",
    numberOfItems: universities.length,
    itemListElement: universities.slice(0, 50).map((u, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CollegeOrUniversity",
        name: u.name,
        ...(u.logo ? { logo: u.logo } : {}),
        address: { "@type": "PostalAddress", addressCountry: "GB" },
      },
    })),
  };

  return (
    <div className="w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(universitiesSchema) }} />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="bg-cream relative overflow-hidden">
        {/* Subtle horizontal rule texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(0,107,56,0.04) 80px)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8 pt-16 pb-14 md:pt-20 md:pb-18">
          <IOReveal>
            <div className="io-reveal max-w-3xl">
              <div className="flex items-center gap-3 mb-5">
                <span aria-hidden="true" className="block w-8 h-px bg-forest" />
                <SectionEyebrow tone="forest">Our Network</SectionEyebrow>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-charcoal leading-[1.04] mb-6">
                <span className="hero-blur-1">Partner</span>{" "}
                <span className="hero-blur-2 text-forest">Institutions</span>
              </h1>
              <p className="text-charcoal/55 text-lg leading-relaxed max-w-xl">
                We hold direct partnerships with{" "}
                <strong className="text-charcoal font-semibold">{universities.length}+</strong>{" "}
                universities and colleges across the UK — each carefully selected for academic excellence and strong student outcomes.
              </p>

              {/* Quick facts */}
              <div className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t border-sage/15">
                {[
                  { num: `${universities.length}+`, label: "Partner Universities" },
                  { num: "100%", label: "Free of Charge" },
                  { num: "All Levels", label: "UG, PG & PhD" },
                ].map((fact) => (
                  <div key={fact.label} className="flex flex-col">
                    <span className="font-serif text-2xl font-bold text-forest leading-none">{fact.num}</span>
                    <span className="text-[11px] text-charcoal/40 uppercase tracking-widest mt-1">{fact.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </IOReveal>
        </div>
      </section>

      {/* Stats bar */}
      <StatsBar variant="dark" />

      {/* ── UNIVERSITIES EXPLORER ─────────────────────────────────── */}
      <section className="py-24 md:py-32 px-4 md:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="Explore Our Network"
            heading="Universities &amp; Colleges"
            subtitle="Every institution in our network has been vetted for quality, student support, and visa compliance. Tap any logo to start a free enquiry."
          />
          <InstitutionsExplorer universities={universities} />
        </div>
      </section>

      {/* ── WHY OUR PARTNERS ──────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-4 bg-white border-t border-sage/10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="Why Our Partners"
            heading="What Makes Our Institutions Stand Out"
          />
          <Stagger className="grid md:grid-cols-3 gap-px bg-sage/10">
            {WHY_PARTNER.map((feature) => (
              <StaggerChild key={feature.title}>
                <div className="group bg-white hover:bg-cream transition-colors duration-300 p-10 relative overflow-hidden h-full">
                  <div className="w-10 h-10 bg-forest/8 flex items-center justify-center mb-6 group-hover:bg-forest transition-colors duration-300">
                    <feature.icon aria-hidden="true" className="w-5 h-5 text-forest group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-semibold text-charcoal mb-3 text-[15px]">{feature.title}</h3>
                  <p className="text-charcoal/50 text-[13.5px] leading-relaxed">{feature.description}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-forest scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

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
