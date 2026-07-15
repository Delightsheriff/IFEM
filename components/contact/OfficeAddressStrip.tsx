import type { Branch } from "@/interface/sanity";
import { MapPin, Phone } from "lucide-react";

interface OfficeAddressStripProps {
  branches: Branch[];
}

export function OfficeAddressStrip({ branches }: OfficeAddressStripProps) {
  if (branches.length === 0) return null;

  return (
    <section className="border-b border-[#e2e2de] bg-white pt-16">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-10 md:py-8">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
            <span className="h-px w-6 bg-[#1a5c34]" />
            Visit Our Offices
          </p>
          <a
            href="#branches"
            className="inline-flex items-center gap-1 self-start text-xs font-semibold text-[#1a5c34] hover:text-[#154a2a] transition-colors md:self-auto"
          >
            See maps &amp; directions
            <span aria-hidden="true">→</span>
          </a>
        </div>
        <div
          className={`grid gap-3 ${
            branches.length === 1
              ? "max-w-md"
              : branches.length === 2
                ? "max-w-3xl md:grid-cols-2"
                : "sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {branches.map((branch, i) => {
            const primaryPhone = branch.phones?.[0]?.number ?? branch.phone ?? null;
            return (
              <div
                key={branch._id}
                className="group flex items-start gap-3 rounded-xl border border-[#e2e2de] bg-[#fafaf7] p-4 transition-all duration-200 hover:border-[#1a5c34]/25 hover:bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
                data-reveal="fade-up"
                style={{ "--reveal-delay": `${i * 0.06}s` } as React.CSSProperties}
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e8f3ec] transition-colors duration-200 group-hover:bg-[#1a5c34]">
                  <MapPin className="h-3.5 w-3.5 text-[#1a5c34] transition-colors duration-200 group-hover:text-white" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#7a7a7a]">
                      {branch.name}
                    </p>
                    {branch.type === "hq" && (
                      <span className="rounded-full border border-[#c9a465]/40 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest text-[#c9a465] leading-none">
                        HQ
                      </span>
                    )}
                  </div>
                  {branch.address && (
                    <p className="mb-0.5 text-sm font-medium leading-snug text-[#111111]">
                      {branch.address}
                    </p>
                  )}
                  <p className="text-xs text-[#7a7a7a]">{branch.city}, {branch.country}</p>
                  {primaryPhone && (
                    <a
                      href={`tel:${primaryPhone.replace(/\s/g, "")}`}
                      className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#1a5c34] hover:text-[#154a2a] transition-colors"
                    >
                      <Phone className="h-3 w-3" aria-hidden="true" />
                      {primaryPhone}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
