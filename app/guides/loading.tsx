import { GuideCardSkeleton, Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-cream pt-32 pb-16 px-4">
      <div className="mx-auto max-w-3xl">
        {/* Hero skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="h-4 w-48 mx-auto mb-4" />
          <Skeleton className="h-12 w-80 mx-auto mb-4" />
          <Skeleton className="h-6 w-full max-w-md mx-auto" />
        </div>

        {/* Guides list skeleton */}
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <GuideCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
