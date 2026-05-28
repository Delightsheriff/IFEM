import type { Metadata } from "next";
import { CTASection } from "@/components/ui/cta-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { UniversityCard } from "@/components/ui/university-card";
import { FALLBACK_UNIVERSITIES } from "@/interface/universities";
import { getAboutDetails, getUniversities, getBranches } from "@/sanity/sanity";
import { FadeUp, Stagger, StaggerChild } from "@/components/ui/animate";
import {
  ArrowRight,
  GraduationCap,
  ShieldCheck,
  Globe,
  Briefcase,
  FileCheck,
  HandHeart,
  Users,
  CheckCircle2,
  Building2,
  Clock,
  BadgeCheck,
  Plane,
  BookOpen,
  Calendar,
  Stethoscope,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import CountUp from "@/components/count-up";

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

const SERVICES = [
  {
    icon: BookOpen,
    title: "Career Counselling",
    description: "Expert guidance to help you choose the right course and university that aligns with your career goals.",
  },
  {
    icon: GraduationCap,
    title: "Admission Processing",
    description: "Complete university application management from document preparation to submission.",
  },
  {
    icon: FileCheck,
    title: "Visa Counselling",
    description: "Comprehensive visa guidance with a 99.6% success rate and biometric appointment booking.",
  },
  {
    icon: Calendar,
    title: "Interview Preparation",
    description: "Mock interviews and preparation sessions to help you succeed in university interviews.",
  },
  {
    icon: Stethoscope,
    title: "Medical Appointments",
    description: "Assistance with booking required medical examinations for your visa application.",
  },
  {
    icon: Plane,
    title: "Flight & Travel",
    description: "Support with flight booking and pre-departure preparation for your journey to the UK.",
  },
];

export default async function Home() {
  const [details, sanityUniversities] = await Promise.all([
    getAboutDetails(),
    getUniversities(),
  ]);
  const universities = sanityUniversities.length > 0 ? sanityUniversities : FALLBACK_UNIVERSITIES;
  const stats = {
    studentsPlaced: details?.stats?.numberOfStudentsPlaced ?? 1800,
    partnerUkUniversities: details?.stats?.numberOfPartnerUkUniversities ?? 40,
    yearsOfExperience: details?.stats?.yearsOfExperience ?? 10,
    successRate: details?.stats?.successRate ?? 99.6,
  };

  return (
    <div className="w-full">

      {/* ── Hero Section ─────────────────────────────────────────────────
          Modern split layout with hero image and floating stats card
      ──────────────────────────────────────────────────────────────── */}
      <section className="relative bg-cream overflow-hidden min-h-[90vh]">
        {/* Subtle background pattern */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23006b38' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[90vh] py-16 lg:py-0">
            
            {/* Left: Content */}
            <Stagger className="flex flex-col justify-center">
              {/* Eyebrow */}
              <StaggerChild className="flex items-center gap-3 mb-6">
                <span className="block w-10 h-0.5 bg-forest" />
                <p className="text-forest font-sans text-xs font-semibold uppercase tracking-[0.2em]">
                  IFEM Education
                </p>
              </StaggerChild>

              {/* Headline */}
              <StaggerChild>
                <h1 className="font-serif font-bold text-charcoal leading-[1.05] mb-6">
                  <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
                    Helping African
                  </span>
                  <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
                    Students Secure
                  </span>
                  <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
                    Admission Into
                  </span>
                  <span className="relative inline-block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
                    <span className="text-forest">UK Universities.</span>
                    <svg
                      className="absolute -bottom-2 left-0 w-full"
                      viewBox="0 0 300 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 8C50 3 150 3 298 8"
                        stroke="#c4583c"
                        strokeWidth="3"
                        strokeLinecap="round"
                        className="animate-draw"
                      />
                    </svg>
                  </span>
                </h1>
              </StaggerChild>

              {/* Sub-copy */}
              <StaggerChild>
                <p className="text-gray text-lg lg:text-xl leading-relaxed max-w-xl mb-4">
                  Expert counselling, seamless university applications, and UK visa support — provided completely free of charge.
                </p>
                <p className="text-charcoal font-medium mb-8">
                  Over <span className="text-forest font-bold">{stats.studentsPlaced.toLocaleString()}</span> students placed across Africa with a proven visa success record.
                </p>
              </StaggerChild>

              {/* CTAs */}
              <StaggerChild className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-forest text-white font-semibold text-sm tracking-wide rounded-sm hover:bg-forest/90 transition-all duration-300 hover:shadow-lg hover:shadow-forest/20 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
                >
                  <Calendar className="w-4 h-4" />
                  Book a Free Consultation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/success-stories"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-charcoal/10 text-charcoal font-semibold text-sm tracking-wide rounded-sm hover:border-forest hover:text-forest transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
                >
                  <span className="w-8 h-8 rounded-full bg-forest/10 flex items-center justify-center mr-1">
                    <svg className="w-3 h-3 text-forest" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  Read Success Stories
                </Link>
              </StaggerChild>

              {/* Social proof */}
              <StaggerChild className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-forest to-sage border-2 border-cream flex items-center justify-center text-white text-xs font-bold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 bg-forest/10 px-4 py-2 rounded-full">
                  <span className="font-bold text-forest text-sm">{stats.studentsPlaced.toLocaleString()}+</span>
                </div>
                <p className="text-gray text-sm">
                  Join {stats.studentsPlaced.toLocaleString()}+ successful students<br />
                  who achieved their UK study dreams.
                </p>
              </StaggerChild>
            </Stagger>

            {/* Right: Hero Image with Stats Card */}
            <FadeUp className="relative hidden lg:block">
              {/* Main hero image */}
              <div className="relative h-[600px] xl:h-[650px] rounded-sm overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero-students.png"
                  alt="Happy Nigerian students in front of UK landmarks"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent" />
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 xl:-left-12 bg-forest text-white p-6 xl:p-8 rounded-sm shadow-2xl w-72 xl:w-80">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-5 h-5 text-terracotta" />
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                    Visa Success Rate
                  </p>
                </div>
                <p className="font-serif text-6xl xl:text-7xl font-bold text-white leading-none mb-6">
                  <CountUp from={0} to={stats.successRate} duration={2} />
                  <span className="text-3xl text-white/60">%</span>
                </p>
                
                <div className="space-y-3 border-t border-white/10 pt-4">
                  {[
                    { icon: Users, label: "Students Placed", value: `${stats.studentsPlaced.toLocaleString()}+` },
                    { icon: Building2, label: "Partner Universities", value: `${stats.partnerUkUniversities}+` },
                    { icon: Clock, label: "Years Active", value: `${stats.yearsOfExperience}+` },
                    { icon: BadgeCheck, label: "Service Cost", value: "Free", highlight: true },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <stat.icon className="w-4 h-4 text-white/40" />
                        <span className="text-xs text-white/60 uppercase tracking-wide">{stat.label}</span>
                      </div>
                      <span className={`font-bold ${stat.highlight ? 'text-terracotta' : 'text-white'}`}>
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Small floating accent */}
              <div className="absolute top-8 -right-4 w-20 h-20 bg-terracotta/20 rounded-full blur-2xl" />
            </FadeUp>
          </div>
        </div>

        {/* Bottom stats bar for mobile */}
        <div className="lg:hidden bg-charcoal text-white py-8 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { icon: Users, value: `${stats.studentsPlaced.toLocaleString()}+`, label: "Students Placed", sublabel: "Across Africa" },
              { icon: CheckCircle2, value: `${stats.successRate}%`, label: "Visa Success Rate", sublabel: "Proven Track Record" },
              { icon: Building2, value: `${stats.partnerUkUniversities}+`, label: "Partner Universities", sublabel: "Across the UK" },
              { icon: BadgeCheck, value: "100%", label: "Free of Charge", sublabel: "No Hidden Fees" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-12 h-12 rounded-full bg-forest/20 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-5 h-5 text-forest" />
                </div>
                <p className="font-serif text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-xs text-white/60 uppercase tracking-wide">{stat.label}</p>
                <p className="text-xs text-white/40">{stat.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services at a Glance ─────────────────────────────────── */}
      <section className="py-24 md:py-32 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="Our Services"
            heading="What We Do For You"
            subtitle="From initial consultation to arrival in the UK, we handle every step of your educational journey with expertise and care — completely free of charge."
          />

          <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, index) => (
              <StaggerChild
                key={service.title}
                className="group relative bg-cream p-8 border border-sage/20 hover:border-forest/30 hover:shadow-lg transition-all duration-300"
              >
                {/* Number badge */}
                <span
                  aria-hidden="true"
                  className="absolute top-6 right-6 font-serif text-5xl font-bold text-sage/10 leading-none select-none"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                
                <div className="w-14 h-14 bg-forest/10 flex items-center justify-center mb-6 group-hover:bg-forest group-hover:scale-110 transition-all duration-300">
                  <service.icon className="w-6 h-6 text-forest group-hover:text-white transition-colors duration-300" />
                </div>
                
                <h3 className="font-sans font-semibold text-lg text-charcoal mb-3">
                  {service.title}
                </h3>
                <p className="text-gray text-sm leading-relaxed">
                  {service.description}
                </p>
                
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-forest scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </StaggerChild>
            ))}
          </Stagger>

          <div className="text-center mt-12">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-forest font-semibold text-sm tracking-wide border-b-2 border-forest pb-1 hover:text-forest/70 hover:border-forest/70 transition-colors"
            >
              Learn More About Our Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Choose IFEM ─────────────────────────────────── */}
      <section className="py-24 md:py-32 px-4 bg-cream border-y border-sage/10">
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

      {/* ── Partner Universities ─────────────────────────────── */}
      <section className="py-24 md:py-32 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="Our Network"
            heading="Partner Universities"
            subtitle="We hold direct partnerships with 40+ UK universities, giving students access to faster responses and dedicated support."
          />
          <Stagger className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {universities.slice(0, 10).map((uni) => (
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
      <section className="py-24 md:py-32 px-4 bg-charcoal text-white relative overflow-hidden">
        {/* Background pattern */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="block w-8 h-px bg-terracotta" />
              <p className="text-terracotta font-sans text-xs font-semibold uppercase tracking-widest">
                The Process
              </p>
              <span className="block w-8 h-px bg-terracotta" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              How We Get You There
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              A proven, structured approach that has placed over {stats.studentsPlaced.toLocaleString()} students in UK universities.
            </p>
          </div>
          
          <Stagger className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting line - desktop only */}
            <div
              aria-hidden="true"
              className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-white/10 z-0"
            />
            {[
              { step: "01", title: "Free Consultation", desc: "Book a consultation with one of our expert counsellors to discuss your goals, background, and options.", icon: Calendar },
              { step: "02", title: "University Matching", desc: "We identify the right UK universities and programmes that align with your qualifications and ambitions.", icon: GraduationCap },
              { step: "03", title: "Application & Visa", desc: "We handle your applications, prepare documentation, and guide you through the UK visa process.", icon: FileCheck },
              { step: "04", title: "Departure Ready", desc: "From biometrics to flight booking, we ensure you are fully prepared for your UK journey.", icon: Plane },
            ].map((item) => (
              <StaggerChild key={item.step} className="relative z-10 text-center group">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 rounded-full bg-forest flex items-center justify-center mx-auto group-hover:bg-terracotta transition-colors duration-300 ring-4 ring-charcoal">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-terracotta text-white text-sm font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-sans font-semibold text-white mb-3 text-base">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </StaggerChild>
            ))}
          </Stagger>
          
          <div className="text-center mt-14">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-terracotta text-white font-semibold text-sm tracking-wide rounded-sm hover:bg-terracotta/90 transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 focus:ring-offset-charcoal"
            >
              Start Your Journey Today
              <ArrowRight className="w-4 h-4" />
            </Link>
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
                thousands of Nigerian students to their dream UK universities.
              </p>
              <p className="text-gray leading-relaxed mb-10">
                Our {stats.successRate}% visa success rate is not just a statistic — it
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

            <StaggerChild className="bg-cream p-10 lg:p-12 border-l-4 border-forest relative">
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
                <div className="w-12 h-12 bg-forest flex items-center justify-center rounded-full">
                  <span className="font-serif font-bold text-white text-lg">A</span>
                </div>
                <div>
                  <p className="font-semibold text-charcoal">Adaeze O.</p>
                  <p className="text-gray text-sm">University of Hertfordshire, MSc Data Science</p>
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
        description={`Join over ${stats.studentsPlaced.toLocaleString()} students who have achieved their educational dreams with IFEM Education. Your journey starts with a free consultation.`}
        primaryLink="/contact"
        primaryLabel="Get In Touch"
        secondaryLink="/guides"
        secondaryLabel="Explore Our Guides"
      />
    </div>
  );
}
