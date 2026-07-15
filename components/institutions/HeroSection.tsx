interface InstitutionsHeroSectionProps {
  universityCount: number;
}

export function HeroSection({ universityCount }: InstitutionsHeroSectionProps) {
  return (
    <section className="bg-[#fafaf7]">
      <div className="mx-auto max-w-7xl px-4 pb-14 pt-16 md:px-10 md:pb-18 md:pt-20">
        <div className="max-w-3xl" data-reveal="fade-up">
          <p className="mb-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
            <span className="h-px w-6 bg-[#1a5c34]" />
            Our Network
          </p>
          <h1
            className="mb-6 font-sans font-extrabold leading-[1.04] tracking-[-0.025em] text-[#111111]"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
          >
            <span className="hero-blur-1 block">Partner</span>
            <span className="hero-blur-2 block text-[#1a5c34]">Institutions</span>
          </h1>
          <p className="mb-10 max-w-xl text-lg leading-relaxed text-[#5a5a5a]">
            We hold direct partnerships with{" "}
            <strong className="font-semibold text-[#111111]">{universityCount}+</strong>{" "}
            universities and colleges across the UK — each carefully selected for academic excellence and strong student outcomes.
          </p>
          <div className="flex flex-wrap items-center gap-8 border-t border-[#e2e2de] pt-8">
            {[
              { num: `${universityCount}+`, label: "Partner Universities" },
              { num: "100%", label: "Free of Charge" },
            ].map((fact) => (
              <div key={fact.label} className="flex flex-col">
                <span className="font-sans text-2xl font-extrabold leading-none text-[#1a5c34]">{fact.num}</span>
                <span className="mt-1 text-[11px] uppercase tracking-widest text-[#7a7a7a]">{fact.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
