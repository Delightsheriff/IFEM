import type { Metadata } from "next";
export const revalidate = 3600;
import { customPortableTextComponents } from "@/components/portable-text-components";
import { CTASection } from "@/components/ui/cta-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { FadeUp, Stagger, StaggerChild } from "@/components/ui/animate";
import CountUp from "@/components/animations/CountUp";
import { IOReveal } from "@/components/animations/IOReveal";
import { getAboutDetails, getSiteStats, getTeamMembers } from "@/sanity/sanity";
import { resolveSiteStats } from "@/lib/site-stats";
import { SERVICE_GROUPS } from "@/lib/services";
import {
  Compass,
  HeartHandshake,
  Lightbulb,
  Mail,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Target,
  Check,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PortableText } from "next-sanity";
import Image from "next/image";

const MISSION_ICONS: LucideIcon[] = [Compass, Target, HeartHandshake, Lightbulb, ShieldCheck, Sparkles];
const MISSION_ICON_BY_KEY: Record<string, LucideIcon> = {
  compass: Compass, target: Target, "heart-handshake": HeartHandshake,
  lightbulb: Lightbulb, "shield-check": ShieldCheck, sparkles: Sparkles,
};
const DEPARTMENT_TONE: Record<string, string> = {
  Leadership: "bg-forest text-white",
  Admissions: "bg-terracotta/10 text-terracotta border border-terracotta/25",
  Visa: "bg-forest/10 text-forest border border-forest/25",
  Support: "bg-sage/15 text-charcoal border border-sage/30",
};

export const metadata: Metadata = {
  title: "About IFEM Education — Nigeria's #1 UK University Consultancy",
  description: "Founded in 2022 by Dr. Millicent, IFEM Education has placed 1,800+ Nigerian students in top UK universities with a 99.6% visa success rate. 100% free admission and visa processing.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About IFEM Education | Nigeria's UK University Experts",
    description: "1,800+ students placed. 99.6% visa success rate. Free admission and visa processing. Founded 2022.",
    url: "/about",
  },
};

