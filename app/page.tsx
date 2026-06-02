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
      <section className="bg-white overflow-hidden">
        <div className="grid lg:grid-cols-2 lg:min-h-[95svh]">

          {/* LEFT: Content */}
          <div className="flex flex-col justify-center px-6 md:px-10 lg:px-14 xl:px-20 py-20 lg:py-0 max-w-2xl mx-auto lg:max-w-none lg:mx-0 w-full">

            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 bg-forest/10 text-forest px-4 py-2.5 text-[12px] font-bold uppercase tracking-widest mb-8 w-fit">
              <span className="w-2 h-2 rounded-full bg-forest" />
              Africa&apos;s Gateway to UK Education
            </div>

            {/* Headline — Direct value proposition */}
            <h1
              className="font-serif font-bold text-charcoal leading-[1.08] mb-8"
              style={{ fontSize: "clamp(2.5rem, 5.2vw, 4.5rem)" }}
            >
              Your Complete UK{" "}
              <em className="not-italic text-forest">University Journey</em>
              <br />
              Guided & <em className="not-italic text-forest">100% Free</em>
            </h1>

            {/* Sub-copy — Value prop clarity */}
            <p className="text-lg text-gray leading-relaxed max-w-lg mb-6 font-medium">
              Expert counselling. Seamless applications. Visa support.{" "}
              <span className="text-charcoal font-bold">All at zero cost.</span>
            </p>

            <p className="text-gray text-[1.05rem] leading-relaxed max-w-lg mb-10">
              Join 1,800+ Nigerian students who've secured admission to top UK universities with our 99.6% visa success rate and 40+ institutional partnerships.
            </p>

            {/* CTAs — Redesigned for clarity */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-forest text-white font-bold text-sm tracking-wide hover:bg-forest/85 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-3 focus:ring-forest focus:ring-offset-2 shadow-lg hover:shadow-xl"
              >
                <CalendarDays className="w-5 h-5" />
                Book Free Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/success-stories"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-forest text-forest font-bold text-sm tracking-wide hover:bg-forest/5 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-3 focus:ring-forest focus:ring-offset-2"
              >
                Success Stories
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="space-y-6 pt-8 border-t border-sage/20">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="font-serif text-4xl font-bold text-forest leading-none mb-2 tabular-nums">1,800+</p>
                  <p className="text-gray text-sm">Students Placed</p>
                </div>
                <div>
                  <p className="font-serif text-4xl font-bold text-forest leading-none mb-2 tabular-nums">99.6%</p>
                  <p className="text-gray text-sm">Visa Success Rate</p>
                </div>
                <div>
                  <p className="font-serif text-4xl font-bold text-forest leading-none mb-2 tabular-nums">40+</p>
                  <p className="text-gray text-sm">Partner Universities</p>
                </div>
                <div>
                  <p className="font-serif text-4xl font-bold text-terracotta leading-none mb-2">FREE</p>
                  <p className="text-gray text-sm">No Hidden Fees</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: High-resolution hero image */}
          <div className="hidden lg:flex flex-col h-full">
            <div className="relative flex-1 overflow-hidden bg-gradient-to-br from-sage/10 to-cream">
              {/* Subtle decorative accent */}
              <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-forest to-terracotta opacity-40 z-10" />
              <Image
                src="/hero-modern.png"
                alt="Nigerian students on UK university campus—confident and ready to succeed"
                fill
                priority
                sizes="50vw"
                quality={95}
                className="object-cover object-center"
              />
              {/* Subtle overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Bottom stats bar — visible on mobile, showcase on desktop */}
        <div className="border-t-2 border-forest/10 bg-gradient-to-r from-cream/50 to-white backdrop-blur-sm">
          <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 divide-x divide-forest/8">
            {[
              { Icon: Users,          value: "1,800+",                      label: "Students",         sub: "Successfully Placed" },
              { Icon: ShieldCheck,    value: `${stats.successRate}%`,      label: "Visa Success",     sub: "Proven Success Rate" },
              { Icon: Building2,      value: `${stats.partnerUkUniversities}+`,    label: "Universities",     sub: "Direct Partnerships" },
              { Icon: Tag,            value: "FREE",                        label: "Cost to Students", sub: "Zero Hidden Fees" },
            ].map(({ Icon, value, label, sub }) => (
              <div key={label} className="flex items-center gap-4 px-4 sm:px-6 py-6 sm:py-7 hover:bg-forest/3 transition-colors duration-200">
                <div className="w-12 h-12 rounded-full bg-forest/10 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-forest font-bold" />
                </div>
                <div className="flex-1">
                  <p className="font-serif text-2xl md:text-3xl font-bold text-forest leading-none tabular-nums mb-1">{value}</p>
                  <p className="text-charcoal text-xs md:text-sm font-bold leading-tight">{label}</p>
                  <p className="text-gray text-[11px] md:text-xs leading-tight">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose IFEM ─────────────────────────────────── */}
      <section className="py-32 md:py-40 px-4 bg-white border-b border-forest/8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-forest/10 text-forest text-xs font-bold uppercase tracking-widest mb-6">
              Why Choose IFEM
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-6 leading-tight">
              Everything You Need,<br /> Nothing You Don&apos;t
            </h2>
            <p className="text-xl text-gray max-w-2xl mx-auto leading-relaxed">
              We handle every step of your UK university journey—from initial counselling to your first day on campus. All completely free.
            </p>
          </div>

          <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature) => (
              <StaggerChild
                key={feature.number}
                className="group relative bg-white border-2 border-forest/12 rounded-xl p-8 lg:p-9 hover:border-forest/35 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Accent top bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-forest via-terracotta to-sage opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Numbered badge */}
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-forest text-white font-bold text-base mb-6 group-hover:bg-terracotta transition-colors duration-300 shadow-md">
                  {feature.number}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 bg-forest/12 flex items-center justify-center mb-6 rounded-xl group-hover:bg-forest group-hover:text-white transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-forest group-hover:text-white transition-colors duration-300" />
                </div>

                {/* Title & Description */}
                <h3 className="font-sans font-bold text-lg text-charcoal mb-4 leading-snug">
                  {feature.title}
                </h3>
                <p className="text-gray text-sm leading-relaxed">
                  {feature.description}
                </p>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Services at a Glance ──────────────────────────────── */}
      <section className="py-32 md:py-40 px-4 bg-gradient-to-b from-white to-cream relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #006b38 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-[45fr_55fr] gap-20 lg:gap-28 items-start">

            {/* Left: Editorial panel */}
            <FadeUp className="lg:sticky lg:top-24">
              <span className="inline-block px-4 py-2 bg-terracotta/15 text-terracotta text-xs font-bold uppercase tracking-widest mb-6">
                Our Services
              </span>
              <h2
                className="font-serif font-bold text-charcoal leading-[1.1] mb-8"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                Your Complete UK Education Journey
              </h2>
              <p className="text-gray text-lg leading-relaxed mb-10 max-w-sm">
                From initial counselling to your arrival in the UK—we handle every detail personally, at zero cost to you.
              </p>

              <div className="flex gap-12 pt-8 border-t border-sage/20 mb-12">
                <div>
                  <p className="font-serif text-5xl font-bold text-forest leading-none">8</p>
                  <p className="text-gray text-sm font-semibold mt-2">
                    Services
                  </p>
                </div>
                <div className="w-px bg-sage/20" />
                <div>
                  <p className="font-serif text-5xl font-bold text-terracotta leading-none">
                    FREE
                  </p>
                  <p className="text-gray text-sm font-semibold mt-2">
                    Cost to Students
                  </p>
                </div>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-forest hover:text-terracotta text-sm font-bold tracking-wide transition-colors pb-2"
              >
                Learn about our approach
                <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeUp>

            {/* Right: Service groups */}
            <Stagger className="space-y-6">

              {/* Group 1 — Counselling & Preparation */}
              <StaggerChild>
                <div className="border-2 border-forest/15 bg-white rounded-xl p-8 hover:border-forest/30 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 bg-gradient-to-br from-terracotta to-orange-500 flex items-center justify-center shrink-0 rounded">
                      <span className="text-white text-sm font-bold font-sans">1</span>
                    </div>
                    <h3 className="font-sans font-bold text-sm uppercase tracking-widest text-charcoal">
                      Counselling & Preparation
                    </h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                    {[
                      { name: "Career Counselling", desc: "Match your goals to ideal UK programmes" },
                      { name: "Interview Preparation", desc: "Coaching and mock interview sessions" },
                      { name: "Visa Counselling", desc: "Expert guidance on visa requirements" },
                      { name: "Medical Appointments", desc: "IHS and biometric scheduling support" },
                    ].map((service) => (
                      <div key={service.name} className="flex gap-3">
                        <Check className="w-5 h-5 text-terracotta shrink-0 mt-0.5 font-bold" />
                        <div>
                          <p className="text-charcoal text-sm font-semibold leading-snug">{service.name}</p>
                          <p className="text-gray text-xs leading-relaxed mt-1">{service.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </StaggerChild>

              {/* Group 2 — Processing & Support */}
              <StaggerChild>
                <div className="border-2 border-forest/15 bg-white rounded-xl p-8 hover:border-forest/30 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 bg-gradient-to-br from-forest to-emerald-700 flex items-center justify-center shrink-0 rounded">
                      <span className="text-white text-sm font-bold font-sans">2</span>
                    </div>
                    <h3 className="font-sans font-bold text-sm uppercase tracking-widest text-charcoal">
                      Processing & Support
                    </h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                    {[
                      { name: "Admission Processing", desc: "Full management of applications" },
                      { name: "Biometric Reservation", desc: "Certified visa centre appointments" },
                      { name: "Flight Booking", desc: "Coordinated travel arrangements" },
                      { name: "Funding Solutions", desc: "Scholarships and bursary guidance" },
                    ].map((service) => (
                      <div key={service.name} className="flex gap-3">
                        <Check className="w-5 h-5 text-forest shrink-0 mt-0.5 font-bold" />
                        <div>
                          <p className="text-charcoal text-sm font-semibold leading-snug">{service.name}</p>
                          <p className="text-gray text-xs leading-relaxed mt-1">{service.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </StaggerChild>

              {/* Free callout - redesigned */}
              <StaggerChild>
                <div className="bg-gradient-to-r from-forest/10 via-sage/5 to-terracotta/10 border-2 border-forest/25 rounded-xl px-8 py-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-charcoal font-bold text-sm mb-1">Zero Cost Guarantee</p>
                    <p className="text-gray text-sm">
                      All services are completely free—we're paid by universities, never by students.
                    </p>
                  </div>
                  <p className="font-serif text-4xl font-bold text-forest shrink-0">100% Free</p>
                </div>
              </StaggerChild>

            </Stagger>
          </div>
        </div>
      </section>

      {/* ── Partner Universities ─────────────────────────────── */}
      <section className="py-32 md:py-40 px-4 bg-gradient-to-b from-white to-cream">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-24">
            <span className="inline-block px-4 py-2 bg-forest/10 text-forest text-xs font-bold uppercase tracking-widest mb-6">
              Our Network
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-6 leading-tight">
              40+ Tier-1 UK Universities
            </h2>
            <p className="text-xl text-gray max-w-2xl mx-auto leading-relaxed">
              Direct partnerships with prestigious institutions across the UK, ensuring faster admissions and dedicated support for every student.
            </p>
          </div>
          
          <Stagger className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {universities.map((uni) => (
              <StaggerChild key={uni._id} className="h-full">
                <UniversityCard university={uni} />
              </StaggerChild>
            ))}
          </Stagger>

          <div className="text-center mt-16">
            <Link
              href="/institutions"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-forest text-forest font-bold text-sm tracking-wide hover:bg-forest hover:text-white active:scale-95 transition-all duration-200 focus:outline-none focus:ring-3 focus:ring-forest focus:ring-offset-2 rounded-lg"
            >
              View All {stats.partnerUkUniversities}+ Institutions
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
                <div className="absolute inset-0 bg-linear-to-t from-charcoal/25 to-transparent" />
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

            <StaggerChild className="relative min-h-105 overflow-hidden">
              <Image
                src="/section-graduate.jpg"
                alt="African student celebrating graduation"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-linear-to-t from-charcoal/90 via-charcoal/40 to-charcoal/5" />
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
