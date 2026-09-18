import { ViewTransition } from "react";
import {
  BreadcrumbSkeleton,
  CardSkeleton,
  ContentPageHeroSkeleton,
  ProfileCardSkeleton,
  SectionHeadingSkeleton,
  StatsBarSkeleton,
} from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <ViewTransition exit="slide-down">
      <div className="min-h-screen w-full bg-background">
        <BreadcrumbSkeleton />
        <ContentPageHeroSkeleton />
        <StatsBarSkeleton />

        {/* Difference + mission cards */}
        <section className="bg-white px-4 py-24 md:px-6 lg:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeadingSkeleton />
            <div className="grid gap-6 md:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
            <div className="mt-14">
              <CardSkeleton className="p-10 lg:p-12" />
            </div>
          </div>
        </section>

        {/* Founder portrait + team */}
        <section className="bg-white px-4 py-24 md:px-6 lg:px-8 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2 md:items-center">
            <div className="surface-card overflow-hidden rounded-2xl">
              <div className="animate-pulse h-[420px] w-full bg-sage/15" />
            </div>
            <div className="space-y-4">
              <div className="animate-pulse rounded-md bg-sage/20 h-3 w-24" />
              <div className="animate-pulse rounded-md bg-sage/20 h-9 w-3/4" />
              <div className="animate-pulse rounded-md bg-sage/20 h-4 w-1/2" />
              <div className="animate-pulse rounded-md bg-sage/20 h-28 w-full" />
            </div>
          </div>
        </section>

        {/* Team grid */}
        <section className="bg-[#f3f3ef] px-4 py-24 md:px-6 lg:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeadingSkeleton />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <ProfileCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </ViewTransition>
  );
}