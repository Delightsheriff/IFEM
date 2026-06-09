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

/**
 * Two-in-one navigation for /privacy:
 *  - Desktop (md+): a sticky vertical list with an active-section
 *    highlight driven by IntersectionObserver.
 *  - Mobile (<md): a sticky-bottom <select> "Jump to" picker so the
 *    user can teleport around the policy without scrolling past a
 *    wall of text.
 *
 * No links escape behind the sticky bar — the select is in the
 * normal flow on mobile so it doesn't cover the article footer.
 */
export function PrivacyNav({ sections }: PrivacyNavProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    if (typeof window === "undefined" || sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // The section closest to the top of the visible area wins.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: 0,
      },
    );

    const nodes: HTMLElement[] = [];
    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) {
        observer.observe(el);
        nodes.push(el);
      }
    }
    return () => {
      for (const el of nodes) observer.unobserve(el);
      observer.disconnect();
    };
  }, [sections]);

  return (
    <>
      {/* Desktop sticky sidebar — visible md+ only */}
      <aside className="hidden md:block">
        <nav className="sticky top-24" aria-label="Section navigation">
          <p className="text-[10px] uppercase tracking-widest text-gray/60 font-semibold mb-4">
            Contents
          </p>
          <ul className="space-y-1">
            {sections.map((s) => {
              const isActive = activeId === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "text-xs block py-1 border-l-2 pl-3 transition-colors focus-ring rounded-sm",
                      isActive
                        ? "text-forest-deep font-semibold border-forest"
                        : "text-gray border-transparent hover:text-forest hover:border-forest/50",
                    )}
                  >
                    {s.heading}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
