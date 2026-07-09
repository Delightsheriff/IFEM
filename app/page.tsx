import type { Metadata } from "next";

export const revalidate = 3600;

import { NewsletterSignup } from "@/components/newsletter-signup";
import { CTASection } from "@/components/ui/cta-section";
import { Button } from "@/components/ui/button";
import { UniversityCard } from "@/components/ui/university-card";
import { FALLBACK_UNIVERSITIES } from "@/interface/universities";
import { getFeaturedSuccessStories, getFeaturedUniversities, getSiteStats } from "@/sanity/sanity";
import { resolveSiteStats } from "@/lib/site-stats";
import { SERVICE_GROUPS } from "@/lib/services";
import CountUp from "@/components/animations/CountUp";
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  FileCheck,
  GraduationCap,
  Globe,
  HandHeart,
  Plane,
  ShieldCheck,
  Stethoscope,
  PiggyBank,
  ScanLine,
  Users,
  Quote,
  Check,
  Star,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "IFEM Education — Free UK Admission & Visa for Nigerians",
  description:
    "Nigeria's leading UK education consultancy. 99.6% visa success rate, 47+ partner universities, free admission processing and visa guidance. Over 1,800 Nigerian students placed in top UK universities.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "IFEM Education — Free UK Admission & Visa for Nigerians",
    description:
      "Free UK university admission and visa processing. 99.6% visa success rate, 47+ partner institutions. Trusted by 1,800+ Nigerian students.",
    url: "/",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "IFEM Education — Nigeria's Gateway to UK Universities" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IFEM Education — Free UK Admission & Visa for Nigerians",
    description: "Free UK university admission and visa processing. 99.6% visa success rate, 47+ partner institutions. Trusted by 1,800+ Nigerian students.",
    images: ["/opengraph-image"],
  },
};

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
    num: "01",
    title: "Free Consultation",
    desc: "Talk to an expert counsellor about your goals — no cost, no commitment.",
  },
  {
    num: "02",
    title: "University Matching",
    desc: "We identify the right UK programmes and institutions for your profile.",
  },
  {
    num: "03",
    title: "Application & Visa",
    desc: "We handle every document, form, and visa step on your behalf.",
  },
  {
    num: "04",
    title: "Departure Ready",
    desc: "From biometrics to flight booking — fully prepared for UK life.",
  },
];

