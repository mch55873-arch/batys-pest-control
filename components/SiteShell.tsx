import Link from 'next/link';
import { SITE } from '@/lib/site';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-emerald-950/20 bg-[#10261f] text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4">
        <Link href="/" className="flex items-center gap-3" aria-label={`${SITE.name} home`}>
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400 text-2xl text-emerald-950">⌁</span>
          <span>
            <strong className="block font-heading text-xl leading-none">Batys</strong>
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-lime-300">Pest Control</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-semibold md:flex" aria-label="Main navigation">
          <Link href="/services" className="hover:text-lime-300">Services</Link>
          <Link href="/locations" className="hover:text-lime-300">Locations</Link>
          <Link href="/about" className="hover:text-lime-300">How it works</Link>
          <Link href="/contact" className="rounded-lg bg-lime-400 px-4 py-2 text-emerald-950 hover:bg-lime-300">Request availability</Link>
        </nav>
        <Link href="/locations" className="rounded-lg border border-lime-300/50 px-3 py-2 text-sm font-bold text-lime-200 md:hidden">Find local help</Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#0a1914] text-emerald-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <p className="font-heading text-2xl font-bold">{SITE.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-emerald-100/70">
            Pest information and a growing directory of independent local pest-control providers across the United States.
          </p>
        </div>
        <div>
          <p className="font-bold text-lime-300">Explore</p>
          <div className="mt-4 grid gap-2 text-sm text-emerald-100/80">
            <Link href="/services">Pest services</Link>
            <Link href="/locations">States and cities</Link>
            <Link href="/about">How referrals work</Link>
          </div>
        </div>
        <div>
          <p className="font-bold text-lime-300">Important</p>
          <p className="mt-4 text-sm leading-6 text-emerald-100/70">
            Batys Pest Control is an information and referral platform. Service availability, licensing, methods, and pricing are confirmed by the independent provider handling each request.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-emerald-100/60">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </div>
    </footer>
  );
}
