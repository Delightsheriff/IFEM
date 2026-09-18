import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva("relative rounded-xl", {
  variants: {
    variant: {
      solid: "bg-white border border-sage/20",
      flat: "bg-white border border-sage/15",
      dark: "bg-white/[0.03] border border-white/8 text-white",
      cream: "bg-cream/50 border border-sage/20",
      glass:
        "bg-white/55 text-charcoal border border-white/60 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(17,17,17,0.04),0_1px_2px_rgba(17,17,17,0.06),0_12px_32px_rgba(17,17,17,0.08)]!",
      "glass-dark":
        "bg-white/10 text-white border border-white/18 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.24),inset_0_-1px_0_rgba(0,0,0,0.18),0_1px_2px_rgba(0,0,0,0.12),0_12px_32px_rgba(0,0,0,0.14)]!",
    },
    elevation: {
      none: "",
      sm: "[box-shadow:var(--shadow-card)]",
      md: "[box-shadow:var(--shadow-pop)]",
      lg: "[box-shadow:var(--shadow-deep)]",
    },
    interactive: {
      true: "transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-forest/30 hover:[box-shadow:var(--shadow-card-hover)]",
      false: "",
    },
    padding: {
      none: "",
      sm: "p-5",
      md: "p-6",
      lg: "p-8",
      xl: "p-10",
    },
  },
  defaultVariants: {
    variant: "solid",
    elevation: "sm",
    interactive: false,
    padding: "md",
  },
});

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

export function Card({
  className,
  variant,
  elevation,
  interactive,
  padding,
  ...props
}: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        cardVariants({ variant, elevation, interactive, padding }),
        interactive && "group",
        className
      )}
      {...props}
    />
  );
}

export { cardVariants };
export type { CardProps };
