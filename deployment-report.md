# Cloudflare Deployment Report

- Verified source commit: `448a1adf1cee5749e412eb214a851ba791363b5c`
- Successful production run: `29981701148`
- Generated: `2026-07-23T05:17:57Z`
- Cloudflare Worker version: `e278d679-77e2-4d90-9348-d5cae774f118`
- npm install: **success**
- Redirect cleanup: **success**
- Production route and shell patch: **success**
- OpenNext build: **success**
- Worker assets: **success**
- Wrangler deploy: **success**
- Live route and structure verification: **success**

## Build summary

- Next.js `16.2.11` production build compiled successfully.
- TypeScript validation completed successfully.
- `165` static pages were generated.
- `163` static HTML/metadata routes were prepared for Worker assets.
- `51` canonical-safe state aliases were prepared.
- `212` new or modified assets were uploaded successfully.
- Worker routes are attached to the apex, `www`, and wildcard subdomains.

## Verified live routes

All checks returned HTTP `200` after expected canonical redirects:

- Homepage, services hub, locations hub, articles hub, and global service pages.
- Privacy Policy, Provider Disclosure, robots.txt, and sitemap.xml.
- `www` to apex canonical redirect.
- Apex state and city paths to canonical subdomains.
- Duplicate state paths to the state-subdomain root.
- Subdomain global-navigation paths back to the apex domain.
- Indiana state page.
- Charlotte city homepage and local emergency-pest-control page.
- Indianapolis city homepage and local termite-control page.

## Final production changes

- Unified city and local-service header, footer, navigation, mobile menu, and legal links.
- Added versioned Worker caching so stale city/service HTML is bypassed after structural releases.
- Canonicalized state, city, duplicate-state, `www`, and global navigation routes.
- Preserved static state-page delivery through canonical-safe state aliases.
