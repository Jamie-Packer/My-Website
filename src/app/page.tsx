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
            src="/images/home/home_image.png"
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
          <p className="text-lg sm:text-xl text-foreground2 max-w-xxl">
            A Data Science graduate looking for a role in the world of data.
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
              <p className="text-foreground2 mb-8 text-lg">
                Eager to learn. I enjoy working with data to produce tangible outcomes such as answering interesting questions and building useful models. My projects typically involve python, machine learning, and statistical analysis. This site contains links and information on what i've been up to. Have a look around! :)
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
                href="/Jamie_Packer_CV.pdf"
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
    </main>
  );
};

export default HomePage;