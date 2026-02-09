"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    // pick up theme from <html>
    const html = document.documentElement;
    const existing = Array.from(html.classList).find((c) => c.startsWith("theme-")) || null;
    setTheme(existing);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* a11y: skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-foreground focus:px-3 focus:py-2 focus:text-background"
      >
        skip to content
      </a>

      <header
        className={[
          "sticky top-0 z-50 border-b",
          // soft translucency; add shadow only after scroll
          "backdrop-blur supports-[backdrop-filter]:bg-background/70",
          scrolled ? "shadow-sm" : "bg-background/60",
        ].join(" ")}
      >
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          {/* wordmark */}
          <Link
            href="/"
            className="group inline-flex items-center gap-2 font-medium lowercase tracking-tight"
            aria-label="creator careers home"
          >
            {/* tiny dot as a handmade mark */}
            <span className="inline-block h-2 w-2 rounded-full bg-primary/80 group-hover:bg-primary transition-colors" />
            <span className="text-base md:text-lg">creator careers</span>
          </Link>

          <nav className="flex items-center gap-4">
            <Link
              href="/#jobs"
              className="hidden text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline sm:inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
            >
              browse jobs
            </Link>

            <Button
              asChild
              size="sm"
              className="rounded-full px-4"
            >
              <Link href="/post-job">post a job</Link>
            </Button>
            {/* Dev-only theme tester */}
            <div className="hidden md:flex items-center gap-1 ml-2">
              <select
                aria-label="theme"
                className="text-xs border rounded-md bg-background px-2 py-1 text-muted-foreground hover:text-foreground"
                value={theme ?? ''}
                onChange={(e) => {
                  const html = document.documentElement;
                  const all = Array.from(html.classList).filter((c) => c.startsWith("theme-"));
                  all.forEach((c) => html.classList.remove(c));
                  const next = e.target.value;
                  if (next) html.classList.add(next);
                  setTheme(next || null);
                }}
              >
                <option value="">clay (default)</option>
                <option value="theme-mauve">mauve</option>
                <option value="theme-plum">plum</option>
                <option value="theme-rose">rose</option>
                <option value="theme-clay">clay</option>
                <option value="theme-red-soft">red soft</option>
                <option value="theme-red-muted">red muted</option>
                <option value="theme-red-rose">red rose</option>
              </select>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
