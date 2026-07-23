import { SITE } from '@/lib/site';

export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center bg-[#f4f7f9] px-4 py-20">
      <section className="w-full max-w-3xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white text-center shadow-xl">
        <div className="bg-[#0b1c2d] px-6 py-14 text-white sm:px-12">
          <p className="font-heading text-8xl font-black text-sky-300/20">404</p>
          <h1 className="-mt-5 font-heading text-4xl font-black sm:text-5xl">This pest-control page could not be found</h1>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-300">The address may be outdated, incomplete, or tied to a location route that has moved. Use the main service and location directories below.</p>
        </div>
        <div className="grid gap-3 p-6 sm:grid-cols-3 sm:p-10">
          <a href={`${SITE.url}/services`} className="min-h-12 rounded-xl bg-[#16b7df] px-5 py-4 font-black text-white">Browse Services</a>
          <a href={`${SITE.url}/locations`} className="min-h-12 rounded-xl bg-[#0b1c2d] px-5 py-4 font-black text-white">Service Areas</a>
          <a href={SITE.phoneHref} className="min-h-12 rounded-xl bg-[#f47b20] px-5 py-4 font-black text-white">Call {SITE.phoneDisplay}</a>
        </div>
      </section>
    </div>
  );
}
