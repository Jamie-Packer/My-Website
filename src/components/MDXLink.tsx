import Link from 'next/link';

export default function MDXLink({ href, children, ...props }: any) {
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
