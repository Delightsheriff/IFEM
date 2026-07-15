import { Banknote, Building2, Globe2 } from "lucide-react";

const WHY_PARTNER = [
  {
    icon: Building2,
    title: "Academic Excellence",
    description:
      "Each partner institution is recognised for high academic standards, research output, and quality teaching environments.",
  },
  {
    icon: Globe2,
    title: "Global Recognition",
    description:
      "Degrees from our partner universities are internationally recognised and valued by employers worldwide.",
  },
  {
    icon: Banknote,
    title: "Financial Support",
    description:
      "Access to scholarship, bursary, and funding guidance to help you manage the cost of UK education.",
  },
];

export function WhyPartnersSection() {
  return (
    <section className="border-t border-[#e2e2de] bg-white px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center" data-reveal="fade-up">
          <p className="mb-4 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
            <span className="h-px w-6 bg-[#1a5c34]" />
            Why Our Partners
            <span className="h-px w-6 bg-[#1a5c34]" />
          </p>
          <h2
            className="font-sans font-extrabold leading-[1.08] tracking-tight text-[#111111]"
            style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
          >
            What Makes Our Institutions Stand Out
          </h2>
        </div>
        <div className="grid gap-px bg-[#e2e2de] md:grid-cols-3">
          {WHY_PARTNER.map((feature, i) => (
            <div
              key={feature.title}
              className="group relative h-full overflow-hidden bg-white p-10 transition-colors duration-200 hover:bg-[#fafaf7]"
              data-reveal="fade-up"
              style={{ "--reveal-delay": `${i * 0.1}s` } as React.CSSProperties}
            >
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-[#e8f3ec] transition-colors duration-200 group-hover:bg-[#1a5c34]">
                <feature.icon aria-hidden="true" className="h-5 w-5 text-[#1a5c34] transition-colors duration-200 group-hover:text-white" />
              </div>
              <h3 className="mb-3 font-sans text-[15px] font-semibold text-[#111111]">{feature.title}</h3>
              <p className="text-[13.5px] leading-relaxed text-[#7a7a7a]">{feature.description}</p>
              <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#1a5c34] transition-transform duration-300 group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
