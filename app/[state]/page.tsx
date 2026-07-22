import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { citiesForState, findState, cityUrl, pestServices, stateUrl, states } from '@/lib/locations';
import { SITE } from '@/lib/site';

type Props = { params: Promise<{ state: string }> };

export function generateStaticParams() {
  return states.map((state) => ({ state: state.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const state = findState(stateSlug);
  if (!state) return {};
  return {
    title: `Pest Control in ${state.name}`,
    description: `Browse pest-control services and city-specific pest information across ${state.name}.`,
    alternates: { canonical: stateUrl(state) },
  };
}

export default async function StatePage({ params }: Props) {
  const { state: stateSlug } = await params;
  const state = findState(stateSlug);
  if (!state) notFound();
  const cities = citiesForState(state);
  const featured = pestServices.slice(0, 9);
  const faqs = [
    [`How do I find pest control in ${state.name}?`, `Choose your city below, then select the pest or service you need. Confirm provider licensing, pricing, treatment scope, and availability directly.`],
    [`Are pest-control rules the same across ${state.name}?`, `No. Licensing, pesticide use, documentation, and treatment requirements can vary by treatment type and local jurisdiction.`],
    [`Can I request same-day service in ${state.name}?`, `Same-day service depends on city, season, pest type, and provider capacity. Call to check current availability.`],
  ];
  return (
    <>
      <section className="bg-[#102f52] px-4 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl">
          <nav className="text-sm font-semibold text-slate-300"><Link href="/locations">Locations</Link><span className="mx-2">/</span>{state.name}</nav>
          <p className="mt-12 text-xs font-black uppercase tracking-[.2em] text-[#ffc24a]">Statewide Pest-Control Coverage</p>
          <h1 className="mt-4 max-w-4xl font-heading text-5xl font-black leading-tight sm:text-6xl">Pest control services across {state.name}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">Explore local pest-control topics, compare treatment options, and find city-specific service pages throughout {state.name}.</p>
          <div className="mt-9 flex flex-wrap gap-4"><a href={SITE.phoneHref} className="rounded-xl bg-[#ef9415] px-6 py-4 font-black">Call {SITE.phoneDisplay}</a><a href="#cities" className="rounded-xl border border-white/25 bg-white/10 px-6 py-4 font-black">Choose Your City</a></div>
        </div>
      </section>

      <section className="bg-[#f5f7f8] px-4 py-16"><div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">{[[cities.length.toLocaleString('en-US'), 'Cities covered'], [pestServices.length.toString(), 'Service topics'], ['24/7', 'Phone access']].map(([value,label])=><div key={label} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"><strong className="font-heading text-4xl font-black text-[#df8309]">{value}</strong><p className="mt-2 font-bold text-[#12345b]">{label}</p></div>)}</div></section>

      <section className="px-4 py-20"><div className="mx-auto max-w-7xl"><p className="text-xs font-black uppercase tracking-[.18em] text-[#df8309]">Popular Services</p><h2 className="mt-3 font-heading text-4xl font-black text-[#12345b]">Common pest-control needs in {state.name}</h2><div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{featured.map((service)=><Link key={service.slug} href={`/services/${service.slug}`} className="group rounded-2xl border border-slate-200 p-7 shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl"><span className="grid h-12 w-12 place-items-center rounded-xl bg-orange-50 font-black text-[#df8309]">✓</span><h3 className="mt-6 font-heading text-2xl font-black text-[#12345b] group-hover:text-[#df8309]">{service.name}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p><span className="mt-6 inline-flex font-black text-[#df8309]">View service →</span></Link>)}</div></div></section>

      <section id="cities" className="bg-[#f5f7f8] px-4 py-20"><div className="mx-auto max-w-7xl"><p className="text-xs font-black uppercase tracking-[.18em] text-[#df8309]">Service Areas</p><h2 className="mt-3 font-heading text-4xl font-black text-[#12345b]">Cities and communities in {state.name}</h2><p className="mt-4 max-w-3xl text-slate-600">Select a city to browse local service pages, pest topics, and provider guidance.</p><div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">{cities.map((city)=><Link key={city.slug} href={cityUrl(state, city)} className="rounded-xl border border-slate-200 bg-white px-4 py-4 font-bold text-[#12345b] shadow-sm transition hover:border-orange-300 hover:text-[#df8309]">{city.name}<span className="float-right">→</span></Link>)}</div></div></section>

      <section className="px-4 py-20"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2"><div className="rounded-[2rem] bg-[#12345b] p-10 text-white sm:p-12"><p className="text-xs font-black uppercase tracking-[.18em] text-[#ffc24a]">Why use this directory</p><h2 className="mt-4 font-heading text-4xl font-black">A clearer path to local pest-control help</h2><div className="mt-8 grid gap-5">{['State and city-specific navigation','Residential and commercial service topics','Provider verification guidance','Direct phone availability checks'].map((item)=><div key={item} className="flex gap-3"><span className="text-[#ffc24a]">✓</span><strong>{item}</strong></div>)}</div></div><div><p className="text-xs font-black uppercase tracking-[.18em] text-[#df8309]">Frequently Asked Questions</p><h2 className="mt-3 font-heading text-4xl font-black text-[#12345b]">Pest control in {state.name}</h2><div className="mt-8 grid gap-4">{faqs.map(([q,a])=><details key={q} className="rounded-xl border border-slate-200 bg-white p-5"><summary className="cursor-pointer font-black text-[#12345b]">{q}</summary><p className="mt-3 text-sm leading-6 text-slate-600">{a}</p></details>)}</div></div></div></section>

      <section className="bg-[#ef9415] px-4 py-16 text-white"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center"><div><h2 className="font-heading text-4xl font-black">Need pest-control help in {state.name}?</h2><p className="mt-2 text-orange-50">Call to discuss the pest, affected area, and local availability.</p></div><a href={SITE.phoneHref} className="rounded-xl bg-white px-7 py-4 font-black text-[#12345b]">Call {SITE.phoneDisplay}</a></div></section>
    </>
  );
}