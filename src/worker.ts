import services from '../data/services.json';

type Env = { ASSETS: { fetch(input: Request | string): Promise<Response> } };
type Context = { waitUntil(promise: Promise<unknown>): void };
type Service = (typeof services)[number];

const DOMAIN = 'batyspestcontrol.com';
const PHONE_DISPLAY = '(614) 926-0787';
const PHONE_HREF = 'tel:+16149260787';
const STATE_NAMES: Record<string, string> = {
  alabama: 'Alabama', alaska: 'Alaska', arizona: 'Arizona', arkansas: 'Arkansas', california: 'California', colorado: 'Colorado', connecticut: 'Connecticut', delaware: 'Delaware',
  'district-of-columbia': 'District of Columbia', florida: 'Florida', georgia: 'Georgia', hawaii: 'Hawaii', idaho: 'Idaho', illinois: 'Illinois', indiana: 'Indiana', iowa: 'Iowa',
  kansas: 'Kansas', kentucky: 'Kentucky', louisiana: 'Louisiana', maine: 'Maine', maryland: 'Maryland', massachusetts: 'Massachusetts', michigan: 'Michigan', minnesota: 'Minnesota',
  mississippi: 'Mississippi', missouri: 'Missouri', montana: 'Montana', nebraska: 'Nebraska', nevada: 'Nevada', 'new-hampshire': 'New Hampshire', 'new-jersey': 'New Jersey',
  'new-mexico': 'New Mexico', 'new-york': 'New York', 'north-carolina': 'North Carolina', 'north-dakota': 'North Dakota', ohio: 'Ohio', oklahoma: 'Oklahoma', oregon: 'Oregon',
  pennsylvania: 'Pennsylvania', 'rhode-island': 'Rhode Island', 'south-carolina': 'South Carolina', 'south-dakota': 'South Dakota', tennessee: 'Tennessee', texas: 'Texas', utah: 'Utah',
  vermont: 'Vermont', virginia: 'Virginia', washington: 'Washington', 'west-virginia': 'West Virginia', wisconsin: 'Wisconsin', wyoming: 'Wyoming',
};
const STATE_SLUGS = Object.keys(STATE_NAMES).sort((a, b) => b.length - a.length);

