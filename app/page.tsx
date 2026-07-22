import Link from 'next/link';
import { pestServices, states, statePath } from '@/lib/locations';

const categories = Array.from(new Set(pestServices.map((service) => service.category)));
const cityCount = states.reduce((total, state) => total + state.cities.length, 0);

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#10261f] px-4 py-24 text-white md:py-32">
        <div className="absolute -right-24 top-12 h-80 w-80 rounded-full bg-lime-300/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <p className="mb-4 font-bold uppercase tracking-[0.22em] text-lime-300">United States pest-control directory</p>
          <h1 className="max-w-4xl font-heading text-5xl font-black leading-tight md:text-7xl">
            Understand the pest. Find the right local service.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-emerald-50/80">
            Explore pest-control options by problem, state, and city. Batys is building a nationwide information and referral network for residential and commercial pest needs.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/locations" className="rounded-xl bg-lime-400 px-6 py-4 font-bold text-emerald-950 hover:bg-lime-300">Browse by location</Link>
            <Link href="/services" className="rounded-xl border border-white/30 px-6 py-4 font-bold hover:border-lime-300 hover:text-lime-200">Browse all services</Link>
          </div>
        </div>
      </section>

      <section className="border-b bg-lime-50 px-4 py-8">
        <div className="mx-auto grid max-w-7xl gap-6 text-center sm:grid-cols-3">
          <div><strong className="block text-3xl text-emerald-900">{states.length}</strong><span className="text-sm text-slate-600">states and DC</span></div>
          <div><strong className="block text-3xl text-emerald-900">{cityCount.toLocaleString('en-US')}</strong><span className="text-sm text-slate-600">location routes supported</span></div>
          <div><strong className="block text-3xl text-emerald-900">{pestServices.length}</strong><span className="text-sm text-slate-600">service intents mapped</span></div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-bold uppercase tracking-widest text-emerald-700">Pest topics</p>
          <h2 className="mt-2 font-heading text-4xl font-black">Start with the problem you are seeing</h2>
          <p className="mt-4 max-w-3xl text-slate-600">Services are grouped by pest entity and treatment intent, so related questions and solutions stay connected.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const categoryServices = pestServices.filter((service) => service.category === category);
              return (
                <article key={category} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="font-heading text-2xl font-bold text-emerald-950">{category}</h3>
                  <p className="mt-2 text-sm text-slate-500">{categoryServices.length} related service {categoryServices.length === 1 ? 'topic' : 'topics'}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {categoryServices.slice(0, 5).map((service) => (
                      <Link key={service.slug} href={`/services/${service.slug}`} className="rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-800 hover:bg-lime-100">{service.name}</Link>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-20" id="locations">
        <div className="mx-auto max-w-7xl">
          <p className="font-bold uppercase tracking-widest text-emerald-700">Location hierarchy</p>
          <h2 className="mt-2 font-heading text-4xl font-black">Explore pest control by state</h2>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {states.map((state) => (
              <Link key={state.code} href={statePath(state)} className="rounded-xl border border-slate-200 bg-white px-4 py-4 font-semibold text-slate-800 hover:border-emerald-500 hover:text-emerald-800">
                {state.name}
                <span className="mt-1 block text-xs font-normal text-slate-500">{state.cities.length.toLocaleString('en-US')} locations</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
