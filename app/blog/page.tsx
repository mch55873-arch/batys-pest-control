import type { Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/data/articles';

export const metadata: Metadata = { title: 'Pest-Control Guides & Resources', description: 'Practical USA pest identification, prevention, treatment-planning, and provider-hiring guides.', alternates: { canonical: '/blog' } };

const clusters = [
  { name: 'Identification & Evidence', categories: ['Ants', 'Termites', 'Bed Bugs', 'Cockroaches', 'Rodents', 'Mosquitoes', 'Ticks', 'Fleas', 'Spiders', 'Wasps', 'Stored Products'] },
  { name: 'Prevention & Treatment Planning', categories: ['Prevention', 'Treatment Planning', 'Aftercare', 'Safety'] },
  { name: 'Hiring & Property Guidance', categories: ['Hiring Guide', 'Property Management', 'Commercial', 'Emergency'] },
];

export default function BlogPage() {
  return <>
    <section className="relative overflow-hidden bg-[#07172d] px-4 py-20 text-white"><div className="absolute -right-40 -top-40 h-96 w-96 rounded-full border-[70px] border-lime-300/[.05]" /><div className="relative mx-auto max-w-7xl"><p className="text-xs font-black uppercase tracking-[.18em] text-lime-300">Pest Knowledge Base</p><h1 className="mt-4 max-w-4xl font-heading text-5xl font-black tracking-tight sm:text-6xl">Research the pest before choosing the treatment</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Entity-based guides covering identification, evidence, inspections, treatment planning, prevention, safety, and provider selection.</p><div className="mt-9 flex flex-wrap gap-3">{clusters.map((cluster) => <a key={cluster.name} href={`#${cluster.name.toLowerCase().replaceAll(' ', '-').replace('&-', '')}`} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold hover:border-lime-300 hover:text-lime-200">{cluster.name}</a>)}</div></div></section>
    <div className="bg-[#f4f7f5] px-4 py-20"><div className="mx-auto max-w-7xl space-y-20">{clusters.map((cluster) => { const clusterArticles = articles.filter((article) => cluster.categories.includes(article.category)); return <section key={cluster.name} id={cluster.name.toLowerCase().replaceAll(' ', '-').replace('&-', '')}><div className="flex items-end justify-between gap-5 border-b border-slate-300 pb-5"><div><p className="text-xs font-black uppercase tracking-[.17em] text-emerald-700">Topical cluster</p><h2 className="mt-2 font-heading text-3xl font-black text-[#07172d]">{cluster.name}</h2></div><span className="text-sm font-bold text-slate-500">{clusterArticles.length} guides</span></div><div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{clusterArticles.map((article) => <article key={article.slug} className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><p className="text-[10px] font-black uppercase tracking-[.17em] text-emerald-700">{article.category}</p><h3 className="mt-3 font-heading text-2xl font-black leading-tight text-[#07172d]"><Link href={`/blog/${article.slug}`}>{article.title}</Link></h3><p className="mt-4 text-sm leading-7 text-slate-600">{article.description}</p><Link href={`/blog/${article.slug}`} className="mt-6 inline-flex text-sm font-black text-emerald-700">Read complete guide →</Link></article>)}</div></section>; })}</div></div>
  </>;
}
