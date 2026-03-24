import type { Metadata } from "next";
import PageContentWrapper from "@/components/ui/page-content-wrapper";
import { CTASection } from "@/components/ui/cta-section";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "IFEM Education | Your Gateway to UK Education",
  description:
    "Start your UK education journey with IFEM Education. 99.6% visa success rate, 40+ partner universities, free admission processing, and expert counselling.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "IFEM Education | Your Gateway to UK Education",
    description:
      "Start your UK education journey with IFEM. 99.6% visa success rate and 40+ UK partner universities.",
    url: "/",
  },
};
import { UniversityCard } from "@/components/ui/university-card";
import { FALLBACK_UNIVERSITIES } from "@/interface/universities";
import { getAboutDetails } from "@/sanity/sanity";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const details = await getAboutDetails();
  const stats = {
    studentsPlaced: details?.stats?.numberOfStudentsPlaced ?? 1800,
    partnerUkUniversities: details?.stats?.numberOfPartnerUkUniversities ?? 40,
    yearsOfExperience: details?.stats?.yearsOfExperience ?? 10,
    successRate: details?.stats?.successRate ?? 99.6,
  };

  return (
    <PageContentWrapper>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-sage/30">
                <CheckCircle2 className="w-4 h-4 text-forest" />
                <span className="text-sm font-semibold text-forest">
                  {stats.successRate}% Visa Success Rate
                </span>
              </div>

              <h1 className="font-serif text-5xl md:text-6xl font-bold text-charcoal leading-tight text-balance">
                Your Gateway to{" "}
                <span className="text-forest">UK Education</span>
              </h1>

              <p className="text-lg text-gray leading-relaxed max-w-xl">
                IFEM Education is your trusted partner for UK education. We
                guide students to world-class UK universities with expert
                counselling and seamless support.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-terracotta text-white font-semibold rounded-lg hover:bg-terracotta/90 transition-colors"
                >
                  Start Your Journey
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-forest text-forest font-semibold rounded-lg hover:bg-forest/5 transition-colors"
                >
                  Learn More
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-sage/20">
                <div>
                  <p className="font-serif text-3xl font-bold text-forest">
                    {stats.studentsPlaced}+
                  </p>
                  <p className="text-sm text-gray">Students Placed</p>
                </div>
                <div>
                  <p className="font-serif text-3xl font-bold text-forest">
                    {stats.partnerUkUniversities}+
                  </p>
                  <p className="text-sm text-gray">Partner UK Universities</p>
                </div>
                <div>
                  <p className="font-serif text-3xl font-bold text-forest">
                    {stats.yearsOfExperience}+
                  </p>
                  <p className="text-sm text-gray">Years of Experience</p>
                </div>
                <div>
                  <p className="font-serif text-3xl font-bold text-forest">
                    {stats.successRate}%
                  </p>
                  <p className="text-sm text-gray">Success Rate</p>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative h-96 md:h-full md:min-h-96">
              <div className="absolute inset-0 bg-linear-to-br from-sage/20 to-terracotta/20 rounded-2xl" />
              <Image
                src={details?.heroImage?.url || ""}
                alt="IFEM Team"
                fill
                className="object-cover rounded-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 px-4 bg-white border-y border-sage/10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="Why Choose IFEM"
            heading="Complete Educational Support"
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎓",
                title: "Expert Counselling",
                description:
                  "Personalized guidance from experienced educational consultants who understand your aspirations.",
              },
              {
                icon: "✓",
                title: "Free Admission & Visa",
                description:
                  "Complete transparency with no hidden charges. UK admission and visa processing included.",
              },
              {
                icon: "🌍",
                title: "Wide University Network",
                description:
                  "Access to 40+ prestigious UK universities across all regions and specializations.",
              },
              {
                icon: "💼",
                title: "Career Support",
                description:
                  "Interview preparation, career counselling, and professional development guidance.",
              },
              {
                icon: "📋",
                title: "Seamless Processing",
                description:
                  "We handle all documentation, biometric appointments, and university coordination.",
              },
              {
                icon: "🤝",
                title: "Dedicated Support",
                description:
                  "Continuous support throughout your educational journey and beyond.",
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

      {/* Partner Universities Section */}
      <section className="py-20 md:py-28 px-4">
        <div className="mx-auto max-w-7xl">
          <SectionHeading label="Our Network" heading="Partner Universities" />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {FALLBACK_UNIVERSITIES.slice(0, 10).map((uni) => (
              <UniversityCard key={uni._id} university={uni} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/institutions"
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-forest text-forest font-semibold rounded-lg hover:bg-forest hover:text-white transition-colors"
            >
              View All Partner Institutions
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 md:py-20 px-4 bg-forest text-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              {
                value: `${stats.studentsPlaced}+`,
                label: "Students Successfully Placed",
              },
              {
                value: `${stats.partnerUkUniversities}+`,
                label: "Partner UK Universities",
              },
              {
                value: `${stats.yearsOfExperience}+`,
                label: "Years of Experience",
              },
              { value: `${stats.successRate}%`, label: "Success Rate" },
            ].map((stat, idx) => (
              <div key={idx}>
                <p className="font-serif text-4xl md:text-5xl font-bold mb-2">
                  {stat.value}
                </p>
                <p className="text-white/80 text-sm md:text-base leading-relaxed">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        variant="gradient"
        heading="Ready to Study in the UK?"
        description="Join thousands of successful students who have achieved their educational dreams with IFEM. Let's make your UK education journey a reality."
        primaryLink="/contact"
        primaryLabel="Get In Touch"
        secondaryLink="/guides"
        secondaryLabel="Explore Guides"
      />
    </PageContentWrapper>
  );
}