export default async function About() {
  const [teamMembers, aboutDetails, siteStats] = await Promise.all([
    getTeamMembers(), getAboutDetails(), getSiteStats(),
  ]);
  const resolved = resolveSiteStats(siteStats);
  const stats = [
    { label: "Students Placed", value: resolved.studentsPlaced, suffix: "+", sub: "Across Africa" },
    { label: "Partner Universities", value: resolved.partnerUniversities, suffix: "+", sub: "Across the UK" },
    { label: "Visa Success Rate", value: resolved.visaSuccessRate, suffix: "%", sub: "Proven Track Record" },
    { label: "Years in Service", value: resolved.yearsInService, suffix: "+", sub: "Est. 2022" },
  ];

  return (
    <div className="w-full">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative bg-cream overflow-hidden">
        {/* Subtle ruled lines — editorial texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(0,107,56,0.04) 80px)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px] pt-16 pb-12 lg:py-24">
            {/* Text */}
            <FadeUp mount>
              <div className="flex items-center gap-3 mb-6">
                <span aria-hidden="true" className="block w-8 h-px bg-forest" />
                <span className="text-forest font-sans text-[11px] font-semibold uppercase tracking-[0.15em]">
                  Est. {aboutDetails?.establishedYear ?? 2022}
                </span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-[3.75rem] font-bold text-charcoal leading-[1.04] mb-6">
                <span className="hero-blur-1">{aboutDetails?.headline ?? "Guiding Students"}</span>
                <span className="hero-blur-2 block text-forest">to UK Universities</span>
              </h1>
              <p className="text-lg text-charcoal/55 leading-relaxed mb-8 max-w-lg">
                {aboutDetails?.tagline ??
                  "Nigeria's most trusted education consultancy for UK university admissions — completely free of charge."}
              </p>
              <div className="w-12 h-[3px] bg-terracotta" />
            </FadeUp>

            {/* Hero image */}
            <FadeUp mount delay={0.15} className="relative h-[420px] md:h-[520px]">
              {aboutDetails?.heroImage?.url ? (
                <div className="relative h-full w-full overflow-hidden shadow-2xl">
                  <Image
                    src={aboutDetails.heroImage.url}
                    alt="IFEM Education team"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={90}
                    className="object-cover"
                    priority
                  />
                  {/* Overlay tint */}
                  <div className="absolute inset-0 bg-charcoal/10" />
                  {/* Forest bottom rule */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-forest" />
                </div>
              ) : (
                /* Elegant placeholder when no image is set in Sanity */
                <div className="relative h-full w-full bg-gradient-to-br from-sage/20 via-cream to-terracotta/8 border border-sage/20 shadow-xl flex items-center justify-center">
                  <div className="text-center px-8">
                    <div className="w-16 h-16 bg-forest/10 flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-7 h-7 text-forest/50" />
                    </div>
                    <p className="text-[11px] text-charcoal/30 uppercase tracking-widest">Team photo</p>
                    <p className="text-xs text-charcoal/20 mt-1">Add via Sanity CMS → About Details → Hero Image</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-forest/30" />
                </div>
              )}
              {/* Decorative offset square */}
              <div
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 w-20 h-20 border border-forest/20 -z-10 hidden lg:block"
              />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────────────────── */}
      <section className="bg-charcoal text-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/[0.07]">
            {stats.map((stat) => (
              <IOReveal key={stat.label}>
                <div className="io-reveal py-10 px-6 md:px-10 text-center group">
                  <p className="font-serif text-4xl md:text-5xl font-bold text-white leading-none mb-1 tabular-nums">
                    <CountUp to={stat.value} duration={2} />{stat.suffix}
                  </p>
                  <p className="text-[11px] font-semibold text-white/40 uppercase tracking-widest mt-2">
                    {stat.label}
                  </p>
                  <p className="text-[10px] text-white/25 mt-0.5">{stat.sub}</p>
                </div>
              </IOReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT MAKES US DIFFERENT ────────────────────────────────── */}
      <section className="py-24 md:py-32 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <IOReveal>
              <div className="io-reveal">
                <SectionEyebrow tone="forest" className="mb-5">Our Difference</SectionEyebrow>
                <h2 className="font-serif font-bold text-charcoal mb-6 leading-tight" style={{ fontSize: "var(--text-h2)" }}>
                  What Makes Us Different?
                </h2>
                <div className="space-y-4 text-charcoal/55 leading-relaxed text-[15px]">
                  <p>We bring our students closer to their dreams and help them achieve them. We have well-trained and experienced counsellors who prioritise your needs and are result-oriented.</p>
                  <p>Our team works with you closely to ensure a seamless process from start to finish. We understand the challenges of making the right decisions around UK studies, which is why we provide personalised guidance at every stage.</p>
                  <p>
                    We make our process completely transparent —{" "}
                    <strong className="text-charcoal font-semibold">UK admission and visa processing comes free of charge with no hidden fees.</strong>
                  </p>
                </div>
              </div>
            </IOReveal>

            {/* Services dark card */}
            <IOReveal>
              <div className="io-reveal bg-forest text-white p-10 lg:p-12" style={{ "--io-delay": "0.1s" } as React.CSSProperties}>
                <h3 className="font-serif text-2xl font-bold text-white mb-8">Our Comprehensive Services</h3>
                <div className="space-y-8">
                  {SERVICE_GROUPS.map((group) => (
                    <div key={group.number}>
                      <h4 className="font-sans font-semibold text-[10px] uppercase tracking-[0.14em] text-white/45 mb-4 pb-2 border-b border-white/10">
                        {group.title}
                      </h4>
                      <ul className="space-y-2.5">
                        {group.items.map((service) => (
                          <li key={service.name} className="flex items-start gap-3 text-white/80">
                            <Check aria-hidden="true" className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                            <span className="text-[13.5px]">{service.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </IOReveal>
          </div>
        </div>
      </section>

      {/* ── MISSION ────────────────────────────────────────────────── */}
      {aboutDetails?.missions && aboutDetails.missions.length > 0 && (
        <section className="py-24 md:py-32 px-4 bg-cream">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              label="Our Mission"
              heading="Why We Exist"
              subtitle="Our core mission drives everything we do in supporting students on their journey to UK education."
            />
            <Stagger className="grid md:grid-cols-3 gap-5">
              {aboutDetails.missions.map((mission, index) => {
                const Icon = (mission.icon && MISSION_ICON_BY_KEY[mission.icon]) || MISSION_ICONS[index % MISSION_ICONS.length];
                return (
                  <StaggerChild
                    key={index}
                    className="bg-white p-8 border border-sage/15 hover:border-forest/25 hover:shadow-md transition-all duration-300 group relative"
                  >
                    <span aria-hidden="true" className="absolute top-6 right-6 font-serif text-4xl font-bold text-sage/12 select-none leading-none hidden md:block">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="mb-5 flex h-11 w-11 items-center justify-center bg-forest/8 group-hover:bg-forest transition-colors duration-300">
                      <Icon aria-hidden="true" className="h-5 w-5 text-forest group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="font-semibold text-charcoal mb-2.5 text-[15px]">{mission.title}</h3>
                    <p className="text-charcoal/50 text-[13px] leading-relaxed">{mission.description}</p>
                    {/* Bottom accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-forest scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </StaggerChild>
                );
              })}
            </Stagger>
          </div>
        </section>
      )}

      {/* ── FOUNDER ────────────────────────────────────────────────── */}
      {aboutDetails?.founder && (
        <section className="py-24 md:py-32 px-4 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Image */}
              <IOReveal>
                <div className="io-reveal relative h-[480px] md:h-[580px] overflow-hidden border border-sage/15 shadow-2xl order-2 md:order-1">
                  {aboutDetails.founder.image?.url ? (
                    <Image
                      src={aboutDetails.founder.image.url}
                      alt={aboutDetails.founder.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={88}
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full bg-sage/10 flex items-center justify-center">
                      <p className="text-[11px] text-charcoal/25 uppercase tracking-widest">Founder photo</p>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-forest" />
                </div>
              </IOReveal>

              {/* Content */}
              <IOReveal>
                <div className="io-reveal order-1 md:order-2" style={{ "--io-delay": "0.12s" } as React.CSSProperties}>
                  <SectionEyebrow tone="forest" className="mb-6">Leadership</SectionEyebrow>
                  <h2 className="font-serif font-bold text-charcoal mb-0.5 leading-tight" style={{ fontSize: "var(--text-h2)" }}>
                    {aboutDetails.founder.name}
                  </h2>
                  <p className="text-forest font-semibold text-[13px] tracking-wide uppercase mb-8">
                    {aboutDetails.founder.title}
                  </p>

                  {aboutDetails.founder.quote && (
                    <figure className="mb-8">
                      <blockquote className="font-serif text-[1.2rem] italic text-charcoal leading-[1.55] py-6 pl-6 border-l-[3px] border-forest bg-cream/60">
                        <p>&ldquo;{aboutDetails.founder.quote}&rdquo;</p>
                      </blockquote>
                    </figure>
                  )}

                  {aboutDetails.founder.bio && (
                    <div className="space-y-3.5 text-charcoal/55 text-[14px] leading-relaxed">
                      <PortableText value={aboutDetails.founder.bio} components={customPortableTextComponents} />
                    </div>
                  )}
                </div>
              </IOReveal>
            </div>
          </div>
        </section>
      )}

      {/* ── TEAM ───────────────────────────────────────────────────── */}
      {teamMembers.length > 0 && (
        <section className="py-24 md:py-32 px-4 bg-cream">
          <div className="mx-auto max-w-7xl">
            <SectionHeading label="Meet the Team" heading="Our People" />
            <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {teamMembers.map((member) => {
                const deptClass = member.department
                  ? (DEPARTMENT_TONE[member.department] ?? "bg-sage/15 text-charcoal border border-sage/30")
                  : "bg-sage/15 text-charcoal border border-sage/30";
                return (
                  <StaggerChild
                    key={member._id}
                    className="bg-white border border-sage/15 hover:border-forest/25 hover:shadow-lg transition-all duration-300 group overflow-hidden"
                  >
                    <div className="relative h-64 overflow-hidden bg-sage/10">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {member.department && (
                        <span className={`absolute top-3 left-3 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] ${deptClass}`}>
                          {member.department}
                        </span>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-forest scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-charcoal text-[14px] mb-0.5">{member.name}</h3>
                      <p className="text-forest font-medium text-[11px] uppercase tracking-wide mb-4">{member.title}</p>
                      <div className="space-y-1.5 text-[11px] text-charcoal/40 border-t border-sage/15 pt-4">
                        {member.email && <p className="truncate">{member.email}</p>}
                        {member.phone && <p>{member.phone}</p>}
                      </div>
                      {(member.email || member.phone) && (
                        <div className="mt-4 flex items-center gap-3">
                          {member.email && (
                            <a
                              href={`mailto:${member.email}`}
                              aria-label={`Email ${member.name}`}
                              className="inline-flex items-center gap-1.5 text-[12px] text-forest font-semibold hover:text-forest-deep transition-colors"
                            >
                              <Mail aria-hidden="true" className="w-3.5 h-3.5" />
                              Email
                            </a>
                          )}
                          {member.phone && (
                            <a
                              href={`https://wa.me/${member.phone.replace(/\D/g, "")}?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20studying%20in%20the%20UK.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`WhatsApp ${member.name}`}
                              className="inline-flex items-center gap-1.5 text-[12px] text-[#25D366] font-semibold hover:text-[#1ebe5d] transition-colors"
                            >
                              <MessageCircle aria-hidden="true" className="w-3.5 h-3.5" />
                              WhatsApp
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </StaggerChild>
                );
              })}
            </Stagger>
          </div>
        </section>
      )}

      {/* ── VALUES ─────────────────────────────────────────────────── */}
      {aboutDetails?.values && aboutDetails.values.length > 0 && (
        <section className="py-24 md:py-32 px-4 bg-white">
          <div className="mx-auto max-w-7xl">
            <SectionHeading label="Our Values" heading="What We Stand For" />
            <Stagger className="grid md:grid-cols-2 gap-4">
              {aboutDetails.values.map((value, index) => (
                <StaggerChild
                  key={index}
                  className="flex gap-7 p-8 bg-cream border border-sage/15 hover:border-forest/20 hover:bg-white transition-all duration-300 group"
                >
                  <div className="shrink-0 pt-0.5">
                    <span aria-hidden="true" className="font-serif text-5xl font-bold text-sage/20 leading-none group-hover:text-forest/15 transition-colors duration-300">
                      {value.number}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[16px] font-semibold text-charcoal mb-2.5">{value.title}</h3>
                    <p className="text-charcoal/50 text-[13.5px] leading-relaxed">{value.description}</p>
                  </div>
                </StaggerChild>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      <CTASection
        variant="forest"
        heading="Ready to Start Your Journey?"
        description="Join thousands of students who have successfully achieved their educational dreams with our guidance and support."
        primaryLink="/contact"
        primaryLabel="Get Started"
        secondaryLink="/guides"
        secondaryLabel="Learn More"
      />
    </div>
  );
}
