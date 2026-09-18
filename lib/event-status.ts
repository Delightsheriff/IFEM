import type { Event, EventCard } from "@/interface/sanity";

export const EVENT_FORMAT_LABELS: Record<string, string> = {
  "interactive-conference": "Interactive conference",
  "university-fair": "University fair",
  "visa-briefing": "Visa briefing",
  "document-review-clinic": "Document review clinic",
  webinar: "Webinar",
  other: "Event",
};

export function getEventFormatLabel(format?: string): string {
  return format ? (EVENT_FORMAT_LABELS[format] ?? "Event") : "Event";
}

export const EVENT_DATE_TIMEZONE = "Africa/Lagos";

export function isValidEventRange(startsAt: string, endsAt: string): boolean {
  const start = new Date(startsAt).getTime();
  const end = new Date(endsAt).getTime();
  return Number.isFinite(start) && Number.isFinite(end) && end >= start;
}

export function formatEventDateTime(date: string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: EVENT_DATE_TIMEZONE,
  });
}

export interface EventDateParts {
  month: string;
  day: string;
  detail: string;
}

export function getEventDateParts(date: string): EventDateParts {
  const value = new Date(date);
  return {
    month: value.toLocaleDateString("en-GB", {
      month: "short",
      timeZone: EVENT_DATE_TIMEZONE,
    }),
    day: value.toLocaleDateString("en-GB", {
      day: "2-digit",
      timeZone: EVENT_DATE_TIMEZONE,
    }),
    detail: formatEventDateTime(date),
  };
}

export function getAttendanceLabel(
  event: Pick<EventCard, "availability" | "attendance">,
): string {
  if (event.availability?.trim()) return event.availability.trim();
  if (event.attendance === "free-registration") return "Free registration";
  if (event.attendance === "ticketed") return "Ticket required";
  return "By invitation";
}

export function splitEvents(events: EventCard[], now: Date) {
  const currentTime = now.getTime();
  const validEvents = events.filter((event) =>
    isValidEventRange(event.startsAt, event.endsAt),
  );

  const upcoming = validEvents
    .filter((event) => new Date(event.endsAt).getTime() >= currentTime)
    .toSorted(
      (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
    );
  const past = validEvents
    .filter((event) => new Date(event.endsAt).getTime() < currentTime)
    .toSorted(
      (a, b) => new Date(b.endsAt).getTime() - new Date(a.endsAt).getTime(),
    );

  return { upcoming, past };
}

export function isCompleteSpotlight(event: Event | EventCard): boolean {
  const spotlight = event.spotlight;
  if (!spotlight) {
    return false;
  }

  if ("isReady" in spotlight) return spotlight.isReady;

  if (!spotlight.heading?.trim() || spotlight.media.length === 0) return false;

  return spotlight.media.every((item) => {
    if (item.type === "image") return Boolean(item.url?.trim());
    return Boolean(
      item.videoUrl?.startsWith("https://") || item.url?.startsWith("https://"),
    );
  });
}

export function isCompleteEventRegistration(event: Event | EventCard): boolean {
  return Boolean(event.registrationUrl?.startsWith("http"));
}

export function isPastEvent(event: Event, now = new Date()): boolean {
  return new Date(event.endsAt).getTime() < now.getTime();
}
