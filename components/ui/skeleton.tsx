import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

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

export function CardSkeleton() {
  return (
    <div className="bg-white border border-sage/30 rounded-xl p-6">
      <Skeleton className="h-4 w-20 mb-4" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

export function GuideCardSkeleton() {
  return (
    <div className="bg-white border border-sage/30 rounded-lg p-6">
      <div className="flex items-start justify-between gap-4 mb-3">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-7 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

export function UniversityCardSkeleton() {
  return (
    <div className="bg-white border border-sage/20 rounded-xl p-5">
      <Skeleton className="h-20 w-full rounded-lg mb-3" />
      <Skeleton className="h-4 w-3/4 mx-auto" />
    </div>
  );
}

export function StatsBarSkeleton() {
  return (
    <div className="py-10 px-4 bg-forest">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
