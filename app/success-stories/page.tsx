import CountUp from "@/components/count-up";
import DomeGallery from "@/components/dome-gallery";
import { getSuccessStories } from "@/sanity/sanity";
import { MapPin, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function SuccessStories() {
  const successStories = await getSuccessStories();

  return (
    <main>
      {/* Hero Section with Dome Gallery */}
      <section className="relative h-screen overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background z-10 pointer-events-none" />

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
          openedImageWidth="380px"
          openedImageHeight="480px"
        />

        {/* Content Overlay */}
        <div className="content-overlay absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-6">
          <div className="text-center max-w-2xl">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 font-medium">
              Real Journeys, Real Stories
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight mb-6 text-balance">
              Success Stories
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Discover the transformative experiences of students who trusted us
              with their educational journey abroad
            </p>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 flex flex-col items-center gap-2 animate-bounce">
            <span className="text-xs text-muted-foreground uppercase tracking-widest">
              Drag to explore
            </span>
            <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-muted-foreground/50 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      {successStories.length > 0 && (
        <section className="py-20 md:py-28 px-4 bg-white/40 backdrop-blur-sm">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal">
                What Our Students Say
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {successStories.slice(0, 6).map((story) => (
                <div
                  key={story._id}
                  className="group rounded-xl border border-sage/30 bg-white p-8 hover:border-forest/30 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
                >
                  {/* Quote icon */}
                  <Quote className="w-5 h-5 text-forest/30 mb-4" />

                  {/* Testimonial */}
                  <p className="text-charcoal leading-relaxed mb-6 grow line-clamp-4">
                    &quot;{story.comment}&quot;
                  </p>

                  {/* Divider */}
                  <div className="h-px bg-sage/20 mb-6" />

                  {/* Student info */}
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 bg-sage/20 border border-sage/30">
                      <Image
                        src={
                          typeof story.studentImage === "string"
                            ? story.studentImage
                            : story.studentImage?.url || "/placeholder.svg"
                        }
                        alt={story.studentName}
                        className="w-full h-full object-cover"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-charcoal text-sm">
                        {story.studentName}
                      </p>
                      <p className="text-xs text-gray flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate">
                          {story.schoolDestination}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
