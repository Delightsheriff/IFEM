import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Check, MapPin, Users, Video } from "lucide-react";
import PageContentWrapper from "@/components/ui/page-content-wrapper";
import { NewsBackNav } from "@/components/news-events/NewsBackNav";
import { EventSpotlight } from "@/components/news-events/EventSpotlight";
import { customPortableTextComponents } from "@/components/portable-text-components";
import { PortableText } from "next-sanity";
import { getEventBySlug } from "@/sanity/sanity";
import { getEventFormatLabel, isCompleteEventRegistration, isPastEvent } from "@/lib/event-status";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

function isValidEventRange(startsAt: string, endsAt: string) {
  const start = new Date(startsAt).getTime();
  const end = new Date(endsAt).getTime();
  return Number.isFinite(start) && Number.isFinite(end) && end >= start;
}

function formatEventDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "2-digit", timeZone: "Africa/Lagos" });
}

function attendanceLabel(attendance: string) {
  if (attendance === "free-registration") return "Free registration";
  if (attendance === "ticketed") return "Ticket required";
  return "Invite only";
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event || !isValidEventRange(event.startsAt, event.endsAt)) return {};
  const title = event.seoTitle ?? event.title;
  const description = event.seoDescription ?? event.excerpt;
  const image = event.ogImage?.url ?? event.coverImage?.url ?? "/opengraph-image";
  return { title, description, alternates: { canonical: `/news-and-events/events/${slug}` }, openGraph: { title: `${title} | IFEM Education`, description, url: `/news-and-events/events/${slug}`, type: "website", images: [{ url: image, alt: event.ogImage?.alt ?? event.coverImage?.alt ?? title }] }, twitter: { card: "summary_large_image", title: `${title} | IFEM Education`, description, images: [image] } };
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event || !isValidEventRange(event.startsAt, event.endsAt)) notFound();
  const completeRegistration = isCompleteEventRegistration(event);
  const isPast = isPastEvent(event);
  const canonicalUrl = `${SITE_URL}/news-and-events/events/${slug}`;
  const eventSchema = { "@context": "https://schema.org", "@type": "Event", name: event.title, description: event.excerpt, startDate: event.startsAt, endDate: event.endsAt, eventStatus: `https://schema.org/${isPast ? "EventCompleted" : "EventScheduled"}`, eventAttendanceMode: `https://schema.org/${event.attendanceMode === "online" ? "OnlineEventAttendanceMode" : "OfflineEventAttendanceMode"}`, location: event.attendanceMode === "online" ? { "@type": "VirtualLocation", url: canonicalUrl } : { "@type": "Place", name: event.location }, image: event.coverImage?.url ? [event.coverImage.url] : undefined, organizer: { "@type": "Organization", name: "IFEM Education", url: SITE_URL }, url: canonicalUrl };
  const hostReady = Boolean(event.host?.name?.trim() && event.host.role?.trim());
  const partners = event.partnerUniversities?.filter((partner) => partner.name?.trim()) ?? [];
  const highlights = event.highlights?.filter((item) => item.trim()) ?? [];
  const whatToBring = event.whatToBring?.filter((item) => item.trim()) ?? [];
  const LocationIcon = event.attendanceMode === "online" ? Video : MapPin;

  return <div className="w-full"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} /><PageContentWrapper><NewsBackNav label="Back to events" /><section className="pb-14 md:pb-20"><div className="mx-auto max-w-5xl"><div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start"><div><div className="mb-6 flex items-center gap-4"><span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest ${isPast ? "bg-[#ede8df] text-[#5a5a5a]" : "bg-[#e8f3ec] text-[#1a5c34]"}`}>{isPast ? "Past event" : "Upcoming event"}</span><span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1a5c34]">{getEventFormatLabel(event.format)}</span></div><h1 className="font-serif text-4xl font-bold leading-[1.05] tracking-[-0.025em] text-charcoal md:text-6xl">{event.title}</h1><p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray">{event.excerpt}</p>{event.coverImage?.url ? <div className="relative mt-9 aspect-[16/10] overflow-hidden rounded-xl border border-[#e2e2de]"><Image src={event.coverImage.url} alt={event.coverImage.alt ?? ""} fill priority sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" /></div> : null}</div><aside className="border-y border-[#1a5c34]/20 bg-[#fafaf7] px-6 py-7"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1a5c34]">Event briefing</p><dl className="mt-6 space-y-5 text-sm"><div className="flex gap-3"><CalendarDays aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#1a5c34]" /><div><dt className="font-semibold text-charcoal">Date &amp; time</dt><dd className="mt-1 leading-relaxed text-gray"><time dateTime={event.startsAt}>{formatEventDate(event.startsAt)}</time><br />to <time dateTime={event.endsAt}>{formatEventDate(event.endsAt)}</time></dd></div></div><div className="flex gap-3"><LocationIcon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#1a5c34]" /><div><dt className="font-semibold text-charcoal">{event.attendanceMode === "online" ? "Join online" : "Location"}</dt><dd className="mt-1 leading-relaxed text-gray">{event.location}</dd></div></div><div className="flex gap-3"><Users aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#1a5c34]" /><div><dt className="font-semibold text-charcoal">Attendance</dt><dd className="mt-1 leading-relaxed text-gray">{event.availability?.trim() || attendanceLabel(event.attendance)}</dd></div></div></dl>{completeRegistration && !isPast ? <Link href={event.registrationUrl!} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex w-full items-center justify-center rounded-lg bg-[#1a5c34] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#154a2a] focus-ring">{event.registrationLabel}</Link> : null}</aside></div>{hostReady || partners.length > 0 || highlights.length > 0 || whatToBring.length > 0 ? <section aria-labelledby="at-event-heading" className="mt-12 border-y border-[#e2e2de] py-9 md:py-11"><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1a5c34]">Build your visit</p><h2 id="at-event-heading" className="font-serif text-3xl font-bold text-charcoal">What makes this worth your time</h2><div className="mt-7 grid gap-7 md:grid-cols-2">{hostReady ? <div><h3 className="font-sans text-sm font-bold text-charcoal">Your host</h3><p className="mt-2 text-sm leading-relaxed text-gray"><span className="font-semibold text-charcoal">{event.host!.name}</span> · {event.host!.role}</p></div> : null}{partners.length > 0 ? <div><h3 className="font-sans text-sm font-bold text-charcoal">Partner universities</h3><p className="mt-2 text-sm leading-relaxed text-gray">{partners.map((partner) => partner.name).join(", ")}</p></div> : null}{highlights.length > 0 ? <div><h3 className="font-sans text-sm font-bold text-charcoal">What to expect</h3><ul className="mt-3 space-y-2">{highlights.map((item) => <li key={item} className="flex gap-2 text-sm leading-relaxed text-gray"><Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#1a5c34]" />{item}</li>)}</ul></div> : null}{whatToBring.length > 0 ? <div><h3 className="font-sans text-sm font-bold text-charcoal">What to bring</h3><ul className="mt-3 space-y-2">{whatToBring.map((item) => <li key={item} className="flex gap-2 text-sm leading-relaxed text-gray"><Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#1a5c34]" />{item}</li>)}</ul></div> : null}</div></section> : null}<section className="mx-auto max-w-3xl py-14 md:py-20"><PortableText value={event.content} components={customPortableTextComponents} /></section></div></section><EventSpotlight event={event} /></PageContentWrapper></div>;
}
