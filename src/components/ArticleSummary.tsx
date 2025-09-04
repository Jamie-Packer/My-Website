// src/components/ArticleSummary.tsx

import Link from 'next/link';

interface ArticleSummaryProps {
  title: string;
  date: string;
  description: string;
  slug: string;
  tags: string[];
}

const ArticleSummary = ({ title, date, description, slug, tags }: ArticleSummaryProps) => {
  return (
    <article className="border border-foreground/10 bg-background2 p-6 rounded-lg shadow-md mb-8 transition-transform duration-300 hover:scale-[1.02]">
      <div className="flex justify-between items-baseline mb-2">
        <h2 className="font-heading text-2xl font-bold">
          <Link href={`/articles/${slug}`} className="hover:text-accent transition-colors duration-200">
            {title}
          </Link>
        </h2>
        <p className="text-sm text-foreground2">{date}</p>
      </div>
      <p className="text-foreground2 mb-4">
        {description}
      </p>

      <div className="mt-4 flex justify-between items-center">
        <Link href={`/articles/${slug}`} className="font-bold text-accent transition duration-200 hover:brightness-150">
          Read More →
        </Link>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="bg-accent/10 border border-accent/30 text-accent text-xs font-semibold px-2.5 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default ArticleSummary;