---
tags: [claude-memory, project, security-audit, critical]
summary: Critical security fixes for CreatorCareers — API validation, input sanitization, applyUrl
created: 2026-03-13
updated: 2026-03-16
---


# CreatorCareers Critical Issues

- ~~API has zero validation/protection~~ — **FIXED 2026-03-12** (commit `268a0e7`)
  - Added Zod schema in `lib/validation.ts` with field-level validation and length limits
  - Added Content-Type checking (415 for non-JSON)
  - Added in-memory rate limiting (5 req/min/IP)
  - Connected `post-job-form.tsx` to actually call the API with error display
- ~~No server-side input sanitization~~ — **FIXED 2026-03-12** (commit `268a0e7`)
  - HTML angle brackets stripped from all string inputs via Zod transforms
  - Applied to both single fields and newline/comma-delimited list items
- ~~applyUrl rendered without validation~~ — **FIXED 2026-03-15**
  - Added `/^https?:\/\//i` regex check in `components/job-detail.tsx:73`
  - Non-HTTP URLs (e.g. `javascript:`) fall through to a plain button with no href

## Links
- [[CreatorCareers-SecurityAudit]]
