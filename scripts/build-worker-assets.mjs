import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const openNext = path.join(root, '.open-next');
const dist = path.join(root, 'dist');
const cacheBase = path.join(openNext, 'cache');
const locationDatabase = JSON.parse(await readFile(path.join(root, 'data', 'usa_locations.json'), 'utf8'));
const stateSlugs = new Set(locationDatabase.states.map((state) => state.slug));

await rm(dist, { recursive: true, force: true });
await cp(path.join(openNext, 'assets'), dist, { recursive: true });

const buildIds = await readdir(cacheBase, { withFileTypes: true });
const cacheRoot = path.join(cacheBase, buildIds.find((entry) => entry.isDirectory())?.name ?? '');

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    files.push(...(entry.isDirectory() ? await walk(fullPath) : [fullPath]));
  }
  return files;
}

let pageCount = 0;
let stateAliasCount = 0;
for (const file of await walk(cacheRoot)) {
  if (!file.endsWith('.cache')) continue;
  const relative = path.relative(cacheRoot, file).replaceAll(path.sep, '/').replace(/\.cache$/, '');
  const value = JSON.parse(await readFile(file, 'utf8'));

  if (value.type === 'route' && typeof value.body === 'string') {
    const output = path.join(dist, relative);
    await mkdir(path.dirname(output), { recursive: true });
    await writeFile(output, value.body);
    pageCount += 1;
    continue;
  }

  if (value.type !== 'app' || typeof value.html !== 'string' || relative === '_global-error') continue;
  const output = relative === 'index'
    ? path.join(dist, 'index.html')
    : relative === '_not-found'
      ? path.join(dist, '404.html')
      : path.join(dist, relative, 'index.html');
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, value.html);

  if (stateSlugs.has(relative)) {
    const stateAlias = path.join(dist, '__state-pages', `${relative}.state`);
    await mkdir(path.dirname(stateAlias), { recursive: true });
    await writeFile(stateAlias, value.html);
    stateAliasCount += 1;
  }

  pageCount += 1;
}

console.log(`Prepared ${pageCount} static HTML/metadata routes in dist.`);
console.log(`Prepared ${stateAliasCount} canonical-safe state page aliases.`);
