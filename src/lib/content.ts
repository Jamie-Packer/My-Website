// src/lib/content.ts

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { compareDesc } from 'date-fns';

// Base metadata interface for all content
interface BaseContentMetadata {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  published: boolean;
}

// Specific metadata for articles
export interface ArticleMetadata extends BaseContentMetadata {
  date: string;
}

// Specific metadata for projects
export interface ProjectMetadata extends BaseContentMetadata {
  date?: string; // Date is optional for projects
  imageUrl: string;
  liveUrl?: string;
  repoUrl?: string;
}

// A helper function to get the content directory path
const getContentDirectory = (type: 'articles' | 'projects') => {
  return path.join(process.cwd(), `content/${type}`);
};

/**
 * Reads all .mdx files from a directory, parses their frontmatter,
 * and returns them sorted by date.
 */
export const getSortedContentData = async <T extends BaseContentMetadata>(
  type: 'articles' | 'projects'
): Promise<T[]> => {
  const contentDirectory = getContentDirectory(type);
  const fileNames = await fs.readdir(contentDirectory);

  const allContentData = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.mdx$/, '');
        const fullPath = path.join(contentDirectory, fileName);
        const fileContents = await fs.readFile(fullPath, 'utf8');
        const { data } = matter(fileContents);
        return { slug, ...data } as T;
      })
  );

  // Filter out any content that is not marked as published
  const publishedContent = allContentData.filter((content) => content.published);

  // Sort the content by date in descending order (newest first)
  return publishedContent.sort((a, b) => {
    const aDate = (a as ArticleMetadata).date;
    const bDate = (b as ArticleMetadata).date;
    if (aDate && bDate) {
      return compareDesc(new Date(aDate), new Date(bDate));
    }
    return 0;
  });
};

/**
 * Reads a single .mdx file by its slug and returns its
 * parsed metadata and content.
 */
export const getContentBySlug = async (
  type: 'articles' | 'projects',
  slug: string
) => {
  const contentDirectory = getContentDirectory(type);
  const fullPath = path.join(contentDirectory, `${slug}.mdx`);
  const fileContents = await fs.readFile(fullPath, 'utf8');

  const { data, content } = matter(fileContents);

  return {
    metadata: data,
    content,
  };
};