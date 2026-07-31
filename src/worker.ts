import database from "../data/usa_database.json";
import services from "../data/services.json";
import articles from "../data/articles.json";
import {
  getServicesForState,
  aboutUsPage,
  areasWeServePage,
  articlePage,
  articlesHubPage,
  cityPage,
  contactUsPage,
  disclaimerPage,
  homePage,
  localServicePage,
  nationalServicePage,
  notFoundPage,
  privacyPolicyPage,
  servicesHubPage,
  statePage,
  termsOfServicePage,
} from "./locationTemplates";
import {
  getServicesForState, coreSitemap, sitemapIndex, stateSitemap, type StateItem } from "./sitemaps";
import {
  getServicesForState, SITE } from "../lib/site";

type Env = { ASSETS: { fetch(input: Request | string): Promise<Response> } };
type Ctx = { waitUntil(promise: Promise<unknown>): void };

const DOMAIN = SITE.domain;
const rawStates = (database as any).states || [];

function getStateSlug(state: any): string {
  if (state.slug) return state.slug.toLowerCase();
  if (state.name) return state.name.toLowerCase().replace(/\s+/g, "-");
  if (state.code) return state.code.toLowerCase();
  return "";
}

const STATES: StateItem[] = rawStates.map((s: any) => {
  const slug = getStateSlug(s);
  const cities: [string, string][] = (s.cities || []).map((c: any) => {
    if (Array.isArray(c)) return [c[0], c[1]];
    return [c.slug || c.name.toLowerCase().replace(/\s+/g, "-"), c.name];
  });
  return { ...s, slug, cities };
});

const STATE_BY_SLUG = new Map(STATES.map((s) => [s.slug, s]));
const STATE_SLUGS = STATES.map((s) => s.slug).filter(Boolean).sort((a, b) => b.length - a.length);

function parseSubdomain(subdomain: string): { state: StateItem; city?: [string, string] } | null {
  const sub = subdomain.toLowerCase();
  const directState = STATE_BY_SLUG.get(sub);
  if (directState) return { state: directState };

  const stateSlug = STATE_SLUGS.find((slug) => sub.endsWith(`-${slug}`));
  if (!stateSlug) return null;

  const state = STATE_BY_SLUG.get(stateSlug)!;
  const citySlug = sub.slice(0, -(stateSlug.length + 1));
  const city = state.cities.find(([slug]) => slug.toLowerCase() === citySlug);
  return city ? { state, city } : null;
}

function htmlResponse(html: string, method = "GET", status = 200, extra: Record<string, string> = {}) {
  const bytes = new TextEncoder().encode(html);
  return new Response(method === "HEAD" ? null : bytes, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "content-length": String(bytes.byteLength),
      "cache-control": "no-cache, no-store, must-revalidate",
      "x-content-type-options": "nosniff",
      ...extra,
    },
  });
}

function notFound(message: string, method = "GET") {
  return htmlResponse(notFoundPage(message), method, 404, { "x-robots-tag": "noindex" });
}

function redirect(url: string, status = 308) {
  return Response.redirect(url, status);
}

