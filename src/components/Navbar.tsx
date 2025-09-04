import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-background border-b border-zinc-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <div className="flex items-center space-x-8 md:space-x-2 font-heading">
            <Link 
              href="/articles" 
              className="text-gray-300 rounded-md px-10 py-3 text-base font-medium transition-colors duration-200 hover:bg-accent/25 hover:text-white"
            >
              Articles
            </Link>

            <Link 
              href="/" 
              className="text-white text-2xl rounded-md px-16 py-3 transition-colors duration-200 hover:bg-accent/35"
            >
              Jamie Packer
            </Link>

            <Link 
              href="/projects" 
              className="text-gray-300 rounded-md px-10 py-3 text-base font-medium transition-colors duration-200 hover:bg-accent/25 hover:text-white"
            >
              Projects
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;