const CSS = `
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:Inter,Arial,sans-serif;color:#0f172a;background:#fff;-webkit-font-smoothing:antialiased}a{color:inherit;text-decoration:none}.wrap{max-width:1220px;margin:auto;padding:0 22px}.top{background:#bef264;color:#064e3b;font-weight:900;font-size:12px;text-transform:uppercase;letter-spacing:.06em}.top .wrap,.nav .wrap{display:flex;justify-content:space-between;align-items:center;gap:20px;padding-top:10px;padding-bottom:10px}.nav{background:#061426;color:#fff;border-bottom:1px solid rgba(255,255,255,.08);box-shadow:0 12px 35px rgba(2,13,32,.18)}.nav .wrap{padding-top:15px;padding-bottom:15px}.brand{display:flex;align-items:center;gap:12px;font-size:22px;font-weight:900}.brand small{display:block;color:#64748b;font-size:8px;letter-spacing:.16em;text-transform:uppercase;margin-top:2px}.logo{display:grid;place-items:center;width:46px;height:46px;border-radius:15px;background:linear-gradient(135deg,#d9f99d,#a3e635);color:#064e3b;box-shadow:0 10px 25px rgba(163,230,53,.16)}.logo svg{width:28px}.links{display:flex;gap:25px;font-weight:700;font-size:14px;color:#e2e8f0}.links a:hover{color:#bef264}.call{background:#fff;color:#07172d;border-radius:11px;padding:11px 17px;font-weight:900;font-size:13px}.call small{display:block;color:#047857;font-size:8px;letter-spacing:.08em}.hero{position:relative;isolation:isolate;min-height:545px;color:#fff;display:flex;align-items:center;background:#061426 url('/images/pest-control-hero.webp') center right/cover no-repeat}.hero:before{content:'';position:absolute;inset:0;z-index:-1;background:linear-gradient(90deg,#061426 0%,rgba(6,20,38,.96) 43%,rgba(6,20,38,.38) 100%)}.hero-inner{max-width:760px;padding-top:76px;padding-bottom:78px}.crumb{color:#cbd5e1;font-size:13px}.crumb a{color:#bef264}.hero h1{font-size:54px;line-height:1.04;letter-spacing:-.025em;margin:18px 0}.hero p{max-width:700px;color:#dbe4ee;font-size:18px;line-height:1.75}.cta{display:inline-block;margin-top:22px;background:#bef264;color:#064e3b;padding:15px 21px;border-radius:11px;font-weight:900;box-shadow:0 12px 30px rgba(190,242,100,.15)}.trust{display:flex;flex-wrap:wrap;gap:20px;margin-top:28px;color:#e2e8f0;font-size:13px;font-weight:800}.trust span:before{content:'✓';display:inline-grid;place-items:center;width:19px;height:19px;border-radius:50%;background:#10b981;color:#fff;font-size:10px;margin-right:7px}.section{padding:78px 0}.section.soft{background:#f4f7f5}.section-head{max-width:780px}.eyebrow{color:#047857;font-size:11px;font-weight:900;letter-spacing:.16em;text-transform:uppercase}.section h2{font-size:38px;line-height:1.15;letter-spacing:-.02em;margin:8px 0 13px}.muted{color:#64748b;line-height:1.75}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:36px}.card{border:1px solid #e2e8f0;border-radius:17px;overflow:hidden;background:#fff;box-shadow:0 5px 18px rgba(15,23,42,.035);transition:.2s}.card:hover{transform:translateY(-3px);border-color:#a7f3d0;box-shadow:0 18px 40px rgba(15,23,42,.09)}.card-top{display:flex;align-items:center;justify-content:space-between;height:68px;background:#07172d;color:#bef264;padding:20px;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.12em}.card-top:after{content:'Nationwide';border:1px solid rgba(190,242,100,.25);border-radius:20px;padding:5px 8px;font-size:8px}.card-body{padding:22px}.card h3{margin:0;font-size:18px;line-height:1.3}.card p{color:#64748b;font-size:14px;line-height:1.65}.card .more{color:#047857;font-weight:900;font-size:14px}.check{background:#07172d;color:#fff;border-radius:22px;padding:34px;margin-top:42px;box-shadow:0 20px 45px rgba(7,23,45,.12)}.check h2{color:#fff;font-size:27px}.check ul{columns:2;line-height:2;color:#cbd5e1}.check strong{color:#bef264}.final{background:#bef264;color:#064e3b;padding:38px 0}.final .wrap{display:flex;align-items:center;justify-content:space-between;gap:24px}.final h2{margin:0;font-size:29px}.final p{margin-bottom:0}.dark-btn{background:#07172d;color:#fff;padding:15px 20px;border-radius:11px;font-weight:900}.footer{background:#020b1b;color:#cbd5e1;padding:60px 0 25px;border-top:4px solid #059669}.footgrid{display:grid;grid-template-columns:1.25fr .8fr .9fr 1.25fr;gap:38px}.footer h2{color:#fff;font-size:15px;text-transform:uppercase;letter-spacing:.08em;border-bottom:1px solid #1e293b;padding-bottom:14px}.footer p,.footer a{color:#94a3b8;font-size:14px;line-height:1.75}.footer a:hover{color:#bef264}.footer .stack{display:grid;gap:9px}.legal{border-top:1px solid #1e293b;margin-top:40px;padding-top:22px;color:#64748b;font-size:12px}.article{max-width:900px}.article h2{margin-top:38px}.article li{margin:10px 0;line-height:1.65}@media(max-width:900px){.links{display:none}.grid{grid-template-columns:1fr 1fr}.footgrid{grid-template-columns:1fr 1fr}.hero:before{background:rgba(6,20,38,.82)}.hero h1{font-size:43px}}@media(max-width:580px){.top .wrap{display:block;text-align:center}.top span+span{display:none}.nav .wrap{flex-wrap:wrap}.brand{font-size:18px}.brand small{display:none}.logo{width:42px;height:42px}.grid,.footgrid{grid-template-columns:1fr}.hero{min-height:500px}.hero h1{font-size:36px}.hero-inner{padding:60px 0}.call{font-size:11px;padding:10px 12px}.check ul{columns:1}.final .wrap{display:block}.dark-btn{display:inline-block;margin-top:18px}.section{padding:60px 0}.section h2{font-size:32px}}
`;

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char] ?? char);
}

