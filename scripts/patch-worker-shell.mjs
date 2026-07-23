import { readFile, writeFile } from 'node:fs/promises';

const file = new URL('../src/worker.ts', import.meta.url);
let source = await readFile(file, 'utf8');
let changed = false;

const shellCss = [
  'const SHELL_CSS = `',
  '.site-header{position:sticky;top:0;z-index:80}.desktop-call{white-space:nowrap}.mobile-menu{display:none;position:relative}.mobile-menu summary{list-style:none;display:grid;place-items:center;width:44px;height:44px;border:1px solid #e2e8f0;border-radius:12px;background:#fff;color:#0a1c2d;font-size:21px;font-weight:900;cursor:pointer}.mobile-menu summary::-webkit-details-marker{display:none}.mobile-panel{position:absolute;right:0;top:calc(100% + 12px);width:290px;padding:12px;border:1px solid #e2e8f0;border-radius:16px;background:#fff;box-shadow:0 24px 60px rgba(15,23,42,.18)}.mobile-panel a{display:block;min-height:44px;padding:12px 14px;border-radius:10px;color:#334155;font-size:14px;font-weight:800}.mobile-panel a:hover{background:#e0f2fe;color:#0369a1}.mobile-panel .mobile-call{margin-top:7px;background:#f47b20;color:#fff;text-align:center}.footer-kicker{color:#7dd3fc;font-size:10px;font-weight:900;letter-spacing:.14em;text-transform:uppercase}.footer-note{display:flex;justify-content:space-between;gap:20px}.footer-note span:last-child{max-width:720px;text-align:right}.local-badge{display:inline-flex;align-items:center;gap:7px}.local-badge:before{content:\'\';width:7px;height:7px;border-radius:999px;background:#f47b20}.card{height:100%}.hero .btn,.final .btn,.sidebox .btn{min-height:48px}.service-link{min-height:46px}',
  '@media(max-width:900px){.site-header .links,.desktop-call{display:none}.mobile-menu{display:block}.footer-note{display:block}.footer-note span:last-child{display:block;margin-top:8px;text-align:left}}',
  '@media(max-width:580px){.site-header .nav .wrap{padding:11px 14px}.site-header .brand{font-size:16px;gap:9px}.site-header .logo{width:40px;height:40px}.mobile-panel{position:fixed;left:12px;right:12px;top:92px;width:auto;max-height:calc(100vh - 112px);overflow:auto}.hero-inner{padding:56px 0}.hero h1{font-size:36px}.hero p{font-size:16px}.buttons .btn{width:100%;text-align:center}.all-services{grid-template-columns:1fr}}',
  '`;',
].join('\n');

if (!source.includes('const SHELL_CSS = `')) {
  const marker = '\nfunction escapeHtml(value: string) {';
  if (!source.includes(marker)) throw new Error('Could not find Worker CSS insertion point.');
  source = source.replace(marker, `\n${shellCss}\n\nfunction escapeHtml(value: string) {`);
  changed = true;
}

const header = [
  'function header() {',
  "  return `<header class='site-header'><div class='top'><div class='wrap'><span class='local-badge'>Nationwide pest-control directory</span><span><b>Independent provider network</b> &nbsp; | &nbsp; <a href='${PHONE_HREF}'>Call ${PHONE_DISPLAY}</a></span></div></div><div class='nav'><div class='wrap'><a class='brand' href='https://${DOMAIN}/'><span class='logo'>B</span><span>Batys <span style='color:#16b7df'>Pest Control</span><small>Services · Locations · Pest Guides</small></span></a><nav class='links' aria-label='Main navigation'><a href='https://${DOMAIN}/'>Home</a><a href='https://${DOMAIN}/services'>Services</a><a href='https://${DOMAIN}/locations'>Locations</a><a href='https://${DOMAIN}/articles'>Pest Guides</a><a href='https://${DOMAIN}/about'>About</a></nav><a class='call desktop-call' href='${PHONE_HREF}'>Call ${PHONE_DISPLAY}</a><details class='mobile-menu'><summary aria-label='Open navigation menu'>☰</summary><nav class='mobile-panel'><a href='https://${DOMAIN}/'>Home</a><a href='https://${DOMAIN}/services'>All Services</a><a href='https://${DOMAIN}/locations'>Service Areas</a><a href='https://${DOMAIN}/articles'>Pest Guides</a><a href='https://${DOMAIN}/about'>About</a><a href='https://${DOMAIN}/contact'>Contact</a><a class='mobile-call' href='${PHONE_HREF}'>Call ${PHONE_DISPLAY}</a></nav></details></div></div></header>`;",
  '}',
].join('\n');

