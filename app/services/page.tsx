import Link from 'next/link';
import type { Metadata } from 'next';
import servicesData from '../../data/services.json';

export const metadata: Metadata = {
  title: 'Our Pest Control Services | Village Plumbers',
  description: 'Browse our comprehensive list of professional pest control and extermination services. We handle everything from termites to rodents.',
  alternates: {
    canonical: 'https://www.villageplumbers.co.nz/services',
  }
};

export default function ServicesPage() {
  return (
    <main className="bg-white">
      {/* 1. Page Hero */}
      <section className="relative bg-gray-900 text-white py-20 md:py-28">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=2000&q=80" 
            alt="Pest Control Services" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900/90"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="text-accent-500 font-semibold text-sm uppercase tracking-wider mb-4 block">
            Village Plumbers
          </span>
          <h1 className="text-4xl text-white md:text-5xl lg:text-6xl font-bold mb-6">
            Services
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Professional pest control and extermination services across the USA. Browse our complete range of targeted solutions below.
          </p>
        </div>
      </section>

      {/* 2. Breadcrumbs */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4 max-w-7xl">
          <nav aria-label="Breadcrumb" className="text-sm">
            <ol className="flex items-center space-x-2">
              <li><Link href="/" className="text-gray-600 hover:text-accent-500 transition-colors">Home</Link></li>
              <li><span className="text-gray-400">/</span></li>
              <li className="text-gray-900 font-medium">Services</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* 3. Services Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <article key={service.slug} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col group">
                <Link href={`/${service.slug}`} className="block flex-grow flex flex-col">
                  {/* Image Header */}
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/photo-1604709177225-055f99402ea3?auto=format&fit=crop&w=600&q=80&sig=${index}`} 
                      alt={service.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Badge */}
                    <span className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      24/7 Emergency Service
                    </span>
                    
                    {/* Icon Box */}
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 bg-accent-500 text-white rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Area */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-xl font-bold mb-3 text-brand-900 group-hover:text-accent-500 transition-colors line-clamp-2">
                      {service.name}
                    </h2>
                    
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow leading-relaxed">
                      {service.description}
                    </p>
                    
                    <span className="inline-flex items-center text-accent-500 font-semibold group-hover:text-accent-600 transition-colors mt-auto">
                      Learn More
                      <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
