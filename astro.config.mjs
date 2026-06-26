import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://radupirosca.github.io",
  base: "/the-blue-wisent",
  integrations: [mdx()],
});
