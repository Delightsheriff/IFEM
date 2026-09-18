import { ViewTransition } from "react";
import { BreadcrumbSkeleton, ContentPageHeroSkeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <ViewTransition exit="slide-down">
      <div className="min-h-screen w-full bg-background">
        <BreadcrumbSkeleton />
        <ContentPageHeroSkeleton />
      </div>
    </ViewTransition>
  );
}