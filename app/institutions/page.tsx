import PageContentWrapper from "@/components/ui/page-content-wrapper";
import { CTASection } from "@/components/ui/cta-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { UniversityCard } from "@/components/ui/university-card";
import { FALLBACK_UNIVERSITIES } from "@/interface/universities";
import { GraduationCap, Globe, Users, Award } from "lucide-react";

export const metadata = {
  title: "Partner Institutions | IFEM Education",
  description:
    "Explore our network of 40+ partner universities across the UK. Find the right institution for your educational journey.",
};

export default function Institutions() {
  return (
    <PageContentWrapper>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-7xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-sage/30 mb-6">
            <GraduationCap className="w-4 h-4 text-forest" />
            <span className="text-sm font-semibold text-forest">
              40+ Partner Institutions
            </span>
          </div>

          <h1 className="font-serif text-5xl md:text-6xl font-bold text-charcoal leading-tight mb-6">
            Our Partner <span className="text-forest">Institutions</span>
          </h1>

          <p className="text-lg text-gray leading-relaxed max-w-2xl mx-auto">
            We&apos;ve partnered with top universities and colleges across the
            UK to bring you world-class education opportunities. Each
            institution is carefully selected for academic excellence and
            student support.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-10 px-4 bg-forest text-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Globe, value: "UK", label: "Focus" },
              { icon: GraduationCap, value: "40+", label: "Institutions" },
              { icon: Users, value: "1800+", label: "Students Placed" },
              { icon: Award, value: "99.6%", label: "Visa Success" },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <stat.icon className="w-6 h-6 text-white/80" />
                <p className="font-serif text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Universities Grid */}
      <section className="py-16 md:py-24 px-4">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="Explore Our Network"
            heading="Universities & Colleges"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {FALLBACK_UNIVERSITIES.map((uni) => (
              <UniversityCard key={uni._id} university={uni} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="py-16 md:py-24 px-4 bg-white border-y border-sage/10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="Why Our Partners"
            heading="What Makes Our Institutions Stand Out"
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🏛️",
                title: "Academic Excellence",
                description:
                  "Each partner institution is recognized for high academic standards, research output, and quality teaching.",
              },
              {
                icon: "🌍",
                title: "Global Recognition",
                description:
                  "Degrees from our partner universities are internationally recognized and valued by employers worldwide.",
              },
              {
                icon: "🤝",
                title: "Student Support",
                description:
                  "Our partners provide comprehensive support services including career guidance, accommodation, and pastoral care.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-8 rounded-xl border border-sage/20 hover:border-forest/30 hover:shadow-lg transition-all bg-white"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-lg text-charcoal mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        variant="gradient"
        heading="Find Your Perfect Institution"
        description="Not sure which university is right for you? Our expert counsellors will help match you with the perfect institution based on your goals, qualifications, and preferences."
        primaryLink="/contact"
        primaryLabel="Get Free Consultation"
        secondaryLink="/guides"
        secondaryLabel="Read Our Guides"
      />
    </PageContentWrapper>
  );
}