async function cached(request: Request, ctx: Ctx, render: () => Response) {
  if (request.method === "HEAD") return render();
  try {
    return render();
  } catch (e) {
    return render();
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: Ctx): Promise<Response> {
    try {
      if (!["GET", "HEAD"].includes(request.method)) return new Response("Method Not Allowed", { status: 405 });

      const url = new URL(request.url);
      const hostname = url.hostname.toLowerCase();
      const path = url.pathname;
      const method = request.method;

      if (hostname === `www.${DOMAIN}`) {
        url.hostname = DOMAIN;
        return redirect(url.toString());
      }

      if (hostname === DOMAIN || hostname.endsWith(".workers.dev")) {
        if (path === "/" || path === "") {
          return cached(request, ctx, () => htmlResponse(homePage(STATES), method));
        }

        if (path.match(/^\/([a-f0-9]{32})\.txt$/i)) {
          const key = path.slice(1, -4);
          return new Response(key, { headers: { "content-type": "text/plain; charset=utf-8" } });
        }

        if (path === "/robots.txt") {
          const body = `User-agent: *\nAllow: /\nSitemap: https://${DOMAIN}/sitemap.xml\n`;
          return new Response(method === "HEAD" ? null : body, {
            headers: {
              "content-type": "text/plain; charset=utf-8",
              "cache-control": "public, s-maxage=86400",
              "content-length": String(new TextEncoder().encode(body).byteLength),
            },
          });
        }

        if (path === "/sitemap.xml") return cached(request, ctx, () => sitemapIndex(STATES, method));
        if (path === "/sitemaps/core.xml") return cached(request, ctx, () => coreSitemap(STATES, method));

        const sitemapMatch = path.match(/^\/sitemaps\/(.+)-(\d+)\.xml$/);
        if (sitemapMatch) {
          const stateSlug = sitemapMatch[1].toLowerCase();
          const state = STATE_BY_SLUG.get(stateSlug) || STATES.find((s) => s.code.toLowerCase() === stateSlug);
          if (!state) return new Response("Not Found", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
          const sitemap = stateSitemap(state, Number(sitemapMatch[2]), method);
          if (!sitemap) return new Response("Not Found", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
          return cached(request, ctx, () => sitemap);
        }

        if (path === "/about-us" || path === "/about-us/" || path === "/about" || path === "/about/") {
          return cached(request, ctx, () => htmlResponse(aboutUsPage(), method));
        }

        if (path === "/contact-us" || path === "/contact-us/" || path === "/contact" || path === "/contact/") {
          return cached(request, ctx, () => htmlResponse(contactUsPage(), method));
        }

        if (path === "/privacy-policy" || path === "/privacy-policy/") {
          return cached(request, ctx, () => htmlResponse(privacyPolicyPage(), method));
        }

        if (path === "/terms-of-service" || path === "/terms-of-service/" || path === "/terms" || path === "/terms/") {
          return cached(request, ctx, () => htmlResponse(termsOfServicePage(), method));
        }

        if (path === "/disclaimer" || path === "/disclaimer/") {
          return cached(request, ctx, () => htmlResponse(disclaimerPage(), method));
        }

        if (path === "/articles" || path === "/articles/") {
          return cached(request, ctx, () => htmlResponse(articlesHubPage(), method));
        }

        if (path.startsWith("/articles/")) {
          const slug = path.split("/")[2]?.replace(/\/$/, "");
          const article = (articles as any[]).find((a) => a.slug === slug);
          if (article) {
            return cached(request, ctx, () => htmlResponse(articlePage(article), method));
          }
        }

        if (path === "/services" || path === "/services/" || path === "/services.html") {
          return cached(request, ctx, () => htmlResponse(servicesHubPage(), method));
        }

        if (path === "/areas" || path === "/areas/" || path === "/areas-we-serve" || path === "/areas-we-serve/") {
          return cached(request, ctx, () => htmlResponse(areasWeServePage(STATES), method));
        }

        if (path.startsWith("/services/")) {
          const slug = path.split("/")[2]?.replace(/\/$/, "");
          const service = services.find((s) => s.slug === slug);
          if (service) {
            return cached(request, ctx, () => htmlResponse(nationalServicePage(service as any), method));
          }
        }

        const parts = path.split("/").filter(Boolean);
        if (parts[0] && STATE_BY_SLUG.has(parts[0])) {
          const state = STATE_BY_SLUG.get(parts[0])!;
          const citySlug = parts[1];
          url.hostname = citySlug && state.cities.some(([slug]) => slug === citySlug)
            ? `${citySlug}-${state.slug}.${DOMAIN}`
            : `${state.slug}.${DOMAIN}`;
          url.pathname = parts[2] ? `/${parts.slice(2).join("/")}/` : "/";
          return redirect(url.toString());
        }

        return env.ASSETS.fetch(request);
      }

      if (!hostname.endsWith(`.${DOMAIN}`)) return notFound("This hostname is not configured.", method);

      if (path.startsWith("/_next/") || path.startsWith("/images/") || /\.[a-z0-9]{2,8}$/i.test(path)) {
        url.hostname = DOMAIN;
        return env.ASSETS.fetch(new Request(url.toString(), request));
      }

      if (path === "/robots.txt" || path === "/sitemap.xml" || path.startsWith("/sitemaps/")) {
        return redirect(`https://${DOMAIN}${path}`);
      }

      const apexRoutes = ["/services", "/areas-we-serve", "/articles", "/about-us", "/contact-us", "/privacy-policy", "/terms-of-service", "/disclaimer"];
      if (apexRoutes.some((prefix) => path === prefix || path === `${prefix}/` || path.startsWith(`${prefix}/`))) {
        return redirect(`https://${DOMAIN}${path}`);
      }

      const subdomain = hostname.slice(0, -(DOMAIN.length + 1));
      const location = parseSubdomain(subdomain);
      if (!location) return notFound("This city or state route could not be found.", method);

      if (!location.city) {
        if (path !== "/") return redirect(`https://${hostname}/`);
        return cached(request, ctx, () => htmlResponse(statePage(location.state), method));
      }

      const routeParts = path.split("/").filter(Boolean);
      if (routeParts.length === 0) {
        return cached(request, ctx, () => htmlResponse(cityPage(location.state, location.city!, hostname), method));
      }
      if (routeParts.length > 1) return notFound("This local route could not be found.", method);

      const service = services.find((item) => item.slug === routeParts[0]);
      if (!service) return notFound("This service could not be found.", method);

      return cached(request, ctx, () => htmlResponse(localServicePage(location.state, location.city!, service, hostname), method));
    } catch (err) {
      return htmlResponse(notFoundPage("An unexpected error occurred. Please try again."), "GET", 500);
    }
  },
};
