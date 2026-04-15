import type { Metadata } from "next";
import CountUp from "@/components/count-up";
import { customPortableTextComponents } from "@/components/portable-text-components";
import { CTASection } from "@/components/ui/cta-section";
import PageContentWrapper from "@/components/ui/page-content-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAboutDetails, getTeamMembers } from "@/sanity/sanity";
import { Mail, Check } from "lucide-react";
import { PortableText } from "next-sanity";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About IFEM Education — Nigeria's #1 UK University Consultancy",
  description:
    "Founded in 2019 by Dr. Millicent, IFEM Education has placed 1,800+ Nigerian students in top UK universities with a 99.6% visa success rate. 100% free admission and visa processing.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About IFEM Education | Nigeria's UK University Experts",
    description:
      "1,800+ students placed. 99.6% visa success rate. Free admission and visa processing. Founded 2019. Nigeria's most trusted UK education consultancy.",
    url: "/about",
  },
};

export default async function About() {
  const [teamMembers, aboutDetails] = await Promise.all([
    getTeamMembers(),
    getAboutDetails(),
  ]);

  const stats = [
    {
      label: "Students Placed",
      value: aboutDetails?.stats?.numberOfStudentsPlaced ?? 0,
      suffix: "+",
    },
    {
      label: "Partner UK Universities",
      value: aboutDetails?.stats?.numberOfPartnerUkUniversities ?? 0,
      suffix: "+",
    },
    {
      label: "Years of Experience",
      value: aboutDetails?.stats?.yearsOfExperience ?? 0,
      suffix: "+",
    },
    {
      label: "Success Rate",
      value: aboutDetails?.stats?.successRate ?? 0,
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
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh] py-16 lg:py-24">
            {/* Text */}
            <div>
              <div className="inline-block mb-6 px-4 py-2 bg-forest text-white text-xs font-semibold uppercase tracking-widest rounded-sm">
                Established {aboutDetails?.establishedYear ?? 2019}
              </div>
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-charcoal mb-6 leading-[1.05]">
                {aboutDetails?.headline ?? "Guiding Students to UK Universities"}
              </h1>
              <p className="text-xl text-gray leading-relaxed mb-8 max-w-lg">
                {aboutDetails?.tagline ??
                  "Nigeria's most trusted education consultancy for UK university admissions."}
              </p>
              <div className="w-16 h-1 bg-terracotta" />
            </div>

            {/* Image */}
            <div className="relative h-96 md:h-[540px]">
              <div className="absolute inset-0 bg-gradient-to-br from-sage/20 via-cream to-terracotta/10" />
              <div className="relative h-full w-full overflow-hidden border border-sage/20 shadow-xl">
                <Image
                  src={aboutDetails?.heroImage?.url || ""}
                  alt="IFEM Team"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Decorative corner */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-forest/10 border border-forest/20" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-charcoal text-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 divide-y md:divide-y-0">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="py-10 px-8 text-center first:pl-0 last:pr-0"
              >
                <div className="font-serif text-5xl md:text-6xl font-bold text-white leading-none mb-2">
                  <CountUp
                    from={0}
                    to={stat.value}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                  />
                  <span>{stat.suffix}</span>
                </div>
                <p className="text-white/50 text-xs uppercase tracking-widest mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What Makes Us Different ───────────────────────────── */}
      <section className="py-24 md:py-32 px-4 bg-white">
        <div className="mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-8 h-px bg-forest" />
                <p className="text-forest font-sans text-xs font-semibold uppercase tracking-widest">
                  Our Difference
                </p>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-6 leading-tight">
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
            </div>

            {/* Services Grid */}
            <div className="bg-forest text-white p-10 lg:p-12">
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
            </div>
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

          <div className="grid md:grid-cols-3 gap-6">
            {aboutDetails?.missions?.map((mission, index) => (
              <div
                key={index}
                className="bg-white p-8 border border-sage/20 hover:border-forest/30 hover:shadow-md transition-all duration-300 group relative"
              >
                {/* Index number */}
                <span
                  aria-hidden="true"
                  className="absolute top-6 right-6 font-serif text-4xl font-bold text-sage/15 select-none leading-none"
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founder ───────────────────────────────────────────── */}
      {aboutDetails?.founder && (
        <section className="py-24 md:py-32 px-4 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Image */}
              <div className="relative h-[480px] md:h-[560px] overflow-hidden border border-sage/20 shadow-xl order-2 md:order-1">
                <Image
                  src={aboutDetails.founder.image?.url || ""}
                  alt={aboutDetails.founder.name}
                  fill
                  className="object-contain object-top"
                />
                {/* Decorative accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-forest" />
              </div>

              {/* Content */}
              <div className="order-1 md:order-2">
                <div className="flex items-center gap-3 mb-6">
                  <span className="block w-8 h-px bg-forest" />
                  <p className="text-forest font-sans text-xs font-semibold uppercase tracking-widest">
                    Leadership
                  </p>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-1 leading-tight">
                  {aboutDetails.founder.name}
                </h2>
                <p className="text-forest font-semibold text-base mb-8">
                  {aboutDetails.founder.title}
                </p>

                <blockquote className="font-serif text-xl italic text-charcoal leading-relaxed py-6 border-l-4 border-forest pl-6 mb-8 bg-cream/50">
                  &ldquo;{aboutDetails.founder.quote}&rdquo;
                </blockquote>

                <div className="space-y-4 text-gray text-sm leading-relaxed">
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

      {/* ── Team ──────────────────────────────────────────────── */}
      {teamMembers.length > 0 && (
        <section className="py-24 md:py-32 px-4 bg-cream">
          <div className="mx-auto max-w-7xl">
            <SectionHeading label="Meet the Team" heading="Our People" />

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <div
                  key={member._id}
                  className="bg-white overflow-hidden border border-sage/20 hover:border-forest/30 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="relative h-64 overflow-hidden bg-sage/10">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-forest scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </div>

                  <div className="p-5">
                    <h3 className="font-semibold text-charcoal text-sm mb-0.5">
                      {member.name}
                    </h3>
                    <p className="text-forest font-medium text-xs mb-4 uppercase tracking-wide">
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
                          className="inline-flex items-center gap-1.5 text-forest text-xs font-semibold hover:text-forest/70 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          Send Email
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

      {/* ── Values ────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <SectionHeading label="Our Values" heading="What We Stand For" />

          <div className="grid md:grid-cols-2 gap-6">
            {aboutDetails?.values?.map((value, index) => (
              <div
                key={index}
                className="flex gap-8 p-8 bg-cream border border-sage/20 hover:border-forest/20 transition-colors"
              >
                <div className="shrink-0">
                  <span className="font-serif text-5xl font-bold text-sage/25 leading-none">
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
              </div>
            ))}
          </div>
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
