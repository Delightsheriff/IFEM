import { describe, expect, it } from "vitest";
import { DEFAULT_STATS, resolveSiteStats } from "@/lib/site-stats";
import type { SiteStats } from "@/interface/sanity";

describe("resolveSiteStats", () => {
  it("falls back to defaults when the CMS document is absent", () => {
    expect(resolveSiteStats(null)).toEqual(DEFAULT_STATS);
    expect(resolveSiteStats(undefined)).toEqual(DEFAULT_STATS);
  });

  it("lets the CMS override individual fields", () => {
    const partial: Partial<SiteStats> = { studentsPlaced: 2400 };
    expect(resolveSiteStats(partial as SiteStats)).toEqual({
      ...DEFAULT_STATS,
      studentsPlaced: 2400,
    });
  });

  it("fills missing CMS fields from defaults", () => {
    const partial: Partial<SiteStats> = { visaSuccessRate: 99.8 };
    const resolved = resolveSiteStats(partial as SiteStats);
    expect(resolved.partnerUniversities).toBe(DEFAULT_STATS.partnerUniversities);
    expect(resolved.visaSuccessRate).toBe(99.8);
  });
});