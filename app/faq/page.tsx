import FAQWrapper from "@/components/FAQWrapper";
import { type FAQ } from "@/interface/sanity";
import { getFAQ } from "@/sanity/sanity";
import Link from "next/link";

export default async function FAQ() {
  const faqs: FAQ[] = await getFAQ();

  return (
    <main>
      {/* Hero Section */}
      <section className="border-b border-sage/20 pb-8 mb-12">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-4 font-serif text-4xl font-bold text-forest md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="text-base leading-relaxed text-gray md:text-lg">
            Find answers to common questions about IFEM, our services, and your
            education journey. Can&apos;t find what youre looking for?{" "}
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
      <section className="border-t border-sage/20 px-4 py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-forest md:text-4xl">
            Still have questions?
          </h2>
          <p className="mb-8 text-base leading-relaxed text-gray md:text-lg">
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
    </main>
  );
}
