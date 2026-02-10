import { Guide } from "@/interface/sanity";
import { getGuides } from "@/sanity/sanity";
import Link from "next/link";

export default async function Guides() {
  const guides: Guide[] = await getGuides();
  return (
    <main>
      {/* Hero Section */}
      <section className="border-b border-sage/20 pb-8 mb-12">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-forest mb-4 text-balance">
            Resources & Guides
          </h1>
          <p className="text-lg text-gray leading-relaxed">
            Everything you need to know about studying in the UK. From visa
            requirements to financial planning, we&apos;ve got you covered with
            comprehensive guides.
          </p>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-4">
            {guides.map((guide) => (
              <Link
                key={guide._id}
                href={`/guides/${guide.slug.current}`}
                className="group block p-6 md:p-8 bg-white border border-sage/30 rounded-lg hover:border-forest/30 hover:shadow-lg transition-all duration-300"
              >
                {/* Category Badge */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-forest bg-forest/10 rounded-full">
                    {guide.category}
                  </span>
                  <span className="text-xs text-gray whitespace-nowrap">
                    {guide.readTime} mins read
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-charcoal mb-3 group-hover:text-forest transition-colors line-clamp-2">
                  {guide.title}
                </h2>

                {/* Excerpt */}
                <p className="text-charcoal text-base md:text-lg leading-relaxed mb-4 line-clamp-2">
                  {guide.excerpt}
                </p>

                {/* Read More Link */}
                <div className="flex items-center gap-2 text-forest font-semibold group-hover:gap-3 transition-all">
                  Read Guide
                  <span className="text-xl">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 bg-forest text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-balance">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-white/90 mb-10 leading-relaxed">
            Get personalized guidance from our education consultants to find the
            perfect UK university for your goals.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-forest font-semibold rounded-lg hover:bg-cream transition-colors"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </main>
  );
}
