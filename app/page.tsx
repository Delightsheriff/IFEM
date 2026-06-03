import type { Metadata } from "next";

export const revalidate = 3600;

import { NewsletterSignup } from "@/components/newsletter-signup";
import { CTASection } from "@/components/ui/cta-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { Button } from "@/components/ui/button";
import { UniversityCard } from "@/components/ui/university-card";
import { FALLBACK_UNIVERSITIES } from "@/interface/universities";
import { getFeaturedSuccessStories, getFeaturedUniversities, getSiteStats } from "@/sanity/sanity";
import { FadeUp, Stagger, StaggerChild } from "@/components/ui/animate";
import {
  ArrowRight,
  Building2,
  Briefcase,
  CalendarDays,
  Check,
  FileCheck,
  GraduationCap,
  Globe,
  HandHeart,
  ShieldCheck,
  Tag,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "IFEM Education | Study in the UK - Free Admission & Visa Processing",
  description:
    "Nigeria's leading UK education consultancy. 99.6% visa success rate, 40+ partner universities, free admission processing and visa guidance. Over 1,800 Nigerian students placed in top UK universities.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "IFEM Education | Study in the UK from Nigeria",
    description:
      "Free UK university admission and visa processing. 99.6% visa success rate, 40+ partner institutions. Trusted by 1,800+ Nigerian students.",
    url: "/",
  },
};

const FEATURES = [
  {
    number: "01",
    icon: GraduationCap,
    title: "Expert Counselling",
    description:
      "Personalised guidance from experienced educational consultants who understand your aspirations and match you to the right institution.",
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "Free Admission & Visa Processing",
    description:
      "Complete transparency with no hidden charges. UK admission processing and visa guidance are provided at no cost to you.",
  },
  {
    number: "03",
    icon: Globe,
    title: "Wide University Network",
    description:
      "Direct access to 40+ prestigious UK universities across all regions, disciplines, and levels of study.",
  },
  {
    number: "04",
    icon: Briefcase,
    title: "Career Development",
    description:
      "Interview preparation, career counselling, and professional development guidance to help you thrive after graduation.",
  },
  {
    number: "05",
    icon: FileCheck,
    title: "Seamless Processing",
    description:
      "We manage all documentations, biometric appointments, and university coordination on your behalf.",
  },
  {
    number: "06",
    icon: HandHeart,
    title: "Dedicated Support",
    description:
      "Continuous, personal support throughout every stage of your educational journey — from application to arrival.",
  },
];

const AVATARS = [
  { initial: "S", bg: "bg-forest" },
  { initial: "K", bg: "bg-terracotta" },
  { initial: "M", bg: "bg-sage" },
  { initial: "A", bg: "bg-charcoal" },
];

const SERVICES = [
  {
    number: "01",
    title: "Counselling & Preparation",
    color: "bg-terracotta",
    iconColor: "text-terracotta",
    items: [
      {
        name: "Career Counselling",
        desc: "Matching your goals to the right programmes and institutions",
      },
      {
        name: "Interview Preparation",
        desc: "Coaching and mock sessions for visa and university interviews",
      },
      {
        name: "Visa Counselling",
        desc: "Expert guidance on UK student visa requirements and documents",
      },
      {
        name: "Medical Appointment Booking",
        desc: "IHS and biometric appointment scheduling on your behalf",
      },
    ],
  },
  {
    number: "02",
    title: "Processing & Support",
    color: "bg-forest",
    iconColor: "text-sage",
    items: [
      {
        name: "Admission Processing",
        desc: "Full management of your university applications and offers",
      },
      {
        name: "Biometric Reservation",
        desc: "Appointment booking at certified UK visa application centres",
      },
      {
        name: "Flight Booking",
        desc: "Travel arrangements coordinated ahead of your UK departure",
      },
      {
        name: "Funding Solutions",
        desc: "Guidance on scholarships, bursaries, and funding pathways",
      },
    ],
  },
];

