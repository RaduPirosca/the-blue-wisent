import { getCollection } from "astro:content";
import { withBase } from "@lib/paths";

export const ITEMS_PER_PAGE = 10;

export async function getPublishedPosts() {
  return (await getCollection("posts"))
    .filter((entry) => !entry.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getExperiments() {
  return (await getCollection("experiments"))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function getSearchItems({
  posts = [],
  experiments = [],
}: {
  posts?: Awaited<ReturnType<typeof getPublishedPosts>>;
  experiments?: Awaited<ReturnType<typeof getExperiments>>;
}) {
  return [
    ...posts.map((entry) => ({
      title: entry.data.title,
      href: withBase(`posts/${entry.slug}/`),
      type: "Post" as const,
      description: entry.data.description,
    })),
    ...experiments.map((entry) => ({
      title: entry.data.title,
      href: withBase(entry.data.link),
      type: "Experiment" as const,
      description: entry.data.description,
    })),
  ];
}

export function getTotalPages(totalItems: number) {
  return Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
}

export function getPaginationRange(totalPages: number) {
  return Array.from({ length: totalPages }, (_, index) => index + 1);
}

export function getPostsPageHref(pageNumber: number) {
  return pageNumber === 1 ? withBase("posts/") : withBase(`posts/page/${pageNumber}/`);
}

export function getExperimentsPageHref(pageNumber: number) {
  return pageNumber === 1 ? withBase("experiments/") : withBase(`experiments/page/${pageNumber}/`);
}
