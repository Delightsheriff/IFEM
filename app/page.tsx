import type { Metadata } from "next";

export const revalidate = 3600;

import { NewsletterSignup } from "@/components/newsletter-signup";
import { CTASection } from "@/components/ui/cta-section";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { Button } from "@/components/ui/button";
import { UniversityCard } from "@/components/ui/university-card";
import { FALLBACK_UNIVERSITIES } from "@/interface/universities";
import { getFeaturedSuccessStories, getFeaturedUniversities, getSiteStats } from "@/sanity/sanity";
import { resolveSiteStats } from "@/lib/site-stats";
import { SERVICE_GROUPS } from "@/lib/services";
import { FadeUp, Stagger, StaggerChild } from "@/components/ui/animate";
import { IOReveal, RevealItem } from "@/components/animations/IOReveal";
import CountUp from "@/components/animations/CountUp";
import SpotlightCard from "@/components/animations/SpotlightCard";
import ShinyText from "@/components/animations/ShintText";
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
  Quote,
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
      "Personalised guidance from experienced consultants who understand your aspirations and match you to the right institution.",
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "Free Admission & Visa",
    description:
      "Complete transparency with no hidden charges. UK admission processing and visa guidance provided at no cost to you.",
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
      "We manage all documentation, biometric appointments, and university coordination on your behalf.",
  },
  {
    number: "06",
    icon: HandHeart,
    title: "Dedicated Support",
    description:
      "Continuous, personal support throughout every stage — from first enquiry through to arrival in the UK.",
  },
];

const AVATARS = [
  { initial: "S", bg: "bg-forest" },
  { initial: "K", bg: "bg-terracotta" },
  { initial: "M", bg: "bg-sage" },
  { initial: "A", bg: "bg-charcoal" },
];

const SERVICE_GROUP_TONES: Record<string, { color: string; iconColor: string }> = {
  "01": { color: "bg-terracotta", iconColor: "text-terracotta" },
  "02": { color: "bg-forest", iconColor: "text-sage" },
};

