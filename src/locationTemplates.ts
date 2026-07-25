import services from "../data/services.json";

export type StateRow = { code: string; name: string; slug: string; cities: [string, string][] };
const DOMAIN = "batyspestcontrol.com";
const PHONE_DISPLAY = "(614) 926-0787";
const PHONE_HREF = "tel:+16149260787";

const IMAGES = {
  hero: "https://batyspestcontrol.com/images/pest-control-hero.webp",
  state: "https://batyspestcontrol.com/images/media__1783510889843.jpg",
  city: "https://batyspestcontrol.com/images/media__1783510889927.jpg",
  service: "https://batyspestcontrol.com/images/media__1783510931195.jpg",
};

const CSS = `
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;color:#0f172a;background:#fff;-webkit-font-smoothing:antialiased}a{color:inherit;text-decoration:none}.wrap{width:min(1180px,calc(100% - 32px));margin:auto}.top{background:#0a1c2d;color:#fff;font-size:12px}.top .wrap,.nav .wrap{display:flex;align-items:center;justify-content:space-between;gap:20px}.top .wrap{padding:9px 0}.top b{color:#fbbf24}.nav{position:sticky;top:0;z-index:30;background:rgba(255,255,255,.97);backdrop-filter:blur(14px);border-bottom:1px solid #e2e8f0;box-shadow:0 10px 32px rgba(15,23,42,.08)}.nav .wrap{padding:14px 0}.brand{display:flex;align-items:center;gap:11px;font-size:20px;font-weight:950;color:#0a1c2d;letter-spacing:-.02em}.logo{width:44px;height:44px;border-radius:12px;display:grid;place-items:center;background:linear-gradient(135deg,#16b7df,#0284c7);color:#fff;box-shadow:0 10px 24px rgba(22,183,223,.25);font-size:20px;font-weight:900}.brand small{display:block;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:#64748b}.links{display:flex;gap:22px;font-size:14px;font-weight:850;color:#334155}.links a:hover{color:#0284c7}.btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:14px 21px;border-radius:10px;background:#f47b20;color:#fff;font-weight:900;box-shadow:0 10px 24px rgba(244,123,32,.24);transition:.2s}.btn:hover{transform:translateY(-2px);background:#dc6815}.btn.dark{background:#0a1c2d}.btn.ghost{background:transparent;border:1px solid rgba(255,255,255,.38);box-shadow:none}.hero{position:relative;overflow:hidden;background:linear-gradient(135deg,#0a1c2d 0%,#133758 58%,#086b9c 100%);color:#fff;padding:78px 0}.hero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:48px;align-items:center}.hero h1{font-size:clamp(44px,6vw,72px);line-height:1.01;letter-spacing:-.052em;margin:20px 0}.hero h1 em{font-style:normal;color:#16b7df}.hero p{font-size:18px;line-height:1.75;color:#dbe4ee;max-width:760px}.hero-photo{position:relative}.hero-photo img{display:block;width:100%;height:470px;object-fit:cover;border-radius:25px;box-shadow:0 32px 75px rgba(0,0,0,.34);border:1px solid rgba(255,255,255,.18)}.hero-photo:after{content:"";position:absolute;right:-14px;top:-14px;width:100px;height:100px;border-top:8px solid #f47b20;border-right:8px solid #f47b20;border-radius:0 22px 0 0}.crumb{font-size:13px;color:#cbd5e1}.crumb a{color:#7dd3fc}.eyebrow{display:inline-flex;margin-top:18px;padding:8px 12px;border-radius:999px;background:rgba(22,183,223,.15);border:1px solid rgba(125,211,252,.3);color:#a7f3d0;font-size:11px;font-weight:900;letter-spacing:.14em;text-transform:uppercase}.buttons{display:flex;flex-wrap:wrap;gap:12px;margin-top:27px}.badges{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}.badge{padding:9px 12px;border-radius:999px;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.18);font-size:12px;font-weight:850;color:#eaf4fb}.stats{border-bottom:1px solid #e2e8f0;background:#fff}.stats .wrap{display:grid;grid-template-columns:repeat(4,1fr)}.stat{text-align:center;padding:27px 15px;border-left:1px solid #e2e8f0}.stat:first-child{border-left:0}.stat strong{display:block;font-size:31px;color:#0a1c2d}.stat span{display:block;margin-top:5px;color:#64748b;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.1em}.section{padding:78px 0}.soft{background:#f4f7f9}.blue{background:#ecf9ff}.dark-section{background:#0a1c2d;color:#fff}.head{display:flex;align-items:end;justify-content:space-between;gap:28px;margin-bottom:32px}.eyeline{display:inline-block;color:#0284c7;font-size:11px;font-weight:900;letter-spacing:.13em;text-transform:uppercase}.section h2{font-size:clamp(34px,4vw,50px);line-height:1.08;margin:8px 0 0;letter-spacing:-.038em}.muted{max-width:760px;color:#64748b;line-height:1.75}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.card{display:block;background:#fff;border:1px solid #e2e8f0;border-radius:18px;padding:25px;box-shadow:0 8px 26px rgba(15,23,42,.06);transition:.2s}.card:hover{transform:translateY(-4px);border-color:#7dd3fc;box-shadow:0 18px 40px rgba(15,23,42,.12)}.card b{display:grid;place-items:center;width:46px;height:46px;border-radius:13px;background:#e0f2fe;color:#0284c7;font-size:14px}.card h3{font-size:20px;margin:17px 0 9px;color:#0a1c2d;letter-spacing:-.02em}.card p{color:#64748b;line-height:1.68;margin:0;font-size:14px}.more{display:inline-block;margin-top:17px;color:#0284c7;font-weight:900;font-size:14px}.directory{display:grid;grid-template-columns:repeat(4,1fr);gap:13px}.directory a{display:flex;align-items:center;justify-content:space-between;gap:15px;padding:17px 18px;border:1px solid #e2e8f0;border-radius:13px;background:#fff;color:#334155;font-size:14px;font-weight:850;box-shadow:0 6px 18px rgba(15,23,42,.04);transition:.18s}.directory a:after{content:"→";color:#0284c7}.directory a:hover{transform:translateY(-2px);color:#0284c7;border-color:#7dd3fc}.content{display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:40px}.article{font-size:17px;line-height:1.82}.article h2{font-size:30px;color:#0a1c2d;margin-top:40px;letter-spacing:-.025em}.article h3{font-size:21px;color:#0a1c2d}.article p,.article li{color:#475569}.article li{margin:8px 0}.side{position:sticky;top:105px;align-self:start;background:linear-gradient(145deg,#0a1c2d,#0f4c75);color:#fff;border-radius:19px;padding:27px;box-shadow:0 18px 45px rgba(15,23,42,.2)}.side p{color:#dbe4ee;line-height:1.65}.side .more{display:block;color:#7dd3fc}.notice{background:#fff7ed;border:1px solid #fed7aa;border-radius:14px;padding:19px;color:#9a3412;line-height:1.65}.process{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:34px}.step{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:23px}.step b{font-size:35px;color:#cbd5e1}.step h3{font-size:20px;color:#0a1c2d}.step p{color:#64748b;line-height:1.65}.faq{display:grid;gap:12px;margin-top:28px}.faq details{background:#fff;border:1px solid #e2e8f0;border-radius:13px;padding:18px 20px}.faq summary{cursor:pointer;font-weight:900;color:#0a1c2d}.faq p{color:#64748b;line-height:1.7}.footer{background:#0a1c2d;color:#cbd5e1;padding:54px 0 22px}.footer .wrap{display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:36px}.footer h3{color:#fff}.footer a{display:block;margin:10px 0}.legal{grid-column:1/-1;border-top:1px solid rgba(255,255,255,.1);padding-top:20px;font-size:12px}.sticky{position:fixed;right:18px;bottom:18px;z-index:80}@media(max-width:920px){.links{display:none}.hero-grid,.content{grid-template-columns:1fr}.hero-photo img{height:420px}.grid{grid-template-columns:repeat(2,1fr)}.directory{grid-template-columns:repeat(2,1fr)}.process{grid-template-columns:repeat(2,1fr)}.side{position:static}.footer .wrap{grid-template-columns:1fr 1fr}}@media(max-width:620px){.top span:last-child{display:none}.hero{padding:58px 0}.hero h1{font-size:44px}.hero-photo img{height:360px}.grid,.directory,.process,.footer .wrap{grid-template-columns:1fr}.stats .wrap{grid-template-columns:1fr 1fr}.stat:nth-child(3){border-left:0;border-top:1px solid #e2e8f0}.stat:nth-child(4){border-top:1px solid #e2e8f0}.head{display:block}.btn{width:100%}.sticky{left:12px;right:12px;bottom:12px}}
`;

