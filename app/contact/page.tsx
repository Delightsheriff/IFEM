import type { Metadata } from "next";

export const revalidate = 3600;

import { Suspense } from "react";
import { CTASection } from "@/components/ui/cta-section";
import ContactForm from "@/components/contact-form";
import BranchesSection from "@/components/branches-section";
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
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Contact IFEM Education" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact IFEM Education — Book a Free Consultation",
    description: "Expert UK admission counsellors. Offices across Nigeria. Free, no commitment consultations.",
    images: ["/opengraph-image"],
  },
};

export default async function Contact() {
  const [branches, teamMembers] = await Promise.all([
    getBranches(),
    getTeamMembers(),
  ]);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    name: "IFEM Education",
    url: "https://www.ifemeducation.com",
    email: "contact@ifemeducation.com",
    image: "https://www.ifemeducation.com/opengraph-image",
    priceRange: "Free",
    currenciesAccepted: "NGN",
    paymentAccepted: "Free of charge",
    areaServed: { "@type": "Country", name: "Nigeria" },
    location: branches.map((b) => ({
      "@type": "Place",
      name: b.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: b.address,
        addressLocality: b.city,
        addressCountry: b.country === "Nigeria" ? "NG" : b.country,
      },
      ...(b.phones?.[0]?.number || b.phone
        ? { telephone: b.phones?.[0]?.number ?? b.phone }
        : {}),
    })),
    openingHours: "Mo-Fr 09:00-17:00",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Admissions Enquiry",
      email: "contact@ifemeducation.com",
      availableLanguage: "English",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.ifemeducation.com" },
      { "@type": "ListItem", position: 2, name: "Contact", item: "https://www.ifemeducation.com/contact" },
    ],
  };

  return (
    <div className="w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── Office address strip ─────────────────────────────── */}
      {branches.length > 0 && (
        <section className="border-b border-[#e2e2de] bg-white pt-16">
          <div className="mx-auto max-w-7xl px-4 py-6 md:px-10 md:py-8">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
                <span className="h-px w-6 bg-[#1a5c34]" />
                Visit Our Offices
              </p>
              <a
                href="#branches"
                className="inline-flex items-center gap-1 self-start text-xs font-semibold text-[#1a5c34] hover:text-[#154a2a] transition-colors md:self-auto"
              >
                See maps &amp; directions
                <span aria-hidden="true">→</span>
              </a>
            </div>
            <div
              className={`grid gap-3 ${
                branches.length === 1
                  ? "max-w-md"
                  : branches.length === 2
                    ? "max-w-3xl md:grid-cols-2"
                    : "sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {branches.map((branch, i) => {
                const primaryPhone = branch.phones?.[0]?.number ?? branch.phone ?? null;
                return (
                  <div
                    key={branch._id}
                    className="group flex items-start gap-3 rounded-xl border border-[#e2e2de] bg-[#fafaf7] p-4 transition-all duration-200 hover:border-[#1a5c34]/25 hover:bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
                    data-reveal="fade-up"
                    style={{ "--reveal-delay": `${i * 0.06}s` } as React.CSSProperties}
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e8f3ec] transition-colors duration-200 group-hover:bg-[#1a5c34]">
                      <MapPin className="h-3.5 w-3.5 text-[#1a5c34] transition-colors duration-200 group-hover:text-white" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#7a7a7a]">
                          {branch.name}
                        </p>
                        {branch.type === "hq" && (
                          <span className="rounded-full border border-[#c9a465]/40 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest text-[#c9a465] leading-none">
                            HQ
                          </span>
                        )}
                      </div>
                      {branch.address && (
                        <p className="mb-0.5 text-sm font-medium leading-snug text-[#111111]">
                          {branch.address}
                        </p>
                      )}
                      <p className="text-xs text-[#7a7a7a]">{branch.city}, {branch.country}</p>
                      {primaryPhone && (
                        <a
                          href={`tel:${primaryPhone.replace(/\s/g, "")}`}
                          className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#1a5c34] hover:text-[#154a2a] transition-colors"
                        >
                          <Phone className="h-3 w-3" aria-hidden="true" />
                          {primaryPhone}
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Hero + Form ──────────────────────────────────────────── */}
      <section className="border-b border-[#e2e2de] bg-[#fafaf7]">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-10 md:py-24">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">

            {/* Heading + reassurance */}
            <div data-reveal="fade-up">
              <p className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
                <span className="h-px w-6 bg-[#1a5c34]" />
                Get In Touch
              </p>
              <h1
                className="mb-5 font-sans font-extrabold leading-[1.04] tracking-[-0.025em] text-[#111111]"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
              >
                <span className="hero-blur-1 block">Let&apos;s Start</span>
                <span className="hero-blur-2 block text-[#1a5c34]">Your Journey</span>
              </h1>
              <p className="mb-8 max-w-lg text-[1rem] leading-[1.75] text-[#5a5a5a] md:text-[1.05rem]">
                Have questions about our programmes? Our team of expert counsellors is here to
                help you find the perfect UK university — at no cost to you.
              </p>

              <ul className="space-y-4 text-sm">
                {[
                  {
                    icon: Clock,
                    strong: "One-business-day response.",
                    rest: "Every enquiry is read by a counsellor, not a bot.",
                  },
                  {
                    icon: ShieldCheck,
                    strong: "Free and confidential.",
                    rest: "We never charge students for admission or visa processing.",
                  },
                  {
                    icon: MapPin,
                    isLink: true,
                  },
                ].map((item, i) =>
                  item.isLink ? (
                    <li key={i} className="flex items-start gap-3">
                      <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-[#1a5c34]" aria-hidden="true" />
                      <span className="text-[#5a5a5a]">
                        Prefer to visit?{" "}
                        <a
                          href="#branches"
                          className="font-semibold text-[#1a5c34] underline underline-offset-2 hover:text-[#154a2a]"
                        >
                          See full directions &amp; opening hours
                        </a>
                        .
                      </span>
                    </li>
                  ) : (
                    <li key={i} className="flex items-start gap-3">
                      <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-[#1a5c34]" aria-hidden="true" />
                      <span className="text-[#5a5a5a]">
                        <strong className="font-semibold text-[#111111]">{item.strong}</strong>{" "}
                        {item.rest}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Form */}
            <div
              data-reveal="fade-up"
              style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
            >
              <Suspense fallback={<div className="min-h-[640px]" />}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────────── */}
      {teamMembers.length > 0 && (
        <section className="border-t border-[#e2e2de] bg-white px-4 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12" data-reveal="fade-up">
              <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
                <span className="h-px w-6 bg-[#1a5c34]" />
                Our People
              </p>
              <h2
                className="mb-3 font-sans font-extrabold leading-[1.08] tracking-tight text-[#111111]"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
              >
                Speak With Our Team
              </h2>
              <p className="max-w-xl text-[1rem] leading-[1.75] text-[#7a7a7a]">
                Direct contact with our experts for specific enquiries.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {teamMembers.map((member, i) => {
                return (
                  <div
                    key={member._id}
                    className="group flex flex-col overflow-hidden rounded-xl border border-[#e2e2de] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1a5c34]/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
                    data-reveal="fade-up"
                    style={{ "--reveal-delay": `${i * 0.05}s` } as React.CSSProperties}
                  >
                    <div className="relative h-64 overflow-hidden bg-[#e8f3ec]">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <span className="font-sans text-4xl font-extrabold text-[#1a5c34]/30">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#1a5c34] transition-transform duration-300 group-hover:scale-x-100" />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="font-sans text-[14px] font-semibold leading-tight text-[#111111] mb-0.5">
                        {member.name}
                      </p>
                      <p className="mb-4 text-[11px] font-semibold uppercase tracking-wide text-[#1a5c34]">
                        {member.title}
                      </p>
                      <div className="mt-auto flex flex-col gap-2 border-t border-[#e2e2de] pt-4">
                        <a
                          href={`mailto:${member.email}`}
                          className="flex min-w-0 items-center gap-2 text-xs text-[#7a7a7a] transition-colors hover:text-[#1a5c34]"
                        >
                          <Mail className="h-3.5 w-3.5 shrink-0 text-[#1a5c34]/50" aria-hidden="true" />
                          <span className="truncate">{member.email}</span>
                        </a>
                        {member.phone && (
                          <a
                            href={`tel:${member.phone.replace(/\s/g, "")}`}
                            className="flex min-w-0 items-center gap-2 text-xs text-[#7a7a7a] transition-colors hover:text-[#1a5c34]"
                          >
                            <Phone className="h-3.5 w-3.5 shrink-0 text-[#1a5c34]/50" aria-hidden="true" />
                            <span>{member.phone}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Branches ─────────────────────────────────────────────── */}
      <BranchesSection branches={branches} />

      {/* ── CTA ──────────────────────────────────────────────────── */}
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
