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
    // The hover effect classes have been updated to match the ProjectCard
    <Link 
      href={`/articles/${slug}`}
      className="group block cursor-pointer border border-foreground/10 bg-background2 p-6 rounded-lg shadow-md mb-8 transition-shadow duration-300 hover:shadow-lg hover:shadow-accent/20"
    >
      <div className="flex justify-between items-baseline mb-2">
        <h2 className="font-heading text-2xl font-bold transition-colors duration-200 group-hover:text-accent">
          {title}
        </h2>
        <p className="text-sm text-foreground2">{date}</p>
      </div>
      <p className="text-foreground2 mb-4">
        {description}
      </p>

      <div className="mt-4 flex justify-between items-center">
        <span className="font-bold text-accent transition duration-200 group-hover:brightness-150">
          Read More →
        </span>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="bg-accent/10 border border-accent/30 text-foreground2 text-xs font-semibold px-2.5 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ArticleSummary;