// src/app/page.tsx
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import GitHubIcon from '@/components/icons/GitHubIcon';
import LinkedInIcon from '@/components/icons/LinkedInIcon';
import EmailIcon from '@/components/icons/EmailIcon';


const HomePage = () => {
  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        <div className="bg-background hidden md:block">
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: "url('/placeholder_img.svg')" }}
          >
          </div>
        </div>

        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left p-8">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Hello, <br /> I'm <span className="text-accent">Jamie.</span>
          </h1>
          <p className="text-lg sm:text-xl text-foreground2 max-w-xxl">
            I'm a Data Science graduate looking for my first role in the industry.
          </p>
          <a
            href="#about"
            className="mt-8 inline-block bg-accent text-foreground font-bold py-3 px-6 rounded-md transition duration-200 hover:brightness-150"
          >
            Learn More ↓
          </a>
        </div>
      </section>

      {/* About & Contact Section */}
      <section id="about" className="bg-background2 relative min-h-screen flex items-center py-12 px-4 sm:px-6 lg:px-8">
        
        {/* 'Back to Top' Button */}
        <a 
          href="#" 
          className="absolute top-16 left-1/2 -translate-x-1/2 bg-accent text-foreground rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold transition duration-200 hover:brightness-70"
          aria-label="Back to top"
        >
          ↑
        </a>

        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center md:space-x-12">
            <div className="md:w-1-2 mb-8 md:mb-0">
              <h2 className="font-heading text-3xl font-bold mb-6">About Me</h2>
              <p className="text-foreground2 mb-8">
                I'm passionate about leveraging data to solve real problems and create meaningful insights. My skills in Python, machine learning, and data visualization are the foundation of my work. This website serves as a portfolio to showcase my projects and share my findings. :)
              </p>
              <div className="flex space-x-8">
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-accent transition-colors duration-200" aria-label="Email Me">
                  <EmailIcon className="w-8 h-8" />
                </a>
                <a href="https://www.linkedin.com/in/jamie-packer-622101238/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-accent transition-colors duration-200" aria-label="LinkedIn Profile">
                  <LinkedInIcon className="w-8 h-8" />
                </a>
                <a href="https://github.com/Jamie-Packer" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-accent transition-colors duration-200" aria-label="GitHub Profile">
                  <GitHubIcon className="w-8 h-8" />
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex flex-col space-y-4">
              <a
                href="/placeholder_cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent hover:brightness-150 text-foreground font-bold py-3 px-6 rounded-md transition-colors duration-200 text-center flex-1"
              >
                View CV
              </a>
              <Link
                href="/projects"
                className="bg-background hover:brightness-130 text-foreground font-bold py-3 px-6 rounded-md transition-colors duration-200 text-center flex-1"
              >
                My Projects
              </Link>
              <Link
                href="/articles"
                className="bg-background hover:brightness-130 text-foreground font-bold py-3 px-6 rounded-md transition-colors duration-200 text-center flex-1"
              >
                My Articles
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default HomePage;