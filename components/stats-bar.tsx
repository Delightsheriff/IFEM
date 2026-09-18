import type { LucideIcon } from "lucide-react";
import CountUp from "@/components/ui/count-up";

export interface StatsBarStat {
  label: string;
  value: number;
  suffix?: string;
  sub?: string;
  icon?: LucideIcon;
}

interface StatsBarProps {
  stats: StatsBarStat[];
}

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <section className="bg-[#0d3320]">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <dl className="grid grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
          {stats.map(({ label, value, suffix = "", sub, icon: Icon }, i) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center px-6 py-10 text-center md:py-12"
              data-reveal="fade-up"
              style={{ "--reveal-delay": `${i * 0.08}s` } as React.CSSProperties}
            >
              {Icon ? (
                <Icon aria-hidden="true" className="mb-2 h-5 w-5 text-white/40" />
              ) : null}
              <dt className="mb-2 font-sans text-[2.8rem] font-extrabold leading-none tracking-tight text-white md:text-5xl">
                <CountUp to={value} duration={2} />
                {suffix}
              </dt>
              <dd className="text-center text-[10.5px] font-semibold uppercase tracking-widest text-white/55">
                {label}
              </dd>
              {sub ? (
                <dd className="mt-0.5 text-center text-[10px] text-white/25">
                  {sub}
                </dd>
              ) : null}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}