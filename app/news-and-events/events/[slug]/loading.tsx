import { BreadcrumbSkeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
      <div className="min-h-screen w-full bg-background">
        <BreadcrumbSkeleton />

        {/* Event hero */}
        <div className="bg-white px-4 pb-8 pt-12 md:px-6 lg:px-8 md:pt-16">
          <div className="mx-auto max-w-7xl">
            <div className="animate-pulse rounded-md bg-sage/20 mb-6 h-10 w-16" />
            <div className="animate-pulse rounded-md bg-sage/20 mb-3 h-11 w-full max-w-3xl" />
            <div className="animate-pulse rounded-md bg-sage/20 h-11 w-2/3 max-w-2xl" />
          </div>
        </div>

        {/* Body + aside */}
        <div className="px-4 py-8 md:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {/* Date / format card */}
              <div className="surface-card mb-8 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-xl p-5">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="animate-pulse rounded-md bg-sage/20 h-5 w-5" />
                    <div className="animate-pulse rounded-md bg-sage/20 h-4 w-24" />
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <div className="animate-pulse rounded-md bg-sage/20 h-5 w-full" />
                <div className="animate-pulse rounded-md bg-sage/20 h-5 w-full" />
                <div className="animate-pulse rounded-md bg-sage/20 h-5 w-2/3" />
                <div className="animate-pulse rounded-md bg-sage/20 h-7 w-1/2 pt-4" />
                <div className="animate-pulse rounded-md bg-sage/20 h-5 w-full" />
                <div className="animate-pulse rounded-md bg-sage/20 h-5 w-10/12" />
              </div>
            </div>
            <aside className="space-y-4">
              <div className="surface-card rounded-xl p-6">
                <div className="animate-pulse rounded-md bg-sage/20 mb-4 h-4 w-1/2" />
                <div className="animate-pulse rounded-md bg-sage/20 h-12 w-full" />
              </div>
              <div className="surface-card rounded-xl p-6">
                <div className="animate-pulse rounded-md bg-sage/20 mb-4 h-4 w-1/2" />
                <div className="animate-pulse rounded-md bg-sage/20 mb-2 h-4 w-full" />
                <div className="animate-pulse rounded-md bg-sage/20 h-4 w-3/4" />
              </div>
            </aside>
          </div>
        </div>
      </div>
  );
}