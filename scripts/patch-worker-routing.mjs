import { readFile, writeFile } from 'node:fs/promises';

const file = new URL('../src/worker.ts', import.meta.url);
let source = await readFile(file, 'utf8');
let changed = false;

const routeMarker = `    if (hostname === DOMAIN) {\n      const segments = path.split('/').filter(Boolean);`;
const routeReplacement = `    if (hostname === DOMAIN) {\n      if (path.length > 1 && path.endsWith('/')) {\n        url.pathname = path.replace(/\\/+$/, '');\n        return Response.redirect(url.toString(), 308);\n      }\n\n      const segments = path.split('/').filter(Boolean);`;

if (!source.includes(routeReplacement)) {
  if (!source.includes(routeMarker)) {
    throw new Error('Could not find the main-domain routing marker in src/worker.ts.');
  }
  source = source.replace(routeMarker, routeReplacement);
  changed = true;
}

const mainAssetMarker = `      return env.ASSETS.fetch(request);\n    }\n\n    if (!hostname.endsWith`;
const mainAssetReplacement = `      if (path.startsWith('/_next/') || path.startsWith('/cdn-cgi/') || /\\.[a-z0-9]{2,8}$/i.test(path)) {\n        return env.ASSETS.fetch(request);\n      }\n      const assetUrl = new URL(request.url);\n      assetUrl.pathname = path === '/' ? '/index.html' : path + '/index.html';\n      return env.ASSETS.fetch(new Request(assetUrl.toString(), request));\n    }\n\n    if (!hostname.endsWith`;

if (!source.includes(mainAssetReplacement)) {
  if (!source.includes(mainAssetMarker)) {
    throw new Error('Could not find the main-domain static asset marker in src/worker.ts.');
  }
  source = source.replace(mainAssetMarker, mainAssetReplacement);
  changed = true;
}

const stateAssetMarker = "      return env.ASSETS.fetch(new Request(`https://assets.local/${location.state}/`, request));";
const stateAssetReplacement = "      return env.ASSETS.fetch(new Request(`https://assets.local/${location.state}/index.html`, request));";

if (!source.includes(stateAssetReplacement)) {
  if (!source.includes(stateAssetMarker)) {
    throw new Error('Could not find the state static asset marker in src/worker.ts.');
  }
  source = source.replace(stateAssetMarker, stateAssetReplacement);
  changed = true;
}

if (changed) {
  await writeFile(file, source);
  console.log('Patched canonical redirects and explicit static index asset routing into src/worker.ts.');
} else {
  console.log('Canonical redirects and explicit static index asset routing are already present.');
}
