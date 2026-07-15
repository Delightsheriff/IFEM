import CountUp from "@/components/animations/CountUp";

interface AboutStat {
  label: string;
  value: number;
  suffix: string;
  sub: string;
}

interface StatsBannerProps {
  stats: AboutStat[];
}

export function StatsBanner({ stats }: StatsBannerProps) {
  return (
    <section className="bg-[#0d3320]">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <dl className="grid grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
          {stats.map(({ label, value, suffix, sub }, i) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center px-6 py-10 md:py-12"
              data-reveal="fade-up"
              style={{ "--reveal-delay": `${i * 0.08}s` } as React.CSSProperties}
            >
              <dt className="mb-1 font-sans text-[2.8rem] font-extrabold leading-none tracking-tight text-white md:text-5xl">
                <CountUp to={value} duration={2} />{suffix}
              </dt>
              <dd className="text-center text-[10px] font-semibold uppercase tracking-widest text-white/40">
                {label}
              </dd>
              <dd className="mt-0.5 text-center text-[10px] text-white/25">{sub}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
