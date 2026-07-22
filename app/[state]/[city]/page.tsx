import type { Metadata } from 'next';
import Image from 'next/image';
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
    description: `Browse pest-control services, warning signs, treatment information, and independent-provider options for ${city.name}, ${state.name}.`,
    alternates: { canonical: cityUrl(state, city) },
    robots: { index: true, follow: true },
    openGraph: {
      title: `Pest Control Services in ${city.name}, ${state.code.toUpperCase()}`,
      description: `Compare local pest-control service information and check provider availability in ${city.name}.`,
      url: cityUrl(state, city),
      images: [{ url: '/images/pest-control-hero.webp', alt: `Pest-control services in ${city.name}, ${state.name}` }],
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
  'spider-control',
  'wasp-nest-removal',
  'wildlife-removal',
  'residential-pest-control',
  'commercial-pest-control',
];

export default async function CityPage({ params }: Props) {
  const { state: stateSlug, city: citySlug } = await params;
  const state = findState(stateSlug);
  const city = state ? findCity(state, citySlug) : undefined;
  if (!state || !city) notFound();

  const featured = priorityServiceSlugs
    .map((slug) => pestServices.find((service) => service.slug === slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));
  const canonical = cityUrl(state, city);
  const faqs = [
    [`What pests are commonly researched in ${city.name}?`, `Common service searches include ants, cockroaches, termites, rodents, spiders, mosquitoes, bed bugs, fleas, ticks, stinging insects, wildlife, and seasonal invaders. An inspection should confirm the pest and source before treatment.`],
    [`How quickly can pest control respond in ${city.name}?`, `Response time depends on local provider coverage, season, pest type, urgency, route capacity, and travel distance. Call to confirm same-day or emergency availability.`],
    [`What should I ask before treatment in ${city.name}?`, `Ask for identification, inspection findings, treatment areas, products or methods, preparation, re-entry, number of visits, follow-up, exclusions, warranty terms, and total price in writing.`],
    [`Are providers in ${city.name} licensed and insured?`, `Requirements vary by state and service type. Verify the specific company’s current licensing, certification, insurance, contact details, and written scope before authorizing work.`],
    [`Can one treatment solve every pest problem?`, `No. Eggs, colonies, hidden harborages, structural entry points, neighboring activity, sanitation, moisture, weather, and seasonal pressure may require monitoring, exclusion, repairs, or repeat service.`],
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: `Pest Control in ${city.name}, ${state.code.toUpperCase()}`,
        description: `Local pest-control service directory for ${city.name}, ${state.name}.`,
        isPartOf: { '@id': `${SITE.url}/#website` },
        about: { '@type': 'City', name: city.name, containedInPlace: { '@type': 'State', name: state.name } },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
          { '@type': 'ListItem', position: 2, name: state.name, item: stateUrl(state) },
          { '@type': 'ListItem', position: 3, name: city.name, item: canonical },
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
        <Image src="/images/pest-control-hero.webp" alt={`Pest-control service information for ${city.name}`} fill priority unoptimized className="object-cover opacity-32" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071522] via-[#0b1c2d]/95 to-[#0b1c2d]/55" />
        <div className="relative mx-auto max-w-7xl">
          <nav className="text-sm font-semibold text-slate-300"><Link href="/locations">Locations</Link><span className="mx-2">/</span><a href={stateUrl(state)}>{state.name}</a><span className="mx-2">/</span>{city.name}</nav>
          <span className="mt-8 inline-flex rounded-full bg-emerald-500/15 px-4 py-2 text-xs font-black uppercase tracking-wider text-emerald-200">Local pest-control directory</span>
          <h1 className="mt-5 max-w-4xl font-heading text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl">Pest Control in <span className="text-[#16b7df]">{city.name}, {state.code.toUpperCase()}</span></h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">Compare pest-control services, understand inspection and treatment options, and check independent-provider availability for homes and businesses in {city.name}.</p>
          <div className="mt-8 flex flex-wrap gap-4"><a href={SITE.phoneHref} className="rounded-xl bg-[#f47b20] px-7 py-4 font-black">Call {SITE.phoneDisplay}</a><a href="#services" className="rounded-xl border border-white/25 bg-white/10 px-7 py-4 font-black">View Local Services</a></div>
          <div className="mt-8 flex flex-wrap gap-5 text-sm font-bold text-slate-200">{['Residential & commercial','Inspection-first guidance','Independent providers'].map((item) => <span key={item}>✓ {item}</span>)}</div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4"><div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">{[[pestServices.length.toString(),'Service topics'],[featured.length.toString(),'Priority services'],[state.code.toUpperCase(),'State context'],['Direct','Phone availability check']].map(([value,label],index)=><div key={label} className={`p-6 text-center ${index?'border-l border-slate-200':''}`}><strong className="font-heading text-3xl font-black text-[#0b1c2d]">{value}</strong><p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p></div>)}</div></section>

      <section id="services" className="bg-[#f4f7f9] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[.18em] text-sky-600">Pest services</p>
          <h2 className="mt-3 font-heading text-4xl font-black text-[#0b1c2d]">Pest-control services in {city.name}</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">Choose a service to review warning signs, inspection priorities, treatment considerations, preparation, prevention, and provider questions.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((service, index) => <a key={service.slug} href={cityServiceUrl(state, city, service)} className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><span className="grid h-11 w-11 place-items-center rounded-xl bg-sky-50 font-black text-sky-600">0{index + 1}</span><h3 className="mt-5 font-heading text-xl font-black text-[#0b1c2d] group-hover:text-sky-600">{service.name}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{service.description}</p><span className="mt-5 inline-flex text-sm font-black text-sky-600">View local service →</span></a>)}
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="relative min-h-[430px] overflow-hidden rounded-[2rem] bg-slate-200"><Image src="/images/pest-control-hero.webp" alt={`Pest inspection and treatment planning in ${city.name}`} fill unoptimized className="object-cover" sizes="(min-width:1024px) 50vw,100vw" /></div>
          <div><p className="text-xs font-black uppercase tracking-[.18em] text-sky-600">Local service planning</p><h2 className="mt-3 font-heading text-4xl font-black text-[#0b1c2d]">What a professional service in {city.name} should cover</h2><p className="mt-5 leading-8 text-slate-600">A sound service begins with identification and inspection rather than a generic treatment. The provider should document the evidence, affected areas, likely source, access limitations, moisture, sanitation, entry points, harborage, damage, sensitive occupants, and any conditions that could cause recurrence.</p><p className="mt-4 leading-8 text-slate-600">Request a written scope that identifies treatment areas, products or methods, preparation, safety instructions, re-entry, number of visits, monitoring, repair responsibilities, exclusions, price, and warranty limits. Verify licensing and insurance required in {state.name} before authorizing work.</p><div className="mt-7 grid gap-4 sm:grid-cols-2">{['Accurate pest identification','Interior and exterior inspection','Targeted treatment or removal','Monitoring and follow-up','Moisture and sanitation corrections','Exclusion and repair recommendations'].map((item)=><div key={item} className="flex gap-3 text-sm font-bold text-slate-700"><span className="text-sky-500">✓</span>{item}</div>)}</div></div>
        </div>
      </section>

      <section className="bg-[#0b1c2d] px-4 py-20 text-white"><div className="mx-auto max-w-7xl"><p className="text-xs font-black uppercase tracking-[.18em] text-sky-300">How it works</p><h2 className="mt-3 font-heading text-4xl font-black">A simple local service process</h2><div className="mt-10 grid gap-8 md:grid-cols-4">{[['01','Describe the problem','Share the location, signs, affected areas, property type, and urgency.'],['02','Inspect and identify','The provider confirms evidence, extent, access, source, and contributing conditions.'],['03','Review the scope','Compare the written methods, preparation, safety, price, visits, and exclusions.'],['04','Treat and monitor','Complete the agreed work and document activity, repairs, prevention, and follow-up.']].map(([number,title,text])=><div key={number}><strong className="font-heading text-5xl font-black text-white/15">{number}</strong><h3 className="mt-3 text-xl font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{text}</p></div>)}</div></div></section>

      <section className="px-4 py-20"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_.9fr]"><div><p className="text-xs font-black uppercase tracking-[.18em] text-sky-600">Before hiring</p><h2 className="mt-3 font-heading text-4xl font-black text-[#0b1c2d]">Verify the provider and treatment plan</h2><div className="mt-8 grid gap-4">{[`Verify licensing or certification required in ${state.name}`,'Request inspection findings and the target pest in writing','Confirm products, devices, treatment areas, and preparation','Ask about children, pets, food areas, allergies, and re-entry','Confirm total price, number of visits, exclusions, and warranty','Keep service records and document activity between visits'].map((item)=><div key={item} className="rounded-xl bg-[#f4f7f9] p-5 font-bold text-slate-700"><span className="mr-2 text-sky-500">✓</span>{item}</div>)}</div></div><div><p className="text-xs font-black uppercase tracking-[.18em] text-sky-600">Frequently asked questions</p><h2 className="mt-3 font-heading text-4xl font-black text-[#0b1c2d]">Pest control in {city.name}</h2><div className="mt-8 grid gap-3">{faqs.map(([question,answer])=><details key={question} className="rounded-xl border border-slate-200 bg-white p-5"><summary className="cursor-pointer font-black text-[#0b1c2d]">{question}<span className="float-right text-sky-500">+</span></summary><p className="mt-3 text-sm leading-7 text-slate-600">{answer}</p></details>)}</div><p className="mt-7"><a href={stateUrl(state)} className="font-black text-sky-600">Browse all {state.name} locations →</a></p></div></div></section>

      <section className="bg-[#16b7df] px-4 py-12 text-white"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center"><div><h2 className="font-heading text-3xl font-black">Need pest-control information in {city.name}?</h2><p className="mt-2 text-sky-50">Call to describe the problem and check local independent-provider availability.</p></div><a href={SITE.phoneHref} className="rounded-xl bg-[#0b1c2d] px-7 py-4 font-black">Call {SITE.phoneDisplay}</a></div></section>
    </>
  );
}
