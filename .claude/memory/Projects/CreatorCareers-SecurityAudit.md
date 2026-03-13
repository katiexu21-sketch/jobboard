---
tags: [claude-memory, project, security-audit]
summary: Security audit findings for CreatorCareers jobboard, prioritized critical to low
---
# CreatorCareers Security Audit

## Critical
- API has zero validation/protection — `app/api/posts/route.ts` accepts any JSON, no rate limiting, no auth, no CSRF
- No server-side input sanitization — user-submitted text not sanitized; XSS risk if rendering changes
- applyUrl rendered without validation — `components/job-detail.tsx:74-76` could render `javascript:` URLs

## High Priority
- Build config suppresses all errors — `next.config.mjs` ignores ESLint and TypeScript errors
- No security headers — no CSP, X-Frame-Options, HSTS (no middleware.ts)
- No authentication system — anyone can post jobs, no admin moderation
- Dev theme switcher ships to prod — `components/header.tsx:68-91`

## Medium Priority
- No database — all data hardcoded in `lib/mock-data.ts`
- Newsletter form is a no-op — clears input but never calls an API
- No .env management — no `.env.example`
- Image optimization disabled — `images.unoptimized: true`
- Raw `<img>` tags — should use `next/image`

## Low Priority
- Dead footer links — /about, /pricing, /contact don't exist
- Hardcoded copyright year 2025 in footer
- `generator: 'v0.app'` in metadata leaks build tool
- No robots.txt or sitemap.xml

## Status
- Audit complete 2026-03-12, working through fixes critical → low

## Links
- [[Projects]]

