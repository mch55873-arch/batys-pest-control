import type { Metadata } from 'next';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact Batys Pest Control',
  description: 'Call to check independent pest-control provider availability or prepare the location, pest evidence, affected areas, and service details for your request.',
  alternates: { canonical: '/contact' },
};

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };
const first = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] : value;
const titleCase = (value: string) => value.split('-').filter(Boolean).map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

export default async function ContactPage({ searchParams }: Props) {
  const query = await searchParams;
  const name = first(query.name) ?? '';
  const phone = first(query.phone) ?? '';
  const location = first(query.location) ?? '';
  const service = first(query.service) ?? '';
  const hasRequest = Boolean(name || phone || location || service);

  return (
    <>
      <section className="bg-[#0b1c2d] px-4 py-20 text-white sm:py-24"><div className="mx-auto max-w-7xl"><p className="text-xs font-black uppercase tracking-[.2em] text-sky-300">Contact & availability</p><h1 className="mt-4 max-w-4xl font-heading text-5xl font-black leading-tight sm:text-6xl">Tell the provider what pest problem you are dealing with</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">Call to check independent-provider availability. Be ready to describe the pest signs, affected rooms or exterior areas, how long activity has been present, and whether children, pets, food areas, or sensitive occupants are involved.</p></div></section>

      <section className="px-4 py-20"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr]">
        <aside className="rounded-[2rem] bg-[#0b1c2d] p-8 text-white sm:p-10"><p className="text-xs font-black uppercase tracking-[.18em] text-sky-300">Fastest contact option</p><h2 className="mt-3 font-heading text-4xl font-black">Call {SITE.phoneDisplay}</h2><p className="mt-5 leading-7 text-slate-300">Phone availability and service coverage vary by city, pest type, season, urgency, and provider capacity.</p><a href={SITE.phoneHref} className="mt-8 inline-flex min-h-12 items-center rounded-xl bg-[#f47b20] px-6 py-4 font-black">Call Now</a><div className="mt-10 space-y-5 border-t border-white/10 pt-8">{[['Service scope', 'Residential and commercial pest-control topics'], ['Coverage', 'State and city routes across the United States'], ['Provider model', 'Independent local companies'], ['Before hiring', 'Verify license, insurance, products, price, and warranty']].map(([label, value]) => <div key={label}><p className="text-xs font-black uppercase tracking-wider text-sky-300">{label}</p><p className="mt-1 text-sm text-slate-300">{value}</p></div>)}</div></aside>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl sm:p-10">
          {hasRequest ? <><p className="text-xs font-black uppercase tracking-[.18em] text-sky-600">Your prepared request</p><h2 className="mt-3 font-heading text-4xl font-black text-[#0b1c2d]">Use these details during the call</h2><div className="mt-8 grid gap-4 sm:grid-cols-2">{[["Name", name], ["Phone", phone], ["Location", location], ["Service", service ? titleCase(service) : 'Not selected']].map(([label, value]) => <div key={label} className="rounded-xl bg-[#f4f7f9] p-4"><p className="text-xs font-black uppercase tracking-wider text-sky-600">{label}</p><p className="mt-2 break-words font-bold text-slate-700">{value || 'Not provided'}</p></div>)}</div><div className="mt-6 rounded-2xl border border-sky-200 bg-sky-50 p-5 text-sm leading-7 text-slate-700"><strong>Important:</strong> These details have been prepared on this page but have not been represented as a guaranteed provider booking. Call to confirm coverage and communicate the request directly.</div><a href={SITE.phoneHref} className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#f47b20] px-6 py-4 font-black text-white">Call {SITE.phoneDisplay}</a></> : <><p className="text-xs font-black uppercase tracking-[.18em] text-sky-600">Prepare for the call</p><h2 className="mt-3 font-heading text-4xl font-black text-[#0b1c2d]">Information that helps assess the request</h2><div className="mt-8 grid gap-4 sm:grid-cols-2">{['Your city and ZIP code', 'Pest seen or suspected', 'Rooms or exterior areas affected', 'When activity is most noticeable', 'Damage, droppings, nests, bites, or odors', 'Previous products or treatments used', 'Children, pets, allergies, or sensitivities', 'Preferred inspection or service timing'].map((item) => <div key={item} className="flex gap-3 rounded-xl bg-[#f4f7f9] p-4 text-sm font-bold text-slate-700"><span className="text-sky-600">✓</span>{item}</div>)}</div></>}
          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950"><strong>Before authorizing work:</strong> Confirm the company name, service area, licensing, inspection findings, written treatment scope, total price, preparation requirements, safety instructions, warranty, and follow-up.</div>
        </div>
      </div></section>

      <section className="bg-[#f4f7f9] px-4 py-20"><div className="mx-auto max-w-7xl"><div className="text-center"><p className="text-xs font-black uppercase tracking-[.18em] text-sky-600">Other ways to start</p><h2 className="mt-3 font-heading text-4xl font-black text-[#0b1c2d]">Browse before you call</h2></div><div className="mt-10 grid gap-6 md:grid-cols-3">{[[`${SITE.url}/services`, 'Pest Services', 'Review inspections, treatments, removal, exclusion, and prevention topics.'], [`${SITE.url}/locations`, 'Service Areas', 'Choose your state and city to preserve local context.'], [`${SITE.url}/articles`, 'Pest Guides', 'Learn about signs, inspection, treatment preparation, and prevention.']].map(([href, title, copy]) => <a key={href} href={href} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl"><h3 className="font-heading text-2xl font-black text-[#0b1c2d]">{title}</h3><p className="mt-3 leading-7 text-slate-600">{copy}</p><span className="mt-5 inline-flex font-black text-sky-600">Explore →</span></a>)}</div></div></section>

      <section className="bg-[#16b7df] px-4 py-14 text-white"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center"><div><h2 className="font-heading text-3xl font-black">Need to check local availability?</h2><p className="mt-2 text-sky-50">Call and describe the location, pest signs, and urgency.</p></div><a href={SITE.phoneHref} className="min-h-12 rounded-xl bg-[#0b1c2d] px-7 py-4 text-center font-black">Call {SITE.phoneDisplay}</a></div></section>
    </>
  );
}
