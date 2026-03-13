# CreatorCareers

A job board for creatives and marketers in the creator economy. Built with Next.js 15, React 19, Tailwind CSS, and shadcn/ui.

## Prerequisites

- **Node.js** 18.18+ — [download](https://nodejs.org/) or install via a version manager:
  ```bash
  # Using nvm (recommended)
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
  nvm install 20
  nvm use 20

  # Or using Homebrew (macOS)
  brew install node
  ```
- **pnpm** — install after Node.js is available:
  ```bash
  # Option 1: corepack (built into Node.js 16.13+)
  corepack enable

  # Option 2: npm
  npm install -g pnpm

  # Option 3: standalone
  curl -fsSL https://get.pnpm.io/install.sh | sh -
  ```

## Development

```bash
# Install dependencies
pnpm install

# Start the dev server (http://localhost:3000)
pnpm dev
```

The dev server supports hot module replacement — edits to components and styles are reflected immediately.

### Linting

```bash
pnpm lint
```

## Production

### Build and run locally

```bash
# Create an optimized production build
pnpm build

# Start the production server (http://localhost:3000)
pnpm start
```

### Deploy to Vercel

The project is configured for Vercel out of the box. Push to your connected Git branch or run:

```bash
npx vercel            # preview deployment
npx vercel --prod     # production deployment
```

## Project Structure

```
app/                  # Next.js App Router pages and API routes
  api/posts/          # POST endpoint for job submissions
  jobs/[id]/          # Job detail page (static generation)
  post-job/           # Job posting form
components/           # App-specific components
components/ui/        # shadcn/ui component library
lib/
  mock-data.ts        # Hardcoded job listings (no database yet)
  types.ts            # TypeScript interfaces
  validation.ts       # Zod schemas for API input validation
  utils.ts            # Utility helpers (cn)
```

## Notes

- There is no database yet — all job data lives in `lib/mock-data.ts`.
- The build config (`next.config.mjs`) currently ignores ESLint and TypeScript errors during builds.
- Image optimization is disabled (`images.unoptimized: true`).
