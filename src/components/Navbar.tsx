// src/components/Navbar.tsx
import Link from "next/link";

const navLinkClassName =
  "inline-flex h-14 items-center justify-center rounded-md px-3 font-heading text-xl leading-none text-foreground transition-colors duration-300 hover:bg-accent/35 sm:px-5 md:px-8 md:text-2xl";

const Navbar = () => {
  return (
    <nav className="bg-background border-b border-zinc-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1fr | auto | 1fr keeps the rule on the true horizontal center */}
        <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-5 md:gap-6">
          <Link href="/" className={`${navLinkClassName} justify-self-end`}>
            Jamie Packer
          </Link>

          <span
            aria-hidden="true"
            className="h-6 w-px shrink-0 bg-zinc-500 sm:h-7"
          />

          <Link href="/projects" className={`${navLinkClassName} justify-self-start`}>
            Projects
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
