import { readFile, writeFile } from 'node:fs/promises';

const file = new URL('../src/worker.ts', import.meta.url);
const source = await readFile(file, 'utf8');

const marker = `    if (hostname === DOMAIN) {\n      const segments = path.split('/').filter(Boolean);`;
const replacement = `    if (hostname === DOMAIN) {\n      if (path.length > 1 && path.endsWith('/')) {\n        url.pathname = path.replace(/\\/+$/, '');\n        return Response.redirect(url.toString(), 308);\n      }\n\n      const segments = path.split('/').filter(Boolean);`;

if (source.includes(replacement)) {
  console.log('Main-domain trailing-slash redirect is already present.');
} else if (!source.includes(marker)) {
  throw new Error('Could not find the main-domain routing marker in src/worker.ts.');
} else {
  await writeFile(file, source.replace(marker, replacement));
  console.log('Patched main-domain trailing-slash redirects into src/worker.ts.');
}
