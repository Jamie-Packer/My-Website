// src/app/projects/[slug]/page.tsx

import { getSortedContentData, getContentBySlug, ProjectMetadata } from '@/lib/content';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import ExternalLinkIcon from '@/components/icons/ExternalLinkIcon';
import GitHubIcon from '@/components/icons/GitHubIcon';

export async function generateStaticParams() {
  const projects = await getSortedContentData<ProjectMetadata>('projects');
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  // vvv THIS IS THE CORRECT FIX FROM THE DOCUMENTATION vvv
  const { slug } = await params;

  const { metadata, content } = await getContentBySlug('projects', slug);
  const projectMetadata = metadata as ProjectMetadata;

  return (
    <main>
      <Navbar />
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl min-h-screen">
        <article>
          <div className="mb-12">
            <h1 className="font-heading text-5xl font-bold mb-2">{projectMetadata.title}</h1>
            <p className="text-foreground2 text-xl mb-6">{projectMetadata.description}</p>
            <div className="flex flex-wrap gap-6 items-center">
              {projectMetadata.liveUrl && (
                <a href={projectMetadata.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-foreground hover:text-accent transition-colors duration-200">
                  <ExternalLinkIcon className="w-5 h-5" />
                  Live Site
                </a>
              )}
              {projectMetadata.repoUrl && (
                <a href={projectMetadata.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-foreground hover:text-accent transition-colors duration-200">
                  <GitHubIcon className="w-5 h-5" />
                  GitHub Repo
                </a>
              )}
            </div>
          </div>
          
          <div className="mb-12">
            <Image
              src={projectMetadata.imageUrl}
              alt={`${projectMetadata.title} screenshot`}
              width={1200}
              height={675}
              className="rounded-lg border border-foreground/10 w-full"
            />
          </div>

          <div className="prose prose-lg prose-invert max-w-none">
            <MDXRemote source={content} />
          </div>
        </article>
      </div>
      <Footer />
    </main>
  );
}