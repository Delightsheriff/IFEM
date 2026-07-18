import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

export function EmptyNewsEventsState() {
  return (
    <div className="mx-auto max-w-2xl py-20 text-center" data-reveal="fade-up">
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f3ec]">
        <CalendarDays aria-hidden="true" className="h-6 w-6 text-[#1a5c34]" />
      </div>
      <div className="mx-auto mb-6 h-px w-8 bg-[#1a5c34]" aria-hidden="true" />
      <h2 className="mb-3 font-sans text-2xl font-bold text-[#111111]">News &amp; Events Coming Soon</h2>
      <p className="mx-auto mb-8 max-w-md text-[14px] leading-relaxed text-[#7a7a7a]">
        We&apos;re preparing new UK study updates and events. Speak with a counsellor now and we&apos;ll help you plan your next step.
      </p>
      <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-[#1a5c34] px-6 py-3 text-[13.5px] font-semibold text-white transition-colors duration-200 hover:bg-[#154a2a] focus-ring">
        Contact a Counsellor
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </Link>
    </div>
  );
}
