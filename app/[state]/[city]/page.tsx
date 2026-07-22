import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cityServiceUrl, cityUrl, findCity, findState, pestServices, stateUrl } from '@/lib/locations';
import { SITE } from '@/lib/site';

type Props = { params: Promise<{ state: string; city: string }> };

export const revalidate = 86400;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug, city: citySlug } = await params;
  const state = findState(stateSlug);
  const city = state ? findCity(state, citySlug) : undefined;
  if (!state || !city) return {};
  return {
    title: `Pest Control in ${city.name}, ${state.code.toUpperCase()}`,
    description: `Explore pest-control services, inspection topics, and provider options for ${city.name}, ${state.name}.`,
    alternates: { canonical: cityUrl(state, city) },
    robots: { index: true, follow: true },
  };
}

export default async function CityPage({ params }: Props) {
  const { state: stateSlug, city: citySlug } = await params;
  const state = findState(stateSlug);
  const city = state ? findCity(state, citySlug) : undefined;
  if (!state || !city) notFound();
  const featured = pestServices.slice(0, 12);
  const faqs = [
    [`What pests are common in ${city.name}?`, `Common local concerns can include ants, cockroaches, termites, rodents, spiders, mosquitoes, bed bugs, and seasonal invaders. An inspection should confirm the pest before treatment.`],
    [`How quickly can pest control respond in ${city.name}?`, `Response time depends on provider coverage, season, pest type, and urgency. Call to check current same-day or emergency availability.`],
    [`What should I ask before treatment?`, `Ask for identification, inspection findings, treatment scope, products, preparation steps, follow-up, warranty terms, and total price in writing.`],
  ];
  return (
    <>
      <section className="bg-[#102f52] px-4 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl">
          <nav className="text-sm font-semibold text-slate-300"><Link href="/locations">Locations</Link><span className="mx-2">/</span><Link href={stateUrl(state)}>{state.name}</Link><span className="mx-2">/</span>{city.name}</nav>
          <p className="mt-12 text-xs font-black uppercase tracking-[.2em] text-[#ffc24a]">Local Pest-Control Services</p>
          <h1 className="mt-4 max-w-4xl font-heading text-5xl font-black leading-tight sm:text-6xl">Pest control in {city.name}, {state.code.toUpperCase()}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">Compare local pest-control services, understand treatment options, and check independent provider availability in {city.name}.</p>
          <div className="mt-9 flex flex-wrap gap-4"><a href={SITE.phoneHref} className="rounded-xl bg-[#ef9415] px-6 py-4 font-black">Call {SITE.phoneDisplay}</a><a href="#services" className="rounded-xl border border-white/25 bg-white/10 px-6 py-4 font-black">View Local Services</a></div>
          <div className="mt-10 grid max-w-3xl gap-3 text-sm font-bold sm:grid-cols-3">{['Local service pages','Residential & commercial','Independent providers'].map((item)=><span key={item} className="flex items-center gap-2"><span className="grid h-5 w-5 place-items-center rounded-full bg-[#ef9415] text-[10px]">✓</span>{item}</span>)}</div>
        </div>
      </section>

      <section className="bg-[#f5f7f8] px-4 py-16"><div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">{[[pestServices.length.toString(),'Service topics'],['24/7','Phone access'],[state.name,'State coverage']].map(([value,label])=><div key={label} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"><strong className="font-heading text-3xl font-black text-[#df8309]">{value}</strong><p className="mt-2 font-bold text-[#12345b]">{label}</p></div>)}</div></section>

      <section id="services" className="px-4 py-20"><div className="mx-auto max-w-7xl"><p className="text-xs font-black uppercase tracking-[.18em] text-[#df8309]">Pest Services</p><h2 className="mt-3 font-heading text-4xl font-black text-[#12345b]">Pest-control services in {city.name}</h2><p className="mt-4 max-w-3xl text-slate-600">Choose a service to review warning signs, treatment considerations, preparation, and local provider questions.</p><div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{featured.map((service)=><Link key={service.slug} href={cityServiceUrl(state, city, service)} className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl"><span className="grid h-12 w-12 place-items-center rounded-xl bg-orange-50 font-black text-[#df8309]">✓</span><h3 className="mt-6 font-heading text-2xl font-black text-[#12345b] group-hover:text-[#df8309]">{service.name}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{service.description}</p><span className="mt-6 inline-flex font-black text-[#df8309]">View local service →</span></Link>)}</div><div className="mt-10 text-center"><Link href="/services" className="inline-flex rounded-xl bg-[#12345b] px-6 py-4 font-black text-white">Browse all services</Link></div></div></section>

      <section className="bg-[#f5f7f8] px-4 py-20"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2"><div><p className="text-xs font-black uppercase tracking-[.18em] text-[#df8309]">What to expect</p><h2 className="mt-3 font-heading text-4xl font-black text-[#12345b]">A practical local service process</h2><div className="mt-8 grid gap-5">{['Describe the pest signs and affected areas','Schedule an inspection or service visit','Review identification and treatment scope','Confirm preparation, pricing, and follow-up'].map((item,index)=><div key={item} className="flex gap-4 rounded-xl bg-white p-5 shadow-sm"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#ef9415] font-black text-white">0{index+1}</span><div><h3 className="font-black text-[#12345b]">{item}</h3><p className="mt-1 text-sm leading-6 text-slate-600">Confirm every service detail directly with the independent provider.</p></div></div>)}</div></div><div className="rounded-[2rem] bg-[#12345b] p-10 text-white sm:p-12"><p className="text-xs font-black uppercase tracking-[.18em] text-[#ffc24a]">Before hiring</p><h2 className="mt-4 font-heading text-4xl font-black">Verify the provider and treatment plan</h2><div className="mt-8 grid gap-5">{[`Verify licensing required in ${state.name}`,'Request a written inspection and treatment scope','Ask about products, safety, and preparation','Confirm price, warranty, and follow-up'].map((item)=><div key={item} className="flex gap-3"><span className="text-[#ffc24a]">✓</span><strong>{item}</strong></div>)}</div></div></div></section>

      <section className="px-4 py-20"><div className="mx-auto max-w-4xl"><p className="text-center text-xs font-black uppercase tracking-[.18em] text-[#df8309]">Frequently Asked Questions</p><h2 className="mt-3 text-center font-heading text-4xl font-black text-[#12345b]">Pest control in {city.name}</h2><div className="mt-10 grid gap-4">{faqs.map(([q,a])=><details key={q} className="rounded-xl border border-slate-200 p-5"><summary className="cursor-pointer font-black text-[#12345b]">{q}</summary><p className="mt-3 text-sm leading-6 text-slate-600">{a}</p></details>)}</div><p className="mt-8 text-center"><Link href={stateUrl(state)} className="font-black text-[#df8309]">Browse all {state.name} locations →</Link></p></div></section>

      <section className="bg-[#ef9415] px-4 py-16 text-white"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center"><div><h2 className="font-heading text-4xl font-black">Need pest-control help in {city.name}?</h2><p className="mt-2 text-orange-50">Call to describe the problem and check local provider availability.</p></div><a href={SITE.phoneHref} className="rounded-xl bg-white px-7 py-4 font-black text-[#12345b]">Call {SITE.phoneDisplay}</a></div></section>
    </>
  );
}