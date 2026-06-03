"use client";

import { useEffect, useState } from "react";

/**
 * Slim reading-progress bar pinned beneath the sticky header.
 *
 * Tracks scroll position against document height and shows a forest-coloured
 * fill that grows from 0 → 100% as the reader moves through the article.
 *
 * No JS executes until after hydration, and the bar is rendered visible
 * at 0% on first paint so the layout never shifts.
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let raf = 0;
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0;
      setProgress(pct);
      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="sticky top-16 z-30 h-0.5 bg-transparent pointer-events-none"
    >
      <div
        className="h-full bg-forest origin-left transition-transform duration-75 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
