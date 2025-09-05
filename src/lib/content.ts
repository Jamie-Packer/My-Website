// src/lib/content.ts

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compareDesc } from 'date-fns';

// 1. Define the base properties shared by ALL content
interface BaseContentMetadata {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  published: boolean;
}

// 2. Define the specific properties for Articles
export interface ArticleMetadata extends BaseContentMetadata {
  date: string; // Articles must have a date
}

// 3. Define the specific properties for Projects
export interface ProjectMetadata extends BaseContentMetadata {
  date?: string; // Projects might have a date, but it's optional
  imageUrl: string;
  liveUrl?: string;
  repoUrl?: string;
}

// A generic "union" type that can be either an Article or a Project
export type ContentMetadata = ArticleMetadata | ProjectMetadata;


const getContentDirectory = (type: 'articles' | 'projects') => {
  return path.join(process.cwd(), `content/${type}`);
};


export const getSortedContentData = <T extends BaseContentMetadata>(
  type: 'articles' | 'projects'
): T[] => {
  const contentDirectory = getContentDirectory(type);
  const fileNames = fs.readdirSync(contentDirectory);

  const allContentData = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        slug,
        ...(matterResult.data as Omit<T, 'slug'>),
      };
    });
  
  const publishedContent = allContentData.filter(content => content.published);

  // Sort content by date (if it exists)
  // The 'as any' is a safe way to handle the fact that date is optional on projects
  return publishedContent.sort((a: any, b: any) => {
    if (a.date && b.date) {
      return compareDesc(new Date(a.date), new Date(b.date));
    }
    return 0;
  }) as T[];
}; 


export const getContentBySlug = (type: 'articles' | 'projects', slug: string) => {
  const contentDirectory = getContentDirectory(type);
  const fullPath = path.join(contentDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const { data, content } = matter(fileContents);

  return {
    metadata: data, // This is the frontmatter object
    content: content, // This is the MDX content string
  };
};