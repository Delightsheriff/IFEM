import type { PortableTextComponents } from "@portabletext/react";
import { LinkIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import HashScroll from "./hash-scroll";

export const customPortableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-2 mb-6 text-charcoal leading-relaxed font-sans">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2
        id={children
          ?.toString()
          .toLowerCase()
          .replaceAll(/[^-\w]+/g, "-")
          .replaceAll(/--+/g, "-")
          .replace(/^-|-$/g, "")}
        className="relative block font-serif font-bold tracking-tight text-3xl lg:text-4xl text-charcoal my-8 pt-4"
      >
        <HashScroll text={children} />
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        id={children
          ?.toString()
          .toLowerCase()
          .replaceAll(/[^-\w]+/g, "-")
          .replaceAll(/--+/g, "-")
          .replace(/^-|-$/g, "")}
        className="relative block font-serif font-semibold lg:font-bold tracking-tight text-2xl lg:text-3xl text-charcoal my-6 pt-3"
      >
        <HashScroll text={children} />
      </h3>
    ),
    h4: ({ children }) => (
      <h4
        id={children
          ?.toString()
          .toLowerCase()
          .replaceAll(/[^-\w]+/g, "-")
          .replaceAll(/--+/g, "-")
          .replace(/^-|-$/g, "")}
        className="relative inline-block font-serif font-semibold tracking-tight text-xl text-charcoal mb-2 mt-4"
      >
        <HashScroll text={children} />
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="relative overflow-hidden tracking-tight text-lg my-8 lg:py-6 lg:pl-6 pr-12 p-4 border-l-4 border-forest bg-sage/5 rounded-r-lg">
        <svg
          className="absolute -top-2 -right-2 w-12 h-12 text-sage/20 opacity-50"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-4.25-2-7-2s-7 .75-7 2v6c0 1-6 9-6 9s1 5 7 5c6 0 3-4 3-4s-1.5-2-1.5-4V8c1.5 0 4 0 6 1s5 3 5 5-1.5 9-7 9-6-4-6-9-1-7-1-7s1-4 7-4 6 2 6 2" />
        </svg>
        <div className="text-charcoal font-sans italic">{children}</div>
      </blockquote>
    ),
  },
  types: {
    code: ({ value }) => (
      <pre className="my-6 overflow-x-auto rounded-lg border border-sage/30 bg-cream p-4">
        <code className="text-sm font-mono text-charcoal">{value.code}</code>
      </pre>
    ),
    image: ({ value }) => (
      <figure className="my-8">
        <Image
          src={value.asset?.url || "/placeholder.svg"}
          alt={value.alt || "Image"}
          className="w-full rounded-lg border border-sage/30 shadow-sm"
          width={800}
          height={600}
        />
        {value.caption && (
          <figcaption className="mt-3 text-center text-sm text-gray font-sans">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
  marks: {
    em: ({ children }) => (
      <em className="font-medium italic text-charcoal font-sans">{children}</em>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-charcoal font-sans">
        {children}
      </strong>
    ),
    link: ({ children, value }) => {
      const isExternal = value?.href?.startsWith("http");
      return (
        <Link
          href={value?.href || "#"}
          className="text-forest hover:text-terracotta underline-offset-2 hover:underline inline-flex items-center gap-1.5 font-medium transition-colors"
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {children}
          {isExternal && (
            <LinkIcon className="inline w-4 h-4 shrink-0" aria-hidden="true" />
          )}
        </Link>
      );
    },
    code: ({ children }) => (
      <code className="py-1 px-2 rounded-md text-sm bg-sage/10 border border-sage/30 text-forest font-semibold font-sans">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc mt-5 ml-6 space-y-2 text-charcoal font-sans">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal mt-5 ml-6 space-y-2 text-charcoal font-sans">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="leading-relaxed text-charcoal font-sans">{children}</li>
    ),
    number: ({ children }) => (
      <li className="leading-relaxed text-charcoal font-sans">{children}</li>
    ),
  },
};
