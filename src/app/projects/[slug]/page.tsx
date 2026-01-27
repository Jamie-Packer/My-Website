// src/app/projects/[slug]/page.tsx
import { getSortedContentData, getContentBySlug, ProjectMetadata } from '@/lib/content';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import ExternalLinkIcon from '@/components/icons/ExternalLinkIcon';
import GitHubIcon from '@/components/icons/GitHubIcon';
import { notFound } from 'next/navigation';
import TableOfContents from '@/components/TableOfContents';
import FigureImage from '@/components/FigureImage'; 

// Make these available inside MDX:
import TagList from '@/components/TagList';
import YouTubeEmbed from '@/components/YouTubeEmbed';

export async function generateStaticParams() {
  const projects = await getSortedContentData<ProjectMetadata>('projects');
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const entry = await getContentBySlug<ProjectMetadata>('projects', slug);
  if (!entry) return notFound();

  const { metadata, content } = entry;
  const projectMetadata = metadata as ProjectMetadata;

  const components = {
    TagList,
    YouTubeEmbed,
    FigureImage,
  };

  return (
    <main>
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl min-h-screen">
        <article>
          <div className="mb-12">
            <h1 className="font-heading text-5xl font-bold mb-2">{projectMetadata.title}</h1>
            {projectMetadata.date && (
              <p className="text-foreground2 text-lg mb-4">
                {new Date(projectMetadata.date).toLocaleDateString('en-GB', {
                  year: 'numeric',
                  month: 'long',
                })}
              </p>
            )}
            <p className="text-foreground2 text-xl mb-6">{projectMetadata.description}</p>
            {projectMetadata.tags?.length ? (
              <TagList items={projectMetadata.tags} />
            ) : null}

            <div className="flex flex-wrap gap-6 items-center mt-6">
              {projectMetadata.liveUrl && (
                <a
                  href={projectMetadata.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-foreground hover:text-accent transition-colors duration-200"
                >
                  <ExternalLinkIcon className="w-5 h-5" />
                  Live Site
                </a>
              )}
              {projectMetadata.repoUrl && (
                <a
                  href={projectMetadata.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-foreground hover:text-accent transition-colors duration-200"
                >
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
              priority
            />
          </div>

          {/* TOC */}
          <div className="mb-8">
            <TableOfContents containerSelector=".prose" defaultCollapsed />
          </div>

          <div className="prose prose-lg prose-invert max-w-none">
            <MDXRemote source={content} components={components} />
          </div>
        </article>
      </div>
    </main>
  );
}
