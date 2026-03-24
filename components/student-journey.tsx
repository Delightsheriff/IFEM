"use client";

import { useState } from "react";
import Image from "next/image";
import { Quote, MapPin, ArrowRight } from "lucide-react";
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
      <section className="py-20 md:py-28 bg-cream">
        <div className="px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <p className="text-terracotta text-xs uppercase tracking-widest font-semibold mb-4">
                Student Journeys
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal leading-tight">
                From <em className="not-italic text-forest">application</em> to{" "}
                <em className="not-italic text-forest">graduation</em>
              </h2>
              <p className="mt-4 text-gray max-w-2xl mx-auto">
                Real stories from students who transformed their lives through
                UK education. Every journey is unique, but they all start with
                one step.
              </p>
            </div>

            {/* Featured Story - Large Card */}
            {featured && (
              <div
                className="group relative mb-12 rounded-2xl overflow-hidden bg-white border border-sage/20 shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer"
                onClick={() => setSelectedStory(featured)}
              >
                <div className="grid md:grid-cols-2">
                  {/* Image */}
                  <div className="relative h-64 md:h-80 lg:h-96">
                    <Image
                      src={getImageUrl(featured)}
                      alt={featured.studentName}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-r from-black/60 to-transparent" />

                    {/* Destination badge */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full">
                      <MapPin className="w-4 h-4 text-forest" />
                      <span className="text-sm font-medium text-charcoal">
                        {featured.schoolDestination}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <Quote className="w-10 h-10 text-terracotta/30 mb-4" />

                    <blockquote className="font-serif text-xl md:text-2xl italic text-charcoal leading-relaxed mb-6">
                      &ldquo;{featured.comment}&rdquo;
                    </blockquote>

                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <p className="font-semibold text-charcoal">
                          {featured.studentName}
                        </p>
                        <p className="text-sm text-gray">IFEM Student</p>
                      </div>

                      <div className="w-10 h-10 rounded-full bg-forest text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other Stories - Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {others.map((story) => (
                <div
                  key={story._id}
                  className="group bg-white rounded-xl border border-sage/20 p-6 hover:border-forest/30 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedStory(story)}
                >
                  {/* Header with image and destination */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0">
                      <Image
                        src={getImageUrl(story)}
                        alt={story.studentName}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-charcoal truncate">
                        {story.studentName}
                      </p>
                      <div className="flex items-center gap-1 text-sm text-gray">
                        <MapPin className="w-3 h-3 text-forest" />
                        <span className="truncate">
                          {story.schoolDestination}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-sm text-gray leading-relaxed line-clamp-3 mb-4">
                    &ldquo;{story.comment}&rdquo;
                  </blockquote>

                  {/* Read more */}
                  <div className="flex items-center gap-2 text-forest text-sm font-medium group-hover:gap-3 transition-all">
                    Read full story
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>

            {/* View all link */}
            {stories.length > 7 && (
              <div className="text-center mt-12">
                <button className="inline-flex items-center gap-2 px-8 py-3 border-2 border-forest text-forest font-semibold rounded-lg hover:bg-forest hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2">
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
