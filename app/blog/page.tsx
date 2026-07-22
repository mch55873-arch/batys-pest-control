import type { Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/data/articles';

export const metadata: Metadata = {
  title: 'Pest-Control Guides & Resources',
  description: 'Practical USA pest identification, prevention, treatment-planning, and provider-hiring guides.',
  alternates: { canonical: '/blog' },
};

export default function BlogPage() {
  return (
    <>
      <section className="bg-[#07172d] px-4 py-16 text-white">
        <div className="mx-auto max-w-7xl"><p className="font-black uppercase tracking-widest text-lime-300">Knowledge Base</p><h1 className="mt-3 font-heading text-5xl font-black">Pest-Control Guides & Resources</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">Clear, practical information for identifying pest activity, preparing for inspections, comparing treatment plans, and hiring independent providers.</p></div>
      </section>
      <section className="bg-slate-50 px-4 py-16">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => <article key={article.slug} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><p className="text-xs font-black uppercase tracking-widest text-emerald-700">{article.category}</p><h2 className="mt-3 font-heading text-2xl font-black text-[#07172d]"><Link href={`/blog/${article.slug}`}>{article.title}</Link></h2><p className="mt-4 text-sm leading-7 text-slate-600">{article.description}</p><Link href={`/blog/${article.slug}`} className="mt-6 inline-flex font-black text-emerald-700">Read Guide →</Link></article>)}
        </div>
      </section>
    </>
  );
}
