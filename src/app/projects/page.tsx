// src/app/projects/page.tsx

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';

// Placeholder data
const placeholderProjects = [
  {
    title: 'CS Demo Analyzer',
    description: 'A web application that parses Counter-Strike demofiles to provide users with advanced statistics and insights into their gameplay.',
    imageUrl: '/placeholder_img.svg',
    tags: ['Python', 'Next.js', 'Machine Learning', 'AWS S3'],
    liveUrl: '#',
    repoUrl: 'https://github.com/Jamie-Packer/My-Website',
  },
  {
    title: 'Customer Churn Prediction',
    description: 'A machine learning model developed to predict customer churn for a subscription-based service, helping to target retention efforts.',
    imageUrl: '/placeholder_img.svg',
    tags: ['Python', 'Scikit-learn', 'Pandas', 'Jupyter'],
    repoUrl: 'https://github.com/Jamie-Packer/My-Website',
  },
  {
    title: 'Personal Portfolio Website',
    description: 'The very website you are looking at now! Built from scratch using modern web technologies to showcase my skills and projects.',
    imageUrl: '/placeholder_img.svg',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    liveUrl: '#',
    repoUrl: 'https://github.com/Jamie-Packer/My-Website',
  },
  {
    title: 'Data Visualization Dashboard',
    description: 'An interactive dashboard built with Plotly Dash to visualize complex sales data across multiple regions and product lines.',
    imageUrl: '/placeholder_img.svg',
    tags: ['Python', 'Plotly Dash', 'Pandas'],
    liveUrl: '#',
    repoUrl: 'https://github.com/Jamie-Packer/My-Website',
  },
];

const ProjectsPage = () => {
  return (
    <main>
      <Navbar />
      <div className="container mx-auto px-4 py-16 md:py-24 min-h-screen">
        <h1 className="font-heading text-4xl font-bold mb-12 text-center">Projects</h1>
        
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {placeholderProjects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              tags={project.tags}
              liveUrl={project.liveUrl}
              repoUrl={project.repoUrl}
            />
          ))}
        </div>

      </div>
      <Footer />
    </main>
  );
};

export default ProjectsPage;