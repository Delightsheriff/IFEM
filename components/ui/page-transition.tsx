import { ViewTransition } from "react";

/**
 * Route-level view transition for every page.
 *
 * Maps nav direction tags (set via `transitionTypes` on `next/link`) to the
 * animation recipes in globals.css:
 *   - nav-forward  → slide in from the right (hierarchical: list → detail)
 *   - nav-back     → slide in from the left
 *   - nav-lateral  → cross-fade (sibling top-level navigation)
 *   - untagged     → no animation (default: none)
 *
 * The wrapper lives in each page (not the layout) so enter/exit actually fire
 * on route changes. Skeleton reveals in loading.tsx use their own simple
 * string-prop ViewTransition and never collide with these type-keyed ones.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition
      enter={{
        "nav-forward": "slide-from-right",
        "nav-back": "slide-from-left",
        "nav-lateral": "fade-in",
        default: "none",
      }}
      exit={{
        "nav-forward": "slide-to-left",
        "nav-back": "slide-to-right",
        "nav-lateral": "fade-out",
        default: "none",
      }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}