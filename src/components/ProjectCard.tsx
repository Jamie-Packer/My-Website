// src/components/ProjectCard.tsx

import Image from 'next/image';
import Link from 'next/link';
import GitHubIcon from '@/components/icons/GitHubIcon';
import ExternalLinkIcon from './icons/ExternalLinkIcon';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  liveUrl?: string; // Optional link to live site
  repoUrl: string; // Required link to github
}

const ProjectCard = ({ title, description, imageUrl, tags, liveUrl, repoUrl }: ProjectCardProps) => {
  return (
    <div className="bg-background2 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02] flex flex-col">
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={`Screenshot of ${title}`}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-heading text-xl font-bold mb-2">{title}</h3>
        <p className="text-foreground2 mb-4 text-sm flex-grow">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span key={tag} className="bg-accent/10 border border-accent/30 text-accent text-xs font-semibold px-2.5 py-1 rounded-md">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex space-x-4 mt-auto">
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-semibold text-foreground hover:text-accent transition-colors duration-200">
              <ExternalLinkIcon className="w-5 h-5" />
              Live Site
            </a>
          )}
          <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-semibold text-foreground hover:text-accent transition-colors duration-200">
            <GitHubIcon className="w-5 h-5" />
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;