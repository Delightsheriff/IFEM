interface Value {
  number: number;
  title: string;
  description: string;
}

interface ValuesSectionProps {
  values: Value[];
}

export function ValuesSection({ values }: ValuesSectionProps) {
  if (values.length === 0) return null;

  return (
    <section className="bg-white px-6 py-24 md:py-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center" data-reveal="fade-up">
          <p className="mb-4 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
            <span className="h-px w-6 bg-[#1a5c34]" />
            Our Values
            <span className="h-px w-6 bg-[#1a5c34]" />
          </p>
          <h2
            className="font-sans font-extrabold leading-[1.08] tracking-tight text-[#111111]"
            style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
          >
            What We Stand For
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {values.map((value, index) => (
            <div
              key={index}
              className="group flex gap-7 rounded-xl border border-[#e2e2de] bg-[#fafaf7] p-8 transition-all duration-200 hover:border-[#1a5c34]/20 hover:bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
              data-reveal="fade-up"
              style={{ "--reveal-delay": `${index * 0.06}s` } as React.CSSProperties}
            >
              <div className="shrink-0 pt-0.5">
                <span aria-hidden="true" className="font-sans text-5xl font-extrabold leading-none text-[#e2e2de] transition-colors duration-200 group-hover:text-[#e8f3ec]">
                  {value.number}
                </span>
              </div>
              <div>
                <h3 className="mb-2.5 font-sans text-[16px] font-semibold text-[#111111]">{value.title}</h3>
                <p className="text-[13.5px] leading-relaxed text-[#7a7a7a]">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
