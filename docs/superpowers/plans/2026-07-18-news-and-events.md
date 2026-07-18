# News & Events Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the public Guides experience with a News & Events hub that publishes editorial articles, automatically separates upcoming and past events, and gives completed events an optional media spotlight.

**Architecture:** Use two Sanity document types: `newsArticle` for evergreen editorial content and `event` for time-bound activity. The `/news-and-events` page is a deliberately dynamic server page so the current time—not a deployment or cache interval—decides whether an event is upcoming or past. Article and event detail pages remain independently cacheable, and the client receives no Sanity credentials or unnecessary media embeds.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Sanity v5, next-sanity, Next Image, Tailwind CSS v4, lucide-react.

## Global Constraints

- Keep the existing Guides URLs working through permanent redirects; do not discard existing content or inbound links.
- Keep the current visual system: DM Sans for utility/body text, Fraunces for editorial titles, forest `#1a5c34`, cream `#fafaf7`, white cards, sage/grey borders, `0.5rem` base radius and existing focus-ring utilities.
- Do not add a gallery, video iframe, event card, or CTA if its required Sanity data is incomplete.
- Event status is determined by the event’s required `endsAt` datetime in Africa/Lagos time; an event is upcoming while `endsAt >= now`, otherwise it is past.
- Do not iframe third-party video on the listing page. A spotlight uses poster images and opens video intentionally on its detail page, protecting page weight and privacy.
- Continue the project’s local-development Sanity policy (`SANITY_REVALIDATE = 0`); production article/detail data may revalidate hourly.
- Commit each completed task separately, with no co-author trailer.

---

## Design direction

**Audience and job:** Nigerian prospective students and families need one trustworthy place to find timely IFEM activity and practical UK-study updates, then decide whether to attend, read, or contact a counsellor.

The existing Guides page’s quiet editorial system is a good base, but its equal-weight two-column cards hide the urgency of dates. The proposed page adds one structural device that means something: a slim vertical event timeline. Its date tile makes the calendar status scannable at a glance, while the rest of the design remains calm and familiar.

```
┌──────────────────────────────────────────────────────────────┐
│ NEWS & EVENTS                                                 │
│ Insights, campus visits and sessions for your UK journey.     │
└──────────────────────────────────────────────────────────────┘

┌──────────────── Upcoming events ─────────────────────────────┐
│ JUL 24 ──  UK study fair                         Enugu         │
│             Short description              Reserve your place │
│ AUG 08 ──  Visa briefing                    Online             │
└──────────────────────────────────────────────────────────────┘

┌──────────────── Latest news ─────────────────────────────────┐
│ [featured article]       [article] [article]                  │
│ category · date · 5 min   category · date · 4 min              │
└──────────────────────────────────────────────────────────────┘

┌────── Past event spotlights ─────────────────────────────────┐
│ [photo] Event title · date · 12 photos / 2 videos →           │
│ [photo] Event title · date · gallery available →              │
└──────────────────────────────────────────────────────────────┘
```

The page should not duplicate a “Past Events” section when no spotlight-ready past event exists. If there are no upcoming events, the first content section becomes **Event spotlights** and explains that the next event will be announced here; the current cards and their galleries then carry the page. If neither events nor articles exist, show a dedicated News & Events empty state with one contact CTA.

### Event context from IFEM’s public activity

The event model should be shaped around IFEM’s real-world **UK Study Interactive Conference** format rather than a generic calendar listing. A public listing for its 2 August 2025 Lagos conference describes an in-person, free but registration-gated session with an expert host, partner-university representatives, live questions, on-the-spot document review, individual advice, and a limited-seat message. This means the website needs to answer “what will happen?”, “who will be there?”, and “what should I bring?” before asking a visitor to register.

Add these event fields to the model below:

- `format`: one of `interactive-conference`, `university-fair`, `visa-briefing`, `document-review-clinic`, `webinar`, or `other`; displayed as the small event badge.
- `host`: optional name and role, rendered only when both values are present.
- `partnerUniversities`: optional references to existing `ukUniversity` documents; display only resolved references.
- `highlights`: optional 1–5 short, complete benefit statements, such as “Meet partner-university representatives” or “Bring documents for an initial review.”
- `whatToBring`: optional 1–5 short, complete preparation items; do not show the section if no valid items exist.
- `attendance`: required `free-registration`, `ticketed`, or `invite-only`, with optional capacity/availability text. This lets the registration CTA say “Register free” or “Request an invitation” accurately instead of using a generic action.

On event detail pages, these become a compact “At this event” panel beside the date/location rather than body text hidden below the fold. This is the single design addition that reflects IFEM’s events: useful preparation information, not decorative agenda blocks.

