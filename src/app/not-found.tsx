// src/app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[100dvh] grid place-items-center p-6">
      <section className="max-w-xl w-full text-center">
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-neutral-500">
          <span className="font-mono">404</span>
          <span>Page not found</span>
        </div>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight">
          Oops—this page doesn’t exist.
        </h1>
        <p className="mt-3 text-neutral-600">
          The URL might be wrong or the page was moved. Try heading back home
          or browsing my articles and projects.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/articles"
            className="rounded-xl border px-4 py-2 text-sm font-medium hover:opacity-90"
          >
            Articles
          </Link>
          <Link
            href="/"
            className="rounded-xl bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Home
          </Link>
          <Link
            href="/projects"
            className="rounded-xl border px-4 py-2 text-sm font-medium hover:opacity-90"
          >
            View projects
          </Link>
        </div>

      </section>
    </main>
  );
}