function esc(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] || char);
}

function header() {
  return `<div class="top"><div class="wrap"><span>● &nbsp; Nationwide pest control location directory</span><span><b>Independent provider network</b> &nbsp; | &nbsp; Call ${PHONE_DISPLAY}</span></div></div><header class="nav"><div class="wrap"><a class="brand" href="https://${DOMAIN}/"><span class="logo">B</span><span>Batys Pest Control<small>Services · Locations · Pest Guides</small></span></a><nav class="links"><a href="https://${DOMAIN}/services/">Services</a><a href="https://${DOMAIN}/areas-we-serve/">Areas We Serve</a><a href="https://${DOMAIN}/about/">About</a><a href="https://${DOMAIN}/contact/">Contact</a></nav><a class="btn" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div></header>`;
}

function footer() {
  return `<footer class="footer"><div class="wrap"><div><h3>Batys Pest Control</h3><p>Research pest control issues, compare treatment options and browse independent-provider referral routes across the United States.</p><a class="btn" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div><div><h3>Explore</h3><a href="https://${DOMAIN}/services/">All ${services.length} Pest Services</a><a href="https://${DOMAIN}/areas-we-serve/">States & Cities</a><a href="https://${DOMAIN}/about/">About</a></div><div><h3>Disclosure</h3><a href="https://${DOMAIN}/provider-disclosure/">Provider Disclosure</a><a href="https://${DOMAIN}/privacy-policy/">Privacy Policy</a><a href="https://${DOMAIN}/terms/">Terms</a><a href="https://${DOMAIN}/disclaimer/">Disclaimer</a></div><div class="legal">© ${new Date().getUTCFullYear()} Batys Pest Control. Providers are independent businesses. Verify licensing, insurance, diagnosis, methods, pricing, coverage, and service terms before hiring.</div></div></footer>`;
}

