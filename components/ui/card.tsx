import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva("relative bg-white", {
  variants: {
    variant: {
      solid: "border border-sage/20",
      flat: "border border-sage/15",
      dark: "border border-white/8 bg-white/[0.03] text-white",
      cream: "border border-sage/20 bg-cream/50",
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
