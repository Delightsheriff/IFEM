import {
  BreadcrumbSkeleton,
  ContentPageHeroSkeleton,
  MediaCardSkeleton,
  RowSkeleton,
  SectionHeadingSkeleton,
} from "@/components/ui/skeleton";

export default function Loading() {
  return (
      <div className="min-h-screen w-full bg-background">
        <BreadcrumbSkeleton />
        <ContentPageHeroSkeleton />

        {/* Upcoming events */}
        <section className="bg-white px-4 py-16 md:px-6 lg:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeadingSkeleton />
            <div className="grid gap-8 md:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-5">
                  <div className="surface-card flex h-24 w-24 shrink-0 flex-col items-center justify-center gap-1 rounded-xl p-3">
                    <div className="animate-pulse rounded-md bg-sage/20 h-3 w-10" />
                    <div className="animate-pulse rounded-md bg-sage/20 h-7 w-8" />
                  </div>
                  <div className="flex-1 space-y-2 pt-2">
                    <div className="animate-pulse rounded-md bg-sage/20 h-3 w-16" />
                    <div className="animate-pulse rounded-md bg-sage/20 h-6 w-full" />
                    <div className="animate-pulse rounded-md bg-sage/20 h-4 w-3/4" />
                    <div className="animate-pulse rounded-md bg-sage/20 h-9 w-28" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Event spotlights */}
        <section className="bg-white px-4 py-16 md:px-6 lg:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeadingSkeleton />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <MediaCardSkeleton key={i} tall />
              ))}
            </div>
          </div>
        </section>

        {/* Past events */}
        <section className="bg-[#fafaf7] px-4 py-16 md:px-6 lg:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeadingSkeleton />
            <div className="grid gap-3 md:grid-cols-2">
              {[...Array(4)].map((_, i) => (
                <RowSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>
      </div>
  );
}