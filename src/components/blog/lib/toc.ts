import { TOCItemType } from "../components/toc-minimap";

export interface TocItem {
    id: string;
    text: string;
    level: 1 | 2 | 3;
}

export function extractToc(markdown: string): TocItem[] {
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const items: TocItem[] = [];
    let match;

    while ((match = headingRegex.exec(markdown)) !== null) {
        const level = match[1].length as 1 | 2 | 3;
        const text = match[2].trim();
        const id = text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");
        items.push({ id, text, level });
    }

    return items;
}

export function toTOCMinimapItems(items: TocItem[]): TOCItemType[] {
    return items.map((item) => ({
        title: item.text,
        url: `#${item.id}`,
        depth: item.level,
    }));
}
