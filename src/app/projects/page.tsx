// src/app/projects/page.tsx

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { getSortedContentData, ProjectMetadata } from "@/lib/content";

// vvv FIX: Make the component async
export default async function ProjectsPage() {
  // vvv FIX: Await the result of the function call
  const projects = await getSortedContentData<ProjectMetadata>('projects');
  
  return (
    <main>
      <Navbar />
      <div className="container mx-auto px-4 py-16 md:py-24 min-h-screen">
        <h1 className="font-heading text-4xl font-bold mb-4">My Work</h1>
        <p className="text-foreground2 text-lg mb-12">
          A collection of projects showcasing my skills in data science and web development.
        </p>
        
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