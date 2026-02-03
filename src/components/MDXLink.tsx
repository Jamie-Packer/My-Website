import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';

interface MDXLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
}

export default function MDXLink({ href, children, ...props }: MDXLinkProps) {
  if (!href) return null;
  
  const isExternal = href.startsWith('http');
  
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }
  
  return (
    <Link href={href}>
      {children}
    </Link>
  );
}
