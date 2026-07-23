import Image from 'next/image';
import { pestServices, states, stateUrl } from '@/lib/locations';
import { SITE } from '@/lib/site';
import { SITE_IMAGES } from '@/lib/siteImages';

const cityCount = states.reduce((total, state) => total + state.cities.length, 0);
const featuredSlugs = ['emergency-pest-control', 'termite-control', 'bed-bug-treatment', 'rodent-control', 'cockroach-control', 'mosquito-control'];
const featured = featuredSlugs.map((slug) => pestServices.find((service) => service.slug === slug)).filter((service): service is NonNullable<typeof service> => Boolean(service));
const serviceImages = [SITE_IMAGES.technician, SITE_IMAGES.exteriorSpray, SITE_IMAGES.residentialFogging, SITE_IMAGES.rodent, SITE_IMAGES.ants, SITE_IMAGES.mosquitoFogging];
const absolute = (path: string) => `${SITE.url}${path}`;

const faqs = [
  ['How fast can a pest-control provider respond?', 'Response time depends on the city, pest type, season, urgency, travel distance, and provider capacity. Call to confirm current availability.'],
  ['Should I identify the pest before calling?', 'Photos, droppings, damage, sounds, odors, nesting material, and the time activity occurs can help, but the provider should confirm identification during inspection.'],
  ['Are providers licensed and insured?', 'Requirements vary by state and service type. Confirm the specific company’s current license, insurance, treatment scope, products, and written estimate before authorizing work.'],
  ['What should be included in a quote?', 'Ask for inspection findings, target pest, treatment areas, products or methods, preparation, visits, exclusions, warranty, follow-up, and total price in writing.'],
  ['Is one treatment always enough?', 'Not always. Colonies, eggs, hidden harborages, structural entry points, seasonal pressure, and sanitation or moisture conditions can require monitoring or repeat service.'],
  ['How do I protect children and pets?', 'Tell the provider about children, pets, allergies, aquariums, food areas, and sensitive occupants. Follow written preparation and re-entry instructions exactly.'],
];

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#0b1c2d] text-white">
        <Image src="/images/pest-control-hero.webp" alt="Pest-control technician inspecting a property" fill priority className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071522] via-[#0b1c2d]/95 to-[#0b1c2d]/55" />
        <div className="relative mx-auto grid min-h-[650px] max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-[1.1fr_.9fr] lg:py-20">
          <div>
            <span className="inline-flex rounded-full border border-sky-300/25 bg-sky-300/10 px-4 py-2 text-xs font-black uppercase tracking-[.16em] text-sky-200">Nationwide pest-control service directory</span>
            <h1 className="mt-6 max-w-3xl font-heading text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">Find the right pest-control service <span className="text-[#16b7df]">near you</span></h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">Research common pest problems, compare service options, choose your location, and check availability with independent local providers.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={SITE.phoneHref} className="min-h-12 rounded-xl bg-[#f47b20] px-7 py-4 font-black text-white shadow-[0_14px_35px_rgba(244,123,32,.28)] transition hover:-translate-y-0.5 hover:bg-[#dd6814]">Call {SITE.phoneDisplay}</a>
              <a href={absolute('/services')} className="min-h-12 rounded-xl border border-white/25 bg-white/10 px-7 py-4 font-black text-white backdrop-blur transition hover:bg-white/15">Browse Services</a>
            </div>
            <div className="mt-8 grid max-w-2xl gap-3 text-sm font-bold text-slate-200 sm:grid-cols-3">
              {['Independent providers', 'Location-specific routes', 'Inspection-first guidance'].map((item) => <span key={item} className="flex items-center gap-2"><span className="grid h-5 w-5 place-items-center rounded-full bg-sky-400/20 text-xs text-sky-200">✓</span>{item}</span>)}
            </div>
          </div>

          <aside className="rounded-[1.5rem] border border-white/20 bg-white p-6 text-[#0b1c2d] shadow-2xl sm:p-8">
            <p className="text-xs font-black uppercase tracking-[.18em] text-sky-600">Request service information</p>
            <h2 className="mt-2 font-heading text-3xl font-black">Tell us what is happening</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">Submit the basic details or call directly. Coverage and response times must be confirmed with the independent provider.</p>
            <form className="mt-6 grid gap-4" method="get" action={absolute('/contact')}>
              <label className="text-xs font-black uppercase tracking-wider text-slate-600">Full name<input name="name" autoComplete="name" required className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-base font-medium outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" /></label>
              <label className="text-xs font-black uppercase tracking-wider text-slate-600">Phone number<input name="phone" type="tel" autoComplete="tel" required className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-base font-medium outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" /></label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-600">City or ZIP<input name="location" autoComplete="postal-code" required className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-base font-medium outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" /></label>
                <label className="text-xs font-black uppercase tracking-wider text-slate-600">Service<select name="service" required className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-base font-medium outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100"><option value="">Select</option>{featured.map((service) => <option key={service.slug} value={service.slug}>{service.name}</option>)}</select></label>
              </div>
              <button type="submit" className="min-h-12 rounded-xl bg-[#0b1c2d] px-6 py-4 font-black text-white transition hover:bg-slate-800">Continue Request</button>
            </form>
            <p className="mt-4 text-center text-xs leading-5 text-slate-500">Batys provides service information and referral routes. Providers are independent businesses.</p>
          </aside>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4">
        <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          {[[51, 'States & DC'], [`${cityCount.toLocaleString('en-US')}+`, 'Location routes'], [pestServices.length, 'Service topics'], ['Direct', 'Phone availability check']].map(([value, label], index) => <div key={label} className={`p-6 text-center ${index ? 'border-l border-slate-200' : ''} ${index > 1 ? 'border-t border-slate-200 lg:border-t-0' : ''}`}><strong className="font-heading text-3xl font-black text-[#0b1c2d]">{value}</strong><p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">{label}</p></div>)}
        </div>
      </section>

      <section className="bg-[#f4f7f9] px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[.18em] text-sky-600">Popular pest services</p>
          <div className="mt-3 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div><h2 className="max-w-3xl font-heading text-4xl font-black text-[#0b1c2d] sm:text-5xl">Professional information for common pest problems</h2><p className="mt-4 max-w-3xl leading-7 text-slate-600">Start with the pest or service need, then choose a state and city to keep local context clear.</p></div>
            <a href={absolute('/services')} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#0b1c2d] px-6 py-4 font-black text-white">View all services</a>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((service, index) => (
              <a key={service.slug} href={absolute(`/services/${service.slug}`)} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-48 overflow-hidden bg-slate-200"><img src={serviceImages[index]} alt="" width="800" height="500" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><span className="absolute left-4 top-4 rounded-full bg-[#0b1c2d]/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white">{service.category}</span></div>
                <div className="p-6"><h3 className="font-heading text-xl font-black text-[#0b1c2d] group-hover:text-sky-600">{service.name}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{service.description}</p><span className="mt-5 inline-flex text-sm font-black text-sky-600">Review service →</span></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div className="relative min-h-[460px] overflow-hidden rounded-[2rem] bg-slate-200 shadow-xl"><img src={SITE_IMAGES.technician} alt="Pest-control technician reviewing a property" width="1400" height="1000" loading="lazy" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-x-5 bottom-5 rounded-2xl bg-[#0b1c2d]/95 p-5 text-white backdrop-blur"><p className="text-xs font-black uppercase tracking-wider text-sky-200">Important disclosure</p><p className="mt-2 text-sm leading-6 text-slate-200">Batys is an information and referral platform, not a claim that one company holds every local license or performs every listed service.</p></div></div>
          <div>
            <p className="text-xs font-black uppercase tracking-[.18em] text-sky-600">A clearer hiring process</p>
            <h2 className="mt-3 font-heading text-4xl font-black text-[#0b1c2d] sm:text-5xl">Understand the service before authorizing the work</h2>
            <p className="mt-5 leading-8 text-slate-600">A reliable service begins with identification and inspection—not a generic treatment. Ask the provider to connect each recommendation to evidence found at the property.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ['Confirm credentials', 'Verify licensing, certification, and insurance required for the service and location.'],
                ['Request written scope', 'Document findings, treatment areas, methods, preparation, visits, exclusions, and price.'],
                ['Discuss safety', 'Share information about children, pets, allergies, aquariums, food areas, and sensitive occupants.'],
                ['Plan follow-up', 'Clarify monitoring, repeat visits, repairs, prevention measures, and warranty limitations.'],
              ].map(([title, text]) => <div key={title} className="rounded-2xl bg-[#f4f7f9] p-5"><span className="grid h-9 w-9 place-items-center rounded-xl bg-sky-100 font-black text-sky-700">✓</span><h3 className="mt-4 font-black text-[#0b1c2d]">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></div>)}
            </div>
            <a href={absolute('/provider-disclosure')} className="mt-7 inline-flex min-h-12 items-center rounded-xl border border-slate-300 px-6 py-4 font-black text-[#0b1c2d]">Read provider disclosure</a>
          </div>
        </div>
      </section>

      <section className="bg-[#0b1c2d] px-4 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[.18em] text-sky-300">How it works</p>
          <h2 className="mt-3 max-w-3xl font-heading text-4xl font-black sm:text-5xl">A simple path from pest signs to an informed service call</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {[
              ['Choose the problem', 'Start with the pest, damage, inspection need, or property type.'],
              ['Select the location', 'Choose a state and city to preserve the correct geographic context.'],
              ['Review guidance', 'Understand warning signs, methods, preparation, and provider questions.'],
              ['Check availability', 'Call and verify coverage, credentials, scope, scheduling, and total price.'],
            ].map(([title, text], index) => <div key={title} className="border-t border-white/15 pt-6"><span className="font-heading text-5xl font-black text-white/15">0{index + 1}</span><h3 className="mt-3 text-xl font-black">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-300">{text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[.18em] text-sky-600">Nationwide service areas</p>
            <h2 className="mt-3 font-heading text-4xl font-black text-[#0b1c2d] sm:text-5xl">Browse pest-control information by state and city</h2>
            <p className="mt-5 max-w-3xl leading-8 text-slate-600">State pages organize cities and common service needs. City routes provide locally framed service information and provider questions.</p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {states.slice(0, 18).map((state) => <a key={state.code} href={stateUrl(state)} className="min-h-11 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-sky-400 hover:text-sky-700">{state.name}<span className="float-right text-sky-500">→</span></a>)}
            </div>
            <a href={absolute('/locations')} className="mt-7 inline-flex min-h-12 items-center rounded-xl bg-[#0b1c2d] px-6 py-4 font-black text-white">See all service areas</a>
          </div>
          <div className="rounded-[2rem] bg-[#f4f7f9] p-7 sm:p-10">
            <p className="text-xs font-black uppercase tracking-[.18em] text-sky-600">Coverage structure</p>
            <strong className="mt-5 block font-heading text-6xl font-black text-[#0b1c2d]">{cityCount.toLocaleString('en-US')}+</strong>
            <p className="mt-2 font-bold text-slate-600">city and community routes</p>
            <div className="mt-8 grid gap-3 text-sm font-bold text-slate-600">
              {['State-level service discovery', 'City-specific service routes', 'Service-to-location internal linking', 'Independent-provider disclosures'].map((item) => <p key={item} className="rounded-xl bg-white px-4 py-4 shadow-sm"><span className="mr-2 text-sky-600">✓</span>{item}</p>)}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f7f9] px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-black uppercase tracking-[.18em] text-sky-600">Frequently asked questions</p>
          <h2 className="mt-3 font-heading text-4xl font-black text-[#0b1c2d] sm:text-5xl">Pest-control questions, answered clearly</h2>
          <div className="mt-10 space-y-3 text-left">{faqs.map(([question, answer]) => <details key={question} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><summary className="cursor-pointer font-black text-[#0b1c2d]">{question}<span className="float-right text-sky-500">+</span></summary><p className="mt-3 leading-7 text-slate-600">{answer}</p></details>)}</div>
        </div>
      </section>

      <section className="bg-[#16b7df] px-4 py-14 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
          <div><h2 className="font-heading text-3xl font-black">Start with the right pest-control service.</h2><p className="mt-2 text-sky-50">Browse service information or call to check independent-provider availability.</p></div>
          <div className="flex flex-col gap-3 sm:flex-row"><a href={SITE.phoneHref} className="min-h-12 rounded-xl bg-[#0b1c2d] px-6 py-4 text-center font-black">Call {SITE.phoneDisplay}</a><a href={absolute('/services')} className="min-h-12 rounded-xl bg-white px-6 py-4 text-center font-black text-[#0b1c2d]">View Services</a></div>
        </div>
      </section>
    </>
  );
}
