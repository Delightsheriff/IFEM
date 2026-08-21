import CountUp from "@/components/animations/CountUp";

interface StatsBannerProps {
  stats: {
    studentsPlaced: number;
    partnerUkUniversities: number;
    yearsOfExperience: number;
    successRate: number;
  };
}

export function StatsBanner({ stats }: StatsBannerProps) {
  return (
    <section className="bg-[#0d3320]">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <dl className="grid grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
          {[
            { num: stats.studentsPlaced,        suffix: "+",  label: "Students Placed" },
            { num: stats.successRate,           suffix: "%",  label: "Visa Success Rate" },
            { num: stats.partnerUkUniversities, suffix: "+",  label: "Partner Universities" },
            { num: 100,                          suffix: "%",  label: "Free of Charge" },
          ].map(({ num, suffix, label }, i) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center px-6 py-10 md:py-12"
              data-reveal="fade-up"
              style={{ "--reveal-delay": `${i * 0.08}s` } as React.CSSProperties}
            >
              <dt className="mb-2 font-sans text-[2.8rem] font-extrabold leading-none tracking-tight text-white md:text-5xl">
                <CountUp to={num} duration={2} />{suffix}
              </dt>
              <dd className="text-center text-[10.5px] font-semibold uppercase tracking-widest text-white/55">
                {label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
