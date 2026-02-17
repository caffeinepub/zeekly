# Specification

## Summary
**Goal:** Fix the “Invalid time value” runtime error by making `Post.datePublished` parsing/formatting resilient across Zeekly’s UI, align sample post date units with the backend representation, and redeploy the site.

**Planned changes:**
- Add safe date parsing/validation for `Post.datePublished` so the UI never calls `toISOString()` or `toLocaleDateString()` on invalid `Date` values across list cards and post detail pages.
- Render date UI with fallbacks for missing/invalid/unparseable dates (e.g., hide date or show “Unknown date”), and only render `<time dateTime=...>` when a valid ISO string is available.
- Standardize `frontend/src/content/samplePosts.ts` date values to match the backend `Post.datePublished` epoch unit (Motoko `Int`) to prevent out-of-range timestamps in JavaScript.
- Produce and publish an updated production build so the live site reflects the fix.

**User-visible outcome:** Users can browse the Home page, Posts list, and Post detail pages without seeing “Invalid time value” errors, and dates display safely (or fall back gracefully) even when data is missing or malformed.
