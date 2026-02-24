import CountUp from "@/components/count-up";
import DomeGallery from "@/components/dome-gallery";
import TestimonialsSection from "@/components/testimonials-section";
import { Card, CardContent } from "@/components/ui/card";
import { getSuccessStories, getFeaturedSuccessStories } from "@/sanity/sanity";
import Link from "next/link";

export default async function SuccessStories() {
  const successStories = await getSuccessStories();
  const featuredStories = await getFeaturedSuccessStories();

  return (
    <main>
      {/* Hero Section with Dome Gallery */}
      <section className="relative h-screen overflow-hidden">
        {/* Dome Gallery */}
        <DomeGallery
          stories={successStories}
          fit={1}
          minRadius={550}
          maxVerticalRotationDeg={0}
          segments={34}
          dragDampening={4}
          overlayBlurColor="hsl(var(--background))"
          imageBorderRadius="12px"
          openedImageBorderRadius="20px"
          openedImageWidth="min(380px, 85vw)"
          openedImageHeight="min(480px, 70vh)"
        />

        {/* Bottom Interaction Hint Pill */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg border border-white/40">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-foreground animate-[swipeHint_2s_ease-in-out_infinite]"
            >
              <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
              <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
              <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
              <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 16" />
            </svg>
            <span className="text-xs md:text-sm font-medium text-foreground/80 tracking-wide">
              Drag to explore <span className="mx-1 opacity-50">•</span> Tap
              image to view
            </span>
          </div>
        </div>

        {/* Swipe hint keyframes */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @keyframes swipeHint {
            0%, 100% { transform: translateX(0); opacity: 0.6; }
            50% { transform: translateX(8px); opacity: 1; }
          }
        `,
          }}
        />
      </section>

      {/* Testimonials Grid */}
      <TestimonialsSection stories={featuredStories} />

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
              <Card key={program} className="text-center">
                <CardContent>
                  <p className="font-medium text-charcoal">{program}</p>
                </CardContent>
              </Card>
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
