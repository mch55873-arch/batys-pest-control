import Link from 'next/link';
import { pestServices } from '@/lib/locations';
import { SITE } from '@/lib/site';

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`grid shrink-0 place-items-center bg-[#16b7df] text-white shadow-sm ${compact ? 'h-10 w-10 rounded-xl' : 'h-12 w-12 rounded-2xl'}`} aria-hidden="true">
      <svg viewBox="0 0 32 32" className={compact ? 'h-6 w-6' : 'h-7 w-7'} fill="none">
        <path d="M16 4 27 9v7c0 6.5-4.2 10.5-11 13-6.8-2.5-11-6.5-11-13V9l11-5Z" fill="currentColor" opacity=".2" />
        <path d="M16 7.5 24 11v5c0 4.8-2.8 8-8 10.2C10.8 24 8 20.8 8 16v-5l8-3.5Z" stroke="currentColor" strokeWidth="2" />
        <path d="M12 17.2 15 20l5.5-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className="relative z-50 bg-white text-slate-900">
      <div className="bg-[#0b1c2d] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-5 gap-y-1 px-4 py-2.5 text-center text-[11px] font-extrabold sm:justify-between sm:text-xs">
          <p className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full bg-[#f47b20]" /> Nationwide pest-control location directory</p>
          <p>Independent provider network <span className="mx-2 text-white/30">|</span> <a className="font-black text-[#7dd3fc] hover:underline" href={SITE.phoneHref}>Call {SITE.phoneDisplay}</a></p>
        </div>
      </div>
      <div className="border-b border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,.08)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
          <Link href="/" className="flex min-w-max items-center gap-3" aria-label={`${SITE.name} home`}>
            <BrandMark />
            <span className="font-heading text-xl font-black tracking-tight text-[#0b1c2d] sm:text-2xl">Batys <span className="text-[#16b7df]">Pest Control</span><small className="block font-sans text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">Services · Locations · Pest Guides</small></span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-extrabold text-slate-700 lg:flex" aria-label="Main navigation">
            <Link href="/" className="transition hover:text-sky-600">Home</Link>
            <Link href="/services" className="transition hover:text-sky-600">Services</Link>
            <Link href="/locations" className="transition hover:text-sky-600">Service Areas</Link>
            <Link href="/about" className="transition hover:text-sky-600">About</Link>
            <Link href="/articles" className="transition hover:text-sky-600">Articles</Link>
            <Link href="/contact" className="transition hover:text-sky-600">Contact</Link>
          </nav>
          <a href={SITE.phoneHref} className="group rounded-lg bg-[#f47b20] px-4 py-2.5 text-center text-xs font-black text-white shadow-[0_8px_22px_rgba(244,123,32,.25)] transition hover:-translate-y-0.5 hover:bg-[#dd6814] md:px-5">
            <span className="block text-[9px] uppercase tracking-wider text-white/80">Check availability</span>
            {SITE.phoneDisplay}
          </a>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const popular = pestServices.slice(0, 5);
  return (
    <footer className="bg-[#0b1c2d] text-slate-200">
      <div className="h-1 bg-[#16b7df]" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 lg:grid-cols-[1.2fr_.8fr_.9fr_1.1fr]">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <BrandMark compact />
            <span className="font-heading text-xl font-black">Batys <span className="text-sky-300">Pest Control</span></span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">Research pest problems, compare service topics, browse state and city routes, and check availability with independent pest-control providers.</p>
          <a href={SITE.phoneHref} className="mt-5 inline-flex rounded-lg border border-sky-300/30 bg-sky-300/10 px-4 py-3 text-sm font-black text-sky-200 transition hover:bg-sky-300 hover:text-slate-950">Call {SITE.phoneDisplay}</a>
        </div>
        <div>
          <h2 className="border-b border-white/10 pb-4 font-heading text-base font-black uppercase tracking-wider text-white">Explore</h2>
          <div className="mt-5 grid gap-3 text-sm text-slate-400">
            <Link className="hover:text-sky-300" href="/about">About Batys</Link>
            <Link className="hover:text-sky-300" href="/services">{pestServices.length} Pest Services</Link>
            <Link className="hover:text-sky-300" href="/locations">States & Cities</Link>
            <Link className="hover:text-sky-300" href="/articles">Pest Guides</Link>
            <Link className="hover:text-sky-300" href="/contact">Request Availability</Link>
          </div>
        </div>
        <div>
          <h2 className="border-b border-white/10 pb-4 font-heading text-base font-black uppercase tracking-wider text-white">Popular Services</h2>
          <div className="mt-5 grid gap-3 text-sm text-slate-400">{popular.map((service) => <Link className="hover:text-sky-300" key={service.slug} href={`/services/${service.slug}`}>{service.name}</Link>)}</div>
        </div>
        <div>
          <h2 className="border-b border-white/10 pb-4 font-heading text-base font-black uppercase tracking-wider text-white">Legal & Disclosure</h2>
          <div className="mt-5 grid gap-3 text-sm text-slate-400">
            <Link className="hover:text-sky-300" href="/privacy-policy">Privacy Policy</Link>
            <Link className="hover:text-sky-300" href="/terms">Terms & Conditions</Link>
            <Link className="hover:text-sky-300" href="/disclaimer">Disclaimer</Link>
            <Link className="hover:text-sky-300" href="/cookie-policy">Cookie Policy</Link>
            <Link className="hover:text-sky-300" href="/editorial-policy">Editorial Policy</Link>
            <Link className="hover:text-sky-300" href="/provider-disclosure">Provider Disclosure</Link>
            <Link className="hover:text-sky-300" href="/accessibility">Accessibility</Link>
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
