import type { Metadata } from "next";
import PageContentWrapper from "@/components/ui/page-content-wrapper";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with IFEM Education. Speak with our expert counsellors, visit our offices, or send us a message to start your UK education journey.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact IFEM Education",
    description:
      "Speak with our expert counsellors or visit our offices. Start your UK education journey today.",
    url: "/contact",
  },
};
import { CTASection } from "@/components/ui/cta-section";
import ContactForm from "@/components/contact-form";
import BranchesSection from "@/components/branches-section";
import { getBranches, getTeamMembers } from "@/sanity/sanity";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

export default async function Contact() {
  const [branches, teamMembers] = await Promise.all([
    getBranches(),
    getTeamMembers(),
  ]);

  const hqBranch = branches.find((b) => b.type === "hq");

  return (
    <PageContentWrapper>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-forest font-semibold mb-4">
              Get In Touch
            </p>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-charcoal mb-6 text-balance">
              Let&apos;s Start Your Journey
            </h1>
            <p className="text-lg text-gray max-w-2xl mx-auto leading-relaxed">
              Have questions about our programmes? Our team is here to help you
              find the perfect educational opportunity.
            </p>
          </div>

          {/* Quick Contact Cards */}
          {hqBranch && (
            <div className="grid md:grid-cols-3 gap-4 mt-12">
              <a
                href={`mailto:${hqBranch.email}`}
                className="group bg-white border border-sage/30 rounded-xl p-6 hover:border-forest/30 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-sage/10 flex items-center justify-center group-hover:bg-forest/10 transition-colors shrink-0">
                    <Mail className="w-6 h-6 text-forest" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-gray uppercase tracking-wider">
                      Email Us
                    </p>
                    <p className="font-semibold text-charcoal group-hover:text-forest transition-colors break-all">
                      {hqBranch.email}
                    </p>
                  </div>
                </div>
              </a>

              <a
                href={`tel:${hqBranch.phone.replace(/\s/g, "")}`}
                className="group bg-white border border-sage/30 rounded-xl p-6 hover:border-forest/30 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-terracotta/10 flex items-center justify-center group-hover:bg-terracotta/20 transition-colors shrink-0">
                    <Phone className="w-6 h-6 text-terracotta" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-gray uppercase tracking-wider">
                      Call Us
                    </p>
                    <p className="font-semibold text-charcoal group-hover:text-terracotta transition-colors truncate">
                      {hqBranch.phone}
                    </p>
                  </div>
                </div>
              </a>

              <div className="bg-white border border-sage/30 rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-sage/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-forest" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-gray uppercase tracking-wider">
                      Visit Us
                    </p>
                    <p className="font-semibold text-charcoal truncate">
                      {hqBranch.city}, {hqBranch.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Form & Team Section */}
      <section className="py-20 px-4 md:px-8 bg-white/50">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <ContactForm />

          {/* Team Contacts */}
          <div>
            <h2 className="font-serif text-3xl font-bold text-charcoal mb-2">
              Speak With Our Team
            </h2>
            <p className="text-gray mb-8">
              Direct contact with our experts for specific enquiries.
            </p>

            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div
                  key={member._id}
                  className="bg-white rounded-xl border border-sage/20 p-6 hover:border-forest/30 hover:shadow-md transition-all"
                >
                  <div className="flex gap-4">
                    {member.image && (
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-lg object-cover shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-charcoal truncate">
                        {member.name}
                      </p>
                      <p className="text-sm text-forest font-medium mb-3 truncate">
                        {member.title}
                      </p>
                      <div className="flex flex-col gap-2 text-sm">
                        <a
                          href={`mailto:${member.email}`}
                          className="text-gray hover:text-forest transition-colors flex items-center gap-2 group min-w-0"
                        >
                          <Mail className="w-4 h-4 shrink-0" />
                          <span className="break-all group-hover:underline">
                            {member.email}
                          </span>
                        </a>
                        {member.phone && (
                          <a
                            href={`tel:${member.phone.replace(/\s/g, "")}`}
                            className="text-gray hover:text-forest transition-colors flex items-center gap-2 group min-w-0"
                          >
                            <Phone className="w-4 h-4 shrink-0" />
                            <span className="truncate group-hover:underline">
                              {member.phone}
                            </span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Branches Section */}
      <BranchesSection branches={branches} />

      {/* CTA Section */}
      <CTASection
        variant="forest"
        heading="Not Sure Where to Start?"
        description="Check out our FAQ section or schedule a free consultation with one of our education advisors."
        primaryLink="/faq"
        primaryLabel="View FAQ"
        secondaryLink="/guides"
        secondaryLabel="Read Our Guides"
      />
    </PageContentWrapper>
  );
}
