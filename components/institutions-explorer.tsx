"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { Search, X, ArrowRight } from "lucide-react";
import { UKUniversity } from "@/interface/sanity";
import { UniversityCard } from "@/components/ui/university-card";
import { EmptyState } from "@/components/empty-state";

interface InstitutionsExplorerProps {
  universities: UKUniversity[];
}

/**
 * Client-side search over the partner-university list.
 *
 * The CMS only stores name + logo today, so we deliberately don't promise
 * Russell-Group / region / level filters we can't fulfil. When those fields
 * exist on the schema, drop new filter chips above the grid.
 */
export function InstitutionsExplorer({ universities }: InstitutionsExplorerProps) {
  const inputId = useId();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return universities;
    return universities.filter((u) => u.name.toLowerCase().includes(q));
  }, [universities, query]);

  const total = universities.length;
  const visible = filtered.length;

  return (
    <div>
      {/* Search + counter */}
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex-1 max-w-md">
          <label
            htmlFor={inputId}
            className="block text-[11px] font-semibold uppercase tracking-widest text-forest mb-2"
          >
            Search institutions
          </label>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray/60"
              aria-hidden="true"
            />
            <input
              id={inputId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try “Liverpool” or “Coventry”"
              autoComplete="off"
              className="w-full bg-white border border-sage/30 rounded-sm py-3 pl-10 pr-10 text-sm text-charcoal placeholder:text-gray/50 focus:outline-none focus:border-forest focus-ring"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray hover:text-charcoal focus-ring rounded-sm tap-target"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <p
          className="text-xs text-gray font-medium"
          aria-live="polite"
          aria-atomic="true"
        >
          {query ? (
            <>
              Showing <span className="text-charcoal font-semibold">{visible}</span> of{" "}
              <span className="text-charcoal font-semibold">{total}</span> institutions
            </>
          ) : (
            <>
              <span className="text-charcoal font-semibold">{total}</span> partner institutions
            </>
          )}
        </p>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((uni) => (
            <Link
              key={uni._id}
              href={`/contact?university=${encodeURIComponent(uni.name)}`}
              className="group block rounded-sm focus:outline-none focus-ring"
              aria-label={`Enquire about ${uni.name}`}
            >
              <UniversityCard university={uni} />
              <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest text-forest opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100 transition-opacity">
                Enquire
                <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Search className="w-6 h-6" />}
          title="No institutions match that search"
          description={`We couldn't find a university matching “${query}”. Try a shorter term, or contact our counsellors — we have 40+ partners and can point you to the right one.`}
          ctaText="Clear search"
          onCta={() => setQuery("")}
          className="min-h-72"
        />
      )}
    </div>
  );
}
