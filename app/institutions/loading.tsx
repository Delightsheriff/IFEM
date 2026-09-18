import { BreadcrumbSkeleton, StatsBarSkeleton, UniversityCardSkeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
      <div className="min-h-screen w-full bg-background">
        <BreadcrumbSkeleton />

        {/* Page hero skeleton */}
        <div className="bg-[#fafaf7] px-4 py-20 md:px-6 lg:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="animate-pulse rounded-md bg-sage/20 mb-3 h-3 w-16" />
            <div className="animate-pulse rounded-md bg-sage/20 mb-3 h-9 w-2/3 max-w-xl" />
            <div className="animate-pulse rounded-md bg-sage/20 h-4 w-full max-w-lg" />
          </div>
        </div>

        <StatsBarSkeleton />

        {/* Explorer grid */}
        <section className="bg-[#f3f3ef] px-4 py-16 md:px-6 lg:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="animate-pulse rounded-md bg-sage/20 mb-8 h-9 w-72" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {[...Array(10)].map((_, i) => (
                <UniversityCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>
      </div>
  );
}