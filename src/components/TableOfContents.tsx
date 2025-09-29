"use client";

import React from "react";

type TOCItem = { id: string; text: string; level: number };

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s/]+/g, "-")
    .replace(/[^\w-]/g, "");
}

interface TableOfContentsProps {
  containerSelector?: string;
  minLevel?: number; // default 2
  maxLevel?: number; // default 4
  defaultCollapsed?: boolean;
  title?: string;
  scrollMarginTopPx?: number;
}

type Node = {
  id?: string;
  text?: string;
  level: number;
  children: Node[];
};

export default function TableOfContents({
  containerSelector = ".prose",
  minLevel = 2,
  maxLevel = 4,
  defaultCollapsed = true,
  title = "Contents",
  scrollMarginTopPx = 96,
}: TableOfContentsProps) {
  const [items, setItems] = React.useState<TOCItem[]>([]);
  const [tree, setTree] = React.useState<Node | null>(null);
  const [open, setOpen] = React.useState(!defaultCollapsed);
  const [activeId, setActiveId] = React.useState<string | null>(null);

  // Collect headings from DOM
  React.useEffect(() => {
    const root = document.querySelector(containerSelector);
    if (!root) return;

    const selector = Array.from({ length: maxLevel - minLevel + 1 }, (_, i) => `h${i + minLevel}`).join(",");
    const headings = Array.from(root.querySelectorAll<HTMLHeadingElement>(selector));

    const next: TOCItem[] = headings.map(h => {
      if (!h.id) {
        const base = slugify(h.textContent || "section");
        let candidate = base;
        let n = 2;
        while (document.getElementById(candidate)) candidate = `${base}-${n++}`;
        h.id = candidate;
      }
      if (scrollMarginTopPx > 0) h.style.scrollMarginTop = `${scrollMarginTopPx}px`;
      return { id: h.id, text: h.textContent || "", level: Number(h.tagName.substring(1)) };
    });

    setItems(next);
  }, [containerSelector, minLevel, maxLevel, scrollMarginTopPx]);

  // Build a nested tree from the flat list
  React.useEffect(() => {
    if (items.length === 0) {
      setTree(null);
      return;
    }
    const root: Node = { level: minLevel - 1, children: [] };
    const stack: Node[] = [root];

    items.forEach(({ id, text, level }) => {
      const node: Node = { id, text, level, children: [] };

      while (stack.length && stack[stack.length - 1].level >= level) stack.pop();
      stack[stack.length - 1].children.push(node);
      stack.push(node);
    });

    setTree(root);
  }, [items, minLevel]);

  // Active section highlight
  React.useEffect(() => {
    if (items.length === 0) return;
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const id = (e.target as HTMLElement).id;
            if (id) setActiveId(id);
          }
        });
      },
      { rootMargin: "0px 0px -70% 0px", threshold: [0, 1] }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [items]);

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
      setActiveId(id);
    }
  };

  if (!tree || tree.children.length === 0) return null;

  // When closed, clicking anywhere on the box opens it
  const handleNavClickWhenClosed = () => {
    if (!open) setOpen(true);
  };

  function RenderList({ nodes, depth = 0 }: { nodes: Node[]; depth?: number }) {
    // Stronger visual indentation + subtle guideline using themed colors
    const listClass =
      depth === 0
        ? "mt-3 space-y-1"
        : "mt-1 space-y-1 border-l border-foreground/20 pl-5 md:pl-6"; // increased indent

    return (
      <ul className={listClass}>
        {nodes.map((n) => {
          const isActive = n.id && n.id === activeId;
          return (
            <li key={n.id ?? `${n.text}-${n.level}-${depth}`} className="leading-5">
              {n.id ? (
                <a
                  href={`#${n.id}`}
                  onClick={handleClick(n.id)}
                  className={[
                    "block rounded-xl px-2 py-1 text-sm transition",
                    depth === 0 ? "font-medium" : "opacity-90",
                    isActive ? "bg-foreground/10" : "hover:bg-foreground/5",
                    "text-foreground",
                  ].join(" ")}
                >
                  {n.text}
                </a>
              ) : null}
              {n.children.length > 0 && <RenderList nodes={n.children} depth={depth + 1} />}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <nav
      aria-label="Table of contents"
      className={[
        // use theme vars instead of hard-coded white
        "rounded-2xl border border-foreground/10 bg-foreground/5 p-3 md:p-4",
        !open ? "cursor-pointer" : "",
      ].join(" ")}
      onClick={handleNavClickWhenClosed}
    >
      {/* Header toggles open/closed */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(o => !o);
        }}
        aria-expanded={open}
        aria-controls="toc-list"
        className="flex w-full items-center justify-between gap-2 rounded-xl px-2 py-2 text-left hover:bg-foreground/5"
      >
        <span className="text-sm font-heading uppercase tracking-wide text-foreground">
          {title}
        </span>

        {/* Arrow indicator: V (down) / ^ (up). Keep an sr-only label for a11y */}
        <span className="rounded-xl border border-foreground/15 px-2 py-1 text-xs text-foreground/80">
          <span aria-hidden="true">{open ? "∧" : "∨"}</span>
          <span className="sr-only">{open ? "Collapse" : "Expand"}</span>
        </span>
      </button>

      {open && (
        <div id="toc-list">
          <RenderList nodes={tree.children} />
        </div>
      )}
    </nav>
  );
}
