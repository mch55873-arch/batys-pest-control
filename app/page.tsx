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

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#07172d] px-4 py-16 text-white lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(163,230,53,.17),transparent_30%),radial-gradient(circle_at_85%_75%,rgba(16,185,129,.14),transparent_32%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.25fr_.75fr]">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-lime-300/30 bg-lime-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-lime-300">Nationwide Pest-Control Information & Provider Network</p>
            <h1 className="max-w-4xl font-heading text-5xl font-black leading-[1.05] md:text-7xl">Pest Control Services Across the United States</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Understand your pest problem, compare treatment topics, and request availability from independent local pest-control providers serving your area.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={SITE.phoneHref} className="rounded-xl bg-lime-400 px-6 py-4 font-black text-emerald-950 hover:bg-lime-300">Call {SITE.phoneDisplay}</a>
              <Link href="/services" className="rounded-xl border border-white/25 px-6 py-4 font-black hover:border-lime-300 hover:text-lime-300">View Pest Services</Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-2 text-sm font-bold text-slate-300">
              <span>✓ 50 States + DC</span><span>✓ 70 Service Topics</span><span>✓ Independent Providers</span>
            </div>
          </div>
          <form action="/contact" className="rounded-2xl bg-white p-7 text-slate-900 shadow-2xl">
            <p className="text-xs font-black uppercase tracking-widest text-emerald-700">Local provider request</p>
            <h2 className="mt-2 font-heading text-3xl font-black text-[#07172d]">Check Pest-Control Availability</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">Tell us where help is needed. Provider coverage and response times vary.</p>
            <div className="mt-6 grid gap-3">
              <label className="grid gap-1 text-xs font-bold text-slate-600">Your name<input name="name" className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500" /></label>
              <label className="grid gap-1 text-xs font-bold text-slate-600">City and state<input name="location" required className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500" /></label>
              <label className="grid gap-1 text-xs font-bold text-slate-600">Pest or service needed<select name="service" className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500"><option value="">Select a pest topic</option>{pestServices.slice(0, 20).map((service) => <option key={service.slug} value={service.slug}>{service.name}</option>)}</select></label>
              <button className="mt-2 rounded-lg bg-emerald-600 px-5 py-4 font-black text-white hover:bg-emerald-700">Request Local Availability →</button>
            </div>
            <p className="mt-4 text-[11px] leading-5 text-slate-400">By continuing, you acknowledge that Batys may connect you with independent providers. Verify licensing, pricing, and treatment details before hiring.</p>
          </form>
        </div>
      </section>

      <section className="border-b bg-white px-4 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-10 gap-y-2 text-xs font-black uppercase tracking-wide text-slate-600"><span>🛡 Provider verification encouraged</span><span>⌖ Nationwide location coverage</span><span>✓ Transparent referral role</span></div>
      </section>

      <section className="bg-slate-50 px-4 py-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 text-center lg:grid-cols-4">
          <div><strong className="block text-3xl text-emerald-700">51</strong><span className="text-sm text-slate-600">States & DC</span></div>
          <div><strong className="block text-3xl text-emerald-700">{cityCount.toLocaleString('en-US')}+</strong><span className="text-sm text-slate-600">Location Routes</span></div>
          <div><strong className="block text-3xl text-emerald-700">{pestServices.length}</strong><span className="text-sm text-slate-600">Service Intents</span></div>
          <div><strong className="block text-3xl text-emerald-700">24/7</strong><span className="text-sm text-slate-600">Online Directory Access</span></div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="relative min-h-[420px] overflow-hidden rounded-3xl bg-[#07172d] p-10 text-white shadow-xl">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-lime-400/20" />
            <p className="text-7xl">🛡️</p>
            <p className="mt-20 max-w-md font-heading text-4xl font-black">Clear pest information before you choose a provider.</p>
            <div className="mt-8 grid grid-cols-3 gap-3 text-center text-xs font-bold"><span className="rounded-xl bg-white/10 p-4">Identify</span><span className="rounded-xl bg-white/10 p-4">Compare</span><span className="rounded-xl bg-white/10 p-4">Connect</span></div>
          </div>
          <div>
            <p className="font-black uppercase tracking-widest text-emerald-700">About Batys Pest Control</p>
            <h2 className="mt-3 font-heading text-4xl font-black text-[#07172d]">A Nationwide Pest Information & Referral Network</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">Batys organizes pest-control information by pest entity, service intent, state, and city. The goal is to help property owners understand the next step and find available independent providers.</p>
            <ul className="mt-7 grid gap-4 text-slate-700">
              <li>✓ Coverage architecture across all 50 states and Washington, DC</li>
              <li>✓ Residential, commercial, inspection, prevention, and treatment topics</li>
              <li>✓ Clear disclosure that providers are independent local businesses</li>
            </ul>
            <Link href="/about" className="mt-8 inline-flex rounded-xl bg-[#07172d] px-6 py-4 font-black text-white">Learn More About Us →</Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-black uppercase tracking-widest text-emerald-700">Core Pest Services</p>
          <h2 className="mt-3 font-heading text-4xl font-black text-[#07172d]">Popular Pest-Control Services Across the USA</h2>
          <p className="mt-4 max-w-3xl text-slate-600">Start with a high-demand pest or service type, then narrow the information to your state and city.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service, index) => service && (
              <article key={service.slug} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex h-32 items-center justify-between bg-[#07172d] px-7 text-white"><span className="text-4xl">{['⚡','🔎','🪵','🛏️','🐭','🪳'][index]}</span><span className="rounded-full bg-lime-400 px-3 py-1 text-[10px] font-black uppercase text-emerald-950">Nationwide topic</span></div>
                <div className="p-6"><h3 className="font-heading text-xl font-black text-[#07172d]">{service.name}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{service.description}</p><Link href={`/services/${service.slug}`} className="mt-5 inline-flex text-sm font-black text-emerald-700">Learn More →</Link></div>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2">{pestServices.slice(6, 24).map((service) => <Link key={service.slug} href={`/services/${service.slug}`} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600">✓ {service.name}</Link>)}</div>
          <div className="mt-9 text-center"><Link href="/services" className="inline-flex rounded-xl bg-emerald-600 px-6 py-4 font-black text-white">View All 70 Pest Services →</Link></div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <p className="font-black uppercase tracking-widest text-emerald-700">Why Use Batys</p>
            <h2 className="mt-3 font-heading text-4xl font-black text-[#07172d]">A Clearer Way to Research Local Pest Help</h2>
            <div className="mt-9 grid gap-6">
              <div className="rounded-2xl border p-6"><h3 className="font-heading text-xl font-black">⚡ Location-first navigation</h3><p className="mt-2 text-slate-600">Move from state to city to the exact pest service without losing geographic relevance.</p></div>
              <div className="rounded-2xl border p-6"><h3 className="font-heading text-xl font-black">🛡 Independent-provider transparency</h3><p className="mt-2 text-slate-600">Licensing, availability, methods, and pricing are verified directly with the provider.</p></div>
              <div className="rounded-2xl border p-6"><h3 className="font-heading text-xl font-black">📚 Connected pest information</h3><p className="mt-2 text-slate-600">Related inspection, prevention, treatment, and follow-up topics stay contextually linked.</p></div>
            </div>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-emerald-900 to-[#07172d] p-10 text-white">
            <p className="text-sm font-black uppercase tracking-widest text-lime-300">How it works</p>
            <div className="mt-8 grid gap-7">
              {['Choose your pest or service topic','Select your state and city','Review treatment and hiring questions','Request independent provider availability'].map((item, index) => <div key={item} className="flex gap-5"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lime-400 font-black text-emerald-950">{index + 1}</span><div><h3 className="font-heading text-xl font-black">{item}</h3><p className="mt-1 text-sm leading-6 text-slate-300">Use the information provided to compare the next step and make an informed hiring decision.</p></div></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-center font-black uppercase tracking-widest text-emerald-700">Frequently Asked Questions</p>
          <h2 className="mt-3 text-center font-heading text-4xl font-black text-[#07172d]">USA Pest-Control FAQs</h2>
          <div className="mt-10 grid gap-4">{faqItems.map(([question, answer]) => <details key={question} className="rounded-xl border border-slate-200 bg-white p-6"><summary className="cursor-pointer font-heading text-lg font-black">{question}</summary><p className="mt-4 leading-7 text-slate-600">{answer}</p></details>)}</div>
        </div>
      </section>

      <section className="bg-[#07172d] px-4 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="font-black uppercase tracking-widest text-lime-300">Nationwide Coverage</p>
          <h2 className="mt-3 font-heading text-4xl font-black">Pest-Control Information Across 50 States + DC</h2>
          <p className="mt-4 max-w-3xl text-slate-300">Select a state to browse its city hierarchy and locally organized pest-service topics.</p>
          <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">{states.map((state) => <Link key={state.code} href={stateUrl(state)} className="rounded-xl border border-white/10 bg-white/5 px-4 py-4 font-bold hover:border-lime-300 hover:text-lime-300">{state.name}<span className="mt-1 block text-xs font-normal text-slate-400">{state.cities.length.toLocaleString('en-US')} locations</span></Link>)}</div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-black uppercase tracking-widest text-emerald-700">Knowledge Base</p>
          <h2 className="mt-3 font-heading text-4xl font-black text-[#07172d]">Pest Identification & Treatment Resources</h2>
          <div className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featuredGuides.map((guide) => <article key={guide.slug} className="rounded-2xl border border-slate-200 p-6"><p className="text-xs font-black uppercase tracking-widest text-emerald-700">{guide.category}</p><h3 className="mt-3 font-heading text-xl font-black">{guide.title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">Practical information to help document the problem and discuss the next step with a qualified local provider.</p><Link href={`/blog/${guide.slug}`} className="mt-5 inline-flex text-sm font-black text-emerald-700">Read Guide →</Link></article>)}
          </div>
          <div className="mt-9 text-center"><Link href="/blog" className="inline-flex rounded-xl bg-[#07172d] px-6 py-4 font-black text-white">View All 26 Guides →</Link></div>
        </div>
      </section>

      <section className="bg-lime-400 px-4 py-10 text-emerald-950">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center"><div><h2 className="font-heading text-3xl font-black">Need Pest-Control Help in Your Area?</h2><p className="mt-2 font-medium">Choose your location and service or call to check independent provider availability.</p></div><div className="flex flex-wrap gap-3"><a href={SITE.phoneHref} className="rounded-xl bg-[#07172d] px-6 py-4 font-black text-white">Call {SITE.phoneDisplay}</a><Link href="/contact" className="rounded-xl bg-white px-6 py-4 font-black">Request Availability</Link></div></div>
      </section>
    </>
  );
}
