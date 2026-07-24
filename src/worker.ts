import services from '../data/services.json';
import database from '../data/usa_database.json';
import { coreSitemap, sitemapIndex, stateSitemap } from './sitemaps';

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
const PRIMARY_SLUGS = ['emergency-pest-control','termite-control','bed-bug-treatment','rodent-control','cockroach-control','mosquito-control','ant-control','spider-control','wasp-nest-removal','wildlife-removal','residential-pest-control','commercial-pest-control'];

const CSS = `
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:Inter,Arial,sans-serif;color:#0f172a;background:#fff;-webkit-font-smoothing:antialiased}a{color:inherit;text-decoration:none}.wrap{max-width:1180px;margin:auto;padding:0 22px}.top{background:#0a1c2d;color:#fff;font-size:12px}.top .wrap,.nav .wrap{display:flex;justify-content:space-between;align-items:center;gap:20px}.top .wrap{padding-top:8px;padding-bottom:8px}.top b{color:#fbbf24}.nav{background:#fff;border-bottom:1px solid #e2e8f0;box-shadow:0 7px 28px rgba(15,23,42,.07)}.nav .wrap{padding-top:14px;padding-bottom:14px}.brand{display:flex;align-items:center;gap:11px;font-size:20px;font-weight:900;color:#0a1c2d}.brand small{display:block;color:#64748b;font-size:8px;letter-spacing:.13em;text-transform:uppercase}.logo{display:grid;place-items:center;width:42px;height:42px;border-radius:12px;background:#16b7df;color:#fff;font-weight:900}.links{display:flex;gap:24px;font-size:14px;font-weight:800;color:#334155}.links a:hover{color:#0ea5e9}.call{background:#f47b20;color:#fff;padding:12px 18px;border-radius:10px;font-size:13px;font-weight:900}.hero{position:relative;isolation:isolate;min-height:520px;color:#fff;display:flex;align-items:center;background:#0a1c2d url('/images/pest-control-hero.webp') center/cover no-repeat}.hero:before{content:'';position:absolute;inset:0;z-index:-1;background:linear-gradient(90deg,#071522 0%,rgba(10,28,45,.96) 48%,rgba(10,28,45,.42) 100%)}.hero-inner{max-width:780px;padding:74px 0}.crumb{font-size:13px;color:#cbd5e1}.crumb a{color:#7dd3fc}.pill{display:inline-block;margin-top:25px;padding:8px 13px;border-radius:999px;background:rgba(16,185,129,.15);color:#a7f3d0;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.08em}.hero h1{margin:15px 0 0;font-size:54px;line-height:1.04;letter-spacing:-.03em}.hero h1 em{font-style:normal;color:#16b7df}.hero p{max-width:720px;color:#dbe4ee;font-size:18px;line-height:1.72}.buttons{display:flex;flex-wrap:wrap;gap:13px;margin-top:24px}.btn{display:inline-block;padding:14px 20px;border-radius:10px;font-weight:900}.btn.orange{background:#f47b20;color:#fff}.btn.ghost{border:1px solid rgba(255,255,255,.28);background:rgba(255,255,255,.08);color:#fff}.trust{display:flex;flex-wrap:wrap;gap:20px;margin-top:25px;color:#e2e8f0;font-size:13px;font-weight:800}.trust span:before{content:'✓';margin-right:7px;color:#7dd3fc}.stats{border-bottom:1px solid #e2e8f0}.stats .wrap{display:grid;grid-template-columns:repeat(4,1fr)}.stat{text-align:center;padding:25px 12px;border-left:1px solid #e2e8f0}.stat:first-child{border-left:0}.stat strong{display:block;color:#0a1c2d;font-size:29px}.stat span{display:block;margin-top:4px;color:#64748b;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.06em}.section{padding:72px 0}.soft{background:#f4f7f9}.eyebrow{color:#0284c7;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.14em}.section h2{margin:9px 0 12px;color:#0a1c2d;font-size:38px;line-height:1.12;letter-spacing:-.02em}.section h3{color:#0a1c2d}.muted{color:#64748b;line-height:1.75}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:34px}.card{display:block;background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:24px;box-shadow:0 4px 15px rgba(15,23,42,.035);transition:.2s}.card:hover{transform:translateY(-3px);box-shadow:0 18px 38px rgba(15,23,42,.09);border-color:#7dd3fc}.icon{display:grid;place-items:center;width:42px;height:42px;border-radius:11px;background:#e0f2fe;color:#0284c7;font-weight:900}.card h3{margin:18px 0 0;font-size:19px}.card p{color:#64748b;font-size:14px;line-height:1.65}.more{color:#0284c7;font-size:14px;font-weight:900}.all-services{margin-top:30px;display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.service-link{background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:12px 14px;color:#334155;font-size:13px;font-weight:800}.service-link:hover{color:#0284c7;border-color:#7dd3fc}.split{display:grid;grid-template-columns:1.05fr .95fr;gap:42px;align-items:start}.photo{min-height:430px;border-radius:24px;background:url('/images/pest-control-hero.webp') center/cover no-repeat}.checks{display:grid;grid-template-columns:1fr 1fr;gap:13px;margin-top:25px}.checkitem{background:#f4f7f9;border-radius:12px;padding:15px;font-size:14px;font-weight:800;color:#334155}.checkitem:before{content:'✓';color:#0284c7;margin-right:8px}.dark{background:#0a1c2d;color:#fff}.dark h2,.dark h3{color:#fff}.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:26px;margin-top:34px}.step strong{display:block;color:rgba(255,255,255,.15);font-size:47px}.step h3{margin:5px 0}.step p{color:#cbd5e1;font-size:14px;line-height:1.65}.content{display:grid;grid-template-columns:minmax(0,1fr) 310px;gap:44px}.article h2{font-size:28px;margin-top:36px}.article p,.article li{color:#64748b;line-height:1.8}.warning-grid{display:grid;grid-template-columns:1fr 1fr;gap:11px}.warning{background:#f4f7f9;border-radius:11px;padding:15px;font-size:14px;font-weight:800;color:#334155}.warning:before{content:'△';color:#f47b20;margin-right:8px}.sidebar{display:grid;gap:16px;align-self:start;position:sticky;top:20px}.sidebox{border-radius:16px;background:#0a1c2d;color:#fff;padding:23px}.sidebox.light{background:#f4f7f9;color:#0f172a}.sidebox.green{background:#ecfdf5;color:#065f46}.sidebox h3{margin-top:0;color:inherit}.sidebox p{font-size:14px;line-height:1.65;color:inherit}.sidebox .btn{display:block;text-align:center;margin-top:12px}.faq{max-width:830px;margin:32px auto 0}.faq details{background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:16px 18px;margin:9px 0}.faq summary{cursor:pointer;font-weight:900;color:#0a1c2d}.faq p{color:#64748b;line-height:1.65}.final{background:#16b7df;color:#fff;padding:38px 0}.final .wrap{display:flex;justify-content:space-between;align-items:center;gap:20px}.final h2{margin:0;color:#fff;font-size:29px}.final p{margin:6px 0 0}.footer{background:#0a1c2d;color:#cbd5e1;padding:54px 0 23px}.footgrid{display:grid;grid-template-columns:1.2fr .8fr .9fr 1.1fr;gap:35px}.footer h3{color:#fff}.footer p,.footer a{color:#94a3b8;font-size:14px;line-height:1.75}.footer .stack{display:grid;gap:8px}.legal{border-top:1px solid #1e293b;margin-top:36px;padding-top:20px;color:#64748b;font-size:12px}.popup-trigger{position:fixed;right:20px;bottom:20px;z-index:90;border:0;border-radius:999px;background:#f47b20;color:#fff;padding:14px 18px;font-weight:900;box-shadow:0 14px 35px rgba(15,23,42,.25);cursor:pointer}.modal{display:none;position:fixed;inset:0;z-index:100;background:rgba(2,6,23,.72);padding:20px;align-items:center;justify-content:center}.modal.open{display:flex}.modal-card{position:relative;width:min(760px,100%);border-radius:20px;overflow:hidden;background:#fff;display:grid;grid-template-columns:1fr 1fr;box-shadow:0 30px 90px rgba(0,0,0,.35)}.modal-copy{background:#0a1c2d;color:#fff;padding:34px}.modal-copy h2{font-size:30px;margin-top:0}.modal-copy p{color:#cbd5e1;line-height:1.7}.modal-form{padding:34px}.modal-form label{display:block;margin-top:12px;color:#334155;font-size:12px;font-weight:900}.modal-form input,.modal-form select{width:100%;margin-top:5px;border:1px solid #cbd5e1;border-radius:9px;padding:12px}.modal-form button{width:100%;margin-top:17px;border:0}.close{position:absolute;right:13px;top:10px;border:0;background:transparent;font-size:24px;cursor:pointer;color:#64748b}@media(max-width:900px){.links{display:none}.grid{grid-template-columns:1fr 1fr}.all-services{grid-template-columns:1fr 1fr}.split,.content{grid-template-columns:1fr}.steps{grid-template-columns:1fr 1fr}.footgrid{grid-template-columns:1fr 1fr}.hero h1{font-size:43px}.sidebar{position:static}.modal-card{grid-template-columns:1fr}}@media(max-width:580px){.top .wrap{justify-content:center}.top span:last-child{display:none}.brand small{display:none}.call{font-size:11px;padding:10px}.hero{min-height:490px}.hero-inner{padding:60px 0}.hero h1{font-size:37px}.stats .wrap{grid-template-columns:1fr 1fr}.stat:nth-child(3){border-left:0;border-top:1px solid #e2e8f0}.stat:nth-child(4){border-top:1px solid #e2e8f0}.grid,.all-services,.checks,.warning-grid,.steps,.footgrid{grid-template-columns:1fr}.section{padding:58px 0}.section h2{font-size:31px}.final .wrap{display:block}.final .btn{margin-top:18px}.popup-trigger{right:12px;bottom:12px}.modal{padding:10px}.modal-copy,.modal-form{padding:25px}}
`;

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char] ?? char);
}

