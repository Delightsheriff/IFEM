"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  heading: string;
}

interface PrivacyNavProps {
  sections: NavItem[];
}

export function PrivacyNav({ sections }: PrivacyNavProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    if (typeof window === "undefined" || sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );

    const nodes: HTMLElement[] = [];
    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) { observer.observe(el); nodes.push(el); }
    }
    return () => { for (const el of nodes) observer.unobserve(el); observer.disconnect(); };
  }, [sections]);

  return (
    <aside className="hidden md:block">
      <nav className="sticky top-24" aria-label="Section navigation">

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-sage/20">
          <span className="block w-5 h-px bg-forest" aria-hidden="true" />
          <p className="text-[10px] font-semibold uppercase tracking-widest text-charcoal/45">
            Contents
          </p>
        </div>

        {/* Links */}
        <ul>
          {sections.map((s) => {
            const isActive = activeId === s.id;
            // Split "1. Information We Collect" → num "01", label "Information We Collect"
            const num = s.heading.match(/^(\d+)/)?.[1]?.padStart(2, "0") ?? "";
            const label = s.heading.replace(/^\d+\.\s*/, "");

            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group flex items-baseline gap-2.5 py-2 pl-3 pr-1 border-l-2 text-[12.5px] leading-snug transition-all duration-150 focus-ring",
                    isActive
                      ? "border-forest text-forest font-medium"
                      : "border-transparent text-charcoal/50 hover:border-sage/50 hover:text-charcoal/80",
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-[10px] tabular-nums shrink-0 transition-colors",
                      isActive ? "text-forest/60" : "text-charcoal/25 group-hover:text-charcoal/35",
                    )}
                  >
                    {num}
                  </span>
                  <span>{label}</span>
                </a>
              </li>
            );
          })}
        </ul>

      </nav>
    </aside>
  );
}
