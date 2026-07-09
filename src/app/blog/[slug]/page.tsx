import { notFound } from "next/navigation";
import {
  getPostBySlug,
  getMarkdown,
  parsePost,
} from "@/components/blog/lib/notion";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import components from "@/components/blog/components/components";
import { BlogWrapper } from "@/components/blog/components/blog-wrapper";
import { Metadata } from "next";
import Script from "next/script";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};
const BASE_URL = "https://amarbiradar.me";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "404",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const meta = parsePost(post);

  const url = `${BASE_URL}/blog/${meta.slug}`;

  const image = meta.cover ?? `${BASE_URL}/brand/blog-og.png`;

  return {
    metadataBase: new URL(BASE_URL),

    title: meta.title,

    description: meta.description,

    applicationName: "Amar Biradar",

    creator: "Amar Biradar",

    publisher: "Amar Biradar",

    category: meta.category,

    classification: meta.category,

    referrer: "origin-when-cross-origin",

    archives: [`${BASE_URL}/blog`],

    alternates: {
      canonical: url,
    },

    authors: [
      {
        name: "Amar Biradar",
        url: BASE_URL,
      },
    ],

    keywords: [
      meta.title,
      meta.category,
      "Programming",
      "Software Engineering",
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Docker",
      "AWS",
      "PostgreSQL",
      "Full Stack Development",
      "Technical Blog",
      "Amar Biradar",
    ],

    robots: {
      index: true,
      follow: true,
      nocache: false,

      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    openGraph: {
      type: "article",

      url,

      title: meta.title,

      description: meta.description,

      siteName: "Amar Biradar",

      locale: "en_IN",

      publishedTime: meta.publishedTime,

      modifiedTime: meta.lastModified,

      section: meta.category,

      authors: ["Amar Biradar"],

      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: meta.title,
          type: "image/png",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      creator: "@ambir513",

      title: meta.title,

      description: meta.description,

      images: [image],
    },

    other: {
      "article:published_time": meta.publishedTime,
      "article:modified_time": meta.lastModified,
      "article:section": meta.category,
      "article:author": "Amar Biradar",
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;
  const url = `${BASE_URL}/blog/${slug}`;

  const post = await getPostBySlug(slug);
  const markdown = await getMarkdown(post?.id);

  console.log(markdown);
  console.log(post);

  if (!post) {
    notFound();
  }

  const meta = parsePost(post);

  console.log(meta);
  const readingTime = Number.parseInt(meta.timeToRead, 10) || 5;

  const image = meta.cover ?? `${BASE_URL}/brand/blog-og.png`;

  const jsonLd = {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": ["BlogPosting", "TechArticle"],

        "@id": `${url}#article`,

        headline: meta.title,

        alternativeHeadline: meta.title,

        description: meta.description,

        abstract: meta.description,

        articleSection: meta.category,

        keywords: [
          meta.category,
          "Programming",
          "Next.js",
          "React",
          "TypeScript",
        ],

        inLanguage: "en-IN",

        isAccessibleForFree: true,

        license: "https://opensource.org/licenses/MIT",

        datePublished: meta.publishedTime,

        dateModified: meta.lastModified,

        wordCount: meta.wordCount,

        timeRequired: `PT${readingTime}M`,

        image: {
          "@type": "ImageObject",

          url: image,

          width: 1200,

          height: 630,
        },

        mainEntityOfPage: {
          "@type": "WebPage",

          "@id": `${url}#webpage`,
        },

        author: {
          "@type": "Person",

          "@id": `${BASE_URL}/#person`,
        },

        publisher: {
          "@type": "Person",

          "@id": `${BASE_URL}/#person`,
        },
      },

      {
        "@type": "WebPage",

        "@id": `${url}#webpage`,

        url,

        name: meta.title,

        description: meta.description,

        inLanguage: "en-IN",

        datePublished: meta.publishedTime,

        dateModified: meta.lastModified,

        isPartOf: {
          "@id": `${BASE_URL}/#website`,
        },

        primaryImageOfPage: {
          "@type": "ImageObject",

          url: image,
        },

        breadcrumb: {
          "@id": `${url}#breadcrumb`,
        },
      },

      {
        "@type": "BreadcrumbList",

        "@id": `${url}#breadcrumb`,

        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: BASE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${BASE_URL}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: meta.title,
            item: url,
          },
        ],
      },
    ],
  };

  return (
    <>
      <Script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <BlogWrapper
        markdown={markdown}
        title={meta.title}
        category={meta.category}
        cover={meta.cover}
        publishedDate={meta.publishedDate}
        description={meta.description}
        readTime={meta.timeToRead}
      >
        <MDXRemote source={markdown} components={components} />
      </BlogWrapper>
    </>
  );
}