const JOURNEY_STEPS = [
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
  const resolved = resolveSiteStats(siteStats);
  const stats = {
    studentsPlaced: resolved.studentsPlaced,
    partnerUkUniversities: resolved.partnerUniversities,
    yearsOfExperience: resolved.yearsInService,
    successRate: resolved.visaSuccessRate,
  };

  return (
    <div className="w-full overflow-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative isolate bg-[#f5f0e8]">
        <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-[1440px] lg:grid-cols-[1fr_minmax(460px,0.9fr)]">

          {/* Left: text column */}
          <div className="relative z-10 flex items-center border-r border-sage/10 px-6 py-16 md:px-10 lg:px-14 xl:px-20">
            {/* Vertical accent line */}
            <div
              aria-hidden="true"
              className="absolute left-0 top-[20%] hidden h-[30%] w-[3px] bg-forest lg:block"
            />

            <FadeUp mount className="w-full max-w-2xl">
              {/* Eyebrow pill */}
              <div className="mb-9 inline-flex items-center gap-2.5 border border-sage/25 bg-white/70 px-3.5 py-1.5 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-forest animate-pulse" />
                <ShinyText
                  text="Est. 2022 · 100% Free Service · 1,800+ Students Placed"
                  speed={5}
                  color="rgba(45,45,45,0.5)"
                  shineColor="rgba(0,107,56,0.8)"
                  className="font-sans text-[10.5px] font-semibold uppercase tracking-widest"
                />
              </div>

              {/* H1 — editorial serif with blur-in */}
              <h1
                className="mb-8 font-serif font-bold leading-[0.96] tracking-tight text-charcoal"
                style={{ fontSize: "var(--text-display)" }}
              >
                <span className="hero-blur-1 text-charcoal">Helping African</span>
                <span className="hero-blur-2 text-charcoal">Students Secure</span>
                <span className="hero-blur-3">
                  Admission Into{" "}
                  <em className="not-italic text-forest">UK Universities.</em>
                </span>
              </h1>

              <p className="mb-10 max-w-lg text-[1.05rem] leading-[1.7] text-charcoal/60 md:text-[1.1rem]">
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

              {/* Social proof strip */}
              <div className="flex max-w-xl flex-col gap-5 border-t border-charcoal/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2.5">
                    {AVATARS.map(({ initial, bg }, i) => (
                      <div
                        key={i}
                        aria-hidden="true"
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#f5f0e8] ${bg}`}
                      >
                        <span className="text-[10px] font-bold text-white">{initial}</span>
                      </div>
                    ))}
                    <div
                      aria-hidden="true"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#f5f0e8] bg-charcoal"
                    >
                      <span className="text-center text-[9px] font-bold leading-none text-white">
                        1.8K+
                      </span>
                    </div>
                  </div>
                  <p className="text-sm leading-snug text-charcoal/55">
                    Joined by{" "}
                    <span className="font-semibold text-charcoal">1,800+ students</span>{" "}
                    who achieved their UK study goals
                  </p>
                </div>
                <Link
                  href="/institutions"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-deep transition-colors hover:text-forest focus-ring rounded-sm ink-underline"
                >
                  View Partner Institutions
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </FadeUp>
          </div>

          {/* Right: image column */}
          <FadeUp mount delay={0.1} className="relative min-h-[56vh] lg:min-h-0">
            <div className="absolute inset-0 overflow-hidden bg-charcoal">
              <Image
                src="/hero-student.jpg"
                alt="Student smiling on university campus"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
                quality={95}
                className="object-cover object-[50%_20%] transition-transform duration-[8s] ease-out scale-[1.04] group-hover:scale-100"
              />
              {/* Layered cinematic gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-charcoal/85 via-charcoal/15 to-transparent" />
              <div className="absolute inset-0 bg-linear-to-r from-charcoal/20 via-transparent to-transparent" />
              {/* Forest accent bar */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-forest" />

              {/* Editorial caption + floating stat */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  IFEM Education &mdash; Nigeria&apos;s Gateway to UK Universities
                </p>
                {/* Floating success rate badge */}
                <div className="flex flex-col items-end gap-0.5 border-l-2 border-forest pl-3">
                  <span className="font-serif text-2xl font-bold leading-none text-white tabular-nums">
                    {stats.successRate}%
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-white/55 font-semibold">
                    Visa Success
                  </span>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* ── STATS BAR ── */}
        <div className="border-t border-charcoal/8 bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-sage/15 md:grid-cols-4">
            {[
              {
                Icon: Users,
                num: stats.studentsPlaced,
                suffix: "+",
                label: "Students Placed",
                sub: "Across Africa",
              },
              {
                Icon: ShieldCheck,
                num: stats.successRate,
                suffix: "%",
                label: "Visa Success Rate",
                sub: "Proven Track Record",
              },
              {
                Icon: Building2,
                num: stats.partnerUkUniversities,
                suffix: "+",
                label: "Partner Universities",
                sub: "Across the UK",
              },
              {
                Icon: Tag,
                num: 100,
                suffix: "%",
                label: "Free of Charge",
                sub: "No Hidden Fees",
              },
            ].map(({ Icon, num, suffix, label, sub }) => (
              <div key={label} className="flex items-center gap-4 px-5 py-5 sm:px-8 group">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-forest/8 transition-colors duration-300 group-hover:bg-forest">
                  <Icon className="h-5 w-5 text-forest transition-colors duration-300 group-hover:text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-serif text-xl font-bold leading-none text-charcoal tabular-nums">
                    <CountUp to={num} duration={1.8} />{suffix}
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-charcoal">{label}</p>
                  <p className="text-[11px] text-charcoal/50">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE IFEM ─────────────────────────────────────────── */}
      <section className="border-y border-sage/10 bg-white px-4 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <IOReveal>
            <div className="io-reveal mb-14 text-center">
              <SectionEyebrow align="center" tone="forest" className="mb-5">
                Why Choose IFEM
              </SectionEyebrow>
              <h2
                className="font-serif font-bold text-charcoal leading-[1.05] mb-4"
                style={{ fontSize: "var(--text-h2)" }}
              >
                Complete Educational Support
              </h2>
              <p
                className="text-charcoal/55 leading-relaxed max-w-2xl mx-auto"
                style={{ fontSize: "var(--text-lead)" }}
              >
                From first enquiry to university enrolment, we handle every step of your journey with expertise and care.
              </p>
            </div>

            <div className="grid overflow-hidden border border-sage/15 md:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((feature, i) => (
                <div
                  key={feature.number}
                  className="io-reveal group relative border-b border-r border-sage/15 bg-white p-8 transition-colors duration-300 hover:bg-[#f5f0e8]/60 lg:p-10"
                  style={{ "--io-delay": `${i * 0.07}s` } as React.CSSProperties}
                >
                  <span
                    aria-hidden="true"
                    className="absolute right-8 top-6 hidden select-none font-serif text-5xl font-bold leading-none text-sage/12 transition-colors duration-300 group-hover:text-sage/20 md:block"
                  >
                    {feature.number}
                  </span>
                  <div className="mb-5 flex h-10 w-10 items-center justify-center bg-forest/8 transition-all duration-300 group-hover:bg-forest">
                    <feature.icon className="h-5 w-5 text-forest transition-colors duration-300 group-hover:text-white" aria-hidden="true" />
                  </div>
                  <h3 className="mb-3 font-sans text-[15px] font-semibold tracking-tight text-charcoal">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-charcoal/55">{feature.description}</p>
                  {/* Animated bottom bar */}
                  <div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-forest transition-transform duration-400 group-hover:scale-x-100" />
                </div>
              ))}
            </div>
          </IOReveal>
        </div>
      </section>

      {/* ── SERVICES (DARK) ─────────────────────────────────────────── */}
      <section className="bg-charcoal px-4 py-24 text-white md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-16 lg:grid-cols-[5fr_7fr] lg:gap-24">

            {/* Sticky left headline */}
            <IOReveal>
              <div className="io-reveal lg:sticky lg:top-32">
                <SectionEyebrow tone="terracotta" className="mb-8">
                  Our Services
                </SectionEyebrow>
                <h2
                  className="mb-8 font-serif font-bold leading-[1.03] text-white"
                  style={{ fontSize: "var(--text-h1)" }}
                >
                  We Handle
                  <br />
                  Everything.
                </h2>
                <p className="mb-10 max-w-sm text-lg leading-[1.7] text-white/50">
                  From your first enquiry to the day you land in the UK — every
                  step is managed by our team, at no cost to you.
                </p>

                <div className="mb-10 flex gap-10 border-t border-white/10 pt-8">
                  <div>
                    <p className="font-serif text-4xl font-bold leading-none text-white">8</p>
                    <p className="mt-1.5 text-[11px] uppercase tracking-widest text-white/30">
                      Services offered
                    </p>
                  </div>
                  <div className="w-px bg-white/10" />
                  <div>
                    <p className="font-serif text-4xl font-bold leading-none text-terracotta">
                      Free
                    </p>
                    <p className="mt-1.5 text-[11px] uppercase tracking-widest text-white/30">
                      Cost to student
                    </p>
                  </div>
                </div>

                <Link
                  href="/about"
                  className="ink-underline inline-flex items-center gap-2 pb-0.5 text-sm font-semibold tracking-wide text-white/60 transition-colors hover:text-white focus-ring-light rounded-sm"
                >
                  Learn about our approach
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </IOReveal>

            {/* Service cards */}
            <IOReveal className="space-y-5">
              {SERVICE_GROUPS.map((group, i) => {
                const tone = SERVICE_GROUP_TONES[group.number] ?? {
                  color: "bg-forest",
                  iconColor: "text-sage",
                };
                return (
                  <div
                    key={group.number}
                    className="io-reveal"
                    style={{ "--io-delay": `${i * 0.12}s` } as React.CSSProperties}
                  >
                    <SpotlightCard
                      spotlightColor="rgba(255, 255, 255, 0.05)"
                      className="rounded-none! border-white/8! bg-white/[0.03]! p-8! shadow-[0_24px_80px_rgba(0,0,0,0.18)]!"
                    >
                      <div className="mb-7 flex items-center gap-3">
                        <div className={`flex h-6 w-6 shrink-0 items-center justify-center ${tone.color}`}>
                          <span className="font-sans text-[10px] font-bold text-white">
                            {group.number}
                          </span>
                        </div>
                        <h3 className="font-sans text-[11px] font-semibold uppercase tracking-widest text-white/35">
                          {group.title}
                        </h3>
                      </div>
                      <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                        {group.items.map((service) => (
                          <div key={service.name} className="flex gap-3">
                            <Check className={`mt-0.5 h-4 w-4 shrink-0 ${tone.iconColor}`} aria-hidden="true" />
                            <div>
                              <p className="text-sm font-semibold leading-snug text-white/80">
                                {service.name}
                              </p>
                              <p className="mt-0.5 text-xs leading-relaxed text-white/35">
                                {service.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </SpotlightCard>
                  </div>
                );
              })}

              <div className="io-reveal" style={{ "--io-delay": "0.24s" } as React.CSSProperties}>
                <div className="flex flex-col justify-between gap-4 border border-forest/25 bg-forest/12 px-8 py-5 sm:flex-row sm:items-center">
                  <p className="text-sm leading-relaxed text-white/55">
                    All eight services are provided{" "}
                    <span className="font-semibold text-white">completely free of charge</span>{" "}
                    — IFEM earns only through university commissions, never from students.
                  </p>
                  <div className="h-px w-full shrink-0 bg-white/10 sm:h-8 sm:w-px" />
                  <p className="shrink-0 font-serif text-2xl font-bold text-white">100% Free</p>
                </div>
              </div>
            </IOReveal>
          </div>
        </div>
      </section>

      {/* ── PARTNER UNIVERSITIES ─────────────────────────────────────── */}
      <section className="px-4 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <IOReveal>
            <div className="io-reveal mb-14 text-center">
              <SectionEyebrow align="center" tone="forest" className="mb-5">
                Our Network
              </SectionEyebrow>
              <h2
                className="font-serif font-bold text-charcoal leading-[1.05] mb-4"
                style={{ fontSize: "var(--text-h2)" }}
              >
                Partner Universities
              </h2>
              <p
                className="text-charcoal/55 leading-relaxed max-w-2xl mx-auto"
                style={{ fontSize: "var(--text-lead)" }}
              >
                We hold direct partnerships with 40+ UK universities, giving students access to faster responses and dedicated support.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {universities.map((uni, i) => (
                <div
                  key={uni._id}
                  className="io-reveal"
                  style={{ "--io-delay": `${i * 0.04}s` } as React.CSSProperties}
                >
                  <UniversityCard university={uni} />
                </div>
              ))}
            </div>

            <div className="mt-12 text-center io-reveal">
              <Button asChild variant="outline" size="lg">
                <Link href="/institutions">
                  View All Partner Institutions
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </IOReveal>
        </div>
      </section>

      {/* ── PROCESS / HOW WE WORK ───────────────────────────────────── */}
      <section className="overflow-hidden border-t border-sage/10 bg-[#f5f0e8] px-4 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-24">

            <IOReveal>
              <div className="io-reveal">
                <SectionEyebrow tone="forest" className="mb-6">
                  The Process
                </SectionEyebrow>
                <h2
                  className="mb-5 font-serif font-bold leading-tight text-charcoal"
                  style={{ fontSize: "var(--text-h2)" }}
                >
                  How We Get You There
                </h2>
                <p className="mb-10 max-w-md text-lg leading-[1.7] text-charcoal/55">
                  A proven, structured approach that has placed over 1,800 students in UK universities.
                </p>
              </div>
              <div className="io-reveal" style={{ "--io-delay": "0.15s" } as React.CSSProperties}>
                <div className="relative overflow-hidden shadow-[0_24px_70px_rgba(45,45,45,0.1)]">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src="/section-students.jpg"
                      alt="Students collaborating on campus"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-charcoal/30 to-transparent" />
                  </div>
                </div>
              </div>
            </IOReveal>

            {/* Steps grid */}
            <IOReveal className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:pt-20">
              {JOURNEY_STEPS.map((item, i) => (
                <div
                  key={item.step}
                  className="io-reveal group border border-sage/20 bg-white p-6 transition-all duration-300 hover:border-forest/30 hover:shadow-lg cursor-default"
                  style={{ "--io-delay": `${i * 0.08}s` } as React.CSSProperties}
                >
                  <p
                    aria-hidden="true"
                    className="mb-4 font-serif text-3xl font-bold leading-none text-forest/25 transition-colors group-hover:text-forest/50"
                  >
                    {item.step}
                  </p>
                  <h3 className="mb-2 font-sans text-sm font-semibold tracking-tight text-charcoal">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-charcoal/55">{item.desc}</p>
                </div>
              ))}
              <div className="mt-2 sm:col-span-2">
                <Button asChild variant="accent" size="lg">
                  <Link href="/contact">
                    Book a Free Consultation
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </IOReveal>
          </div>
        </div>
      </section>

      {/* ── SUCCESS STORIES ─────────────────────────────────────────── */}
      <section className="border-t border-sage/10 bg-white px-4 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">

            <IOReveal>
              <div className="io-reveal">
                <SectionEyebrow tone="terracotta" className="mb-5">
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
                <p className="mb-4 text-lg leading-[1.7] text-charcoal/60">
                  From Enugu to Edinburgh, Lagos to London — we have guided over
                  1,800 African students to their dream UK universities.
                </p>
                <p className="mb-10 leading-[1.7] text-charcoal/55">
                  Our 99.6% visa success rate is not just a statistic — it
                  represents families whose futures changed because they chose
                  to trust IFEM.
                </p>
                <Link
                  href="/success-stories"
                  className="ink-underline inline-flex items-center gap-2 pb-0.5 text-sm font-semibold tracking-wide text-forest-deep transition-colors hover:text-forest focus-ring rounded-sm"
                >
                  Read Their Stories
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </IOReveal>

            {spotlightStory && (
              <IOReveal>
                <div className="io-reveal relative min-h-[26rem] overflow-hidden bg-charcoal shadow-[0_30px_90px_rgba(45,45,45,0.14)] group">
                  <Image
                    src={spotlightStory.studentImage?.url ?? "/section-graduate.jpg"}
                    alt={spotlightStory.studentImage?.alt ?? spotlightStory.studentName}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-[50%_20%] transition-transform duration-[6s] group-hover:scale-105"
                  />
                  {/* Layered gradient — rich, editorial */}
                  <div className="absolute inset-0 bg-linear-to-t from-charcoal/92 via-charcoal/50 to-charcoal/5" />

                  <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
                    <Quote
                      aria-hidden="true"
                      className="mb-3 h-8 w-8 text-white/20 rotate-180"
                    />
                    <blockquote className="mb-5 font-serif text-xl italic leading-[1.6] text-white md:text-[1.35rem]">
                      {spotlightStory.comment}
                    </blockquote>
                    <div className="border-l-[3px] border-forest pl-4">
                      <p className="text-sm font-semibold text-white">{spotlightStory.studentName}</p>
                      <p className="text-xs text-white/60">{spotlightStory.schoolDestination}</p>
                    </div>
                  </div>
                </div>
              </IOReveal>
            )}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ──────────────────────────────────────────────── */}
      <section className="border-t border-sage/10 bg-charcoal px-4 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-end lg:gap-20">
            <IOReveal>
              <div className="io-reveal">
                <SectionEyebrow tone="sage" className="mb-4">
                  Stay Informed
                </SectionEyebrow>
                <h2
                  className="mb-5 font-serif font-bold leading-tight text-white"
                  style={{ fontSize: "var(--text-h2)" }}
                >
                  Get UK admission updates monthly
                </h2>
                <p className="text-lg leading-[1.7] text-white/55">
                  Practical visa, funding, and student-life guidance from the IFEM Education team. No spam.
                </p>
              </div>
            </IOReveal>
            <IOReveal>
              <div className="io-reveal" style={{ "--io-delay": "0.1s" } as React.CSSProperties}>
                <NewsletterSignup />
              </div>
            </IOReveal>
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
