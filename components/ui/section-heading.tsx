interface SectionHeadingProps {
  label?: string;
  heading: string;
  subtitle?: string;
  align?: "center" | "left";
}

export function SectionHeading({
  label,
  heading,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center mb-16" : "mb-16"}>
      {label ? (
        <p className="text-terracotta font-semibold text-sm uppercase tracking-wider mb-3">
          {label}
        </p>
      ) : null}
      <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal">
        {heading}
      </h2>
      {subtitle ? (
        <p className="text-gray text-lg max-w-2xl mx-auto leading-relaxed mt-4">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