function titleCase(slug: string) {
  return slug.split('-').filter(Boolean).map((word) => word.length <= 2 ? word.toUpperCase() : word[0].toUpperCase() + word.slice(1)).join(' ');
}

function header() {
  return `<header><div class="top"><div class="wrap"><span>● &nbsp; Nationwide location directory</span><span><b>Independent provider network</b> &nbsp; | &nbsp; Call ${PHONE_DISPLAY}</span></div></div><div class="nav"><div class="wrap"><a class="brand" href="https://${DOMAIN}/"><span class="logo">B</span><span>Batys Pest Control<small>Services · Locations · Pest Guides</small></span></a><nav class="links"><a href="https://${DOMAIN}/">Home</a><a href="https://${DOMAIN}/services">Services</a><a href="https://${DOMAIN}/locations">Service Areas</a><a href="https://${DOMAIN}/about">About</a><a href="https://${DOMAIN}/articles">Articles</a></nav><a class="call" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div></div></header>`;
}

function footer() {
  const popular = PRIMARY_SLUGS.slice(0, 5).map((slug) => services.find((service) => service.slug === slug)).filter(Boolean).map((service) => `<a href="https://${DOMAIN}/services/${service!.slug}">${escapeHtml(service!.name)}</a>`).join('');
  return `<section class="final"><div class="wrap"><div><h2>Need pest-control information for your area?</h2><p>Call to check independent-provider availability.</p></div><a class="btn" style="background:#0a1c2d;color:#fff" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div></section><footer class="footer"><div class="wrap"><div class="footgrid"><div><a class="brand" style="color:#fff" href="https://${DOMAIN}/"><span class="logo">B</span><span>Batys Pest Control</span></a><p>Pest-control information and independent-provider referral routes organized by service, state, and city.</p></div><div><h3>Services</h3><div class="stack">${popular}<a href="https://${DOMAIN}/services">All Services →</a></div></div><div><h3>Service Areas</h3><div class="stack"><a href="https://${DOMAIN}/locations">All States</a><a href="https://${DOMAIN}/articles">Pest Guides</a><a href="https://${DOMAIN}/contact">Contact</a></div></div><div><h3>Legal & Disclosure</h3><div class="stack"><a href="https://${DOMAIN}/privacy-policy">Privacy Policy</a><a href="https://${DOMAIN}/terms">Terms</a><a href="https://${DOMAIN}/disclaimer">Disclaimer</a><a href="https://${DOMAIN}/provider-disclosure">Provider Disclosure</a></div></div></div><div class="legal">© ${new Date().getUTCFullYear()} Batys Pest Control. Providers are independent businesses. Verify licensing, insurance, diagnosis, methods, pricing, coverage, and service terms before hiring.</div></div></footer>`;
}

