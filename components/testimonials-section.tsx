import { SuccessStory } from "@/interface/sanity";
import { MapPin, Quote } from "lucide-react";
import Image from "next/image";

interface TestimonialsSectionProps {
  stories: SuccessStory[];
  title?: string;
  maxStories?: number;
}

export default function TestimonialsSection({
  stories,
  title = "What Our Students Say",
  maxStories = 6,
}: TestimonialsSectionProps) {
  if (stories.length === 0) return null;

  const displayStories = stories.slice(0, maxStories);

  return (
    <section className="py-20 md:py-28 px-4 bg-white/40 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal">
            {title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayStories.map((story) => (
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
                    <span className="truncate">{story.schoolDestination}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
