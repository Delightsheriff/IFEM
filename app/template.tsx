import { PageTransition } from "@/components/ui/page-transition";

/**
 * Templates remount on every navigation (unlike layouts, which persist), so
 * this is the single place where route-level view transitions fire for every
 * page. Direction tags come from `transitionTypes` on individual links.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}