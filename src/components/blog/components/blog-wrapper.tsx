import React from "react";
import { extractToc, toTOCMinimapItems } from "@/components/blog/lib/toc";
import { TOCMinimap } from "@/components/blog/components/toc-minimap";
import { Header } from "@/components/landing/header";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock } from "lucide-react";

export function BlogWrapper({
  markdown,
  cover,
  title,
  description,
  category,
  publishedDate,
  readTime,
  children,
}: {
  markdown: string;
  cover: string;
  title: string;
  description: string;
  category: string;
  publishedDate: string;
  readTime: string;
  children: React.ReactNode;
}) {
  const toc = extractToc(markdown);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto space-y-4  max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16">
        {/* Header block */}
        <div className="mb-5">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-balance mb-4">
            {title}
          </h1>

          <p className="text-md sm:text-lg text-muted-foreground leading-relaxed mb-6">
            {description}
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground border-t pt-4">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-4" />
              {publishedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" />
              {readTime} min read
            </span>
          </div>
        </div>

        {/* Cover image */}
        <AspectRatio
          ratio={16 / 9}
          className="border rounded-xl overflow-hidden bg-muted"
        >
          <Image
            src={cover}
            alt={title}
            fill
            priority
            className="object-cover object-center"
          />
        </AspectRatio>

        {/* Article body */}
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          {children}
        </article>
      </div>

      <TOCMinimap
        items={toTOCMinimapItems(toc)}
        className="hidden sm:block fixed top-1/3 right-0"
      />
    </div>
  );
}
