"use client";

/**
 * Animation primitives — the single source of truth for all motion in the codebase.
 *
 * FadeUp       — fade + slide up on scroll (or on mount with mount={true})
 * FadeIn       — fade only, no translation
 * Stagger      — container that staggers its direct children
 * StaggerChild — child inside a <Stagger>
 *
 * All viewport animations fire once and start 60px before the element enters view.
 * All components respect prefers-reduced-motion by rendering without animation.
 */

import { motion, useReducedMotion, Variants } from "framer-motion";
import React from "react";

// ── Shared constants ────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const VIEWPORT = { once: true, margin: "-60px" } as const;

// ── Variants ────────────────────────────────────────────────────────
const fadeUpViewport: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const fadeInViewport: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

// ── Types ───────────────────────────────────────────────────────────
interface BaseProps {
  children: React.ReactNode;
  className?: string;
}

interface FadeProps extends BaseProps {
  /** Seconds to delay the animation */
  delay?: number;
  /** Animate immediately on mount instead of waiting for scroll */
  mount?: boolean;
}

// ── Components ──────────────────────────────────────────────────────

/** Fade up from below — scroll-triggered by default, or mount-triggered with mount={true} */
export function FadeUp({ children, className, delay = 0, mount = false }: FadeProps) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return <div className={className}>{children}</div>;

  if (mount) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    );
  }
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={fadeUpViewport}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/** Fade in without vertical movement */
export function FadeIn({ children, className, delay = 0, mount = false }: FadeProps) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return <div className={className}>{children}</div>;

  if (mount) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    );
  }
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={fadeInViewport}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/** Wrap a grid or list — direct children animate in with a stagger delay */
export function Stagger({ children, className }: BaseProps) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

/** Direct child of <Stagger> — receives its delay from the parent */
export function StaggerChild({ children, className }: BaseProps) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} variants={staggerChild}>
      {children}
    </motion.div>
  );
}
