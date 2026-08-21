import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, MapPin, Video } from "lucide-react";
import type { EventCard } from "@/interface/sanity";
import {
  getEventFormatLabel,
  isCompleteEventRegistration,
} from "@/lib/event-status";

interface UpcomingEventsProps {
  events: EventCard[];
}

function eventDateParts(date: string) {
  const value = new Date(date);
  return {
    month: value.toLocaleDateString("en-GB", {
      month: "short",
      timeZone: "Africa/Lagos",
    }),
    day: value.toLocaleDateString("en-GB", {
      day: "2-digit",
      timeZone: "Africa/Lagos",
    }),
    detail: value.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: "Africa/Lagos",
    }),
  };
}

function attendanceLabel(event: EventCard) {
  if (event.availability?.trim()) return event.availability;
  if (event.attendance === "free-registration") return "Free registration";
  if (event.attendance === "ticketed") return "Ticket required";
  return "By invitation";
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  if (events.length === 0) return null;

  return (
    <section
      aria-labelledby="upcoming-events-heading"
      className="border-t border-[#e2e2de] bg-white px-4 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 max-w-2xl">
          <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
            <span className="h-px w-6 bg-[#1a5c34]" /> Save the date
          </p>
          <h2
            id="upcoming-events-heading"
            className="font-serif text-3xl font-bold text-charcoal md:text-4xl"
          >
            Upcoming events
          </h2>
          <p className="mt-3 text-[#5a5a5a]">
            Meet our team, partner universities and other students preparing for
            the UK.
          </p>
        </div>
        <div className="border-t border-[#e2e2de]">
          {events.map((event) => {
            const date = eventDateParts(event.startsAt);
            const Icon = event.attendanceMode === "online" ? Video : MapPin;
            const register = isCompleteEventRegistration(event);
            return (
              <article
                key={event._id}
                className="grid gap-5 border-b border-[#e2e2de] py-6 md:grid-cols-[88px_220px_minmax(0,1fr)_auto] md:items-center md:gap-8 md:py-8"
              >
                <time
                  dateTime={event.startsAt}
                  className="flex w-[76px] shrink-0 flex-col rounded-lg border border-[#1a5c34]/20 bg-[#e8f3ec] px-3 py-2 text-center text-[#1a5c34]"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em]">
                    {date.month}
                  </span>
                  <span className="font-serif text-3xl font-bold leading-none">
                    {date.day}
                  </span>
                </time>
                {event.coverImage?.url ? (
                  <Link
                    href={`/news-and-events/events/${event.slug.current}`}
                    className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border border-[#e2e2de] bg-[#fafaf7] focus-ring"
                    aria-label={`View ${event.title}`}
                  >
                    <Image
                      src={event.coverImage.url}
                      alt={event.coverImage.alt ?? event.title}
                      fill
                      sizes="(min-width: 768px) 220px, 100vw"
                      className="object-contain p-1 transition-transform duration-300 hover:scale-[1.01]"
                    />
                  </Link>
                ) : null}
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#1a5c34]">
                    {getEventFormatLabel(event.format)}
                  </p>
                  <h3 className="font-serif text-2xl font-bold text-charcoal">
                    <Link
                      href={`/news-and-events/events/${event.slug.current}`}
                      className="focus-ring rounded-sm hover:text-forest"
                    >
                      {event.title}
                    </Link>
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#5a5a5a]">
                    {event.excerpt}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#686868]">
                    <span>
                      <CalendarDays
                        aria-hidden="true"
                        className="mr-1 inline h-3.5 w-3.5 text-[#1a5c34]"
                      />
                      {date.detail}
                    </span>
                    <span>
                      <Icon
                        aria-hidden="true"
                        className="mr-1 inline h-3.5 w-3.5 text-[#1a5c34]"
                      />
                      {event.location}
                    </span>
                    <span className="font-semibold text-[#1a5c34]">
                      {attendanceLabel(event)}
                    </span>
                  </div>
                </div>
                <Link
                  href={
                    register
                      ? event.registrationUrl!
                      : `/news-and-events/events/${event.slug.current}`
                  }
                  className="inline-flex items-center gap-2 self-start whitespace-nowrap rounded-lg border border-[#1a5c34] px-4 py-2.5 text-sm font-semibold text-[#1a5c34] transition-colors hover:bg-[#1a5c34] hover:text-white focus-ring md:self-center"
                  {...(register
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {register
                    ? event.registrationLabel?.trim() || "Register for event"
                    : "View event"}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
