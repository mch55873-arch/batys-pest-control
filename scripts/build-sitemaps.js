const fs = require('fs');
const path = require('path');

const database = require('../data/usa_database.json');
const servicesData = require('../data/services.json');

const DOMAIN = 'batyspestcontrol.com';
const SITEMAP_LIMIT = 2000;
const URLS_PER_CITY = servicesData.length + 1;

function xml(value) {
  return value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[char] || char);
}

function sitemapUrlset(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((loc) => `  <url><loc>${xml(loc)}</loc></url>`).join('\n')}\n</urlset>`;
}

const sitemapsDir = path.join(__dirname, '..', 'public', 'sitemaps');
if (!fs.existsSync(sitemapsDir)) {
  fs.mkdirSync(sitemapsDir, { recursive: true });
}

// 1. Master Index
const entries = [`https://${DOMAIN}/sitemaps/core.xml`];
for (const state of database.states) {
  const stateSlug = state.slug || state.name.toLowerCase().replace(/\s+/g, '-');
  const chunks = Math.ceil((state.cities.length * URLS_PER_CITY) / SITEMAP_LIMIT);
  for (let chunk = 1; chunk <= chunks; chunk++) {
    entries.push(`https://${DOMAIN}/sitemaps/${stateSlug}-${chunk}.xml`);
  }
}

const masterBody = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map((loc) => `  <sitemap><loc>${xml(loc)}</loc></sitemap>`).join('\n')}\n</sitemapindex>`;
fs.writeFileSync(path.join(__dirname, '..', 'public', 'sitemap.xml'), masterBody, 'utf8');
console.log('✓ Created public/sitemap.xml');

// 2. Core Sitemap
const corePaths = [
  '/',
  '/about',
  '/blog',
  '/services',
  '/locations',
  '/contact',
  '/privacy-policy',
  '/terms',
  '/disclaimer',
  '/provider-disclosure',
];

const coreUrls = [
  ...corePaths.map((p) => `https://${DOMAIN}${p}`),
  ...servicesData.map((service) => `https://${DOMAIN}/services/${service.slug}`),
  ...database.states.map((state) => `https://${state.slug}.${DOMAIN}/`),
];

fs.writeFileSync(path.join(sitemapsDir, 'core.xml'), sitemapUrlset(coreUrls), 'utf8');
console.log('✓ Created public/sitemaps/core.xml');

// 3. State Sitemaps
for (const state of database.states) {
  const stateSlug = state.slug || state.name.toLowerCase().replace(/\s+/g, '-');
  const total = state.cities.length * URLS_PER_CITY;
  const chunks = Math.ceil(total / SITEMAP_LIMIT);

  for (let chunk = 1; chunk <= chunks; chunk++) {
    const start = (chunk - 1) * SITEMAP_LIMIT;
    const end = Math.min(total, start + SITEMAP_LIMIT);
    const urls = [];

    for (let index = start; index < end; index++) {
      const cityIndex = Math.floor(index / URLS_PER_CITY);
      const pageIndex = index % URLS_PER_CITY;
      const city = state.cities[cityIndex];
      const citySlug = typeof city === 'string' ? city : (city.slug || city[0]);
      const host = `${citySlug}-${stateSlug}.${DOMAIN}`;
      urls.push(pageIndex === 0 ? `https://${host}/` : `https://${host}/${servicesData[pageIndex - 1].slug}`);
    }

    const fileName = `${stateSlug}-${chunk}.xml`;
    fs.writeFileSync(path.join(sitemapsDir, fileName), sitemapUrlset(urls), 'utf8');
    console.log(`✓ Created public/sitemaps/${fileName}`);
  }
}

console.log('All static sitemaps generated successfully for batyspestcontrol.com!');
