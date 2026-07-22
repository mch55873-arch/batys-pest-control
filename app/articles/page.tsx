import type { Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Pest Control Guides',
  description: 'Read detailed pest-control guides covering identification, inspection, treatment, preparation, prevention, and provider hiring.',
  alternates: { canonical: '/articles' },
};

export default function ArticlesPage() {
  const categories = Array.from(new Set(articles.map((article) => article.category)));

  return (
    <>
      <section className="bg-[#092e27] px-4 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[.2em] text-emerald-300">Pest Knowledge Center</p>
          <h1 className="mt-4 max-w-4xl font-heading text-5xl font-black sm:text-6xl">Detailed pest-control guides for better property decisions</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-emerald-50/80">Learn how to recognize pest evidence, prepare for inspection, compare treatment methods, prevent recurrence, and verify an independent service provider.</p>
          <div className="mt-8 flex gap-3">
            <a href={SITE.phoneHref} className="rounded-lg bg-emerald-500 px-6 py-4 font-black">Call {SITE.phoneDisplay}</a>
            <Link href="/services" className="rounded-lg border border-white/25 bg-white/10 px-6 py-4 font-black">Browse Services</Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-20">
        <div className="mx-auto max-w-7xl space-y-16">
          {categories.map((category) => (
            <section key={category}>
              <p className="text-xs font-black uppercase tracking-[.18em] text-emerald-700">Topic cluster</p>
              <h2 className="mt-2 font-heading text-3xl font-black text-[#10233b]">{category}</h2>
              <div className="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {articles.filter((article) => article.category === category).map((article) => (
                  <Link key={article.slug} href={`/articles/${article.slug}`} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-emerald-400 hover:shadow-xl">
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-700">{article.category}</span>
                    <h3 className="mt-3 font-heading text-2xl font-black leading-tight text-[#10233b]">{article.title}</h3>
                    <p className="mt-4 text-sm leading-6 text-slate-600">{article.summary}</p>
                    <span className="mt-6 inline-flex font-black text-emerald-700">Read guide →</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
