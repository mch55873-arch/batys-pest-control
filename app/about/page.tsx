import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How Batys Pest Control Works',
  description: 'Learn how Batys organizes pest information and independent provider referrals across US states and cities.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <p className="font-bold uppercase tracking-widest text-emerald-700">How it works</p>
      <h1 className="mt-2 font-heading text-5xl font-black">A location-first pest information and referral platform</h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">Batys Pest Control organizes common pest problems by entity, service intent, state, and city. The goal is to help visitors understand the next sensible step and, where coverage exists, connect with an independent provider.</p>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {[
          ['1', 'Identify the topic', 'Start with the pest, inspection need, treatment type, or commercial setting.'],
          ['2', 'Choose a location', 'Browse the state and city hierarchy to keep local requirements and availability clear.'],
          ['3', 'Verify the provider', 'Confirm licensing, scope, products, pricing, preparation, and follow-up before work begins.'],
        ].map(([number, title, copy]) => <section key={number} className="rounded-2xl border border-slate-200 p-6"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-300 font-black text-emerald-950">{number}</span><h2 className="mt-5 font-heading text-2xl font-bold">{title}</h2><p className="mt-3 leading-7 text-slate-600">{copy}</p></section>)}
      </div>
      <section className="mt-14 rounded-3xl bg-emerald-950 p-8 text-white md:p-12">
        <h2 className="font-heading text-3xl font-bold">Clear role, no invented claims</h2>
        <p className="mt-4 max-w-3xl leading-7 text-emerald-50/80">Batys does not present itself as the licensed applicator performing work in every location. Independent providers are responsible for confirming their coverage, credentials, treatment recommendations, contracts, and service delivery.</p>
        <Link href="/locations" className="mt-7 inline-block rounded-xl bg-lime-400 px-5 py-3 font-bold text-emerald-950">Browse locations</Link>
      </section>
    </div>
  );
}
