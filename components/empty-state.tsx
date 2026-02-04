"use client";

import React from "react";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  ctaText?: string;
  onCta?: () => void;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  ctaText,
  onCta,
  className,
}: EmptyStateProps) {
  return (
    <Empty className={`border-sage/20 bg-sage/5 ${className}`}>
      <EmptyHeader>
        {icon && (
          <EmptyMedia variant="icon" className="bg-forest/10 text-forest">
            {icon}
          </EmptyMedia>
        )}
        <EmptyTitle className="font-serif text-xl font-semibold text-charcoal">
          {title}
        </EmptyTitle>
        <EmptyDescription className="text-gray">{description}</EmptyDescription>
      </EmptyHeader>
      {ctaText && onCta && (
        <EmptyContent>
          <button
            onClick={onCta}
            className="mt-4 inline-flex items-center justify-center rounded-md bg-forest px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-forest/90"
          >
            {ctaText}
          </button>
        </EmptyContent>
      )}
    </Empty>
  );
}
