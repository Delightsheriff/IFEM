import type { Metadata } from "next";
export const revalidate = 3600;

import { customPortableTextComponents } from "@/components/portable-text-components";
import { CTASection } from "@/components/ui/cta-section";
import CountUp from "@/components/animations/CountUp";
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
    { label: "Students Placed",     value: resolved.studentsPlaced,    suffix: "+", sub: "Across Africa" },
    { label: "Partner Universities", value: resolved.partnerUniversities, suffix: "+", sub: "Across the UK" },
    { label: "Visa Success Rate",    value: resolved.visaSuccessRate,   suffix: "%", sub: "Proven Track Record" },
    { label: "Years in Service",     value: resolved.yearsInService,    suffix: "+", sub: "Est. 2022" },
  ];

  return (
    <div className="w-full">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative bg-[#fafaf7] overflow-hidden lg:grid lg:min-h-[72vh] lg:grid-cols-[1fr_42%]">

        {/* Left — text */}
        <div className="relative z-10 flex flex-col justify-center px-6 py-20 md:px-12 lg:px-16 lg:py-24 xl:px-20">
          <div className="mb-7 inline-flex w-fit items-center gap-2" data-reveal="fade-in">
            <span className="h-px w-8 bg-[#1a5c34]" aria-hidden="true" />
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1a5c34]">
              Est. {aboutDetails?.establishedYear ?? 2022}
            </p>
          </div>
          <h1
            className="mb-6 font-sans font-extrabold leading-[1.04] tracking-[-0.025em] text-[#111111]"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
            data-reveal="fade-up"
          >
            <span className="hero-blur-1 block">{aboutDetails?.headline ?? "Guiding Students"}</span>
            <span className="hero-blur-2 block text-[#1a5c34]">to UK Universities</span>
          </h1>
          <p
            className="mb-8 max-w-[30rem] text-[1.05rem] leading-[1.75] text-[#5a5a5a]"
            data-reveal="fade-up"
            style={{ "--reveal-delay": "0.15s" } as React.CSSProperties}
          >
            {aboutDetails?.tagline ??
              "Nigeria's most trusted education consultancy for UK university admissions — completely free of charge."}
          </p>
          <div
            className="h-[3px] w-10 rounded-full bg-[#c9a465]"
            data-reveal="fade-in"
            style={{ "--reveal-delay": "0.25s" } as React.CSSProperties}
          />
        </div>

        {/* Right — hero image */}
        <div className="relative hidden lg:block overflow-hidden">
          {aboutDetails?.heroImage?.url ? (
            <>
              <Image
                src={aboutDetails.heroImage.url}
                alt="IFEM Education team"
                fill
                sizes="42vw"
                quality={90}
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #fafaf7 0%, rgba(250,250,247,0.2) 14%, transparent 30%)" }} />
              <div className="absolute inset-x-0 bottom-0 h-1 bg-[#1a5c34]" />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#e8f3ec]">
              <div className="text-center px-8">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#1a5c34]/10">
                  <Sparkles className="h-7 w-7 text-[#1a5c34]/50" />
                </div>
                <p className="text-[11px] uppercase tracking-widest text-[#7a7a7a]">Team photo</p>
                <p className="mt-1 text-xs text-[#7a7a7a]/60">Add via Sanity CMS</p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile image strip */}
        {aboutDetails?.heroImage?.url && (
          <div className="relative h-56 w-full lg:hidden">
            <Image
              src={aboutDetails.heroImage.url}
              alt="IFEM Education team"
              fill
              sizes="100vw"
              quality={85}
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #fafaf7 0%, transparent 35%, transparent 65%, #fafaf7 100%)" }} />
          </div>
        )}
      </section>

      {/* ── STATS BANNER ───────────────────────────────────────────── */}
      <section className="bg-[#0d3320]">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <dl className="grid grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
            {stats.map(({ label, value, suffix, sub }, i) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center px-6 py-10 md:py-12"
                data-reveal="fade-up"
                style={{ "--reveal-delay": `${i * 0.08}s` } as React.CSSProperties}
              >
                <dt className="mb-1 font-sans text-[2.8rem] font-extrabold leading-none tracking-tight text-white md:text-5xl">
                  <CountUp to={value} duration={2} />{suffix}
                </dt>
                <dd className="text-center text-[10px] font-semibold uppercase tracking-widest text-white/40">
                  {label}
                </dd>
                <dd className="mt-0.5 text-center text-[10px] text-white/25">{sub}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── WHAT MAKES US DIFFERENT ────────────────────────────────── */}
      <section className="bg-white px-6 py-24 md:py-32 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">

            {/* Left — text */}
            <div data-reveal="fade-up">
              <p className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
                <span className="h-px w-6 bg-[#1a5c34]" />
                Our Difference
              </p>
              <h2
                className="mb-6 font-sans font-extrabold leading-[1.08] tracking-tight text-[#111111]"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
              >
                What Makes Us Different?
              </h2>
              <div className="space-y-4 text-[15px] leading-relaxed text-[#5a5a5a]">
                <p>We bring our students closer to their dreams and help them achieve them. We have well-trained and experienced counsellors who prioritise your needs and are result-oriented.</p>
                <p>Our team works with you closely to ensure a seamless process from start to finish. We understand the challenges of making the right decisions around UK studies, which is why we provide personalised guidance at every stage.</p>
                <p>
                  We make our process completely transparent —{" "}
                  <strong className="font-semibold text-[#111111]">UK admission and visa processing comes free of charge with no hidden fees.</strong>
                </p>
              </div>
            </div>

            {/* Right — services dark card */}
            <div
              className="rounded-2xl bg-[#0d3320] p-10 lg:p-12 text-white"
              data-reveal="fade-up"
              style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
            >
              <h3 className="mb-8 font-sans text-2xl font-extrabold text-white">Our Comprehensive Services</h3>
              <div className="space-y-8">
                {SERVICE_GROUPS.map((group) => (
                  <div key={group.number}>
                    <h4 className="mb-4 border-b border-white/10 pb-2 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">
                      {group.title}
                    </h4>
                    <ul className="space-y-2.5">
                      {group.items.map((service) => (
                        <li key={service.name} className="flex items-start gap-3 text-white/75">
                          <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#c9a465]" />
                          <span className="text-[13.5px]">{service.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION ────────────────────────────────────────────────── */}
      {aboutDetails?.missions && aboutDetails.missions.length > 0 && (
        <section className="bg-[#f3f3ef] px-6 py-24 md:py-32 md:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 text-center" data-reveal="fade-up">
              <p className="mb-4 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
                <span className="h-px w-6 bg-[#1a5c34]" />
                Our Mission
                <span className="h-px w-6 bg-[#1a5c34]" />
              </p>
              <h2
                className="font-sans font-extrabold leading-[1.08] tracking-tight text-[#111111]"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
              >
                Why We Exist
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[1rem] leading-[1.75] text-[#7a7a7a]">
                Our core mission drives everything we do in supporting students on their journey to UK education.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {aboutDetails.missions.map((mission, index) => {
                const Icon = (mission.icon && MISSION_ICON_BY_KEY[mission.icon]) || MISSION_ICONS[index % MISSION_ICONS.length];
                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-xl border border-[#e2e2de] bg-white p-8 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1a5c34]/25 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
                    data-reveal="fade-up"
                    style={{ "--reveal-delay": `${index * 0.08}s` } as React.CSSProperties}
                  >
                    <span aria-hidden="true" className="absolute right-6 top-6 font-sans text-4xl font-extrabold leading-none text-[#f3f3ef] transition-colors duration-200 group-hover:text-[#e8f3ec] select-none">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[#e8f3ec] transition-colors duration-200 group-hover:bg-[#1a5c34]">
                      <Icon aria-hidden="true" className="h-5 w-5 text-[#1a5c34] transition-colors duration-200 group-hover:text-white" />
                    </div>
                    <h3 className="mb-2.5 font-sans text-[15px] font-semibold text-[#111111]">{mission.title}</h3>
                    <p className="text-[13px] leading-relaxed text-[#7a7a7a]">{mission.description}</p>
                    <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#1a5c34] transition-transform duration-300 group-hover:scale-x-100" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── FOUNDER ────────────────────────────────────────────────── */}
      {aboutDetails?.founder && (
        <section className="bg-white px-6 py-24 md:py-32 md:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-16 md:grid-cols-2 md:items-center">

              {/* Image */}
              <div
                className="relative order-2 h-[480px] overflow-hidden rounded-2xl border border-[#e2e2de] shadow-[0_20px_60px_rgba(0,0,0,0.1)] md:order-1 md:h-[560px]"
                data-reveal="fade-up"
              >
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
                  <div className="flex h-full w-full items-center justify-center bg-[#e8f3ec]">
                    <p className="text-[11px] uppercase tracking-widest text-[#7a7a7a]">Founder photo</p>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-[#1a5c34]" />
              </div>

              {/* Content */}
              <div
                className="order-1 md:order-2"
                data-reveal="fade-up"
                style={{ "--reveal-delay": "0.12s" } as React.CSSProperties}
              >
                <p className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
                  <span className="h-px w-6 bg-[#1a5c34]" />
                  Leadership
                </p>
                <h2
                  className="mb-1 font-sans font-extrabold leading-[1.08] tracking-tight text-[#111111]"
                  style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
                >
                  {aboutDetails.founder.name}
                </h2>
                <p className="mb-8 text-[13px] font-semibold uppercase tracking-wide text-[#1a5c34]">
                  {aboutDetails.founder.title}
                </p>

                {aboutDetails.founder.quote && (
                  <figure className="mb-8">
                    <blockquote className="border-l-[3px] border-[#c9a465] bg-[#fafaf7] py-6 pl-6 pr-4 font-sans text-[1.1rem] italic leading-[1.6] text-[#3d3d3d]">
                      <p>&ldquo;{aboutDetails.founder.quote}&rdquo;</p>
                    </blockquote>
                  </figure>
                )}

                {aboutDetails.founder.bio && (
                  <div className="space-y-3.5 text-[14px] leading-relaxed text-[#5a5a5a]">
                    <PortableText value={aboutDetails.founder.bio} components={customPortableTextComponents} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── TEAM ───────────────────────────────────────────────────── */}
      {teamMembers.length > 0 && (
        <section className="bg-[#f3f3ef] px-6 py-24 md:py-32 md:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14" data-reveal="fade-up">
              <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
                <span className="h-px w-6 bg-[#1a5c34]" />
                Meet the Team
              </p>
              <h2
                className="font-sans font-extrabold leading-[1.08] tracking-tight text-[#111111]"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
              >
                Our People
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {teamMembers.map((member, i) => (
                <div
                  key={member._id}
                  className="group overflow-hidden rounded-xl border border-[#e2e2de] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1a5c34]/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
                  data-reveal="fade-up"
                  style={{ "--reveal-delay": `${i * 0.05}s` } as React.CSSProperties}
                >
                  <div className="relative h-64 overflow-hidden bg-[#e8f3ec]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#1a5c34] transition-transform duration-300 group-hover:scale-x-100" />
                  </div>
                  <div className="p-5">
                    <h3 className="mb-0.5 font-sans text-[14px] font-semibold text-[#111111]">{member.name}</h3>
                    <p className="mb-4 text-[11px] font-semibold uppercase tracking-wide text-[#1a5c34]">{member.title}</p>
                    <div className="space-y-1.5 border-t border-[#e2e2de] pt-4 text-[11px] text-[#7a7a7a]">
                      {member.email && <p className="truncate">{member.email}</p>}
                      {member.phone && <p>{member.phone}</p>}
                    </div>
                    {(member.email || member.phone) && (
                      <div className="mt-4 flex items-center gap-3">
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            aria-label={`Email ${member.name}`}
                            className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#1a5c34] hover:text-[#154a2a] transition-colors"
                          >
                            <Mail aria-hidden="true" className="h-3.5 w-3.5" />
                            Email
                          </a>
                        )}
                        {member.phone && (
                          <a
                            href={`https://wa.me/${member.phone.replace(/\D/g, "")}?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20studying%20in%20the%20UK.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`WhatsApp ${member.name}`}
                            className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#25D366] hover:text-[#1ebe5d] transition-colors"
                          >
                            <MessageCircle aria-hidden="true" className="h-3.5 w-3.5" />
                            WhatsApp
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── VALUES ─────────────────────────────────────────────────── */}
      {aboutDetails?.values && aboutDetails.values.length > 0 && (
        <section className="bg-white px-6 py-24 md:py-32 md:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 text-center" data-reveal="fade-up">
              <p className="mb-4 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
                <span className="h-px w-6 bg-[#1a5c34]" />
                Our Values
                <span className="h-px w-6 bg-[#1a5c34]" />
              </p>
              <h2
                className="font-sans font-extrabold leading-[1.08] tracking-tight text-[#111111]"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
              >
                What We Stand For
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {aboutDetails.values.map((value, index) => (
                <div
                  key={index}
                  className="group flex gap-7 rounded-xl border border-[#e2e2de] bg-[#fafaf7] p-8 transition-all duration-200 hover:border-[#1a5c34]/20 hover:bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                  data-reveal="fade-up"
                  style={{ "--reveal-delay": `${index * 0.06}s` } as React.CSSProperties}
                >
                  <div className="shrink-0 pt-0.5">
                    <span aria-hidden="true" className="font-sans text-5xl font-extrabold leading-none text-[#e2e2de] transition-colors duration-200 group-hover:text-[#e8f3ec]">
                      {value.number}
                    </span>
                  </div>
                  <div>
                    <h3 className="mb-2.5 font-sans text-[16px] font-semibold text-[#111111]">{value.title}</h3>
                    <p className="text-[13.5px] leading-relaxed text-[#7a7a7a]">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
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
