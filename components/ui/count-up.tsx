"use client";

import { useEffect, useRef } from "react";

interface CountUpProps {
  to: number;
  suffix?: string;
  duration?: number; // seconds
  className?: string;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function CountUp({ to, suffix = "", duration = 1.8, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.textContent = `${to}${suffix}`;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const ms = duration * 1000;

        function tick(now: number) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / ms, 1);
          const value = Math.round(easeOutCubic(progress) * to);
          el!.textContent = `${value}${suffix}`;
          if (progress < 1) {
            rafRef.current = requestAnimationFrame(tick);
          }
        }

        rafRef.current = requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [to, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
