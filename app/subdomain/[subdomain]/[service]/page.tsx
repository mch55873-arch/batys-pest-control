import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import Link from "next/link";
import type { Metadata } from 'next';
import database from "../../../../data/usa_database.json";
import servicesData from "../../../../data/services.json";
import aiContentData from "../../../../data/ai_services_content.json";

interface CityData {
  slug: string;
  name: string;
  zip: string;
}

interface StateData {
  name: string;
  code: string;
  cities: CityData[];
}

export async function generateMetadata({ params }: { params: Promise<{ subdomain: string, service: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const subdomain = resolvedParams.subdomain.toLowerCase();
  
  const serviceData = servicesData.find(s => s.slug === resolvedParams.service);
  const serviceName = serviceData ? serviceData.name : resolvedParams.service.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  // State Subdomain (e.g. 'ca')
  const stateData = database.states.find(s => s.code === subdomain);
  if (stateData) {
    return {
      title: `${serviceName} in ${stateData.name} | Top Rated Exterminators`,
      description: `Expert ${serviceName} across ${stateData.name}. Get a free quote today and protect your home.`,
      alternates: { canonical: `https://${stateData.code}.batyspestcontrol.com/${resolvedParams.service}` },
      openGraph: {
        title: `${serviceName} in ${stateData.name} | Top Rated Exterminators`,
        description: `Expert ${serviceName} across ${stateData.name}. Get a free quote today and protect your home.`,
        url: `https://${stateData.code}.batyspestcontrol.com/${resolvedParams.service}`,
      }
    };
  }

  // City Subdomain (e.g. 'los-angeles-ca')
  const lastDashIndex = subdomain.lastIndexOf('-');
  if (lastDashIndex === -1) return {};
  const stateCode = subdomain.slice(lastDashIndex + 1);
  const citySlug = subdomain.slice(0, lastDashIndex);
  
  const parentState = database.states.find(s => s.code === stateCode);
  if (!parentState) return {};
  const cityData = parentState.cities.find(c => c.slug === citySlug);
  if (!cityData) return {};

  return {
    title: `${serviceName} in ${cityData.name}, ${stateCode.toUpperCase()} | Top Rated Exterminators`,
    description: `Expert ${serviceName} in ${cityData.name}, ${stateCode.toUpperCase()}. Get a free quote today and protect your home.`,
    alternates: { canonical: `https://${cityData.slug}-${stateCode}.batyspestcontrol.com/${resolvedParams.service}` },
    openGraph: {
      title: `${serviceName} in ${cityData.name}, ${stateCode.toUpperCase()} | Top Rated Exterminators`,
      description: `Expert ${serviceName} in ${cityData.name}, ${stateCode.toUpperCase()}. Get a free quote today and protect your home.`,
      url: `https://${cityData.slug}-${stateCode}.batyspestcontrol.com/${resolvedParams.service}`,
    }
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ subdomain: string; service: string }>;
}) {
  const resolvedParams = await params;
  const subdomain = resolvedParams.subdomain;
  const serviceSlug = resolvedParams.service;

  const dbPath = path.join(process.cwd(), "data", "usa_database.json");
  let database: { states: StateData[] } = { states: [] };
  try {
    const rawData = fs.readFileSync(dbPath, "utf-8");
    database = JSON.parse(rawData);
  } catch (err) {
    console.error("Failed to load usa_database.json", err);
  }

  const lastDashIndex = subdomain.lastIndexOf("-");
  if (lastDashIndex === -1) {
    return notFound();
  }

  const stateCode = subdomain.slice(lastDashIndex + 1).toLowerCase();
  const citySlug = subdomain.slice(0, lastDashIndex);

  const parentState = database.states.find(
    (s: StateData) => s.code.toLowerCase() === stateCode
  );

  if (!parentState) {
    return notFound();
  }

  const cityData = parentState.cities.find(
    (c: CityData) => c.slug.toLowerCase() === citySlug.toLowerCase()
  );

  if (!cityData) {
    return notFound();
  }

  const service = servicesData.find((s) => s.slug === serviceSlug);

  if (!service) {
    return notFound();
  }

  // Get 10 random/nearby cities for the sidebar
  const nearbyCities = parentState.cities
    .filter((c) => c.slug !== cityData.slug)
    .slice(0, 10);

  const rawFaqs = (aiContentData as any)[service.slug]?.faqs || [
    {
      question: `How much does ${service.name.toLowerCase()} cost in [CITY_NAME]?`,
      answer: `The cost varies depending on the severity of the issue and your property size in [CITY_NAME]. We offer free, no-obligation quotes to give you an exact price.`
    },
    {
      question: `Do you service all areas of [CITY_NAME]?`,
      answer: `Yes! We provide comprehensive ${service.name.toLowerCase()} across all of [CITY_NAME] and the surrounding areas.`
    },
    {
      question: `How quickly can you resolve a ${service.name.toLowerCase()} emergency?`,
      answer: `Our emergency teams in [CITY_NAME] can typically be on-site within 1-2 hours depending on traffic and availability.`
    }
  ];

  const processedFaqs = rawFaqs.map((faq: any) => ({
    question: faq.question.replace(/\[CITY_NAME\]/g, cityData.name).replace(/\[STATE_CODE\]/g, parentState.code.toUpperCase()),
    answer: faq.answer.replace(/\[CITY_NAME\]/g, cityData.name).replace(/\[STATE_CODE\]/g, parentState.code.toUpperCase())
  }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": processedFaqs.map((faq: any) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "PestControlService"],
    "name": `batyspestcontrol - ${cityData.name}`,
    "description": `Expert ${service.name.toLowerCase()} services in ${cityData.name}, ${parentState.code.toUpperCase()}. Fast, reliable, and affordable.`,
    "url": `https://${cityData.slug}-${parentState.code.toLowerCase()}.batyspestcontrol.com/${serviceSlug}`,
    "telephone": "614-926-0787",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityData.name,
      "addressRegion": parentState.code.toUpperCase(),
      "postalCode": cityData.zip,
      "addressCountry": "USA"
    },
    "image": "https://www.batyspestcontrol.com/logo.png"
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `Professional ${service.name} Services in ${cityData.name}, ${parentState.code.toUpperCase()}`,
    "author": {
      "@type": "Person",
      "name": "Robert Baty",
      "url": "https://www.batyspestcontrol.com/author"
    },
    "publisher": {
      "@type": "Organization",
      "name": "batyspestcontrol",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.batyspestcontrol.com/logo.png"
      }
    },
    "datePublished": "2026-07-01T08:00:00+08:00",
    "dateModified": new Date().toISOString()
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema, localBusinessSchema, articleSchema]) }}
      />
      {/* Hero Section */}
      <div className="relative bg-[#1e293b] text-white overflow-hidden py-24">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold mb-6">
              24/7 {service.name} in {cityData.name}, {parentState.code.toUpperCase()}
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Professional {service.name} in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                {cityData.name}, {parentState.code.toUpperCase()}
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
              Fast, reliable, and affordable {service.name.toLowerCase()} for your home and business in {cityData.name}. Call now for immediate assistance.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:614-926-0787"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-green-500/25"
              >
                Call 614-926-0787
              </a>
              <a
                href="#quote"
                className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg transition-all"
              >
                Get a Free Quote
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content Area */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100 mb-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Expert {service.name} Services in {cityData.name}
              </h2>
              <div className="prose prose-lg text-gray-600 max-w-none">
                {/* Dynamically render AI content if available, else fallback */}
                {((aiContentData as any)[service.slug]?.paragraphs || [
                  `When you are dealing with issues that require professional **${service.name.toLowerCase()}** in [CITY_NAME], time is of the essence. Our licensed and insured experts have been serving the [CITY_NAME] area for years, providing top-tier solutions that protect your property.`,
                  `Residents in [CITY_NAME], [STATE_CODE] trust us because we understand the specific challenges of the local climate and geography. Whether it's a residential property or a large commercial facility, our team arrives fully equipped to handle your ${service.name.toLowerCase()} needs efficiently.`
                ]).map((p: string, i: number) => (
                  <p key={i}>{p.replace(/\[CITY_NAME\]/g, cityData.name).replace(/\[STATE_CODE\]/g, parentState.code.toUpperCase())}</p>
                ))}
                
                <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-800">Why Choose Us in {cityData.name}?</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li><strong>Local Expertise:</strong> We know {cityData.name} and the specific issues common to this area.</li>
                  <li><strong>Fast Response:</strong> 24/7 emergency service available for all {cityData.name} zip codes (including {cityData.zip}).</li>
                  <li><strong>Guaranteed Results:</strong> We stand by our {service.name.toLowerCase()} with a 100% satisfaction guarantee.</li>
                </ul>
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {processedFaqs.map((faq: any, i: number) => (
                  <div key={i} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-start gap-3">
                      <span className="text-green-500 flex-shrink-0 mt-1">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 pl-8 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-8">
            {/* Sticky Form */}
            <div id="quote" className="bg-[#1e293b] rounded-2xl p-8 shadow-2xl sticky top-8">
              <h3 className="text-2xl font-bold text-white mb-2">Get Free Quotes</h3>
              <p className="text-gray-400 mb-6 text-sm">Request a callback from our {cityData.name} team.</p>
              <form className="space-y-4">
                <div>
                  <input type="text" placeholder="Your Name" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400" />
                </div>
                <div>
                  <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400" />
                </div>
                <div>
                  <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none" defaultValue={service.name}>
                    <option className="text-gray-900" value={service.name}>{service.name}</option>
                  </select>
                </div>
                <button type="button" className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-xl font-bold transition-all mt-4">
                  Request Service Now
                </button>
              </form>
            </div>

            {/* Spider Web Links */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Nearby {parentState.name} Areas We Serve
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Also providing {service.name.toLowerCase()} in these neighboring locations:
              </p>
              <div className="flex flex-wrap gap-2">
                {nearbyCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/subdomain/${city.slug}-${parentState.code}/${service.slug}`}
                    className="inline-flex items-center px-3 py-1.5 bg-gray-50 hover:bg-green-50 text-gray-700 hover:text-green-700 border border-gray-200 hover:border-green-200 rounded-lg text-sm transition-all"
                  >
                    <svg className="w-4 h-4 mr-1.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
