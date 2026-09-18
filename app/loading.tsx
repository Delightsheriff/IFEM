import { BreadcrumbSkeleton, ContentPageHeroSkeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
      <div className="min-h-screen w-full bg-background">
        <BreadcrumbSkeleton />
        <ContentPageHeroSkeleton />
      </div>
  );
}