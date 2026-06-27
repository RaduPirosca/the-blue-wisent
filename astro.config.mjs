import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import remarkGfm from "remark-gfm";
import { rehypeBaseImageSrc, rehypeImageCaptions } from "./src/lib/rehypeBaseImageSrc.mjs";

const base = "/the-blue-wisent";

export default defineConfig({
  site: "https://radupirosca.github.io/the-blue-wisent/",
  base,
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypeBaseImageSrc, { base }], rehypeImageCaptions],
  },
});
