import type { Metadata } from "next";
import { CTASection } from "@/components/ui/cta-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { UniversityCard } from "@/components/ui/university-card";
import { FALLBACK_UNIVERSITIES } from "@/interface/universities";
import { getSiteStats, getFeaturedUniversities } from "@/sanity/sanity";
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
  Play,
  ShieldCheck,
  Tag,
  Users,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "IFEM Education | Study in the UK — Free Admission & Visa Processing",
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

export default async function Home() {
  const [siteStats, sanityUniversities] = await Promise.all([
    getSiteStats(),
    getFeaturedUniversities(),
  ]);
  const universities = sanityUniversities.length > 0 ? sanityUniversities : FALLBACK_UNIVERSITIES;
  const stats = {
    studentsPlaced: siteStats?.studentsPlaced ?? 1800,
    partnerUkUniversities: siteStats?.partnerUniversities ?? 40,
    yearsOfExperience: siteStats?.yearsInService ?? 4,
    successRate: siteStats?.visaSuccessRate ?? 99.6,
  };

  return (
    <div className="w-full">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-white">
        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[58fr_42fr]">

          {/* LEFT: Content */}
          <div className="flex flex-col justify-center px-6 md:px-10 lg:px-16 xl:px-24 py-24 lg:py-28 max-w-3xl mx-auto lg:mx-0 w-full">

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-7">
              <span className="block w-8 h-px bg-forest" />
              <span className="text-forest text-xs font-semibold uppercase tracking-widest">
                IFEM Education
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-serif font-bold text-charcoal leading-[1.03] mb-6"
              style={{ fontSize: "clamp(2.6rem, 5vw, 4.25rem)" }}
            >
              Helping African
              <br />
              Students Secure
              <br />
              Admission Into{" "}
              <span className="text-forest">UK Universities.</span>
            </h1>

            {/* Sub-copy */}
            <p className="text-gray text-lg leading-relaxed max-w-lg mb-2">
              Expert counselling, seamless university applications, and UK visa
              support — provided completely free of charge.
            </p>
            <p className="text-gray leading-relaxed max-w-lg mb-10">
              Over{" "}
              <span className="text-charcoal font-semibold">1,800 students</span>{" "}
              placed across Africa with a proven visa success record.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-forest text-white font-semibold text-sm tracking-wide hover:bg-forest/90 transition-colors focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
              >
                <CalendarDays className="w-4 h-4" />
                Book a Free Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/success-stories"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-charcoal/20 text-charcoal font-semibold text-sm tracking-wide hover:border-forest hover:text-forest transition-colors focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
              >
                <Play className="w-4 h-4" />
                Read Success Stories
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2.5">
                {AVATARS.map(({ initial, bg }, i) => (
                  <div
                    key={i}
                    className={`w-9 h-9 rounded-full border-2 border-white ${bg} flex items-center justify-center shrink-0`}
                  >
                    <span className="text-white text-[11px] font-bold">{initial}</span>
                  </div>
                ))}
                <div className="w-9 h-9 rounded-full border-2 border-white bg-forest flex items-center justify-center shrink-0">
                  <span className="text-white text-[9px] font-bold">1.8K+</span>
                </div>
              </div>
              <p className="text-gray text-sm leading-snug max-w-[200px]">
                Join <span className="text-charcoal font-semibold">1,800+</span> successful students who achieved their UK study dreams.
              </p>
            </div>
          </div>

          {/* RIGHT: Photo + Stats overlay */}
          <div className="relative hidden lg:block min-h-[680px]">
            <Image
              src="/hero-student.jpg"
              alt="African student with backpack at a university building"
              fill
              priority
              sizes="42vw"
              className="object-cover object-center"
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/15 to-transparent" />

            {/* Stats card */}
            <div className="absolute bottom-8 left-6 w-72 bg-forest shadow-2xl p-6 text-white">
              {/* Visa success rate header */}
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="text-white/50 text-[9px] uppercase tracking-widest font-semibold mb-2">
                    Visa Success Rate
                  </p>
                  <p className="font-serif font-bold text-white leading-none" style={{ fontSize: "3.25rem" }}>
                    {stats.successRate}
                    <span className="text-2xl align-super text-white/50">%</span>
                  </p>
                </div>
                <ShieldCheck className="w-10 h-10 text-white/20 mt-1 shrink-0" />
              </div>

              <div className="w-full h-px bg-white/15 my-4" />

              {/* Stat rows */}
              <div className="space-y-2.5">
                {[
                  { Icon: Users, label: "Students Placed", value: `${stats.studentsPlaced}+` },
                  { Icon: GraduationCap, label: "Partner Universities", value: `${stats.partnerUkUniversities}+` },
                  { Icon: CalendarDays, label: "Years Active", value: `${stats.yearsOfExperience}+` },
                  { Icon: Tag, label: "Service Cost", value: "Free", accent: true },
                ].map(({ Icon, label, value, accent }) => (
                  <div key={label} className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-white/35 shrink-0" />
                    <span className="text-white/50 text-[10px] uppercase tracking-widest font-semibold flex-1">
                      {label}
                    </span>
                    <span className={`font-semibold text-sm ${accent ? "text-sage" : "text-white"}`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className="border-t border-sage/15 bg-white">
          <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 divide-x divide-sage/15">
            {[
              { Icon: Users, value: "1,800+", label: "Students Placed", sub: "Across Africa" },
              { Icon: ShieldCheck, value: `${stats.successRate}%`, label: "Visa Success Rate", sub: "Proven Track Record" },
              { Icon: Building2, value: `${stats.partnerUkUniversities}+`, label: "Partner Universities", sub: "Across the UK" },
              { Icon: Tag, value: "100%", label: "Free of Charge", sub: "No Hidden Fees" },
            ].map(({ Icon, value, label, sub }) => (
              <div key={label} className="flex items-center gap-4 px-6 py-5 sm:px-8">
                <div className="w-11 h-11 rounded-full bg-forest/8 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-forest" />
                </div>
                <div>
                  <p className="font-serif text-xl font-bold text-charcoal leading-none">{value}</p>
                  <p className="text-charcoal text-xs font-semibold mt-0.5">{label}</p>
                  <p className="text-gray text-[11px]">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose IFEM ─────────────────────────────────── */}
      <section className="py-24 md:py-32 px-4 bg-white border-y border-sage/10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="Why Choose IFEM"
            heading="Complete Educational Support"
            subtitle="From first enquiry to university enrolment, we handle every step of your journey with expertise and care."
          />

          <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-sage/10">
            {FEATURES.map((feature) => (
              <StaggerChild
                key={feature.number}
                className="group bg-white p-8 lg:p-10 hover:bg-cream/50 transition-colors duration-300 relative"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-6 right-8 font-serif text-5xl font-bold text-sage/15 leading-none select-none"
                >
                  {feature.number}
                </span>
                <div className="w-10 h-10 bg-forest/8 flex items-center justify-center mb-5 group-hover:bg-forest group-hover:text-white transition-colors duration-300">
                  <feature.icon className="w-5 h-5 text-forest group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-sans font-semibold text-base text-charcoal mb-3 tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-gray text-sm leading-relaxed">
                  {feature.description}
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Services at a Glance ──────────────────────────────── */}
      <section className="py-24 md:py-32 px-4 bg-charcoal text-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-[5fr_7fr] gap-16 lg:gap-24 items-start">

            {/* Left: editorial panel */}
            <FadeUp className="lg:sticky lg:top-32">
              <div className="flex items-center gap-3 mb-8">
                <span className="block w-8 h-px bg-terracotta" />
                <p className="text-terracotta font-sans text-xs font-semibold uppercase tracking-widest">
                  Our Services
                </p>
              </div>
              <h2
                className="font-serif font-bold text-white leading-[1.05] mb-8"
                style={{ fontSize: "clamp(2.5rem, 4vw, 3.75rem)" }}
              >
                We Handle
                <br />
                Everything.
              </h2>
              <p className="text-white/55 text-lg leading-relaxed mb-10 max-w-sm">
                From your first enquiry to the day you land in the UK — every
                step is managed by our team, at no cost to you.
              </p>

              <div className="flex gap-10 pt-8 border-t border-white/10 mb-10">
                <div>
                  <p className="font-serif text-4xl font-bold text-white leading-none">8</p>
                  <p className="text-white/35 text-[11px] uppercase tracking-widest mt-1.5">
                    Services offered
                  </p>
                </div>
                <div className="w-px bg-white/10" />
                <div>
                  <p className="font-serif text-4xl font-bold text-terracotta leading-none">
                    Free
                  </p>
                  <p className="text-white/35 text-[11px] uppercase tracking-widest mt-1.5">
                    Cost to student
                  </p>
                </div>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-semibold tracking-wide transition-colors border-b border-white/15 hover:border-white/50 pb-1"
              >
                Learn about our approach
                <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeUp>

            {/* Right: service group cards */}
            <Stagger className="space-y-5">

              {/* Group 1 — Counselling & Preparation */}
              <StaggerChild>
                <div className="border border-white/8 bg-white/3 p-8">
                  <div className="flex items-center gap-3 mb-7">
                    <div className="w-6 h-6 bg-terracotta flex items-center justify-center shrink-0">
                      <span className="text-white text-[10px] font-bold font-sans">01</span>
                    </div>
                    <h3 className="font-sans font-semibold text-[11px] uppercase tracking-widest text-white/40">
                      Counselling & Preparation
                    </h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
                    {[
                      { name: "Career Counselling", desc: "Matching your goals to the right programmes and institutions" },
                      { name: "Interview Preparation", desc: "Coaching and mock sessions for visa and university interviews" },
                      { name: "Visa Counselling", desc: "Expert guidance on UK student visa requirements and documents" },
                      { name: "Medical Appointment Booking", desc: "IHS and biometric appointment scheduling on your behalf" },
                    ].map((service) => (
                      <div key={service.name} className="flex gap-3">
                        <Check className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                        <div>
                          <p className="text-white/85 text-sm font-semibold leading-snug">{service.name}</p>
                          <p className="text-white/35 text-xs leading-relaxed mt-0.5">{service.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </StaggerChild>

              {/* Group 2 — Processing & Support */}
              <StaggerChild>
                <div className="border border-white/8 bg-white/3 p-8">
                  <div className="flex items-center gap-3 mb-7">
                    <div className="w-6 h-6 bg-forest flex items-center justify-center shrink-0">
                      <span className="text-white text-[10px] font-bold font-sans">02</span>
                    </div>
                    <h3 className="font-sans font-semibold text-[11px] uppercase tracking-widest text-white/40">
                      Processing & Support
                    </h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
                    {[
                      { name: "Admission Processing", desc: "Full management of your university applications and offers" },
                      { name: "Biometric Reservation", desc: "Appointment booking at certified UK visa application centres" },
                      { name: "Flight Booking", desc: "Travel arrangements coordinated ahead of your UK departure" },
                      { name: "Funding Solutions", desc: "Guidance on scholarships, bursaries, and funding pathways" },
                    ].map((service) => (
                      <div key={service.name} className="flex gap-3">
                        <Check className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                        <div>
                          <p className="text-white/85 text-sm font-semibold leading-snug">{service.name}</p>
                          <p className="text-white/35 text-xs leading-relaxed mt-0.5">{service.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </StaggerChild>

              {/* Free callout strip */}
              <StaggerChild>
                <div className="bg-forest/15 border border-forest/25 px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-white/60 text-sm leading-relaxed">
                    All eight services are provided{" "}
                    <span className="text-white font-semibold">completely free of charge</span>{" "}
                    — IFEM earns only through university commissions, never from students.
                  </p>
                  <div className="shrink-0 sm:w-px sm:h-8 h-px w-full bg-white/10" />
                  <p className="font-serif text-2xl font-bold text-white shrink-0">100% Free</p>
                </div>
              </StaggerChild>

            </Stagger>
          </div>
        </div>
      </section>

      {/* ── Partner Universities ─────────────────────────────── */}
      <section className="py-24 md:py-32 px-4">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="Our Network"
            heading="Partner Universities"
            subtitle="We hold direct partnerships with 40+ UK universities, giving students access to faster responses and dedicated support."
          />
          <Stagger className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {universities.map((uni) => (
              <StaggerChild key={uni._id}>
                <UniversityCard university={uni} />
              </StaggerChild>
            ))}
          </Stagger>
          <div className="text-center mt-12">
            <Link
              href="/institutions"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-forest text-forest font-semibold text-sm tracking-wide rounded-sm hover:bg-forest hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
            >
              View All Partner Institutions
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-cream border-t border-sage/10 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* Left: heading + image */}
            <FadeUp>
              <div className="flex items-center gap-3 mb-6">
                <span className="block w-8 h-px bg-forest" />
                <p className="text-forest font-sans text-xs font-semibold uppercase tracking-widest">
                  The Process
                </p>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal leading-tight mb-5">
                How We Get You There
              </h2>
              <p className="text-gray text-lg leading-relaxed mb-10 max-w-md">
                A proven, structured approach that has placed over 1,800 students in UK universities.
              </p>
              <div className="relative h-72 overflow-hidden">
                <Image
                  src="/section-students.jpg"
                  alt="Students collaborating on campus"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/25 to-transparent" />
              </div>
            </FadeUp>

            {/* Right: 2x2 steps + CTA */}
            <Stagger className="grid grid-cols-2 gap-4 lg:pt-20">
              {[
                { step: "01", title: "Free Consultation", desc: "Discuss your goals with one of our expert counsellors to map out your options." },
                { step: "02", title: "University Matching", desc: "We identify UK universities and programmes aligned with your qualifications." },
                { step: "03", title: "Application & Visa", desc: "We handle your applications and guide you through the full UK visa process." },
                { step: "04", title: "Departure Ready", desc: "From biometrics to flight booking — fully prepared for your UK journey." },
              ].map((item) => (
                <StaggerChild
                  key={item.step}
                  className="group bg-white border border-sage/20 p-6 hover:border-forest/30 hover:shadow-md transition-all duration-200"
                >
                  <p className="font-serif text-3xl font-bold text-forest/20 leading-none mb-4 group-hover:text-forest/40 transition-colors">
                    {item.step}
                  </p>
                  <h3 className="font-sans font-semibold text-charcoal text-sm mb-2">{item.title}</h3>
                  <p className="text-gray text-xs leading-relaxed">{item.desc}</p>
                </StaggerChild>
              ))}
              <div className="col-span-2 mt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-terracotta text-white font-semibold text-sm tracking-wide hover:bg-terracotta/90 transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2"
                >
                  Book a Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Stagger>

          </div>
        </div>
      </section>

      {/* ── Success Stories Teaser ─────────────────────────── */}
      <section className="py-24 md:py-32 px-4 bg-white border-t border-sage/10">
        <div className="mx-auto max-w-7xl">
          <Stagger className="grid lg:grid-cols-2 gap-16 items-center">
            <StaggerChild>
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-8 h-px bg-terracotta" />
                <p className="text-terracotta font-sans text-xs font-semibold uppercase tracking-widest">
                  Success Stories
                </p>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal leading-tight mb-6">
                Real Students.
                <br />
                Real Journeys.
              </h2>
              <p className="text-gray text-lg leading-relaxed mb-4">
                From Enugu to Edinburgh, Lagos to London — we have guided
                thousands of African students to their dream UK universities.
              </p>
              <p className="text-gray leading-relaxed mb-10">
                Our 99.6% visa success rate is not just a statistic — it
                represents families whose futures changed because they chose
                to trust IFEM.
              </p>
              <Link
                href="/success-stories"
                className="inline-flex items-center gap-2 text-forest font-semibold text-sm tracking-wide border-b border-forest pb-1 hover:text-forest/70 hover:border-forest/70 transition-colors"
              >
                Read Their Stories
                <ArrowRight className="w-4 h-4" />
              </Link>
            </StaggerChild>

            <StaggerChild className="relative min-h-[420px] overflow-hidden">
              <Image
                src="/section-graduate.jpg"
                alt="African student celebrating graduation"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-charcoal/5" />
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                <div aria-hidden="true" className="font-serif text-7xl text-white/15 leading-none mb-1 select-none">
                  &ldquo;
                </div>
                <blockquote className="font-serif text-xl md:text-2xl italic text-white leading-relaxed mb-5">
                  IFEM did not just process my application — they believed in
                  my potential when I did not believe in myself.
                </blockquote>
                <div className="border-l-4 border-forest pl-4">
                  <p className="font-semibold text-white text-sm">Adaeze O.</p>
                  <p className="text-white/50 text-xs">University of Hertfordshire, MSc Data Science</p>
                </div>
              </div>
            </StaggerChild>
          </Stagger>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
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