function popup() {
  return `<button class="popup-trigger" data-open-lead>Get Pest Help</button><div class="modal" id="lead-modal" role="dialog" aria-modal="true" aria-label="Request pest-control information"><div class="modal-card"><button class="close" type="button" data-close-lead aria-label="Close">×</button><div class="modal-copy"><h2>Need local pest-control help?</h2><p>Call directly or enter the basic details below. The form transfers the details to the main contact page; provider coverage and response time still require confirmation.</p><a class="btn orange" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div><form class="modal-form" method="get" action="https://${DOMAIN}/contact"><label>Full name<input name="name" autocomplete="name" required></label><label>Phone number<input name="phone" type="tel" autocomplete="tel" required></label><label>City or ZIP code<input name="location" autocomplete="postal-code" required></label><label>Pest or service<select name="service"><option value="">Select one</option>${PRIMARY_SLUGS.map((slug) => services.find((service) => service.slug === slug)).filter(Boolean).map((service) => `<option value="${escapeHtml(service!.slug)}">${escapeHtml(service!.name)}</option>`).join('')}</select></label><button class="btn orange" type="submit">Continue Request</button></form></div></div><script>(()=>{const modal=document.getElementById('lead-modal');const open=()=>{modal?.classList.add('open');sessionStorage.setItem('batysPopupSeen','1')};const close=()=>modal?.classList.remove('open');document.querySelectorAll('[data-open-lead]').forEach(el=>el.addEventListener('click',open));document.querySelectorAll('[data-close-lead]').forEach(el=>el.addEventListener('click',close));modal?.addEventListener('click',e=>{if(e.target===modal)close()});if(!sessionStorage.getItem('batysPopupSeen'))setTimeout(open,9000)})();</script>`;
}

