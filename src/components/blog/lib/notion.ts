import { cache } from "react";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { unstable_cache } from "next/cache";

const databaseId = process.env.NOTION_DATA_SOURCE_ID!;

export const notion = new Client({
    auth: process.env.NOTION_ACCESS_TOKEN!,
});

const n2m = new NotionToMarkdown({
    notionClient: notion,
});

/**
 * Get all published blog posts
 */
export const getPosts =
    process.env.NODE_ENV === "development" ?
        async () => {
            return notion.dataSources.query({
                data_source_id: databaseId,
                filter: {
                    property: "Status",
                    status: {
                        equals: "Published",
                    },
                },
                sorts: [
                    {
                        property: "Published Date",
                        direction: "descending",
                    },
                ],
            });
        } :
        unstable_cache(
            async () => {
                return notion.dataSources.query({
                    data_source_id: databaseId,
                    filter: {
                        property: "Status",
                        status: {
                            equals: "Published",
                        },
                    },
                    sorts: [
                        {
                            property: "Published Date",
                            direction: "descending",
                        },
                    ],
                });
            },
            ["notion-posts"],
            {
                revalidate: 3600,
                tags: ["posts"],
            }
        );

/**
 * Get Notion blocks
 */
export const getBlocks = cache(async (pageId: string) => {
    return notion.blocks.children.list({
        block_id: pageId,
    });
});

/**
 * Get post by slug
 */
export const getPostBySlug = cache(async (slug: string) => {
    const response = await notion.dataSources.query({
        data_source_id: databaseId,
        filter: {
            property: "Slug",
            rich_text: {
                equals: slug,
            },
        },
    });

    return response.results[0] ?? null;
});

/**
 * Convert Notion page to Markdown
 */
export const getMarkdown = cache(async (pageId: string) => {
    const mdBlocks = await n2m.pageToMarkdown(pageId);

    return n2m.toMarkdownString(mdBlocks).parent;
});

/**
 * Parse Notion page
 */
export function parsePost(page: any) {
    const createdAt = new Date(page.created_time);

    const props = page.properties;


    return {
        id: page.id,

        title:
            props.Title?.title?.[0]?.plain_text ?? "",

        slug:
            props.Slug?.rich_text?.[0]?.plain_text ?? "",

        description:
            props["SEO Description"]?.rich_text?.[0]?.plain_text ?? "",

        cover:
            page.cover?.external?.url ??
            page.cover?.file?.url ??
            null,

        icon: page.icon,

        category:
            props.Tags?.multi_select?.[0]?.name ??
            "General",

        publishedDate: createdAt.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        }),

        publishedTime: createdAt.toISOString(),

        timeToRead:
            props["Average Time"]?.rich_text?.[0]?.plain_text ??
            "5",

        wordCount:
            props["Word Count"]?.number ?? 0,

        isFeatured:
            props.Featured?.checkbox ?? false,

        lastEdited:
            props["Last edited"]?.last_edited_time ??
            page.last_edited_time,

        lastModified: new Date(
            props["Last edited"]?.last_edited_time ??
            page.last_edited_time
        ).toISOString(),
    };
}