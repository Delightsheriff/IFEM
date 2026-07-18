interface ContentPageHeroProps {
  eyebrow: string;
  title: string;
  emphasis: string;
  description: string;
}

export function ContentPageHero({ eyebrow, title, emphasis, description }: ContentPageHeroProps) {
  return <section className="border-b border-[#e2e2de] bg-[#fafaf7]"><div className="mx-auto max-w-7xl px-4 py-16 md:px-10 md:py-20"><div className="max-w-3xl"><p className="mb-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]"><span className="h-px w-6 bg-[#1a5c34]" />{eyebrow}</p><h1 className="font-sans text-[clamp(2.5rem,5.5vw,4.5rem)] font-extrabold leading-[1.04] tracking-[-0.025em] text-charcoal"><span className="block">{title}</span><span className="block text-forest">{emphasis}</span></h1><p className="mt-6 max-w-xl text-lg leading-relaxed text-[#5a5a5a]">{description}</p></div></div></section>;
}
