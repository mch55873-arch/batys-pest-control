import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cityPath, cityServicePath, findCity, findState, isPriorityCity, pestServices, statePath } from '@/lib/locations';

type Props = { params: Promise<{ state: string; city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug, city: citySlug } = await params;
  const state = findState(stateSlug);
  const city = state ? findCity(state, citySlug) : undefined;
  if (!state || !city) return {};
  const indexable = isPriorityCity(state, city);
  return {
    title: `Pest Control in ${city.name}, ${state.code.toUpperCase()}`,
    description: `Explore pest-control services, inspection topics, and provider options for ${city.name}, ${state.name}.`,
    alternates: { canonical: cityPath(state, city) },
    robots: { index: indexable, follow: true },
  };
}

export default async function CityPage({ params }: Props) {
  const { state: stateSlug, city: citySlug } = await params;
  const state = findState(stateSlug);
  const city = state ? findCity(state, citySlug) : undefined;
  if (!state || !city) notFound();
  return (
    <>
      <section className="bg-emerald-950 px-4 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <nav className="text-sm text-emerald-100/70"><Link href="/locations">Locations</Link> / <Link href={statePath(state)}>{state.name}</Link> / {city.name}</nav>
          <h1 className="mt-5 font-heading text-5xl font-black">Pest control in {city.name}, {state.code.toUpperCase()}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-emerald-50/80">Compare pest topics and understand what to ask before choosing an independent pest-control provider serving {city.name}.</p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-16">
        <section>
          <h2 className="font-heading text-3xl font-bold">Pest services in {city.name}</h2>
          <p className="mt-3 max-w-3xl text-slate-600">Choose a pest entity or service intent. Treatment availability depends on provider coverage and applicable {state.name} requirements.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pestServices.map((service) => (
              <Link key={service.slug} href={cityServicePath(state, city, service)} className="rounded-2xl border border-slate-200 p-5 hover:border-emerald-500 hover:shadow-sm">
                <h3 className="font-heading text-lg font-bold">{service.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{service.description}</p>
              </Link>
            ))}
          </div>
        </section>
        <section className="mt-16 rounded-2xl bg-slate-50 p-8">
          <h2 className="font-heading text-2xl font-bold">Before hiring a provider</h2>
          <ul className="mt-5 grid gap-3 text-slate-700 md:grid-cols-2">
            <li>Confirm the pest identification and inspection findings.</li>
            <li>Verify licensing or certification required in {state.name}.</li>
            <li>Request a written scope, preparation steps, and price.</li>
            <li>Ask about products, safety instructions, and follow-up.</li>
          </ul>
        </section>
      </div>
    </>
  );
}
