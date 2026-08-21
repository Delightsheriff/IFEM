import Link from "next/link";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SITE_URL } from "@/lib/site";

export interface BreadcrumbEntry {
  label: string;
  href: string;
}

/**
 * Slim breadcrumb bar for page tops. The last entry is rendered as the
 * current page (no link); every entry — including the current one — needs
 * an href because it doubles as the BreadcrumbList JSON-LD `item` url.
 */
export function PageBreadcrumbs({ items }: { items: BreadcrumbEntry[] }) {
  const trail: BreadcrumbEntry[] = [{ label: "Home", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${SITE_URL}${item.href}`,
    })),
  };

  return (
    <div className="border-b border-[#e2e2de] bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-4 py-3 md:px-10">
        <Breadcrumb>
          <BreadcrumbList className="flex-nowrap overflow-x-auto text-xs sm:text-sm">
            {trail.map((item, index) => {
              const isLast = index === trail.length - 1;
              return (
                <Fragment key={item.href}>
                  <BreadcrumbItem className={isLast ? "min-w-0" : "shrink-0"}>
                    {isLast ? (
                      <BreadcrumbPage className="truncate font-semibold text-charcoal">
                        {item.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        asChild
                        className="text-[#5a5a5a] transition-colors hover:text-forest"
                      >
                        <Link href={item.href}>{item.label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast ? (
                    <BreadcrumbSeparator className="shrink-0 [&>svg]:text-[#c9c9c2]" />
                  ) : null}
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
