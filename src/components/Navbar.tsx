// src/components/Navbar.tsx
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-background border-b border-zinc-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile: spread out | Desktop: centered */}
        <div className="flex h-16 items-center justify-between md:justify-center">
          <div className="flex w-full items-center justify-between font-heading md:w-auto md:space-x-8 md:space-x-2">
            {/* Articles */}
            <Link
              href="/articles"
              className="inline-flex h-14 items-center justify-center rounded-md px-4 text-sm font-medium text-foreground2 transition-colors duration-300 hover:bg-accent/25 md:px-8 md:text-base"
            >
              Articles
            </Link>

            {/* Home / Jamie Packer */}
            <Link
              href="/"
              className="inline-flex h-14 items-center justify-center rounded-md px-4 text-foreground transition-colors duration-300 hover:bg-accent/35 md:px-8"
            >
              <span className="text-xl leading-none md:text-2xl">Jamie Packer</span>
            </Link>

            {/* Projects */}
            <Link
              href="/projects"
              className="inline-flex h-14 items-center justify-center rounded-md px-4 text-sm font-medium text-foreground2 transition-colors duration-300 hover:bg-accent/25 md:px-8 md:text-base"
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