function shell(title: string, description: string, canonical: string, body: string, schema: unknown) {
  return `<!doctype html><html lang="en-US"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)} | Batys Pest Control</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${canonical}"><meta name="robots" content="index,follow"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${canonical}"><style>${CSS}</style><script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script></head><body>${header()}${body}${footer()}<a class="btn sticky" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></body></html>`;
}

function serviceCards(host: string, local: boolean) {
  return services.map((service, index) => `<a class="card" href="${local ? `https://${host}/${service.slug}/` : `https://${DOMAIN}/services/${service.slug}/`}"><b>${String(index + 1).padStart(2, "0")}</b><h3>${esc(service.name)}</h3><p>${esc(service.description)}</p><span class="more">Review service →</span></a>`).join("");
}

export function homePage(states: StateRow[]) {
  const canonical = `https://${DOMAIN}/`;
  const stateLinks = states.map((s) => `<a href="https://${s.slug}.${DOMAIN}/"><span>${esc(s.name)}</span></a>`).join("");
  const offerCatalog = {
    "@type": "OfferCatalog",
    name: "Nationwide Pest Control & Treatment Services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.description,
        url: `https://${DOMAIN}/services/${s.slug}/`
      }
    }))
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "PestControl",
        "@id": `https://${DOMAIN}/#organization`,
        name: "Batys Pest Control",
        url: canonical,
        telephone: PHONE_DISPLAY,
        hasOfferCatalog: offerCatalog
      },
      {
        "@type": "WebSite",
        name: "Batys Pest Control",
        url: canonical
      }
    ]
  };

  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><span class="eyebrow">Nationwide pest control directory</span><h1>Find reliable pest control <em>in your city</em></h1><p>Research pest concerns, explore ${services.length} specialized treatment topics and connect with independent pest control professionals across all 50 states.</p><div class="buttons"><a class="btn" href="#states">Browse All States</a><a class="btn ghost" href="#services">View ${services.length} Services</a></div><div class="badges"><span class="badge">Independent providers</span><span class="badge">City-specific routes</span><span class="badge">24/7 Hotline support</span></div></div><div class="hero-photo"><img src="${IMAGES.hero}" alt="Professional pest inspection" width="800" height="620"></div></div></section><section class="stats"><div class="wrap"><div class="stat"><strong>51</strong><span>States & DC</span></div><div class="stat"><strong>${services.length}</strong><span>Pest topics</span></div><div class="stat"><strong>City</strong><span>Local Subdomains</span></div><div class="stat"><strong>Direct</strong><span>Availability Check</span></div></div></section><section class="section soft" id="states"><div class="wrap"><div class="head"><div><span class="eyeline">Areas We Serve</span><h2>Pest control directory by state</h2><p class="muted">Select your state to explore local cities and communities.</p></div></div><div class="directory">${stateLinks}</div></div></section><section class="section" id="services"><div class="wrap"><div class="head"><div><span class="eyeline">Services Directory</span><h2>All ${services.length} pest control services</h2><p class="muted">Review termites, bed bugs, rodents, ants, cockroaches, mosquitoes, wildlife, and seasonal pest treatment options.</p></div></div><div class="grid">${serviceCards(DOMAIN, false)}</div></div></section></main>`;
  return shell("Pest Control Services Directory", "Nationwide pest control and inspection service referral directory across all 50 US states.", canonical, body, schema);
}

export function servicesHubPage() {
  const canonical = `https://${DOMAIN}/services/`;
  const offerCatalog = {
    "@type": "OfferCatalog",
    name: "Nationwide Pest Control & Treatment Services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.description,
        url: `https://${DOMAIN}/services/${s.slug}/`
      }
    }))
  };
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "All Pest Control & Inspection Services",
        url: canonical,
        hasOfferCatalog: offerCatalog
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `https://${DOMAIN}/` },
          { "@type": "ListItem", position: 2, name: "Services", item: canonical }
        ]
      }
    ]
  };
  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><div class="crumb"><a href="https://${DOMAIN}/">Home</a> / Services</div><span class="eyebrow">National Service Hub</span><h1>Pest control & inspection <em>services</em></h1><p>Browse our complete catalog of ${services.length} pest control, inspection, termite treatment, bed bug removal, rodent exclusion, ant control, cockroach treatment, and wildlife removal services.</p><div class="buttons"><a class="btn" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div></div><div class="hero-photo"><img src="${IMAGES.service}" alt="Pest service" width="800" height="620"></div></div></section><section class="section"><div class="wrap"><div class="head"><div><span class="eyeline">Complete Directory</span><h2>All ${services.length} Service Topics</h2></div></div><div class="grid">${serviceCards(DOMAIN, false)}</div></div></section></main>`;
  return shell("All Pest Control Services Directory", `Browse all ${services.length} pest control and inspection services across the United States.`, canonical, body, schema);
}

export function nationalServicePage(service: (typeof services)[number]) {
  const canonical = `https://${DOMAIN}/services/${service.slug}/`;
  const related = services.filter((item) => item.category === service.category && item.slug !== service.slug).slice(0, 6);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.name,
        serviceType: service.category,
        description: service.description,
        url: canonical,
        provider: { "@type": "Organization", name: "Batys Pest Control", url: `https://${DOMAIN}/` }
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `https://${DOMAIN}/` },
          { "@type": "ListItem", position: 2, name: "Services", item: `https://${DOMAIN}/services/` },
          { "@type": "ListItem", position: 3, name: service.name, item: canonical }
        ]
      }
    ]
  };
  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><div class="crumb"><a href="https://${DOMAIN}/">Home</a> / <a href="https://${DOMAIN}/services/">Services</a> / ${esc(service.name)}</div><span class="eyebrow">${esc(service.category)}</span><h1>${esc(service.name)} <em>Guide & Service Directory</em></h1><p>${esc(service.description)} Review warning signs, inspection considerations, and independent provider options.</p><div class="buttons"><a class="btn" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a><a class="btn ghost" href="https://${DOMAIN}/areas-we-serve/">Find Local Provider</a></div></div><div class="hero-photo"><img src="${IMAGES.service}" alt="${esc(service.name)}" width="800" height="620"></div></div></section><section class="section content"><div class="wrap article"><span class="eyeline">Service Overview</span><h2>About ${esc(service.name)}</h2><p>${esc(service.description)} Start with a thorough diagnosis before authorizing treatment.</p><h2>Related Services</h2><div class="grid" style="margin-top:20px">${related.map((item) => `<a class="card" href="https://${DOMAIN}/services/${item.slug}/"><h3>${esc(item.name)}</h3><p>${esc(item.description)}</p><span class="more">Learn more →</span></a>`).join("")}</div></div></section></main>`;
  return shell(`${service.name} - Batys Pest Control`, service.description, canonical, body, schema);
}

export function areasWeServePage(states: StateRow[]) {
  const canonical = `https://${DOMAIN}/areas-we-serve/`;
  const stateLinks = states.map((s) => `<a href="https://${s.slug}.${DOMAIN}/"><span>${esc(s.name)} (${s.cities.length} cities)</span></a>`).join("");
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Areas We Serve - State & City Pest Control Directories",
        url: canonical
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `https://${DOMAIN}/` },
          { "@type": "ListItem", position: 2, name: "Areas We Serve", item: canonical }
        ]
      }
    ]
  };
  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><div class="crumb"><a href="https://${DOMAIN}/">Home</a> / Areas We Serve</div><span class="eyebrow">Location Directory</span><h1>Pest control services by <em>State & City</em></h1><p>Select your state below to explore city subdomains and local independent pest control service providers.</p><div class="buttons"><a class="btn" href="#states">Browse States</a></div></div><div class="hero-photo"><img src="${IMAGES.state}" alt="Areas we serve" width="800" height="620"></div></div></section><section class="section soft" id="states"><div class="wrap"><div class="directory">${stateLinks}</div></div></section></main>`;
  return shell("Areas We Serve - State & City Pest Control Directory", "Browse pest control service locations across all 50 US states and thousands of local cities.", canonical, body, schema);
}

export function infoPage(title: string, content: string, path: string) {
  const canonical = `https://${DOMAIN}${path}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: title,
        url: canonical
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `https://${DOMAIN}/` },
          { "@type": "ListItem", position: 2, name: title, item: canonical }
        ]
      }
    ]
  };
  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><div class="crumb"><a href="https://${DOMAIN}/">Home</a> / ${esc(title)}</div><span class="eyebrow">Information</span><h1>${esc(title)}</h1></div><div class="hero-photo"><img src="${IMAGES.hero}" alt="${esc(title)}" width="800" height="620"></div></div></section><section class="section content"><div class="wrap article">${content}</div></section></main>`;
  return shell(`${title} | Batys Pest Control`, `${title} page on Batys Pest Control.`, canonical, body, schema);
}

export function statePage(state: StateRow, host: string) {
  const cityLinks = state.cities.map(([slug, name]) => `<a href="https://${slug}-${state.slug}.${DOMAIN}/"><span>${esc(name)}</span></a>`).join("");
  const canonical = `https://${host}/`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: `Pest Control Services in ${state.name}`,
        url: canonical,
        about: { "@type": "State", name: state.name },
        isPartOf: { "@type": "WebSite", name: "Batys Pest Control", url: `https://${DOMAIN}/` }
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Areas We Serve", item: `https://${DOMAIN}/areas-we-serve/` },
          { "@type": "ListItem", position: 2, name: state.name, item: canonical }
        ]
      }
    ]
  };
  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><div class="crumb"><a href="https://${DOMAIN}/">Home</a> / <a href="https://${DOMAIN}/areas-we-serve/">Areas We Serve</a> / ${esc(state.name)}</div><span class="eyebrow">${state.code.toUpperCase()} pest control directory</span><h1>Pest control services across <em>${esc(state.name)}</em></h1><p>Choose a city or community, review the complete ${services.length}-service directory and prepare for a consultation with an independent pest provider.</p><div class="buttons"><a class="btn" href="#cities">Browse ${state.cities.length.toLocaleString()} Cities</a><a class="btn ghost" href="#services">View All Services</a></div><div class="badges"><span class="badge">Independent providers</span><span class="badge">City-specific routes</span><span class="badge">Inspection-first guidance</span></div></div><div class="hero-photo"><img src="${IMAGES.state}" alt="Service area properties" width="800" height="620"></div></div></section><section class="stats"><div class="wrap"><div class="stat"><strong>${services.length}</strong><span>Pest topics</span></div><div class="stat"><strong>${state.cities.length.toLocaleString()}</strong><span>Cities & communities</span></div><div class="stat"><strong>${state.code.toUpperCase()}</strong><span>State directory</span></div><div class="stat"><strong>Direct</strong><span>Provider verification</span></div></div></section><section class="section soft" id="cities"><div class="wrap"><div class="head"><div><span class="eyeline">Areas we serve</span><h2>Pest control locations in ${esc(state.name)}</h2><p class="muted">Select a city to open its local service hub.</p></div></div><div class="directory">${cityLinks}</div></div></section><section class="section" id="services"><div class="wrap"><div class="head"><div><span class="eyeline">Complete service directory</span><h2>All ${services.length} pest services</h2><p class="muted">Review termites, bed bugs, rodents, ants, cockroaches, mosquitoes, wildlife, and commercial pest services.</p></div><a class="btn dark" href="https://${DOMAIN}/services/">National Service Hub</a></div><div class="grid">${serviceCards(host, false)}</div></div></section></main>`;
  return shell(`Pest Control Services in ${state.name}`, `Browse ${services.length} pest control services and ${state.cities.length} city routes in ${state.name}.`, canonical, body, schema);
}

export function cityPage(state: StateRow, city: [string, string], host: string) {
  const [, cityName] = city;
  const canonical = `https://${host}/`;

  const offerCatalog = {
    "@type": "OfferCatalog",
    name: `Pest Control Services in ${cityName}, ${state.name}`,
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: `${s.name} in ${cityName}`,
        description: s.description,
        url: `https://${host}/${s.slug}/`
      }
    }))
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "PestControl",
        "@id": `${canonical}#business`,
        name: `Batys Pest Control ${cityName}`,
        url: canonical,
        telephone: PHONE_DISPLAY,
        address: {
          "@type": "PostalAddress",
          addressLocality: cityName,
          addressRegion: state.code.toUpperCase(),
          addressCountry: "US"
        },
        priceRange: "$$",
        hasOfferCatalog: offerCatalog
      },
      {
        "@type": "CollectionPage",
        name: `Pest Control in ${cityName}, ${state.name}`,
        url: canonical,
        about: { "@type": "City", name: cityName, containedInPlace: { "@type": "State", name: state.name } },
        isPartOf: { "@type": "WebSite", name: "Batys Pest Control", url: `https://${DOMAIN}/` }
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: state.name, item: `https://${state.slug}.${DOMAIN}/` },
          { "@type": "ListItem", position: 2, name: cityName, item: canonical }
        ]
      }
    ]
  };

  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><div class="crumb"><a href="https://${DOMAIN}/areas-we-serve/">Areas We Serve</a> / <a href="https://${state.slug}.${DOMAIN}/">${esc(state.name)}</a> / ${esc(cityName)}</div><span class="eyebrow">Local pest control guide</span><h1>Pest control in <em>${esc(cityName)}, ${esc(state.name)}</em></h1><p>Explore the complete ${services.length}-service directory for ${esc(cityName)}. Review warning signs, treatment methods, and connect with independent pest professionals.</p><div class="buttons"><a class="btn" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a><a class="btn ghost" href="#services">Browse All Services</a></div><div class="badges"><span class="badge">Location-specific guide</span><span class="badge">Inspection-first advice</span><span class="badge">Written-scope checklist</span></div></div><div class="hero-photo"><img src="${IMAGES.city}" alt="Pest control inspection" width="800" height="620"></div></div></section><section class="stats"><div class="wrap"><div class="stat"><strong>${services.length}</strong><span>Pest topics</span></div><div class="stat"><strong>${state.code.toUpperCase()}</strong><span>${esc(state.name)}</span></div><div class="stat"><strong>City</strong><span>${esc(cityName)}</span></div><div class="stat"><strong>Verify</strong><span>Scope & price</span></div></div></section><section class="section soft" id="services"><div class="wrap"><div class="head"><div><span class="eyeline">Pest services</span><h2>Services to review in ${esc(cityName)}</h2><p class="muted">Select a pest or service topic for detailed inspection guidance and treatment options.</p></div></div><div class="grid">${serviceCards(host, true)}</div></div></section><section class="section"><div class="wrap content"><article class="article"><span class="eyeline">Before requesting service</span><h2>Start with an accurate pest inspection</h2><p>A professional recommendation should connect proposed treatments directly to visible evidence. Inspection should identify harborage areas, access points, moisture, and contributing environmental factors.</p><h2>Common warning signs</h2><ul><li>Visible pest activity, droppings, frass, mud tubes, shed skins, or nesting material.</li><li>Unusual structural noise, wall tapping, chewing, or clicking sounds in voids.</li><li>Musty odors, grease marks along baseboards, or damaged food packaging.</li><li>Stings, bites, or property damage to wood, wiring, insulation, or fabrics.</li></ul></article><aside class="side"><span class="eyebrow">${esc(cityName)} coverage</span><h2>Check availability</h2><p>Confirm ZIP-code coverage, scheduling, licensing, and pricing directly with local providers.</p><a class="btn" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a><a class="more" href="https://${state.slug}.${DOMAIN}/">Browse ${esc(state.name)} cities →</a></aside></div></section></main>`;
  return shell(`Pest Control in ${cityName}, ${state.name}`, `Browse ${services.length} pest control and inspection topics for ${cityName}, ${state.name}.`, canonical, body, schema);
}

export function localServicePage(state: StateRow, city: [string, string], service: (typeof services)[number], host: string) {
  const [, cityName] = city;
  const canonical = `https://${host}/${service.slug}/`;
  const offerCatalog = {
    "@type": "OfferCatalog",
    name: `Pest Control Services in ${cityName}, ${state.name}`,
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: `${s.name} in ${cityName}`,
        description: s.description,
        url: `https://${host}/${s.slug}/`
      }
    }))
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "PestControl",
        "@id": `https://${host}/#business`,
        name: `Batys Pest Control ${cityName}`,
        url: `https://${host}/`,
        telephone: PHONE_DISPLAY,
        address: {
          "@type": "PostalAddress",
          addressLocality: cityName,
          addressRegion: state.code.toUpperCase(),
          addressCountry: "US"
        },
        priceRange: "$$",
        hasOfferCatalog: offerCatalog
      },
      {
        "@type": "Service",
        name: `${service.name} in ${cityName}, ${state.name}`,
        serviceType: service.category,
        description: service.description,
        url: canonical,
        areaServed: { "@type": "City", name: cityName, containedInPlace: { "@type": "State", name: state.name } },
        provider: { "@type": "Organization", name: "Batys Pest Control", url: `https://${DOMAIN}/` }
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: state.name, item: `https://${state.slug}.${DOMAIN}/` },
          { "@type": "ListItem", position: 2, name: cityName, item: `https://${host}/` },
          { "@type": "ListItem", position: 3, name: service.name, item: canonical }
        ]
      }
    ]
  };

  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><div class="crumb"><a href="https://${state.slug}.${DOMAIN}/">${esc(state.name)}</a> / <a href="https://${host}/">${esc(cityName)}</a> / ${esc(service.name)}</div><span class="eyebrow">${esc(service.category)}</span><h1>${esc(service.name)} in <em>${esc(cityName)}, ${esc(state.name)}</em></h1><p>${esc(service.description)} Review warning signs, inspection considerations, and treatment options.</p><div class="buttons"><a class="btn" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a><a class="btn ghost" href="https://${host}/">All ${services.length} City Services</a></div></div><div class="hero-photo"><img src="${IMAGES.service}" alt="Pest control treatment" width="800" height="620"></div></div></section><section class="section soft"><div class="wrap"><div class="head"><div><span class="eyeline">What to expect</span><h2>An inspection-first process</h2></div></div><div class="process"><div class="step"><b>01</b><h3>Describe symptoms</h3><p>Share pest signs, locations, property type, and urgency.</p></div><div class="step"><b>02</b><h3>Inspect system</h3><p>Identify species, entry points, harborage, and damage.</p></div><div class="step"><b>03</b><h3>Review options</h3><p>Compare treatment methods, safety, and prep requirements.</p></div><div class="step"><b>04</b><h3>Approve scope</h3><p>Confirm price, visits, and warranty before work starts.</p></div></div></div></section></main>`;
  return shell(`${service.name} in ${cityName}, ${state.name}`, `${service.description} Review local pest service info for ${cityName}, ${state.name}.`, canonical, body, schema);
}

export function notFoundPage(message: string) {
  return `<!doctype html><html><head><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width,initial-scale=1"><title>404 | Batys Pest Control</title><style>${CSS}</style></head><body>${header()}<main class="section"><div class="wrap"><span class="eyeline">Page not found</span><h1>404</h1><p>${esc(message)}</p><a class="btn dark" href="https://${DOMAIN}/areas-we-serve/">Browse Service Areas</a></div></main>${footer()}</body></html>`;
}
