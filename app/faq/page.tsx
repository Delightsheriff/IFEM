import FAQWrapper from "@/components/FAQWrapper";
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
      <section className="border-t border-sage/20 py-12 md:py-16 lg:py-20 px-4 -mx-4 md:-mx-6 mt-12 md:mt-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-3 md:mb-4 font-serif text-2xl font-bold text-forest md:text-3xl lg:text-4xl">
            Still have questions?
          </h2>
          <p className="mb-6 md:mb-8 text-sm leading-relaxed text-gray md:text-base lg:text-lg">
            Our admissions team is here to help. Reach out and we&apos;ll
            provide personalized guidance for your education journey.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-forest px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-forest/90"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </PageContentWrapper>
  );
}
