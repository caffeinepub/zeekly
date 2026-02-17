# Specification

## Summary
**Goal:** Build a modern, clean Zeekly landing page and structured guest-post blog experience with a tech-oriented visual identity, including a post-hero “Lifestyle” CTA and core blog list/detail navigation backed by a simple Internet Computer content API.

**Planned changes:**
- Create a homepage with a hero section introducing Zeekly and a consistent minimal, tech-forward theme (typography, colors, spacing, components).
- Add a prominent CTA button labeled “Lifestyle” immediately after the hero that links to https://zeekly.co.uk/ in the same tab.
- Implement a structured blog layout on the homepage (e.g., featured + latest posts) with clear metadata (title, excerpt, date, category/section).
- Add blog pages: posts listing view and post detail view, pre-populated with sample posts covering innovation, software guides, startups, and tech news.
- Implement a minimal backend posts API in a single Motoko actor to fetch the posts list and fetch a single post by identifier, and wire the frontend to use it.

**User-visible outcome:** Visitors can view a polished Zeekly homepage, click the “Lifestyle” CTA to navigate to zeekly.co.uk in the same tab, browse a list of sample tech posts, and open individual post detail pages with clear metadata and consistent styling.
