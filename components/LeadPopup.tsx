'use client';

import { FormEvent, useEffect, useState } from 'react';
import { SITE } from '@/lib/site';

const SESSION_KEY = 'batys-lead-popup-seen';

export function LeadPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem(SESSION_KEY)) return;
    const timer = window.setTimeout(() => {
      setOpen(true);
      window.sessionStorage.setItem(SESSION_KEY, '1');
    }, 9000);
    return () => window.clearTimeout(timer);
  }, []);

  function close() {
    setOpen(false);
    window.sessionStorage.setItem(SESSION_KEY, '1');
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    if (!form.checkValidity()) return;
    window.sessionStorage.setItem(SESSION_KEY, '1');
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="fixed bottom-4 right-4 z-[70] rounded-full bg-[#f47b20] px-5 py-3 text-sm font-black text-white shadow-2xl transition hover:-translate-y-0.5 hover:bg-[#db6815]" aria-haspopup="dialog">
        Get Pest Help
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-5" role="dialog" aria-modal="true" aria-labelledby="lead-popup-title" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
          <div className="relative grid max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:grid-cols-2 sm:rounded-3xl">
            <button type="button" onClick={close} className="absolute right-4 top-3 z-10 text-3xl leading-none text-slate-400 hover:text-slate-700" aria-label="Close request popup">×</button>

            <div className="bg-[#0b1c2d] p-7 text-white sm:p-9">
              <p className="text-xs font-black uppercase tracking-[.18em] text-sky-300">Local provider request</p>
              <h2 id="lead-popup-title" className="mt-3 font-heading text-3xl font-black">Need pest-control help?</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">Call directly for the fastest availability check, or enter the basic details and continue to the contact page.</p>
              <a href={SITE.phoneHref} className="mt-6 block rounded-xl bg-[#f47b20] px-5 py-4 text-center font-black text-white">Call {SITE.phoneDisplay}</a>
              <div className="mt-7 space-y-3 text-sm text-slate-300"><p>✓ Describe the pest signs</p><p>✓ Share the city or ZIP code</p><p>✓ Confirm provider coverage and credentials</p></div>
            </div>

            <form action="/contact" method="get" onSubmit={submit} className="p-7 sm:p-9">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-600">Full name<input name="name" autoComplete="name" required className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm font-medium normal-case tracking-normal outline-none focus:border-sky-500" /></label>
              <label className="mt-4 block text-xs font-black uppercase tracking-wider text-slate-600">Phone number<input name="phone" type="tel" autoComplete="tel" required className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm font-medium normal-case tracking-normal outline-none focus:border-sky-500" /></label>
              <label className="mt-4 block text-xs font-black uppercase tracking-wider text-slate-600">City or ZIP code<input name="location" autoComplete="postal-code" required className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm font-medium normal-case tracking-normal outline-none focus:border-sky-500" /></label>
              <label className="mt-4 block text-xs font-black uppercase tracking-wider text-slate-600">Pest or service<select name="service" defaultValue="" className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-medium normal-case tracking-normal outline-none focus:border-sky-500"><option value="">Select one</option><option value="termite-control">Termites</option><option value="bed-bug-treatment">Bed Bugs</option><option value="rodent-control">Rodents</option><option value="cockroach-control">Cockroaches</option><option value="ant-control">Ants</option><option value="mosquito-control">Mosquitoes</option><option value="general-pest-control">Other Pest</option></select></label>
              <button type="submit" className="mt-5 w-full rounded-xl bg-[#16b7df] px-5 py-4 font-black text-white hover:bg-sky-600">Continue Request</button>
              <p className="mt-3 text-center text-xs leading-5 text-slate-500">This step prepares your details. Complete the availability check on the contact page or by phone.</p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
