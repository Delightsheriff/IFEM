import {
  BreadcrumbSkeleton,
  ContentPageHeroSkeleton,
  MediaCardSkeleton,
  SectionHeadingSkeleton,
} from "@/components/ui/skeleton";

export default function Loading() {
  return (
      <div className="min-h-screen w-full bg-background">
        <BreadcrumbSkeleton />
        <ContentPageHeroSkeleton />

        {/* Featured + grid */}
        <section className="bg-[#fafaf7] px-4 py-16 md:px-6 lg:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeadingSkeleton />
            <div className="grid gap-4 md:grid-cols-2">
              <MediaCardSkeleton tall />
              <div className="grid gap-4 md:row-span-1">
                <MediaCardSkeleton />
                <MediaCardSkeleton />
                <MediaCardSkeleton />
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}