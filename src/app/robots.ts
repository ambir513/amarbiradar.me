import type { MetadataRoute } from "next";

const BASE_URL = "https://amarbiradar.me";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/api/",
                ],
            },
            {
                userAgent: "Googlebot",
                allow: "/",
            },
            {
                userAgent: "Google-Extended",
                allow: "/",
            },
            {
                userAgent: "GPTBot",
                allow: "/",
            },
            {
                userAgent: "CCBot",
                allow: "/",
            },
            {
                userAgent: "ClaudeBot",
                allow: "/",
            },
            {
                userAgent: "PerplexityBot",
                allow: "/",
            },
        ],
        sitemap: `${BASE_URL}/sitemap.xml`,
        host: BASE_URL,
    };
}