function titleCase(slug: string) {
  return slug.split('-').filter(Boolean).map((word) => word.length <= 2 ? word.toUpperCase() : word[0].toUpperCase() + word.slice(1)).join(' ');
}

function shell(title: string, description: string, canonical: string, content: string, schema?: unknown) {
  const jsonLd = schema ? `<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>` : '';
  return `<!doctype html><html lang="en-US"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)} | Batys Pest Control</title><meta name="description" content="${escapeHtml(description)}"><meta name="robots" content="index, follow"><link rel="canonical" href="${canonical}">${jsonLd}<style>${CSS}</style></head><body>${header()}<main>${content}</main>${footer()}</body></html>`;
}

function header() {
  const mark = `<svg viewBox="0 0 32 32" fill="none"><path d="M16 4 27 9v7c0 6.5-4.2 10.5-11 13C9.2 26.5 5 22.5 5 16V9l11-5Z" fill="currentColor" opacity=".2"/><path d="M16 7.5 24 11v5c0 4.8-2.8 8-8 10.2C10.8 24 8 20.8 8 16v-5l8-3.5Z" stroke="currentColor" stroke-width="2"/><path d="m12 17.2 3 2.8 5.5-7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`;
  return `<header><div class="top"><div class="wrap"><span>● &nbsp; Serving all 50 states + Washington, DC</span><span>Independent provider network &nbsp; | &nbsp; <a href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></span></div></div><div class="nav"><div class="wrap"><a class="brand" href="https://${DOMAIN}/"><span class="logo">${mark}</span><span>Batys <b style="color:#bef264">Pest Control</b><small>Nationwide Provider Network</small></span></a><nav class="links"><a href="https://${DOMAIN}/">Home</a><a href="https://${DOMAIN}/about">About</a><a href="https://${DOMAIN}/services">Pest Services</a><a href="https://${DOMAIN}/locations">Locations</a><a href="https://${DOMAIN}/blog">Guides</a></nav><a class="call" href="${PHONE_HREF}"><small>CHECK AVAILABILITY</small>${PHONE_DISPLAY}</a></div></div></header>`;
}

function footer() {
  const popular = services.slice(0, 5).map((service) => `<a href="https://${DOMAIN}/services/${service.slug}">${escapeHtml(service.name)}</a>`).join('');
  return `<section class="final"><div class="wrap"><div><h2>Need pest-control help in your area?</h2><p>Call to check independent provider availability.</p></div><a class="dark-btn" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div></section><footer class="footer"><div class="wrap"><div class="footgrid"><div><div class="brand"><span class="logo">✓</span><span>Batys <b style="color:#bef264">Pest Control</b></span></div><p>Research pest problems, compare service topics, and connect with available independent providers.</p><a href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div><div><h2>Explore</h2><div class="stack"><a href="https://${DOMAIN}/">Home</a><a href="https://${DOMAIN}/about">About Batys</a><a href="https://${DOMAIN}/services">70 Pest Services</a><a href="https://${DOMAIN}/locations">States &amp; Cities</a><a href="https://${DOMAIN}/blog">Pest Guides</a></div></div><div><h2>Popular Services</h2><div class="stack">${popular}</div></div><div><h2>Clear &amp; Independent</h2><p>Batys is an information and lead-referral platform. Providers are independent businesses. Verify licensing, insurance, methods, pricing, and availability before hiring.</p></div></div><div class="legal">© ${new Date().getUTCFullYear()} Batys Pest Control. All rights reserved.</div></div></footer>`;
}