function shell(title: string, description: string, canonical: string, content: string, schema: unknown) {
  const safeSchema = JSON.stringify(schema).replaceAll('<', '\\u003c');
  return `<!doctype html><html lang="en-US"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)} | Batys Pest Control</title><meta name="description" content="${escapeHtml(description)}"><meta name="robots" content="index, follow"><link rel="canonical" href="${canonical}"><meta property="og:title" content="${escapeHtml(title)} | Batys Pest Control"><meta property="og:description" content="${escapeHtml(description)}"><meta property="og:url" content="${canonical}"><meta property="og:type" content="website"><script type="application/ld+json">${safeSchema}</script><style>${CSS}</style></head><body>${header()}<main>${content}</main>${footer()}${popup()}</body></html>`;
}

function cityPage(city: string, state: string, host: string) {
  const cityName = titleCase(city);
  const stateName = STATE_NAMES[state];
  const canonical = `https://${host}/`;
  const primary = PRIMARY_SLUGS.map((slug) => services.find((service) => service.slug === slug)).filter((service): service is Service => Boolean(service));
  const cards = primary.map((service, index) => `<a class="card" href="/${service.slug}"><span class="icon">0${index + 1}</span><h3>${escapeHtml(service.name)}</h3><p>${escapeHtml(service.description)}</p><span class="more">View local service →</span></a>`).join('');
  const allLinks = services.map((service) => `<a class="service-link" href="/${service.slug}">${escapeHtml(service.name)}</a>`).join('');
  const faqs = [
    [`What pests are commonly researched in ${cityName}?`, 'Common searches include termites, bed bugs, ants, cockroaches, rodents, mosquitoes, spiders, fleas, ticks, stinging insects, wildlife, and seasonal invaders. An inspection should confirm the pest and source.'],
    [`How quickly can pest control respond in ${cityName}?`, 'Response time depends on provider coverage, season, pest type, urgency, route capacity, and travel distance. Call to confirm current availability.'],
    ['What should I ask before treatment?', 'Ask for identification, inspection findings, treatment areas, products or methods, preparation, re-entry, visits, follow-up, exclusions, warranty terms, and total price in writing.'],
    [`Are providers in ${cityName} licensed and insured?`, `Requirements vary by service type. Verify the specific company’s current credentials and insurance required in ${stateName}.`],
    ['Is one treatment always enough?', 'No. Eggs, colonies, hidden harborages, entry points, neighboring activity, moisture, sanitation, weather, and seasonal pressure may require monitoring or repeat service.'],
  ];
  const faqHtml = faqs.map(([q, a]) => `<details><summary>${escapeHtml(q)} <span style="float:right;color:#0284c7">+</span></summary><p>${escapeHtml(a)}</p></details>`).join('');
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'CollectionPage', '@id': `${canonical}#webpage`, url: canonical, name: `Pest Control in ${cityName}, ${stateName}`, description: `Local pest-control service directory for ${cityName}, ${stateName}.`, about: { '@type': 'City', name: cityName, containedInPlace: { '@type': 'State', name: stateName } } },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `https://${DOMAIN}` }, { '@type': 'ListItem', position: 2, name: stateName, item: `https://${state}.${DOMAIN}/` }, { '@type': 'ListItem', position: 3, name: cityName, item: canonical }] },
      { '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    ],
  };
  const content = `<section class="hero"><div class="wrap"><div class="hero-inner"><div class="crumb"><a href="https://${state}.${DOMAIN}/">${escapeHtml(stateName)}</a> &nbsp;/&nbsp; ${escapeHtml(cityName)}</div><span class="pill">Local pest-control directory</span><h1>Pest Control in <em>${escapeHtml(cityName)}, ${escapeHtml(stateName)}</em></h1><p>Compare pest-control services, understand inspection and treatment options, and check independent-provider availability for homes and businesses in ${escapeHtml(cityName)}.</p><div class="buttons"><a class="btn orange" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a><a class="btn ghost" href="#services">View Local Services</a></div><div class="trust"><span>Residential &amp; commercial</span><span>Inspection-first guidance</span><span>Independent providers</span></div></div></div></section><section class="stats"><div class="wrap"><div class="stat"><strong>${services.length}</strong><span>Service topics</span></div><div class="stat"><strong>${primary.length}</strong><span>Priority services</span></div><div class="stat"><strong>${escapeHtml(stateName)}</strong><span>State context</span></div><div class="stat"><strong>Direct</strong><span>Phone check</span></div></div></section><section class="section soft" id="services"><div class="wrap"><div class="eyebrow">Pest services</div><h2>Pest-control services in ${escapeHtml(cityName)}</h2><p class="muted">Choose a service to review warning signs, inspection priorities, treatment considerations, preparation, prevention, and provider questions.</p><div class="grid">${cards}</div><div class="all-services">${allLinks}</div></div></section><section class="section"><div class="wrap split"><div class="photo" role="img" aria-label="Pest inspection and treatment planning"></div><div><div class="eyebrow">Local service planning</div><h2>What a professional service should cover</h2><p class="muted">A sound service begins with identification and inspection rather than a generic treatment. The provider should document evidence, affected areas, likely source, access limitations, moisture, sanitation, entry points, harborage, damage, and sensitive occupants.</p><p class="muted">Request a written scope identifying treatment areas, products or methods, preparation, safety instructions, re-entry, visits, monitoring, exclusions, price, and warranty limits. Verify licensing and insurance required in ${escapeHtml(stateName)}.</p><div class="checks">${['Accurate pest identification','Interior and exterior inspection','Targeted treatment or removal','Monitoring and follow-up','Moisture and sanitation corrections','Exclusion and repair recommendations'].map((item) => `<div class="checkitem">${item}</div>`).join('')}</div></div></div></section><section class="section dark"><div class="wrap"><div class="eyebrow" style="color:#7dd3fc">How it works</div><h2>A simple local service process</h2><div class="steps">${[['01','Describe the problem','Share the location, signs, affected areas, property type, and urgency.'],['02','Inspect and identify','The provider confirms evidence, extent, access, source, and contributing conditions.'],['03','Review the scope','Compare written methods, preparation, safety, price, visits, and exclusions.'],['04','Treat and monitor','Complete the agreed work and document results, repairs, prevention, and follow-up.']].map(([n, h, p]) => `<div class="step"><strong>${n}</strong><h3>${h}</h3><p>${p}</p></div>`).join('')}</div></div></section><section class="section soft"><div class="wrap"><div class="eyebrow">Frequently asked questions</div><h2>Pest control in ${escapeHtml(cityName)}</h2><div class="faq">${faqHtml}</div></div></section>`;
  return shell(`Pest Control in ${cityName}, ${stateName}`, `Browse pest-control services, warning signs, treatment information, and independent-provider options for ${cityName}, ${stateName}.`, canonical, content, schema);
}

