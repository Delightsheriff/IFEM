import { UKUniversity } from "@/interface/sanity";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface UniversityCardProps {
  university: UKUniversity;
}

export function UniversityCard({ university }: UniversityCardProps) {
  return (
    <Card
      variant="solid"
      elevation="sm"
      interactive
      padding="sm"
      className="flex min-h-35 flex-col items-center gap-3"
    >
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
    </Card>
  );
}
