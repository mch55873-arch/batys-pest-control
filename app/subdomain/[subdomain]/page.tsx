import { notFound } from 'next/navigation';
import Link from 'next/link';
import database from '../../../data/usa_database.json';
import servicesData from '../../../data/services.json';

export default async function SubdomainPage({ params }: { params: Promise<{ subdomain: string }> }) {
  const resolvedParams = await params;
  const subdomain = resolvedParams.subdomain.toLowerCase();

  // 1. Is it a State Subdomain? (e.g., 'ca', 'tx')
  const stateData = database.states.find(s => s.code === subdomain);
  
  if (stateData) {
    return (
      <div className="min-h-screen bg-white">
        {/* 1. Very Top: Modern Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#0d1b2a] to-[#1b263b] text-white py-24 px-4">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[350px] relative z-10">
            <div className="max-w-3xl">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-semibold text-sm mb-6 tracking-wide backdrop-blur-sm">
                ⭐ TOP RATED PEST CONTROL
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-[1.1]">
                Expert Exterminators in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{stateData.name}</span>
              </h1>
              <p className="text-lg md:text-2xl font-light mb-10 text-gray-300 leading-relaxed">
                Your trusted, local pest control professionals. Fast response, guaranteed results.
              </p>
              <a href="tel:614-926-0787" className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-8 py-4 rounded-full text-xl font-bold transition-all shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] hover:shadow-[0_0_60px_-15px_rgba(59,130,246,0.7)] hover:-translate-y-1">
                <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                (614) 926-0787
                <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">→</span>
              </a>
            </div>
            
            {/* Trust Badges - Glassmorphism */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
              {[
                { count: "100+", label: "Verified Technicians", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
                { count: "50K+", label: "Homes Protected", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
                { count: "4.9/5", label: "Customer Rating", icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" }
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-5 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                  <div className="flex-shrink-0 text-blue-400">
                    <svg className="w-12 h-12 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={badge.icon} /></svg>
                  </div>
                  <div>
                    <div className="text-3xl font-bold tracking-tight text-white">{badge.count}</div>
                    <div className="text-sm font-medium uppercase tracking-wider text-blue-200 mt-1">{badge.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Modern Services List */}
        <section className="py-24 px-4 bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-3">Targeted Solutions</h2>
              <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Professional Pest Control in {stateData.name}</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Emergency Pest Control', desc: `Immediate response for critical infestations. Call our ${stateData.name} team for fast relief.`, icon: "M13 10V3L4 14h7v7l9-11h-7z" },
                { name: 'Termite Protection', desc: `Advanced detection and elimination of structural pests in ${stateData.name}.`, icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
                { name: 'Rodent Exclusion', desc: `Comprehensive sealing and trapping to keep rats and mice out of your property.`, icon: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" },
                { name: 'Bed Bug Eradication', desc: `Guaranteed thermal heat treatments for total bed bug elimination.`, icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
                { name: 'Mosquito & Tick Control', desc: `Seasonal barrier treatments to reclaim your outdoor living spaces.`, icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
                { name: 'Ant & Roach Eradication', desc: `Strategic baiting systems to destroy colonies at their source.`, icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" },
              ].map((service, idx) => (
                <div key={idx} className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl border border-gray-100 hover:border-blue-100 transition-all duration-300 hover:-translate-y-1 flex flex-col">
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                     <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} /></svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">{service.name}</h3>
                  <p className="text-gray-500 mb-8 leading-relaxed text-[15px]">
                    {service.desc}
                  </p>
                  <a href="tel:614-926-0787" className="mt-auto font-bold text-blue-600 flex items-center gap-2 group/btn">
                    Get Free Quote 
                    <span className="transform group-hover/btn:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3 & 4. Premium Map and Cities List */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
             <div className="text-center max-w-3xl mx-auto mb-16">
               <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 tracking-tight">Proudly Serving <span className="text-blue-600">{stateData.name}</span></h2>
               <p className="text-lg text-gray-500">Find a certified technician in your local area below.</p>
             </div>
             
             {/* Map */}
             <div className="w-full h-[500px] bg-gray-100 mb-16 rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/5 ring-1 ring-gray-200/50">
                <iframe
                  title={`${stateData.name} Map`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(stateData.name)}&t=&z=6&ie=UTF8&iwloc=&output=embed`}
                ></iframe>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {stateData.cities.map(city => {
                  const domain = 'batyspestcontrol.com';
                  const protocol = domain.includes('localhost') ? 'http' : 'https';
                  const href = `${protocol}://${city.slug}-${stateData.code}.${domain}`;
                  
                  return (
                    <a 
                      key={city.slug}
                      href={href}
                      className="group relative bg-white py-5 px-4 text-center rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-200 flex flex-col items-center justify-center overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/0 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <span className="relative z-10 font-bold text-gray-800 group-hover:text-blue-700 transition-colors">{city.name}</span>
                      <span className="relative z-10 text-xs font-medium text-gray-400 mt-1">{city.zip}</span>
                    </a>
                  );
                })}
             </div>
          </div>
        </section>
      </div>
    );
  }

  // 2. Is it a City Subdomain? (e.g., 'los-angeles-ca')
  const lastDashIndex = subdomain.lastIndexOf('-');
  if (lastDashIndex === -1) return notFound();

  const stateCode = subdomain.slice(lastDashIndex + 1);
  const citySlug = subdomain.slice(0, lastDashIndex);

  const parentState = database.states.find(s => s.code === stateCode);
  if (!parentState) return notFound();

  const cityData = parentState.cities.find(c => c.slug === citySlug);
  if (!cityData) return notFound();

  // 3. Generate Schema Markup (Structured Data) for Local SEO
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": `PestDefense of ${cityData.name}`,
    "url": `https://${cityData.slug}-${parentState.code}.pestdefense.com`,
    "telephone": "614-926-0787",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityData.name,
      "addressRegion": parentState.code.toUpperCase(),
      "postalCode": cityData.zip,
      "addressCountry": "US"
    },
    "areaServed": {
      "@type": "City",
      "name": cityData.name
    }
  };

  // Render the City Landing Page (The "Money" Page)
  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      
      {/* 1. Header/Navigation (Now provided by Global Layout) */}


      {/* 2. Premium Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0d3b2e] via-[#0f4a3c] to-[#165a4a] text-white py-24 px-4 overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-green-50 px-5 py-2 rounded-full text-sm font-bold tracking-wider mb-8">
              🚨 TOP RATED EXTERMINATORS IN {cityData.name.toUpperCase()}
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-[1.1] tracking-tight">
              Pest Control in <span className="text-[#ff7340]">{cityData.name} Near Me</span>
            </h1>
            <p className="text-xl text-green-100 mb-10 leading-relaxed font-light">
              Your trusted and local Exterminator in {cityData.name}, {parentState.code.toUpperCase()}. Fast response, guaranteed results.
            </p>
            <a href="tel:614-926-0787" className="group inline-flex items-center gap-3 bg-[#ff7340] hover:bg-[#ff5d20] text-white px-8 py-4 rounded-lg font-bold text-xl shadow-[0_0_30px_-5px_rgba(255,115,64,0.5)] transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_-5px_rgba(255,115,64,0.7)]">
              <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              (614) 926-0787
              <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-1">→</span>
            </a>
          </div>
          <div className="hidden lg:block relative">
             <div className="absolute inset-0 bg-gradient-to-r from-[#0d3b2e] to-transparent z-10 w-24"></div>
             <img src="https://images.unsplash.com/photo-1604709177225-055f99402ea3?auto=format&fit=crop&w=1200&q=80" alt={`Exterminator in ${cityData.name}`} className="rounded-2xl shadow-2xl opacity-80 mix-blend-luminosity border-4 border-white/10 w-full h-[500px] object-cover" />
          </div>
        </div>
      </section>

      {/* 3. About Company Section */}
      <section id="about" className="py-24 px-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-[#0f4a3c] rounded-3xl transform translate-x-4 translate-y-4"></div>
            <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80" alt={`Pest Control team in ${cityData.name}`} className="relative rounded-3xl shadow-xl z-10 border border-gray-200 w-full h-[600px] object-cover" />
          </div>
          <div>
            <h4 className="text-[#ff7340] font-bold uppercase tracking-wider mb-2 text-sm">About Us</h4>
            <h2 className="text-4xl font-extrabold mb-6 text-gray-900 tracking-tight">About our Pest Control Company in {cityData.name}</h2>
            <div className="w-20 h-1 bg-[#ff7340] mb-8 rounded-full"></div>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We provide top-tier extermination services across the {cityData.name} region. With years of local experience, our certified technicians understand the unique pest challenges in {parentState.code.toUpperCase()}.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Whether you are dealing with a sudden termite swarm, a stubborn rodent infestation, or seasonal mosquitoes, we use advanced, eco-friendly methods to protect your property and family safely and effectively.
            </p>
            <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="text-[#ff7340]">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <div>
                 <h4 className="font-bold text-gray-900 text-xl">100% Guaranteed</h4>
                 <p className="text-gray-500">If pests return, so do we.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Massive Services Grid */}
      <section id="services" className="py-24 px-4 bg-[#f8f9fa] border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Professional Pest Control services in {cityData.name}</h2>
            <p className="text-xl text-gray-600">Comprehensive extermination solutions for every type of infestation.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service, idx) => (
              <div key={idx} className="group bg-white border border-gray-100 p-8 flex flex-col items-center text-center rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-xl font-bold mb-4 text-gray-900 leading-tight group-hover:text-[#0f4a3c] transition-colors">{service.name} {cityData.name}</h3>
                <p className="text-gray-500 mb-8 leading-relaxed text-sm">
                  {service.description}
                </p>
                <Link href={`/${service.slug}`} className="mt-auto inline-flex items-center gap-3 border-2 border-gray-100 px-6 py-2.5 text-sm font-bold text-gray-700 rounded-full hover:border-[#ff7340] hover:text-[#ff7340] transition-colors group/btn">
                  Learn More 
                  <span className="bg-[#fbcc05] text-black rounded-full w-6 h-6 flex items-center justify-center font-extrabold transform group-hover/btn:translate-x-1 transition-transform">➔</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Trust Badges Bar */}
      <section className="bg-[#0f4a3c] py-12 px-4 text-white">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-12 md:gap-24">
          <div className="flex items-center gap-4">
             <span className="text-4xl text-[#ff7340]">⏰</span>
             <div>
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-green-200 text-sm font-medium tracking-wider uppercase">Available</div>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <span className="text-4xl text-[#ff7340]">🛡️</span>
             <div>
                <div className="text-2xl font-bold">Licensed</div>
                <div className="text-green-200 text-sm font-medium tracking-wider uppercase">& Insured</div>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <span className="text-4xl text-[#ff7340]">⚡</span>
             <div>
                <div className="text-2xl font-bold">Fast</div>
                <div className="text-green-200 text-sm font-medium tracking-wider uppercase">Response</div>
             </div>
          </div>
        </div>
      </section>

      {/* 6. Detailed Content / Why Choose Us */}
      <section className="py-24 px-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h4 className="text-[#ff7340] font-bold uppercase tracking-wider mb-2 text-sm">Why Choose Us</h4>
            <h2 className="text-4xl font-extrabold mb-8 text-gray-900 tracking-tight">Why hire our {cityData.name} exterminators?</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              When pests invade your home, you need a team you can trust. Our {cityData.name} technicians are rigorously trained to identify and eliminate infestations at their source, ensuring they never return.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                "Locally owned and operated in the area",
                "Eco-friendly and pet-safe treatment options",
                "Same-day emergency response available",
                "Transparent, upfront pricing with no hidden fees",
                "Comprehensive inspections to find hidden nests"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span className="text-gray-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Pest Control Equipment" className="rounded-3xl shadow-2xl relative z-10 border-8 border-white" />
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-100 to-transparent rounded-full -z-10 blur-xl"></div>
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section id="faq" className="py-24 px-4 bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Got questions about pest control in {cityData.name}? We have answers.</p>
          </div>
          <div className="space-y-6">
            {[
              { q: `How quickly can you arrive in ${cityData.name}?`, a: `For emergencies, our dispatch team can typically have a certified technician at your ${cityData.zip} property within 60 to 90 minutes.` },
              { q: `Are your treatments safe for children and pets?`, a: `Yes. We prioritize eco-friendly and low-toxicity treatments. We will always inform you of safety protocols, which usually just involve keeping pets out of the treated area until it dries.` },
              { q: `Do I need to leave my home during the treatment?`, a: `For standard perimeter treatments, no. For severe interior infestations (like certain bed bug or roach treatments), we may recommend vacating for a few hours. Your technician will provide clear instructions.` },
              { q: `Do you offer warranties in ${cityData.name}?`, a: `Absolutely. We offer a 100% satisfaction guarantee on all our recurring services and major extermination treatments.` }
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Surrounding Areas / Neighborhoods */}
      <section className="py-24 px-4 bg-[#f8f9fa] border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">- SERVICE AREAS</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0d1b2a] mt-4 mb-6 tracking-tight">
              Serving {cityData.name} and Surrounding Areas
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our pest control experts cover all of {cityData.name}, {parentState.code.toUpperCase()}, including nearby communities. No matter where you are in the area, our emergency services reach you fast to resolve pest issues without delay.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {parentState.cities
              .filter(c => c.slug !== cityData.slug)
              .slice(0, 18)
              .map((city, idx) => (
                <Link key={idx} href={`https://${city.slug}-${parentState.code}.batyspestcontrol.com`} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all flex flex-col items-center text-center group">
                  <svg className="w-8 h-8 text-[#b18c95] mb-3 group-hover:-translate-y-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span className="font-bold text-gray-900 text-sm mb-1">{city.name}</span>
                  <span className="text-xs text-gray-500">{city.zip}</span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* 9. Comprehensive Dark Footer (Now provided by Global Layout) */}


    </div>
  );
}
