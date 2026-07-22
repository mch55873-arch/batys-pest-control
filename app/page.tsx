import Image from 'next/image';
import Link from 'next/link';
import { pestServices, states, stateUrl } from '@/lib/locations';
import { SITE } from '@/lib/site';

const cityCount = states.reduce((total, state) => total + state.cities.length, 0);
const featuredSlugs = ['emergency-pest-control', 'pest-inspection', 'termite-control', 'bed-bug-treatment', 'rodent-control', 'cockroach-control'];
const featuredServices = featuredSlugs.map((slug) => pestServices.find((service) => service.slug === slug)).filter(Boolean);
const faqItems = [
  ['How do I identify the pest before requesting service?', 'Photograph the pest or damage, note where and when activity appears, and avoid disturbing nests or droppings. An independent provider can confirm identification during an inspection.'],
  ['Are pest-control providers licensed in every state?', 'Requirements differ by state and treatment type. Always verify the provider’s current license, insurance, treatment plan, and product information before hiring.'],
  ['How quickly can a local provider respond?', 'Response times depend on location, season, pest type, and provider capacity. Emergency and same-day availability must be confirmed directly with the matched provider.'],
  ['What information should I request in a quote?', 'Ask for the target pest, inspection findings, treatment areas, products, preparation steps, follow-up schedule, exclusions, warranty terms, and total price in writing.'],
];
const featuredGuides = [
  { title: 'Signs of an active termite problem', category: 'Termites', slug: 'early-signs-of-termite-activity' },
  { title: 'How to prepare for a bed-bug inspection', category: 'Bed Bugs', slug: 'how-to-prepare-for-bed-bug-inspection' },
  { title: 'Rodent entry points to check first', category: 'Rodents', slug: 'mouse-entry-points-homeowners-miss' },
  { title: 'Questions to ask before pest treatment', category: 'Hiring Guide', slug: 'questions-before-pest-treatment' },
];

function LineIcon({ kind, className = 'h-7 w-7' }: { kind: number; className?: string }) {
  const paths = [
    <><path d="M4 13h16M12 5v16M7 8l10 10M17 8 7 18" /><circle cx="12" cy="13" r="8" /></>,
    <><circle cx="11" cy="11" r="6" /><path d="m16 16 5 5M8 11h6M11 8v6" /></>,
    <><path d="M4 19V8l8-4 8 4v11M8 19v-6h8v6M3 19h18" /></>,
    <><path d="M4 17h16v3H4zM6 17V9h12v8M9 9V6h6v3" /></>,
    <><path d="M4 15c3-4 6-6 9-6 4 0 7 3 7 7-4 2-8 2-11 0l-4 3M14 9l2-3M8 12 5 9" /></>,
    <><path d="M12 4v16M7 7l10 10M17 7 7 17M6 12h12" /><circle cx="12" cy="12" r="8" /></>,
  ];
  return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[kind % paths.length]}</svg>;
}

