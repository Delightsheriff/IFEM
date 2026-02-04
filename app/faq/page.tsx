import Link from "next/link";

export default function FAQ() {
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
    </main>
  );
}
