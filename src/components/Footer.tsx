import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-700 mt-12 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center space-y-4 md:space-y-0 md:flex-row md:justify-between">
          <p className="text-gray-400 text-sm">Copyright © {new Date().getFullYear()} Jamie Packer. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="https://github.com/Jamie-Packer" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
              GitHub
            </Link>
            <Link href="https://www.linkedin.com/in/jamie-packer-622101238/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
              LinkedIn
            </Link>
            <Link href="mailto:your-email@example.com" className="text-gray-400 hover:text-white transition-colors duration-200">
              Email
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;