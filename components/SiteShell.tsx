import Link from 'next/link';
import { pestServices } from '@/lib/locations';
import { SITE } from '@/lib/site';

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-mark ${compact ? 'h-10 w-10 rounded-xl' : 'h-12 w-12 rounded-2xl'}`} aria-hidden="true">
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
      <div className="bg-[#12345b] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-5 gap-y-1 px-4 py-2.5 text-center text-[11px] font-extrabold sm:justify-between sm:text-xs">
          <p className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full bg-[#f6a619]" /> Nationwide pest-control provider network</p>
          <p>Available 24/7 <span className="mx-2 text-white/30">|</span> <a className="font-black text-[#ffc24a] hover:underline" href={SITE.phoneHref}>Call {SITE.phoneDisplay}</a></p>
        </div>
      </div>
      <div className="border-b border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,.08)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4.5">
          <Link href="/" className="flex min-w-max items-center gap-3" aria-label={`${SITE.name} home`}>
            <BrandMark />
            <span className="font-heading text-xl font-black tracking-tight text-[#12345b] sm:text-2xl">Batys <span className="text-[#e98b00]">Pest Control</span><small className="block font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">Nationwide Provider Network</small></span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-extrabold text-slate-700 lg:flex" aria-label="Main navigation">
            <Link href="/" className="text-[#e98b00]">Home</Link>
            <Link href="/about" className="transition hover:text-[#e98b00]">About</Link>
            <Link href="/services" className="transition hover:text-[#e98b00]">Services</Link>
            <Link href="/locations" className="transition hover:text-[#e98b00]">Areas</Link>
            <Link href="/blog" className="transition hover:text-[#e98b00]">Blog</Link>
          </nav>
          <a href={SITE.phoneHref} className="group rounded-md bg-[#ef9415] px-4 py-2.5 text-center text-xs font-black text-white shadow-[0_8px_22px_rgba(239,148,21,.28)] transition hover:-translate-y-0.5 hover:bg-[#d87f08] md:px-5">
            <span className="block text-[9px] uppercase tracking-wider text-white/80">Call now — 24/7</span>
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
    <footer className="bg-[#0d2a4a] text-slate-200">
      <div className="h-1 bg-[#ef9415]" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 lg:grid-cols-[1.25fr_.8fr_.9fr_1.25fr]">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <BrandMark compact />
            <span className="font-heading text-xl font-black">Batys <span className="text-lime-300">Pest Control</span></span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">Research pest problems, compare service topics, and connect with available independent pest-control providers across the United States.</p>
          <a href={SITE.phoneHref} className="mt-5 inline-flex rounded-lg border border-lime-300/30 bg-lime-300/10 px-4 py-3 text-sm font-black text-lime-200 transition hover:bg-lime-300 hover:text-emerald-950">Call {SITE.phoneDisplay}</a>
        </div>
        <div>
          <h2 className="border-b border-white/10 pb-4 font-heading text-base font-black uppercase tracking-wider text-white">Explore</h2>
          <div className="mt-5 grid gap-3 text-sm text-slate-400">
            <Link className="hover:text-lime-300" href="/about">About Batys</Link>
            <Link className="hover:text-lime-300" href="/services">70 Pest Services</Link>
            <Link className="hover:text-lime-300" href="/locations">States & Cities</Link>
            <Link className="hover:text-lime-300" href="/blog">Pest Guides</Link>
            <Link className="hover:text-lime-300" href="/contact">Request Availability</Link>
          </div>
        </div>
        <div>
          <h2 className="border-b border-white/10 pb-4 font-heading text-base font-black uppercase tracking-wider text-white">Popular Services</h2>
          <div className="mt-5 grid gap-3 text-sm text-slate-400">{popular.map((service) => <Link className="hover:text-lime-300" key={service.slug} href={`/services/${service.slug}`}>{service.name}</Link>)}</div>
        </div>
        <div>
          <h2 className="border-b border-white/10 pb-4 font-heading text-base font-black uppercase tracking-wider text-white">Clear & Independent</h2>
          <p className="mt-5 text-sm leading-7 text-slate-400">Batys is an information and lead-referral platform. Providers are independent businesses. Verify licensing, insurance, methods, pricing, and availability before hiring.</p>
          <div className="mt-5 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.04] px-4 py-3 text-xs font-bold text-lime-200"><BrandMark compact /> Independent Provider Network</div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-white/10 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
        <div className="flex gap-5"><Link href="/about">About</Link><Link href="/blog">Guides</Link><Link href="/contact">Contact</Link></div>
      </div>
    </footer>
  );
}
