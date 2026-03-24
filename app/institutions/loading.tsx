import { UniversityCardSkeleton, Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-cream pt-32 pb-16 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Hero skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="h-8 w-64 mx-auto mb-6" />
          <Skeleton className="h-14 w-full max-w-2xl mx-auto mb-4" />
          <Skeleton className="h-6 w-full max-w-xl mx-auto" />
        </div>

        {/* Stats bar skeleton */}
        <div className="py-10 px-4 bg-forest mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <Skeleton className="w-6 h-6 rounded-full bg-white/20" />
                  <Skeleton className="h-8 w-12 bg-white/20" />
                  <Skeleton className="h-4 w-24 bg-white/20" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Universities grid skeleton */}
        <div className="mb-12">
          <Skeleton className="h-10 w-64 mx-auto mb-8" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <UniversityCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
