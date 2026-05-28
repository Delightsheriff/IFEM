"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, ArrowRight, Quote } from "lucide-react";
import { SuccessStory } from "@/interface/sanity";
import StorySpotlight from "./story-spotlight";

interface StudentJourneyProps {
  stories: SuccessStory[];
}

function getImageUrl(story: SuccessStory): string {
  return (
    story.studentImage?.url ||
    story.studentImage?.asset?.url ||
    "/placeholder.svg?height=900&width=600"
  );
}

export default function StudentJourney({ stories }: StudentJourneyProps) {
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);

  if (stories.length === 0) return null;

  const featured = stories[0];
  const others = stories.slice(1, 7);

  return (
    <>
      <section className="py-24 md:py-32 bg-cream">
        <div className="px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">

            {/* Section heading — matches rule+label pattern */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="block w-8 h-px bg-forest" />
                <p className="text-forest font-sans text-xs font-semibold uppercase tracking-widest">
                  Student Journeys
                </p>
                <span className="block w-8 h-px bg-forest" />
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal leading-tight">
                1,800{" "}
                <em className="not-italic text-forest">Lives Changed</em>
              </h2>
              <p className="mt-4 text-gray max-w-2xl mx-auto text-base leading-relaxed">
                Real stories from students who transformed their lives through
                UK education. Every journey is unique — but they all start with
                one step.
              </p>
            </div>

            {/* Featured story */}
            {featured && (
              <button
                type="button"
                className="group w-full text-left mb-8 block border border-sage/20 bg-white hover:border-forest/30 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
                onClick={() => setSelectedStory(featured)}
              >
                <div className="grid md:grid-cols-2">
                  {/* Image panel */}
                  <div className="relative h-72 md:h-96 overflow-hidden bg-sage/10">
                    <Image
                      src={getImageUrl(featured)}
                      alt={featured.studentName}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-charcoal/50 to-transparent" />
                    {/* Forest accent */}
                    <div className="absolute top-0 left-0 bottom-0 w-1 bg-forest" />
                    {/* Destination badge */}
                    <div className="absolute bottom-4 left-6 flex items-center gap-2 bg-white/95 px-3 py-1.5">
                      <MapPin className="w-3.5 h-3.5 text-forest shrink-0" />
                      <span className="text-xs font-semibold text-charcoal tracking-wide">
                        {featured.schoolDestination}
                      </span>
                    </div>
                  </div>

                  {/* Content panel */}
                  <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
                    <Quote
                      className="w-8 h-8 text-forest/20 mb-4"
                      aria-hidden="true"
                    />
                    <blockquote className="font-serif text-xl md:text-2xl italic text-charcoal leading-relaxed mb-8 border-l-4 border-forest pl-6">
                      &ldquo;{featured.comment}&rdquo;
                    </blockquote>

                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-sage/20">
                      <div>
                        <p className="font-semibold text-charcoal text-sm">
                          {featured.studentName}
                        </p>
                        <p className="text-xs text-gray uppercase tracking-wide mt-0.5">
                          IFEM Student
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-forest text-sm font-semibold group-hover:gap-3 transition-all">
                        Read full story
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            )}

            {/* Other stories grid */}
            {others.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {others.map((story) => (
                  <button
                    key={story._id}
                    type="button"
                    className="group text-left w-full bg-white border border-sage/20 p-6 hover:border-forest/30 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
                    onClick={() => setSelectedStory(story)}
                  >
                    {/* Student header */}
                    <div className="flex items-start gap-4 mb-5">
                      <div className="relative w-12 h-12 overflow-hidden shrink-0 bg-sage/10">
                        <Image
                          src={getImageUrl(story)}
                          alt={story.studentName}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <p className="font-semibold text-charcoal text-sm leading-snug truncate">
                          {story.studentName}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-gray mt-0.5">
                          <MapPin className="w-3 h-3 text-forest shrink-0" />
                          <span className="truncate">{story.schoolDestination}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quote */}
                    <blockquote className="text-sm text-gray leading-relaxed line-clamp-3 mb-5 border-l-2 border-forest/30 pl-3 italic">
                      &ldquo;{story.comment}&rdquo;
                    </blockquote>

                    {/* Read more */}
                    <div className="flex items-center gap-2 text-forest text-xs font-semibold uppercase tracking-wide group-hover:gap-3 transition-all">
                      Read full story
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* View all */}
            {stories.length > 7 && (
              <div className="text-center mt-12">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-8 py-3.5 border border-forest text-forest font-semibold text-sm tracking-wide rounded-sm hover:bg-forest hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
                >
                  View All Success Stories
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {selectedStory && (
        <StorySpotlight
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </>
  );
}
