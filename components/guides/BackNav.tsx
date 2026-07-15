import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function BackNav() {
  return (
    <div className="pb-4 mb-8 border-b border-[#e2e2de] md:mb-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/guides"
          className="inline-flex items-center gap-2 text-[#1a5c34] hover:gap-3 transition-all text-sm font-semibold focus-ring rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Guides
        </Link>
      </div>
    </div>
  );
}