export default async function Home() {
  const [siteStats, sanityUniversities, featuredStories] = await Promise.all([
    getSiteStats(),
    getFeaturedUniversities(),
    getFeaturedSuccessStories(),
  ]);
  const spotlightStory = featuredStories[0] ?? null;
  const universities = sanityUniversities.length > 0 ? sanityUniversities : FALLBACK_UNIVERSITIES;
  const resolved = resolveSiteStats(siteStats);
  const stats = {
    studentsPlaced:        resolved.studentsPlaced,
    partnerUkUniversities: resolved.partnerUniversities,
    yearsOfExperience:     resolved.yearsInService,
    successRate:           resolved.visaSuccessRate,
  };

  /* ── Duplicate university list for seamless marquee ── */
  const marqueeList = [...universities, ...universities];

  return (
    <div className="w-full overflow-hidden">

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO  — split layout: text left, full-height photo right
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative bg-[#fafaf7] lg:grid lg:min-h-[92vh] lg:grid-cols-[1fr_44%]">

        {/* Left column — text */}
        <div className="relative z-10 flex flex-col justify-center px-6 py-20 md:px-12 lg:px-16 lg:py-24 xl:px-20">

          {/* Headline */}
          <h1
            className="mb-6 font-sans font-extrabold leading-[1.02] tracking-[-0.03em] text-[#111111]"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.75rem)" }}
          >
            <span data-reveal="fade-up" style={{ "--reveal-delay": "0.05s" } as React.CSSProperties} className="block">
              Helping African Students
            </span>
            <span data-reveal="fade-up" style={{ "--reveal-delay": "0.12s" } as React.CSSProperties} className="block">
              Secure Admission Into
            </span>
            <span data-reveal="fade-up" style={{ "--reveal-delay": "0.19s" } as React.CSSProperties} className="block">
              <span className="text-[#1a5c34]">UK Universities.</span>
            </span>
          </h1>

          {/* Sub copy */}
          <p
            className="mb-10 max-w-[30rem] text-[1.05rem] leading-[1.75] text-[#5a5a5a]"
            data-reveal="fade-up"
            style={{ "--reveal-delay": "0.28s" } as React.CSSProperties}
          >
            Expert counselling, seamless applications, and UK visa support — all provided{" "}
            <strong className="font-semibold text-[#111111]">completely free of charge.</strong>{" "}
            Trusted by over 1,800 students across Africa.
          </p>

          {/* CTAs */}
          <div
            className="mb-12 flex flex-wrap items-center gap-3"
            data-reveal="fade-up"
            style={{ "--reveal-delay": "0.36s" } as React.CSSProperties}
          >
            <Button asChild variant="primary" size="lg" className="shadow-[0_4px_18px_rgba(26,92,52,0.28)] hover:shadow-[0_6px_24px_rgba(26,92,52,0.38)]">
              <Link href="/contact">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                Book a Free Consultation
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="text-[#3d3d3d] hover:text-[#111111] hover:bg-[#f3f3ef]">
              <Link href="/success-stories">
                Read Student Stories
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div
            className="flex flex-wrap gap-y-2 gap-x-6 text-[12px] font-medium text-[#7a7a7a]"
            data-reveal="fade-in"
            style={{ "--reveal-delay": "0.4s" } as React.CSSProperties}
          >
            {[
              "No fees to students, ever",
              "47+ UK university partners",
              "Est. 2022 in Enugu, Nigeria",
            ].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-[#1a5c34]" aria-hidden="true" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right column — full-height photo with floating cards */}
        <div className="relative hidden lg:block overflow-hidden">
          <Image
            src="/hero-student.jpg"
            alt="African student celebrating UK university admission"
            fill
            priority
            sizes="44vw"
            quality={92}
            className="object-cover object-center"
          />
          {/* Subtle dark overlay for contrast */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.08) 0%, transparent 60%)" }}
          />
          {/* left-side gradient fade into page background */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, #fafaf7 0%, rgba(250,250,247,0.3) 12%, transparent 28%)" }}
          />


        </div>

        {/* Mobile image strip */}
        <div className="relative h-80 w-full overflow-hidden lg:hidden">
          <Image
            src="/hero-student.jpg"
            alt="African student celebrating UK university admission"
            fill
            priority
            sizes="100vw"
            quality={88}
            className="object-cover object-[50%_40%]"
          />
          {/* Shallow bottom fade only — keeps faces fully visible */}
          <div
            className="absolute inset-x-0 bottom-0 h-16"
            style={{ background: "linear-gradient(to top, #fafaf7 0%, transparent 100%)" }}
          />
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          STATS BANNER  — dark green, large numbers
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-[#0d3320]">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <dl className="grid grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
            {[
              { num: stats.studentsPlaced,        suffix: "+",  label: "Students Placed" },
              { num: stats.successRate,           suffix: "%",  label: "Visa Success Rate" },
              { num: stats.partnerUkUniversities, suffix: "+",  label: "Partner Universities" },
              { num: 100,                          suffix: "%",  label: "Free of Charge" },
            ].map(({ num, suffix, label }, i) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center px-6 py-10 md:py-12"
                data-reveal="fade-up"
                style={{ "--reveal-delay": `${i * 0.08}s` } as React.CSSProperties}
              >
                <dt className="mb-2 font-sans text-[2.8rem] font-extrabold leading-none tracking-tight text-white md:text-5xl">
                  <CountUp to={num} duration={2} />{suffix}
                </dt>
                <dd className="text-center text-[10.5px] font-semibold uppercase tracking-widest text-white/40">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HOW IT WORKS  — horizontal numbered steps
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-white px-6 py-24 md:py-32 md:px-10">
        <div className="mx-auto max-w-7xl">

          {/* Header row */}
          <div className="mb-16 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div data-reveal="fade-up">
              <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
                <span className="h-px w-6 bg-[#1a5c34]" />
                How It Works
              </p>
              <h2
                className="font-sans font-extrabold leading-[1.08] tracking-tight text-[#111111]"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
              >
                From First Call to
                <br />
                <span className="text-[#1a5c34]">UK Arrival</span>
              </h2>
            </div>
            <p
              className="max-w-xs text-[0.95rem] leading-[1.7] text-[#7a7a7a] lg:text-right"
              data-reveal="fade-in"
              style={{ "--reveal-delay": "0.15s" } as React.CSSProperties}
            >
              A clear, guided process that removes the stress from studying abroad.
            </p>
          </div>

          {/* Step cards */}
          <div className="relative grid gap-px bg-[#e2e2de] sm:grid-cols-2 lg:grid-cols-4">
            {JOURNEY_STEPS.map((step, i) => (
              <div
                key={step.num}
                className="group relative flex flex-col gap-6 bg-white p-8 transition-colors duration-200 hover:bg-[#fafaf7]"
                data-reveal="fade-up"
                style={{ "--reveal-delay": `${i * 0.08}s` } as React.CSSProperties}
              >
                {/* Step number */}
                <div className="flex items-center justify-between">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0d3320] font-sans text-[11px] font-bold text-white"
                  >
                    {step.num}
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-sans text-[3.5rem] font-extrabold leading-none tracking-tighter text-[#f3f3ef] transition-colors duration-200 group-hover:text-[#e8f3ec]"
                  >
                    {step.num}
                  </span>
                </div>
                <div>
                  <h3 className="mb-2 font-sans text-[15px] font-semibold leading-snug text-[#111111]">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#7a7a7a]">{step.desc}</p>
                </div>
                {/* Green bottom rule on hover */}
                <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#1a5c34] transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            ))}
          </div>

          <div
            className="mt-10"
            data-reveal="fade-up"
            style={{ "--reveal-delay": "0.35s" } as React.CSSProperties}
          >
            <Button asChild variant="primary" size="lg">
              <Link href="/contact">
                Start Your Journey Today
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SERVICES  — clean cards on off-white bg
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-[#f3f3ef] px-6 py-24 md:py-32 md:px-10">
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="mb-14 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div data-reveal="fade-up">
              <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
                <span className="h-px w-6 bg-[#1a5c34]" />
                What We Do
              </p>
              <h2
                className="font-sans font-extrabold leading-[1.08] tracking-tight text-[#111111]"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
              >
                Your Entire UK Journey,{" "}
                <span style={{ color: "#c9a465" }}>Covered.</span>
              </h2>
            </div>
            <div
              className="flex items-center gap-8"
              data-reveal="fade-in"
              style={{ "--reveal-delay": "0.15s" } as React.CSSProperties}
            >
              <div className="text-center">
                <p className="font-sans text-4xl font-extrabold text-[#111111]">8</p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-[#7a7a7a]">Services</p>
              </div>
              <div className="h-8 w-px bg-[#e2e2de]" />
              <div className="text-center">
                <p className="font-sans text-4xl font-extrabold" style={{ color: "#1a5c34" }}>Free</p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-[#7a7a7a]">To You</p>
              </div>
            </div>
          </div>

          {/* Service grid */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ALL_SERVICES.map((service, i) => {
              const Icon = SERVICE_ICONS[service.name] ?? Briefcase;
              return (
                <div
                  key={service.name}
                  className="group relative flex flex-col gap-4 rounded-xl border border-[#e2e2de] bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1a5c34]/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
                  data-reveal="fade-up"
                  style={{ "--reveal-delay": `${i * 0.04}s` } as React.CSSProperties}
                >
                  {/* Icon */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e8f3ec] transition-colors duration-200 group-hover:bg-[#1a5c34]">
                    <Icon
                      className="h-5 w-5 text-[#1a5c34] transition-colors duration-200 group-hover:text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {/* Text */}
                  <div>
                    <h3 className="mb-1.5 font-sans text-[14px] font-semibold leading-snug text-[#111111]">
                      {service.name}
                    </h3>
                    <p className="text-xs leading-relaxed text-[#7a7a7a]">{service.desc}</p>
                  </div>
                  {/* Number badge */}
                  <span
                    aria-hidden="true"
                    className="absolute right-4 top-4 font-sans text-[2rem] font-extrabold leading-none text-[#f3f3ef] transition-colors duration-200 group-hover:text-[#e8f3ec]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Footer note */}
          <div
            className="mt-6 flex items-center gap-3 rounded-xl border border-[#e8f3ec] bg-[#e8f3ec]/50 px-6 py-4"
            data-reveal="fade-in"
            style={{ "--reveal-delay": "0.4s" } as React.CSSProperties}
          >
            <Check className="h-4 w-4 shrink-0 text-[#1a5c34]" aria-hidden="true" />
            <p className="text-sm text-[#3d3d3d]">
              All 8 services are{" "}
              <strong className="text-[#111111]">completely free of charge</strong> — no fees to students, ever.
            </p>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PARTNER UNIVERSITIES  — marquee on white
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-white px-6 py-24 md:py-28 md:px-10">
        <div className="mx-auto max-w-7xl">

          <div className="mb-14 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div data-reveal="fade-up">
              <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
                <span className="h-px w-6 bg-[#1a5c34]" />
                Our Network
              </p>
              <h2
                className="font-sans font-extrabold leading-[1.08] tracking-tight text-[#111111]"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
              >
                {stats.partnerUkUniversities}+ Partner{" "}
                <span className="text-[#1a5c34]">Universities</span>
              </h2>
            </div>
            <p
              className="max-w-xs text-[0.95rem] leading-[1.7] text-[#7a7a7a] lg:text-right"
              data-reveal="fade-in"
              style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
            >
              Direct partnerships mean faster offers and better outcomes.
            </p>
          </div>

          {/* Marquee strip */}
          <div
            className="relative overflow-hidden rounded-xl border border-[#e2e2de] bg-[#fafaf7] py-6"
            data-reveal="fade-up"
            style={{ "--reveal-delay": "0.2s" } as React.CSSProperties}
          >
            {/* Left fade */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#fafaf7] to-transparent" />
            {/* Right fade */}
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#fafaf7] to-transparent" />
            <div className="animate-marquee gap-4 px-4" style={{ display: "flex" }}>
              {marqueeList.map((uni, i) => (
                <div
                  key={`${uni._id}-${i}`}
                  className="shrink-0 transition-all duration-200"
                >
                  <UniversityCard university={uni} />
                </div>
              ))}
            </div>
          </div>

          <div
            className="mt-8 text-center"
            data-reveal="fade-up"
            style={{ "--reveal-delay": "0.3s" } as React.CSSProperties}
          >
            <Button asChild variant="outline" size="lg">
              <Link href="/institutions">
                View All Partner Institutions
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SUCCESS STORY  — full-bleed photo + text
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-[#f3f3ef] px-6 py-24 md:py-32 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">

            {/* Left — photo card */}
            {spotlightStory ? (
              <div
                className="group relative min-h-[26rem] overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] lg:min-h-[32rem]"
                data-reveal="fade-up"
              >
                <Image
                  src={spotlightStory.studentImage?.url ?? "/section-graduate.jpg"}
                  alt={spotlightStory.studentImage?.alt ?? spotlightStory.studentName}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-[50%_20%] transition-transform duration-[6s] group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(13,51,32,0.92) 0%, rgba(13,51,32,0.4) 55%, transparent 100%)" }}
                />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <Quote aria-hidden="true" className="mb-3 h-7 w-7 rotate-180 text-white/20" />
                  <blockquote className="mb-5 font-sans text-lg font-medium italic leading-[1.65] text-white md:text-[1.15rem]">
                    {spotlightStory.comment}
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-0.5 rounded-full bg-[#c9a465]" />
                    <div>
                      <p className="text-sm font-semibold text-white">{spotlightStory.studentName}</p>
                      <p className="text-xs text-white/50">{spotlightStory.schoolDestination}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="flex min-h-[26rem] items-center justify-center rounded-2xl border border-[#e2e2de] bg-white"
                data-reveal="fade-up"
              >
                <p className="text-sm text-[#7a7a7a]">Stories coming soon</p>
              </div>
            )}

            {/* Right — text */}
            <div
              className="flex flex-col justify-center gap-8"
              data-reveal="fade-up"
              style={{ "--reveal-delay": "0.12s" } as React.CSSProperties}
            >
              <div>
                <p className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
                  <span className="h-px w-6 bg-[#1a5c34]" />
                  Success Stories
                </p>
                <h2
                  className="mb-5 font-sans font-extrabold leading-[1.08] tracking-tight text-[#111111]"
                  style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
                >
                  Real Students.
                  <br />
                  Real Results.
                </h2>
                <p className="mb-4 text-[1rem] leading-[1.75] text-[#5a5a5a]">
                  From Enugu to Edinburgh, Lagos to London — over 1,800 African students
                  have trusted IFEM to get them into their dream UK university.
                </p>
                <p className="text-[1rem] leading-[1.75] text-[#7a7a7a]">
                  Our 99.6% visa success rate represents real families whose futures
                  changed because they chose to trust us.
                </p>
              </div>

              {/* Mini stats */}
              <div className="grid grid-cols-2 gap-4 border-t border-[#e2e2de] pt-6">
                {[
                  { num: stats.studentsPlaced, suffix: "+", label: "Students placed" },
                  { num: stats.successRate,    suffix: "%", label: "Visa success rate" },
                ].map(({ num, suffix, label }) => (
                  <div key={label}>
                    <p className="font-sans text-3xl font-extrabold leading-none text-[#1a5c34]">
                      <CountUp to={num} duration={2} />{suffix}
                    </p>
                    <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-widest text-[#7a7a7a]">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Star rating row */}
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#c9a465] text-[#c9a465]" aria-hidden="true" />
                  ))}
                </div>
                <span className="text-sm font-medium text-[#7a7a7a]">Highly rated by students</span>
              </div>

              <Link
                href="/success-stories"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a5c34] hover:text-[#154a2a] transition-colors"
              >
                Read all student stories
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          NEWSLETTER  — clean dark section
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-[#0d3320] px-6 py-20 md:py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-20">
            <div data-reveal="fade-up">
              <p className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#6fa572]">
                <span className="h-px w-6 bg-[#6fa572]" />
                Stay Informed
              </p>
              <h2
                className="mb-4 font-sans font-extrabold leading-tight tracking-tight text-white"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
              >
                UK admission updates,
                <br />
                every month.
              </h2>
              <p className="text-[1rem] leading-[1.75] text-white/50">
                Practical visa tips, funding news, and student-life guidance. No spam.
              </p>
            </div>
            <div
              data-reveal="fade-up"
              style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
            >
              <NewsletterSignup />
            </div>
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
