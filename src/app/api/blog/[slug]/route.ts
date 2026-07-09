import { NextResponse } from "next/server";

import {
    getMarkdown,
    getPostBySlug,
    parsePost,
} from "@/components/blog/lib/notion";

const BASE_URL = "https://amarbiradar.me";

export async function GET(
    _: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        const post = await getPostBySlug(slug);

        if (!post) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Blog not found",
                },
                {
                    status: 404,
                }
            );
        }

        const markdown = await getMarkdown(post.id);

        const meta = parsePost(post);

        return NextResponse.json(
            {
                success: true,

                data: {
                    ...meta,

                    url: `${BASE_URL}/blog/${meta.slug}`,

                    markdown,
                },
            },
            {
                headers: {
                    "Cache-Control":
                        "public, s-maxage=3600, stale-while-revalidate=86400",
                },
            }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error",
            },
            {
                status: 500,
            }
        );
    }
}