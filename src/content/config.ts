import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string(),
    intro: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    heroImage: z
      .object({
        src: z.string(),
        alt: z.string(),
        caption: z.string().optional(),
      })
      .optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const experiments = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    status: z.enum(["sketch", "live", "archived"]).default("sketch"),
    link: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { posts, experiments };
