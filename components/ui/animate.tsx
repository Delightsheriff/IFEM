/**
 * Animation primitives — the single source of truth for all motion.
 *
 * Same API as before (FadeUp, FadeIn, Stagger, StaggerChild) but powered
 * entirely by CSS keyframes via `data-reveal` attributes in globals.css.
 * No IntersectionObserver and no framer-motion. Content is always
 * rendered visible by default; if CSS animations don't run (or
 * prefers-reduced-motion is set), the user just sees the static content
 * — nothing can get stuck invisible.
 *
 * - `mount` prop is kept for API compatibility but is a no-op now:
 *   every reveal already fires on first paint.
 * - Stagger walks its direct children, clones them, and injects a
 *   per-child `--reveal-delay` CSS custom property so each item enters
 *   slightly later than the previous.
 *
 * All four primitives are plain server components (no "use client")
 * which removes them from the client bundle entirely.
 */

import React from "react";
import { cn } from "@/lib/utils";

const STAGGER_GAP_MS = 80;

interface BaseProps {
  children: React.ReactNode;
  className?: string;
}

interface FadeProps extends BaseProps {
  /** Seconds to delay the animation start. */
  delay?: number;
  /** Kept for backwards-compat; reveals already fire on mount. */
  mount?: boolean;
}

function delayStyle(delay?: number): React.CSSProperties | undefined {
  return delay
    ? ({ ["--reveal-delay" as string]: `${delay}s` } as React.CSSProperties)
    : undefined;
}

export function FadeUp({ children, className, delay = 0 }: FadeProps) {
  return (
    <div className={className} data-reveal="fade-up" style={delayStyle(delay)}>
      {children}
    </div>
  );
}

export function FadeIn({ children, className, delay = 0 }: FadeProps) {
  return (
    <div className={className} data-reveal="fade-in" style={delayStyle(delay)}>
      {children}
    </div>
  );
}

/**
 * Container that staggers its direct children's entrance. Each direct
 * child gets a `--reveal-delay` custom property injected via cloneElement.
 * The container itself renders plain — it does not animate, only its
 * children do.
 */
export function Stagger({ children, className }: BaseProps) {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        const childProps = child.props as {
          style?: React.CSSProperties;
        };
        const mergedStyle: React.CSSProperties = {
          ...(childProps.style ?? {}),
          ["--reveal-delay" as string]: `${(index * STAGGER_GAP_MS) / 1000}s`,
        };
        return React.cloneElement(child, {
          style: mergedStyle,
        } as React.HTMLAttributes<HTMLElement>);
      })}
    </div>
  );
}

/**
 * Direct child of <Stagger>. Renders as a div with the same fade-up
 * entrance, and the parent's cloneElement merges a per-index delay
 * onto its style.
 */
export function StaggerChild({
  children,
  className,
  style,
}: BaseProps & { style?: React.CSSProperties }) {
  return (
    <div
      className={cn(className)}
      data-reveal="stagger-item"
      style={style}
    >
      {children}
    </div>
  );
}
