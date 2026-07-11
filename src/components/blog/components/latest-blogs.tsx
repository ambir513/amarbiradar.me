import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { getPosts, parsePost } from "@/components/blog/lib/notion";

import { Button } from "@/components/ui/button";

const truncate = (text: string, maxLength = 80) => {
  if (!text) return "";

  return text.length > maxLength
    ? `${text.slice(0, maxLength).trimEnd()}...`
    : text;
};

export default async function LatestBlogs() {
  const response = await getPosts();

  const blogs = response.results.map(parsePost).slice(0, 3);

  return (
    <div className="flex flex-col gap-2 w-full">
      {blogs.map((blog) => (
        <Button
          key={blog.slug}
          variant="secondary"
          className="h-fit w-full justify-start px-4 py-3"
          nativeButton={false}
          render={
            <Link
              href={`/blog/${blog.slug}`}
              className="flex flex-col gap-1 items-start"
            />
          }
        >
          <div className="flex w-full items-start justify-between">
            <span className="font-medium">{blog.title}</span>

            <ArrowUpRight className="size-4 shrink-0 opacity-50" />
          </div>

          <span className="text-xs text-muted-foreground">
            {truncate(blog.description, 40)}
          </span>
        </Button>
      ))}
    </div>
  );
}
