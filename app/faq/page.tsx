import type { Metadata } from "next";
import FAQWrapper from "@/components/FAQWrapper";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Find answers to frequently asked questions about studying in the UK, visa processing, admission requirements, and IFEM Education's services.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ | IFEM Education",
    description:
      "Answers to common questions about UK education, visa processing, admission requirements, and more.",
    url: "/faq",
  },
};
import { CTASection } from "@/components/ui/cta-section";
import PageContentWrapper from "@/components/ui/page-content-wrapper";
import { type FAQ } from "@/interface/sanity";
import { getFAQ } from "@/sanity/sanity";
import Link from "next/link";

export default async function FAQ() {
  const faqs: FAQ[] = await getFAQ();

  return (
    <PageContentWrapper>
      {/* Hero Section */}
      <section className="border-b border-sage/20 pb-6 mb-8 md:pb-8 md:mb-12">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-3 md:mb-4 font-serif text-3xl font-bold text-forest md:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="text-sm leading-relaxed text-gray md:text-base lg:text-lg">
            Find answers to common questions about IFEM, our services, and your
            education journey. Can&apos;t find what you&apos;re looking for?{" "}
            <Link
              href="/contact"
              className="font-semibold text-forest underline-offset-2 transition-colors hover:underline"
            >
              Contact us
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <FAQWrapper faqs={faqs} />

      {/* CTA Section */}
      <CTASection
        variant="forest"
        heading="Still have questions?"
        description="Our admissions team is here to help. Reach out and we'll provide personalised guidance for your education journey."
        primaryLink="/contact"
        primaryLabel="Get in Touch"
      />
    </PageContentWrapper>
  );
}
