import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function NewsBackNav({ label = "Back to News & Events" }: { label?: string }) {
  return <div className="mb-8 border-b border-[#e2e2de] pb-4 md:mb-12"><div className="mx-auto max-w-3xl"><Link href="/news-and-events" className="inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-[#1a5c34] transition-all hover:gap-3 focus-ring"><ArrowLeft aria-hidden="true" className="h-4 w-4" />{label}</Link></div></div>;
}
