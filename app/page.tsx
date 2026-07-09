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
  ChevronRight,
  Star,
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

/* ── Service icon map ─────────────────────────────────────── */
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

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      {/* Deep ink hero — full viewport, cream type, gold accent word */}
      <section
        className="relative isolate flex min-h-svh flex-col"
        style={{ background: "#0d2b1a" }}
      >
        {/* Subtle diagonal texture overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, #fdf8f0 0px, #fdf8f0 1px, transparent 1px, transparent 60px)",
          }}
        />

        {/* Top navigation breathing room — content starts after header */}
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center md:px-10 lg:py-32">

          <FadeUp mount className="w-full max-w-5xl">
            {/* Eyebrow pill */}
            <div className="mb-10 inline-flex items-center gap-2.5 border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#c9a465]" />
              <ShinyText
                text="Est. 2022 · 100% Free Service · 1,800+ Students Placed"
                speed={5}
                color="rgba(253,248,240,0.45)"
                shineColor="rgba(201,164,101,0.9)"
                className="font-sans text-[10.5px] font-semibold uppercase tracking-widest"
              />
            </div>

            {/* H1 — large, centred, gold highlight on key word */}
            <h1
              className="mb-8 font-serif font-bold leading-[0.94] tracking-tight text-[#fdf8f0]"
              style={{ fontSize: "clamp(3rem, 8vw, 7.5rem)" }}
            >
              <span className="hero-blur-1 block">Study in the UK.</span>
              <span className="hero-blur-2 block">
                Completely{" "}
                <em
                  className="not-italic"
                  style={{ color: "#c9a465" }}
                >
                  Free.
                </em>
              </span>
            </h1>

            <p
              className="hero-blur-3 mx-auto mb-12 max-w-2xl text-[1.1rem] leading-[1.75] md:text-[1.2rem]"
              style={{ color: "rgba(253,248,240,0.55)" }}
            >
              Expert counselling, seamless applications, and UK visa support
              — all provided{" "}
              <span className="font-semibold" style={{ color: "#fdf8f0" }}>
                at zero cost to you.
              </span>{" "}
              Trusted by 1,800+ students across Africa.
            </p>

            {/* CTAs */}
            <div className="mb-14 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button asChild variant="primary" size="lg">
                <Link href="/contact">
                  <CalendarDays aria-hidden="true" />
                  Book a Free Consultation
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="border border-white/15 bg-white/8 text-[#fdf8f0] backdrop-blur-sm hover:bg-white/15"
              >
                <Link href="/success-stories">
                  Read Student Stories
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>

            {/* Trust badges row */}
            <div
              className="flex flex-wrap items-center justify-center gap-6 border-t pt-8 text-[11px] font-semibold uppercase tracking-widest"
              style={{ borderColor: "rgba(253,248,240,0.08)", color: "rgba(253,248,240,0.35)" }}
            >
              {[
                { val: `${stats.studentsPlaced}+`, label: "Students Placed" },
                { val: `${stats.successRate}%`, label: "Visa Success Rate" },
                { val: `${stats.partnerUkUniversities}+`, label: "Partner Universities" },
                { val: "100%", label: "Free of Charge" },
              ].map(({ val, label }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <span
                    className="font-serif text-xl font-bold leading-none tabular-nums"
                    style={{ color: "#c9a465" }}
                  >
                    {val}
                  </span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* Bottom image strip — cinematic band at bottom of hero */}
        <div className="relative h-[46vw] max-h-[440px] min-h-[200px] w-full overflow-hidden">
          <Image
            src="/hero-student.jpg"
            alt="Nigerian students celebrating at a UK university campus"
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover object-[50%_35%]"
          />
          {/* Top fade — blends into ink hero above */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, #0d2b1a 0%, rgba(13,43,26,0.6) 30%, rgba(13,43,26,0) 60%, rgba(13,43,26,0.5) 100%)",
            }}
          />
          {/* Bottom fade to next section */}
          <div
            className="absolute bottom-0 left-0 right-0 h-24"
            style={{
              background: "linear-gradient(to bottom, transparent, #fdf8f0)",
            }}
          />
          {/* Gold accent bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: "#c9a465" }} />
        </div>
      </section>

      {/* ── PROCESS / HOW IT WORKS ────────────────────────────────── */}
      <section className="overflow-hidden bg-[#fdf8f0] px-4 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <IOReveal>
            <div className="io-reveal mb-16 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <SectionEyebrow tone="forest" className="mb-4">
                  How It Works
                </SectionEyebrow>
                <h2
                  className="font-serif font-bold leading-[1.05] text-charcoal"
                  style={{ fontSize: "var(--text-h2)" }}
                >
                  From First Call to{" "}
                  <em className="not-italic text-forest">UK Arrival</em>
                </h2>
              </div>
              <p className="max-w-sm text-[1rem] leading-[1.7] text-charcoal/50 lg:text-right">
                A structured, expert-guided process that removes the guesswork
                — and the stress — from studying abroad.
              </p>
            </div>
          </IOReveal>

          {/* 4 step cards in a row — with numbered gold badges */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {JOURNEY_STEPS.map((item, i) => (
              <IOReveal key={item.step}>
                <div
                  className="io-reveal group relative flex flex-col gap-5 border border-sage/20 bg-white p-7 transition-all duration-300 hover:border-[#c9a465]/40 hover:shadow-lg"
                  style={{ "--io-delay": `${i * 0.09}s` } as React.CSSProperties}
                >
                  {/* Ghost large number */}
                  <span
                    aria-hidden="true"
                    className="absolute right-5 top-4 select-none font-serif text-5xl font-bold leading-none transition-colors duration-300"
                    style={{ color: "rgba(201,164,101,0.08)" }}
                  >
                    {item.step}
                  </span>
                  {/* Gold step badge */}
                  <span
                    className="inline-flex h-7 w-7 items-center justify-center text-[11px] font-bold"
                    style={{ background: "#c9a465", color: "#0d2b1a" }}
                  >
                    {item.step}
                  </span>
                  <div>
                    <h3 className="mb-2 font-sans text-[15px] font-semibold tracking-tight text-charcoal">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-charcoal/50">{item.desc}</p>
                  </div>
                  {/* Bottom accent — gold on hover */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                    style={{ background: "#c9a465" }}
                  />
                </div>
              </IOReveal>
            ))}
          </div>

          <IOReveal>
            <div className="io-reveal mt-10" style={{ "--io-delay": "0.35s" } as React.CSSProperties}>
              <Button asChild variant="primary" size="lg">
                <Link href="/contact">
                  Start Your Journey Today
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </IOReveal>
        </div>
      </section>

      {/* ── SERVICES (DARK INK SECTION) ────────────────────────────── */}
      <section
        className="px-4 py-24 md:py-32"
        style={{ background: "#0d2b1a" }}
      >
        <div className="mx-auto max-w-7xl">

          {/* Section header */}
          <IOReveal>
            <div className="io-reveal mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-5 flex items-center gap-2.5">
                  <div className="h-px w-8" style={{ background: "#c9a465" }} />
                  <span
                    className="font-sans text-[10.5px] font-semibold uppercase tracking-[0.2em]"
                    style={{ color: "rgba(201,164,101,0.7)" }}
                  >
                    What We Do
                  </span>
                </div>
                <h2
                  className="font-serif font-bold leading-[1.03]"
                  style={{ fontSize: "var(--text-h2)", color: "#fdf8f0" }}
                >
                  Your Entire UK Journey,{" "}
                  <em className="not-italic" style={{ color: "#c9a465" }}>
                    Covered.
                  </em>
                </h2>
              </div>
              {/* Meta: 8 services / Free */}
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="font-serif text-4xl font-bold leading-none" style={{ color: "#fdf8f0" }}>8</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "rgba(253,248,240,0.25)" }}>
                    Services
                  </p>
                </div>
                <div className="h-10 w-px" style={{ background: "rgba(253,248,240,0.08)" }} />
                <div className="text-right">
                  <p className="font-serif text-4xl font-bold leading-none" style={{ color: "#c9a465" }}>Free</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "rgba(253,248,240,0.25)" }}>
                    To You
                  </p>
                </div>
              </div>
            </div>
          </IOReveal>

          {/* 8 service cards — 4×2 grid with thin dividers */}
          <IOReveal>
            <div
              className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4"
              style={{ background: "rgba(253,248,240,0.06)" }}
            >
              {ALL_SERVICES.map((service, i) => {
                const Icon = SERVICE_ICONS[service.name] ?? Briefcase;
                return (
                  <div
                    key={service.name}
                    className="io-reveal group relative flex flex-col gap-4 p-7 transition-colors duration-300"
                    style={{
                      background: i % 2 === 0 ? "rgba(13,43,26,1)" : "rgba(21,74,42,0.5)",
                      "--io-delay": `${i * 0.05}s`,
                    } as React.CSSProperties}
                  >
                    {/* Ghost number */}
                    <span
                      aria-hidden="true"
                      className="absolute right-5 top-4 select-none font-serif text-3xl font-bold leading-none"
                      style={{ color: "rgba(201,164,101,0.07)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {/* Icon box */}
                    <div
                      className="flex h-10 w-10 items-center justify-center transition-colors duration-300 group-hover:bg-[#c9a465]"
                      style={{ background: "rgba(201,164,101,0.1)" }}
                    >
                      <Icon
                        className="h-5 w-5 transition-colors duration-300"
                        style={{ color: "rgba(201,164,101,0.7)" }}
                        aria-hidden="true"
                      />
                    </div>
                    {/* Text */}
                    <div>
                      <p
                        className="mb-1.5 font-sans text-sm font-semibold leading-snug"
                        style={{ color: "rgba(253,248,240,0.85)" }}
                      >
                        {service.name}
                      </p>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(253,248,240,0.35)" }}>
                        {service.desc}
                      </p>
                    </div>
                    {/* Gold bottom line on hover */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                      style={{ background: "#c9a465" }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Free service footer */}
            <div
              className="io-reveal mt-px flex flex-col justify-between gap-4 px-7 py-5 sm:flex-row sm:items-center"
              style={{
                background: "rgba(201,164,101,0.07)",
                border: "1px solid rgba(201,164,101,0.15)",
                "--io-delay": "0.45s",
              } as React.CSSProperties}
            >
              <p className="text-sm leading-relaxed" style={{ color: "rgba(253,248,240,0.45)" }}>
                All eight services are provided{" "}
                <span className="font-semibold" style={{ color: "#fdf8f0" }}>
                  completely free of charge
                </span>{" "}
                — IFEM earns only through university commissions, never from students.
              </p>
              <div className="h-px w-full shrink-0 sm:h-7 sm:w-px" style={{ background: "rgba(253,248,240,0.08)" }} />
              <Link
                href="/about"
                className="ink-underline shrink-0 inline-flex items-center gap-2 pb-0.5 text-sm font-semibold tracking-wide transition-colors focus-ring-light"
                style={{ color: "rgba(201,164,101,0.7)" }}
              >
                Learn how we work
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </IOReveal>
        </div>
      </section>

      {/* ── PARTNER UNIVERSITIES ──────────────────────────────────── */}
      <section className="bg-[#fdf8f0] px-4 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <IOReveal>
            <div className="io-reveal mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
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
              <p className="max-w-sm text-[1rem] leading-[1.7] text-charcoal/50 lg:text-right">
                Direct partnerships mean faster offers, dedicated contacts, and better outcomes for our students.
              </p>
            </div>
          </IOReveal>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {universities.map((uni, i) => (
              <IOReveal key={uni._id}>
                <div
                  className="io-reveal"
                  style={{ "--io-delay": `${i * 0.04}s` } as React.CSSProperties}
                >
                  <UniversityCard university={uni} />
                </div>
              </IOReveal>
            ))}
          </div>

          <IOReveal>
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

      {/* ── SUCCESS STORY ─────────────────────────────────────────── */}
      <section
        className="px-4 py-24 md:py-32"
        style={{ background: "#f0e8d5" }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">

            {/* Left: editorial intro */}
            <IOReveal>
              <div className="io-reveal flex flex-col justify-between gap-10 lg:py-4">
                <div>
                  <div className="mb-5 flex items-center gap-2.5">
                    <div className="h-px w-8 bg-[#c9a465]" />
                    <span className="font-sans text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#c9a465]/70">
                      Success Stories
                    </span>
                  </div>
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
                  <p className="leading-[1.7] text-charcoal/45">
                    Our 99.6% visa success rate is not just a statistic. It represents
                    families whose futures changed because they chose to trust us.
                  </p>
                </div>

                {/* Mini stats — gold numbers */}
                <div className="grid grid-cols-2 gap-4 border-t border-charcoal/10 pt-8">
                  {[
                    { num: stats.studentsPlaced, suffix: "+", label: "Students placed" },
                    { num: stats.successRate,    suffix: "%", label: "Visa success rate" },
                  ].map(({ num, suffix, label }) => (
                    <div key={label}>
                      <p
                        className="font-serif text-3xl font-bold leading-none tabular-nums"
                        style={{ color: "#1a5c34" }}
                      >
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
                  className="ink-underline inline-flex items-center gap-2 pb-0.5 text-sm font-semibold tracking-wide text-forest transition-colors hover:text-forest-deep focus-ring"
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
                  className="io-reveal group relative min-h-[28rem] overflow-hidden shadow-[0_30px_90px_rgba(13,43,26,0.18)]"
                  style={{ "--io-delay": "0.12s" } as React.CSSProperties}
                >
                  <Image
                    src={spotlightStory.studentImage?.url ?? "/section-graduate.jpg"}
                    alt={spotlightStory.studentImage?.alt ?? spotlightStory.studentName}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-[50%_20%] transition-transform duration-[6s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,43,26,0.95) 0%, rgba(13,43,26,0.5) 50%, rgba(13,43,26,0.05) 100%)" }} />

                  <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
                    <Quote aria-hidden="true" className="mb-4 h-8 w-8 rotate-180" style={{ color: "rgba(201,164,101,0.3)" }} />
                    <blockquote className="mb-6 font-serif text-xl italic leading-[1.6] text-[#fdf8f0] md:text-[1.3rem]">
                      {spotlightStory.comment}
                    </blockquote>
                    <div className="border-l-[3px] pl-4" style={{ borderColor: "#c9a465" }}>
                      <p className="text-sm font-semibold text-[#fdf8f0]">{spotlightStory.studentName}</p>
                      <p className="text-xs" style={{ color: "rgba(253,248,240,0.5)" }}>{spotlightStory.schoolDestination}</p>
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

      {/* ── NEWSLETTER ────────────────────────────────────────────── */}
      <section
        className="px-4 py-20 md:py-24"
        style={{ background: "#0d2b1a" }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-end lg:gap-20">
            <IOReveal>
              <div className="io-reveal">
                <div className="mb-4 flex items-center gap-2.5">
                  <div className="h-px w-8 bg-[#c9a465]" />
                  <span className="font-sans text-[10.5px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(201,164,101,0.7)" }}>
                    Stay Informed
                  </span>
                </div>
                <h2
                  className="mb-5 font-serif font-bold leading-tight text-[#fdf8f0]"
                  style={{ fontSize: "var(--text-h2)" }}
                >
                  UK admission updates, monthly
                </h2>
                <p className="text-lg leading-[1.7]" style={{ color: "rgba(253,248,240,0.45)" }}>
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
