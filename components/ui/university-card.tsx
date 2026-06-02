import { UKUniversity } from "@/interface/sanity";
import Image from "next/image";

interface UniversityCardProps {
  university: UKUniversity;
}

export function UniversityCard({ university }: UniversityCardProps) {
  return (
    <div className="group flex min-h-35 flex-col items-center gap-3 border border-sage/20 bg-white p-5 shadow-[0_12px_35px_rgba(45,45,45,0.035)] transition-all duration-200 hover:-translate-y-1 hover:border-forest/30 hover:shadow-[0_22px_55px_rgba(45,45,45,0.08)]">
      <div className="relative flex h-16 w-full items-center justify-center bg-cream/65 ring-1 ring-sage/10">
        {university.logo ? (
          <Image
            src={university.logo}
            alt={university.name}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 200px"
            className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <span className="text-[10px] font-semibold text-charcoal/30 uppercase tracking-wide text-center px-2 leading-snug">
            {university.name}
          </span>
        )}
      </div>
      <p className="text-center text-[11px] font-semibold uppercase leading-snug tracking-wide text-charcoal/70">
        {university.name}
      </p>
    </div>
  );
}
