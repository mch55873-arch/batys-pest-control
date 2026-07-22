import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { findService, pestServices } from '@/lib/locations';
import { SITE } from '@/lib/site';

type Props = { params: Promise<{ service: string }> };

export function generateStaticParams() {
  return pestServices.map((service) => ({ service: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const service = findService(serviceSlug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} | Batys Pest Control`,
      description: service.description,
      type: 'website',
      images: [{ url: '/images/pest-control-hero.webp', alt: `${service.name} service information` }],
    },
  };
}

const baseFaqs = [
  ['When should I request a professional inspection?', 'Request an inspection when activity is recurring, identification is uncertain, damage or contamination is possible, nests or entry points are difficult to reach, or do-it-yourself measures have not resolved the source.'],
  ['What should a written quote include?', 'It should identify the target pest, treatment areas, products or methods, preparation steps, number of visits, exclusions, follow-up, warranty terms, and total price.'],
  ['Are pest-control requirements the same in every state?', 'No. Licensing, certification, notification, recordkeeping, wildlife handling, and product-use requirements vary. Confirm the provider’s current credentials and the rules that apply where the property is located.'],
  ['How should I prepare for treatment?', 'Preparation depends on the pest and method. Follow only the written instructions supplied by the provider, especially for food storage, pets, children, linens, furniture, ventilation, and re-entry times.'],
  ['How long should results take?', 'Timing depends on the pest, life stage, infestation size, treatment method, neighboring activity, weather, building conditions, and whether sanitation, moisture, exclusion, or repair work is completed.'],
];

const warningSigns = [
  'Repeated sightings, trails, droppings, shed skins, eggs, nests, or webbing',
  'Bites, stings, scratching sounds, odors, stains, or unexplained contamination',
  'Damage to wood, wiring, insulation, stored food, fabrics, packaging, or landscaping',
  'Activity around moisture, kitchens, bathrooms, drains, attics, garages, or crawl spaces',
  'Visible gaps, damaged screens, roof openings, utility penetrations, or burrows',
  'Pest activity returning after cleaning, sealing, trapping, baiting, or spraying',
];

const handledItems = [
  'Interior and exterior inspection',
  'Pest identification and evidence review',
  'Harborage, nesting, entry-point, and moisture assessment',
  'Targeted treatment, trapping, baiting, removal, or monitoring where appropriate',
  'Sanitation, storage, drainage, vegetation, and exclusion recommendations',
  'Written preparation, safety, re-entry, and follow-up instructions',
  'Progress checks and activity documentation',
  'Referral to repair, medical, veterinary, or wildlife specialists when required',
];

export default async function ServicePage({ params }: Props) {
  const { service: serviceSlug } = await params;
  const service = findService(serviceSlug);
  if (!service) notFound();

  const related = pestServices
    .filter((item) => item.category === service.category && item.slug !== service.slug)
    .slice(0, 5);
  const faqs = [
    [`What does ${service.name.toLowerCase()} normally include?`, `The scope should be based on an inspection and may include identification, evidence mapping, targeted treatment or removal, monitoring, exclusion, sanitation or moisture corrections, written preparation, and follow-up. The exact scope must be confirmed by the provider.`],
    ...baseFaqs,
  ];

  const canonical = `${SITE.url}/services/${service.slug}`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${canonical}#service`,
        name: service.name,
        description: service.description,
        url: canonical,
        provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
        areaServed: { '@type': 'Country', name: 'United States' },
        serviceType: service.category,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE.url}/services` },
          { '@type': 'ListItem', position: 3, name: service.name, item: canonical },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(([question, answer]) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />

      <section className="relative isolate overflow-hidden bg-[#0b1c2d] px-4 py-16 text-white sm:py-20">
        <Image src="/images/pest-control-hero.webp" alt={`${service.name} inspection and treatment planning`} fill priority unoptimized className="object-cover opacity-35" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071522] via-[#0b1c2d]/95 to-[#0b1c2d]/55" />
        <div className="relative mx-auto max-w-7xl">
          <nav className="text-sm font-semibold text-slate-300"><Link href="/">Home</Link><span className="mx-2">/</span><Link href="/services">Services</Link><span className="mx-2">/</span>{service.name}</nav>
          <span className="mt-7 inline-flex rounded-full bg-emerald-500/15 px-4 py-2 text-xs font-black uppercase tracking-wider text-emerald-200">Provider availability varies by location</span>
          <h1 className="mt-5 max-w-4xl font-heading text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl">{service.name} <span className="text-[#16b7df]">Near You</span></h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">{service.description} Review the service scope below, then confirm local coverage, credentials, methods, pricing, preparation, and follow-up directly with the independent provider.</p>
          <div className="mt-8 flex flex-wrap gap-4"><a href={SITE.phoneHref} className="rounded-xl bg-[#f47b20] px-7 py-4 font-black text-white">Call {SITE.phoneDisplay}</a><Link href="/contact" className="rounded-xl border border-white/30 bg-white/10 px-7 py-4 font-black">Request Information</Link></div>
        </div>
      </section>

      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article>
            <h2 className="max-w-3xl font-heading text-4xl font-black leading-tight text-[#0b1c2d]">Professional {service.name.toLowerCase()} starts with accurate identification</h2>
            <p className="mt-5 text-[17px] leading-8 text-slate-600">A reliable service does not begin with a generic spray or a promise that one visit will solve every problem. It begins with evidence: what was seen, where it appeared, when activity occurs, how often it returns, what damage or contamination is present, and which conditions may be supporting it. Similar insects, droppings, bites, noises, odors, stains, damaged materials, and nesting signs can have different causes. The provider should document the observations and explain how those observations support the identification.</p>
            <p className="mt-5 text-[17px] leading-8 text-slate-600">The inspection should cover the immediate activity zone and the surrounding structure. Depending on the property and pest, that may include kitchens, bathrooms, bedrooms, basements, attics, crawl spaces, garages, storage areas, utility penetrations, drains, roof edges, siding, landscaping, waste areas, loading zones, neighboring rooms, and adjoining units. Any inaccessible areas or uncertainty should be stated clearly rather than hidden behind a broad treatment recommendation.</p>

            <h2 className="mt-12 font-heading text-2xl font-black text-[#0b1c2d]">Warning signs that justify an inspection</h2>
            <p className="mt-3 leading-7 text-slate-600">The following signs do not always prove an active infestation, but recurring or combined evidence warrants closer assessment:</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">{warningSigns.map((item) => <div key={item} className="rounded-xl bg-[#f5f7f9] p-5 text-sm font-bold leading-6 text-slate-700"><span className="mr-2 text-[#f47b20]">△</span>{item}</div>)}</div>

            <h2 className="mt-12 font-heading text-2xl font-black text-[#0b1c2d]">What this service may handle</h2>
            <p className="mt-3 leading-7 text-slate-600">The correct combination depends on inspection findings, pest biology, building type, occupant sensitivity, local rules, and the source of activity. A written plan may include:</p>
            <div className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">{handledItems.map((item) => <div key={item} className="text-sm font-bold leading-6 text-slate-600"><span className="mr-2 text-sky-500">✓</span>{item}</div>)}</div>

            <h2 className="mt-12 font-heading text-2xl font-black text-[#0b1c2d]">What to confirm before authorizing work</h2>
            <p className="mt-3 leading-7 text-slate-600">Request a written scope that connects every proposed action to an inspection finding. Confirm the target pest, affected areas, treatment and monitoring locations, products or devices, preparation, re-entry, ventilation, cleanup, number of visits, progress measures, repair responsibilities, exclusions, total price, payment terms, cancellation terms, and warranty limits. Tell the provider about children, pregnancy, pets, aquariums, respiratory conditions, allergies, food preparation, medical equipment, employees, tenants, and other sensitive conditions.</p>
            <p className="mt-5 leading-7 text-slate-600">Do not move infested furniture, seal an active animal or stinging-insect opening, disturb professional bait placements, mix products, or discard evidence unless the provider or product label directs you to do so. Those actions can spread activity, trap pests inside, increase exposure, or make the treatment harder to evaluate. For bites, stings, poisoning, allergic reactions, or illness, contact the appropriate medical, veterinary, poison-control, or emergency service.</p>

            <h2 className="mt-12 font-heading text-2xl font-black text-[#0b1c2d]">After service: monitoring and prevention</h2>
            <p className="mt-3 leading-7 text-slate-600">Post-service expectations depend on the pest and method. Some visible activity may decline quickly, while eggs, pupae, hidden colonies, bait uptake, trap response, seasonal pressure, or animals outside the structure may require time and repeat evaluation. Ask what activity is expected during the first day, week, and month; what evidence shows progress; and what should trigger a callback.</p>
            <p className="mt-5 leading-7 text-slate-600">Long-term control usually requires source correction. That can include repairing leaks, improving drainage, reducing humidity, cleaning food residue, securing waste, rotating stock, storing food and pet feed in durable containers, trimming vegetation, removing clutter, repairing screens and door sweeps, sealing utility gaps, correcting roof or siding defects, and documenting new signs. The objective is not merely fewer visible pests after one visit; it is a verified reduction in activity and a practical plan for preventing recurrence.</p>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl bg-[#0b1c2d] p-6 text-white shadow-xl"><h2 className="font-heading text-2xl font-black">Need Service Information?</h2><p className="mt-3 text-sm leading-6 text-slate-300">Call and describe the location, pest evidence, affected rooms or structures, and urgency.</p><a href={SITE.phoneHref} className="mt-5 block rounded-xl bg-[#f47b20] px-5 py-4 text-center font-black">{SITE.phoneDisplay}</a><Link href="/contact" className="mt-3 block rounded-xl border border-white/20 bg-white/10 px-5 py-4 text-center font-black">Request a Quote</Link></div>
            <div className="rounded-2xl bg-emerald-50 p-6 text-emerald-900"><p className="font-black">Before hiring</p><p className="mt-2 text-sm leading-6">Verify licensing and insurance required in your state. Compare written scopes rather than headline prices.</p></div>
            <div className="rounded-2xl bg-[#f5f7f9] p-6"><h2 className="font-heading text-xl font-black text-[#0b1c2d]">Related Services</h2><div className="mt-4 grid gap-3">{related.map((item) => <Link key={item.slug} href={`/services/${item.slug}`} className="text-sm font-bold text-sky-600">→ {item.name}</Link>)}<Link href="/services" className="text-sm font-black text-sky-600">→ All Pest Control Services</Link></div></div>
          </aside>
        </div>
      </section>

      <section className="bg-[#f4f7f9] px-4 py-16">
        <div className="mx-auto max-w-7xl"><h2 className="text-center font-heading text-4xl font-black text-[#0b1c2d]">Our Simple Service Process</h2><div className="mt-10 grid gap-5 md:grid-cols-4">{[
          ['01','Call & Describe','Share the property location, signs, affected areas, and urgency.'],
          ['02','Inspect & Identify','The provider confirms evidence, access, extent, and contributing conditions.'],
          ['03','Review the Scope','Approve a written plan covering methods, preparation, price, and follow-up.'],
          ['04','Treat & Monitor','Complete the agreed work, document results, and correct recurrence risks.'],
        ].map(([number,title,text]) => <div key={number} className="rounded-2xl bg-white p-6 shadow-sm"><strong className="font-heading text-3xl font-black text-sky-200">{number}</strong><h3 className="mt-3 font-black text-[#0b1c2d]">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></div>)}</div></div>
      </section>

      <section className="px-4 py-16 text-center"><div className="mx-auto max-w-5xl"><h2 className="font-heading text-4xl font-black text-[#0b1c2d]">Serving Cities and Communities Nationwide</h2><p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">Browse state and city pages for location-specific service routes. Coverage, response time, licensing, diagnosis, methods, and pricing must be confirmed directly.</p><div className="mt-7 flex flex-wrap justify-center gap-3">{['California','Texas','Florida','New York','Pennsylvania','Ohio'].map((item)=><span key={item} className="rounded-full bg-[#f5f7f9] px-4 py-2 text-sm font-bold text-slate-700">{item}</span>)}<Link href="/locations" className="rounded-full bg-[#f5f7f9] px-4 py-2 text-sm font-black text-sky-600">All Areas →</Link></div></div></section>

      <section className="bg-[#f4f7f9] px-4 py-16"><div className="mx-auto max-w-4xl"><h2 className="text-center font-heading text-4xl font-black text-[#0b1c2d]">{service.name} FAQs</h2><div className="mt-9 space-y-3">{faqs.map(([question, answer]) => <details key={question} className="rounded-xl border border-slate-200 bg-white p-5"><summary className="cursor-pointer font-black text-[#0b1c2d]">{question}<span className="float-right text-sky-500">+</span></summary><p className="mt-3 leading-7 text-slate-600">{answer}</p></details>)}</div></div></section>

      <section className="bg-[#16b7df] px-4 py-12 text-white"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center"><div><h2 className="font-heading text-3xl font-black">Need {service.name.toLowerCase()} information today?</h2><p className="mt-2 text-sky-50">Call to check independent-provider availability in your area.</p></div><a href={SITE.phoneHref} className="rounded-xl bg-[#0b1c2d] px-7 py-4 font-black">Call {SITE.phoneDisplay}</a></div></section>
    </>
  );
}
