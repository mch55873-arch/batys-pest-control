import type { Metadata } from 'next';
import Link from 'next/link';
import { pestServices } from '@/lib/locations';

export const metadata: Metadata = {
  title: 'Pest Control Services',
  description: 'Explore pest-control services, inspections, treatments, prevention options, and commercial pest-management topics.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  const categories = Array.from(new Set(pestServices.map((service) => service.category)));
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <p className="font-bold uppercase tracking-widest text-emerald-700">Service directory</p>
      <h1 className="mt-2 font-heading text-5xl font-black">Pest-control services and treatment topics</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Choose a pest or service intent to understand what the work may involve, what to look for, and which local provider category fits the problem.</p>
      <div className="mt-14 space-y-14">
        {categories.map((category) => (
          <section key={category} aria-labelledby={`category-${category.replace(/\W+/g, '-')}`}>
            <h2 id={`category-${category.replace(/\W+/g, '-')}`} className="font-heading text-3xl font-bold text-emerald-950">{category}</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {pestServices.filter((service) => service.category === category).map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`} className="group rounded-2xl border border-slate-200 p-6 hover:border-emerald-500 hover:shadow-md">
                  <h3 className="font-heading text-xl font-bold group-hover:text-emerald-800">{service.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
