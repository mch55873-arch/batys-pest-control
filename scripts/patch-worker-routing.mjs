import { readFile, writeFile } from 'node:fs/promises';

const file = new URL('../src/worker.ts', import.meta.url);
let source = await readFile(file, 'utf8');
let changed = false;

const mainMarker = `    if (hostname === DOMAIN) {\n      const segments = path.split('/').filter(Boolean);`;
const mainReplacement = `    if (hostname === DOMAIN) {\n      if (path.length > 1 && path.endsWith('/')) {\n        url.pathname = path.replace(/\\/+$/, '');\n        return Response.redirect(url.toString(), 308);\n      }\n\n      const segments = path.split('/').filter(Boolean);`;

if (!source.includes(mainReplacement)) {
  if (!source.includes(mainMarker)) {
    throw new Error('Could not find the main-domain routing marker in src/worker.ts.');
  }
  source = source.replace(mainMarker, mainReplacement);
  changed = true;
}

const apexMarker = `    if (path === '/robots.txt' || path === '/sitemap.xml') return Response.redirect(\`https://\${DOMAIN}\${path}\`, 308);\n\n    const subdomain = hostname.slice(0, -(DOMAIN.length + 1));`;
const apexReplacement = `    if (path === '/robots.txt' || path === '/sitemap.xml') return Response.redirect(\`https://\${DOMAIN}\${path}\`, 308);\n\n    const apexPrefixes = ['/services', '/locations', '/articles', '/blog', '/about', '/contact', '/privacy-policy', '/terms', '/disclaimer', '/cookie-policy', '/editorial-policy', '/provider-disclosure', '/accessibility'];\n    if (apexPrefixes.some((prefix) => path === prefix || path.startsWith(\`\${prefix}/\`))) {\n      return Response.redirect(\`https://\${DOMAIN}\${path}\${url.search}\`, 308);\n    }\n\n    const subdomain = hostname.slice(0, -(DOMAIN.length + 1));`;

if (!source.includes(apexReplacement)) {
  if (!source.includes(apexMarker)) {
    throw new Error('Could not find the subdomain apex-route marker in src/worker.ts.');
  }
  source = source.replace(apexMarker, apexReplacement);
  changed = true;
}

const stateMarker = `    if (!location.city) {\n      if (path !== '/') return errorPage(404, 'This state page does not have that route.');`;
const stateReplacement = `    if (!location.city) {\n      const duplicateStatePath = \`/\${location.state}\`;\n      if (path === duplicateStatePath || path === \`\${duplicateStatePath}/\`) {\n        url.pathname = '/';\n        return Response.redirect(url.toString(), 308);\n      }\n      if (path !== '/') return errorPage(404, 'This state page does not have that route.');`;

if (!source.includes(stateReplacement)) {
  if (!source.includes(stateMarker)) {
    throw new Error('Could not find the state-subdomain routing marker in src/worker.ts.');
  }
  source = source.replace(stateMarker, stateReplacement);
  changed = true;
}

if (changed) {
  await writeFile(file, source);
  console.log('Patched canonical, apex navigation, and duplicate state-subdomain redirects into src/worker.ts.');
} else {
  console.log('Canonical, apex navigation, and duplicate state-subdomain redirect patches are already present.');
}
