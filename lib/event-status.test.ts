import { describe, expect, it } from "vitest";
import { isCompleteSpotlight, splitEvents } from "@/lib/event-status";
import type { EventCard } from "@/interface/sanity";

const event = (overrides: Partial<EventCard>): EventCard => ({
  _id: "event",
  title: "Event",
  slug: { current: "event" },
  excerpt: "An event",
  startsAt: "2026-07-18T10:00:00.000Z",
  endsAt: "2026-07-18T12:00:00.000Z",
  attendanceMode: "in-person",
  location: "Enugu",
  attendance: "free-registration",
  _createdAt: "2026-07-01T00:00:00.000Z",
  ...overrides,
});

describe("event status", () => {
  it("separates upcoming and past events and excludes invalid ranges", () => {
    const result = splitEvents(
      [
        event({
          _id: "past",
          startsAt: "2026-07-10T10:00:00.000Z",
          endsAt: "2026-07-10T12:00:00.000Z",
        }),
        event({
          _id: "upcoming",
          startsAt: "2026-07-20T10:00:00.000Z",
          endsAt: "2026-07-20T12:00:00.000Z",
        }),
        event({ _id: "invalid", startsAt: "invalid", endsAt: "invalid" }),
      ],
      new Date("2026-07-18T12:00:00.000Z"),
    );

    expect(result.upcoming.map(({ _id }) => _id)).toEqual(["upcoming"]);
    expect(result.past.map(({ _id }) => _id)).toEqual(["past"]);
  });

  it("uses Sanity's lean spotlight readiness flag for cards", () => {
    expect(
      isCompleteSpotlight(
        event({ spotlight: { mediaCount: 2, isReady: true } }),
      ),
    ).toBe(true);
    expect(
      isCompleteSpotlight(
        event({ spotlight: { mediaCount: 2, isReady: false } }),
      ),
    ).toBe(false);
  });
});