## Content model decisions

| Content | Sanity type | Required to publish | Optional |
| --- | --- | --- | --- |
| Editorial post | `newsArticle` | title, slug, excerpt, category, content | cover image, read time (derive when omitted), SEO overrides, featured placement |
| Event | `event` | title, slug, excerpt, startsAt, endsAt, location mode/name, attendance, body, cover image with alt | format, host, partner universities, highlights, what to bring, registration URL/label, featured placement, spotlight |
| Spotlight | nested `spotlight` object on `event` | heading, summary, at least one valid media item | none |
| Spotlight image | image item | image asset, alt | caption |
| Spotlight video | external video item | title, HTTPS video URL, poster image with alt | caption |

`endsAt` is intentionally mandatory even for one-day events. This removes ambiguity around the automatic status rule. Sanity validation must enforce `endsAt >= startsAt`, valid HTTPS registration/video URLs, and at least one media item when a spotlight exists. The frontend repeats the completeness check because validation alone cannot protect old or partially migrated content.

## File structure

- Create: `schemaTypes/news-article.ts` — CMS contract for blog/news posts.
- Create: `schemaTypes/event.ts` — CMS contract for events, practical attendance information, and nested spotlight media.
- Modify: `schemaTypes/index.ts` — register the two types and retire `guides` only after content migration.
- Create: `lib/content-categories.ts` — article categories and labels; replaces guide-specific language.
- Create: `lib/event-status.ts` — timezone-safe event grouping and presentation helpers with no React dependency.
- Modify: `interface/sanity.ts` — `NewsArticle`, `Event`, `EventSpotlight`, and media interfaces.
- Modify: `sanity/sanity.ts` — article/event list/detail fetches and migration-compatible guide reads until redirects are deployed.
- Create: `app/news-and-events/page.tsx` — dynamic hub, metadata, event/article sections.
- Create: `app/news-and-events/articles/[slug]/page.tsx` — article metadata, JSON-LD, related articles.
- Create: `app/news-and-events/events/[slug]/page.tsx` — event metadata, Event JSON-LD, status and spotlight.
- Create: `components/news-events/NewsEventsHero.tsx` — hub hero using existing eyebrow/headline language.
- Create: `components/news-events/UpcomingEvents.tsx` — compact timeline list and no-upcoming message.
- Create: `components/news-events/EventSpotlightCards.tsx` — only spotlight-complete past events.
- Create: `components/news-events/ArticleGrid.tsx` — featured editorial card plus standard cards.
- Create: `components/news-events/EventSpotlight.tsx` — accessible image grid and click-to-open video links.
- Create: `components/news-events/EmptyNewsEventsState.tsx` — no-content state.
- Modify: `lib/links.ts`, `app/sitemap.ts`, `app/layout.tsx`, `app/not-found.tsx`, `app/error.tsx`, and existing CTA links — label and route migration.
- Modify: `next.config.ts` only if required to permit a chosen external video-poster host; prefer Sanity-hosted posters to avoid this change.
- Create: `app/guides/page.tsx` redirect and `app/guides/[slug]/page.tsx` redirect — preserve existing URLs.
- Create: `scripts/migrate-guides-to-news.ts` — one-time, dry-run-first Sanity migration; run manually with a token, never during deploy.

### Task 1: Establish the content contracts and migration path

**Files:**
- Create: `schemaTypes/news-article.ts`
- Create: `schemaTypes/event.ts`
- Modify: `schemaTypes/index.ts`
- Create: `scripts/migrate-guides-to-news.ts`

**Interfaces:**
- Produces `newsArticle` and `event` document types.
- Produces one `event.spotlight` object with `media: Array<spotlightImage | spotlightVideo>`.

- [ ] Define `newsArticle` with `title`, `slug`, `excerpt`, `category`, `content`, `coverImage`, `featured`, and the existing SEO override fields. Make title, slug, excerpt, category, and content required. Retain the current Portable Text blocks, links, and inline image support.
- [ ] Define `event` with title, slug, excerpt, startsAt, endsAt, location mode (`in-person` or `online`), location label, required attendance mode, body, cover image, registration URL/label, and featured boolean. Add optional format, host, partner-university references, 1–5 highlights, and 1–5 “what to bring” items. Require title, slug, excerpt, both datetimes, location fields, attendance mode, body, and cover image asset/alt.
- [ ] Add a custom validation rule equivalent to `endsAt >= startsAt`; set the Studio help text to “Past/upcoming is calculated automatically from the end date.”
- [ ] Add `spotlight` as an optional object. Require its heading, summary, and at least one media item when the object is present. For image media require asset and alt; for video media require title, HTTPS URL, poster asset, and poster alt.
- [ ] Register the types alongside `guides`; do not delete `guides` until migration is confirmed in production.
- [ ] Write a migration script that defaults to a dry run, reads each `guides` document, creates a `newsArticle` with the same title, slug, excerpt, category, content, created/updated timestamps and SEO fields, and logs every intended ID. Require an explicit `--apply` argument before mutations.
- [ ] In a staging Sanity dataset, run the dry run and then migration. Verify document count, slugs, excerpts, Portable Text blocks, and SEO fields match before publishing the schema change.
- [ ] Commit: `feat: add news and event content schemas`

