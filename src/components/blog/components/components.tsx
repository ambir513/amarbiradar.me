import type { MDXComponents } from "next-mdx-remote-client/rsc";
import Image from "next/image";
import Link from "next/link";

function slugify(children: React.ReactNode): string {
  const text = typeof children === "string" ? children : String(children ?? "");
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

const components: MDXComponents = {
  // Headings
  h1: ({ children }) => {
    const id = slugify(children);
    return (
      <h1
        id={id}
        className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-8 sm:mt-10 md:mt-12 mb-4 sm:mb-6 md:mb-8 scroll-mt-24 text-balance"
      >
        <a href={`#${id}`} className="no-underline">
          {children}
        </a>
      </h1>
    );
  },
  h2: ({ children }) => {
    const id = slugify(children);
    return (
      <h2
        id={id}
        className="text-2xl sm:text-2xl md:text-3xl font-semibold mt-8 sm:mt-9 md:mt-10 mb-3 sm:mb-4 md:mb-6 scroll-mt-24 border-b pb-2 text-balance group relative"
      >
        <a href={`#${id}`} className="no-underline">
          {children}
        </a>
      </h2>
    );
  },
  h3: ({ children }) => {
    const id = slugify(children);
    return (
      <h3
        id={id}
        className="text-xl sm:text-xl md:text-2xl font-semibold mt-6 sm:mt-7 md:mt-8 mb-2 sm:mb-3 md:mb-4 scroll-mt-24 text-balance"
      >
        <a href={`#${id}`} className="no-underline">
          {children}
        </a>
      </h3>
    );
  },
  h4: ({ children }) => (
    <h4 className="text-lg sm:text-lg md:text-xl font-semibold mt-5 sm:mt-6 mb-2 sm:mb-3 scroll-mt-24">
      {children}
    </h4>
  ),
  h5: ({ children }) => (
    <h5 className="text-base sm:text-lg font-semibold mt-4 mb-2">{children}</h5>
  ),
  h6: ({ children }) => (
    <h6 className="text-sm sm:text-base font-semibold mt-4 mb-2 text-muted-foreground uppercase tracking-wide">
      {children}
    </h6>
  ),

  // Text
  p: ({ children }) => (
    <p className="leading-7 [&:not(:first-child)]:mt-5 sm:[&:not(:first-child)]:mt-6 text-[15px] sm:text-base text-foreground/90">
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  del: ({ children }) => (
    <del className="line-through opacity-70">{children}</del>
  ),
  mark: ({ children }) => (
    <mark className="bg-yellow-200/70 dark:bg-yellow-500/30 px-1 rounded">
      {children}
    </mark>
  ),

  // Links
  a: ({ href, children }) => (
    <Link
      href={href ?? "#"}
      className="font-medium underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors break-words"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </Link>
  ),

  // Lists
  ul: ({ children }) => (
    <ul className="my-5 sm:my-6 ml-5 sm:ml-6 list-disc [&>li]:mt-2 marker:text-muted-foreground text-[15px] sm:text-base">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-5 sm:my-6 ml-5 sm:ml-6 list-decimal [&>li]:mt-2 marker:text-muted-foreground text-[15px] sm:text-base">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-7">{children}</li>,

  // Blockquote
  blockquote: ({ children }) => (
    <blockquote className="mt-6 border-l-4 border-primary/40 pl-4 sm:pl-6 italic text-muted-foreground text-[15px] sm:text-base">
      {children}
    </blockquote>
  ),

  // Code
  code: ({ children, className }) => {
    const isBlock = Boolean(className);
    if (!isBlock) {
      return (
        <code className="relative rounded bg-muted px-[0.35rem] py-[0.15rem] font-mono text-[13px] sm:text-sm break-words">
          {children}
        </code>
      );
    }
    return (
      <code className={`${className} text-[13px] sm:text-sm leading-relaxed`}>
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="mb-5 mt-5 sm:mb-6 sm:mt-6 overflow-x-auto rounded-lg border bg-zinc-950 p-3 sm:p-4 text-zinc-50 [-webkit-overflow-scrolling:touch]">
      {children}
    </pre>
  ),

  // Table
  table: ({ children }) => (
    <div className="my-5 sm:my-6 w-full overflow-x-auto rounded-md border [-webkit-overflow-scrolling:touch]">
      <table className="w-full min-w-[480px] border-collapse text-[13px] sm:text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b bg-muted/40">{children}</thead>
  ),
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="border-b last:border-0 even:bg-muted/20">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="px-3 sm:px-4 py-2 text-left font-semibold whitespace-nowrap [&[align=center]]:text-center [&[align=right]]:text-right">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-3 sm:px-4 py-2 [&[align=center]]:text-center [&[align=right]]:text-right">
      {children}
    </td>
  ),

  // Misc
  hr: () => <hr className="my-8 sm:my-10 border-border" />,
  img: ({ src, alt }) => (
    <span className="block my-6 sm:my-8 overflow-hidden rounded-lg border">
      <Image
        src={src ?? ""}
        alt={alt ?? ""}
        width={1200}
        height={675}
        sizes="(max-width: 768px) 100vw, 768px"
        className="w-full h-auto object-cover"
      />
    </span>
  ),
};



export default components;
