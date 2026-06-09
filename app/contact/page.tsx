import type { Metadata } from "next";

export const revalidate = 3600;

import { Suspense } from "react";
import { CTASection } from "@/components/ui/cta-section";
import ContactForm from "@/components/contact-form";
import BranchesSection from "@/components/branches-section";
import { FadeUp, Stagger, StaggerChild } from "@/components/ui/animate";
import { getBranches, getTeamMembers } from "@/sanity/sanity";
import { Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Contact Us — Book a Free UK University Consultation",
  description:
    "Speak with an IFEM Education counsellor today. Book a free consultation, visit our offices in Nigeria, or message us to start your UK university application journey.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact IFEM Education | Free UK University Consultation",
    description:
      "Book a free consultation with our expert UK admission counsellors. Offices across Nigeria. No fees, no commitments.",
    url: "/contact",
  },
};

export default async function Contact() {
  const [branches, teamMembers] = await Promise.all([
    getBranches(),
    getTeamMembers(),
  ]);

  return (
    <div className="w-full">
      {/* ── Office address strip ───────────────────────────────
          Glanceable: visible immediately so visitors know
          where we are without scrolling. Each card links to
          the canonical BranchesSection below for the full
          map / hours / directions. */}
      {branches.length > 0 && (
        <section className="bg-white border-b border-sage/15 pt-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-6 md:py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-widest text-forest">
                Visit Our Offices
              </p>
              <a
                href="#branches"
                className="text-xs font-semibold text-forest hover:text-forest-deep inline-flex items-center gap-1 focus-ring rounded-sm self-start md:self-auto"
              >
                See maps &amp; directions
                <span aria-hidden="true">→</span>
              </a>
            </div>
            <Stagger
              className={`grid gap-3 ${
                branches.length === 1
                  ? "max-w-md"
                  : branches.length === 2
                    ? "md:grid-cols-2 max-w-3xl"
                    : "sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {branches.map((branch) => {
                const primaryPhone =
                  branch.phones?.[0]?.number ?? branch.phone ?? null;
                return (
                  <StaggerChild
                    key={branch._id}
                    className="group flex items-start gap-3 bg-cream/60 border border-sage/20 p-4 hover:border-forest/30 transition-colors"
                  >
                    <div className="w-8 h-8 bg-forest/8 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-forest transition-colors">
                      <MapPin
                        className="w-3.5 h-3.5 text-forest group-hover:text-white transition-colors"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-[10px] font-semibold text-gray uppercase tracking-widest">
                          {branch.name}
                        </p>
                        {branch.type === "hq" && (
                          <span className="text-[8px] uppercase tracking-widest text-terracotta font-bold border border-terracotta/30 px-1.5 py-0.5 leading-none">
                            HQ
                          </span>
                        )}
                      </div>
                      {branch.address && (
                        <p className="text-charcoal text-sm font-medium leading-snug mb-0.5 wrap-break-words">
                          {branch.address}
                        </p>
                      )}
                      <p className="text-gray text-xs">
                        {branch.city}, {branch.country}
                      </p>
                      {primaryPhone && (
                        <a
                          href={`tel:${primaryPhone.replace(/\s/g, "")}`}
                          className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-forest hover:text-forest-deep focus-ring rounded-sm"
                        >
                          <Phone className="w-3 h-3" aria-hidden="true" />
                          {primaryPhone}
                        </a>
                      )}
                    </div>
                  </StaggerChild>
                );
              })}
            </Stagger>
          </div>
        </section>
      )}

      {/* ── Hero + Form ────────────────────────────────────────
          Form is reachable within one scroll on mobile and
          alongside the heading copy on large screens. */}
      <section className="bg-cream border-b border-sage/20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">
            {/* Heading + reassurance */}
            <FadeUp mount>
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-8 h-px bg-forest" aria-hidden="true" />
                <p className="text-forest font-sans text-xs font-semibold uppercase tracking-widest">
                  Get In Touch
                </p>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-5 leading-tight">
                <span className="hero-blur-1">Let&apos;s Start Your Journey</span>
              </h1>
              <p className="text-gray text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                Have questions about our programmes? Our team of expert
                counsellors is here to help you find the perfect UK university
                — at no cost to you.
              </p>

              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-forest mt-0.5 shrink-0" aria-hidden="true" />
                  <span className="text-charcoal/80">
                    <strong className="text-charcoal">One-business-day response.</strong>{" "}
                    Every enquiry is read by a counsellor, not a bot.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-forest mt-0.5 shrink-0" aria-hidden="true" />
                  <span className="text-charcoal/80">
                    <strong className="text-charcoal">Free and confidential.</strong>{" "}
                    We never charge students for admission or visa processing.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-forest mt-0.5 shrink-0" aria-hidden="true" />
                  <span className="text-charcoal/80">
                    Prefer to visit?{" "}
                    <a
                      href="#branches"
                      className="font-semibold text-forest underline underline-offset-2 hover:text-forest-deep focus-ring rounded-sm"
                    >
                      See full directions &amp; opening hours
                    </a>
                    .
                  </span>
                </li>
              </ul>
            </FadeUp>

            {/* Form — above the fold on lg+, immediately after hero copy on mobile */}
            <FadeUp delay={0.08}>
              <Suspense fallback={<div className="min-h-[640px]" />}>
                <ContactForm />
              </Suspense>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────── */}
      {teamMembers.length > 0 && (
        <section className="py-20 md:py-28 px-4 md:px-8 bg-white border-t border-sage/10">
          <div className="mx-auto max-w-7xl">
            <FadeUp className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-8 h-px bg-forest" aria-hidden="true" />
                <p className="text-forest font-sans text-xs font-semibold uppercase tracking-widest">
                  Our People
                </p>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-3 leading-tight">
                Speak With Our Team
              </h2>
              <p className="text-gray text-lg max-w-xl">
                Direct contact with our experts for specific enquiries.
              </p>
            </FadeUp>

            <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {teamMembers.map((member) => {
                const isLeadership = member.department === "Leadership";
                return (
                  <StaggerChild
                    key={member._id}
                    className={`group flex flex-col border hover:shadow-lg transition-all duration-200 ${
                      isLeadership
                        ? "border-forest/25 bg-white"
                        : "border-sage/20 bg-cream"
                    }`}
                  >
                    {/* Photo */}
                    <div className={`relative overflow-hidden bg-cream ${isLeadership ? "h-64" : "h-52"}`}>
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-contain object-center"
                        />
                      ) : (
                        <div className="w-full h-full bg-sage/20 flex items-center justify-center">
                          <span className="font-serif text-4xl font-bold text-forest/30">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-5 flex flex-col flex-1">
                      <p className={`font-serif font-bold text-charcoal leading-tight mb-1 ${isLeadership ? "text-xl" : "text-base"}`}>
                        {member.name}
                      </p>
                      <p className="text-[11px] text-forest font-semibold uppercase tracking-wide mb-4">
                        {member.title}
                      </p>
                      <div className={`flex flex-col mt-auto pt-4 border-t border-sage/20 gap-2 ${isLeadership ? "text-sm" : "text-xs"}`}>
                        <a
                          href={`mailto:${member.email}`}
                          className="text-charcoal/60 hover:text-forest transition-colors flex items-center gap-2 group/link min-w-0"
                        >
                          <Mail className={`shrink-0 text-forest/40 ${isLeadership ? "w-4 h-4" : "w-3.5 h-3.5"}`} aria-hidden="true" />
                          <span className="break-all group-hover/link:underline">{member.email}</span>
                        </a>
                        {member.phone && (
                          <a
                            href={`tel:${member.phone.replace(/\s/g, "")}`}
                            className="text-charcoal/60 hover:text-forest transition-colors flex items-center gap-2 group/link min-w-0"
                          >
                            <Phone className={`shrink-0 text-forest/40 ${isLeadership ? "w-4 h-4" : "w-3.5 h-3.5"}`} aria-hidden="true" />
                            <span className="group-hover/link:underline">{member.phone}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </StaggerChild>
                );
              })}
            </Stagger>
          </div>
        </section>
      )}

      {/* ── Branches (canonical — single source of truth) ────── */}
      <BranchesSection branches={branches} />

      {/* ── CTA ─────────────────────────────────────────────── */}
      <CTASection
        variant="forest"
        heading="Not Sure Where to Start?"
        description="Check out our FAQ section or schedule a free consultation with one of our education advisors."
        primaryLink="/faq"
        primaryLabel="View FAQ"
        secondaryLink="/guides"
        secondaryLabel="Read Our Guides"
      />
    </div>
  );
}
