import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import { rehypeBaseImageSrc } from "./src/lib/rehypeBaseImageSrc.mjs";

const base = "/the-blue-wisent";

export default defineConfig({
  site: "https://radupirosca.github.io/the-blue-wisent/",
  base,
  integrations: [mdx()],
  markdown: {
    rehypePlugins: [[rehypeBaseImageSrc, { base }]],
  },
});
