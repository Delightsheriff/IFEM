import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";

export function EmptyGuidesState() {
  return (
    <div className="mx-auto max-w-2xl py-20 text-center" data-reveal="fade-up">
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f3ec]">
        <BookOpen aria-hidden="true" className="h-6 w-6 text-[#1a5c34]" />
      </div>
      <div className="mx-auto mb-6 h-px w-8 bg-[#1a5c34]" aria-hidden="true" />
      <h2 className="mb-3 font-sans text-2xl font-bold text-[#111111]">
        Guides Coming Soon
      </h2>
      <p className="mx-auto mb-8 max-w-sm text-[14px] leading-relaxed text-[#7a7a7a]">
        Our counsellors are currently writing expert guides for your UK education journey.
        Check back soon — or speak to a counsellor directly today.
      </p>
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 rounded-lg bg-[#1a5c34] px-6 py-3 text-[13.5px] font-semibold text-white transition-colors duration-200 hover:bg-[#154a2a]"
      >
        Contact a Counsellor
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </Link>
    </div>
  );
}
