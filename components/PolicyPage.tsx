import Link from 'next/link';
import { SITE } from '@/lib/site';

type PolicySection = { heading: string; paragraphs?: string[]; bullets?: string[] };

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  sections: PolicySection[];
};

export function PolicyPage({ eyebrow, title, description, lastUpdated, sections }: Props) {
  return (
    <>
      <section className="bg-[#092e27] px-4 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-5xl">
          <nav className="text-sm text-emerald-100/70"><Link href="/">Home</Link><span className="mx-2">/</span>{title}</nav>
          <p className="mt-10 text-xs font-black uppercase tracking-[.2em] text-emerald-300">{eyebrow}</p>
          <h1 className="mt-4 font-heading text-5xl font-black leading-tight sm:text-6xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-emerald-50/80">{description}</p>
          <p className="mt-5 text-sm font-bold text-emerald-100/70">Last updated: {lastUpdated}</p>
        </div>
      </section>
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 lg:grid-cols-[1fr_300px]">
        <article className="min-w-0">
          {sections.map((section) => (
            <section key={section.heading} className="mb-12">
              <h2 className="font-heading text-3xl font-black text-[#10233b]">{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph} className="mt-5 text-[17px] leading-8 text-slate-700">{paragraph}</p>)}
              {section.bullets && <ul className="mt-5 grid gap-3 text-[17px] leading-8 text-slate-700">{section.bullets.map((item) => <li key={item} className="flex gap-3"><span className="mt-2 text-emerald-600">✓</span><span>{item}</span></li>)}</ul>}
            </section>
          ))}
        </article>
        <aside>
          <div className="sticky top-24 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-xs font-black uppercase tracking-[.18em] text-emerald-700">Need help?</p>
            <h2 className="mt-3 font-heading text-2xl font-black text-[#10233b]">Contact {SITE.name}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">Questions about this policy, the website, or an independent provider referral can be directed through our contact page.</p>
            <Link href="/contact" className="mt-5 block rounded-lg bg-emerald-600 px-5 py-4 text-center font-black text-white">Contact Us</Link>
          </div>
        </aside>
      </div>
    </>
  );
}
