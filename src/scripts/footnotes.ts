function cleanFootnoteContent(footnote: Element) {
  const clone = footnote.cloneNode(true) as HTMLElement;

  for (const backlink of clone.querySelectorAll("[data-footnote-backref]")) {
    backlink.remove();
  }

  return clone.innerHTML.trim();
}

function positionPopover(popover: HTMLElement, anchor: HTMLElement) {
  const rect = anchor.offsetParent
    ? anchor.getBoundingClientRect()
    : anchor.getBoundingClientRect();
  const gap = 10;
  const article = anchor.closest(".article");
  const articleRect = article?.getBoundingClientRect();
  const maxLeft = (articleRect?.width ?? window.innerWidth) - popover.offsetWidth;
  const anchorLeft = articleRect ? rect.left - articleRect.left : anchor.offsetLeft;
  const left = Math.max(0, Math.min(anchorLeft, maxLeft));

  popover.style.left = `${left}px`;
  popover.style.top = `${anchor.offsetTop + anchor.offsetHeight + gap}px`;
}

function setupFootnotes() {
  const references = document.querySelectorAll<HTMLAnchorElement>("[data-footnote-ref]");
  if (references.length === 0) return;

  const popover = document.createElement("aside");
  popover.className = "footnote-popover";
  popover.setAttribute("role", "dialog");
  popover.setAttribute("aria-live", "polite");
  popover.hidden = true;

  const content = document.createElement("div");
  content.className = "footnote-popover-content";

  popover.append(content);

  const hide = (event: MouseEvent) => {
    if (popover.hidden) return;
    if (event.target instanceof Node && popover.contains(event.target)) return;
    if (event.target instanceof Element && event.target.closest("[data-footnote-ref]")) return;
    popover.hidden = true;
  };

  document.addEventListener("click", hide);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      popover.hidden = true;
    }
  });

  for (const reference of references) {
    reference.addEventListener("click", (event) => {
      event.preventDefault();

      const footnoteId = reference.hash.slice(1);
      const footnote = document.getElementById(decodeURIComponent(footnoteId));
      if (!footnote) return;

      const article = reference.closest(".article");
      if (!article) return;

      content.innerHTML = cleanFootnoteContent(footnote);
      article.append(popover);
      popover.hidden = false;
      positionPopover(popover, reference);
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupFootnotes);
} else {
  setupFootnotes();
}
