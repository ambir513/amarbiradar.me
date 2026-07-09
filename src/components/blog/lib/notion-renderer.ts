import { NotionRenderer } from "@notion-render/client";
import hljsPlugin from "@notion-render/hljs-plugin";
import bookmarkPlugin from "@notion-render/bookmark-plugin";

import { notion } from "./notion";

export const renderer = new NotionRenderer({
    client: notion,
});

renderer.use(hljsPlugin({}));
renderer.use(bookmarkPlugin(undefined));