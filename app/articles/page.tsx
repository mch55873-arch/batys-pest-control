import type { Metadata } from 'next';
import { articles } from '@/lib/articles';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Pest Control Guides & Inspection Resources',
  description: 'Read pest-control guides covering identification, inspection, treatment, preparation, prevention, safety, and provider hiring questions.',
  alternates: { canonical: '/articles' },
};

export default function ArticlesPage() {
  const categories = Array.from(new Set(articles.map((article) => article.category)));

  return (
    <>
      <section className="bg-[#0b1c2d] px-4 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl">
          <nav className="text-sm font-semibold text-slate-300"><a href={SITE.url}>Home</a><span className="mx-2">/</span>Pest Guides</nav>
          <p className="mt-8 text-xs font-black uppercase tracking-[.2em] text-sky-300">Pest knowledge center</p>
          <h1 className="mt-4 max-w-4xl font-heading text-5xl font-black leading-[1.04] sm:text-6xl">Detailed pest-control guides for <span className="text-[#16b7df]">better property decisions</span></h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">Learn how to recognize pest evidence, prepare for inspection, compare treatment methods, reduce recurrence risks, and verify an independent service provider.</p>
          <div className="mt-8 flex flex-wrap gap-3"><a href={SITE.phoneHref} className="min-h-12 rounded-xl bg-[#f47b20] px-6 py-4 font-black">Call {SITE.phoneDisplay}</a><a href={`${SITE.url}/services`} className="min-h-12 rounded-xl border border-white/25 bg-white/10 px-6 py-4 font-black">Browse Services</a></div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4"><div className="mx-auto grid max-w-7xl grid-cols-3">{[[articles.length, 'Published guides'], [categories.length, 'Topic clusters'], ['Practical', 'Hiring questions']].map(([value, label], index) => <div key={label} className={`p-6 text-center ${index ? 'border-l border-slate-200' : ''}`}><strong className="font-heading text-3xl font-black text-[#0b1c2d]">{value}</strong><p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:text-xs">{label}</p></div>)}</div></section>

      <section className="bg-[#f4f7f9] px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl space-y-16">
          {categories.map((category) => (
            <section key={category}>
              <p className="text-xs font-black uppercase tracking-[.18em] text-sky-600">Topic cluster</p>
              <h2 className="mt-2 font-heading text-3xl font-black text-[#0b1c2d] sm:text-4xl">{category}</h2>
              <div className="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {articles.filter((article) => article.category === category).map((article, index) => (
                  <a key={article.slug} href={`${SITE.url}/articles/${article.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-sky-400 hover:shadow-xl">
                    <div className="flex items-center justify-between gap-4"><span className="text-xs font-black uppercase tracking-wider text-sky-600">{article.category}</span><span className="grid h-9 w-9 place-items-center rounded-xl bg-sky-50 text-sm font-black text-sky-600">{String(index + 1).padStart(2, '0')}</span></div>
                    <h3 className="mt-5 font-heading text-2xl font-black leading-tight text-[#0b1c2d] group-hover:text-sky-600">{article.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{article.summary}</p>
                    <span className="mt-6 inline-flex font-black text-sky-600">Read guide →</span>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="px-4 py-20"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">{[['Identify the evidence', 'Document sightings, damage, droppings, sounds, odors, nesting material, affected rooms, and timing.'], ['Prepare for inspection', 'Make relevant areas accessible and share information about occupants, pets, food areas, and previous treatments.'], ['Compare written scopes', 'Review findings, methods, safety instructions, visits, exclusions, price, monitoring, and warranty limitations.']].map(([title, text], index) => <div key={title} className="rounded-2xl border border-slate-200 p-7"><span className="font-heading text-4xl font-black text-sky-200">0{index + 1}</span><h2 className="mt-4 font-heading text-2xl font-black text-[#0b1c2d]">{title}</h2><p className="mt-3 text-sm leading-7 text-slate-600">{text}</p></div>)}</div></section>

      <section className="bg-[#16b7df] px-4 py-12 text-white"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center"><div><h2 className="font-heading text-3xl font-black">Need service information for a current pest problem?</h2><p className="mt-2 text-sky-50">Choose a service page or call to check independent-provider availability.</p></div><div className="flex flex-col gap-3 sm:flex-row"><a href={`${SITE.url}/services`} className="min-h-12 rounded-xl bg-white px-7 py-4 text-center font-black text-[#0b1c2d]">Browse Services</a><a href={SITE.phoneHref} className="min-h-12 rounded-xl bg-[#0b1c2d] px-7 py-4 text-center font-black">Call {SITE.phoneDisplay}</a></div></div></section>
    </>
  );
}
