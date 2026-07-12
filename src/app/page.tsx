// src/app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import GitHubIcon from '@/components/icons/GitHubIcon';
import LinkedInIcon from '@/components/icons/LinkedInIcon';
import EmailIcon from '@/components/icons/EmailIcon';


const HomePage = () => {
  return (
    <main>

      {/* Hero Section */}
      <section id="hero" className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        <div className="bg-background hidden md:block relative">
          <Image
            src="/images/home/home_image.webp"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left p-8">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Hello, <br /> I'm <span className="text-accent">Jamie.</span>
          </h1>
          <p className="text-lg sm:text-xl text-foreground2 max-w-2xl">
            A data enthusiast looking for my first role in the industry.
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
          className="absolute top-16 left-1/2 -translate-x-1/2 bg-accent text-foreground rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold transition duration-200 hover:brightness-150"
          aria-label="Back to top"
        >
          ↑
        </a>

        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row md:items-start md:gap-12">
            <div className="md:flex-1 md:min-w-0 mb-8 md:mb-0">
              <h2 className="font-heading text-3xl font-bold mb-6">About Me</h2>
              <p className="text-foreground2 mb-8 text-lg">
                Since obtaining my BSc Data Science in 2025, I have been ruthlessly upskilling to prepare for a career in data.  I am <em>always</em> learning.
                <br/><br/>
                Whether it's performing analysis, building a useful model, or designing the pipeline, I enjoy working with <b>real data for real reasons.</b> This site contains information and links to what I've been up to. Have a look around! :)
              </p>
              <div className="flex space-x-8">
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-accent transition-colors duration-200">
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
            <div className="flex w-full max-w-xs md:w-28 md:max-w-none shrink-0 flex-col gap-4">
              <a
                href="/Jamie_Packer_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-accent hover:brightness-150 text-foreground font-bold py-3 px-6 rounded-md transition-colors duration-200 text-center"
              >
                View CV
              </a>
              <Link
                href="/projects"
                className="block w-full bg-background hover:brightness-125 text-foreground font-bold py-3 px-6 rounded-md transition-colors duration-200 text-center"
              >
                My Projects
              </Link>
              <Link
                href="/articles"
                className="block w-full bg-background hover:brightness-125 text-foreground font-bold py-3 px-6 rounded-md transition-colors duration-200 text-center"
              >
                My Articles
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;