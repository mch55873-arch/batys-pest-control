import type { Metadata } from 'next';
import Image from 'next/image';
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
    title: `Pest Control Services in ${state.name}`,
    description: `Browse pest-control services, city routes, inspection guidance, treatment information, prevention topics, and provider questions across ${state.name}.`,
    alternates: { canonical: stateUrl(state) },
    openGraph: {
      title: `Pest Control Services in ${state.name}`,
      description: `Choose a city and review pest-control service information throughout ${state.name}.`,
      url: stateUrl(state),
      images: [{ url: `${SITE.url}/images/pest-control-hero.webp`, alt: `Pest-control service information across ${state.name}` }],
    },
  };
}

const priorityServiceSlugs = [
  'emergency-pest-control',
  'termite-control',
  'bed-bug-treatment',
  'rodent-control',
  'cockroach-control',
  'mosquito-control',
  'ant-control',
  'wildlife-removal',
  'commercial-pest-control',
];

export default async function StatePage({ params }: Props) {
  const { state: stateSlug } = await params;
  const state = findState(stateSlug);
  if (!state) notFound();

  const cities = citiesForState(state);
  const featured = priorityServiceSlugs
    .map((slug) => pestServices.find((service) => service.slug === slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));
  const canonical = stateUrl(state);
  const faqs = [
    [`How do I find pest control in ${state.name}?`, `Choose a city below, review the relevant pest or service topic, and confirm provider coverage, licensing, insurance, inspection scope, methods, pricing, and availability directly.`],
    [`Are pest-control rules the same across ${state.name}?`, 'No. Licensing, pesticide use, notification, recordkeeping, wildlife handling, and treatment requirements can vary by service type and local jurisdiction.'],
    [`Can I request same-day pest control in ${state.name}?`, 'Same-day or emergency availability depends on the city, season, pest, urgency, travel distance, and provider capacity. Call to confirm current availability.'],
    ['What should a pest-control quote include?', 'Request pest identification, inspection findings, treatment areas, products or methods, preparation, re-entry, number of visits, exclusions, follow-up, warranty terms, and total price in writing.'],
    [`Which pests are commonly researched in ${state.name}?`, 'Common service searches include termites, bed bugs, ants, cockroaches, rodents, mosquitoes, spiders, stinging insects, fleas, ticks, wildlife, and commercial pest management. Actual pest pressure varies by location and season.'],
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: `Pest Control in ${state.name}`,
        description: `City and service directory for pest-control information across ${state.name}.`,
        isPartOf: { '@id': `${SITE.url}/#website` },
        about: { '@type': 'AdministrativeArea', name: state.name },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
          { '@type': 'ListItem', position: 2, name: 'Locations', item: `${SITE.url}/locations` },
          { '@type': 'ListItem', position: 3, name: state.name, item: canonical },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />

      <section className="relative isolate overflow-hidden bg-[#0b1c2d] px-4 py-20 text-white sm:py-24">
        <Image src="/images/pest-control-hero.webp" alt={`Pest-control service information for ${state.name}`} fill priority className="object-cover opacity-30" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071522] via-[#0b1c2d]/95 to-[#0b1c2d]/55" />
        <div className="relative mx-auto max-w-7xl">
          <nav className="text-sm font-semibold text-slate-300"><a href={`${SITE.url}/locations`}>Locations</a><span className="mx-2">/</span>{state.name}</nav>
          <span className="mt-8 inline-flex rounded-full border border-sky-300/25 bg-sky-300/10 px-4 py-2 text-xs font-black uppercase tracking-wider text-sky-200">Statewide pest-control directory</span>
          <h1 className="mt-5 max-w-4xl font-heading text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl">Pest Control Services in <span className="text-[#16b7df]">{state.name}</span></h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">Choose a city, compare common pest-control services, review inspection and treatment guidance, and check independent-provider availability throughout {state.name}.</p>
          <div className="mt-8 flex flex-wrap gap-4"><a href={SITE.phoneHref} className="min-h-12 rounded-xl bg-[#f47b20] px-7 py-4 font-black">Call {SITE.phoneDisplay}</a><a href="#cities" className="min-h-12 rounded-xl border border-white/25 bg-white/10 px-7 py-4 font-black">Choose Your City</a></div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4">
        <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
          {[[cities.length.toLocaleString('en-US'), 'Cities & communities'], [pestServices.length.toString(), 'Service topics'], ['50+', 'Common pest entities'], ['Direct', 'Phone availability check']].map(([value, label], index) => <div key={label} className={`p-6 text-center ${index ? 'border-l border-slate-200' : ''} ${index > 1 ? 'border-t border-slate-200 md:border-t-0' : ''}`}><strong className="font-heading text-3xl font-black text-[#0b1c2d]">{value}</strong><p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:text-xs">{label}</p></div>)}
        </div>
      </section>

      <section className="bg-[#f4f7f9] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[.18em] text-sky-600">Popular services</p>
          <h2 className="mt-3 font-heading text-4xl font-black text-[#0b1c2d]">Common pest-control needs across {state.name}</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">Review the service information on the main domain, then select a city for locally organized routes and provider questions.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((service, index) => <a key={service.slug} href={`${SITE.url}/services/${service.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><span className="grid h-11 w-11 place-items-center rounded-xl bg-sky-50 font-black text-sky-600">{String(index + 1).padStart(2, '0')}</span><h3 className="mt-5 font-heading text-xl font-black text-[#0b1c2d] group-hover:text-sky-600">{service.name}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{service.description}</p><span className="mt-5 inline-flex text-sm font-black text-sky-600">View service →</span></a>)}
          </div>
        </div>
      </section>

      <section id="cities" className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[.18em] text-sky-600">Service areas</p>
          <h2 className="mt-3 font-heading text-4xl font-black text-[#0b1c2d]">Cities and communities in {state.name}</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">Select a city to browse local pest-control routes, warning signs, treatment considerations, preparation guidance, and frequently asked questions.</p>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {cities.map((city) => <a key={city.slug} href={cityUrl(state, city)} className="min-h-11 rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm font-bold text-[#0b1c2d] shadow-sm transition hover:border-sky-400 hover:text-sky-600">{city.name}<span className="float-right text-sky-500">→</span></a>)}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f7f9] px-4 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-[#0b1c2d] p-10 text-white sm:p-12"><p className="text-xs font-black uppercase tracking-[.18em] text-sky-300">How it works</p><h2 className="mt-4 font-heading text-4xl font-black">A clearer path to local pest-control help</h2><div className="mt-8 grid gap-5">{[['01', 'Choose the city', 'Keep the correct local context for the property.'], ['02', 'Choose the service', 'Review the pest, inspection, treatment, removal, or prevention topic.'], ['03', 'Check the guidance', 'Document signs, preparation needs, safety questions, and expected follow-up.'], ['04', 'Verify the provider', 'Confirm credentials, written scope, methods, pricing, coverage, and warranty.']].map(([number, title, text]) => <div key={number} className="flex gap-4"><strong className="text-3xl font-black text-sky-300">{number}</strong><div><h3 className="font-black">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-300">{text}</p></div></div>)}</div></div>
          <div><p className="text-xs font-black uppercase tracking-[.18em] text-sky-600">Frequently asked questions</p><h2 className="mt-3 font-heading text-4xl font-black text-[#0b1c2d]">Pest control in {state.name}</h2><div className="mt-8 grid gap-3">{faqs.map(([question, answer]) => <details key={question} className="rounded-xl border border-slate-200 bg-white p-5"><summary className="cursor-pointer font-black text-[#0b1c2d]">{question}<span className="float-right text-sky-500">+</span></summary><p className="mt-3 text-sm leading-7 text-slate-600">{answer}</p></details>)}</div></div>
        </div>
      </section>

      <section className="bg-[#16b7df] px-4 py-12 text-white"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center"><div><h2 className="font-heading text-3xl font-black">Need pest-control information in {state.name}?</h2><p className="mt-2 text-sky-50">Choose your city or call to check independent-provider availability.</p></div><a href={SITE.phoneHref} className="min-h-12 rounded-xl bg-[#0b1c2d] px-7 py-4 text-center font-black">Call {SITE.phoneDisplay}</a></div></section>
    </>
  );
}
