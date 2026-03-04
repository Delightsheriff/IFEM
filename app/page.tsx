import PageContentWrapper from "@/components/ui/page-content-wrapper";
import { FALLBACK_UNIVERSITIES } from "@/interface/universities";
import { getAboutDetails } from "@/sanity/sanity";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const details = await getAboutDetails();
  return (
    <PageContentWrapper>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-sage/30">
                <CheckCircle2 className="w-4 h-4 text-forest" />
                <span className="text-sm font-semibold text-forest">
                  99.6% Visa Success Rate
                </span>
              </div>

              <h1 className="font-serif text-5xl md:text-6xl font-bold text-charcoal leading-tight text-balance">
                Your Gateway to{" "}
                <span className="text-forest">UK Education</span>
              </h1>

              <p className="text-lg text-gray leading-relaxed max-w-xl">
                IFEM Education & Travels is your trusted partner in
                international education. We guide students to world-class UK
                universities with expert counselling and seamless support.
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
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-sage/20">
                <div>
                  <p className="font-serif text-3xl font-bold text-forest">
                    1800+
                  </p>
                  <p className="text-sm text-gray">Students Placed</p>
                </div>
                <div>
                  <p className="font-serif text-3xl font-bold text-forest">
                    50+
                  </p>
                  <p className="text-sm text-gray">Universities</p>
                </div>
                <div>
                  <p className="font-serif text-3xl font-bold text-forest">
                    10yrs+
                  </p>
                  <p className="text-sm text-gray">Experience</p>
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
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-terracotta font-semibold text-sm uppercase tracking-wider mb-3">
              Why Choose IFEM
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal">
              Complete Educational Support
            </h2>
          </div>

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
                  "Access to 50+ prestigious UK universities across all regions and specializations.",
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
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-terracotta font-semibold text-sm uppercase tracking-wider mb-3">
              Our Network
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal">
              Partner Universities
            </h2>
          </div>

          {/* Universities Logo Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {FALLBACK_UNIVERSITIES.slice(0, 10).map((uni) => (
              <div
                key={uni._id}
                className="group flex flex-col items-center gap-3 rounded-xl border border-sage/20 bg-white p-5 hover:border-forest/30 hover:shadow-lg transition-all"
              >
                <div className="relative w-full h-20 flex items-center justify-center bg-cream rounded-lg">
                  <Image
                    src={uni.logo}
                    alt={uni.name}
                    fill
                    className="object-contain p-3 group-hover:scale-105 transition-transform"
                  />
                </div>
                <p className="text-xs font-medium text-charcoal text-center leading-snug">
                  {uni.name}
                </p>
              </div>
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
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: "1800+", label: "Students Successfully Placed" },
              { value: "99.6%", label: "Visa Success Rate" },
              { value: "50+", label: "Partner Universities" },
              { value: "250+", label: "Available Programmes" },
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
      <section className="py-20 md:py-28 px-4 bg-linear-to-br from-terracotta/10 to-sage/10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-6 text-balance">
            Ready to Study in the UK?
          </h2>
          <p className="text-lg text-gray mb-10 leading-relaxed">
            Join thousands of successful students who have achieved their
            educational dreams with IFEM. Let&apos;s make your UK education
            journey a reality.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-forest text-white font-semibold rounded-lg hover:bg-forest/90 transition-colors"
            >
              Get In Touch
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/guides"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-forest text-forest font-semibold rounded-lg hover:bg-forest/5 transition-colors"
            >
              Explore Guides
            </Link>
          </div>
        </div>
      </section>
    </PageContentWrapper>
  );
}
