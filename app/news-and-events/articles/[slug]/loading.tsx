import { ViewTransition } from "react";
import { BreadcrumbSkeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <ViewTransition exit="slide-down">
      <div className="min-h-screen w-full bg-background">
        <BreadcrumbSkeleton />

        {/* Article header */}
        <div className="bg-white px-4 pb-4 pt-12 md:px-6 lg:px-8 md:pt-16">
          <div className="mx-auto max-w-3xl">
            <div className="animate-pulse rounded-md bg-sage/20 mb-6 h-10 w-16" />
            <div className="animate-pulse rounded-md bg-sage/20 mb-3 h-10 w-full" />
            <div className="animate-pulse rounded-md bg-sage/20 mb-3 h-10 w-4/5" />
            <div className="animate-pulse rounded-md bg-sage/20 mt-6 h-4 w-1/2" />
          </div>
        </div>

        {/* Cover */}
        <div className="px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="animate-pulse h-[320px] w-full rounded-xl bg-sage/15" />
          </div>
        </div>

        {/* Prose body */}
        <article className="mx-auto max-w-3xl px-4 py-10 md:px-0">
          <div className="space-y-3">
            <div className="animate-pulse rounded-md bg-sage/20 h-4 w-full" />
            <div className="animate-pulse rounded-md bg-sage/20 h-4 w-full" />
            <div className="animate-pulse rounded-md bg-sage/20 h-4 w-11/12" />
            <div className="animate-pulse rounded-md bg-sage/20 h-7 w-1/2 pt-4" />
            <div className="animate-pulse rounded-md bg-sage/20 h-4 w-full" />
            <div className="animate-pulse rounded-md bg-sage/20 h-4 w-full" />
            <div className="animate-pulse rounded-md bg-sage/20 h-4 w-2/3" />
            <div className="animate-pulse rounded-md bg-sage/20 h-7 w-1/3 pt-4" />
            <div className="animate-pulse rounded-md bg-sage/20 h-4 w-full" />
            <div className="animate-pulse rounded-md bg-sage/20 h-4 w-10/12" />
          </div>
        </article>

        {/* Related */}
        <section className="px-4 py-10 md:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="animate-pulse rounded-md bg-sage/20 mb-6 h-8 w-48" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="surface-card rounded-xl p-6">
                  <div className="animate-pulse rounded-md bg-sage/20 mb-3 h-4 w-20" />
                  <div className="animate-pulse rounded-md bg-sage/20 mb-2 h-6 w-3/4" />
                  <div className="animate-pulse rounded-md bg-sage/20 h-4 w-full" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </ViewTransition>
  );
}