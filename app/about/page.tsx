import type { Metadata } from "next";
export const revalidate = 3600;
import { customPortableTextComponents } from "@/components/portable-text-components";
import { CTASection } from "@/components/ui/cta-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { FadeUp, Stagger, StaggerChild } from "@/components/ui/animate";
import { getAboutDetails, getSiteStats, getTeamMembers } from "@/sanity/sanity";
import { Mail, Check } from "lucide-react";
import { PortableText } from "next-sanity";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About IFEM Education — Nigeria's #1 UK University Consultancy",
  description:
    "Founded in 2022 by Dr. Millicent, IFEM Education has placed 1,800+ Nigerian students in top UK universities with a 99.6% visa success rate. 100% free admission and visa processing.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About IFEM Education | Nigeria's UK University Experts",
    description:
      "1,800+ students placed. 99.6% visa success rate. Free admission and visa processing. Founded 2022. Nigeria's most trusted UK education consultancy.",
    url: "/about",
  },
};

export default async function About() {
  const [teamMembers, aboutDetails, siteStats] = await Promise.all([
    getTeamMembers(),
    getAboutDetails(),
    getSiteStats(),
  ]);

  const stats = [
    {
      label: "Students Placed",
      value: siteStats?.studentsPlaced ?? 1800,
      suffix: "+",
    },
    {
      label: "Partner UK Universities",
      value: siteStats?.partnerUniversities ?? 40,
      suffix: "+",
    },
    {
      label: "Years in Service",
      value: siteStats?.yearsInService ?? 3,
      suffix: "+",
    },
    {
      label: "Visa Success Rate",
      value: siteStats?.visaSuccessRate ?? 99.6,
      suffix: "%",
    },
  ];

  return (
    <div className="w-full">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="pt-16 bg-cream relative overflow-hidden">
        {/* Subtle dot pattern */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #006b38 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[640px] py-16 lg:py-24">
            {/* Text */}
            <FadeUp mount>
              <div className="inline-block mb-6 px-4 py-2 bg-forest text-white text-xs font-semibold uppercase tracking-widest rounded-sm">
                Established {aboutDetails?.establishedYear ?? 2022}
              </div>
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-charcoal mb-6 leading-[1.05]">
                {aboutDetails?.headline ?? "Guiding Students to UK Universities"}
              </h1>
              <p className="text-xl text-gray leading-relaxed mb-8 max-w-lg">
                {aboutDetails?.tagline ??
                  "Nigeria's most trusted education consultancy for UK university admissions."}
              </p>
              <div className="w-16 h-1 bg-terracotta" />
            </FadeUp>

            {/* Image */}
            <FadeUp mount delay={0.12} className="relative h-96 md:h-[540px]">
              <div className="absolute inset-0 bg-gradient-to-br from-sage/20 via-cream to-terracotta/10" />
              <div className="relative h-full w-full overflow-hidden border border-sage/20 shadow-xl">
                {aboutDetails?.heroImage?.url && (
                  <Image
                    src={aboutDetails.heroImage.url}
                    alt="IFEM Team"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={85}
                    className="object-cover"
                    priority
                  />
                )}
              </div>
              {/* Decorative corner */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-forest/10 border border-forest/20" />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-charcoal text-white">
        <div className="mx-auto max-w-7xl">
          <Stagger className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 divide-x divide-white/10">
            {stats.map((stat, index) => (
              <StaggerChild
                key={index}
                className="py-10 px-8 text-center"
              >
                <p className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-none mb-2 tabular-nums">
                  {stat.value.toLocaleString("en-US")}{stat.suffix}
                </p>
                <p className="text-white/50 text-xs uppercase tracking-widest mt-2">
                  {stat.label}
                </p>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── What Makes Us Different ───────────────────────────── */}
      <section className="py-24 md:py-32 px-4 bg-white">
        <div className="mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <FadeUp>
              <SectionEyebrow tone="forest" className="mb-4">
                Our Difference
              </SectionEyebrow>
              <h2
                className="font-serif font-bold text-charcoal mb-6 leading-tight"
                style={{ fontSize: "var(--text-h2)" }}
              >
                What Makes Us Different?
              </h2>
              <p className="text-gray leading-relaxed mb-6">
                We bring our students closer to their dreams and help them
                achieve them. We have well-trained and experienced counsellors
                who prioritise your needs and are result-oriented.
              </p>
              <p className="text-gray leading-relaxed mb-6">
                Our team works with you closely to ensure a seamless process
                from start to finish. We understand the challenges of making
                the right decisions around UK studies, which is why we provide
                personalised guidance at every stage.
              </p>
              <p className="text-gray leading-relaxed">
                We make our process completely transparent —{" "}
                <strong className="text-charcoal font-semibold">
                  UK admission and visa processing comes free of charge with
                  no hidden charges.
                </strong>
              </p>
            </FadeUp>

            {/* Services Grid */}
            <FadeUp delay={0.1} className="bg-forest text-white p-10 lg:p-12">
              <h3 className="font-serif text-2xl font-bold mb-8">
                Our Comprehensive Services
              </h3>
              <div className="space-y-8">
                <div>
                  <h4 className="font-sans font-semibold text-sm uppercase tracking-widest text-white/60 mb-4 pb-2 border-b border-white/10">
                    Counselling & Preparation
                  </h4>
                  <ul className="space-y-3 text-white/85">
                    {[
                      "Career Counselling",
                      "Interview Preparations",
                      "Visa Counselling",
                      "Medical Appointment Booking",
                    ].map((service) => (
                      <li key={service} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                        <span className="text-sm">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-sm uppercase tracking-widest text-white/60 mb-4 pb-2 border-b border-white/10">
                    Processing & Support
                  </h4>
                  <ul className="space-y-3 text-white/85">
                    {[
                      "Admission Processing",
                      "Biometric Appointment Reservation",
                      "Flight Booking",
                      "Funding Solutions",
                    ].map((service) => (
                      <li key={service} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                        <span className="text-sm">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Mission ───────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-4 bg-cream">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="Our Mission"
            heading="Why We Exist"
            subtitle="Our core mission drives everything we do in supporting students on their journey to UK education."
          />

          <Stagger className="grid md:grid-cols-3 gap-6">
            {aboutDetails?.missions?.map((mission, index) => (
              <StaggerChild
                key={index}
                className="bg-white p-8 border border-sage/20 hover:border-forest/30 hover:shadow-md transition-all duration-300 group relative"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-6 right-6 hidden font-serif text-4xl font-bold text-sage/15 select-none leading-none md:block"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="w-8 h-1 bg-forest mb-6" />
                <h3 className="text-lg font-semibold text-charcoal mb-3">
                  {mission.title}
                </h3>
                <p className="text-gray text-sm leading-relaxed">
                  {mission.description}
                </p>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Founder ───────────────────────────────────────────── */}
      {aboutDetails?.founder && (
        <section className="py-24 md:py-32 px-4 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Image */}
              <FadeUp className="relative h-[480px] md:h-[560px] overflow-hidden border border-sage/20 shadow-xl order-2 md:order-1">
                {aboutDetails.founder.image?.url && (
                  <Image
                    src={aboutDetails.founder.image.url}
                    alt={aboutDetails.founder.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={85}
                    className="object-contain object-top"
                  />
                )}
                {/* Decorative accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-forest" />
              </FadeUp>

              {/* Content */}
              <FadeUp delay={0.1} className="order-1 md:order-2">
                <SectionEyebrow tone="forest" className="mb-6">
                  Leadership
                </SectionEyebrow>
                <h2
                  className="font-serif font-bold text-charcoal mb-1 leading-tight"
                  style={{ fontSize: "var(--text-h2)" }}
                >
                  {aboutDetails.founder.name}
                </h2>
                <p className="text-forest-deep font-semibold text-base mb-8">
                  {aboutDetails.founder.title}
                </p>

                <figure className="mb-8">
                  <blockquote
                    cite={aboutDetails.founder.name}
                    className="font-serif text-xl italic text-charcoal leading-relaxed py-6 border-l-4 border-forest pl-6 bg-cream/50"
                  >
                    <p>&ldquo;{aboutDetails.founder.quote}&rdquo;</p>
                  </blockquote>
                  <figcaption className="sr-only">
                    {aboutDetails.founder.name}, {aboutDetails.founder.title}
                  </figcaption>
                </figure>

                <div className="space-y-4 text-gray text-sm leading-relaxed">
                  <PortableText
                    value={aboutDetails.founder.bio}
                    components={customPortableTextComponents}
                  />
                </div>
              </FadeUp>
            </div>
          </div>
        </section>
      )}

      {/* ── Team ──────────────────────────────────────────────── */}
      {teamMembers.length > 0 && (
        <section className="py-24 md:py-32 px-4 bg-cream">
          <div className="mx-auto max-w-7xl">
            <SectionHeading label="Meet the Team" heading="Our People" />

            <Stagger className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <StaggerChild
                  key={member._id}
                  className="bg-white overflow-hidden border border-sage/20 hover:border-forest/30 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="relative h-64 overflow-hidden bg-sage/10">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-forest scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </div>

                  <div className="p-5">
                    <h3 className="font-semibold text-charcoal text-sm mb-0.5">
                      {member.name}
                    </h3>
                    <p className="text-forest-deep font-medium text-xs mb-4 uppercase tracking-wide">
                      {member.title}
                    </p>

                    <div className="space-y-1.5 text-xs text-gray/80 border-t border-sage/20 pt-4">
                      {member.email && (
                        <p className="truncate">{member.email}</p>
                      )}
                      {member.phone && <p>{member.phone}</p>}
                    </div>

                    {member.email && (
                      <div className="mt-4">
                        <a
                          href={`mailto:${member.email}`}
                          aria-label={`Email ${member.name}`}
                          className="inline-flex items-center gap-1.5 text-forest-deep text-xs font-semibold hover:text-forest transition-colors focus-ring rounded-sm"
                        >
                          <Mail aria-hidden="true" className="w-3.5 h-3.5" />
                          Send Email
                        </a>
                      </div>
                    )}
                  </div>
                </StaggerChild>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* ── Values ────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <SectionHeading label="Our Values" heading="What We Stand For" />

          <Stagger className="grid md:grid-cols-2 gap-6">
            {aboutDetails?.values?.map((value, index) => (
              <StaggerChild
                key={index}
                className="flex gap-8 p-8 bg-cream border border-sage/20 hover:border-forest/20 transition-colors"
              >
                <div className="shrink-0">
                  <span
                    aria-hidden="true"
                    className="font-serif text-5xl font-bold text-sage/25 leading-none"
                  >
                    {value.number}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-charcoal mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <CTASection
        variant="forest"
        heading="Ready to Start Your Journey?"
        description="Join thousands of students who have successfully achieved their educational dreams with our guidance and support."
        primaryLink="/contact"
        primaryLabel="Get Started"
        secondaryLink="/guides"
        secondaryLabel="Learn More"
      />
    </div>
  );
}
