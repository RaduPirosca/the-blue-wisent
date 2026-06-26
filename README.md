# The Blue Wisent

A personal blog and web experiment garden built with Astro, Markdown, and GitHub Pages.

## Local Setup

```bash
npm install
npm run dev
```

## Add A Post

Create a Markdown file in `src/content/posts/`.

```md
---
title: "Post Title"
description: "Short summary."
date: 2026-06-26
tags: ["notes"]
draft: false
---

<ARTICLE-BODY-TO-BE-FILLED>
```

## Add An Experiment

Create an Astro page in `src/pages/experiments/`, then add metadata in `src/content/experiments/`.

## Deploy

1. Create a public GitHub repository.
2. Push this folder to it.
3. In `astro.config.mjs`, replace `YOUR-GITHUB-USERNAME`.
4. If the repo name is not `the-blue-wisent`, update `base`.
5. In GitHub, go to Settings -> Pages -> Build and deployment -> Source, then choose GitHub Actions.
6. Push to `main`.
