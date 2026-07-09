import { cn } from "@/lib/utils";

interface SectionEyebrowProps {
  children: React.ReactNode;
  align?: "left" | "center";
  tone?: "forest" | "terracotta" | "sage" | "white";
  className?: string;
}

const toneMap = {
  forest: { rule: "bg-[#1a5c34]", text: "text-[#1a5c34]" },
  terracotta: { rule: "bg-[#c9a465]", text: "text-[#c9a465]" },
  sage: { rule: "bg-[#6fa572]/60", text: "text-[#6fa572]" },
  white: { rule: "bg-white/30", text: "text-white/70" },
} as const;

/**
 * The horizontal-rule + uppercase-label pattern that appears 8+ times across
 * the site (section headings, hero eyebrows, footer columns). Promotes that
 * repeated `<span className="h-px w-8 bg-..." />` snippet into one component.
 */
export function SectionEyebrow({
  children,
  align = "left",
  tone = "forest",
  className,
}: SectionEyebrowProps) {
  const t = toneMap[tone];
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "flex items-center gap-3",
        isCenter && "justify-center",
        className
      )}
    >
      <span aria-hidden="true" className={cn("block h-px w-8", t.rule)} />
      <p
        className={cn(
          "font-sans text-[11px] font-semibold uppercase tracking-widest",
          t.text
        )}
      >
        {children}
      </p>
      {isCenter && (
        <span aria-hidden="true" className={cn("block h-px w-8", t.rule)} />
      )}
    </div>
  );
}