function cityPage(city: string, state: string, host: string) {
  const cityName = titleCase(city);
  const stateName = STATE_NAMES[state];
  const canonical = `https://${host}/`;
  const cards = services.map((service) => `<article class="card"><div class="card-top">${escapeHtml(service.category)}</div><div class="card-body"><h3>${escapeHtml(service.name)} in ${escapeHtml(cityName)}</h3><p>${escapeHtml(service.description)}</p><a class="more" href="/${service.slug}">Learn More →</a></div></article>`).join('');
  const content = `<section class="hero"><div class="wrap"><div class="hero-inner"><div class="crumb"><a href="https://${state}.${DOMAIN}/">${escapeHtml(stateName)}</a> &nbsp;/&nbsp; ${escapeHtml(cityName)}</div><h1>Pest Control in ${escapeHtml(cityName)}, ${escapeHtml(stateName)}</h1><p>Research local pest-control topics, inspection questions, treatment planning, and independent provider availability for ${escapeHtml(cityName)}.</p><a class="cta" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a><div class="trust"><span>70 service topics</span><span>Independent providers</span><span>Clear hiring guidance</span></div></div></div></section><section class="section soft"><div class="wrap"><div class="section-head"><div class="eyebrow">Local pest-control directory</div><h2>Pest services in ${escapeHtml(cityName)}</h2><p class="muted">Choose a pest or service topic. Availability, methods, pricing, and credentials are confirmed directly with the independent provider.</p></div><div class="grid">${cards}</div><div class="check"><h2>Before hiring a provider</h2><ul><li>Confirm pest identification and inspection findings.</li><li>Verify state and local licensing requirements.</li><li>Request written scope, preparation steps, and price.</li><li>Ask about products, safety instructions, and follow-up.</li></ul></div></div></section>`;
  return shell(`Pest Control in ${cityName}, ${stateName}`, `Explore pest-control services and independent provider options for ${cityName}, ${stateName}.`, canonical, content);
}

function servicePage(city: string, state: string, service: Service, host: string) {
  const cityName = titleCase(city);
  const stateName = STATE_NAMES[state];
  const canonical = `https://${host}/${service.slug}`;
  const related = services.filter((item) => item.category === service.category && item.slug !== service.slug).slice(0, 6).map((item) => `<a class="card-body more" href="/${item.slug}">${escapeHtml(item.name)} →</a>`).join('');
  const schema = { '@context': 'https://schema.org', '@type': 'Service', name: `${service.name} in ${cityName}, ${stateName}`, description: service.description, areaServed: { '@type': 'City', name: cityName, containedInPlace: { '@type': 'State', name: stateName } }, provider: { '@type': 'Organization', name: 'Batys Pest Control', url: `https://${DOMAIN}` }, url: canonical };
  const content = `<section class="hero"><div class="wrap"><div class="hero-inner"><div class="crumb"><a href="https://${state}.${DOMAIN}/">${escapeHtml(stateName)}</a> &nbsp;/&nbsp; <a href="https://${host}/">${escapeHtml(cityName)}</a> &nbsp;/&nbsp; ${escapeHtml(service.name)}</div><h1>${escapeHtml(service.name)} in ${escapeHtml(cityName)}, ${escapeHtml(stateName)}</h1><p>${escapeHtml(service.description)}</p><a class="cta" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a><div class="trust"><span>Location-specific information</span><span>Independent providers</span><span>Hiring questions included</span></div></div></div></section><section class="section"><div class="wrap article"><div class="eyebrow">Service planning guide</div><h2>What the service should address</h2><p class="muted">A provider should identify the pest, inspect likely activity areas, explain contributing conditions, and recommend a proportionate treatment or prevention plan. Request a written scope that separates immediate control from exclusion, monitoring, and follow-up.</p><h2>Questions to ask</h2><ul><li>What evidence confirms the pest identification?</li><li>Which areas will be inspected or treated?</li><li>What preparation and safety steps are required?</li><li>What follow-up or monitoring is included?</li><li>Which ${escapeHtml(stateName)} credentials apply?</li></ul><h2>Related ${escapeHtml(service.category)} topics</h2><div class="card">${related}</div><div class="check"><strong>Independent provider disclosure:</strong> Batys provides information and referrals. Confirm diagnosis, methods, availability, pricing, credentials, and service terms directly with the provider.</div></div></section>`;
  return shell(`${service.name} in ${cityName}, ${stateName}`, `${service.description} Learn what to ask when seeking ${service.name.toLowerCase()} in ${cityName}, ${stateName}.`, canonical, content, schema);
}

