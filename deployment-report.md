# Cloudflare Deployment Report

- Source commit: `c41f9d60a369cf35b4e988abd35ab1fc055542e4`
- Run: `29946745219`
- Generated: `2026-07-22T18:28:52Z`
- npm install: **success**
- Redirect cleanup: **success**
- OpenNext build: **cancelled**
- Worker assets: **skipped**
- Wrangler deploy: **skipped**

## npm-install.log (last 160 lines)
```text
npm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
npm warn deprecated glob@9.3.5: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me

added 671 packages, and audited 672 packages in 15s

201 packages are looking for funding
  run `npm fund` for details

5 vulnerabilities (1 moderate, 4 high)

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
```

## cloudflare-redirect-cleanup.log (last 160 lines)
```text
Page Rules inspection skipped: GET /zones/4a815a59682dce83132bf0a858580c2d/pagerules?status=active&per_page=100: Unauthorized to access requested resource
Rulesets inspection skipped: GET /zones/4a815a59682dce83132bf0a858580c2d/rulesets: Authentication error
No malformed redirect rule remained in accessible Cloudflare settings.
Removed 0 malformed Cloudflare redirect rule(s).
```

## opennext-build.log (last 160 lines)
```text

> pest-control-seo@0.1.0 cf:build
> opennextjs-cloudflare build --dangerouslyUseUnsupportedNextVersion


┌─────────────────────────────┐
│ OpenNext — Cloudflare build │
└─────────────────────────────┘

App directory: /home/runner/work/batys-pest-control/batys-pest-control
Next.js version : 16.2.11
@opennextjs/cloudflare version: 1.20.1
@opennextjs/aws version: 4.0.2
workerd compatibility_date: 2026-07-14

┌─────────────────────────────────┐
│ OpenNext — Building Next.js app │
└─────────────────────────────────┘


> pest-control-seo@0.1.0 build
> next build --webpack

⚠ No build cache found. Please configure build caching for faster rebuilds. Read more: https://nextjs.org/docs/messages/no-cache
▲ Next.js 16.2.11 (webpack)

⚠ The "middleware" file convention is deprecated. Please use "proxy" instead. Learn more: https://nextjs.org/docs/messages/middleware-to-proxy
  Creating an optimized production build ...
✓ Compiled successfully in 8.4s
  Running TypeScript ...
  Finished TypeScript in 5.0s ...
  Collecting page data using 3 workers ...
  Generating static pages using 3 workers (0/164) ...
  Generating static pages using 3 workers (41/164) 
  Generating static pages using 3 workers (82/164) 
  Generating static pages using 3 workers (123/164) 
✓ Generating static pages using 3 workers (164/164) in 4.1s
  Finalizing page optimization ...
  Collecting build traces ...

Route (app)
┌ ○ /
├ ○ /_not-found
├ ● /[state]
│ ├ /alabama
│ ├ /alaska
│ ├ /arizona
│ └ [+48 more paths]
├ ƒ /[state]/[city]
├ ƒ /[state]/[city]/[service]
├ ○ /about
├ ○ /accessibility
├ ○ /articles
├ ● /articles/[slug]
│ ├ /articles/early-signs-of-termite-activity
│ ├ /articles/termite-treatment-options-explained
│ ├ /articles/how-to-prepare-for-bed-bug-inspection
│ └ [+22 more paths]
├ ○ /blog
├ ƒ /blog/[slug]
├ ○ /contact
├ ○ /cookie-policy
├ ○ /disclaimer
├ ○ /editorial-policy
├ ○ /locations
├ ○ /privacy-policy
├ ○ /provider-disclosure
├ ○ /robots.txt
├ ○ /services
├ ● /services/[service]
│ ├ /services/general-pest-control
│ ├ /services/residential-pest-control
│ ├ /services/commercial-pest-control
│ └ [+67 more paths]
├ ○ /sitemap.xml
└ ○ /terms


ƒ Proxy (Middleware)

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand


┌──────────────────────────────┐
│ OpenNext — Generating bundle │
└──────────────────────────────┘

Bundling middleware function...
Bundling static assets...
Bundling cache assets...
Building server function: default...
Applying code patches: 3.891s
# copyPackageTemplateFiles
[35m⚙️ Bundling the OpenNext server...
[0m
```
