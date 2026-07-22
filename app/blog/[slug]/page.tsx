import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles } from '@/data/articles';
import { findService, pestServices, states, stateUrl } from '@/lib/locations';
import { SITE } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };
const findArticle = (slug: string) => articles.find((article) => article.slug === slug);

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = findArticle((await params).slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: { type: 'article', title: article.title, description: article.description, url: `/blog/${article.slug}` },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = findArticle((await params).slug);
  if (!article) notFound();
  const service = findService(article.serviceSlug);
  const relatedServices = pestServices.filter((item) => item.category === service?.category && item.slug !== service?.slug).slice(0, 4);
  const relatedArticles = articles.filter((item) => item.slug !== article.slug && (item.category === article.category || item.serviceSlug === article.serviceSlug)).slice(0, 3);
  const fallbackArticles = relatedArticles.length >= 3 ? relatedArticles : [...relatedArticles, ...articles.filter((item) => item.slug !== article.slug && !relatedArticles.includes(item))].slice(0, 3);
  const featuredStates = states.filter((state) => ['ca', 'tx', 'fl', 'ny', 'pa', 'oh'].includes(state.code));
  const url = `${SITE.url}/blog/${article.slug}`;
  const faqs = article.questions.map((question, index) => ({
    question,
    answer: index === 0
      ? `Ask the provider to connect the recommendation to visible evidence, inspection findings, and the conditions supporting ${article.category.toLowerCase()} activity.`
      : index === 1
        ? 'Request the proposed scope in writing, including treatment areas, preparation, safety instructions, exclusions, and the planned follow-up.'
        : 'Confirm the answer directly with the independent provider and verify any licensing, pricing, product, and warranty details before approving service.',
  }));
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Article', '@id': `${url}#article`, headline: article.title, description: article.description, mainEntityOfPage: url, about: [{ '@type': 'Thing', name: article.category }, ...(service ? [{ '@type': 'Service', name: service.name, url: `${SITE.url}/services/${service.slug}` }] : [])], author: { '@type': 'Organization', name: SITE.name, url: SITE.url }, publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url }, inLanguage: 'en-US' },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url }, { '@type': 'ListItem', position: 2, name: 'Pest Guides', item: `${SITE.url}/blog` }, { '@type': 'ListItem', position: 3, name: article.title, item: url }] },
      { '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="relative overflow-hidden bg-[#07172d] px-4 py-20 text-white">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full border-[70px] border-lime-300/[.05]" />
        <div className="relative mx-auto max-w-4xl">
          <nav className="text-xs font-bold uppercase tracking-wider text-slate-400"><Link className="hover:text-lime-300" href="/blog">Pest Guides</Link> <span className="mx-2">/</span> {article.category}</nav>
          <p className="mt-8 text-xs font-black uppercase tracking-[.18em] text-lime-300">{article.category} Resource</p>
          <h1 className="mt-4 font-heading text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl">{article.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{article.description}</p>
          <div className="mt-8 flex flex-wrap gap-3 text-xs font-bold text-slate-300"><span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Identification & evidence</span><span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Practical next steps</span><span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Provider questions</span></div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article className="max-w-4xl">
          <p className="article-lead">Reliable pest-control decisions begin with correct identification and clear evidence. Before cleaning, sealing, or treating the area, record the exact location, time, frequency, and physical signs. This gives an independent provider a stronger basis for inspection and helps separate an active problem from old damage or an isolated sighting.</p>

          <h2 className="article-heading">Understanding the {article.category.toLowerCase()} problem</h2>
          <p className="article-copy">{article.description} Conditions such as food, water, shelter, building access, weather, and nearby activity can change what a provider finds. The goal of an inspection is to identify the pest, determine where it is active, and connect the evidence to a practical control or prevention plan.</p>

          <h2 className="article-heading">Evidence and warning signs to document</h2>
          <p className="article-copy">Look for a pattern rather than relying on one symptom. Photographs, intact specimens, dated sighting notes, and a simple map of affected areas can make identification more reliable.</p>
          <ul className="mt-6 grid gap-4">{article.signals.map((item) => <li key={item} className="flex gap-4 rounded-xl border border-slate-200 bg-[#f7faf8] p-5 leading-7 text-slate-700"><span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-600 text-xs font-black text-white">✓</span>{item}</li>)}</ul>
          <p className="article-copy mt-7">A single sign does not always prove an active infestation. Consider where the evidence appears, whether it is fresh, and whether activity is spreading. Avoid relying only on bites, noises, odors, or one damaged item when direct pest evidence is available.</p>

          <h2 className="article-heading">Practical next steps before treatment</h2>
          <ol className="mt-6 grid gap-4">{article.actions.map((item, index) => <li key={item} className="flex gap-4 rounded-xl border border-slate-200 p-5 leading-7 text-slate-700"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-lime-300 font-heading font-black text-emerald-950">0{index + 1}</span>{item}</li>)}</ol>
          <p className="article-copy mt-7">Do not combine products, block an active nest opening, or disturb bait and treatment placements unless the label or provider instructions allow it. If a pest creates an immediate medical or safety risk, move people and pets away and contact the appropriate emergency or medical service.</p>

          <h2 className="article-heading">What a treatment plan should explain</h2>
          <p className="article-copy">A proportionate plan should connect the confirmed pest to the proposed method. Ask which areas will be inspected or treated, what occupants must do before and after service, what conditions need correction, and when results will be reassessed. A written scope should distinguish immediate control from exclusion, sanitation, monitoring, and follow-up.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">{['Pest identification and supporting evidence','Treatment areas and access limitations','Product, device, or non-chemical method','Preparation and re-entry instructions','Follow-up timing and expected activity','Price, exclusions, and warranty terms'].map((item) => <div key={item} className="rounded-xl border border-slate-200 p-4 text-sm font-bold text-slate-700"><span className="mr-2 text-emerald-600">✓</span>{item}</div>)}</div>

          <h2 className="article-heading">Questions for a local pest-control provider</h2>
          <div className="mt-6 grid gap-4">{faqs.map((faq) => <details key={faq.question} className="group rounded-xl border border-slate-200 bg-white p-5"><summary className="cursor-pointer list-none font-heading text-lg font-black after:float-right after:text-emerald-600 after:content-['+'] group-open:after:content-['−']">{faq.question}</summary><p className="mt-4 border-t border-slate-100 pt-4 leading-7 text-slate-600">{faq.answer}</p></details>)}</div>

          <div className="mt-12 rounded-2xl bg-[#07172d] p-8 text-white"><p className="text-xs font-black uppercase tracking-[.17em] text-lime-300">Related service entity</p><h2 className="mt-3 font-heading text-3xl font-black">Continue researching {service?.name ?? article.category}</h2><p className="mt-3 leading-7 text-slate-300">Review the service scope, then select a state and city for locally organized information.</p>{service && <Link href={`/services/${service.slug}`} className="mt-6 inline-flex rounded-xl bg-lime-300 px-5 py-3 font-black text-emerald-950">Explore {service.name} →</Link>}</div>

          {relatedServices.length > 0 && <section className="mt-12"><h2 className="font-heading text-2xl font-black text-[#07172d]">Related {service?.category} services</h2><div className="mt-5 flex flex-wrap gap-2">{relatedServices.map((item) => <Link key={item.slug} href={`/services/${item.slug}`} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-emerald-700 hover:border-emerald-500">{item.name}</Link>)}</div></section>}
          <p className="mt-12 border-t pt-6 text-sm leading-6 text-slate-500">Batys Pest Control provides general information and referrals. Independent providers determine availability, diagnosis, methods, pricing, and service terms. Verify licensing and follow product labels and local requirements.</p>
        </article>

        <aside className="space-y-7 lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-2xl border border-slate-200 bg-[#f7faf8] p-6"><p className="text-xs font-black uppercase tracking-wider text-emerald-700">In this guide</p><div className="mt-4 grid gap-3 text-sm font-bold text-slate-600"><span>Evidence & warning signs</span><span>Steps before treatment</span><span>Treatment plan checklist</span><span>Questions for providers</span></div></div>
          <div className="rounded-2xl border border-slate-200 p-6"><h2 className="font-heading text-xl font-black">Related guides</h2><div className="mt-5 grid gap-4">{fallbackArticles.map((item) => <Link key={item.slug} href={`/blog/${item.slug}`} className="border-b border-slate-100 pb-4 text-sm font-bold leading-6 text-slate-700 last:border-0 last:pb-0 hover:text-emerald-700">{item.title}</Link>)}</div></div>
          <div className="rounded-2xl bg-emerald-700 p-6 text-white"><p className="text-xs font-black uppercase tracking-wider text-lime-200">Browse by location</p><div className="mt-4 grid grid-cols-2 gap-2">{featuredStates.map((state) => <Link key={state.code} href={stateUrl(state)} className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold hover:bg-white/20">{state.name}</Link>)}</div></div>
        </aside>
      </div>
    </>
  );
}
