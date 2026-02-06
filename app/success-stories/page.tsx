"use client";

import CountUp from "@/components/count-up";
import Link from "next/link";

export default function SuccessStories() {
  return (
    <main>
      {/* Stats Section */}
      <section className="py-16 md:py-24 px-4 bg-white/50 backdrop-blur-sm border-y border-sage/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { value: 500, label: "Students Placed" },
              { value: 98, label: "Success Rate" },
              { value: 5, label: "Years Experience" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="font-serif text-4xl md:text-5xl font-bold text-forest mb-2">
                  <CountUp
                    from={0}
                    to={stat.value}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                  />
                  +
                </p>
                <p className="text-sm text-gray uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program breakdown */}
      <section className="py-16 md:py-24 px-4 bg-white/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal">
              Programs Our Students Excel In
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Undergraduate",
              "Master's Degrees",
              "PhD Programs",
              "Exchange Programs",
            ].map((program) => (
              <div
                key={program}
                className="p-4 rounded-lg border border-sage/30 bg-white text-center hover:border-forest/30 transition-colors"
              >
                <p className="font-medium text-charcoal">{program}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-forest text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-balance">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-lg text-white/90 mb-10 leading-relaxed">
            Join hundreds of students who have transformed their lives through
            quality education abroad. Your journey starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/faq"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-forest font-semibold rounded-lg hover:bg-cream transition-colors"
            >
              Learn More
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Start Your Journey
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
