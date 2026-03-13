# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CreatorCareers — a job board for creatives and marketers in the creator economy. Currently a frontend MVP with mock data (no database or auth).

## Commands

```bash
pnpm dev          # Dev server at localhost:3000
pnpm build        # Production build (ESLint & TS errors ignored in next.config.mjs)
pnpm lint         # ESLint via Next.js defaults
pnpm start        # Start production server
```

Package manager is **pnpm** (not npm/yarn).

## Tech Stack

- **Next.js 15** (App Router, React 19, TypeScript)
- **Tailwind CSS 4.1** with PostCSS — theme uses CSS custom properties with multiple color schemes (clay, mauve, plum, rose, etc.)
- **shadcn/ui** (New York style, RSC enabled) — 57 components in `components/ui/`, configured via `components.json`
- **React Hook Form + Zod** for form handling/validation
- **Fonts**: Inter (sans), Karla (body), Source Serif 4 (headings)

## Architecture

**App Router pages** (`app/`):
- `/` — Home: job listings grid with category filtering + sidebar (newsletter, creator bio)
- `/jobs/[id]` — Job detail (statically generated via `generateStaticParams`)
- `/post-job` — Job posting form (submits to `/api/posts`, no real persistence)

**API**: Single POST endpoint at `app/api/posts/route.ts` — logs to console, returns mock success.

**Data**: All job data is hardcoded in `lib/mock-data.ts` (5 listings). The `Job` interface is in `lib/types.ts`.

**Custom components** (`components/`): header, hero, footer, job-listings, job-detail, about-sidebar, post-job-form. These are the app-specific components vs the generic `components/ui/` library.

**Path alias**: `@/*` maps to project root (configured in tsconfig.json).

**Utility**: `lib/utils.ts` exports `cn()` (clsx + tailwind-merge) — use this for conditional class merging.

## Styling Notes

- Theme is set via CSS variables on `:root` / `.dark` in `app/globals.css`
- Light mode default background is warm off-white (#FAF9F6), primary is clay/terracotta (#E79E72)
- Header has a dev-only theme switcher for auditing color variants
- Background uses a repeating `noise.svg` texture

## Build Caveats

- `next.config.mjs` sets `eslint.ignoreDuringBuilds: true` and `typescript.ignoreBuildErrors: true`
- Image optimization is disabled (`images.unoptimized: true`)
- Vercel Analytics is integrated

## Obsidian Memory

This project uses obsidian-memory for persistent context across conversations. A global `UserPromptSubmit` hook automatically loads relevant memory and injects write commands on every prompt. See the "Obsidian Memory Config" block in hook output for available commands.