### Task 2: Add safe types, date classification, and Sanity queries

**Files:**
- Create: `lib/content-categories.ts`
- Create: `lib/event-status.ts`
- Modify: `interface/sanity.ts`
- Modify: `sanity/sanity.ts`

**Interfaces:**
- `getNewsArticles(): Promise<NewsArticle[]>`
- `getNewsArticleBySlug(slug: string): Promise<NewsArticle | null>`
- `getEvents(): Promise<Event[]>`
- `getEventBySlug(slug: string): Promise<Event | null>`
- `splitEvents(events: Event[], now: Date): { upcoming: Event[]; past: Event[] }`
- `isCompleteSpotlight(event: Event): boolean`

- [ ] Move the four existing guide category values and labels into `content-categories.ts`, renaming the display language to “News”/“Articles” without changing migrated stored values.
- [ ] Model all required image URLs and alt text as optional at the TypeScript boundary because Sanity can contain legacy incomplete documents. Make `isCompleteSpotlight` return true only when spotlight heading/summary exist and every media item has its required data.
- [ ] Implement `splitEvents` against `endsAt`, using `new Date(event.endsAt).getTime()`. Sort upcoming ascending by `startsAt`; sort past descending by `endsAt`. Invalid dates must be excluded from both public lists and logged from the fetch layer.
- [ ] Add Sanity projections that request only fields rendered by each list. Fetch Portable Text and full media only for the relevant detail query; list cards receive cover image URL/alt, dates, location, excerpt, spotlight media count, and slug.
- [ ] Keep the existing development revalidation behavior. Wrap matching detail fetches in `cache` so metadata and page body share one request per render.
- [ ] Manually verify with four fixture events: future one-day, ongoing multi-day, past, and `endsAt` before `startsAt`. Confirm the invalid event never renders and that the other three sort correctly.
- [ ] Commit: `feat: add news and event data access`

### Task 3: Build the News & Events hub

**Files:**
- Create: `app/news-and-events/page.tsx`
- Create: `components/news-events/NewsEventsHero.tsx`
- Create: `components/news-events/UpcomingEvents.tsx`
- Create: `components/news-events/EventSpotlightCards.tsx`
- Create: `components/news-events/ArticleGrid.tsx`
- Create: `components/news-events/EmptyNewsEventsState.tsx`

**Interfaces:**
- Consumes `NewsArticle[]`, `Event[]`, `splitEvents`, and `isCompleteSpotlight` from Task 2.
- Produces public list links at `/news-and-events/articles/[slug]` and `/news-and-events/events/[slug]`.

- [ ] Set the hub page to dynamic rendering so the server evaluates event status at request time. Continue to cache Sanity data according to the production revalidation policy; only the inexpensive date split is per request.
- [ ] Use the existing cream hero construction: forest line eyebrow “News & Events”, large DM Sans heading, and one measured explanatory paragraph. Do not introduce a new palette or a generic dashboard tab control.
- [ ] Render upcoming events first when at least one exists. Each row gets a fixed-width calendar tile (month/day), event-format badge, event title, date/time, place or “Online”, attendance message, and a single action: “View event” or the configured registration label. Use semantic `<time dateTime>` elements.
- [ ] When there are no upcoming events, replace that section with “Event spotlights” and a plain sentence that the next IFEM event will be announced here. Render past spotlights immediately below it; do not render an empty upcoming panel.
- [ ] Render past spotlight cards only for `isCompleteSpotlight(event)`. Use the cover image, date, title, media count, and “View spotlight” action. Do not expose an event’s empty gallery as a card.
- [ ] Render the news area after events: one featured article spans two grid columns at desktop, remaining article cards reuse the current bordered, serif-title treatment. Add category, publication date, and read time; do not add a separate card shadow language.
- [ ] When no articles, omit the news heading. When both content types are empty, show the new empty state and existing contact CTA.
- [ ] Check 320px, 768px, and 1440px layouts; keyboard-tab each event row, card, and registration CTA; confirm focus uses `.focus-ring`.
- [ ] Commit: `feat: add news and events hub`

### Task 4: Build article and event detail pages

