// src/lib/content.ts
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export interface ArticleMetadata {
  title: string;
  date: string;             // ISO date string
  description?: string;
  imageUrl?: string;
  // Optional: set `published: false` to hide from listings (still accessible by URL)
  published?: boolean;
}

export interface ProjectMetadata {
  title: string;
  description: string;
  imageUrl: string;
  liveUrl?: string;
  repoUrl?: string;
  date?: string;
  // Optional: set `published: false` to hide from listings (still accessible by URL)
  published?: boolean;
}

type Kind = "articles" | "projects";

function dirFor(type: Kind) {
  return path.join(process.cwd(), "content", type);
}

/**
 * List content for a section. Only include items where `published !== false`.
 * Sorting: newest first when `date` is present.
 */
export async function getSortedContentData<T extends { date?: string; published?: boolean }>(
  type: Kind
): Promise<(T & { slug: string })[]> {
  const dir = dirFor(type);
  const files = await fs.readdir(dir);

  const items = await Promise.all(
    files
      .filter((f) => f.endsWith(".mdx"))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, "");
        const fullPath = path.join(dir, file);
        const raw = await fs.readFile(fullPath, "utf8");
        const { data } = matter(raw);
        return { slug, ...(data as T) };
      })
  );

  const visible = items.filter((it) => it.published !== false);

  return visible.sort((a, b) => {
    if (a.date && b.date) return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (a.date && !b.date) return -1;
    if (!a.date && b.date) return 1;
    return a.slug.localeCompare(b.slug);
  });
}

/**
 * Load a single entry by slug. Does not check `published`,
 * so hidden items remain accessible by direct URL.
 */
export async function getContentBySlug<T extends object>(
  type: Kind,
  slug: string
): Promise<{ metadata: T & { slug: string }; content: string } | null> {
  const fullPath = path.join(dirFor(type), `${slug}.mdx`);

  let raw: string;
  try {
    raw = await fs.readFile(fullPath, "utf8");
  } catch (err: any) {
    if (err?.code === "ENOENT") return null;
    throw err;
  }

  const { data, content } = matter(raw);
  return { metadata: { ...(data as T), slug }, content };
}
