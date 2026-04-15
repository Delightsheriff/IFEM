import type { Metadata } from "next";
import { CTASection } from "@/components/ui/cta-section";
import ContactForm from "@/components/contact-form";
import BranchesSection from "@/components/branches-section";
import { getBranches, getTeamMembers } from "@/sanity/sanity";
import { Mail, MapPin, Phone } from "lucide-react";
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

  const hqBranch = branches.find((b) => b.type === "hq");

  return (
    <div className="w-full">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="bg-cream border-b border-sage/20 pt-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-2xl">
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

          {/* Quick Contact Cards */}
          {hqBranch && (
            <div className="grid md:grid-cols-3 gap-4 mt-12">
              {/* Email */}
              <a
                href={`mailto:${hqBranch.email}`}
                className="group bg-white border border-sage/20 p-6 hover:border-forest/30 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-forest/8 flex items-center justify-center group-hover:bg-forest transition-colors shrink-0">
                    <Mail className="w-5 h-5 text-forest group-hover:text-white transition-colors" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold text-gray uppercase tracking-widest mb-2">
                      Email Us
                    </p>
                    <p className="font-semibold text-charcoal text-sm group-hover:text-forest transition-colors break-all">
                      {hqBranch.email}
                    </p>
                  </div>
                </div>
              </a>

              {/* Phone numbers — all of them */}
              {(() => {
                const phones = hqBranch.phones?.length
                  ? hqBranch.phones
                  : hqBranch.phone
                  ? [{ label: "Main", number: hqBranch.phone }]
                  : [];
                return phones.length > 0 ? (
                  <div className="bg-white border border-sage/20 p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-terracotta/8 flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-terracotta" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold text-gray uppercase tracking-widest mb-2">
                          Call Us
                        </p>
                        <div className="space-y-1.5">
                          {phones.map((p, i) => (
                            <div key={i} className="flex items-baseline gap-2">
                              <span className="text-[9px] uppercase tracking-widest text-gray/50 font-semibold shrink-0 w-16">
                                {p.label}
                              </span>
                              <a
                                href={`tel:${p.number.replace(/\s/g, "")}`}
                                className="font-semibold text-charcoal text-sm hover:text-terracotta transition-colors truncate"
                              >
                                {p.number}
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null;
              })()}

              {/* Visit */}
              <div className="bg-white border border-sage/20 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-sage/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-forest" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold text-gray uppercase tracking-widest mb-2">
                      Visit Us
                    </p>
                    <p className="font-semibold text-charcoal text-sm">
                      {hqBranch.address && (
                        <span className="block text-gray font-normal text-xs mb-0.5">
                          {hqBranch.address}
                        </span>
                      )}
                      {hqBranch.city}, {hqBranch.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Contact Form & Team ──────────────────────────────── */}
      <section className="py-24 px-4 md:px-8 bg-white">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-16">
          {/* Contact Form */}
          <ContactForm />

          {/* Team Contacts */}
          <div>
            <h2 className="font-serif text-3xl font-bold text-charcoal mb-1">
              Speak With Our Team
            </h2>
            <p className="text-gray text-sm mb-8">
              Direct contact with our experts for specific enquiries.
            </p>

            <div className="space-y-3">
              {teamMembers.map((member) => {
                const isLeadership = member.department === "Leadership";
                return isLeadership ? (
                  /* Leadership — prominent card */
                  <div
                    key={member._id}
                    className="bg-white border border-forest/20 border-l-4 border-l-forest p-6 hover:shadow-md transition-all"
                  >
                    <div className="flex gap-5">
                      {member.image && (
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={72}
                          height={72}
                          className="w-18 h-18 object-cover shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="font-serif text-lg font-bold text-charcoal leading-tight">
                            {member.name}
                          </p>
                          {member.department && (
                            <span className="text-[9px] uppercase tracking-widest text-forest/70 font-semibold border border-forest/20 px-2 py-0.5 shrink-0">
                              {member.department}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-forest font-semibold mb-4 uppercase tracking-wide">
                          {member.title}
                        </p>
                        <div className="flex flex-col gap-2 text-sm">
                          <a
                            href={`mailto:${member.email}`}
                            className="text-charcoal/70 hover:text-forest transition-colors flex items-center gap-2 group min-w-0 focus:outline-none"
                          >
                            <Mail className="w-4 h-4 shrink-0 text-forest/50" />
                            <span className="break-all group-hover:underline font-medium">
                              {member.email}
                            </span>
                          </a>
                          {member.phone && (
                            <a
                              href={`tel:${member.phone.replace(/\s/g, "")}`}
                              className="text-charcoal/70 hover:text-forest transition-colors flex items-center gap-2 group min-w-0 focus:outline-none"
                            >
                              <Phone className="w-4 h-4 shrink-0 text-forest/50" />
                              <span className="truncate group-hover:underline font-medium">
                                {member.phone}
                              </span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Regular team member */
                  <div
                    key={member._id}
                    className="bg-cream border border-sage/20 p-5 hover:border-forest/30 hover:shadow-sm transition-all"
                  >
                    <div className="flex gap-4">
                      {member.image && (
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={56}
                          height={56}
                          className="w-14 h-14 object-cover shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-charcoal text-sm truncate">
                          {member.name}
                        </p>
                        <p className="text-xs text-forest font-medium mb-3 truncate uppercase tracking-wide">
                          {member.title}
                        </p>
                        <div className="flex flex-col gap-1.5 text-xs">
                          <a
                            href={`mailto:${member.email}`}
                            className="text-gray hover:text-forest transition-colors flex items-center gap-2 group min-w-0 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 rounded"
                          >
                            <Mail className="w-3.5 h-3.5 shrink-0" />
                            <span className="break-all group-hover:underline">
                              {member.email}
                            </span>
                          </a>
                          {member.phone && (
                            <a
                              href={`tel:${member.phone.replace(/\s/g, "")}`}
                              className="text-gray hover:text-forest transition-colors flex items-center gap-2 group min-w-0 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 rounded"
                            >
                              <Phone className="w-3.5 h-3.5 shrink-0" />
                              <span className="truncate group-hover:underline">
                                {member.phone}
                              </span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
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
