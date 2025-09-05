// src/app/articles/[slug]/page.tsx

import { getSortedContentData, getContentBySlug, ArticleMetadata } from '@/lib/content';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import YouTubeEmbed from '@/components/YouTubeEmbed';

export async function generateStaticParams() {
  const articles = await getSortedContentData<ArticleMetadata>('articles');
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params: { slug } }: { params: { slug: string } }) {
  const { metadata, content } = await getContentBySlug('articles', slug);
  const articleMetadata = metadata as ArticleMetadata;

  const components = {
    YouTubeEmbed,
  };

  return (
    <main>
      <Navbar />
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-3xl min-h-screen">
        <article>
          <h1 className="font-heading text-4xl font-bold mb-2">{articleMetadata.title}</h1>
          <p className="text-foreground2 text-lg mb-8">{new Date(articleMetadata.date).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          
          <div className="prose prose-lg prose-invert max-w-none">
            <MDXRemote source={content} components={components} />
          </div>
        </article>
      </div>
      <Footer />
    </main>
  );
}