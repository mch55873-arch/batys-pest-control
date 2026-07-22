# Batys Pest Control

Nationwide US pest-information and independent provider-referral site built with Next.js and OpenNext for Cloudflare Workers.

## URL model

- `/services/{service}` — national pest/service entity page
- `/{state}` — state hub
- `/{state}/{city}` — city hub
- `/{state}/{city}/{service}` — local service intent

The production site uses path-based locations on `batyspestcontrol.com`. It does not use wildcard subdomains or resources from another project.

## Commands

```bash
npm run dev
npm run build
npm run cf:build
npm run deploy
```

Use Node.js 22 or newer. Deployment targets only the `batys-pest-control` Worker and the `batyspestcontrol.com` zone routes defined in `wrangler.toml`.
