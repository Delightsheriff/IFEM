import type { Metadata } from "next";
import { CTASection } from "@/components/ui/cta-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { UniversityCard } from "@/components/ui/university-card";
import { FALLBACK_UNIVERSITIES } from "@/interface/universities";
import { getAboutDetails } from "@/sanity/sanity";
import {
  ArrowRight,
  GraduationCap,
  ShieldCheck,
  Globe,
  Briefcase,
  FileCheck,
  HandHeart,
} from "lucide-react";
import Link from "next/link";

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

  return (
    <div className="w-full">

      {/* ── Hero ─────────────────────────────────────────────────
          Two-column: editorial left / data-forward green right.
          Stats only appear on their respective side — no repetition.
          On mobile the right panel is replaced by a compact stat row.
      ──────────────────────────────────────────────────────── */}
      <section className="relative bg-cream overflow-hidden">

        {/* Dot grid — cream side only */}
        <div
          aria-hidden="true"
          className="absolute inset-0 lg:right-[38%] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #8fb290 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            opacity: 0.18,
          }}
        />

        {/* Forest green right column — desktop only */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute right-0 top-0 bottom-0 w-[38%] bg-forest"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          {/* Watermark number */}
          <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden">
            <p
              aria-hidden="true"
              className="font-serif font-bold text-white/[0.06] leading-none"
              style={{ fontSize: "clamp(140px, 20vw, 300px)" }}
            >
              {stats.successRate}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-terracotta" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[62fr_38fr] w-full">

            {/* ── Left: brand statement ── */}
            <div className="flex flex-col justify-center py-24 lg:py-32 lg:pr-16">

              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-8">
                <span className="block w-8 h-px bg-forest" />
                <p className="text-forest font-sans text-xs font-semibold uppercase tracking-widest">
                  IFEM Education
                </p>
              </div>

              {/* Headline */}
              <h1
                className="font-serif font-bold text-charcoal leading-[1.02] mb-8"
                style={{ fontSize: "clamp(2.4rem, 5.5vw, 5rem)" }}
              >
                We Get
                <br />
                Nigerian Students
                <br />
                Into{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-forest">UK Universities.</span>
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 right-0 h-2 bg-terracotta/20 -z-0 -skew-x-2"
                  />
                </span>
              </h1>

              {/* Sub-copy */}
              <p className="text-gray text-lg leading-relaxed max-w-lg mb-10">
                Expert counselling, seamless application support, and UK visa
                processing — provided completely free of charge. Over 1,800
                students placed. A 99.6% visa success rate.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-forest text-white font-semibold text-sm tracking-wide rounded-sm hover:bg-forest/90 transition-colors focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
                >
                  Book a Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/success-stories"
                  className="inline-flex items-center justify-center px-8 py-4 border border-charcoal/20 text-charcoal font-semibold text-sm tracking-wide rounded-sm hover:border-forest hover:text-forest transition-colors focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
                >
                  Read Success Stories
                </Link>
              </div>

              {/* Mobile-only stat strip — hidden on lg where green panel takes over */}
              <div className="lg:hidden mt-12 pt-10 border-t border-sage/20 grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  { value: `${stats.successRate}%`, label: "Visa Success Rate" },
                  { value: `${stats.studentsPlaced}+`, label: "Students Placed" },
                  { value: `${stats.partnerUkUniversities}+`, label: "Partner Universities" },
                  { value: "100%", label: "Free Service" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-serif text-3xl font-bold text-forest leading-none mb-1">
                      {s.value}
                    </p>
                    <p className="text-[11px] text-gray uppercase tracking-wide leading-snug">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: green panel stat display — desktop only ── */}
            <div className="hidden lg:flex flex-col items-center justify-center text-white relative z-10 py-24">
              <div className="text-center mb-12">
                <p className="font-sans text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-3">
                  Visa Success Rate
                </p>
                <p
                  className="font-serif font-bold text-white leading-none"
                  style={{ fontSize: "clamp(5rem, 9vw, 8.5rem)" }}
                >
                  {stats.successRate}
                  <span className="text-[0.35em] align-top mt-4 inline-block text-white/50">%</span>
                </p>
                <div className="w-10 h-px bg-white/15 mx-auto mt-6" />
              </div>

              <div className="w-full max-w-[210px] space-y-5">
                {[
                  { value: `${stats.studentsPlaced}+`, label: "Students Placed" },
                  { value: `${stats.partnerUkUniversities}+`, label: "Partner Universities" },
                  { value: `${stats.yearsOfExperience}+`, label: "Years Active" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between border-b border-white/10 pb-5">
                    <p className="text-white/40 text-xs uppercase tracking-wide">
                      {s.label}
                    </p>
                    <p className="font-serif text-2xl font-bold text-white">
                      {s.value}
                    </p>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-1">
                  <p className="text-white/40 text-xs uppercase tracking-wide">
                    Service Cost
                  </p>
                  <p className="font-serif text-2xl font-bold text-terracotta/90">
                    Free
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient edge */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-forest via-sage to-terracotta" />
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

      {/* ── How It Works ─────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-4 bg-cream border-t border-sage/10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="The Process"
            heading="How We Get You There"
            subtitle="A proven, structured approach that has placed over 1,800 students in UK universities."
          />
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div
              aria-hidden="true"
              className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-sage/30 z-0"
            />
            {[
              { step: "01", title: "Free Consultation", desc: "Book a consultation with one of our expert counsellors to discuss your goals, background, and options." },
              { step: "02", title: "University Matching", desc: "We identify the right UK universities and programmes that align with your qualifications and ambitions." },
              { step: "03", title: "Application & Visa", desc: "We handle your applications, prepare documentation, and guide you through the UK visa process." },
              { step: "04", title: "Departure Ready", desc: "From biometrics to flight booking, we ensure you are fully prepared for your UK journey." },
            ].map((item) => (
              <div key={item.step} className="relative z-10 text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-forest text-white font-serif font-bold text-sm mb-6 mx-auto group-hover:bg-terracotta transition-colors duration-300">
                  {item.step}
                </div>
                <h3 className="font-sans font-semibold text-charcoal mb-3 text-sm">
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

      {/* ── Success Stories Teaser ─────────────────────────── */}
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
                From Enugu to Edinburgh, Lagos to London — we have guided
                thousands of Nigerian students to their dream UK universities.
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
                <div className="w-10 h-10 bg-sage/30 flex items-center justify-center">
                  <span className="font-serif font-bold text-forest text-sm">A</span>
                </div>
                <div>
                  <p className="font-semibold text-charcoal text-sm">Adaeze O.</p>
                  <p className="text-gray text-xs">University of Hertfordshire, MSc Data Science</p>
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
        description="Join over 1,800 students who have achieved their educational dreams with IFEM Education. Your journey starts with a free consultation."
        primaryLink="/contact"
        primaryLabel="Get In Touch"
        secondaryLink="/guides"
        secondaryLabel="Explore Our Guides"
      />
    </div>
  );
}
