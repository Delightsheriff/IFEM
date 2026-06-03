import Link from "next/link";
import { ArrowRight, Home, HelpCircle, BookOpen, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const RECOVERY_LINKS = [
  { href: "/faq", label: "Check the FAQ", icon: HelpCircle, desc: "Quick answers to common questions" },
  { href: "/guides", label: "Browse guides", icon: BookOpen, desc: "UK admission, visa & funding articles" },
  { href: "/contact", label: "Talk to us", icon: Mail, desc: "Free 1:1 consultation, no charge" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-2xl text-center">
          <div className="mb-6">
            <span
              aria-hidden="true"
              className="font-serif text-[10rem] font-bold leading-none tracking-tight text-forest/15 md:text-[14rem]"
            >
              404
            </span>
          </div>

          <h1 className="mb-4 font-serif text-2xl font-semibold text-charcoal md:text-3xl">
            Page Not Found
          </h1>
          <p className="mx-auto mb-10 max-w-md text-base leading-relaxed text-gray">
            The page you&apos;re looking for may have moved or never existed.
            Here are some helpful places to go instead.
          </p>

          <div className="mb-10 flex justify-center">
            <Button asChild variant="primary" size="lg">
              <Link href="/">
                <Home aria-hidden="true" />
                Back to Home
              </Link>
            </Button>
          </div>

          <div className="grid gap-3 text-left sm:grid-cols-3">
            {RECOVERY_LINKS.map(({ href, label, icon: Icon, desc }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col gap-2 border border-sage/25 bg-white p-5 transition-colors hover:border-forest/40 hover:bg-cream/50 focus-ring rounded-sm"
              >
                <Icon aria-hidden="true" className="h-5 w-5 text-forest-deep" />
                <p className="font-sans text-sm font-semibold text-charcoal">{label}</p>
                <p className="text-xs leading-relaxed text-gray">{desc}</p>
                <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-forest-deep">
                  Go there
                  <ArrowRight aria-hidden="true" className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
