import type { MetadataRoute } from "next";

const BASE_URL = "https://amarbiradar.me";

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();

    return [
        {
            url: BASE_URL,
            lastModified,
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${BASE_URL}/resume`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/assets/resume.pdf`,
            lastModified,
            changeFrequency: "yearly",
            priority: 0.7,
        },
    ];
}