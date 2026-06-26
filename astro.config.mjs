import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://RaduPirosca.github.io",
  base: "/the-blue-wisent",
  integrations: [mdx()],
});
