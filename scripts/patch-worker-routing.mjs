import { readFile, writeFile } from 'node:fs/promises';

const file = new URL('../src/worker.ts', import.meta.url);
let source = await readFile(file, 'utf8');
let changed = false;

function replaceRequired(label, marker, replacement) {
  if (source.includes(replacement)) return;
  if (!source.includes(marker)) throw new Error(`Could not find ${label} marker in src/worker.ts.`);
  source = source.replace(marker, replacement);
  changed = true;
}

const mainMarker = `    if (hostname === DOMAIN) {\n      const segments = path.split('/').filter(Boolean);`;
const mainReplacement = `    if (hostname === DOMAIN) {\n      if (path.length > 1 && path.endsWith('/')) {\n        url.pathname = path.replace(/\\/+$/, '');\n        return Response.redirect(url.toString(), 308);\n      }\n\n      const segments = path.split('/').filter(Boolean);`;
replaceRequired('main-domain routing', mainMarker, mainReplacement);

const apexMarker = `    if (path === '/robots.txt' || path === '/sitemap.xml') return Response.redirect(\`https://\${DOMAIN}\${path}\`, 308);\n\n    const subdomain = hostname.slice(0, -(DOMAIN.length + 1));`;
const apexReplacement = `    if (path === '/robots.txt' || path === '/sitemap.xml') return Response.redirect(\`https://\${DOMAIN}\${path}\`, 308);\n\n    const apexPrefixes = ['/services', '/locations', '/articles', '/blog', '/about', '/contact', '/privacy-policy', '/terms', '/disclaimer', '/cookie-policy', '/editorial-policy', '/provider-disclosure', '/accessibility'];\n    if (apexPrefixes.some((prefix) => path === prefix || path.startsWith(\`\${prefix}/\`))) {\n      return Response.redirect(\`https://\${DOMAIN}\${path}\${url.search}\`, 308);\n    }\n\n    const subdomain = hostname.slice(0, -(DOMAIN.length + 1));`;
replaceRequired('subdomain apex navigation', apexMarker, apexReplacement);

const stateMarker = `    if (!location.city) {\n      if (path !== '/') return errorPage(404, 'This state page does not have that route.');`;
const stateReplacement = `    if (!location.city) {\n      const duplicateStatePath = \`/\${location.state}\`;\n      if (path === duplicateStatePath || path === \`\${duplicateStatePath}/\`) {\n        return Response.redirect(\`https://\${hostname}/\${url.search}\`, 308);\n      }\n      if (path !== '/') return errorPage(404, 'This state page does not have that route.');`;
replaceRequired('state canonical routing', stateMarker, stateReplacement);

const stateAssetMarkers = [
  `      return env.ASSETS.fetch(new Request(\`https://assets.local/\${location.state}/\`, request));`,
  `      return env.ASSETS.fetch(new Request(\`https://assets.local/\${location.state}\`, request));`,
];
const stateAssetReplacement = `      const stateAsset = await env.ASSETS.fetch(new Request(\`https://assets.local/__state-pages/\${location.state}.state\`, request));\n      if (!stateAsset.ok) return errorPage(404, 'This state page could not be loaded.');\n      const stateHeaders = new Headers(stateAsset.headers);\n      stateHeaders.set('content-type', 'text/html; charset=utf-8');\n      stateHeaders.set('cache-control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400');\n      stateHeaders.set('x-batys-runtime', 'state-static-alias');\n      return new Response(request.method === 'HEAD' ? null : stateAsset.body, { status: 200, headers: stateHeaders });`;
if (!source.includes(stateAssetReplacement)) {
  const marker = stateAssetMarkers.find((candidate) => source.includes(candidate));
  if (!marker) throw new Error('Could not find state asset marker in src/worker.ts.');
  source = source.replace(marker, stateAssetReplacement);
  changed = true;
}

const cacheVersion = "const CACHE_VERSION = 'site-shell-2026-07-23-v3';";
if (!source.includes(cacheVersion)) {
  const pattern = /(const PRIMARY_SLUGS = \[[^\n]+\];\n)/;
  if (!pattern.test(source)) throw new Error('Could not find primary services declaration in src/worker.ts.');
  source = source.replace(pattern, `$1${cacheVersion}\n`);
  changed = true;
}

const cachedMarker = `async function cached(request: Request, context: Context, render: () => Response) {\n  const cache = (caches as CacheStorage & { default: Cache }).default;\n  const hit = await cache.match(request);\n  if (hit) return hit;\n  const response = render();\n  context.waitUntil(cache.put(request, response.clone()));\n  return response;\n}`;
const cachedReplacement = `async function cached(request: Request, context: Context, render: () => Response) {\n  const cache = (caches as CacheStorage & { default: Cache }).default;\n  const cacheUrl = new URL(request.url);\n  cacheUrl.searchParams.set('__batys_version', CACHE_VERSION);\n  const cacheKey = new Request(cacheUrl.toString(), request);\n  if (request.method === 'HEAD') {\n    const response = render();\n    return new Response(null, { status: response.status, headers: response.headers });\n  }\n  const hit = await cache.match(cacheKey);\n  if (hit) return hit;\n  const response = render();\n  context.waitUntil(cache.put(cacheKey, response.clone()));\n  return response;\n}`;
replaceRequired('versioned Worker cache', cachedMarker, cachedReplacement);

if (changed) {
  await writeFile(file, source);
  console.log('Patched canonical routing, state delivery, and versioned local-page cache.');
} else {
  console.log('Routing, state delivery, and local-page cache patches are already present.');
}

await import('./patch-worker-shell.mjs');
