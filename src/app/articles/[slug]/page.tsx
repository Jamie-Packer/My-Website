import type { Metadata } from "next";
import { getAllContentSlugs, getContentBySlug, ArticleMetadata } from '@/lib/content';
import { MDXRemote } from 'next-mdx-remote/rsc';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import TagList from "@/components/TagList";
import { notFound } from 'next/navigation';
import FigureImage from '@/components/FigureImage';
import MDXLink from '@/components/MDXLink';

export async function generateStaticParams() {
  // Include unpublished articles so direct/hero links still pre-render.
  const slugs = await getAllContentSlugs("articles");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getContentBySlug<ArticleMetadata>("articles", slug);
  if (!entry) return {};

  const { title, description, imageUrl } = entry.metadata;
  return {
    title,
    ...(description ? { description } : {}),
    openGraph: {
      title,
      ...(description ? { description } : {}),
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const entry = await getContentBySlug<ArticleMetadata>('articles', slug);
  if (!entry) return notFound();

  const { metadata, content } = entry;
  const articleMetadata = metadata as ArticleMetadata;

  const components = {
    a: MDXLink,
    YouTubeEmbed,
    TagList,
    FigureImage,
  };

  return (
    <main>
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-3xl min-h-screen">
        <article>
          <h1 className="font-heading text-4xl font-bold mb-2">{articleMetadata.title}</h1>
          <p className="text-foreground2 text-lg mb-8">
            {new Date(articleMetadata.date).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          <div className="prose prose-lg prose-invert max-w-none">
            <MDXRemote source={content} components={components} options={{ blockJS: false }} />
          </div>
        </article>
      </div>
    </main>
  );
}
