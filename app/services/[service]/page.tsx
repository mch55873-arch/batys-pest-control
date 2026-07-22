import type { Metadata } from 'next';
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
  };
}

export default async function ServicePage({ params }: Props) {
  const { service: serviceSlug } = await params;
  const service = findService(serviceSlug);
  if (!service) notFound();
  const related = pestServices.filter((item) => item.category === service.category && item.slug !== service.slug).slice(0, 6);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    areaServed: { '@type': 'Country', name: 'United States' },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="bg-emerald-950 px-4 py-20 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="font-bold uppercase tracking-widest text-lime-300">{service.category}</p>
          <h1 className="mt-3 font-heading text-5xl font-black md:text-6xl">{service.name}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-emerald-50/80">{service.description}</p>
        </div>
      </section>
      <div className="mx-auto grid max-w-5xl gap-12 px-4 py-16 lg:grid-cols-[1fr_280px]">
        <article className="prose prose-slate max-w-none">
          <h2>When to request professional help</h2>
          <p>Recurring activity, property damage, contamination concerns, difficult-to-reach nesting, and unsuccessful do-it-yourself efforts are common reasons to request an inspection. A qualified provider should first identify the pest and conditions supporting it before recommending treatment.</p>
          <h2>What a service request should cover</h2>
          <ul>
            <li>The pest signs, locations, and time of day activity occurs</li>
            <li>How long the problem has been present and what has already been tried</li>
            <li>Children, pets, allergies, or other treatment considerations</li>
            <li>Inspection findings, treatment scope, preparation, and follow-up</li>
          </ul>
          <h2>Provider verification</h2>
          <p>Pesticide licensing and certification requirements vary by state. Confirm the independent provider’s current credentials, treatment plan, written estimate, and product instructions before work begins.</p>
          <p><Link href="/locations">Choose your state and city</Link> to view locally organized pest information.</p>
        </article>
        <aside>
          <h2 className="font-heading text-xl font-bold">Related topics</h2>
          <div className="mt-4 grid gap-3">
            {related.map((item) => <Link key={item.slug} href={`/services/${item.slug}`} className="rounded-xl border border-slate-200 p-4 text-sm font-semibold hover:border-emerald-500">{item.name}</Link>)}
          </div>
        </aside>
      </div>
    </>
  );
}
