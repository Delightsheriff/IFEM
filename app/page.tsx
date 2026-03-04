import PageContentWrapper from "@/components/ui/page-content-wrapper";
import { getAboutDetails } from "@/sanity/sanity";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const details = await getAboutDetails();
  return (
    <PageContentWrapper>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-sage/30">
                <CheckCircle2 className="w-4 h-4 text-forest" />
                <span className="text-sm font-semibold text-forest">
                  99.6% Visa Success Rate
                </span>
              </div>

              <h1 className="font-serif text-5xl md:text-6xl font-bold text-charcoal leading-tight text-balance">
                Your Gateway to{" "}
                <span className="text-forest">UK Education</span>
              </h1>

              <p className="text-lg text-gray leading-relaxed max-w-xl">
                IFEM Education & Travels is your trusted partner in
                international education. We guide students to world-class UK
                universities with expert counselling and seamless support.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-terracotta text-white font-semibold rounded-lg hover:bg-terracotta/90 transition-colors"
                >
                  Start Your Journey
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-forest text-forest font-semibold rounded-lg hover:bg-forest/5 transition-colors"
                >
                  Learn More
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-sage/20">
                <div>
                  <p className="font-serif text-3xl font-bold text-forest">
                    1800+
                  </p>
                  <p className="text-sm text-gray">Students Placed</p>
                </div>
                <div>
                  <p className="font-serif text-3xl font-bold text-forest">
                    50+
                  </p>
                  <p className="text-sm text-gray">Universities</p>
                </div>
                <div>
                  <p className="font-serif text-3xl font-bold text-forest">
                    10yrs+
                  </p>
                  <p className="text-sm text-gray">Experience</p>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative h-96 md:h-full md:min-h-96">
              <div className="absolute inset-0 bg-linear-to-br from-sage/20 to-terracotta/20 rounded-2xl" />
              <Image
                src={details?.heroImage?.url || ""}
                alt="IFEM Team"
                fill
                className="object-cover rounded-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </PageContentWrapper>
  );
}
