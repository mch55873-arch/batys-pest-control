# Cloudflare Deployment Report

- Source commit: `6c12d658e0603a366ff8a6174956afdb58eede04`
- Run: `30086529254`
- Generated: `2026-07-24T10:33:05Z`
- npm install: **success**
- Redirect cleanup: **success**
- Production route and shell patch: **failure**
- OpenNext build: **skipped**
- Worker assets: **skipped**
- Wrangler deploy: **skipped**
- Live route and structure verification: **skipped**

## npm-install.log (last 180 lines)
```text
npm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
npm warn deprecated glob@9.3.5: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me

added 671 packages, and audited 672 packages in 18s

201 packages are looking for funding
  run `npm fund` for details

5 high severity vulnerabilities

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
```

## cloudflare-redirect-cleanup.log (last 180 lines)
```text
Page Rules inspection skipped: GET /zones/4a815a59682dce83132bf0a858580c2d/pagerules?status=active&per_page=100: Unauthorized to access requested resource
Rulesets inspection skipped: GET /zones/4a815a59682dce83132bf0a858580c2d/rulesets: Authentication error
No malformed redirect rule remained in accessible Cloudflare settings.
Removed 0 malformed Cloudflare redirect rule(s).
```

## worker-routing-patch.log (last 180 lines)
```text
file:///home/runner/work/batys-pest-control/batys-pest-control/scripts/patch-worker-routing.mjs:9
  if (!source.includes(marker)) throw new Error(`Could not find ${label} marker in src/worker.ts.`);
                                      ^

Error: Could not find main-domain routing marker in src/worker.ts.
    at replaceRequired (file:///home/runner/work/batys-pest-control/batys-pest-control/scripts/patch-worker-routing.mjs:9:39)
    at file:///home/runner/work/batys-pest-control/batys-pest-control/scripts/patch-worker-routing.mjs:16:1

Node.js v22.23.1
```
