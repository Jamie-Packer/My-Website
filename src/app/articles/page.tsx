// src/app/articles/page.tsx

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ArticleSummary from '@/components/ArticleSummary';
// Make sure to import the specific type here
import { getSortedContentData, ArticleMetadata } from '@/lib/content';

const ArticlesPage = () => {
  // Add <ArticleMetadata> to tell the function what type to return
  const articles = getSortedContentData<ArticleMetadata>('articles');

  return (
    <main>
      <Navbar />
      <div className="container mx-auto px-4 py-16 md:py-24 min-h-screen max-w-4xl">
        <h1 className="font-heading text-4xl font-bold mb-12 text-center">Articles</h1>
        
        <div>
          {articles.map((article) => (
            <ArticleSummary
              key={article.slug}
              title={article.title}
              date={article.date} // This will now be valid
              description={article.description}
              slug={article.slug}
              tags={article.tags} 
            />
          ))}
        </div>

      </div>
      <Footer />
    </main>
  );
};

export default ArticlesPage;