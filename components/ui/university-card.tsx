import { UKUniversity } from "@/interface/sanity";
import Image from "next/image";

interface UniversityCardProps {
  university: UKUniversity;
}

export function UniversityCard({ university }: UniversityCardProps) {
  return (
    <div className="group flex flex-col items-center gap-3 border border-sage/20 bg-white p-5 hover:border-forest/30 hover:shadow-md transition-all duration-200">
      <div className="relative w-full h-16 flex items-center justify-center bg-cream/60">
        <Image
          src={university.logo}
          alt={university.name}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 200px"
          className="object-contain p-3 group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      <p className="text-[11px] font-medium text-charcoal/70 text-center leading-snug tracking-wide uppercase">
        {university.name}
      </p>
    </div>
  );
}
