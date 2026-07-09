import type { Metadata } from "next";

export const revalidate = 3600;

import FAQWrapper from "@/components/FAQWrapper";
import { CTASection } from "@/components/ui/cta-section";
import PageContentWrapper from "@/components/ui/page-content-wrapper";
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
      <div className="border-b border-[#e2e2de] bg-[#fafaf7]">
        <PageContentWrapper>
          <div className="max-w-2xl pb-10" data-reveal="fade-up">
            <p className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
              <span className="h-px w-6 bg-[#1a5c34]" />
              Support
            </p>
            <h1
              className="mb-4 font-sans font-extrabold leading-[1.04] tracking-[-0.025em] text-[#111111]"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
            >
              <span className="hero-blur-1 block">Frequently Asked</span>
              <span className="hero-blur-2 block text-[#1a5c34]">Questions</span>
            </h1>
            <p className="text-[1rem] leading-[1.75] text-[#7a7a7a]">
              Find answers to common questions about IFEM, our services, and
              your education journey. Can&apos;t find what you&apos;re looking
              for?{" "}
              <Link
                href="/contact"
                className="font-semibold text-[#1a5c34] underline-offset-2 hover:underline transition-colors"
              >
                Contact us directly.
              </Link>
            </p>
          </div>
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
