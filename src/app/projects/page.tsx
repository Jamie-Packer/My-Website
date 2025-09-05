// src/app/projects/page.tsx

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { getSortedContentData, ProjectMetadata } from "@/lib/content";

export default function ProjectsPage() {
  // 1. Fetch the data for ALL projects
  const projects = getSortedContentData<ProjectMetadata>('projects');

  return (
    <main>
      <Navbar />
      <div className="container mx-auto px-4 py-16 md:py-24 min-h-screen">
        <h1 className="font-heading text-4xl font-bold mb-4">My Work</h1>
        <p className="text-foreground2 text-lg mb-12">
          A collection of projects showcasing my skills in data science and web development.
        </p>

        {/* 2. Map over the project data and render a card for each one */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}