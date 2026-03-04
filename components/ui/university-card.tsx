import { UKUniversity } from "@/interface/sanity";
import Image from "next/image";

interface UniversityCardProps {
  university: UKUniversity;
}

export function UniversityCard({ university }: UniversityCardProps) {
  return (
    <div className="group flex flex-col items-center gap-3 rounded-xl border border-sage/20 bg-white p-5 hover:border-forest/30 hover:shadow-lg transition-all">
      <div className="relative w-full h-20 flex items-center justify-center bg-cream rounded-lg">
        <Image
          src={university.logo}
          alt={university.name}
          fill
          className="object-contain p-3 group-hover:scale-105 transition-transform"
        />
      </div>
      <p className="text-xs font-medium text-charcoal text-center leading-snug">
        {university.name}
      </p>
    </div>
  );
}
