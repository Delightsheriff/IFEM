import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Images } from "lucide-react";
import type { Event } from "@/interface/sanity";
import { isCompleteSpotlight } from "@/lib/event-status";
import { formatDate } from "@/lib/utils";

export function PastEventsList({ events }: { events: Event[] }) {
  if (events.length === 0) return null;
  return (
    <section
      aria-labelledby="past-events-heading"
      className="border-t border-[#e2e2de] bg-white px-4 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
            <span className="h-px w-6 bg-[#1a5c34]" /> Archive
          </p>
          <h2
            id="past-events-heading"
            className="font-serif text-3xl font-bold text-charcoal md:text-4xl"
          >
            Past events
          </h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {events.map((event) => {
            const hasSpotlight = isCompleteSpotlight(event);
            return (
              <Link
                key={event._id}
                href={`/news-and-events/events/${event.slug.current}`}
                className="group overflow-hidden rounded-xl border border-[#e2e2de] bg-[#fafaf7] transition-colors hover:border-[#1a5c34]/35 hover:bg-white focus-ring"
              >
                <div className="flex items-center gap-5 p-5">
                  {event.coverImage?.url ? (
                    <div className="relative hidden h-24 w-28 shrink-0 overflow-hidden rounded-lg bg-[#e8f3ec] sm:block">
                      <Image
                        src={event.coverImage.url}
                        alt={event.coverImage.alt ?? event.title}
                        fill
                        sizes="112px"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                  ) : null}
                  <span className="min-w-0 flex-1">
                    <span className="text-xs text-gray">
                      {formatDate(event.endsAt)}
                    </span>
                    <span className="mt-1 block font-serif text-xl font-bold text-charcoal">
                      {event.title}
                    </span>
                    <span className="mt-2 block text-sm text-gray">
                      {hasSpotlight
                        ? "View event spotlight"
                        : "View event details"}
                    </span>
                  </span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e8f3ec] text-[#1a5c34]">
                    {hasSpotlight ? (
                      <Images aria-hidden="true" className="h-4 w-4" />
                    ) : (
                      <ArrowRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      />
                    )}
                  </span>
                </div>
                {event.coverImage?.url ? (
                  <div className="relative aspect-[16/9] border-t border-[#e2e2de] bg-[#e8f3ec] sm:hidden">
                    <Image
                      src={event.coverImage.url}
                      alt={event.coverImage.alt ?? event.title}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
