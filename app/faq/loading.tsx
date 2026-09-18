import { ViewTransition } from "react";
import {
  AccordionSkeleton,
  BreadcrumbSkeleton,
  ContentPageHeroSkeleton,
  SectionHeadingSkeleton,
} from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <ViewTransition exit="slide-down">
      <div className="min-h-screen w-full bg-background">
        <BreadcrumbSkeleton />
        <ContentPageHeroSkeleton />

        <section className="px-4 py-16 md:px-6 lg:px-8 md:py-24">
          <div className="mx-auto max-w-3xl">
            <SectionHeadingSkeleton />
            <div className="space-y-3">
              {[...Array(8)].map((_, i) => (
                <AccordionSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </ViewTransition>
  );
}