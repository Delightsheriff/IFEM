import type { Metadata } from "next";
import { CTASection } from "@/components/ui/cta-section";
import ContactForm from "@/components/contact-form";
import BranchesSection from "@/components/branches-section";
import { getBranches, getTeamMembers } from "@/sanity/sanity";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="bg-cream border-b border-sage/20 pt-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-16 md:py-24">

          {/* Heading */}
          <div className="max-w-2xl mb-14">
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-8 h-px bg-forest" />
              <p className="text-forest font-sans text-xs font-semibold uppercase tracking-widest">
                Get In Touch
              </p>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-charcoal mb-6 leading-tight">
              Let&apos;s Start Your Journey
            </h1>
            <p className="text-gray text-lg leading-relaxed">
              Have questions about our programmes? Our team of expert
              counsellors is here to help you find the perfect educational
              opportunity — at no cost to you.
            </p>
          </div>

          {/* Office Addresses — all branches at a glance */}
          {branches.length > 0 && (
            <div className={`grid gap-4 ${branches.length === 1 ? "md:grid-cols-1 max-w-sm" : branches.length === 2 ? "md:grid-cols-2 max-w-2xl" : "md:grid-cols-2 lg:grid-cols-3"}`}>
              {branches.map((branch) => (
                <div
                  key={branch._id}
                  className="group bg-white border border-sage/20 p-6 hover:border-forest/30 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 bg-forest/8 flex items-center justify-center group-hover:bg-forest transition-colors shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-forest group-hover:text-white transition-colors" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-2">
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
                        <p className="text-charcoal text-sm font-medium leading-snug mb-0.5">
                          {branch.address}
                        </p>
                      )}
                      <p className="text-gray text-xs mb-3">
                        {branch.city}, {branch.country}
                      </p>
                      {(branch.phones?.length || branch.phone) && (
                        <div className="space-y-1 mb-3">
                          {(branch.phones?.length
                            ? branch.phones
                            : [{ label: "Main", number: branch.phone! }]
                          ).map((p, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <span className="text-[9px] uppercase tracking-widest text-gray/50 font-semibold shrink-0 w-14">
                                {p.label}
                              </span>
                              <a
                                href={`tel:${p.number.replace(/\s/g, "")}`}
                                className="text-xs text-charcoal font-medium hover:text-forest transition-colors"
                              >
                                {p.number}
                              </a>
                            </div>
                          ))}
                        </div>
                      )}
                      <Link
                        href="#branches"
                        className="text-forest text-[11px] font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:opacity-100"
                      >
                        View full details <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────── */}
      {teamMembers.length > 0 && (
        <section className="py-24 md:py-32 px-4 md:px-8 bg-white border-t border-sage/10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-8 h-px bg-forest" />
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
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {teamMembers.map((member) => {
                const isLeadership = member.department === "Leadership";
                return (
                  <div
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
                          <Mail className={`shrink-0 text-forest/40 ${isLeadership ? "w-4 h-4" : "w-3.5 h-3.5"}`} />
                          <span className="break-all group-hover/link:underline">{member.email}</span>
                        </a>
                        {member.phone && (
                          <a
                            href={`tel:${member.phone.replace(/\s/g, "")}`}
                            className="text-charcoal/60 hover:text-forest transition-colors flex items-center gap-2 group/link min-w-0"
                          >
                            <Phone className={`shrink-0 text-forest/40 ${isLeadership ? "w-4 h-4" : "w-3.5 h-3.5"}`} />
                            <span className="group-hover/link:underline">{member.phone}</span>
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

      {/* ── Contact Form ─────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-4 md:px-8 bg-cream border-t border-sage/10">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-8 h-px bg-forest" />
              <p className="text-forest font-sans text-xs font-semibold uppercase tracking-widest">
                Send a Message
              </p>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal leading-tight">
              Get In Touch
            </h2>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* ── Branches ────────────────────────────────────────── */}
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