export default function HomePage() {
  return (
    <>
      <section className="relative isolate min-h-[690px] overflow-hidden bg-[#102f52] text-white">
        <Image src="/images/pest-control-hero.webp" alt="Pest-control technician inspecting the exterior of a home" fill priority unoptimized className="object-cover object-[68%_center] opacity-55 lg:opacity-85" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#102f52] via-[#102f52]/95 to-[#102f52]/5 lg:via-[#102f52]/75" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#102f52] to-transparent" />
        <div className="relative mx-auto flex min-h-[690px] max-w-7xl items-center px-4 py-20">
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex items-center gap-3 rounded-full border border-orange-300/30 bg-[#ef9415]/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.17em] text-[#ffd479] backdrop-blur"><span className="h-2 w-2 rounded-full bg-[#ef9415] shadow-[0_0_12px_#bef264]" /> Nationwide Pest-Control Network</p>
            <h1 className="font-heading text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">Find the Right Next Step for Any Pest Problem</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">Research pest issues, compare treatment options, and check availability with independent local pest-control providers across the United States.</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href={SITE.phoneHref} className="rounded-xl bg-[#ef9415] px-6 py-4 font-black text-white shadow-[0_12px_35px_rgba(190,242,100,.2)] transition hover:-translate-y-0.5 hover:bg-[#ffc24a]">Call {SITE.phoneDisplay}</a>
              <Link href="/services" className="rounded-xl border border-white/30 bg-white/10 px-6 py-4 font-black backdrop-blur transition hover:border-orange-300 hover:text-[#ffd479]">Explore Pest Services</Link>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-1 gap-3 text-sm font-bold text-slate-200 sm:grid-cols-3">
              {['50 States + DC', '70 Service Topics', 'Independent Providers'].map((item) => <span key={item} className="flex items-center gap-2"><span className="grid h-5 w-5 place-items-center rounded-full bg-orange-500 text-[10px] text-white">✓</span>{item}</span>)}
            </div>
          </div>
        </div>
        <div className="absolute bottom-7 right-[6%] hidden rounded-2xl border border-white/20 bg-white/95 p-5 text-[#12345b] shadow-2xl backdrop-blur xl:block">
          <p className="text-[10px] font-black uppercase tracking-[.18em] text-[#df8309]">A clearer process</p><p className="mt-1 font-heading text-lg font-black">Identify. Compare. Connect.</p><p className="mt-1 max-w-[260px] text-xs leading-5 text-slate-500">Understand the problem before choosing an independent provider.</p>
        </div>
      </section>

      <section className="relative z-10 -mt-1 bg-white px-4">
        <div className="mx-auto grid max-w-7xl grid-cols-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_22px_60px_rgba(15,23,42,.08)] lg:grid-cols-4">
          {[[51, 'States & DC'], [`${cityCount.toLocaleString('en-US')}+`, 'Location Routes'], [pestServices.length, 'Service Topics'], ['24/7', 'Directory Access']].map(([value, label], index) => <div key={label} className={`p-6 text-center ${index % 2 ? 'border-l' : ''} lg:border-l first:lg:border-l-0`}><strong className="block font-heading text-3xl font-black text-[#df8309]">{value}</strong><span className="mt-1 block text-xs font-bold uppercase tracking-wider text-slate-500">{label}</span></div>)}
        </div>
      </section>

      <section className="px-4 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[.9fr_1.1fr]">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#12345b] p-9 text-white shadow-2xl sm:p-12">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[45px] border-orange-300/10" />
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-[#ef9415] text-white"><LineIcon kind={1} className="h-9 w-9" /></span>
            <p className="relative mt-16 max-w-lg font-heading text-4xl font-black leading-tight">Better information makes for a better pest-control decision.</p>
            <div className="relative mt-9 grid grid-cols-3 gap-3 text-center text-xs font-black uppercase tracking-wider"><span className="rounded-xl bg-white/10 p-4">Identify</span><span className="rounded-xl bg-white/10 p-4">Compare</span><span className="rounded-xl bg-[#ef9415] p-4 text-white">Connect</span></div>
          </div>
          <div>
            <p className="eyebrow">About Batys Pest Control</p>
            <h2 className="section-title">Nationwide pest information, organized around your location</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">Batys connects pest entities, service intent, state, and city into a clear research path. Learn what to look for, what to ask, and how to check local provider availability.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {['Coverage across 50 states and Washington, DC','Residential and commercial pest topics','Inspection, treatment and prevention guidance','Clear independent-provider disclosure'].map((item) => <div key={item} className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-bold text-slate-700"><span className="text-[#e98b00]">✓</span>{item}</div>)}
            </div>
            <Link href="/about" className="mt-8 inline-flex items-center gap-2 font-black text-[#df8309]">How our network works <span>→</span></Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f7f5] px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div><p className="eyebrow">Core Pest Services</p><h2 className="section-title max-w-3xl">Start with the pest problem you need to solve</h2></div><Link href="/services" className="font-black text-[#df8309]">Explore all 70 services →</Link></div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service, index) => service && <article key={service.slug} className="service-card group">
              <div className="flex items-start justify-between"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-orange-50 text-[#df8309] transition group-hover:bg-[#ef9415] group-hover:text-white"><LineIcon kind={index} /></span><span className="rounded-full bg-orange-50 px-3 py-1 text-[9px] font-black uppercase tracking-wider text-[#b96800]">Nationwide</span></div>
              <h3 className="mt-7 font-heading text-2xl font-black text-[#12345b]">{service.name}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{service.description}</p><Link href={`/services/${service.slug}`} className="mt-6 inline-flex font-black text-[#df8309]">View service details →</Link>
            </article>)}
          </div>
          <div className="mt-9 flex flex-wrap gap-2">{pestServices.slice(6, 24).map((service) => <Link key={service.slug} href={`/services/${service.slug}`} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 transition hover:border-emerald-500 hover:text-[#df8309]">{service.name}</Link>)}</div>
        </div>
      </section>

      <section className="px-4 py-24">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-[#12345b] text-white shadow-2xl lg:grid-cols-[1fr_1.15fr]">
          <div className="bg-gradient-to-br from-[#184a78] to-[#102f52] p-9 sm:p-12"><p className="text-xs font-black uppercase tracking-[.18em] text-[#ffd479]">How it works</p><h2 className="mt-4 font-heading text-4xl font-black">A simple path from question to local help</h2><p className="mt-5 leading-7 text-blue-50/80">Use the network to research first, then confirm every service detail directly with the independent provider.</p><a href={SITE.phoneHref} className="mt-8 inline-flex rounded-xl bg-[#ef9415] px-5 py-4 font-black text-white">Call {SITE.phoneDisplay}</a></div>
          <div className="grid gap-7 p-9 sm:p-12">{['Choose the pest or service topic','Select your state and city','Review treatment and hiring questions','Check independent provider availability'].map((item, index) => <div key={item} className="flex gap-5"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-orange-300/30 bg-[#ef9415]/10 font-heading text-xl font-black text-[#ffd479]">0{index + 1}</span><div><h3 className="font-heading text-xl font-black">{item}</h3><p className="mt-1 text-sm leading-6 text-slate-400">Move through relevant information without losing the location and service context.</p></div></div>)}</div>
        </div>
      </section>

      <section className="bg-[#12345b] px-4 py-24 text-white">
        <div className="mx-auto max-w-7xl"><p className="text-xs font-black uppercase tracking-[.18em] text-[#ffc24a]">Nationwide Coverage</p><h2 className="mt-4 max-w-3xl font-heading text-4xl font-black sm:text-5xl">Pest-control information across every state</h2><p className="mt-5 max-w-3xl leading-7 text-slate-300">Select a state to browse its city hierarchy and locally organized pest-service topics.</p>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">{states.map((state) => <Link key={state.code} href={stateUrl(state)} className="group rounded-xl border border-white/10 bg-white/[.04] px-4 py-4 transition hover:-translate-y-0.5 hover:border-orange-300/60 hover:bg-white/[.08]"><span className="font-bold group-hover:text-[#ffd479]">{state.name}</span><span className="mt-1 block text-[11px] text-slate-500">{state.cities.length.toLocaleString('en-US')} locations</span></Link>)}</div>
        </div>
      </section>

      <section className="bg-[#f4f7f5] px-4 py-24">
        <div className="mx-auto max-w-7xl"><p className="eyebrow">Knowledge Base</p><div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><h2 className="section-title max-w-3xl">Practical pest identification and treatment guides</h2><Link href="/blog" className="font-black text-[#df8309]">Read all 26 guides →</Link></div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">{featuredGuides.map((guide, index) => <article key={guide.slug} className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className="grid h-11 w-11 place-items-center rounded-xl bg-[#12345b] text-[#ffc24a]"><LineIcon kind={index + 1} className="h-5 w-5" /></div><p className="mt-6 text-[10px] font-black uppercase tracking-[.17em] text-[#df8309]">{guide.category}</p><h3 className="mt-3 font-heading text-xl font-black leading-snug">{guide.title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">Practical information for documenting the issue and discussing the next step.</p><Link href={`/blog/${guide.slug}`} className="mt-5 inline-flex text-sm font-black text-[#df8309]">Read guide →</Link></article>)}</div>
        </div>
      </section>

      <section className="px-4 py-24"><div className="mx-auto max-w-4xl"><p className="text-center eyebrow">Frequently Asked Questions</p><h2 className="section-title text-center">Questions to ask before treatment</h2><div className="mt-10 grid gap-4">{faqItems.map(([question, answer]) => <details key={question} className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm"><summary className="cursor-pointer list-none font-heading text-lg font-black after:float-right after:text-[#e98b00] after:content-['+'] group-open:after:content-['−']">{question}</summary><p className="mt-4 border-t border-slate-100 pt-4 leading-7 text-slate-600">{answer}</p></details>)}</div></div></section>

      <section className="bg-[#ef9415] px-4 py-12 text-white"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center"><div><p className="text-xs font-black uppercase tracking-[.17em]">Local provider availability</p><h2 className="mt-2 font-heading text-3xl font-black">Need pest-control help in your area?</h2><p className="mt-2 font-medium text-[#12345b]/80">Choose your location and service, or call to check availability.</p></div><div className="flex flex-wrap gap-3"><a href={SITE.phoneHref} className="rounded-xl bg-[#12345b] px-6 py-4 font-black text-white">Call {SITE.phoneDisplay}</a><Link href="/contact" className="rounded-xl border border-emerald-950/15 bg-white px-6 py-4 font-black">Request Availability</Link></div></div></section>
    </>
  );
}
