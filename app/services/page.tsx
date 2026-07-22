import type { Metadata } from 'next';
import Link from 'next/link';
import { pestServices } from '@/lib/locations';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Pest Control Services',
  description: 'Explore pest-control inspections, treatments, removal, prevention, and commercial pest-management services across the United States.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  const categories = Array.from(new Set(pestServices.map((service) => service.category)));
  return (
    <>
      <section className="bg-[#102f52] px-4 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl">
          <nav className="text-sm font-semibold text-slate-300"><Link href="/">Home</Link><span className="mx-2">/</span>Services</nav>
          <p className="mt-12 text-xs font-black uppercase tracking-[.2em] text-[#ffc24a]">Pest Control Services</p>
          <h1 className="mt-4 max-w-4xl font-heading text-5xl font-black leading-tight sm:text-6xl">Solutions for common household and commercial pest problems</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">Choose a pest or treatment category to review warning signs, typical service steps, preparation guidance, and questions to ask an independent local provider.</p>
          <div className="mt-9 flex flex-wrap gap-4"><a href={SITE.phoneHref} className="rounded-xl bg-[#ef9415] px-6 py-4 font-black text-white">Call {SITE.phoneDisplay}</a><Link href="/locations" className="rounded-xl border border-white/25 bg-white/10 px-6 py-4 font-black">Browse Service Areas</Link></div>
        </div>
      </section>

      <section className="bg-[#f5f7f8] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-3">{[['70+', 'Service topics'], ['50 States + DC', 'Nationwide coverage'], ['24/7', 'Phone access']].map(([value,label]) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"><strong className="font-heading text-4xl font-black text-[#df8309]">{value}</strong><p className="mt-2 font-bold text-[#12345b]">{label}</p></div>)}</div>
          <div className="mt-20 space-y-16">
            {categories.map((category) => (
              <section key={category} aria-labelledby={`category-${category.replace(/\W+/g, '-')}`}>
                <div className="flex items-end justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.18em] text-[#df8309]">Service Category</p><h2 id={`category-${category.replace(/\W+/g, '-')}`} className="mt-2 font-heading text-3xl font-black text-[#12345b] sm:text-4xl">{category}</h2></div></div>
                <div className="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {pestServices.filter((service) => service.category === category).map((service) => (
                    <Link key={service.slug} href={`/services/${service.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl">
                      <span className="grid h-12 w-12 place-items-center rounded-xl bg-orange-50 font-black text-[#df8309]">✓</span>
                      <h3 className="mt-6 font-heading text-2xl font-black text-[#12345b] group-hover:text-[#df8309]">{service.name}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
                      <span className="mt-6 inline-flex font-black text-[#df8309]">View service details →</span>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20"><div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-[#12345b] text-white lg:grid-cols-2"><div className="p-10 sm:p-14"><p className="text-xs font-black uppercase tracking-[.18em] text-[#ffc24a]">How it works</p><h2 className="mt-4 font-heading text-4xl font-black">From pest problem to local provider</h2><p className="mt-5 leading-7 text-slate-300">Identify the pest, review the relevant service, select your location, then confirm licensing, treatment scope, pricing, and follow-up directly with the provider.</p></div><div className="grid gap-6 bg-[#0e2947] p-10 sm:p-14">{['Choose a service topic','Select your state and city','Review treatment questions','Call to check availability'].map((item,index)=><div key={item} className="flex items-center gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#ef9415] font-black">0{index+1}</span><strong>{item}</strong></div>)}</div></div></section>

      <section className="bg-[#ef9415] px-4 py-16 text-white"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center"><div><h2 className="font-heading text-4xl font-black">Need help choosing the right service?</h2><p className="mt-2 text-orange-50">Call and describe the pest signs, affected areas, and urgency.</p></div><a href={SITE.phoneHref} className="rounded-xl bg-white px-7 py-4 font-black text-[#12345b]">Call {SITE.phoneDisplay}</a></div></section>
    </>
  );
}