import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function GuideCTASection() {
  return (
    <section className="py-14 md:py-20 px-8 bg-forest -mx-4 md:-mx-6 text-white text-center">
      <p className="font-sans text-[10px] font-semibold uppercase tracking-widest text-white/50 mb-4">
        Next Steps
      </p>
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
        Ready to Take Your Next Step?
      </h2>
      <p className="text-white/70 text-base mb-8 max-w-xl mx-auto leading-relaxed">
        Get personalised guidance from our education consultants to help
        you achieve your UK education goals — completely free.
      </p>
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 rounded-lg px-8 py-3.5 bg-white text-[#1a5c34] font-semibold text-sm tracking-wide hover:bg-[#fafaf7] transition-colors"
      >
        Schedule a Free Consultation
        <ArrowRight className="w-4 h-4" />
      </Link>
    </section>
  );
}
