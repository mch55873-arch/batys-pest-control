import type { Metadata } from 'next';
import { states, stateUrl } from '@/lib/locations';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Pest Control Service Areas by State & City',
  description: 'Browse pest-control service information across every US state, Washington, DC, and thousands of city and community routes.',
  alternates: { canonical: '/locations' },
};

export default function LocationsPage() {
  const cityCount = states.reduce((total, state) => total + state.cities.length, 0);

  return (
    <>
      <section className="bg-[#0b1c2d] px-4 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl">
          <nav className="text-sm font-semibold text-slate-300"><a href={SITE.url}>Home</a><span className="mx-2">/</span>Service Areas</nav>
          <p className="mt-8 text-xs font-black uppercase tracking-[.18em] text-sky-300">Nationwide location directory</p>
          <h1 className="mt-4 max-w-4xl font-heading text-5xl font-black leading-[1.04] tracking-tight sm:text-6xl">Pest-control service information by <span className="text-[#16b7df]">state and city</span></h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">Choose a state to browse city-level service routes, common pest topics, inspection guidance, treatment considerations, prevention information, and provider questions.</p>
          <div className="mt-8 flex flex-wrap gap-3"><a href={SITE.phoneHref} className="min-h-12 rounded-xl bg-[#f47b20] px-7 py-4 font-black">Call {SITE.phoneDisplay}</a><a href={`${SITE.url}/services`} className="min-h-12 rounded-xl border border-white/25 bg-white/10 px-7 py-4 font-black">Browse Services</a></div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4">
        <div className="mx-auto grid max-w-7xl grid-cols-3">
          {[[states.length, 'States & DC'], [`${cityCount.toLocaleString('en-US')}+`, 'City routes'], ['Direct', 'Availability check']].map(([value, label], index) => <div key={label} className={`p-6 text-center ${index ? 'border-l border-slate-200' : ''}`}><strong className="font-heading text-3xl font-black text-[#0b1c2d]">{value}</strong><p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:text-xs">{label}</p></div>)}
        </div>
      </section>

      <section className="bg-[#f4f7f9] px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[.18em] text-sky-600">Choose your state</p>
          <h2 className="mt-3 font-heading text-4xl font-black text-[#0b1c2d] sm:text-5xl">All pest-control service areas</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">Each state directory links to its cities and communities. Provider coverage, credentials, availability, methods, pricing, and service terms must be confirmed directly.</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {states.map((state) => (
              <a key={state.code} href={stateUrl(state)} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-sky-400 hover:shadow-xl">
                <div className="flex items-start justify-between gap-4"><div><h3 className="font-heading text-xl font-black text-[#0b1c2d] group-hover:text-sky-600">{state.name}</h3><p className="mt-2 text-sm text-slate-500">{state.cities.length.toLocaleString('en-US')} cities & communities</p></div><span className="grid h-9 w-9 place-items-center rounded-xl bg-sky-50 font-black text-sky-600">→</span></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-[#0b1c2d] p-8 text-white sm:p-10"><p className="text-xs font-black uppercase tracking-[.18em] text-sky-300">How location pages work</p><h2 className="mt-4 font-heading text-4xl font-black">Local context without invented office claims</h2><p className="mt-5 leading-8 text-slate-300">State and city pages organize public-facing service information by geography. They do not claim that Batys owns a physical office, employs a technician, or holds every local license in each location.</p></div>
          <div className="grid gap-4 sm:grid-cols-2">{[['Choose a state', 'Open the statewide city directory.'], ['Choose a city', 'Preserve the correct local context.'], ['Review a service', 'Understand signs, inspection, methods, and preparation.'], ['Verify the provider', 'Confirm coverage, credentials, written scope, and price.']].map(([title, text], index) => <div key={title} className="rounded-2xl border border-slate-200 p-6"><span className="font-heading text-3xl font-black text-sky-200">0{index + 1}</span><h3 className="mt-3 font-black text-[#0b1c2d]">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></div>)}</div>
        </div>
      </section>

      <section className="bg-[#16b7df] px-4 py-12 text-white"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center"><div><h2 className="font-heading text-3xl font-black">Need help choosing a local service?</h2><p className="mt-2 text-sky-50">Call and describe the property location, pest evidence, affected areas, and urgency.</p></div><a href={SITE.phoneHref} className="min-h-12 rounded-xl bg-[#0b1c2d] px-7 py-4 text-center font-black">Call {SITE.phoneDisplay}</a></div></section>
    </>
  );
}
