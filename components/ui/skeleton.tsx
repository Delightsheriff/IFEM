import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

/** Base shimmer block. */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-sage/20",
        className
      )}
    />
  );
}

/* ── Shared structural pieces ────────────────────────────────────────── */

/** Eyebrow rule + label line (mirrors section eyebrow pattern). */
export function SkeletonEyebrow({ centered = false }: { centered?: boolean }) {
  return (
    <div className={cn("mb-3 flex items-center gap-2", centered && "justify-center")}>
      <Skeleton className="h-px w-6" />
      <Skeleton className="h-2.5 w-20" />
    </div>
  );
}

/** Huge heading (2 lines, serif-ish scale) + optional description line. */
export function SkeletonHeading({
  centered = false,
  description = true,
}: {
  centered?: boolean;
  description?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", centered && "mx-auto text-center")}>
      <Skeleton className={cn("mb-3 h-4 w-1/2", centered && "mx-auto")} />
      <Skeleton className={cn("h-9 w-full sm:w-3/4", centered && "mx-auto")} />
      <Skeleton className={cn("mt-2 h-9 w-2/3", centered && "mx-auto")} />
      {description && (
        <Skeleton className={cn("mt-4 h-4 w-full max-w-xl", centered && "mx-auto")} />
      )}
    </div>
  );
}

/** Content-page hero (eyebrow + big title lines + description), centered. */
export function ContentPageHeroSkeleton() {
  return (
    <div className="border-b border-[#e2e2de]/60 bg-[#fafaf7] px-4 py-20 md:px-6 lg:px-8 md:py-28">
      <div className="mx-auto max-w-7xl text-center">
        <SkeletonEyebrow centered />
        <div className="mx-auto mt-6 max-w-3xl">
          <Skeleton className="mx-auto mb-3 h-10 w-11/12 sm:w-3/4" />
          <Skeleton className="mx-auto h-10 w-3/5" />
        </div>
        <Skeleton className="mx-auto mt-6 h-4 w-full max-w-xl" />
        <Skeleton className="mx-auto mt-2 h-4 w-2/3 max-w-md" />
      </div>
    </div>
  );
}

/** Section heading block used above grids/lists. */
export function SectionHeadingSkeleton() {
  return (
    <div className="mb-14 max-w-2xl">
      <SkeletonEyebrow />
      <Skeleton className="mb-2 h-9 w-3/4" />
      <Skeleton className="h-9 w-1/2" />
      <Skeleton className="mt-4 h-4 w-full max-w-lg" />
    </div>
  );
}

/** Generic card surface with text lines (mirrors surface-card). */
export function CardSkeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("surface-card rounded-xl p-6", className)}>
      <Skeleton className="mb-4 h-4 w-20" />
      <Skeleton className="mb-2 h-6 w-3/4" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

/** Card with a media block on top (event/article cards). */
export function MediaCardSkeleton({ tall = false }: { tall?: boolean }) {
  return (
    <div className="surface-card overflow-hidden rounded-xl">
      <Skeleton className={cn("w-full rounded-none bg-sage/15", tall ? "h-52" : "h-40")} />
      <div className="p-6">
        <Skeleton className="mb-3 h-3 w-24" />
        <Skeleton className="mb-2 h-6 w-4/5" />
        <Skeleton className="mb-2 h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

/** Row item (past events / directory rows). */
export function RowSkeleton() {
  return (
    <div className="surface-card flex items-center gap-5 rounded-xl p-5">
      <Skeleton className="hidden h-16 w-14 shrink-0 rounded-lg sm:block" />
      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/3" />
      </div>
      <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
    </div>
  );
}

/** Profile / team card (portrait block + name + role). */
export function ProfileCardSkeleton() {
  return (
    <div className="surface-card overflow-hidden rounded-xl">
      <Skeleton className="h-56 w-full rounded-none bg-sage/15" />
      <div className="space-y-2 p-6">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}

/** Accordion item (FAQ). */
export function AccordionSkeleton() {
  return (
    <div className="surface-card rounded-xl p-5">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="mt-3 h-3 w-full" />
      <Skeleton className="mt-2 h-3 w-5/6" />
    </div>
  );
}

/** Dark stats banner skeleton. */
export function StatsBarSkeleton() {
  return (
    <div className="bg-[#0d3320] px-4 py-10 md:px-6 lg:px-8 md:py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <Skeleton className="h-8 w-16 bg-white/20" />
            <Skeleton className="h-3 w-24 bg-white/20" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Back-compat skins (surface-aligned) ─────────────────────────────── */

export function UniversityCardSkeleton() {
  return (
    <div className="surface-card rounded-xl p-5">
      <Skeleton className="mb-3 h-16 w-full rounded-lg" />
      <Skeleton className="mx-auto h-4 w-3/4" />
    </div>
  );
}

/** Breadcrumb bar skeleton (keeps layout from jumping under the header). */
export function BreadcrumbSkeleton() {
  return (
    <div className="border-b border-sage/10 bg-background">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 md:px-6 lg:px-8">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-3" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}