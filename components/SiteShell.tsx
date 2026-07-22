import Link from 'next/link';
import { pestServices } from '@/lib/locations';
import { SITE } from '@/lib/site';

export function SiteHeader() {
  return (
    <header className="relative z-50 text-white">
      <div className="bg-lime-400 text-emerald-950">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-5 gap-y-1 px-4 py-2 text-center text-xs font-black sm:justify-between sm:text-sm">
          <p>📍 Serving All 50 States + DC <span className="mx-3 hidden sm:inline">|</span> <span className="hidden sm:inline">Nationwide Pest-Control Directory</span></p>
          <p>Independent Provider Network <span className="mx-3">|</span> <a href={SITE.phoneHref}>☎ {SITE.phoneDisplay}</a></p>
        </div>
      </div>
      <div className="border-b border-white/10 bg-[#07172d] shadow-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-4">
          <Link href="/" className="flex min-w-max items-center gap-3" aria-label={`${SITE.name} home`}>
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-lime-300 to-emerald-400 text-2xl font-black text-[#07172d] shadow-lg">B</span>
            <span className="font-heading text-xl font-black sm:text-2xl">Batys <span className="text-lime-300">Pest Control</span></span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-bold lg:flex" aria-label="Main navigation">
            <Link href="/" className="text-lime-300">Home</Link>
            <Link href="/about" className="hover:text-lime-300">About Us</Link>
            <Link href="/services" className="hover:text-lime-300">Services</Link>
            <Link href="/blog" className="hover:text-lime-300">Blog &amp; Guides</Link>
            <Link href="/contact" className="hover:text-lime-300">Contact Us</Link>
          </nav>
          <a href={SITE.phoneHref} className="rounded-xl bg-white px-4 py-3 text-center text-xs font-black uppercase tracking-wide text-[#07172d] shadow md:px-6">
            <span className="block text-[10px] text-slate-500">Call for availability</span>
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
    <footer className="bg-[#030d20] text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-lime-400 font-black text-emerald-950">B</span>
            <span className="font-heading text-xl font-black">Batys <span className="text-lime-300">Pest Control</span></span>
          </Link>
          <p className="mt-5 text-sm leading-7 text-slate-400">
            Helping people understand pest problems and connect with available independent pest-control providers serving their area.
          </p>
          <p className="mt-5 text-sm font-bold text-lime-300">Nationwide USA information & referral network</p>
          <a href={SITE.phoneHref} className="mt-3 inline-flex text-sm font-black text-white">☎ {SITE.phoneDisplay}</a>
        </div>
        <div>
          <h2 className="border-b border-white/10 pb-4 font-heading text-lg font-black text-white">Navigation</h2>
          <div className="mt-5 grid gap-3 text-sm text-slate-400">
            <Link href="/">Home Page</Link>
            <Link href="/about">About Batys Pest Control</Link>
            <Link href="/services">70 Pest Services</Link>
            <Link href="/locations">States & Cities</Link>
            <Link href="/blog">26 Pest Guides</Link>
            <Link href="/contact">Request Local Availability</Link>
          </div>
        </div>
        <div>
          <h2 className="border-b border-white/10 pb-4 font-heading text-lg font-black text-white">Popular Services</h2>
          <div className="mt-5 grid gap-3 text-sm text-slate-400">
            {popular.map((service) => <Link key={service.slug} href={`/services/${service.slug}`}>{service.name}</Link>)}
          </div>
        </div>
        <div>
          <h2 className="border-b border-white/10 pb-4 font-heading text-lg font-black text-white">Legal & Compliance</h2>
          <p className="mt-5 text-sm leading-7 text-slate-400">
            Batys Pest Control is an information and lead-referral platform. Providers are independent businesses. Customers should verify local licensing, insurance, methods, pricing, and availability before hiring.
          </p>
          <div className="mt-5 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-bold text-lime-200">🛡 Independent Provider Network</div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-white/10 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
        <div className="flex gap-5"><Link href="/about">About</Link><Link href="/blog">Blog</Link><Link href="/contact">Contact</Link></div>
      </div>
    </footer>
  );
}
