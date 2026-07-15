import type { Metadata } from "next";
export const revalidate = 3600;
import { CTASection } from "@/components/ui/cta-section";
import { InstitutionsExplorer } from "@/components/institutions-explorer";
import { StatsBar } from "@/components/stats-bar";
import { FALLBACK_UNIVERSITIES } from "@/interface/universities";
import { getUniversities } from "@/sanity/sanity";
import { HeroSection } from "@/components/institutions/HeroSection";
import { WhyPartnersSection } from "@/components/institutions/WhyPartnersSection";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "47+ Partner UK Universities — Find Your Institution",
  description:
    "Browse IFEM Education's network of 47+ accredited UK partner universities. We have direct partnerships that get Nigerian students faster responses and guaranteed support.",
  alternates: { canonical: "/institutions" },
  openGraph: {
    title: "Partner UK Universities | IFEM Education",
    description:
      "47+ UK universities. Direct partnerships. Faster admissions. IFEM Education connects Nigerian students with the right UK institution — free of charge.",
    url: "/institutions",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "IFEM Education Partner Universities" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "47+ Partner UK Universities — IFEM Education",
    description: "Browse our network of 47+ accredited UK partner universities. Direct partnerships. Free for Nigerian students.",
    images: ["/opengraph-image"],
  },
};

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

      <HeroSection universityCount={universities.length} />
      <StatsBar variant="dark" />

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

      <WhyPartnersSection />

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
