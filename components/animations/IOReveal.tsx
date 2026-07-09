"use client";
/**
 * IOReveal — IntersectionObserver-powered scroll reveal.
 *
 * Adds `.is-visible` to elements that have `.io-reveal` or `.io-fade`
 * when they enter the viewport. CSS in globals.css handles the actual
 * transition so no inline styles are injected and there is no flash of
 * invisible content (elements fall back to visible if JS is disabled or
 * if hydration is slow, because the CSS opacity-0 is only applied once
 * the component mounts).
 *
 * Usage:
 *   <IOReveal>
 *     <div className="io-reveal" style={{ "--io-delay": "0.1s" } as React.CSSProperties}>...</div>
 *     <div className="io-reveal" style={{ "--io-delay": "0.2s" } as React.CSSProperties}>...</div>
 *   </IOReveal>
 */
import React, { useEffect, useRef } from "react";

interface IORevealProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

export function IOReveal({
  children,
  className,
  threshold = 0.12,
  rootMargin = "0px 0px -60px 0px",
}: IORevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // Collect all .io-reveal and .io-fade children inside this container
    const targets = Array.from(
      container.querySelectorAll<HTMLElement>(".io-reveal, .io-fade")
    );
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * A single scroll-revealed element. Wraps any element with the io-reveal
 * class and an optional delay.
 */
export function RevealItem({
  children,
  className,
  delay = 0,
  variant = "fade-up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "fade-up" | "fade";
}) {
  const cls = variant === "fade" ? "io-fade" : "io-reveal";
  return (
    <div
      className={`${cls}${className ? ` ${className}` : ""}`}
      style={delay > 0 ? ({ "--io-delay": `${delay}s` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
