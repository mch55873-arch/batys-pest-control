# Cloudflare Deployment Report

- Source commit: `d721da7a7f892cbdc02428d8f9d7b1397a41c492`
- Run: `29946068752`
- Generated: `2026-07-22T18:19:22Z`
- npm install: **success**
- OpenNext build: **success**
- Worker assets: **success**
- Wrangler deploy: **success**

## npm-install.log (last 160 lines)
```text
npm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
npm warn deprecated glob@9.3.5: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me

added 671 packages, and audited 672 packages in 14s

201 packages are looking for funding
  run `npm fund` for details

5 vulnerabilities (1 moderate, 4 high)

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
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
✓ Compiled successfully in 7.7s
  Running TypeScript ...
  Finished TypeScript in 4.7s ...
  Collecting page data using 3 workers ...
  Generating static pages using 3 workers (0/164) ...
  Generating static pages using 3 workers (41/164) 
  Generating static pages using 3 workers (82/164) 
  Generating static pages using 3 workers (123/164) 
✓ Generating static pages using 3 workers (164/164) in 3.9s
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
Applying code patches: 3.865s
# copyPackageTemplateFiles
[35m⚙️ Bundling the OpenNext server...
[0m
[35mWorker saved in `.open-next/worker.js` 🚀
[0m
OpenNext build complete.
```

## worker-assets.log (last 160 lines)
```text

> pest-control-seo@0.1.0 worker:assets
> node scripts/build-worker-assets.mjs

Prepared 163 static HTML/metadata routes in dist.
```

## wrangler-deploy.log (last 160 lines)
```text

 ⛅️ wrangler 4.112.0
────────────────────
OpenNext project detected, calling `opennextjs-cloudflare deploy`

┌──────────────────────────────┐
│ OpenNext — Cloudflare deploy │
└──────────────────────────────┘

Incremental cache does not need populating
Tag cache does not need populating

 ⛅️ wrangler 4.112.0 (update available 4.113.0)
───────────────────────────────────────────────

Cloudflare collects anonymous telemetry about your usage of Wrangler. Learn more at https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler/telemetry.md
🌀 Building list of assets...
✨ Read 414 files from the assets directory /home/runner/work/batys-pest-control/batys-pest-control/dist
🌀 Starting asset upload...
🌀 Found 162 new or modified static assets to upload. Proceeding with upload...
+ /BUILD_ID
+ /accessibility/index.html
+ /provider-disclosure/index.html
+ /terms/index.html
+ /services/index.html
+ /services/wasp-control/index.html
+ /services/bee-removal/index.html
+ /services/black-widow-spider-control/index.html
+ /services/tick-control/index.html
+ /services/fire-ant-control/index.html
+ /services/mosquito-control/index.html
+ /services/rodent-control/index.html
+ /services/fly-control/index.html
+ /services/pavement-ant-control/index.html
+ /services/carpenter-ant-control/index.html
+ /services/millipede-control/index.html
+ /services/stink-bug-control/index.html
+ /services/beetle-control/index.html
+ /services/fruit-fly-control/index.html
+ /services/termite-treatment/index.html
+ /services/pest-prevention/index.html
+ /services/hotel-pest-control/index.html
+ /services/general-pest-control/index.html
+ /services/retail-pest-control/index.html
+ /services/seasonal-pest-control/index.html
+ /services/restaurant-pest-control/index.html
+ /services/one-time-pest-treatment/index.html
+ /services/residential-pest-control/index.html
+ /services/property-management-pest-control/index.html
+ /articles/raccoon-removal-property/index.html
+ /articles/wildlife-entry-attic-guide/index.html
+ /articles/spider-control-home-guide/index.html
+ /articles/bee-removal-vs-extermination/index.html
+ /articles/rat-infestation-warning-signs/index.html
+ /articles/flea-infestation-home-pets/index.html
+ /articles/questions-before-pest-treatment/index.html
+ /articles/commercial-pest-control-plan/index.html
+ /articles/early-signs-of-termite-activity/index.html
+ /hawaii/index.html
+ /alaska/index.html
+ /new-hampshire/index.html
+ /vermont/index.html
+ /south-dakota/index.html
+ /south-carolina/index.html
+ /mississippi/index.html
+ /washington/index.html
+ /florida/index.html
+ /oklahoma/index.html
+ /kansas/index.html
+ /west-virginia/index.html
+ /kentucky/index.html
+ /michigan/index.html
+ /ohio/index.html
+ /texas/index.html
+ /blog/index.html
+ /disclaimer/index.html
+ /editorial-policy/index.html
+ /about/index.html
+ /locations/index.html
+ /services/spider-control/index.html
+ /services/ant-control/index.html
+ /services/flea-control/index.html
+ /services/bed-bug-inspection/index.html
+ /services/bed-bug-treatment/index.html
+ /services/earwig-control/index.html
+ /services/rodent-removal/index.html
+ /services/oriental-cockroach-control/index.html
+ /services/german-cockroach-control/index.html
+ /services/american-cockroach-control/index.html
+ /services/drain-fly-control/index.html
+ /services/rodent-inspection/index.html
+ /services/termite-prevention/index.html
+ /services/odorous-house-ant-control/index.html
+ /services/office-pest-control/index.html
+ /services/pantry-pest-control/index.html
+ /services/termite-fumigation/index.html
+ /services/termite-inspection/index.html
+ /services/carpet-beetle-control/index.html
+ /services/apartment-pest-control/index.html
+ /services/recurring-pest-control/index.html
+ /services/emergency-pest-control/index.html
+ /services/commercial-pest-control/index.html
+ /index.html
+ /articles/wasp-nest-removal-safety/index.html
+ /articles/german-cockroach-treatment-plan/index.html
+ /articles/pantry-pest-identification/index.html
+ /articles/tick-control-property-guide/index.html
+ /articles/mouse-entry-points-homeowners-miss/index.html
+ /articles/cockroach-infestation-signs/index.html
+ /articles/pest-inspection-checklist/index.html
+ /articles/carpenter-ant-damage-vs-termites/index.html
+ /delaware/index.html
+ /nevada/index.html
+ /utah/index.html
+ /arizona/index.html
+ /new-mexico/index.html
+ /oregon/index.html
+ /colorado/index.html
+ /maine/index.html
+ /nebraska/index.html
   (truncating changed assets log, set `WRANGLER_LOG=debug` environment variable to see full diff)
Uploaded 54 of 162 assets
Uploaded 108 of 162 assets
Uploaded 162 of 162 assets
✨ Success! Uploaded 162 files (57 already uploaded) (3.48 sec)

Total Upload: 47.92 KiB / gzip: 13.32 KiB
Worker Startup Time: 4 ms
Your Worker has access to the following bindings:
Binding            Resource      
env.ASSETS         Assets        

Uploaded batys-pest-control (6.99 sec)
The current authentication token does not have 'All Zones' permissions.
Falling back to using the zone-based API endpoint to update each route individually.
Note that there is no access to routes associated with zones that the API token does not have permission for.
Existing routes for this Worker in such zones will not be deleted.
Deployed batys-pest-control triggers (1.46 sec)
  batyspestcontrol.com/* (zone name: batyspestcontrol.com)
  www.batyspestcontrol.com/* (zone name: batyspestcontrol.com)
  *.batyspestcontrol.com/* (zone name: batyspestcontrol.com)
Current Version ID: ec2cf825-ca2d-40fd-8ad5-3cbb005cbadd
```
