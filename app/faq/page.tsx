import type { Metadata } from "next";

export const revalidate = 3600;

import FAQWrapper from "@/components/FAQWrapper";
import { CTASection } from "@/components/ui/cta-section";
import PageContentWrapper from "@/components/ui/page-content-wrapper";
import { FadeUp } from "@/components/ui/animate";
import { type FAQ } from "@/interface/sanity";
import { getFAQ } from "@/sanity/sanity";
import { portableTextToPlain } from "@/lib/portable-text-to-plain";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ — UK Study Visa & Admission Questions Answered",
  description:
    "Answers to the most common questions Nigerian students ask about UK university admissions, student visa requirements, IELTS, tuition fees, scholarships, and IFEM's free services.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ | IFEM Education — UK Study Visa & Admissions",
    description:
      "UK visa requirements, admission timelines, tuition fees, and IFEM's free services explained. Everything a Nigerian student needs to know.",
    url: "/faq",
  },
};

export default async function FAQ() {
  const faqs: FAQ[] = await getFAQ();

  // Build FAQPage structured data from CMS content.
  // Google requires `acceptedAnswer.text` to be a string — passing the
  // raw PortableText block array silently breaks the rich result, so we
  // flatten it to plain text first.
  const faqSchema = faqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs
          .map((faq) => {
            const answerText = portableTextToPlain(faq.answer);
            if (!answerText) return null;
            return {
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: answerText,
              },
            };
          })
          .filter(Boolean),
      }
    : null;

  return (
    <div className="w-full">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Hero */}
      <div className="bg-cream border-b border-sage/20">
        <PageContentWrapper>
          <FadeUp mount className="max-w-2xl pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-8 h-px bg-forest" />
              <p className="text-forest font-sans text-xs font-semibold uppercase tracking-widest">
                Support
              </p>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal leading-tight mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-gray leading-relaxed">
              Find answers to common questions about IFEM, our services, and
              your education journey. Can&apos;t find what you&apos;re looking
              for?{" "}
              <Link
                href="/contact"
                className="font-semibold text-forest underline-offset-2 hover:underline transition-colors focus-ring rounded-sm"
              >
                Contact us directly.
              </Link>
            </p>
          </FadeUp>
        </PageContentWrapper>
      </div>

      {/* FAQ Content */}
      <PageContentWrapper>
        <FAQWrapper faqs={faqs} />
      </PageContentWrapper>

      {/* CTA */}
      <CTASection
        variant="forest"
        heading="Still have questions?"
        description="Our admissions team is here to help. Reach out and we will provide personalised guidance for your education journey."
        primaryLink="/contact"
        primaryLabel="Get in Touch"
      />
    </div>
  );
}
