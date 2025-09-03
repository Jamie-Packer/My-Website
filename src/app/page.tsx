import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

const HomePage = () => {
  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="bg-zinc-900 grid grid-cols-1 md:grid-cols-2 min-h-screen">
        <div className="bg-gray-600 hidden md:block">
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
          <p className="text-lg sm:text-xl text-gray-400">
            I'm a Data Science graduate looking for my first role in the industry.
          </p>
          <a href="#about" className="mt-8 hover:text-accent transition-colors duration-200">
            Learn More ↓
          </a>
        </div>
      </section>

      {/* About & Contact Section */}
      <section id="about" className="bg-zinc-800 min-h-screen flex items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl flex flex-col md:flex-row items-center md:space-x-12">
          <div className="md:w-1-2 mb-8 md:mb-0">
            <h2 className="font-heading text-3xl font-bold mb-6">About Me</h2>
            <p className="text-gray-400 mb-8">
              I'm passionate about leveraging data to solve real problems and create meaningful insights. My skills in Python, machine learning, and data visualization are the foundation of my work. This website serves as a portfolio to showcase my projects and share my findings. :)
            </p>
            <div className="flex space-x-6 text-gray-400">
              <Link href="/" className="hover:text-accent transition-colors duration-200"> {/* Placeholder for actual email */}
                Email
              </Link>
              <Link href="https://www.linkedin.com/in/Jamie-Packer" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-200">
                LinkedIn
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex flex-col space-y-4">
            <a 
              href="/placeholder_cv.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-accent hover:bg-black text-white font-bold py-3 px-6 rounded-md transition-colors duration-200 text-center flex-1"
            >
              View CV
            </a>
            <Link 
              href="/projects" 
              className="bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-3 px-6 rounded-md transition-colors duration-200 text-center flex-1"
            >
              My Projects
            </Link>
            <Link 
              href="/articles" 
              className="bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-3 px-6 rounded-md transition-colors duration-200 text-center flex-1"
            >
              My Articles
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default HomePage;