import { SERVICE_GROUPS } from "@/lib/services";
import { Check } from "lucide-react";

export function DifferenceSection() {
  return (
    <section className="bg-white px-6 py-24 md:py-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">

          <div data-reveal="fade-up">
            <p className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
              <span className="h-px w-6 bg-[#1a5c34]" />
              Our Difference
            </p>
            <h2
              className="mb-6 font-sans font-extrabold leading-[1.08] tracking-tight text-[#111111]"
              style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
            >
              What Makes Us Different?
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-[#5a5a5a]">
              <p>We bring our students closer to their dreams and help them achieve them. We have well-trained and experienced counsellors who prioritise your needs and are result-oriented.</p>
              <p>Our team works with you closely to ensure a seamless process from start to finish. We understand the challenges of making the right decisions around UK studies, which is why we provide personalised guidance at every stage.</p>
              <p>
                We make our process completely transparent —{" "}
                <strong className="font-semibold text-[#111111]">UK admission and visa processing comes free of charge with no hidden fees.</strong>
              </p>
            </div>
          </div>

          <div
            className="rounded-2xl bg-[#0d3320] p-10 lg:p-12 text-white"
            data-reveal="fade-up"
            style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
          >
            <h3 className="mb-8 font-sans text-2xl font-extrabold text-white">Our Comprehensive Services</h3>
            <div className="space-y-8">
              {SERVICE_GROUPS.map((group) => (
                <div key={group.number}>
                  <h4 className="mb-4 border-b border-white/10 pb-2 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">
                    {group.title}
                  </h4>
                  <ul className="space-y-2.5">
                    {group.items.map((service) => (
                      <li key={service.name} className="flex items-start gap-3 text-white/75">
                        <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#c9a465]" />
                        <span className="text-[13.5px]">{service.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
