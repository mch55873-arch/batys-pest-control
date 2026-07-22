import type { Metadata } from 'next';
import Link from 'next/link';
import { states, statePath } from '@/lib/locations';

export const metadata: Metadata = {
  title: 'Pest Control Locations',
  description: 'Browse pest-control information by US state, Washington DC, and city.',
  alternates: { canonical: '/locations' },
};

export default function LocationsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <p className="font-bold uppercase tracking-widest text-emerald-700">Nationwide location map</p>
      <h1 className="mt-2 font-heading text-5xl font-black">Pest control by state and city</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Select a state to browse its city directory and locally organized pest-service topics.</p>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {states.map((state) => (
          <Link key={state.code} href={statePath(state)} className="rounded-2xl border border-slate-200 p-5 hover:border-emerald-500 hover:shadow-md">
            <h2 className="font-heading text-xl font-bold">{state.name}</h2>
            <p className="mt-1 text-sm text-slate-500">{state.cities.length.toLocaleString('en-US')} locations</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
