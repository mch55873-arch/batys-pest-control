import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { citiesForState, findState, cityUrl, pestServices, stateUrl, states } from '@/lib/locations';

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
  return (
    <>
      <section className="bg-emerald-950 px-4 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <nav className="text-sm text-emerald-100/70"><Link href="/locations">Locations</Link> / {state.name}</nav>
          <h1 className="mt-5 font-heading text-5xl font-black">Pest control in {state.name}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-emerald-50/80">Explore pest topics and provider categories organized for cities throughout {state.name}. Availability and applicator requirements are confirmed locally.</p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-16">
        <section>
          <h2 className="font-heading text-3xl font-bold">Popular pest-service topics</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {pestServices.slice(0, 15).map((service) => <Link key={service.slug} href={`/services/${service.slug}`} className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800 hover:bg-lime-100">{service.name}</Link>)}
          </div>
        </section>
        <section className="mt-14">
          <h2 className="font-heading text-3xl font-bold">Cities and communities in {state.name}</h2>
          <p className="mt-3 text-slate-600">Choose a location to see its pest-control topic map.</p>
          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {cities.map((city) => (
              <Link key={city.slug} href={cityUrl(state, city)} className="rounded-lg border border-slate-200 px-3 py-3 text-sm font-semibold hover:border-emerald-500 hover:text-emerald-800">{city.name}</Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
