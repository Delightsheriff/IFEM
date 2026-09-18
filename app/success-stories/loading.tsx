import { ViewTransition } from "react";
import {
  BreadcrumbSkeleton,
  ContentPageHeroSkeleton,
  ProfileCardSkeleton,
  RowSkeleton,
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

        {/* Story cards */}
        <section className="bg-[#fafaf7] px-4 py-16 md:px-6 lg:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeadingSkeleton />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <ProfileCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Programs */}
        <section className="px-4 py-16 md:px-6 lg:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeadingSkeleton />
            <div className="grid gap-4 md:grid-cols-2">
              {[...Array(2)].map((_, i) => (
                <RowSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </ViewTransition>
  );
}