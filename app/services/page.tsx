import type { Metadata } from 'next';
import Link from 'next/link';
import { pestServices } from '@/lib/locations';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Complete Pest Control Services',
  description: 'Explore residential, commercial, inspection, treatment, removal, and prevention services available through independent pest-control providers across the United States.',
  alternates: { canonical: '/services' },
};

const primarySlugs = [
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

const serviceIcons = ['⚡', '⌂', '◉', '↗', '✓', '☼', '◆', '▣', '▤'];

export default function ServicesPage() {
  const primary = primarySlugs
    .map((slug) => pestServices.find((service) => service.slug === slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));
  const categories = Array.from(new Set(pestServices.map((service) => service.category)));
  const installationStyle = pestServices.filter((service) => /inspection|prevention|proof|exclusion|monitor/i.test(`${service.name} ${service.slug}`)).slice(0, 10);
  const treatmentStyle = pestServices.filter((service) => !installationStyle.includes(service)).slice(0, 12);

  return (
    <>
      <section className="bg-[#0b1c2d] px-4 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl">
          <nav className="text-sm font-semibold text-slate-300"><Link href="/">Home</Link><span className="mx-2">/</span>Services</nav>
          <h1 className="mt-8 max-w-4xl font-heading text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl">Complete Pest Control Services <span className="text-[#16b7df]">Across the USA</span></h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">Choose a pest, inspection need, treatment method, or property type. Every service page explains the warning signs, expected process, preparation, prevention, and questions to ask before hiring an independent provider.</p>
        </div>
      </section>

      <section className="bg-[#f4f7f9] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-heading text-4xl font-black text-[#0b1c2d]">Our Pest Control Services</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-600">Dedicated service pages are linked below. Not sure which service fits the problem? Call and describe the pest signs, affected areas, property type, and urgency.</p>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {primary.map((service, index) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-sky-50 text-lg font-black text-sky-600">{serviceIcons[index] ?? '✓'}</span>
                <h3 className="mt-6 font-heading text-xl font-black text-[#0b1c2d] group-hover:text-sky-600">{service.name}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{service.description}</p>
                <span className="mt-5 inline-flex text-sm font-black text-sky-600">Learn more →</span>
              </Link>
            ))}
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <section className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-8">
              <h2 className="font-heading text-2xl font-black text-[#0b1c2d]">Inspection, Prevention & Exclusion Services</h2>
              <div className="mt-6 grid gap-x-7 gap-y-3 sm:grid-cols-2">
                {installationStyle.map((service) => <Link key={service.slug} href={`/services/${service.slug}`} className="text-sm font-bold leading-6 text-slate-600 hover:text-sky-600"><span className="mr-2 text-sky-500">✓</span>{service.name}</Link>)}
              </div>
              <Link href="/services/pest-inspection" className="mt-6 inline-flex text-sm font-black text-sky-600">View inspection details →</Link>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-8">
              <h2 className="font-heading text-2xl font-black text-[#0b1c2d]">Treatment, Removal & Control Services</h2>
              <div className="mt-6 grid gap-x-7 gap-y-3 sm:grid-cols-2">
                {treatmentStyle.map((service) => <Link key={service.slug} href={`/services/${service.slug}`} className="text-sm font-bold leading-6 text-slate-600 hover:text-sky-600"><span className="mr-2 text-sky-500">✓</span>{service.name}</Link>)}
              </div>
              <Link href="/services/general-pest-control" className="mt-6 inline-flex text-sm font-black text-sky-600">View treatment details →</Link>
            </section>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 text-center">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-heading text-3xl font-black text-[#0b1c2d]">Pests and Property Types We Cover</h2>
          <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">Research common household pests, wood-destroying insects, rodents, wildlife, mosquitoes, stored-product pests, and commercial facility concerns.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-x-10 gap-y-4 text-lg font-black text-slate-500">{['Termites','Bed Bugs','Rodents','Cockroaches','Ants','Mosquitoes','Wildlife'].map((item) => <span key={item}>{item}</span>)}</div>
        </div>
      </section>

      <section className="bg-[#f4f7f9] px-4 py-16 text-center">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-heading text-4xl font-black text-[#0b1c2d]">Serving All 50 States and Washington, DC</h2>
          <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">Every service above connects to state and city routes so visitors can keep the correct geographic context while reviewing pest-control options.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">{['California','Texas','Florida','New York','Pennsylvania','Ohio'].map((state) => <span key={state} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700">{state}</span>)}<Link href="/locations" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-sky-600">All service areas →</Link></div>
        </div>
      </section>

      <section className="bg-[#16b7df] px-4 py-12 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
          <div><h2 className="font-heading text-3xl font-black">Not Sure Which Service You Need?</h2><p className="mt-2 text-sky-50">Call and describe what is happening. Provider availability, licensing, methods, and pricing must be confirmed directly.</p></div>
          <a href={SITE.phoneHref} className="rounded-xl bg-[#0b1c2d] px-7 py-4 font-black text-white">Call {SITE.phoneDisplay}</a>
        </div>
      </section>

      <section className="bg-[#0b1c2d] px-4 py-14 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div><h2 className="font-heading text-xl font-black">Batys Pest Control</h2><p className="mt-4 text-sm leading-7 text-slate-400">Pest-control information and independent-provider referral routes organized by service, state, and city.</p></div>
          <div><h2 className="font-heading font-black">Services</h2><div className="mt-4 grid gap-3 text-sm text-slate-400">{primary.slice(0,4).map((service)=><Link key={service.slug} href={`/services/${service.slug}`}>{service.name}</Link>)}<Link href="/services">All Services →</Link></div></div>
          <div><h2 className="font-heading font-black">Service Areas</h2><div className="mt-4 grid gap-3 text-sm text-slate-400"><Link href="/locations">All States</Link><Link href="/locations">Cities & Communities</Link><Link href="/articles">Pest Guides</Link></div></div>
          <div><h2 className="font-heading font-black">Get in Touch</h2><div className="mt-4 grid gap-3 text-sm text-slate-400"><a href={SITE.phoneHref}>{SITE.phoneDisplay}</a><Link href="/contact">Request Availability</Link><span>Coverage varies by location</span></div></div>
        </div>
      </section>
    </>
  );
}
