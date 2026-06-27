export function rehypeBaseImageSrc({ base = "/" } = {}) {
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;

  return (tree) => {
    visit(tree, (node) => {
      if (node.type !== "element" || node.tagName !== "img") return;

      const src = node.properties?.src;
      if (typeof src !== "string") return;
      if (!src.startsWith("/") || src.startsWith("//")) return;
      if (src.startsWith(normalizedBase)) return;

      node.properties.src = `${normalizedBase}${src.slice(1)}`;
    });
  };
}

export function rehypeImageCaptions() {
  return (tree) => {
    wrapCaptionedImages(tree);
  };
}

function visit(node, visitor) {
  visitor(node);

  if (!Array.isArray(node.children)) return;

  for (const child of node.children) {
    visit(child, visitor);
  }
}

function wrapCaptionedImages(node) {
  if (!Array.isArray(node.children)) return;

  node.children = node.children.map((child) => {
    if (
      child.type === "element" &&
      child.tagName === "p" &&
      Array.isArray(child.children) &&
      child.children.length === 1
    ) {
      const image = child.children[0];
      const title = image?.properties?.title;

      if (image?.type === "element" && image.tagName === "img" && typeof title === "string" && title.length > 0) {
        delete image.properties.title;

        return {
          type: "element",
          tagName: "figure",
          properties: {},
          children: [
            image,
            {
              type: "element",
              tagName: "figcaption",
              properties: {},
              children: [{ type: "text", value: title }],
            },
          ],
        };
      }
    }

    wrapCaptionedImages(child);
    return child;
  });
}
