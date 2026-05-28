import { getSiteStats } from "@/sanity/sanity";
import { GraduationCap, Globe, Users, Award } from "lucide-react";

interface StatsBarProps {
  variant?: "default" | "white" | "dark";
}

export async function StatsBar({ variant = "default" }: StatsBarProps) {
  const siteStats = await getSiteStats();

  const stats = [
    {
      icon: Users,
      value: siteStats?.studentsPlaced ?? 1800,
      suffix: "+",
      label: "Students Placed",
    },
    {
      icon: GraduationCap,
      value: siteStats?.partnerUniversities ?? 40,
      suffix: "+",
      label: "Partner Universities",
    },
    {
      icon: Globe,
      value: siteStats?.yearsInService ?? 4,
      suffix: "+",
      label: "Years in Service",
    },
    {
      icon: Award,
      value: siteStats?.visaSuccessRate ?? 99.6,
      suffix: "%",
      label: "Visa Success Rate",
    },
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
                {stat.value}{stat.suffix}
              </p>
              <p className={`text-sm ${mutedColors[variant]}`}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
