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
                    "/_next/",
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
                userAgent: "ChatGPT-User",
                allow: "/",
            },

            {
                userAgent: "ClaudeBot",
                allow: "/",
            },

            {
                userAgent: "CCBot",
                allow: "/",
            },

            {
                userAgent: "PerplexityBot",
                allow: "/",
            },

            {
                userAgent: "Applebot",
                allow: "/",
            },

            {
                userAgent: "bingbot",
                allow: "/",
            },
        ],

        sitemap: `${BASE_URL}/sitemap.xml`,

        host: BASE_URL,
    };
}