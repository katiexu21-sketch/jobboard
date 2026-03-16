---
tags: [claude-memory, project, security-audit, medium]
summary: Medium priority issues for CreatorCareers — database, newsletter, .env, image optimization
created: 2026-03-13
updated: 2026-03-13
---

# CreatorCareers Medium Priority Issues

- No database — all data hardcoded in `lib/mock-data.ts`
- Newsletter form is a no-op — clears input but never calls an API
- No .env management — no `.env.example`
- Image optimization disabled — `images.unoptimized: true`
- Raw `<img>` tags — should use `next/image`

## Links
- [[CreatorCareers-SecurityAudit]]