**Files:**
- Create: `app/news-and-events/articles/[slug]/page.tsx`
- Create: `app/news-and-events/events/[slug]/page.tsx`
- Create: `components/news-events/EventSpotlight.tsx`
- Reuse/adapt: `components/guides/ArticleContent.tsx`, `components/share-guide.tsx`

**Interfaces:**
- Article detail consumes `NewsArticle` and renders `Article` structured data.
- Event detail consumes `Event` and renders `Event` structured data.
- `EventSpotlight` receives only a complete spotlight.

- [ ] Adapt the existing article layout—back navigation, byline, Portable Text, related items, sharing, and CTA—under the new article URL and labels. Use canonical URLs at `/news-and-events/articles/[slug]`.
- [ ] Publish `Article` JSON-LD using title, excerpt, publication/modification time, category, canonical URL, and optional social image.
- [ ] Create an event header with its date range, location, attendance message, current status label, cover image, and registration CTA only if both URL and label exist. Add an “At this event” panel for complete host, partner-university, highlights, and what-to-bring data; omit every incomplete sub-section. Disable no buttons and render no empty registration area.
- [ ] Publish `Event` JSON-LD with startDate, endDate, eventStatus (`EventScheduled` or `EventCompleted`), eventAttendanceMode, location, image, description, and canonical URL.
- [ ] Render the spotlight only when `isCompleteSpotlight` is true. Images use responsive `next/image` with Sanity URLs and meaningful alt text. Videos render as labelled external links using their poster image; no autoplay, hidden controls, or eager iframe embeds.
- [ ] Reuse the article share component after renaming its props/file to generic content naming so both article and event pages share it.
- [ ] Verify detail metadata, canonical URL, JSON-LD, share URL, no-spotlight event, completed event spotlight, online event, and external video link manually.
- [ ] Commit: `feat: add article and event detail pages`

### Task 5: Redirect, navigation, SEO, and release verification

**Files:**
- Modify: `lib/links.ts`
- Modify: `app/sitemap.ts`
- Modify: `app/layout.tsx`
- Modify: `app/not-found.tsx`
- Modify: `app/error.tsx`
- Modify: existing CTA link references found by `rg -n 'guides|Guides' app components lib`
- Modify: `app/guides/page.tsx`
- Modify: `app/guides/[slug]/page.tsx`

**Interfaces:**
- `/guides` permanently redirects to `/news-and-events`.
- `/guides/[slug]` permanently redirects to `/news-and-events/articles/[slug]`.

- [ ] Change header and footer labels to “News & Events” and route them to `/news-and-events`.
- [ ] Replace the website search target and recovery links so they do not advertise Guides after launch. Update all homepage/contact/about/institution CTA copy according to its context (“Explore news & events” rather than an automatic global replacement where “Read our articles” is clearer).
- [ ] Add News & Events, article, and event routes to the sitemap with modified timestamps from Sanity. Remove Guides URLs from the sitemap only after permanent redirects are live.
- [ ] Add permanent server redirects from legacy URLs. Do not redirect a missing legacy slug to the generic hub until the migration has verified that the matching new article exists; use a 404 otherwise to avoid hiding bad links.
- [ ] Update metadata language, Open Graph copy, breadcrumb labels, and `WebSite` SearchAction target to the new route.
- [ ] Run `npm run lint`, `npx tsc --noEmit`, and `npm run build`; expected result is exit code 0 (the existing Header unused-import warning may remain until separately addressed).
- [ ] Manually check a migrated old URL, a new article URL, an upcoming event, a past spotlight, no-upcoming state, and mobile navigation in a production-like build.
- [ ] Commit: `feat: launch news and events`

## Self-review

- [x] Replaces Guides publicly while retaining content and legacy URLs.
- [x] Covers blog/news, upcoming/past event calculation, event spotlights, images and videos.
- [x] Defines a safe fallback when there are no upcoming events.
- [x] Preserves the site’s existing visual system and avoids heavy video embeds.
- [x] Includes Sanity validation plus frontend completeness checks so partial content cannot break the interface.
- [x] Includes metadata, structured data, redirects, sitemap, responsive/accessibility, and build verification.

## Recommended editorial workflow

1. Publish an event as soon as dates and its cover image are ready; it appears in Upcoming automatically.
2. After it ends, it moves to Past automatically using `endsAt`—no editor action needed.
3. Add the optional spotlight only after its title, summary, and every selected image/video have finished captions, alt text, and posters.
4. Publish news articles independently; they remain visible regardless of the event calendar.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-07-18-news-and-events.md`.

1. **Subagent-Driven (recommended)** — dispatch a fresh agent per task, with review between commits.
2. **Inline Execution** — execute the tasks in this session, with review checkpoints.
