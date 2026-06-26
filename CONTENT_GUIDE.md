# The Blue Wisent Content Guide

## Site Text And Navigation

Edit `src/config/site.ts` for site-wide text and navigation.

- Set a nav item to `visible: false` to hide it from the header.
- Edit `copy.homeIntro`, `copy.writingSection`, `copy.writingArchive`, and the other `copy` fields to replace the current BLABLA placeholders.
- Internal navigation should use paths relative to the configured GitHub Pages base. The layouts already prefix links with Astro's `import.meta.env.BASE_URL`.

## Writing Articles

Add one Markdown file per article in:

```text
src/content/writing/
```

Recommended filename format:

```text
YYYY-MM-DD-short-title.md
```

Each article should start with frontmatter:

```md
---
title: "Article Title"
subtitle: "Optional subtitle shown under the title."
description: "One sentence used in article lists and page metadata."
intro: "The opening paragraph rendered more prominently at the top of the article."
date: 2026-06-26
updated: 2026-06-26
heroImage:
  src: "/images/writing/example.jpg"
  alt: "Describe the image for readers using screen readers."
  caption: "Optional caption."
tags: ["notes", "example"]
draft: false
---

Write the rest of the article here in normal Markdown.
```

Required fields:

- `title`
- `description`
- `intro`
- `date`
- `draft`

Optional fields:

- `subtitle`
- `updated`
- `heroImage`
- `tags`

Set `draft: true` to keep an article out of the built site.

## Article URLs

Astro creates the article URL from the markdown filename.

Example:

```text
src/content/writing/2026-06-26-first-note.md
```

becomes:

```text
/the-blue-wisent/writing/2026-06-26-first-note/
```

The same article appears automatically on the homepage writing preview and on the full Writing page when `draft: false`.

## Images

Put public article images in:

```text
public/images/writing/
```

Use them in frontmatter:

```yaml
heroImage:
  src: "/images/writing/example.jpg"
  alt: "A useful image description."
```

Use them inside Markdown:

```md
![A useful image description](/images/writing/example.jpg)
```

The site has a small Markdown transform that rewrites root-relative image paths so they work on GitHub Pages under `/the-blue-wisent/`.

## Local Development

```bash
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:4321/the-blue-wisent/
```

## Production Check

```bash
npm run build
```

This is the most important local check before pushing to GitHub Pages.
