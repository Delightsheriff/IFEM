export function NewsEventsHero() {
  return (
    <section className="bg-[#fafaf7]">
      <div className="mx-auto max-w-7xl px-4 pb-14 pt-16 md:px-10 md:pb-16 md:pt-20">
        <div className="max-w-3xl" data-reveal="fade-up">
          <p className="mb-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
            <span className="h-px w-6 bg-[#1a5c34]" />
            News &amp; Events
          </p>
          <h1 className="mb-6 font-sans font-extrabold leading-[1.04] tracking-[-0.025em] text-[#111111]" style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}>
            <span className="hero-blur-1 block">What&apos;s happening at</span>
            <span className="hero-blur-2 block text-[#1a5c34]">IFEM Education.</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-[#5a5a5a]">
            Practical UK study updates, campus connections and events designed to help you take your next step with confidence.
          </p>
        </div>
      </div>
    </section>
  );
}
