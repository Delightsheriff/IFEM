import { customPortableTextComponents } from "@/components/portable-text-components";
import { PortableText } from "next-sanity";
import type { Guide } from "@/interface/sanity";

interface ArticleContentProps {
  guide: Guide;
}

export function ArticleContent({ guide }: ArticleContentProps) {
  return (
    <section className="pb-16 md:pb-20">
      <div className="mx-auto max-w-3xl">
        <PortableText
          value={guide.content}
          components={customPortableTextComponents}
        />
      </div>
    </section>
  );
}