function errorPage(status: number, message: string) {
  return new Response(`<!doctype html><html><head><meta charset="utf-8"><meta name="robots" content="noindex"><style>${CSS}</style><title>${status} | Batys Pest Control</title></head><body>${header()}<main class="section"><div class="wrap"><h1>${status}</h1><p>${escapeHtml(message)}</p></div></main>${footer()}</body></html>`, { status, headers: { 'content-type': 'text/html; charset=utf-8', 'x-robots-tag': 'noindex' } });
}

function parseLocation(subdomain: string) {
  if (STATE_NAMES[subdomain]) return { state: subdomain };
  const state = STATE_SLUGS.find((slug) => subdomain.endsWith(`-${slug}`));
  if (!state) return null;
  const city = subdomain.slice(0, -(state.length + 1));
  return city ? { state, city } : null;
}

function dynamicResponse(html: string) {
  return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800', 'x-batys-runtime': 'lightweight-worker' } });
}

async function cached(request: Request, context: Context, render: () => Response) {
  const cache = (caches as CacheStorage & { default: Cache }).default;
  const hit = await cache.match(request);
  if (hit) return hit;
  const response = render();
  context.waitUntil(cache.put(request, response.clone()));
  return response;
}

export default {
  async fetch(request: Request, env: Env, context: Context): Promise<Response> {
    if (request.method !== 'GET' && request.method !== 'HEAD') return new Response('Method Not Allowed', { status: 405 });
    const url = new URL(request.url);
    const hostname = url.hostname.toLowerCase();
    const path = url.pathname;

    if (hostname === `www.${DOMAIN}`) {
      url.hostname = DOMAIN;
      return Response.redirect(url.toString(), 308);
    }

    if (hostname === DOMAIN) {
      const segments = path.split('/').filter(Boolean);
      const state = segments[0];
      if (state && STATE_NAMES[state]) {
        const city = segments[1];
        url.hostname = city ? `${city}-${state}.${DOMAIN}` : `${state}.${DOMAIN}`;
        url.pathname = city ? `/${segments.slice(2).join('/')}` : '/';
        return Response.redirect(url.toString(), 308);
      }
      return env.ASSETS.fetch(request);
    }

    if (!hostname.endsWith(`.${DOMAIN}`)) return errorPage(404, 'This host is not configured.');
    if (path.startsWith('/_next/') || /\.[a-z0-9]{2,8}$/i.test(path)) return env.ASSETS.fetch(request);
    if (path === '/robots.txt' || path === '/sitemap.xml') return Response.redirect(`https://${DOMAIN}${path}`, 308);

    const subdomain = hostname.slice(0, -(DOMAIN.length + 1));
    const location = parseLocation(subdomain);
    if (!location) return errorPage(404, 'This location could not be found.');

    if (!location.city) {
      if (path !== '/') return errorPage(404, 'This state page does not have that route.');
      return env.ASSETS.fetch(new Request(`https://assets.local/${location.state}/`, request));
    }

    const serviceSlug = path.split('/').filter(Boolean)[0];
    if (path !== '/' && path.split('/').filter(Boolean).length !== 1) return errorPage(404, 'This page could not be found.');
    if (!serviceSlug) return cached(request, context, () => dynamicResponse(cityPage(location.city!, location.state, hostname)));
    const service = services.find((item) => item.slug === serviceSlug);
    if (!service) return errorPage(404, 'This pest service could not be found.');
    return cached(request, context, () => dynamicResponse(servicePage(location.city!, location.state, service, hostname)));
  },
};
