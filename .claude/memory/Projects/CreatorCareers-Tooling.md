---
tags: [claude-memory, project]
summary: Tooling decisions for CreatorCareers jobboard — test framework, validation, etc.
created: 2026-03-13
updated: 2026-03-13
---

# CreatorCareers Tooling Decisions

## Testing
- **Vitest** chosen as test framework (fast, native ESM, good Next.js compat)
- Config: `vitest.config.ts` with `@/*` path alias
- Tests live in `__tests__/` directory
- Scripts: `pnpm test` (run once), `pnpm test:watch` (watch mode)

## Validation
- **Zod** for API input validation (was already a dependency via shadcn/ui)
- Shared schema in `lib/validation.ts`, used by API route
- Pattern: schema strips HTML tags and trims whitespace via Zod transforms

## Rate Limiting
- Simple in-memory Map-based rate limiter in the API route (5 req/min/IP)
- Not persistent across restarts — sufficient for MVP, swap for Redis/Upstash later

## Links
- [[CreatorCareers-SecurityAudit]]
- [[Projects]]
