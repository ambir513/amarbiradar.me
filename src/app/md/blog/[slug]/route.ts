import { NextResponse } from "next/server";

import { getMarkdown, getPostBySlug, parsePost } from "@/components/blog/lib/notion";

const BASE_URL = "https://amarbiradar.me";

export async function GET(
    _: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        const post = await getPostBySlug(slug);

        if (!post) {
            return new NextResponse("Post not found", {
                status: 404,
            });
        }

        const markdown = await getMarkdown(post.id);
        const meta = parsePost(post);

        const mdx = `---
title: ${meta.title}
description: ${meta.description}
url: ${BASE_URL}/blog/${meta.slug}
author: Amar Biradar
---

${markdown}
`;

        return new NextResponse(mdx, {
            headers: {
                "Content-Type": "text/mdx; charset=utf-8",
                "Cache-Control":
                    "public, s-maxage=3600, stale-while-revalidate=86400",
            },
        });
    } catch (error) {
        console.error(error);

        return new NextResponse("Internal Server Error", {
            status: 500,
        });
    }
}
