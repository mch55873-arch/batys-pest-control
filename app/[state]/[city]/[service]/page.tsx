import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cityServiceUrl, cityUrl, findCity, findService, findState, isIndexableCityService, pestServices, stateUrl } from '@/lib/locations';
import { SITE } from '@/lib/site';

type Props = { params: Promise<{ state: string; city: string; service: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug, city: citySlug, service: serviceSlug } = await params;
  const state = findState(stateSlug);
  const city = state ? findCity(state, citySlug) : undefined;
  const service = findService(serviceSlug);
  if (!state || !city || !service) return {};
  const indexable = isIndexableCityService(state, city, service);
  return {
    title: `${service.name} in ${city.name}, ${state.code.toUpperCase()}`,
    description: `${service.description} Learn what to ask when seeking ${service.name.toLowerCase()} in ${city.name}, ${state.name}.`,
    alternates: { canonical: cityServiceUrl(state, city, service) },
    robots: { index: indexable, follow: true },
  };
}

export default async function CityServicePage({ params }: Props) {
  const { state: stateSlug, city: citySlug, service: serviceSlug } = await params;
  const state = findState(stateSlug);
  const city = state ? findCity(state, citySlug) : undefined;
  const service = findService(serviceSlug);
  if (!state || !city || !service) notFound();
  const related = pestServices.filter((item) => item.category === service.category && item.slug !== service.slug).slice(0, 5);
  const canonical = cityServiceUrl(state, city, service);
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: `${service.name} in ${city.name}, ${state.code.toUpperCase()}`,
        description: service.description,
        areaServed: { '@type': 'City', name: city.name, containedInPlace: { '@type': 'State', name: state.name } },
        provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
        url: canonical,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Locations', item: `${SITE.url}/locations` },
          { '@type': 'ListItem', position: 2, name: state.name, item: stateUrl(state) },
          { '@type': 'ListItem', position: 3, name: city.name, item: cityUrl(state, city) },
          { '@type': 'ListItem', position: 4, name: service.name, item: canonical },
        ],
      },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="bg-emerald-950 px-4 py-16 text-white">
        <div className="mx-auto max-w-5xl">
          <nav className="text-sm text-emerald-100/70"><Link href={stateUrl(state)}>{state.name}</Link> / <Link href={cityUrl(state, city)}>{city.name}</Link> / {service.name}</nav>
          <h1 className="mt-5 font-heading text-5xl font-black">{service.name} in {city.name}, {state.code.toUpperCase()}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-emerald-50/80">{service.description}</p>
        </div>
      </section>
      <div className="mx-auto grid max-w-5xl gap-12 px-4 py-16 lg:grid-cols-[1fr_280px]">
        <article className="space-y-10 text-slate-700">
          <section><h2 className="font-heading text-3xl font-bold text-slate-950">What the service should address</h2><p className="mt-4 leading-7">A provider serving {city.name} should identify the pest, inspect likely activity areas, explain contributing conditions, and recommend a treatment or prevention plan appropriate for the property. The written scope should distinguish immediate control from longer-term exclusion or monitoring.</p></section>
          <section><h2 className="font-heading text-3xl font-bold text-slate-950">Questions to ask</h2><ul className="mt-4 list-disc space-y-2 pl-5"><li>What evidence confirms the pest identification?</li><li>Which areas will be inspected or treated?</li><li>What preparation and safety steps are required?</li><li>What follow-up or monitoring is included?</li><li>Which {state.name} credentials apply to this work?</li></ul></section>
          <section><h2 className="font-heading text-3xl font-bold text-slate-950">Local availability</h2><p className="mt-4 leading-7">Batys is building independent provider coverage by location. Provider availability, response times, methods, pricing, and credentials must be confirmed for each request.</p></section>
        </article>
        <aside><h2 className="font-heading text-xl font-bold">Related {service.category} topics</h2><div className="mt-4 grid gap-3">{related.map((item) => <Link key={item.slug} href={cityServiceUrl(state, city, item)} className="rounded-xl border border-slate-200 p-4 text-sm font-semibold hover:border-emerald-500">{item.name}</Link>)}</div></aside>
      </div>
    </>
  );
}