if (!source.includes("<header class='site-header'>")) {
  const pattern = /function header\(\) \{[\s\S]*?\n\}/;
  if (!pattern.test(source)) throw new Error('Could not find Worker header function.');
  source = source.replace(pattern, header);
  changed = true;
}

const footer = [
  'function footer() {',
  "  const popular = PRIMARY_SLUGS.slice(0, 6).map((slug) => services.find((service) => service.slug === slug)).filter(Boolean).map((service) => `<a href='https://${DOMAIN}/services/${service!.slug}'>${escapeHtml(service!.name)}</a>`).join('');",
  "  return `<section class='final'><div class='wrap'><div><h2>Need pest-control information for your area?</h2><p>Describe the problem and check independent-provider availability.</p></div><a class='btn' style='background:#0a1c2d;color:#fff;text-align:center' href='${PHONE_HREF}'>Call ${PHONE_DISPLAY}</a></div></section><footer class='footer'><div class='wrap'><div class='footgrid'><div><a class='brand' style='color:#fff' href='https://${DOMAIN}/'><span class='logo'>B</span><span>Batys Pest Control</span></a><p>Pest-control information and independent-provider referral routes organized by service, state, and city.</p></div><div><div class='footer-kicker'>Explore</div><h3>Navigation</h3><div class='stack'><a href='https://${DOMAIN}/about'>About Batys</a><a href='https://${DOMAIN}/services'>All Services</a><a href='https://${DOMAIN}/locations'>States & Cities</a><a href='https://${DOMAIN}/articles'>Pest Guides</a><a href='https://${DOMAIN}/contact'>Contact</a></div></div><div><div class='footer-kicker'>Popular</div><h3>Services</h3><div class='stack'>${popular}</div></div><div><div class='footer-kicker'>Compliance</div><h3>Legal & Disclosure</h3><div class='stack'><a href='https://${DOMAIN}/privacy-policy'>Privacy Policy</a><a href='https://${DOMAIN}/terms'>Terms & Conditions</a><a href='https://${DOMAIN}/disclaimer'>Disclaimer</a><a href='https://${DOMAIN}/cookie-policy'>Cookie Policy</a><a href='https://${DOMAIN}/editorial-policy'>Editorial Policy</a><a href='https://${DOMAIN}/provider-disclosure'>Provider Disclosure</a><a href='https://${DOMAIN}/accessibility'>Accessibility</a></div></div></div><div class='legal footer-note'><span>© ${new Date().getUTCFullYear()} Batys Pest Control.</span><span>Providers are independent businesses. Verify licensing, insurance, methods, pricing, coverage, and service terms before hiring.</span></div></div></footer>`;",
  '}',
].join('\n');

if (!source.includes("<footer class='footer'>")) {
  const pattern = /function footer\(\) \{[\s\S]*?\n\}\n\nfunction popup\(\)/;
  if (!pattern.test(source)) throw new Error('Could not find Worker footer function.');
  source = source.replace(pattern, `${footer}\n\nfunction popup()`);
  changed = true;
}

if (!source.includes('<style>${CSS}${SHELL_CSS}</style>')) {
  const marker = '<style>${CSS}</style>';
  if (!source.includes(marker)) throw new Error('Could not find Worker style tag.');
  source = source.replace(marker, '<style>${CSS}${SHELL_CSS}</style>');
  changed = true;
}

if (changed) {
  await writeFile(file, source);
  console.log('Unified the city and local-service header, footer, navigation, mobile menu, and legal links.');
} else {
  console.log('The shared city and local-service shell is already unified.');
}
