import type { SiteStats } from "@/interface/sanity";

/**
 * Fallback values used when the Sanity `siteStats` singleton is
 * unavailable or hasn't been seeded yet. Editors should set the real
 * numbers in the Studio under "Site Statistics" — these are the floor
 * values that ship if that singleton is missing.
 *
 * Living in one place means a number tick-up only requires editing this
 * file (and the Studio document) — not five marketing pages.
 */
export const DEFAULT_STATS: SiteStats = {
  studentsPlaced: 1800,
  partnerUniversities: 40,
  yearsInService: 4,
  visaSuccessRate: 99.6,
};

/**
 * Merges a (possibly null) Sanity `siteStats` document with the defaults
 * so every field is guaranteed to be present, with the CMS taking
 * precedence for any value it provides.
 */
export function resolveSiteStats(stats: SiteStats | null | undefined): SiteStats {
  if (!stats) return DEFAULT_STATS;
  return {
    studentsPlaced: stats.studentsPlaced ?? DEFAULT_STATS.studentsPlaced,
    partnerUniversities: stats.partnerUniversities ?? DEFAULT_STATS.partnerUniversities,
    yearsInService: stats.yearsInService ?? DEFAULT_STATS.yearsInService,
    visaSuccessRate: stats.visaSuccessRate ?? DEFAULT_STATS.visaSuccessRate,
  };
}
