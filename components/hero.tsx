"use client";

import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function Hero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      className={[
        "border-b",
        // clean soft gradient (no dots)
        "bg-[linear-gradient(to_bottom,#fffdfb_0%,#faf7f5_100%)]",
      ].join(" ")}
    >
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          {/* tiny provenance line */}


          <h1 className="mb-3 text-balance font-semibold tracking-tight text-3xl md:text-5xl leading-tight">
            the job board for<br />
            creatives and marketers
          </h1>

          <p className="mb-3 text-s tracking-wide text-muted-foreground">
            curated by <Link href="/about" className="underline underline-offset-2">katie</Link>
          </p>

          {/* <p className="mb-8 text-pretty text-base md:text-lg leading-relaxed text-muted-foreground">
            curated by katie xu
          </p> */}

          {/* signup block intentionally removed */}

          <div
            className={[
              "flex flex-col gap-3 sm:flex-row justify-center",
              "transition-all duration-500 ease-out",
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1",
            ].join(" ")}
          >
            <Button size="lg" variant="outline" asChild>
              <Link href="#jobs" data-track="browse-jobs">browse jobs ↓</Link>
            </Button>
            <Button size="lg" asChild>
              <Link href="/post-job" data-track="post-job">share an opening</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

