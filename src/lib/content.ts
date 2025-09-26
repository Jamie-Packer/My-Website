// src/lib/content.ts
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

// Public types consumed by pages
export interface ArticleMetadata {
  title: string;
  date: string;              // ISO date
  description?: string;
  imageUrl?: string;
  /** If false, hide from listings; still accessible directly by URL. */
  published?: boolean;
}

export interface ProjectMetadata {
  title: string;
  description: string;
  imageUrl: string;
  liveUrl?: string;
  repoUrl?: string;
  date?: string;             // optional
  /** If false, hide from listings; still accessible directly by URL. */
  published?: boolean;
}

type Kind = "articles" | "projects";
type WithSlug<T> = T & { slug: string };

function dirFor(type: Kind) {
  return path.join(process.cwd(), "content", type);
}

/**
 * Return all items for a section except those explicitly marked `published: false`.
 * Sort newest-first when `date` is present; otherwise by slug.
 */
export async function getSortedContentData<
  T extends { date?: string; published?: boolean }
>(type: Kind): Promise<Array<WithSlug<T>>> {
  const dir = dirFor(type);
  const files = await fs.readdir(dir);

  const items: Array<WithSlug<T>> = [];

  for (const file of files) {
    if (!file.endsWith(".mdx")) continue;
    const slug = file.slice(0, -4);
    const fullPath = path.join(dir, file);
    const raw = await fs.readFile(fullPath, "utf8");
    const { data } = matter(raw);
    const meta = data as T;
    items.push({ slug, ...meta });
  }

  const visible = items.filter((it) => it.published !== false);

  visible.sort((a, b) => {
    const ad = a.date ? Date.parse(a.date) : Number.NaN;
    const bd = b.date ? Date.parse(b.date) : Number.NaN;

    if (!Number.isNaN(ad) && !Number.isNaN(bd)) return bd - ad; // newest first
    if (!Number.isNaN(ad)) return -1;
    if (!Number.isNaN(bd)) return 1;
    return a.slug.localeCompare(b.slug);
  });

  return visible;
}

/**
 * Load a single entry by slug. Does not check `published`,
 * so hidden items remain accessible via direct URL.
 * Returns null only if the file does not exist.
 */
export async function getContentBySlug<T extends object>(
  type: Kind,
  slug: string
): Promise<{ metadata: WithSlug<T>; content: string } | null> {
  const fullPath = path.join(dirFor(type), `${slug}.mdx`);

  let raw: string;
  try {
    raw = await fs.readFile(fullPath, "utf8");
  } catch (err) {
    const e = err as NodeJS.ErrnoException;
    if (e.code === "ENOENT") return null;
    throw err;
  }

  const { data, content } = matter(raw);
  const meta = data as T;
  return { metadata: { slug, ...meta }, content };
}
