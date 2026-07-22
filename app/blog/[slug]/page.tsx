import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles } from '@/data/articles';
import { findService } from '@/lib/locations';
import { SITE } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };
const findArticle = (slug: string) => articles.find((article) => article.slug === slug);

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = findArticle((await params).slug);
  if (!article) return {};
  return { title: article.title, description: article.description, alternates: { canonical: `/blog/${article.slug}` }, openGraph: { type: 'article', title: article.title, description: article.description } };
}

export default async function ArticlePage({ params }: Props) {
  const article = findArticle((await params).slug);
  if (!article) notFound();
  const service = findService(article.serviceSlug);
  const url = `${SITE.url}/blog/${article.slug}`;
  const schema = { '@context': 'https://schema.org', '@type': 'Article', headline: article.title, description: article.description, mainEntityOfPage: url, author: { '@type': 'Organization', name: SITE.name }, publisher: { '@type': 'Organization', name: SITE.name }, inLanguage: 'en-US' };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="bg-[#07172d] px-4 py-16 text-white"><div className="mx-auto max-w-4xl"><nav className="text-sm text-slate-400"><Link href="/blog">Blog & Guides</Link> / {article.category}</nav><p className="mt-7 font-black uppercase tracking-widest text-lime-300">{article.category}</p><h1 className="mt-3 font-heading text-5xl font-black leading-tight">{article.title}</h1><p className="mt-6 text-lg leading-8 text-slate-300">{article.description}</p></div></section>
      <article className="mx-auto max-w-4xl px-4 py-16">
        <p className="text-lg leading-8 text-slate-700">Pest activity is easier to evaluate when observations are specific. Record the exact location, time, frequency, and physical evidence before cleaning, sealing, or treating an area. This helps an independent provider confirm the pest and recommend a proportionate response.</p>
        <h2 className="mt-12 font-heading text-3xl font-black text-[#07172d]">What to look for</h2>
        <ul className="mt-6 grid gap-4">{article.signals.map((item) => <li key={item} className="rounded-xl border border-slate-200 bg-slate-50 p-5 leading-7 text-slate-700">✓ {item}</li>)}</ul>
        <p className="mt-7 leading-8 text-slate-700">A single sign does not always prove an active infestation. Consider the pattern as a whole and avoid relying only on bites, noises, or one damaged item when direct pest evidence is available.</p>
        <h2 className="mt-12 font-heading text-3xl font-black text-[#07172d]">Practical next steps</h2>
        <ol className="mt-6 grid gap-4">{article.actions.map((item, index) => <li key={item} className="flex gap-4 rounded-xl border border-slate-200 p-5 leading-7 text-slate-700"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime-400 font-black text-emerald-950">{index + 1}</span>{item}</li>)}</ol>
        <p className="mt-7 leading-8 text-slate-700">Do not combine products or disturb a nest, bait placement, or treatment area unless the product label or provider instructions specifically allow it. For urgent medical concerns, contact an appropriate medical or emergency service.</p>
        <h2 className="mt-12 font-heading text-3xl font-black text-[#07172d]">Questions for a local provider</h2>
        <ul className="mt-6 list-disc space-y-3 pl-6 leading-7 text-slate-700">{article.questions.map((item) => <li key={item}>{item}</li>)}</ul>
        <div className="mt-12 rounded-2xl bg-emerald-50 p-7"><h2 className="font-heading text-2xl font-black text-emerald-950">Continue researching this service</h2><p className="mt-3 leading-7 text-slate-700">Review the related service entity, then select a state and city to see locally organized information.</p>{service && <Link href={`/services/${service.slug}`} className="mt-5 inline-flex rounded-xl bg-emerald-700 px-5 py-3 font-black text-white">Explore {service.name} →</Link>}</div>
        <p className="mt-10 border-t pt-6 text-sm leading-6 text-slate-500">Batys Pest Control provides general information and referrals. Independent providers determine availability, diagnosis, methods, pricing, and service terms. Verify licensing and follow product labels and local requirements.</p>
      </article>
    </>
  );
}