export default async function Home() {
  const [siteStats, sanityUniversities, featuredStories] = await Promise.all([
    getSiteStats(),
    getFeaturedUniversities(),
    getFeaturedSuccessStories(),
  ]);
  const spotlightStory = featuredStories[0] ?? null;

  const universities =
    sanityUniversities.length > 0 ? sanityUniversities : FALLBACK_UNIVERSITIES;
  const stats = {
    studentsPlaced: siteStats?.studentsPlaced ?? 1800,
    partnerUkUniversities: siteStats?.partnerUniversities ?? 40,
    yearsOfExperience: siteStats?.yearsInService ?? 4,
    successRate: siteStats?.visaSuccessRate ?? 99.6,
  };

  return (
    <div className="w-full overflow-hidden">
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative isolate bg-[#f7f3ea]">
        <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-[1440px] lg:grid-cols-[1fr_minmax(440px,0.85fr)]">

          {/* Text column */}
          <div className="relative z-10 flex items-center border-r border-sage/10 px-6 py-16 md:px-10 lg:px-14 xl:px-20">
            {/* Decorative left accent */}
            <div
              aria-hidden="true"
              className="absolute left-0 top-[22%] hidden h-[28%] w-[3px] bg-forest lg:block"
            />

            <FadeUp mount className="w-full max-w-2xl">
              {/* Eyebrow */}
              <div className="mb-8 inline-flex items-center gap-2.5 border border-sage/25 bg-white/70 px-3 py-1.5 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-forest" />
                <span className="font-sans text-[11px] font-semibold uppercase tracking-widest text-charcoal/55">
                  Est. 2022 &middot; 100% Free Service
                </span>
              </div>

              <h1
                className="mb-7 font-serif font-bold leading-[0.98] text-charcoal"
                style={{ fontSize: "var(--text-display)" }}
              >
                Helping African
                <br />
                Students Secure
                <br />
                Admission Into{" "}
                <em className="not-italic text-forest">UK Universities.</em>
              </h1>

              <p className="mb-10 max-w-xl text-[1.05rem] leading-relaxed text-gray md:text-lg">
                Expert counselling, seamless applications, and UK visa support —
                all provided{" "}
                <span className="font-semibold text-charcoal">completely free of charge.</span>{" "}
                Trusted by over 1,800 students across Africa.
              </p>

              <div className="mb-12 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="primary" size="lg">
                  <Link href="/contact">
                    <CalendarDays aria-hidden="true" />
                    Book a Free Consultation
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/success-stories">
                    Read Success Stories
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
              </div>

              <div className="flex max-w-xl flex-col gap-5 border-t border-charcoal/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2.5">
                    {AVATARS.map(({ initial, bg }, i) => (
                      <div
                        key={i}
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#f7f3ea] ${bg}`}
                      >
                        <span className="text-[11px] font-bold text-white">{initial}</span>
                      </div>
                    ))}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#f7f3ea] bg-charcoal">
                      <span className="text-center text-[9px] font-bold leading-none text-white">
                        1.8K+
                      </span>
                    </div>
                  </div>
                  <p className="text-sm leading-snug text-gray">
                    Joined by{" "}
                    <span className="font-semibold text-charcoal">1,800+ students</span>{" "}
                    who achieved their UK study goals
                  </p>
                </div>
                <Link
                  href="/institutions"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-forest-deep transition-colors hover:text-forest focus-ring rounded-sm"
                >
                  View All Partner Institutions
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </FadeUp>
          </div>

          {/* Image column — full-bleed, clean treatment */}
          <FadeUp mount delay={0.12} className="relative min-h-[56vh] lg:min-h-0">
            <div className="absolute inset-0 overflow-hidden bg-charcoal">
              <Image
                src="/hero-student.jpg"
                alt="Student smiling on university campus staircase"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
                quality={95}
                className="object-cover object-[50%_20%]"
              />
              {/* Single clean bottom gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-charcoal/82 via-charcoal/12 to-transparent" />
              {/* Thin forest accent at bottom edge */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-forest" />
              {/* Caption strip */}
              <div className="absolute bottom-5 left-6 right-6">
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                  IFEM Education &mdash; Placing African Students in UK Universities Since 2022
                </p>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Stats bar */}
        <div className="border-t border-sage/15 bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-sage/15 md:grid-cols-4">
            {[
              {
                Icon: Users,
                value: "1,800+",
                label: "Students Placed",
                sub: "Across Africa",
              },
              {
                Icon: ShieldCheck,
                value: `${stats.successRate}%`,
                label: "Visa Success Rate",
                sub: "Proven Track Record",
              },
              {
                Icon: Building2,
                value: `${stats.partnerUkUniversities}+`,
                label: "Partner Universities",
                sub: "Across the UK",
              },
              {
                Icon: Tag,
                value: "100%",
                label: "Free of Charge",
                sub: "No Hidden Fees",
              },
            ].map(({ Icon, value, label, sub }) => (
              <div key={label} className="flex items-center gap-4 px-5 py-5 sm:px-8">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-forest/8">
                  <Icon className="h-5 w-5 text-forest" />
                </div>
                <div>
                  <p className="font-serif text-xl font-bold leading-none text-charcoal tabular-nums">
                    {value}
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-charcoal">{label}</p>
                  <p className="text-[11px] text-gray">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-sage/10 bg-white px-4 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="Why Choose IFEM"
            heading="Complete Educational Support"
            subtitle="From first enquiry to university enrolment, we handle every step of your journey with expertise and care."
          />

          <Stagger className="grid overflow-hidden border border-sage/15 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <StaggerChild
                key={feature.number}
                className="group relative border-b border-r border-sage/15 bg-white p-8 transition-colors duration-300 hover:bg-cream/50 lg:p-10"
              >
                <span
                  aria-hidden="true"
                  className="absolute right-8 top-6 hidden select-none font-serif text-5xl font-bold leading-none text-sage/15 md:block"
                >
                  {feature.number}
                </span>
                <div className="mb-5 flex h-10 w-10 items-center justify-center bg-forest/8 transition-colors duration-300 group-hover:bg-forest">
                  <feature.icon className="h-5 w-5 text-forest transition-colors duration-300 group-hover:text-white" />
                </div>
                <h3 className="mb-3 font-sans text-base font-semibold tracking-wide text-charcoal">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray">{feature.description}</p>
                <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-forest transition-transform duration-300 group-hover:scale-x-100" />
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-charcoal px-4 py-24 text-white md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-16 lg:grid-cols-[5fr_7fr] lg:gap-24">
            <FadeUp className="lg:sticky lg:top-32">
              <SectionEyebrow tone="terracotta" className="mb-8">
                Our Services
              </SectionEyebrow>
              <h2
                className="mb-8 font-serif font-bold leading-[1.05] text-white"
                style={{ fontSize: "var(--text-h1)" }}
              >
                We Handle
                <br />
                Everything.
              </h2>
              <p className="mb-10 max-w-sm text-lg leading-relaxed text-white/55">
                From your first enquiry to the day you land in the UK - every
                step is managed by our team, at no cost to you.
              </p>

              <div className="mb-10 flex gap-10 border-t border-white/10 pt-8">
                <div>
                  <p className="font-serif text-4xl font-bold leading-none text-white">8</p>
                  <p className="mt-1.5 text-[11px] uppercase tracking-widest text-white/35">
                    Services offered
                  </p>
                </div>
                <div className="w-px bg-white/10" />
                <div>
                  <p className="font-serif text-4xl font-bold leading-none text-terracotta">
                    Free
                  </p>
                  <p className="mt-1.5 text-[11px] uppercase tracking-widest text-white/35">
                    Cost to student
                  </p>
                </div>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 border-b border-white/15 pb-1 text-sm font-semibold tracking-wide text-white/70 transition-colors hover:border-white hover:text-white focus-ring-light rounded-sm"
              >
                Learn about our approach
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </FadeUp>

            <Stagger className="space-y-5">
              {SERVICES.map((group) => (
                <StaggerChild key={group.number}>
                  <div className="border border-white/8 bg-white/[0.03] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.16)]">
                    <div className="mb-7 flex items-center gap-3">
                      <div className={`flex h-6 w-6 shrink-0 items-center justify-center ${group.color}`}>
                        <span className="font-sans text-[10px] font-bold text-white">
                          {group.number}
                        </span>
                      </div>
                      <h3 className="font-sans text-[11px] font-semibold uppercase tracking-widest text-white/40">
                        {group.title}
                      </h3>
                    </div>
                    <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                      {group.items.map((service) => (
                        <div key={service.name} className="flex gap-3">
                          <Check className={`mt-0.5 h-4 w-4 shrink-0 ${group.iconColor}`} />
                          <div>
                            <p className="text-sm font-semibold leading-snug text-white/85">
                              {service.name}
                            </p>
                            <p className="mt-0.5 text-xs leading-relaxed text-white/35">
                              {service.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </StaggerChild>
              ))}

              <StaggerChild>
                <div className="flex flex-col justify-between gap-4 border border-forest/25 bg-forest/15 px-8 py-5 sm:flex-row sm:items-center">
                  <p className="text-sm leading-relaxed text-white/60">
                    All eight services are provided{" "}
                    <span className="font-semibold text-white">completely free of charge</span>{" "}
                    — IFEM earns only through university commissions, never from students.
                  </p>
                  <div className="h-px w-full shrink-0 bg-white/10 sm:h-8 sm:w-px" />
                  <p className="shrink-0 font-serif text-2xl font-bold text-white">100% Free</p>
                </div>
              </StaggerChild>
            </Stagger>
          </div>
        </div>
      </section>

      <section className="px-4 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="Our Network"
            heading="Partner Universities"
            subtitle="We hold direct partnerships with 40+ UK universities, giving students access to faster responses and dedicated support."
          />
          <Stagger className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {universities.map((uni) => (
              <StaggerChild key={uni._id}>
                <UniversityCard university={uni} />
              </StaggerChild>
            ))}
          </Stagger>
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/institutions">
                View All Partner Institutions
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-t border-sage/10 bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-24">
            <FadeUp>
              <SectionEyebrow tone="forest" className="mb-6">
                The Process
              </SectionEyebrow>
              <h2
                className="mb-5 font-serif font-bold leading-tight text-charcoal"
                style={{ fontSize: "var(--text-h2)" }}
              >
                How We Get You There
              </h2>
              <p className="mb-10 max-w-md text-lg leading-relaxed text-gray">
                A proven, structured approach that has placed over 1,800 students in UK universities.
              </p>
              <div className="relative h-72 overflow-hidden shadow-[0_24px_70px_rgba(45,45,45,0.1)]">
                <Image
                  src="/section-students.jpg"
                  alt="Students collaborating on campus"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-linear-to-t from-charcoal/25 to-transparent" />
              </div>
            </FadeUp>

            <Stagger className="grid grid-cols-2 gap-4 lg:pt-20">
              {[
                {
                  step: "01",
                  title: "Free Consultation",
                  desc: "Discuss your goals with one of our expert counsellors to map out your options.",
                },
                {
                  step: "02",
                  title: "University Matching",
                  desc: "We identify UK universities and programmes aligned with your qualifications.",
                },
                {
                  step: "03",
                  title: "Application & Visa",
                  desc: "We handle your applications and guide you through the full UK visa process.",
                },
                {
                  step: "04",
                  title: "Departure Ready",
                  desc: "From biometrics to flight booking — fully prepared for your UK journey.",
                },
              ].map((item) => (
                <StaggerChild
                  key={item.step}
                  className="group border border-sage/20 bg-white p-6 transition-all duration-200 hover:border-forest/30 hover:shadow-md"
                >
                  <p
                    aria-hidden="true"
                    className="mb-4 font-serif text-3xl font-bold leading-none text-forest/30 transition-colors group-hover:text-forest/50"
                  >
                    {item.step}
                  </p>
                  <h3 className="mb-2 font-sans text-sm font-semibold text-charcoal">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-gray">{item.desc}</p>
                </StaggerChild>
              ))}
              <div className="col-span-2 mt-2">
                <Button asChild variant="accent" size="lg">
                  <Link href="/contact">
                    Book a Free Consultation
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </Stagger>
          </div>
        </div>
      </section>

      <section className="border-t border-sage/10 bg-white px-4 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Stagger className="grid items-center gap-16 lg:grid-cols-2">
            <StaggerChild>
              <SectionEyebrow tone="terracotta" className="mb-4">
                Success Stories
              </SectionEyebrow>
              <h2
                className="mb-3 font-serif font-bold leading-tight text-charcoal"
                style={{ fontSize: "var(--text-h2)" }}
              >
                Real Students.
                <br />
                Real Journeys.
              </h2>
              <p className="mb-6 font-sans text-[11px] font-semibold uppercase tracking-widest text-forest-deep">
                From {stats.studentsPlaced.toLocaleString("en-US")}+ placements across Africa
              </p>
              <p className="mb-4 text-lg leading-relaxed text-gray">
                From Enugu to Edinburgh, Lagos to London — we have guided over
                1,800 African students to their dream UK universities.
              </p>
              <p className="mb-10 leading-relaxed text-gray">
                Our 99.6% visa success rate is not just a statistic — it
                represents families whose futures changed because they chose
                to trust IFEM.
              </p>
              <Link
                href="/success-stories"
                className="inline-flex items-center gap-2 border-b border-forest pb-1 text-sm font-semibold tracking-wide text-forest-deep transition-colors hover:border-forest/70 hover:text-forest focus-ring rounded-sm"
              >
                Read Their Stories
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </StaggerChild>

            {spotlightStory && (
              <StaggerChild className="relative min-h-105 overflow-hidden bg-charcoal shadow-[var(--shadow-deep)]">
                <Image
                  src={spotlightStory.studentImage?.url ?? "/section-graduate.jpg"}
                  alt={spotlightStory.studentImage?.alt ?? spotlightStory.studentName}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-[50%_25%]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-charcoal/90 via-charcoal/40 to-charcoal/5" />
                <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
                  <div
                    aria-hidden="true"
                    className="mb-1 select-none font-serif text-7xl leading-none text-white/25"
                  >
                    &ldquo;
                  </div>
                  <blockquote className="mb-5 font-serif text-xl italic leading-relaxed text-white md:text-2xl">
                    {spotlightStory.comment}
                  </blockquote>
                  <div className="border-l-4 border-forest pl-4">
                    <p className="text-sm font-semibold text-white">{spotlightStory.studentName}</p>
                    <p className="text-xs text-white/70">{spotlightStory.schoolDestination}</p>
                  </div>
                </div>
              </StaggerChild>
            )}
          </Stagger>
        </div>
      </section>

      <section className="border-t border-sage/10 bg-charcoal px-4 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-end lg:gap-20">
            <FadeUp>
              <SectionEyebrow tone="sage" className="mb-4">
                Stay Informed
              </SectionEyebrow>
              <h2
                className="mb-5 font-serif font-bold leading-tight text-white"
                style={{ fontSize: "var(--text-h2)" }}
              >
                Get UK admission updates monthly
              </h2>
              <p className="text-lg leading-relaxed text-white/70">
                Practical visa, funding, and student-life guidance from the IFEM Education team. No spam.
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <NewsletterSignup />
            </FadeUp>
          </div>
        </div>
      </section>

      <CTASection
        variant="forest"
        heading="Ready to Study in the UK?"
        description="Join over 1,800 students who have achieved their educational dreams with IFEM Education. Your journey starts with a free consultation."
        primaryLink="/contact"
        primaryLabel="Get In Touch"
        secondaryLink="/guides"
        secondaryLabel="Explore Our Guides"
      />
    </div>
  );
}