function localServicePage(city: string, state: string, service: Service, host: string) {
  const cityName = titleCase(city);
  const stateName = STATE_NAMES[state];
  const canonical = `https://${host}/${service.slug}`;
  const related = services.filter((item) => item.category === service.category && item.slug !== service.slug).slice(0, 5);
  const warnings = ['Repeated sightings, trails, droppings, shed skins, eggs, nests, or webbing','Bites, stings, scratching sounds, odors, stains, or contamination','Damage to wood, wiring, insulation, food, fabrics, packaging, or landscaping','Activity around moisture, drains, attics, garages, crawl spaces, or storage','Visible gaps, damaged screens, utility penetrations, burrows, or roof openings','Activity returning after cleaning, sealing, trapping, baiting, or spraying'];
  const faqs = [
    [`What can ${service.name.toLowerCase()} include?`, 'The scope may include identification, evidence mapping, targeted treatment or removal, monitoring, exclusion, sanitation or moisture corrections, written preparation, and follow-up.'],
    ['When should I request an inspection?', 'Request an inspection when activity is recurring, identification is uncertain, damage or contamination is possible, or do-it-yourself measures have not resolved the source.'],
    ['What should a written quote include?', 'It should identify the target pest, treatment areas, products or methods, preparation, visits, exclusions, follow-up, warranty terms, and total price.'],
    [`Which credentials apply in ${stateName}?`, `Licensing, certification, wildlife handling, notification, recordkeeping, and product-use requirements vary. Verify the provider’s current credentials for ${stateName}.`],
    ['How long should results take?', 'Timing depends on pest biology, infestation size, method, building conditions, neighboring activity, weather, and whether sanitation, moisture, exclusion, or repair work is completed.'],
  ];
  const faqHtml = faqs.map(([q, a]) => `<details><summary>${escapeHtml(q)} <span style="float:right;color:#0284c7">+</span></summary><p>${escapeHtml(a)}</p></details>`).join('');
  const relatedHtml = related.map((item) => `<a class="more" href="/${item.slug}">→ ${escapeHtml(item.name)}</a>`).join('<br>');
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Service', '@id': `${canonical}#service`, name: `${service.name} in ${cityName}, ${stateName}`, description: service.description, url: canonical, areaServed: { '@type': 'City', name: cityName, containedInPlace: { '@type': 'State', name: stateName } }, provider: { '@type': 'Organization', name: 'Batys Pest Control', url: `https://${DOMAIN}` }, serviceType: service.category },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `https://${DOMAIN}` }, { '@type': 'ListItem', position: 2, name: stateName, item: `https://${state}.${DOMAIN}/` }, { '@type': 'ListItem', position: 3, name: cityName, item: `https://${host}/` }, { '@type': 'ListItem', position: 4, name: service.name, item: canonical }] },
      { '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    ],
  };
  const content = `<section class="hero"><div class="wrap"><div class="hero-inner"><div class="crumb"><a href="https://${state}.${DOMAIN}/">${escapeHtml(stateName)}</a> &nbsp;/&nbsp; <a href="https://${host}/">${escapeHtml(cityName)}</a> &nbsp;/&nbsp; ${escapeHtml(service.name)}</div><span class="pill">Provider availability varies by location</span><h1>${escapeHtml(service.name)} in <em>${escapeHtml(cityName)}, ${escapeHtml(stateName)}</em></h1><p>${escapeHtml(service.description)} Review the service scope below, then confirm local coverage, credentials, methods, price, preparation, and follow-up directly.</p><div class="buttons"><a class="btn orange" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a><a class="btn ghost" href="https://${DOMAIN}/contact">Request Information</a></div></div></div></section><section class="section"><div class="wrap content"><article class="article"><h2>Professional ${escapeHtml(service.name.toLowerCase())} starts with accurate identification</h2><p>A reliable service does not begin with a generic spray or a promise that one visit will solve every problem. It begins with evidence: what was seen, where it appeared, when activity occurs, how often it returns, what damage or contamination is present, and which conditions may be supporting it.</p><p>The inspection should cover the immediate activity zone and the surrounding structure. Depending on the property and pest, that may include kitchens, bathrooms, bedrooms, basements, attics, crawl spaces, garages, storage areas, utility penetrations, drains, roof edges, siding, landscaping, waste areas, loading zones, neighboring rooms, and adjoining units.</p><h2>Warning signs that justify an inspection</h2><div class="warning-grid">${warnings.map((item) => `<div class="warning">${item}</div>`).join('')}</div><h2>What the service may handle</h2><ul><li>Interior and exterior inspection.</li><li>Pest identification and evidence review.</li><li>Harborage, nesting, entry-point, and moisture assessment.</li><li>Targeted treatment, trapping, baiting, removal, or monitoring where appropriate.</li><li>Sanitation, storage, drainage, vegetation, and exclusion recommendations.</li><li>Written preparation, safety, re-entry, and follow-up instructions.</li></ul><h2>What to confirm before authorizing work</h2><p>Request a written scope connecting every proposed action to an inspection finding. Confirm the target pest, affected areas, products or devices, preparation, re-entry, cleanup, number of visits, progress measures, repair responsibilities, exclusions, total price, and warranty limits. Tell the provider about children, pregnancy, pets, aquariums, respiratory conditions, allergies, food preparation, medical equipment, employees, tenants, and other sensitive conditions.</p><h2>After service: monitoring and prevention</h2><p>Post-service expectations depend on the pest and method. Some visible activity may decline quickly, while eggs, pupae, hidden colonies, bait uptake, trap response, seasonal pressure, or animals outside the structure may require time and repeat evaluation. Long-term control can require leak repair, drainage correction, food and waste management, vegetation trimming, structural sealing, screen repair, and documented monitoring.</p></article><aside class="sidebar"><div class="sidebox"><h3>Need Service Information?</h3><p>Call and describe the location, pest evidence, affected areas, and urgency.</p><a class="btn orange" href="${PHONE_HREF}">${PHONE_DISPLAY}</a><a class="btn ghost" href="https://${DOMAIN}/contact">Request a Quote</a></div><div class="sidebox green"><h3>Before hiring</h3><p>Verify licensing and insurance required in ${escapeHtml(stateName)}. Compare written scopes rather than headline prices.</p></div><div class="sidebox light"><h3>Related Services</h3><p>${relatedHtml}<br><a class="more" href="https://${DOMAIN}/services">→ All Services</a></p></div></aside></div></section><section class="section soft"><div class="wrap"><h2 style="text-align:center">Our Simple Service Process</h2><div class="grid">${[['01','Call & Describe','Share the location, signs, affected areas, and urgency.'],['02','Inspect & Identify','The provider confirms evidence, extent, source, and contributing conditions.'],['03','Review the Scope','Approve a written plan covering methods, preparation, price, and follow-up.'],['04','Treat & Monitor','Complete the work, document results, and correct recurrence risks.']].map(([n,h,p]) => `<div class="card"><span class="icon">${n}</span><h3>${h}</h3><p>${p}</p></div>`).join('')}</div></div></section><section class="section"><div class="wrap"><h2 style="text-align:center">Serving ${escapeHtml(cityName)} and Nearby Communities</h2><p class="muted" style="text-align:center;max-width:720px;margin:0 auto">Browse the city directory for additional service routes. Coverage, response time, credentials, diagnosis, methods, pricing, and service terms must be confirmed directly.</p></div></section><section class="section soft"><div class="wrap"><h2 style="text-align:center">${escapeHtml(service.name)} FAQs</h2><div class="faq">${faqHtml}</div></div></section>`;
  return shell(`${service.name} in ${cityName}, ${stateName}`, `${service.description} Review service information and provider questions for ${cityName}, ${stateName}.`, canonical, content, schema);
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
  return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800', 'x-batys-runtime': 'lightweight-worker', 'x-robots-tag': 'index, follow' } });
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

    if (hostname === DOMAIN || hostname.endsWith('.workers.dev')) {
      if (path === '/robots.txt') {
        const body = `User-agent: *\nAllow: /\nSitemap: https://${DOMAIN}/sitemap.xml\n`;
        return new Response(request.method === 'HEAD' ? null : body, {
          headers: {
            'content-type': 'text/plain; charset=utf-8',
            'cache-control': 'public, s-maxage=86400',
            'content-length': String(new TextEncoder().encode(body).byteLength),
          },
        });
      }

      if (path === '/sitemap.xml') return cached(request, context, () => sitemapIndex(database.states, request.method));
      if (path === '/sitemaps/core.xml') return cached(request, context, () => coreSitemap(database.states, request.method));

      const sitemapMatch = path.match(/^\/sitemaps\/(.+)-(\d+)\.xml$/);
      if (sitemapMatch) {
        const stateCode = sitemapMatch[1].toLowerCase();
        const state = database.states.find((s) => s.code.toLowerCase() === stateCode);
        if (!state) return new Response('Not Found', { status: 404, headers: { 'content-type': 'text/plain; charset=utf-8' } });
        const sitemap = stateSitemap(state, Number(sitemapMatch[2]), request.method);
        if (!sitemap) return new Response('Not Found', { status: 404, headers: { 'content-type': 'text/plain; charset=utf-8' } });
        return cached(request, context, () => sitemap);
      }

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

    if (path.length > 1 && path.endsWith('/')) {
      url.pathname = path.replace(/\/+$/, '');
      return Response.redirect(url.toString(), 308);
    }

    const segments = path.split('/').filter(Boolean);
    if (segments.length > 1) return errorPage(404, 'This page could not be found.');
    const serviceSlug = segments[0];
    if (!serviceSlug) return cached(request, context, () => dynamicResponse(cityPage(location.city!, location.state, hostname)));
    const service = services.find((item) => item.slug === serviceSlug);
    if (!service) return errorPage(404, 'This pest service could not be found.');
    return cached(request, context, () => dynamicResponse(localServicePage(location.city!, location.state, service, hostname)));
  },
};
