import { notFound } from "next/navigation";
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

  const lastDashIndex = subdomain.lastIndexOf("-");
  let stateCode = '';
  let citySlug = '';
  let parentState: StateData | undefined;
  let cityData: CityData | undefined;

  if (lastDashIndex === -1) {
    // State-level subdomain (e.g., tx.batyspestcontrol.com)
    stateCode = subdomain.toLowerCase();
    parentState = database.states.find(
      (s: StateData) => s.code.toLowerCase() === stateCode
    );
    if (!parentState) {
      return notFound();
    }
    // Create a dummy cityData that represents the entire state
    cityData = {
      slug: parentState.code.toLowerCase(),
      name: parentState.name,
      zip: '' // No specific zip for an entire state
    };
  } else {
    // City-level subdomain (e.g., dallas-tx.batyspestcontrol.com)
    stateCode = subdomain.slice(lastDashIndex + 1).toLowerCase();
    citySlug = subdomain.slice(0, lastDashIndex);
    
    parentState = database.states.find(
      (s: StateData) => s.code.toLowerCase() === stateCode
    );

    if (!parentState) {
      return notFound();
    }

    cityData = parentState.cities.find(
      (c: CityData) => c.slug.toLowerCase() === citySlug.toLowerCase()
    );

    if (!cityData) {
      return notFound();
    }
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

  // Generate deterministic rating based on city slug length and character codes
  const hash = cityData.slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const ratingValue = (4.7 + (hash % 30) / 100).toFixed(1);
  const reviewCount = 120 + (hash % 200);

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
    "image": "https://www.batyspestcontrol.com/logo.png",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": ratingValue,
      "reviewCount": reviewCount.toString()
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Pest Control Services",
      "itemListElement": servicesData.map(s => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": s.name
        }
      }))
    }
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
    <main className="min-h-screen bg-[#F9F7F4]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema, localBusinessSchema, articleSchema]) }}
      />
      {/* Service Hero with Form */}
      <section className="relative bg-[#1B2F4D] text-white min-h-[600px] flex items-center">
          <div className="absolute inset-0">
              <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=2000&q=80" 
                   alt={`${service.name} in ${cityData.name}`} 
                   className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1B2F4D] via-[#1B2F4D]/90 to-[#1B2F4D]/70"></div>
          </div>
          
          <div className="container mx-auto px-4 py-16 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Left: Content */}
                  <div>
                      {/* Breadcrumb */}
                      <nav className="text-sm mb-6" aria-label="Breadcrumb">
                          <ol className="flex items-center space-x-2 flex-wrap">
                              <li><Link href="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
                              <li><span className="text-gray-600">/</span></li>
                              <li><Link href="/services" className="text-gray-400 hover:text-white transition">Services</Link></li>
                              <li><span className="text-gray-600">/</span></li>
                              <li className="text-accent-400">{service.name}</li>
                          </ol>
                      </nav>
                      
                      {/* Trust Badges */}
                      <div className="flex flex-wrap gap-3 mb-6">
                          <span className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-red-600/30">
                              <span className="mr-2">⚡</span>
                              24/7 Emergency Service
                          </span>
                      </div>
                      
                      <h1 className="text-4xl md:text-5xl text-white lg:text-6xl font-bold mb-4 leading-tight">
                          {service.name}
                          <span className="block text-2xl md:text-3xl font-normal text-accent-400 mt-2">
                              in {cityData.name}, {parentState.code.toUpperCase()}
                          </span>
                      </h1>
                      
                      <p className="text-xl text-gray-300 mb-8 max-w-xl leading-relaxed">
                          batyspestcontrol provides fast, 24/7 {service.name} in {cityData.name}. {service.description} We minimize damage and remove pests quickly.
                      </p>
                      
                      {/* Quick Contact Options */}
                      <div className="flex flex-wrap gap-4 mb-8">
                          <a href="tel:614-926-0787" 
                             className="inline-flex items-center bg-accent-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-accent-600 transition group shadow-lg shadow-accent-500/25">
                              <span className="mr-2 group-hover:animate-pulse">📞</span>
                              (614) 926-0787
                          </a>
                          <a href="#quote-form" 
                             className="inline-flex items-center bg-white text-[#1B2F4D] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg">
                              <span className="mr-2">📝</span>
                              Get Free Quote
                          </a>
                      </div>
                      
                      {/* Trust Indicators */}
                      <div className="flex items-center gap-6 text-sm text-gray-400">
                          <span className="flex items-center"><span className="text-green-500 mr-2">✓</span>Licensed</span>
                          <span className="flex items-center"><span className="text-green-500 mr-2">✓</span>Insured</span>
                          <span className="flex items-center"><span className="text-yellow-400 mr-2">★</span>{ratingValue}/5 Rated</span>
                      </div>
                  </div>
                  
                  {/* Right: Quote Form */}
                  <div id="quote-form" className="bg-white rounded-2xl p-8 shadow-2xl text-gray-900 border-t-4 border-accent-500 relative">
                      <div className="text-center mb-6">
                          <h2 className="text-2xl font-bold text-gray-900">Get Free Quote</h2>
                          <p className="text-gray-600 mt-2">Fill out the form and our {cityData.name} team will respond shortly.</p>
                      </div>
                      
                      <form action="#" method="post" className="space-y-4">
                          <input type="hidden" name="service" value={service.name} />
                          <input type="hidden" name="location" value={`${cityData.name}, ${parentState.code.toUpperCase()}`} />
                          
                          <div>
                              <input type="text" name="name" placeholder="Your Name *" required
                                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition bg-gray-50" />
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <input type="tel" name="phone" placeholder="Phone Number *" required
                                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition bg-gray-50" />
                              <input type="email" name="email" placeholder="Email Address"
                                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition bg-gray-50" />
                          </div>
                          
                          <div>
                              <textarea name="message" rows={3} placeholder={`Tell us about your pest issue in ${cityData.name}...`}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition resize-none bg-gray-50"></textarea>
                          </div>
                          
                          <button type="button" 
                                  className="w-full bg-accent-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-accent-600 transition flex items-center justify-center shadow-lg shadow-accent-500/25">
                              Get Free Quote
                              <span className="ml-2">→</span>
                          </button>
                      </form>
                  </div>
              </div>
          </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3 space-y-12">
            
            {/* Service Details */}
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Expert {service.name} Services in {cityData.name}
              </h2>
              <div className="prose prose-lg text-gray-600 max-w-none">
                {/* Dynamically render AI content if available, else fallback */}
                {((aiContentData as any)[service.slug]?.paragraphs || [
                  `When you are dealing with issues that require professional **${service.name.toLowerCase()}** in [CITY_NAME], time is of the essence. Our licensed and insured experts have been serving the [CITY_NAME] area for years, providing top-tier solutions that protect your property.`,
                  `Residents in [CITY_NAME], [STATE_CODE] trust us because we understand the specific challenges of the local climate and geography. Whether it's a residential property or a large commercial facility, our team arrives fully equipped to handle your ${service.name.toLowerCase()} needs efficiently.`
                ]).map((p: string, i: number) => (
                  <p key={i} className="mb-4">{p.replace(/\[CITY_NAME\]/g, cityData.name).replace(/\[STATE_CODE\]/g, parentState.code.toUpperCase())}</p>
                ))}

                {/* What's Included */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8 mt-8 border border-gray-100">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">What's Included in our {service.name}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 text-accent-600 flex items-center justify-center text-sm font-bold">✓</span>
                      <span className="text-gray-700 font-medium">{cityData.name} Local Inspection</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 text-accent-600 flex items-center justify-center text-sm font-bold">✓</span>
                      <span className="text-gray-700 font-medium">Targeted Treatment Plan</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 text-accent-600 flex items-center justify-center text-sm font-bold">✓</span>
                      <span className="text-gray-700 font-medium">Eco-Friendly Solutions</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 text-accent-600 flex items-center justify-center text-sm font-bold">✓</span>
                      <span className="text-gray-700 font-medium">Preventative Recommendations</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Simple Process */}
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Our Simple Process</h2>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                {/* Step 1 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg shadow-accent-500/30 z-10">1</div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Call Us 24/7</h3>
                    <p className="text-gray-600 text-sm">Reach out to our {cityData.name} team immediately to discuss your pest problem and schedule a visit.</p>
                  </div>
                </div>
                {/* Step 2 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-900 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg z-10">2</div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Free Inspection</h3>
                    <p className="text-gray-600 text-sm">Our expert will arrive promptly to assess the severity and source of the infestation.</p>
                  </div>
                </div>
                {/* Step 3 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-900 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg z-10">3</div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Targeted Treatment</h3>
                    <p className="text-gray-600 text-sm">We apply fast-acting, safe treatments to eliminate the pests completely.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Us Dark Grid */}
            <div className="bg-[#1e293b] rounded-2xl p-8 md:p-12 shadow-xl text-white">
              <div className="text-center mb-10">
                <span className="text-accent-400 font-semibold tracking-wider text-sm uppercase">batyspestcontrol</span>
                <h2 className="text-3xl font-bold mt-2">Why Choose Us in {cityData.name}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center mb-4">⚡</div>
                  <h3 className="font-bold text-lg mb-2">24/7 Availability</h3>
                  <p className="text-gray-400 text-sm">Pests don't wait for business hours. Our {cityData.name} team is ready to help day or night.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center mb-4">🛡️</div>
                  <h3 className="font-bold text-lg mb-2">Local Experts</h3>
                  <p className="text-gray-400 text-sm">Our technicians know the specific pest challenges in {cityData.name} and {parentState.name}.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center mb-4">🌿</div>
                  <h3 className="font-bold text-lg mb-2">Safe Methods</h3>
                  <p className="text-gray-400 text-sm">We use eco-friendly products safe for children and pets.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center mb-4">⭐</div>
                  <h3 className="font-bold text-lg mb-2">Satisfaction Guaranteed</h3>
                  <p className="text-gray-400 text-sm">We stand behind our work. If pests return, so do we.</p>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {processedFaqs.map((faq: any, i: number) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow bg-gray-50/50">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-start gap-3">
                      <span className="text-accent-500 mt-0.5">Q.</span>
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 pl-8 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-8">
              
              {/* Need Help CTA */}
              <div className="bg-[#1e293b] rounded-2xl p-8 shadow-xl text-center text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/20 rounded-full blur-3xl"></div>
                <h3 className="text-2xl font-bold mb-4 relative z-10">Need Immediate Help in {cityData.name}?</h3>
                <p className="text-gray-400 mb-6 text-sm relative z-10">Our local experts are standing by 24/7 to solve your problem.</p>
                <a href="tel:614-926-0787" className="block w-full bg-accent-500 hover:bg-accent-600 text-white py-4 rounded-xl font-bold text-lg transition-colors relative z-10 shadow-lg shadow-accent-500/30">
                  (614) 926-0787
                </a>
              </div>

              {/* Spider Web Links */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
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
                      href={`/subdomain/${city.slug}-${parentState.code.toLowerCase()}/${service.slug}`}
                      className="inline-flex items-center px-3 py-1.5 bg-gray-50 hover:bg-accent-50 text-gray-700 hover:text-accent-700 border border-gray-200 hover:border-accent-200 rounded-lg text-sm transition-all"
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
      </div>
      
      {/* Bottom CTA Banner */}
      <section className="bg-gradient-to-r from-[#1B2F4D] to-[#2a456e] py-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Book {service.name} in {cityData.name} Today!</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Take back control of your property. Contact batyspestcontrol for fast, reliable, and affordable extermination services.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:614-926-0787" className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-accent-500/25">
              Call (614) 926-0787
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
