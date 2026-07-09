import type { MetadataRoute } from "next";

import {
    getPosts,
    parsePost,
} from "@/components/blog/lib/notion";

const BASE_URL = "https://amarbiradar.me";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getPosts();

    const blogPages = posts.results.map((page) => {
        const post = parsePost(page);

        return {
            url: `${BASE_URL}/blog/${post.slug}`,

            lastModified: post.lastModified,

            changeFrequency: "monthly" as const,

            priority: 0.8,
        };
    });

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },

        {
            url: `${BASE_URL}/blog`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.95,
        },

        {
            url: `${BASE_URL}/resume`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.9,
        },

        {
            url: `${BASE_URL}/assets/resume.pdf`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.6,
        },

        ...blogPages,
    ];
}