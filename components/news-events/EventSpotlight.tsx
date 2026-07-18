import Image from "next/image";
import { ExternalLink, Play } from "lucide-react";
import type { Event } from "@/interface/sanity";
import { isCompleteSpotlight } from "@/lib/event-status";

export function EventSpotlight({ event }: { event: Event }) {
  if (!isCompleteSpotlight(event) || !event.spotlight) return null;

  return (
    <section
      aria-labelledby="event-spotlight-heading"
      className="border-t border-[#e2e2de] py-12 md:py-16"
    >
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
          <span className="h-px w-6 bg-[#1a5c34]" /> Event spotlight
        </p>
        <h2
          id="event-spotlight-heading"
          className="font-serif text-3xl font-bold text-charcoal"
        >
          {event.spotlight.heading}
        </h2>
        {event.spotlight.summary?.trim() ? (
          <p className="mt-3 max-w-2xl leading-relaxed text-[#5a5a5a]">
            {event.spotlight.summary}
          </p>
        ) : null}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {event.spotlight.media.map((item, index) => {
            if (item.type === "image") {
              return (
                <figure
                  key={`${item.url}-${index}`}
                  className="overflow-hidden rounded-xl border border-[#e2e2de] bg-white"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={item.url!}
                      alt={item.alt ?? event.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </figure>
              );
            }

            if (item.videoUrl) {
              return (
                <figure
                  key={`${item.videoUrl}-${index}`}
                  className="overflow-hidden rounded-xl border border-[#e2e2de] bg-[#0d3320] sm:col-span-2 lg:col-span-3"
                >
                  <video
                    controls
                    preload="metadata"
                    poster={item.poster?.url}
                    className="aspect-video w-full object-contain"
                  >
                    <source src={item.videoUrl} />
                    Your browser does not support video playback.
                  </video>
                </figure>
              );
            }

            return (
              <a
                key={`${item.url}-${index}`}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-xl border border-[#e2e2de] bg-white focus-ring sm:col-span-2 lg:col-span-3"
              >
                <div className="relative aspect-video bg-[#0d3320]">
                  {item.poster?.url ? (
                    <Image
                      src={item.poster.url}
                      alt={item.poster.alt ?? event.title}
                      fill
                      sizes="100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  ) : null}
                  <span className="absolute inset-0 grid place-items-center bg-[#0d3320]/25">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-[#1a5c34] shadow-lg">
                      <Play
                        aria-hidden="true"
                        className="ml-0.5 h-5 w-5 fill-current"
                      />
                    </span>
                  </span>
                </div>
                <span className="flex items-center justify-between gap-3 p-4 text-sm font-semibold text-charcoal">
                  <span>Watch video</span>
                  <ExternalLink
                    aria-hidden="true"
                    className="h-4 w-4 text-[#1a5c34]"
                  />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
