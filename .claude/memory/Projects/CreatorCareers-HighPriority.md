---
tags: [claude-memory, project, security-audit, high]
summary: High priority security issues for CreatorCareers — build config, headers, auth, dev UI
created: 2026-03-13
updated: 2026-03-16
---


# CreatorCareers High Priority Issues

- Build config suppresses all errors — `next.config.mjs` ignores ESLint and TypeScript errors
- No security headers — no CSP, X-Frame-Options, HSTS (no middleware.ts)
- No authentication system — anyone can post jobs, no admin moderation
- ~~Dev theme switcher ships to prod~~ — **FIXED 2026-03-15**
  - Wrapped in `process.env.NODE_ENV === 'development'` check in `components/header.tsx:68`
  - Next.js dead-code eliminates the entire block in production builds

## Links
- [[CreatorCareers-SecurityAudit]]
