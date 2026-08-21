import type { Metadata } from "next";

export const revalidate = 3600;

import FAQWrapper from "@/components/FAQWrapper";
import { CTASection } from "@/components/ui/cta-section";
import PageContentWrapper from "@/components/ui/page-content-wrapper";
import { HeroSection } from "@/components/faq/HeroSection";
import { type FAQ } from "@/interface/sanity";
import { getFAQ } from "@/sanity/sanity";
import { portableTextToPlain } from "@/lib/portable-text-to-plain";
import { PageBreadcrumbs } from "@/components/ui/page-breadcrumbs";

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
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "IFEM Education FAQ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ — UK Study Visa & Admission Questions Answered",
    description: "UK visa requirements, admission timelines, and IFEM's free services explained.",
    images: ["/opengraph-image"],
  },
};

export default async function FAQ() {
  const faqs: FAQ[] = await getFAQ();

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

      <PageBreadcrumbs items={[{ label: "FAQ", href: "/faq" }]} />
      <HeroSection />

      <PageContentWrapper>
        <FAQWrapper faqs={faqs} />
      </PageContentWrapper>

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
