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
import { FadeUp } from "@/components/ui/animate";
import { IOReveal } from "@/components/animations/IOReveal";
import CountUp from "@/components/animations/CountUp";
import ShinyText from "@/components/animations/ShintText";
import {
  ArrowRight,
  Building2,
  Briefcase,
  CalendarDays,
  FileCheck,
  GraduationCap,
  Globe,
  HandHeart,
  Plane,
  ShieldCheck,
  Stethoscope,
  Tag,
  Users,
  Quote,
  PiggyBank,
  ScanLine,
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

/* ── Service icon map — one icon per service name ───────────────── */
const SERVICE_ICONS: Record<string, React.ElementType> = {
  "Career Counselling":          GraduationCap,
  "Interview Preparation":       Users,
  "Visa Counselling":            ShieldCheck,
  "Medical Appointment Booking": Stethoscope,
  "Admission Processing":        FileCheck,
  "Biometric Reservation":       ScanLine,
  "Flight Booking":              Plane,
  "Funding Solutions":           PiggyBank,
};

const ALL_SERVICES = SERVICE_GROUPS.flatMap((g) => g.items);

const AVATARS = [
  { initial: "S", bg: "bg-forest" },
  { initial: "K", bg: "bg-terracotta" },
  { initial: "M", bg: "bg-sage" },
  { initial: "A", bg: "bg-charcoal" },
];

const JOURNEY_STEPS = [
  {
    step: "01",
    title: "Free Consultation",
    desc: "Discuss your goals with one of our expert counsellors — no cost, no obligation.",
  },
  {
    step: "02",
    title: "University Matching",
    desc: "We identify UK universities and programmes aligned with your qualifications and career goals.",
  },
  {
    step: "03",
    title: "Application & Visa",
    desc: "We handle every application, document, and visa step on your behalf.",
  },
  {
    step: "04",
    title: "Departure Ready",
    desc: "From biometrics to flight booking — fully prepared for the first day of your UK life.",
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
    studentsPlaced:        resolved.studentsPlaced,
    partnerUkUniversities: resolved.partnerUniversities,
    yearsOfExperience:     resolved.yearsInService,
    successRate:           resolved.visaSuccessRate,
  };

  return (
    <div className="w-full overflow-hidden">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative isolate bg-[#f5f0e8]">
        <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-[1440px] lg:grid-cols-[1fr_minmax(460px,0.9fr)]">

          {/* Left: text column */}
          <div className="relative z-10 flex items-center border-r border-sage/10 px-6 py-16 md:px-10 lg:px-14 xl:px-20">
            {/* Vertical accent */}
            <div aria-hidden="true" className="absolute left-0 top-[20%] hidden h-[30%] w-[3px] bg-forest lg:block" />

            <FadeUp mount className="w-full max-w-2xl">
              {/* Eyebrow pill */}
              <div className="mb-9 inline-flex items-center gap-2.5 border border-sage/25 bg-white/70 px-3.5 py-1.5 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-forest" />
                <ShinyText
                  text="Est. 2022 · 100% Free Service · 1,800+ Students Placed"
                  speed={5}
                  color="rgba(45,45,45,0.5)"
                  shineColor="rgba(0,107,56,0.8)"
                  className="font-sans text-[10.5px] font-semibold uppercase tracking-widest"
                />
              </div>

              {/* H1 */}
              <h1
                className="mb-8 font-serif font-bold leading-[0.96] tracking-tight text-charcoal"
                style={{ fontSize: "var(--text-display)" }}
              >
                <span className="hero-blur-1">Your UK University</span>
                <span className="hero-blur-2">Dream Starts</span>
                <span className="hero-blur-3">
                  Right{" "}
                  <em className="not-italic text-forest">Here.</em>
                </span>
              </h1>

              <p className="mb-10 max-w-lg text-[1.05rem] leading-[1.7] text-charcoal/60 md:text-[1.1rem]">
                Expert counselling, seamless applications, and UK visa support — all
                provided{" "}
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
                    Read Student Stories
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
                      <span className="text-center text-[9px] font-bold leading-none text-white">1.8K+</span>
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
                  className="ink-underline inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-forest-deep transition-colors hover:text-forest focus-ring"
                >
                  View Partner Institutions
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </FadeUp>
          </div>

          {/* Right: cinematic image column */}
          <FadeUp mount delay={0.1} className="relative min-h-[56vh] lg:min-h-0">
            <div className="absolute inset-0 overflow-hidden bg-charcoal">
              <Image
                src="/hero-student.jpg"
                alt="Student smiling on university campus"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
                quality={95}
                className="object-cover object-[50%_20%]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-charcoal/85 via-charcoal/15 to-transparent" />
              <div className="absolute inset-0 bg-linear-to-r from-charcoal/20 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-forest" />

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  IFEM Education &mdash; Nigeria&apos;s Gateway to UK Universities
                </p>
                <div className="flex flex-col items-end gap-0.5 border-l-2 border-forest pl-3">
                  <span className="font-serif text-2xl font-bold leading-none text-white tabular-nums">
                    {stats.successRate}%
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-white/55">
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
              { Icon: Users,      num: stats.studentsPlaced,        suffix: "+", label: "Students Placed",     sub: "Across Africa" },
              { Icon: ShieldCheck,num: stats.successRate,           suffix: "%", label: "Visa Success Rate",   sub: "Proven Track Record" },
              { Icon: Building2,  num: stats.partnerUkUniversities, suffix: "+", label: "Partner Universities",sub: "Across the UK" },
              { Icon: Tag,        num: 100,                         suffix: "%", label: "Free of Charge",      sub: "No Hidden Fees" },
            ].map(({ Icon, num, suffix, label, sub }) => (
              <div key={label} className="group flex items-center gap-4 px-5 py-5 sm:px-8">
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

      {/* ── YOUR JOURNEY (PROCESS) ──────────────────────────────────── */}
      <section className="overflow-hidden border-t border-sage/10 bg-white px-4 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <IOReveal>
            <div className="io-reveal mb-14 max-w-2xl">
              <SectionEyebrow tone="forest" className="mb-5">
                How It Works
              </SectionEyebrow>
              <h2
                className="mb-4 font-serif font-bold leading-[1.05] text-charcoal"
                style={{ fontSize: "var(--text-h2)" }}
              >
                From First Call to{" "}
                <em className="not-italic text-forest">UK Arrival</em>
              </h2>
              <p className="text-[1.05rem] leading-[1.7] text-charcoal/55">
                A structured, expert-guided process that removes the guesswork — and the stress — from studying abroad.
              </p>
            </div>

            {/* Step cards + image side-by-side */}
            <div className="grid items-start gap-10 lg:grid-cols-[1fr_420px] lg:gap-16">
              <div className="grid gap-4 sm:grid-cols-2">
                {JOURNEY_STEPS.map((item, i) => (
                  <div
                    key={item.step}
                    className="io-reveal group relative border border-sage/20 bg-[#f5f0e8]/60 p-7 transition-all duration-300 hover:border-forest/30 hover:bg-white hover:shadow-md"
                    style={{ "--io-delay": `${i * 0.08}s` } as React.CSSProperties}
                  >
                    {/* Step number as large background digit */}
                    <span
                      aria-hidden="true"
                      className="absolute right-5 top-4 select-none font-serif text-5xl font-bold leading-none text-sage/12 transition-colors duration-300 group-hover:text-forest/15"
                    >
                      {item.step}
                    </span>
                    {/* Coloured step badge */}
                    <span className="mb-5 inline-flex h-6 w-6 items-center justify-center bg-forest text-[10px] font-bold text-white">
                      {item.step}
                    </span>
                    <h3 className="mb-2 font-sans text-[15px] font-semibold tracking-tight text-charcoal">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-charcoal/55">{item.desc}</p>
                    <div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-forest transition-transform duration-400 group-hover:scale-x-100" />
                  </div>
                ))}

                <div className="sm:col-span-2 mt-2">
                  <Button asChild variant="accent" size="lg">
                    <Link href="/contact">
                      Start Your Journey Today
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Editorial image */}
              <div
                className="io-reveal relative hidden overflow-hidden shadow-[0_24px_70px_rgba(45,45,45,0.1)] lg:block"
                style={{ "--io-delay": "0.2s" } as React.CSSProperties}
              >
                <div className="aspect-[3/4] relative">
                  <Image
                    src="/section-students.jpg"
                    alt="Students collaborating on campus"
                    fill
                    sizes="420px"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-charcoal/40 to-transparent" />
                  {/* Overlay label */}
                  <div className="absolute bottom-6 left-6 right-6 border-l-2 border-forest pl-4">
                    <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                      IFEM Students
                    </p>
                    <p className="font-serif text-lg font-bold text-white">
                      Ready for the UK
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </IOReveal>
        </div>
      </section>

      {/* ── SERVICES (DARK) ─────────────────────────────────────────── */}
      <section className="bg-charcoal px-4 py-24 text-white md:py-32">
        <div className="mx-auto max-w-7xl">

          {/* Section header */}
          <IOReveal>
            <div className="io-reveal mb-14 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <SectionEyebrow tone="terracotta" className="mb-6">
                  What We Do
                </SectionEyebrow>
                <h2
                  className="font-serif font-bold leading-[1.03] text-white"
                  style={{ fontSize: "var(--text-h2)" }}
                >
                  Your Entire UK Journey,{" "}
                  <em className="not-italic text-forest">Covered.</em>
                </h2>
              </div>
              <div className="flex items-center gap-8 lg:pb-1">
                <div className="text-right">
                  <p className="font-serif text-4xl font-bold leading-none text-white">8</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-white/30">
                    Services
                  </p>
                </div>
                <div className="h-10 w-px bg-white/10" />
                <div className="text-right">
                  <p className="font-serif text-4xl font-bold leading-none text-forest">Free</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-white/30">
                    To You
                  </p>
                </div>
              </div>
            </div>
          </IOReveal>

          {/* 8 individual service cards — 4 columns × 2 rows */}
          <IOReveal>
            <div className="grid grid-cols-1 gap-px bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
              {ALL_SERVICES.map((service, i) => {
                const Icon = SERVICE_ICONS[service.name] ?? Briefcase;
                const isEvenRow = Math.floor(i / 4) % 2 === 1;
                return (
                  <div
                    key={service.name}
                    className={`io-reveal group relative flex flex-col gap-4 p-7 transition-colors duration-300 hover:bg-forest/15 ${
                      isEvenRow ? "bg-white/[0.025]" : "bg-white/[0.04]"
                    }`}
                    style={{ "--io-delay": `${i * 0.06}s` } as React.CSSProperties}
                  >
                    {/* Number badge */}
                    <span className="absolute right-5 top-4 font-serif text-3xl font-bold leading-none text-white/6 select-none transition-colors duration-300 group-hover:text-white/12">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {/* Icon */}
                    <div className="flex h-10 w-10 items-center justify-center bg-white/8 transition-colors duration-300 group-hover:bg-forest">
                      <Icon className="h-5 w-5 text-white/50 transition-colors duration-300 group-hover:text-white" aria-hidden="true" />
                    </div>
                    {/* Text */}
                    <div>
                      <p className="mb-1.5 font-sans text-sm font-semibold leading-snug text-white/85">
                        {service.name}
                      </p>
                      <p className="text-xs leading-relaxed text-white/40">
                        {service.desc}
                      </p>
                    </div>
                    {/* Bottom accent line */}
                    <div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-forest transition-transform duration-400 group-hover:scale-x-100" />
                  </div>
                );
              })}
            </div>

            {/* Free-service footer bar */}
            <div
              className="io-reveal mt-px flex flex-col justify-between gap-4 border border-forest/20 bg-forest/10 px-7 py-5 sm:flex-row sm:items-center"
              style={{ "--io-delay": "0.5s" } as React.CSSProperties}
            >
              <p className="text-sm leading-relaxed text-white/55">
                All eight services are provided{" "}
                <span className="font-semibold text-white">completely free of charge</span>{" "}
                — IFEM earns only through university commissions, never from students.
              </p>
              <div className="h-px w-full shrink-0 bg-white/10 sm:h-8 sm:w-px" />
              <Link
                href="/about"
                className="ink-underline shrink-0 inline-flex items-center gap-2 rounded-sm pb-0.5 text-sm font-semibold tracking-wide text-white/60 transition-colors hover:text-white focus-ring-light"
              >
                Learn how we work
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </IOReveal>
        </div>
      </section>

      {/* ── PARTNER UNIVERSITIES ─────────────────────────────────────── */}
      <section className="px-4 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <IOReveal>
            <div className="io-reveal mb-14 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <SectionEyebrow tone="forest" className="mb-5">
                  Our Network
                </SectionEyebrow>
                <h2
                  className="font-serif font-bold leading-[1.05] text-charcoal"
                  style={{ fontSize: "var(--text-h2)" }}
                >
                  {stats.partnerUkUniversities}+ Partner{" "}
                  <em className="not-italic text-forest">Universities</em>
                </h2>
              </div>
              <p className="max-w-sm text-[1.05rem] leading-[1.7] text-charcoal/55 lg:text-right">
                Direct partnerships mean faster offers, dedicated contacts, and better outcomes for our students.
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

            <div className="io-reveal mt-12 text-center" style={{ "--io-delay": "0.3s" } as React.CSSProperties}>
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

      {/* ── SUCCESS STORY ───────────────────────────────────────────── */}
      <section className="border-t border-sage/10 bg-[#f5f0e8] px-4 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">

            {/* Left: editorial intro */}
            <IOReveal>
              <div className="io-reveal flex flex-col justify-between gap-10 lg:py-4">
                <div>
                  <SectionEyebrow tone="terracotta" className="mb-5">
                    Success Stories
                  </SectionEyebrow>
                  <h2
                    className="mb-6 font-serif font-bold leading-[1.05] text-charcoal"
                    style={{ fontSize: "var(--text-h2)" }}
                  >
                    Real Students.
                    <br />
                    Real Results.
                  </h2>
                  <p className="mb-6 text-[1.05rem] leading-[1.7] text-charcoal/60">
                    From Enugu to Edinburgh, Lagos to London — over 1,800 African students
                    have trusted IFEM to get them into their dream UK university.
                  </p>
                  <p className="leading-[1.7] text-charcoal/50">
                    Our 99.6% visa success rate is not just a statistic. It represents
                    families whose futures changed because they chose to trust us.
                  </p>
                </div>

                {/* Mini stats */}
                <div className="grid grid-cols-2 gap-4 border-t border-charcoal/10 pt-8">
                  {[
                    { num: stats.studentsPlaced, suffix: "+", label: "Students placed" },
                    { num: stats.successRate,    suffix: "%", label: "Visa success rate" },
                  ].map(({ num, suffix, label }) => (
                    <div key={label}>
                      <p className="font-serif text-3xl font-bold leading-none text-charcoal tabular-nums">
                        <CountUp to={num} duration={2} />{suffix}
                      </p>
                      <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-widest text-charcoal/40">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                <Link
                  href="/success-stories"
                  className="ink-underline inline-flex items-center gap-2 rounded-sm pb-0.5 text-sm font-semibold tracking-wide text-forest-deep transition-colors hover:text-forest focus-ring"
                >
                  Read all stories
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </IOReveal>

            {/* Right: spotlight quote card */}
            {spotlightStory ? (
              <IOReveal>
                <div
                  className="io-reveal group relative min-h-[28rem] overflow-hidden bg-charcoal shadow-[0_30px_90px_rgba(45,45,45,0.14)]"
                  style={{ "--io-delay": "0.12s" } as React.CSSProperties}
                >
                  <Image
                    src={spotlightStory.studentImage?.url ?? "/section-graduate.jpg"}
                    alt={spotlightStory.studentImage?.alt ?? spotlightStory.studentName}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-[50%_20%] transition-transform duration-[6s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-charcoal/93 via-charcoal/45 to-charcoal/5" />

                  <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
                    <Quote aria-hidden="true" className="mb-4 h-8 w-8 rotate-180 text-white/20" />
                    <blockquote className="mb-6 font-serif text-xl italic leading-[1.6] text-white md:text-[1.3rem]">
                      {spotlightStory.comment}
                    </blockquote>
                    <div className="border-l-[3px] border-forest pl-4">
                      <p className="text-sm font-semibold text-white">{spotlightStory.studentName}</p>
                      <p className="text-xs text-white/55">{spotlightStory.schoolDestination}</p>
                    </div>
                  </div>
                </div>
              </IOReveal>
            ) : (
              <IOReveal>
                <div className="io-reveal flex min-h-[28rem] items-center justify-center border border-sage/20 bg-white/60">
                  <p className="text-sm text-charcoal/40">Stories coming soon</p>
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
                  UK admission updates, monthly
                </h2>
                <p className="text-lg leading-[1.7] text-white/50">
                  Practical visa tips, funding news, and student-life guidance from the IFEM team. No spam.
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
