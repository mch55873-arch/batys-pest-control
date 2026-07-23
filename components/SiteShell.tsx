import { pestServices } from '@/lib/locations';
import { SITE } from '@/lib/site';

const absolute = (path: string) => `${SITE.url}${path}`;

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={`grid shrink-0 place-items-center bg-[#16b7df] text-white shadow-sm ${compact ? 'h-10 w-10 rounded-xl' : 'h-12 w-12 rounded-2xl'}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 32 32" className={compact ? 'h-6 w-6' : 'h-7 w-7'} fill="none">
        <path d="M16 4 27 9v7c0 6.5-4.2 10.5-11 13-6.8-2.5-11-6.5-11-13V9l11-5Z" fill="currentColor" opacity=".2" />
        <path d="M16 7.5 24 11v5c0 4.8-2.8 8-8 10.2C10.8 24 8 20.8 8 16v-5l8-3.5Z" stroke="currentColor" strokeWidth="2" />
        <path d="M12 17.2 15 20l5.5-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

const primaryServices = pestServices.slice(0, 8);

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white text-slate-900">
      <div className="bg-[#0b1c2d] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-5 gap-y-1 px-4 py-2 text-center text-[11px] font-extrabold sm:justify-between sm:text-xs">
          <p className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full bg-[#f47b20]" /> Nationwide pest-control directory</p>
          <p className="hidden sm:block">Independent provider network <span className="mx-2 text-white/30">|</span> <a className="font-black text-[#7dd3fc] hover:underline" href={SITE.phoneHref}>Call {SITE.phoneDisplay}</a></p>
        </div>
      </div>

      <div className="border-b border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,.08)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3.5">
          <a href={absolute('/')} className="flex min-w-0 items-center gap-3" aria-label={`${SITE.name} home`}>
            <BrandMark />
            <span className="min-w-0 font-heading text-lg font-black tracking-tight text-[#0b1c2d] sm:text-2xl">
              Batys <span className="text-[#16b7df]">Pest Control</span>
              <small className="hidden font-sans text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500 sm:block">Services · Locations · Pest Guides</small>
            </span>
          </a>

          <nav className="hidden items-center gap-1 text-sm font-extrabold text-slate-700 lg:flex" aria-label="Main navigation">
            <a href={absolute('/')} className="rounded-lg px-3 py-3 transition hover:bg-sky-50 hover:text-sky-700">Home</a>
            <details className="group relative">
              <summary className="flex cursor-pointer list-none items-center gap-1 rounded-lg px-3 py-3 transition hover:bg-sky-50 hover:text-sky-700">Services <span aria-hidden="true" className="text-xs transition group-open:rotate-180">⌄</span></summary>
              <div className="absolute left-0 top-full mt-2 w-[440px] rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl">
                <div className="grid grid-cols-2 gap-1">
                  {primaryServices.map((service) => <a key={service.slug} href={absolute(`/services/${service.slug}`)} className="rounded-xl px-3 py-3 text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-700">{service.name}</a>)}
                </div>
                <a href={absolute('/services')} className="mt-3 block rounded-xl bg-[#0b1c2d] px-4 py-3 text-center font-black text-white">View all {pestServices.length} services</a>
              </div>
            </details>
            <details className="group relative">
              <summary className="flex cursor-pointer list-none items-center gap-1 rounded-lg px-3 py-3 transition hover:bg-sky-50 hover:text-sky-700">Locations <span aria-hidden="true" className="text-xs transition group-open:rotate-180">⌄</span></summary>
              <div className="absolute left-0 top-full mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl">
                <a href={absolute('/locations')} className="block rounded-xl px-4 py-3 hover:bg-sky-50 hover:text-sky-700">Browse all states & cities</a>
                <a href={absolute('/contact')} className="block rounded-xl px-4 py-3 hover:bg-sky-50 hover:text-sky-700">Check provider availability</a>
              </div>
            </details>
            <a href={absolute('/articles')} className="rounded-lg px-3 py-3 transition hover:bg-sky-50 hover:text-sky-700">Blog</a>
            <a href={absolute('/about')} className="rounded-lg px-3 py-3 transition hover:bg-sky-50 hover:text-sky-700">About</a>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a href={SITE.phoneHref} className="hidden min-h-11 rounded-xl bg-[#f47b20] px-4 py-2.5 text-center text-xs font-black text-white shadow-[0_8px_22px_rgba(244,123,32,.25)] transition hover:-translate-y-0.5 hover:bg-[#dd6814] sm:block">
              <span className="block text-[9px] uppercase tracking-wider text-white/80">Check availability</span>
              {SITE.phoneDisplay}
            </a>
            <details className="relative lg:hidden">
              <summary className="grid h-11 w-11 cursor-pointer list-none place-items-center rounded-xl border border-slate-200 bg-white text-xl font-black text-[#0b1c2d] shadow-sm" aria-label="Open navigation menu">☰</summary>
              <div className="fixed inset-x-3 top-[92px] max-h-[calc(100vh-110px)] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl sm:top-[108px]">
                <nav className="grid gap-1" aria-label="Mobile navigation">
                  <a href={absolute('/')} className="min-h-11 rounded-xl px-4 py-3 font-black hover:bg-sky-50">Home</a>
                  <a href={absolute('/services')} className="min-h-11 rounded-xl px-4 py-3 font-black hover:bg-sky-50">All Services</a>
                  <div className="grid grid-cols-2 gap-1 border-y border-slate-100 py-2">
                    {primaryServices.slice(0, 6).map((service) => <a key={service.slug} href={absolute(`/services/${service.slug}`)} className="rounded-lg px-3 py-2.5 text-sm font-bold text-slate-600 hover:bg-sky-50">{service.name}</a>)}
                  </div>
                  <a href={absolute('/locations')} className="min-h-11 rounded-xl px-4 py-3 font-black hover:bg-sky-50">Service Areas</a>
                  <a href={absolute('/articles')} className="min-h-11 rounded-xl px-4 py-3 font-black hover:bg-sky-50">Pest Guides</a>
                  <a href={absolute('/about')} className="min-h-11 rounded-xl px-4 py-3 font-black hover:bg-sky-50">About</a>
                  <a href={absolute('/contact')} className="min-h-11 rounded-xl px-4 py-3 font-black hover:bg-sky-50">Contact</a>
                  <a href={SITE.phoneHref} className="mt-2 min-h-11 rounded-xl bg-[#f47b20] px-4 py-3 text-center font-black text-white">Call {SITE.phoneDisplay}</a>
                </nav>
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const popular = pestServices.slice(0, 6);
  return (
    <footer className="bg-[#0b1c2d] text-slate-200">
      <div className="h-1 bg-[#16b7df]" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 lg:grid-cols-[1.2fr_.8fr_.9fr_1.1fr]">
        <div>
          <a href={absolute('/')} className="flex items-center gap-3"><BrandMark compact /><span className="font-heading text-xl font-black">Batys <span className="text-sky-300">Pest Control</span></span></a>
          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">Research pest problems, compare service topics, browse state and city routes, and check availability with independent pest-control providers.</p>
          <a href={SITE.phoneHref} className="mt-5 inline-flex min-h-11 items-center rounded-lg border border-sky-300/30 bg-sky-300/10 px-4 py-3 text-sm font-black text-sky-200 transition hover:bg-sky-300 hover:text-slate-950">Call {SITE.phoneDisplay}</a>
        </div>
        <div>
          <h2 className="border-b border-white/10 pb-4 font-heading text-base font-black uppercase tracking-wider text-white">Explore</h2>
          <div className="mt-5 grid gap-3 text-sm text-slate-400">
            <a className="hover:text-sky-300" href={absolute('/about')}>About Batys</a>
            <a className="hover:text-sky-300" href={absolute('/services')}>{pestServices.length} Pest Services</a>
            <a className="hover:text-sky-300" href={absolute('/locations')}>States & Cities</a>
            <a className="hover:text-sky-300" href={absolute('/articles')}>Pest Guides</a>
            <a className="hover:text-sky-300" href={absolute('/contact')}>Request Availability</a>
          </div>
        </div>
        <div>
          <h2 className="border-b border-white/10 pb-4 font-heading text-base font-black uppercase tracking-wider text-white">Popular Services</h2>
          <div className="mt-5 grid gap-3 text-sm text-slate-400">{popular.map((service) => <a className="hover:text-sky-300" key={service.slug} href={absolute(`/services/${service.slug}`)}>{service.name}</a>)}</div>
        </div>
        <div>
          <h2 className="border-b border-white/10 pb-4 font-heading text-base font-black uppercase tracking-wider text-white">Legal & Disclosure</h2>
          <div className="mt-5 grid gap-3 text-sm text-slate-400">
            <a className="hover:text-sky-300" href={absolute('/privacy-policy')}>Privacy Policy</a>
            <a className="hover:text-sky-300" href={absolute('/terms')}>Terms & Conditions</a>
            <a className="hover:text-sky-300" href={absolute('/disclaimer')}>Disclaimer</a>
            <a className="hover:text-sky-300" href={absolute('/cookie-policy')}>Cookie Policy</a>
            <a className="hover:text-sky-300" href={absolute('/editorial-policy')}>Editorial Policy</a>
            <a className="hover:text-sky-300" href={absolute('/provider-disclosure')}>Provider Disclosure</a>
            <a className="hover:text-sky-300" href={absolute('/accessibility')}>Accessibility</a>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-white/10 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
        <p>Providers are independent businesses. Verify licensing, insurance, methods, pricing, coverage, and service terms before hiring.</p>
      </div>
    </footer>
  );
}
