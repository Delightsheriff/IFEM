import { ViewTransition } from "react";
import {
  BreadcrumbSkeleton,
  CardSkeleton,
  ContentPageHeroSkeleton,
  ProfileCardSkeleton,
  RowSkeleton,
  SectionHeadingSkeleton,
} from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <ViewTransition exit="slide-down">
      <div className="min-h-screen w-full bg-background">
        <BreadcrumbSkeleton />
        <ContentPageHeroSkeleton />

        {/* Contact form + brief */}
        <section className="px-4 py-16 md:px-6 lg:px-8 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-start">
            <CardSkeleton className="p-8 md:p-10" />
            <div className="surface-card rounded-xl p-8">
              <div className="animate-pulse rounded-md bg-sage/20 h-4 w-1/3" />
              <div className="mt-5 space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse rounded-md bg-sage/20 h-5 w-full" />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="bg-[#f3f3ef] px-4 py-16 md:px-6 lg:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeadingSkeleton />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <ProfileCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Offices */}
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