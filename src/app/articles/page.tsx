// src/app/articles/page.tsx

import Link from 'next/link';
import ArticleSummary from '@/components/ArticleSummary';
import { getSortedContentData, ArticleMetadata } from '@/lib/content';

const ArticlesPage = async () => {
  const articles = await getSortedContentData<ArticleMetadata>('articles');
  
  return (
    <main>
      <div className="container mx-auto px-4 py-16 md:py-24 min-h-screen max-w-4xl">
        <h1 className="font-heading text-4xl font-bold mb-12 text-center">Articles</h1>
        <h2 className="font-heading text-2xl font-bold mb-6 text-center">Coming "Soon" ™</h2>
        <p className="font-heading text-2xl mb-6 text-center">
          For now, check out my <Link href="/projects" className="text-accent underline hover:no-underline">projects</Link>!
        </p>
        
        <div>
          {articles.map((article) => (
            <ArticleSummary
              key={article.slug}
              title={article.title}
              date={article.date}
              description={article.description ?? ""}   // ensure string
              slug={article.slug}
              tags={article.tags ?? []}                 // ensure array
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ArticlesPage;
