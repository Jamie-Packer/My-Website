import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-zinc-900 border-b border-zinc-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <div className="flex items-center space-x-16 font-heading">
            <Link href="/articles" className="text-gray-300 hover:text-white rounded-md text-base font-medium">
              Articles
            </Link>

            <Link href="/" className="text-white text-2xl hover:text-gray-200">
              Jamie Packer
            </Link>

            <Link href="/projects" className="text-gray-300 hover:text-white rounded-md text-base font-medium">
              Projects
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;