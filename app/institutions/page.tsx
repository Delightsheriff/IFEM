import type { Metadata } from "next";
export const revalidate = 3600;
import { CTASection } from "@/components/ui/cta-section";
import { InstitutionsExplorer } from "@/components/institutions-explorer";
import { StatsBar } from "@/components/stats-bar";
import { FALLBACK_UNIVERSITIES } from "@/interface/universities";
import { getUniversities } from "@/sanity/sanity";
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
      <section className="bg-[#fafaf7]">
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-16 md:px-10 md:pb-18 md:pt-20">
          <div className="max-w-3xl" data-reveal="fade-up">
            <p className="mb-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
              <span className="h-px w-6 bg-[#1a5c34]" />
              Our Network
            </p>
            <h1
              className="mb-6 font-sans font-extrabold leading-[1.04] tracking-[-0.025em] text-[#111111]"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
            >
              <span className="hero-blur-1 block">Partner</span>
              <span className="hero-blur-2 block text-[#1a5c34]">Institutions</span>
            </h1>
            <p className="mb-10 max-w-xl text-lg leading-relaxed text-[#5a5a5a]">
              We hold direct partnerships with{" "}
              <strong className="font-semibold text-[#111111]">{universities.length}+</strong>{" "}
              universities and colleges across the UK — each carefully selected for academic excellence and strong student outcomes.
            </p>
            <div className="flex flex-wrap items-center gap-8 border-t border-[#e2e2de] pt-8">
              {[
                { num: `${universities.length}+`, label: "Partner Universities" },
                { num: "100%", label: "Free of Charge" },
                { num: "All Levels", label: "UG, PG & PhD" },
              ].map((fact) => (
                <div key={fact.label} className="flex flex-col">
                  <span className="font-sans text-2xl font-extrabold leading-none text-[#1a5c34]">{fact.num}</span>
                  <span className="mt-1 text-[11px] uppercase tracking-widest text-[#7a7a7a]">{fact.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <StatsBar variant="dark" />

      {/* ── UNIVERSITIES EXPLORER ─────────────────────────────────── */}
      <section className="bg-[#f3f3ef] px-4 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14" data-reveal="fade-up">
            <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
              <span className="h-px w-6 bg-[#1a5c34]" />
              Explore Our Network
            </p>
            <h2
              className="mb-4 font-sans font-extrabold leading-[1.08] tracking-tight text-[#111111]"
              style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
            >
              Universities &amp; Colleges
            </h2>
            <p className="max-w-xl text-[1rem] leading-[1.75] text-[#7a7a7a]">
              Every institution in our network has been vetted for quality, student support, and visa compliance. Tap any logo to start a free enquiry.
            </p>
          </div>
          <InstitutionsExplorer universities={universities} />
        </div>
      </section>

      {/* ── WHY OUR PARTNERS ──────────────────────────────────────── */}
      <section className="border-t border-[#e2e2de] bg-white px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center" data-reveal="fade-up">
            <p className="mb-4 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
              <span className="h-px w-6 bg-[#1a5c34]" />
              Why Our Partners
              <span className="h-px w-6 bg-[#1a5c34]" />
            </p>
            <h2
              className="font-sans font-extrabold leading-[1.08] tracking-tight text-[#111111]"
              style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
            >
              What Makes Our Institutions Stand Out
            </h2>
          </div>
          <div className="grid gap-px bg-[#e2e2de] md:grid-cols-3">
            {WHY_PARTNER.map((feature, i) => (
              <div
                key={feature.title}
                className="group relative h-full overflow-hidden bg-white p-10 transition-colors duration-200 hover:bg-[#fafaf7]"
                data-reveal="fade-up"
                style={{ "--reveal-delay": `${i * 0.1}s` } as React.CSSProperties}
              >
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-[#e8f3ec] transition-colors duration-200 group-hover:bg-[#1a5c34]">
                  <feature.icon aria-hidden="true" className="h-5 w-5 text-[#1a5c34] transition-colors duration-200 group-hover:text-white" />
                </div>
                <h3 className="mb-3 font-sans text-[15px] font-semibold text-[#111111]">{feature.title}</h3>
                <p className="text-[13.5px] leading-relaxed text-[#7a7a7a]">{feature.description}</p>
                <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#1a5c34] transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            ))}
          </div>
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
