"use client";

/**
 * Animation primitives — the single source of truth for all motion in the
 * codebase. Same API as before (FadeUp, FadeIn, Stagger, StaggerChild) but
 * now powered by a single shared IntersectionObserver + plain CSS
 * transitions instead of framer-motion. This removes ~180 KB of JS from
 * every page that uses scroll-triggered reveals (effectively every page).
 *
 * - `mount`-mode reveals fire immediately via a CSS animation.
 * - Scroll-mode reveals flip a `data-revealed="true"` attribute the first
 *   time the element crosses the viewport (`once` semantics).
 * - prefers-reduced-motion is respected via globals.css.
 *
 * SSR-friendly: the elements are rendered with the "hidden" data
 * attributes; the observer runs in useEffect and only flips reveals
 * after hydration. Stagger uses CSS custom properties to apply per-child
 * delays without per-child JavaScript.
 */

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const VIEWPORT_MARGIN = "0px 0px -60px 0px";
const STAGGER_GAP_MS = 80;

// ── Shared observer (one per page) ──────────────────────────────────
let sharedObserver: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (typeof window === "undefined") return null;
  if (sharedObserver) return sharedObserver;
  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).setAttribute("data-revealed", "true");
          sharedObserver?.unobserve(entry.target);
        }
      }
    },
    { rootMargin: VIEWPORT_MARGIN, threshold: 0.01 }
  );
  return sharedObserver;
}

function useRevealObserver<T extends HTMLElement>(active: boolean) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    if (!active) return;
    const el = ref.current;
    const obs = getObserver();
    if (!el || !obs) return;
    obs.observe(el);
    return () => obs.unobserve(el);
  }, [active]);
  return ref;
}

// ── Types ───────────────────────────────────────────────────────────
interface BaseProps {
  children: React.ReactNode;
  className?: string;
}

interface FadeProps extends BaseProps {
  /** Seconds to delay the animation. */
  delay?: number;
  /** Fire immediately on mount instead of waiting for scroll. */
  mount?: boolean;
}

function delayStyle(delay?: number): React.CSSProperties | undefined {
  return delay ? ({ ["--reveal-delay" as string]: `${delay}s` } as React.CSSProperties) : undefined;
}

// ── FadeUp ──────────────────────────────────────────────────────────
export function FadeUp({ children, className, delay = 0, mount = false }: FadeProps) {
  const ref = useRevealObserver<HTMLDivElement>(!mount);

  if (mount) {
    return (
      <div
        className={className}
        data-reveal-mount="true"
        style={delayStyle(delay)}
      >
        {children}
      </div>
    );
  }
  return (
    <div
      ref={ref}
      className={className}
      data-reveal="fade-up"
      style={delayStyle(delay)}
    >
      {children}
    </div>
  );
}

// ── FadeIn (no translate) ───────────────────────────────────────────
export function FadeIn({ children, className, delay = 0, mount = false }: FadeProps) {
  const ref = useRevealObserver<HTMLDivElement>(!mount);

  if (mount) {
    return (
      <div
        className={className}
        data-reveal-mount="true"
        style={delayStyle(delay)}
      >
        {children}
      </div>
    );
  }
  return (
    <div
      ref={ref}
      className={className}
      data-reveal="fade-in"
      style={delayStyle(delay)}
    >
      {children}
    </div>
  );
}

// ── Stagger ─────────────────────────────────────────────────────────
/**
 * Container that staggers its direct children's reveal. Each direct
 * child receives a computed `--reveal-delay` via inline style and gets
 * `data-reveal="stagger-item"` (handled by the CSS in globals.css).
 *
 * The container itself participates in the observer so direct children
 * don't each need their own observer — the parent flips revealed once,
 * and the staggered CSS delays do the rest.
 */
export function Stagger({ children, className }: BaseProps) {
  const ref = useRevealObserver<HTMLDivElement>(true);

  return (
    <div
      ref={ref}
      className={cn("[&>*[data-reveal=stagger-item]]:opacity-0", className)}
      data-stagger-root="true"
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        const existingStyle =
          ((child.props as { style?: React.CSSProperties }).style) ?? {};
        const childWithStagger = React.cloneElement(child, {
          style: {
            ...existingStyle,
            ["--reveal-delay" as string]: `${(index * STAGGER_GAP_MS) / 1000}s`,
          },
        } as React.HTMLAttributes<HTMLElement>);
        return childWithStagger;
      })}
    </div>
  );
}

/**
 * Direct child of <Stagger>. Renders with `data-reveal="stagger-item"`;
 * the parent observer flips its `data-revealed` flag once the container
 * is in view, and the CSS custom property handles per-child delay.
 */
export function StaggerChild({ children, className }: BaseProps) {
  // The Stagger parent observes its own container; this child reveals
  // when its closest revealed ancestor flips. We also wire up a local
  // observer fallback so a StaggerChild used outside a Stagger still
  // works.
  const ref = useRevealObserver<HTMLDivElement>(true);

  return (
    <div ref={ref} className={className} data-reveal="stagger-item">
      {children}
    </div>
  );
}
