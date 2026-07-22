import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articleFaqs, articleSections, articles, findArticle } from '@/lib/articles';
import { findService } from '@/lib/locations';
import { SITE } from '@/lib/site';
import { SITE_IMAGES } from '@/lib/siteImages';

type Props = { params: Promise<{ slug: string }> };
type ArticleItem = (typeof articles)[number];

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

function conciseTitle(title: string) {
  const firstClause = title.split(':')[0].split(',')[0].trim();
  if (firstClause.length <= 52) return firstClause;
  return firstClause.slice(0, 52).replace(/\s+\S*$/, '').trim();
}

function imageForArticle(article: ArticleItem) {
  const topic = `${article.slug} ${article.category} ${article.pest}`.toLowerCase();
  if (/rat|mouse|rodent/.test(topic)) return SITE_IMAGES.rodent;
  if (/ant/.test(topic)) return SITE_IMAGES.ants;
  if (/mosquito/.test(topic)) return SITE_IMAGES.mosquitoFogging;
  if (/commercial/.test(topic)) return SITE_IMAGES.commercialFogging;
  if (/seasonal|prevention|exclusion/.test(topic)) return SITE_IMAGES.exteriorSpray;
  return SITE_IMAGES.technician;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) return {};
  const image = imageForArticle(article);
  return {
    title: conciseTitle(article.title),
    description: article.summary,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      title: conciseTitle(article.title),
      description: article.summary,
      type: 'article',
      url: `${SITE.url}/articles/${article.slug}`,
      images: [{ url: image, alt: `${article.pest} inspection and pest-control planning` }],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();

  const sections = articleSections(article);
  const faqs = articleFaqs(article);
  const service = findService(article.serviceSlug);
  const related = articles
    .filter((item) => item.slug !== article.slug && (item.category === article.category || item.serviceSlug === article.serviceSlug))
    .slice(0, 4);
  const featuredImage = imageForArticle(article);
  const secondaryImage = featuredImage === SITE_IMAGES.technician ? SITE_IMAGES.exteriorSpray : SITE_IMAGES.technician;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    image: [featuredImage, secondaryImage],
    author: { '@type': 'Organization', name: SITE.name },
    publisher: { '@type': 'Organization', name: SITE.name },
    mainEntityOfPage: `${SITE.url}/articles/${article.slug}`,
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
  const crumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE.url}/articles` },
      { '@type': 'ListItem', position: 3, name: article.title, item: `${SITE.url}/articles/${article.slug}` },
    ],
  };
  const json = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json(crumbSchema) }} />

      <section className="bg-[#0b1c2d] px-4 py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <nav className="text-sm text-slate-300"><Link href="/">Home</Link><span className="mx-2">/</span><Link href="/articles">Blog</Link><span className="mx-2">/</span>{article.category}</nav>
            <p className="mt-9 text-xs font-black uppercase tracking-[.2em] text-sky-300">{article.category} Guide</p>
            <h1 className="mt-4 font-heading text-4xl font-black leading-tight sm:text-5xl">{article.title}</h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300">{article.summary}</p>
            <div className="mt-7 flex flex-wrap gap-4 text-sm font-bold text-slate-300"><span>Inspection-first guidance</span><span>•</span><span>Property-focused advice</span><span>•</span><span>Independent-provider disclosure</span></div>
          </div>
          <figure className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">
            <img src={featuredImage} alt={`${article.pest} warning signs and inspection guidance`} width="1200" height="800" fetchPriority="high" className="h-full min-h-[340px] w-full object-cover" />
          </figure>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 lg:grid-cols-[1fr_320px]">
        <article className="min-w-0">
          <div className="rounded-2xl border border-sky-200 bg-sky-50 p-6">
            <p className="font-black text-sky-950">Key takeaway</p>
            <p className="mt-2 leading-7 text-sky-950/80">Accurate identification and inspection come before treatment. Use the signs and methods below to organize questions, then rely on a property-specific assessment before authorizing work.</p>
          </div>

          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" aria-labelledby="related-resources">
            <h2 id="related-resources" className="font-heading text-2xl font-black text-[#0b1c2d]">Related pest-control resources</h2>
            <p className="mt-3 leading-7 text-slate-600">
              {service ? <><Link href={`/services/${service.slug}`} className="font-black text-sky-600">Review {service.name}</Link>, </> : null}
              <Link href="/locations" className="font-black text-sky-600">find pest-control information for your state and city</Link>, or <Link href="/articles" className="font-black text-sky-600">browse all pest-control guides</Link>.
            </p>
          </section>

          {sections.map((section, index) => (
            <section key={section.heading} className="mt-12">
              <h2 className="font-heading text-3xl font-black leading-tight text-[#10233b]">{section.heading}</h2>
              {section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex} className="mt-5 text-[17px] leading-8 text-slate-700">{paragraph}</p>)}

              {index === 1 && <div className="mt-7"><h3 className="font-heading text-xl font-black text-[#10233b]">Signs to document before inspection</h3><div className="mt-4 grid gap-3 sm:grid-cols-2">{article.signs.map((sign) => <div key={sign} className="rounded-xl bg-slate-50 p-4 font-bold text-slate-700"><span className="mr-2 text-sky-600">✓</span>{sign}</div>)}</div></div>}

              {index === 3 && service && <p className="mt-6 rounded-xl border-l-4 border-sky-500 bg-sky-50 p-5 leading-7 text-slate-700">For a service-specific overview, preparation guidance, and provider questions, review our <Link href={`/services/${service.slug}`} className="font-black text-sky-700">{service.name} page</Link>.</p>}

              {index === 4 && <><div className="mt-7"><h3 className="font-heading text-xl font-black text-[#10233b]">Methods a provider may discuss</h3><div className="mt-4 grid gap-3 sm:grid-cols-2">{article.methods.map((method) => <div key={method} className="rounded-xl border border-slate-200 p-4 font-bold text-slate-700">{method}</div>)}</div></div><figure className="mt-9 overflow-hidden rounded-2xl"><img src={secondaryImage} alt={`Professional inspection and treatment planning for ${article.pest}`} width="1200" height="800" loading="lazy" className="h-[360px] w-full object-cover" /><figcaption className="bg-slate-50 px-4 py-3 text-sm text-slate-500">Treatment scope should follow identification, inspection findings, property conditions, and applicable product instructions.</figcaption></figure></>}

              {index === 7 && <p className="mt-6 rounded-xl bg-slate-50 p-5 leading-7 text-slate-700">Service requirements vary by location. Use the <Link href="/locations" className="font-black text-sky-700">state and city directory</Link> to preserve local context when reviewing provider options.</p>}
            </section>
          ))}

          <section className="mt-14 border-t border-slate-200 pt-12">
            <p className="text-xs font-black uppercase tracking-[.18em] text-sky-700">Frequently asked questions</p>
            <h2 className="mt-3 font-heading text-4xl font-black text-[#10233b]">Questions about {article.pest}</h2>
            <div className="mt-8 space-y-3">{faqs.map(([question, answer]) => <details key={question} className="rounded-xl border border-slate-200 bg-white p-5"><summary className="cursor-pointer font-black text-[#10233b]">{question}</summary><p className="mt-3 leading-7 text-slate-600">{answer}</p></details>)}</div>
          </section>
        </article>

        <aside>
          <div className="sticky top-24 space-y-6">
            <div className="rounded-2xl bg-[#0b1c2d] p-6 text-white"><p className="text-xs font-black uppercase tracking-[.18em] text-sky-300">Need local information?</p><h2 className="mt-3 font-heading text-2xl font-black">Check provider availability</h2><p className="mt-3 text-sm leading-6 text-slate-300">Describe the location, pest evidence, affected areas, and urgency.</p><a href={SITE.phoneHref} className="mt-5 block rounded-lg bg-[#f47b20] px-5 py-4 text-center font-black">Call {SITE.phoneDisplay}</a></div>
            {service && <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6"><p className="text-xs font-black uppercase tracking-[.18em] text-sky-700">Related service</p><h2 className="mt-3 font-heading text-2xl font-black text-[#10233b]">{service.name}</h2><p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p><Link href={`/services/${service.slug}`} className="mt-5 inline-flex font-black text-sky-700">View service →</Link></div>}
            <div className="rounded-2xl border border-slate-200 p-6"><h2 className="font-heading text-2xl font-black text-[#10233b]">Related guides</h2><div className="mt-5 space-y-4">{related.map((item) => <Link key={item.slug} href={`/articles/${item.slug}`} className="block border-b border-slate-100 pb-4 text-sm font-bold leading-6 text-slate-700 last:border-0">{item.title} →</Link>)}</div><Link href="/articles" className="mt-5 inline-flex font-black text-sky-700">View all blog posts →</Link></div>
          </div>
        </aside>
      </div>

      <section className="bg-[#16b7df] px-4 py-14 text-white"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center"><div><h2 className="font-heading text-3xl font-black">Need help choosing the next step?</h2><p className="mt-2 text-sky-50">Browse services and locations or call to check independent-provider availability.</p></div><div className="flex flex-wrap gap-3"><Link href="/services" className="rounded-lg bg-[#10233b] px-6 py-4 font-black">View Services</Link><Link href="/locations" className="rounded-lg border border-white/40 bg-white/10 px-6 py-4 font-black">Browse Locations</Link><a href={SITE.phoneHref} className="rounded-lg bg-white px-6 py-4 font-black text-[#10233b]">Call Now</a></div></div></section>
    </>
  );
}
