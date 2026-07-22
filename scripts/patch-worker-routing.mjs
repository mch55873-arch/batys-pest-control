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
  console.log('Patched canonical redirects and duplicate state-subdomain paths into src/worker.ts.');
} else {
  console.log('Canonical and duplicate state-subdomain redirect patches are already present.');
}
