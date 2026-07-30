import servicesData from "../data/services.json";
import articlesData from "../data/articles.json";
import database from "../data/usa_database.json";
import { SITE } from "../lib/site";

const DOMAIN = SITE.domain;
export const SITEMAP_LIMIT = 2000;
const URLS_PER_CITY = servicesData.length + 1;
const TODAY = "2026-07-30";

export type StateItem = {
  code: string;
  name: string;
  slug: string;
  cities: [string, string][];
};

function xml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[char] || char);
}

function xmlResponse(body: string, method = "GET") {
  const bytes = new TextEncoder().encode(body);
  return new Response(method === "HEAD" ? null : bytes, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "content-length": String(bytes.byteLength),
      "cache-control": "public, max-age=86400, s-maxage=604800",
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
      entries.push(`https://${DOMAIN}/sitemaps/${state.slug}-${chunk}.xml`);
    }
  }
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map((loc) => `  <sitemap>\n    <loc>${xml(loc)}</loc>\n    <lastmod>${TODAY}</lastmod>\n  </sitemap>`).join("\n")}
</sitemapindex>`;
  return xmlResponse(body, method);
}

export function coreSitemap(states: StateItem[], method = "GET") {
  const corePaths = [
    "/",
    "/about-us/",
    "/articles/",
    "/services/",
    "/areas-we-serve/",
    "/contact-us/",
    "/privacy-policy/",
    "/terms-of-service/",
    "/disclaimer/",
  ];
  const urls = [
    ...corePaths.map((path) => `https://${DOMAIN}${path}`),
    ...servicesData.map((service) => `https://${DOMAIN}/services/${service.slug}/`),
    ...articlesData.map((article) => `https://${DOMAIN}/articles/${article.slug}/`),
    ...states.map((state) => `https://${state.slug}.${DOMAIN}/`),
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
    if (!city) break;
    const host = `${city[0]}-${state.slug}.${DOMAIN}`;
    urls.push(pageIndex === 0 ? `https://${host}/` : `https://${host}/${servicesData[pageIndex - 1].slug}/`);
  }
  return sitemapUrlset(urls, method);
}

function sitemapUrlset(urls: string[], method = "GET") {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((loc) => `  <url>\n    <loc>${xml(loc)}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>weekly</changefreq>\n  </url>`).join("\n")}
</urlset>`;
  return xmlResponse(body, method);
}
