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

function visit(node, visitor) {
  visitor(node);

  if (!Array.isArray(node.children)) return;

  for (const child of node.children) {
    visit(child, visitor);
  }
}
