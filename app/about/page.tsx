import type { Metadata } from "next";
import CountUp from "@/components/count-up";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about IFEM Education — established in 2019, dedicated to helping students achieve their UK education dreams with expert counselling, free admission processing, and personalised support.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About IFEM Education",
    description:
      "Established in 2019, IFEM Education helps students achieve their UK education dreams with expert counselling and personalised support.",
    url: "/about",
  },
};
import { customPortableTextComponents } from "@/components/portable-text-components";
import { CTASection } from "@/components/ui/cta-section";
import PageContentWrapper from "@/components/ui/page-content-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAboutDetails, getTeamMembers } from "@/sanity/sanity";
import { Mail } from "lucide-react";
import { PortableText } from "next-sanity";
import Image from "next/image";

export default async function About() {
  const [teamMembers, aboutDetails] = await Promise.all([
    getTeamMembers(),
    getAboutDetails(),
  ]);
  return (
    <PageContentWrapper>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pb-24 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <div className="inline-block mb-6 px-4 py-2 bg-forest text-white rounded-lg text-sm font-semibold">
                Established {aboutDetails?.establishedYear}
              </div>
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-charcoal mb-6 leading-tight">
                {aboutDetails?.headline}
              </h1>
              <p className="text-xl text-gray leading-relaxed mb-8">
                {aboutDetails?.tagline}
              </p>
            </div>

            {/* Image */}
            <div className="relative h-96 md:h-125 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={aboutDetails?.heroImage?.url || ""}
                alt="IFEM Team"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {aboutDetails?.stats?.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-serif text-4xl md:text-5xl font-bold text-forest mb-3">
                  <CountUp
                    from={0}
                    to={stat.value}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                  />
                  {stat.label === "Success Rate" ? "%" : "+"}
                </div>
                <p className="text-gray text-sm md:text-base leading-relaxed">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About & Services Section */}
      <section className="py-16 md:py-24 px-4 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-8 text-center">
              What Makes Us Different?
            </h2>
            <p className="text-lg text-charcoal leading-relaxed mb-6">
              We bring our students closer to their dreams and help them achieve
              them. We have well-trained and experienced counsellors who
              prioritize your needs and are result-oriented.
            </p>
            <p className="text-lg text-charcoal leading-relaxed">
              Our team of counsellors will work with you closely to ensure you
              have a seamless process from start to finish. We understand how
              challenging it can be to make the right decisions around UK
              studies, which is why we provide personalised guidance at every
              stage. We make our process completely transparent — UK admission
              and visa processing comes free of charge with no hidden charges.
            </p>
          </div>

          {/* Services Grid */}
          <div className="bg-forest text-white rounded-2xl p-12">
            <h3 className="font-serif text-3xl font-bold mb-8 text-center">
              Our Comprehensive Services
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-lg mb-4">
                  Counseling & Preparation
                </h4>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start gap-2">
                    <span className="text-terracotta font-bold">•</span>
                    <span>Career Counselling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-terracotta font-bold">•</span>
                    <span>Interview Preparations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-terracotta font-bold">•</span>
                    <span>Visa Counselling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-terracotta font-bold">•</span>
                    <span>Medical Appointment Booking</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-4">
                  Processing & Support
                </h4>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start gap-2">
                    <span className="text-terracotta font-bold">•</span>
                    <span>Admission Processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-terracotta font-bold">•</span>
                    <span>Biometric Appointment Reservation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-terracotta font-bold">•</span>
                    <span>Flight Booking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-terracotta font-bold">•</span>
                    <span>Funding Solutions</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-white/80 text-sm mt-8 pt-8 border-t border-white/20">
              We bridge the gap between you and your chosen institution, helping
              you obtain faster responses from the institution as your
              authorised representative.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 md:py-28 px-4 bg-cream">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="Our Mission"
            heading="Why We Exist"
            subtitle="Our core mission drives everything we do in supporting students."
          />

          <div className="grid md:grid-cols-3 gap-6">
            {aboutDetails?.missions?.map((mission, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl border border-sage/30 hover:border-forest/30 hover:shadow-lg transition-all duration-300"
              >
                {/* <div className="text-5xl mb-4">{mission.icon}</div> */}
                <h3 className="text-xl font-semibold text-charcoal mb-3">
                  {mission.title}
                </h3>
                <p className="text-gray leading-relaxed">
                  {mission.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      {aboutDetails?.founder && (
        <section className="py-20 md:py-28 px-4 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="relative h-96 md:h-125 rounded-2xl overflow-hidden shadow-xl order-2 md:order-1">
                <Image
                  src={aboutDetails.founder.image?.url || ""}
                  alt={aboutDetails.founder.name}
                  fill
                  className="object-contain object-top"
                />
              </div>

              {/* Content */}
              <div className="order-1 md:order-2">
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-2">
                  {aboutDetails.founder.name}
                </h2>
                <p className="text-forest font-semibold text-lg mb-6">
                  {aboutDetails.founder.title}
                </p>

                <blockquote className="text-xl italic text-charcoal leading-relaxed py-6 border-l-4 border-forest pl-6 mb-6">
                  &quot;{aboutDetails.founder.quote}&quot;
                </blockquote>

                <div className="space-y-4 text-gray leading-relaxed">
                  <PortableText
                    value={aboutDetails.founder.bio}
                    components={customPortableTextComponents}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Team Section */}
      {teamMembers.length > 0 && (
        <section className="py-20 md:py-28 px-4 bg-cream">
          <div className="mx-auto max-w-7xl">
            <SectionHeading label="Meet the Team" heading="Our People" />

            <div className="grid md:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <div
                  key={member._id}
                  className="bg-white rounded-xl overflow-hidden border border-sage/30 hover:border-forest/30 hover:shadow-lg transition-all duration-300 group"
                >
                  {/* Photo */}
                  <div className="relative h-64 overflow-hidden bg-sage/10">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-5 text-center">
                    <h3 className="font-semibold text-charcoal text-lg mb-1">
                      {member.name}
                    </h3>
                    <p className="text-forest font-medium text-sm mb-4">
                      {member.title}
                    </p>

                    {/* Contact Info */}
                    <div className="space-y-2 mb-4 text-sm">
                      {member.email && (
                        <p className="text-gray">{member.email}</p>
                      )}
                      {member.phone && (
                        <p className="text-gray">{member.phone}</p>
                      )}
                    </div>

                    {/* Social Links */}
                    {member.email && (
                      <div className="flex gap-3 justify-center pt-3 border-t border-sage/20">
                        <a
                          href={`mailto:${member.email}`}
                          className="w-8 h-8 rounded-full bg-cream hover:bg-forest hover:text-white flex items-center justify-center transition-all"
                          title="Email"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Values Section */}
      <section className="py-20 md:py-28 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <SectionHeading label="Our Values" heading="What We Stand For" />

          <div className="grid md:grid-cols-2 gap-8">
            {aboutDetails?.values?.map((value, index) => (
              <div
                key={index}
                className="flex gap-6 p-6 bg-cream rounded-xl border border-sage/30"
              >
                <div className="text-5xl font-serif font-bold text-sage opacity-30 shrink-0">
                  {value.number}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-charcoal mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        variant="forest"
        heading="Ready to Start Your Journey?"
        description="Join thousands of students who have successfully achieved their educational dreams with our guidance and support."
        primaryLink="/contact"
        primaryLabel="Get Started"
        secondaryLink="/guides"
        secondaryLabel="Learn More"
      />
    </PageContentWrapper>
  );
}
