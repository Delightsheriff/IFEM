import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 font-semibold uppercase tracking-widest whitespace-nowrap",
  {
    variants: {
      variant: {
        hq: "border border-terracotta/30 bg-terracotta/10 text-terracotta",
        accent: "border border-forest/30 bg-forest/10 text-forest",
        muted: "border border-sage/30 bg-cream text-charcoal/70",
        dark: "border border-white/15 bg-white/5 text-white/80",
      },
      size: {
        sm: "px-1.5 py-0.5 text-[9px]",
        md: "px-2 py-1 text-[10px]",
        lg: "px-3 py-1.5 text-xs",
      },
    },
    defaultVariants: {
      variant: "muted",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

export { badgeVariants };
