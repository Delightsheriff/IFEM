import type { Metadata } from "next";
import PageContentWrapper from "@/components/ui/page-content-wrapper";
import { CTASection } from "@/components/ui/cta-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { UniversityCard } from "@/components/ui/university-card";
import { FALLBACK_UNIVERSITIES } from "@/interface/universities";
import { getAboutDetails } from "@/sanity/sanity";
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  ShieldCheck,
  Globe,
  Briefcase,
  FileCheck,
  HandHeart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "IFEM Education | Your Gateway to UK Education",
  description:
    "Start your UK education journey with IFEM Education. 99.6% visa success rate, 40+ partner universities, free admission processing, and expert counselling.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "IFEM Education | Your Gateway to UK Education",
    description:
      "Start your UK education journey with IFEM. 99.6% visa success rate and 40+ UK partner universities.",
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
    title: "Free Admission & Visa",
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
      "We manage all documentation, biometric appointments, and university coordination on your behalf.",
  },
  {
    number: "06",
    icon: HandHeart,
    title: "Dedicated Support",
    description:
      "Continuous, personal support throughout every stage of your educational journey — from application to arrival.",
  },
];

export default async function Home() {
  const details = await getAboutDetails();
  const stats = {
    studentsPlaced: details?.stats?.numberOfStudentsPlaced ?? 1800,
    partnerUkUniversities: details?.stats?.numberOfPartnerUkUniversities ?? 40,
    yearsOfExperience: details?.stats?.yearsOfExperience ?? 10,
    successRate: details?.stats?.successRate ?? 99.6,
  };

  const hasHeroImage = !!details?.heroImage?.url;

  return (
    <div className="w-full">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative pt-16 pb-0 overflow-hidden bg-cream">
        {/* Subtle background pattern */}
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
          <div className="grid lg:grid-cols-2 gap-0 min-h-[calc(100vh-5rem)]">
            {/* Left — Content */}
            <div className="flex flex-col justify-center py-16 lg:py-24 lg:pr-16">
              {/* Trust badge */}
              <div className="inline-flex items-center gap-2 mb-8 self-start">
                <CheckCircle2 className="w-4 h-4 text-forest shrink-0" />
                <span className="text-sm font-semibold text-forest tracking-wide">
                  {stats.successRate}% Visa Success Rate
                </span>
                <span className="text-sage/60 mx-1">|</span>
                <span className="text-sm text-gray">
                  100% Free Service
                </span>
              </div>

              <h1 className="font-serif text-5xl md:text-6xl xl:text-7xl font-bold text-charcoal leading-[1.05] mb-6">
                Your Gateway
                <br />
                to{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-forest">UK Education</span>
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 right-0 h-3 bg-terracotta/15 -z-0 skew-x-2"
                  />
                </span>
              </h1>

              <p className="text-lg text-gray leading-relaxed max-w-lg mb-10">
                IFEM Education & Travels is Nigeria&apos;s trusted partner for
                UK university admissions. We provide expert counselling and
                seamless end-to-end support — completely free of charge.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-14">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-forest text-white font-semibold text-sm tracking-wide rounded-sm hover:bg-forest/90 transition-colors focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
                >
                  Start Your Journey
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-3.5 border border-charcoal/20 text-charcoal font-semibold text-sm tracking-wide rounded-sm hover:border-forest hover:text-forest transition-colors focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
                >
                  Learn About Us
                </Link>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border-t border-sage/20 pt-10">
                {[
                  { value: `${stats.studentsPlaced}+`, label: "Students Placed" },
                  { value: `${stats.partnerUkUniversities}+`, label: "Partner Universities" },
                  { value: `${stats.yearsOfExperience}+`, label: "Years of Experience" },
                  { value: `${stats.successRate}%`, label: "Visa Success Rate" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className={`py-2 pr-6 ${i > 0 ? "pl-6 border-l border-sage/20" : ""} ${i >= 2 ? "mt-6 sm:mt-0" : ""}`}
                  >
                    <p className="font-serif text-3xl font-bold text-forest leading-none mb-1">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray uppercase tracking-wider leading-snug">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Image / Visual */}
            <div className="relative hidden lg:flex items-stretch">
              {hasHeroImage ? (
                <div className="relative w-full">
                  {/* Decorative frame */}
                  <div
                    aria-hidden="true"
                    className="absolute top-8 right-8 bottom-0 left-8 border-2 border-forest/20 rounded-none z-10 pointer-events-none"
                  />
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={details?.heroImage?.url ?? ""}
                      alt="IFEM Education — students achieving their UK university dreams"
                      fill
                      className="object-cover"
                      priority
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent to-cream/20" />
                  </div>
                  {/* Green accent stripe */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-forest" />
                </div>
              ) : (
                /* Fallback visual when no image is set */
                <div className="relative w-full bg-forest overflow-hidden flex items-center justify-center">
                  {/* Background pattern */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)",
                      backgroundSize: "32px 32px",
                    }}
                  />
                  <div className="relative z-10 text-center p-12">
                    <p className="font-serif text-6xl font-bold text-white/20 leading-none mb-6">
                      IFEM
                    </p>
                    <p className="font-serif text-3xl font-bold text-white leading-tight max-w-xs mx-auto mb-8">
                      Education &amp; Travels
                    </p>
                    <div className="w-16 h-px bg-white/30 mx-auto mb-8" />
                    <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto">
                      Guiding Nigerian students to world-class UK universities
                      since 2019.
                    </p>
                  </div>
                  {/* Decorative terracotta block */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-terracotta/60" />
                  <div className="absolute top-0 left-0 w-16 h-16 bg-sage/30" />
                </div>
              )}
            </div>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-sage/10">
            {FEATURES.map((feature) => (
              <div
                key={feature.number}
                className="group bg-white p-8 lg:p-10 hover:bg-cream/50 transition-colors duration-300 relative"
              >
                {/* Number watermark */}
                <span
                  aria-hidden="true"
                  className="absolute top-6 right-8 font-serif text-5xl font-bold text-sage/15 leading-none select-none"
                >
                  {feature.number}
                </span>

                <div className="w-10 h-10 rounded-sm bg-forest/8 flex items-center justify-center mb-5 group-hover:bg-forest group-hover:text-white transition-colors duration-300">
                  <feature.icon className="w-5 h-5 text-forest group-hover:text-white transition-colors duration-300" />
                </div>

                <h3 className="font-sans font-semibold text-base text-charcoal mb-3 tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-gray text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom accent on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            ))}
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

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {FALLBACK_UNIVERSITIES.slice(0, 10).map((uni) => (
              <UniversityCard key={uni._id} university={uni} />
            ))}
          </div>

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

      {/* ── Statistics Banner ────────────────────────────────── */}
      <section className="py-20 md:py-24 px-4 bg-charcoal text-white relative overflow-hidden">
        {/* Background texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        {/* Forest accent strip */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-forest" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {[
              {
                value: `${stats.studentsPlaced}+`,
                label: "Students Successfully Placed",
                sub: "and counting",
              },
              {
                value: `${stats.partnerUkUniversities}+`,
                label: "Partner UK Universities",
                sub: "across all regions",
              },
              {
                value: `${stats.yearsOfExperience}+`,
                label: "Years of Experience",
                sub: "established 2019",
              },
              {
                value: `${stats.successRate}%`,
                label: "Visa Success Rate",
                sub: "industry-leading",
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="py-10 md:py-0 px-0 md:px-10 first:pl-0 last:pr-0 text-center md:text-left"
              >
                <p className="font-serif text-5xl md:text-6xl font-bold text-white leading-none mb-2">
                  {stat.value}
                </p>
                <p className="text-white/70 text-sm font-medium leading-snug mb-1">
                  {stat.label}
                </p>
                <p className="text-forest text-xs uppercase tracking-widest font-semibold">
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-4 bg-cream">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="The Process"
            heading="How We Get You There"
            subtitle="A proven, structured approach that has placed over 1,800 students in UK universities."
          />

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connector line */}
            <div
              aria-hidden="true"
              className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-sage/30 z-0"
            />

            {[
              {
                step: "01",
                title: "Free Consultation",
                desc: "Book a consultation with one of our expert counsellors to discuss your goals, background, and options.",
              },
              {
                step: "02",
                title: "University Matching",
                desc: "We identify the right UK universities and programmes that align with your qualifications and ambitions.",
              },
              {
                step: "03",
                title: "Application & Visa",
                desc: "We handle your applications, prepare documentation, and guide you through the UK visa process.",
              },
              {
                step: "04",
                title: "Departure Ready",
                desc: "From biometrics to flight booking, we ensure you are fully prepared for your UK journey.",
              },
            ].map((item) => (
              <div key={item.step} className="relative z-10 text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-forest text-white font-serif font-bold text-sm mb-6 mx-auto group-hover:bg-terracotta transition-colors duration-300">
                  {item.step}
                </div>
                <h3 className="font-sans font-semibold text-charcoal mb-3 text-base">
                  {item.title}
                </h3>
                <p className="text-gray text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-terracotta text-white font-semibold text-sm tracking-wide rounded-sm hover:bg-terracotta/90 transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2"
            >
              Book a Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Success Stories Teaser ───────────────────────────── */}
      <section className="py-24 md:py-32 px-4 bg-white border-t border-sage/10">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
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
                Every student we serve has a unique story. From Enugu to
                Edinburgh, Lagos to London — we have guided thousands of
                Nigerian students to their dream UK universities.
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
            </div>

            {/* Pull quote block */}
            <div className="bg-cream p-10 lg:p-12 border-l-4 border-forest relative">
              <div
                aria-hidden="true"
                className="absolute top-8 right-8 font-serif text-8xl text-forest/10 leading-none select-none"
              >
                &ldquo;
              </div>
              <blockquote className="font-serif text-2xl md:text-3xl italic text-charcoal leading-relaxed mb-8">
                IFEM did not just process my application — they believed in
                my potential when I did not believe in myself.
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-sage/30 flex items-center justify-center">
                  <span className="font-serif font-bold text-forest text-sm">A</span>
                </div>
                <div>
                  <p className="font-semibold text-charcoal text-sm">
                    Adaeze O.
                  </p>
                  <p className="text-gray text-xs">
                    University of Hertfordshire, MSc Data Science
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <CTASection
        variant="forest"
        heading="Ready to Study in the UK?"
        description="Join over 1,800 students who have achieved their educational dreams with IFEM. Your journey starts with a free consultation."
        primaryLink="/contact"
        primaryLabel="Get In Touch"
        secondaryLink="/guides"
        secondaryLabel="Explore Our Guides"
      />
    </div>
  );
}
