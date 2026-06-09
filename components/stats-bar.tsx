import { getSiteStats } from "@/sanity/sanity";
import { resolveSiteStats } from "@/lib/site-stats";
import { GraduationCap, Globe, Users, Award } from "lucide-react";
import { CountUp } from "@/components/ui/count-up";

interface StatsBarProps {
  variant?: "default" | "white" | "dark";
}

export async function StatsBar({ variant = "default" }: StatsBarProps) {
  const resolved = resolveSiteStats(await getSiteStats());

  const stats = [
    { icon: Users,         value: resolved.studentsPlaced,      suffix: "+", label: "Students Placed" },
    { icon: GraduationCap, value: resolved.partnerUniversities, suffix: "+", label: "Partner Universities" },
    { icon: Globe,         value: resolved.yearsInService,      suffix: "+", label: "Years in Service" },
    { icon: Award,         value: resolved.visaSuccessRate,     suffix: "%", label: "Visa Success Rate" },
  ];

  const bgColors = {
    default: "bg-white",
    white: "bg-white",
    dark: "bg-forest text-white",
  };

  const textColors = {
    default: "text-charcoal",
    white: "text-charcoal",
    dark: "text-white",
  };

  const mutedColors = {
    default: "text-gray",
    white: "text-gray",
    dark: "text-white/80",
  };

  return (
    <section className={`py-10 px-4 ${bgColors[variant]}`}>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <stat.icon className={`w-6 h-6 ${mutedColors[variant]}`} />
              <p className={`font-serif text-3xl font-bold ${textColors[variant]}`}>
                <CountUp to={stat.value} />{stat.suffix}
              </p>
              <p className={`text-sm ${mutedColors[variant]}`}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
