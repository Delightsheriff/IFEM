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
  const isCenter = align === "center";

  return (
    <div className={`mb-14 ${isCenter ? "text-center" : ""}`}>
      {label && (
        <div
          className={`flex items-center gap-3 mb-4 ${isCenter ? "justify-center" : ""}`}
        >
          <span className="block w-8 h-px bg-forest" />
          <p className="text-forest font-sans text-xs font-semibold uppercase tracking-widest">
            {label}
          </p>
          <span className="block w-8 h-px bg-forest" />
        </div>
      )}
      <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal leading-tight">
        {heading}
      </h2>
      {subtitle && (
        <p
          className={`text-gray text-lg leading-relaxed mt-4 ${isCenter ? "max-w-2xl mx-auto" : "max-w-xl"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
