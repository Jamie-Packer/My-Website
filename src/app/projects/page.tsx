// src/app/projects/page.tsx

import ProjectCard from "@/components/ProjectCard";
import { getSortedContentData, ProjectMetadata } from "@/lib/content";

export default async function ProjectsPage() {
  const projects = await getSortedContentData<ProjectMetadata>('projects');
  
  return (
    <main>
      <div className="container mx-auto px-4 py-16 md:py-24 min-h-screen">
        <h1 className="font-heading text-4xl font-bold mb-4">My Work</h1>
        <p className="text-foreground2 text-lg mb-12">
          A collection of projects showcasing my skills.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              title={project.title}
              description={project.description ?? ""}   // ensure string
              imageUrl={project.imageUrl}
              tags={project.tags ?? []}                 // ensure array
              liveUrl={project.liveUrl}
              repoUrl={project.repoUrl}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
