import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Request Pest-Control Availability',
  description: 'Browse current Batys Pest Control location and service coverage.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 text-center">
      <p className="font-bold uppercase tracking-widest text-emerald-700">Coverage is growing</p>
      <h1 className="mt-3 font-heading text-5xl font-black">Find the right location and service page</h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">Lead routing is not active yet. Until a verified contact channel and independent provider coverage are connected, Batys will not collect personal service-request information through a nonfunctional form.</p>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <Link href="/locations" className="rounded-xl bg-emerald-900 px-6 py-4 font-bold text-white">Browse locations</Link>
        <Link href="/services" className="rounded-xl border border-slate-300 px-6 py-4 font-bold">Browse services</Link>
      </div>
    </div>
  );
}
