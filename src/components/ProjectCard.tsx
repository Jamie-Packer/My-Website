// src/components/ProjectCard.tsx

import Image from 'next/image';
import Link from 'next/link';
import ProjectLinks from '@/components/ProjectLinks';

interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  liveUrl?: string; 
  repoUrl?: string;
}

const ProjectCard = ({ slug, title, description, imageUrl, tags, liveUrl, repoUrl }: ProjectCardProps) => {
  return (
    <div className="bg-background2 rounded-lg shadow-md flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-accent/20">
      {/* SECTION 1: This part is the link to the detail page */}
      <Link href={`/projects/${slug}`} className="group block">
        <div className="relative w-full h-48">
          <Image
            src={imageUrl}
            alt={`Screenshot of ${title}`}
            fill
            style={{ objectFit: 'cover' }}
            className="group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6">
          <h3 className="font-heading text-xl font-bold mb-2 group-hover:text-accent transition-colors">{title}</h3>
          <p className="text-foreground2 mb-4 text-sm">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="bg-accent/10 border border-accent/30 text-foreground2 text-xs font-semibold px-2.5 py-1 rounded-md">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
      
      {/* SECTION 2: This part contains the separate, external links */}
      {(liveUrl || repoUrl) && (
        <div className="px-6 pb-6 pt-2 mt-auto">
          <div className="border-t border-foreground/10 pt-4">
            <ProjectLinks liveUrl={liveUrl} repoUrl={repoUrl} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;