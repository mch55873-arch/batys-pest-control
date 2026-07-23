import servicesData from "../data/services.json";
import database from "../data/usa_database.json";

const DOMAIN = "batyspestcontrol.com";
export const SITEMAP_LIMIT = 40000;
const URLS_PER_CITY = servicesData.length + 1;

type StateItem = (typeof database.states)[number];

function xml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[char] || char);
}

function xmlResponse(body: string, method = "GET") {
  const bytes = new TextEncoder().encode(body);
  return new Response(method === "HEAD" ? null : bytes, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "content-length": String(bytes.byteLength),
      "cache-control": "public, max-age=300, s-maxage=86400, stale-while-revalidate=604800",
      "x-content-type-options": "nosniff",
      "access-control-allow-origin": "*",
    },
  });
}

export function sitemapIndex(states: StateItem[], method = "GET") {
  const entries = [`https://${DOMAIN}/sitemaps/core.xml`];
  for (const state of states) {
    const chunks = Math.ceil((state.cities.length * URLS_PER_CITY) / SITEMAP_LIMIT);
    for (let chunk = 1; chunk <= chunks; chunk++) {
      entries.push(`https://${DOMAIN}/sitemaps/${state.code}-${chunk}.xml`);
    }
  }
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map((loc) => `  <sitemap><loc>${xml(loc)}</loc></sitemap>`).join("\n")}\n</sitemapindex>`;
  return xmlResponse(body, method);
}

export function coreSitemap(states: StateItem[], method = "GET") {
  const corePaths = [
    "/",
    "/about",
    "/blog",
    "/services",
    "/locations",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/disclaimer",
    "/provider-disclosure",
  ];
  const urls = [
    ...corePaths.map((path) => `https://${DOMAIN}${path}`),
    ...servicesData.map((service) => `https://${DOMAIN}/services/${service.slug}`),
    ...states.map((state) => `https://${state.code}.${DOMAIN}/`),
  ];
  return sitemapUrlset(urls, method);
}

export function stateSitemap(state: StateItem, chunk: number, method = "GET") {
  if (!Number.isInteger(chunk) || chunk < 1) return null;
  const start = (chunk - 1) * SITEMAP_LIMIT;
  const total = state.cities.length * URLS_PER_CITY;
  if (start >= total) return null;
  const end = Math.min(total, start + SITEMAP_LIMIT);
  const urls: string[] = [];
  for (let index = start; index < end; index++) {
    const cityIndex = Math.floor(index / URLS_PER_CITY);
    const pageIndex = index % URLS_PER_CITY;
    const city = state.cities[cityIndex];
    const host = `${city.slug}-${state.code}.${DOMAIN}`;
    urls.push(pageIndex === 0 ? `https://${host}/` : `https://${host}/${servicesData[pageIndex - 1].slug}`);
  }
  return sitemapUrlset(urls, method);
}

function sitemapUrlset(urls: string[], method = "GET") {
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((loc) => `  <url><loc>${xml(loc)}</loc></url>`).join("\n")}\n</urlset>`;
  return xmlResponse(body, method);
}
