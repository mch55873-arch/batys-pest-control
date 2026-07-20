import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Village Plumbers',
  description: 'Your trusted pest control professionals serving customers nationwide with quality workmanship and exceptional service.',
  alternates: {
    canonical: 'https://www.villageplumbers.co.nz/about',
  }
};

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* 1. Hero Section */}
      <section className="relative bg-brand-900 text-white py-20 md:py-32">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=2000&q=80" 
            alt="About Village Plumbers" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/90 to-brand-900/70"></div>
        </div>
        
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav className="text-sm mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link href="/" className="text-surface-400 hover:text-accent-500 transition">Home</Link>
                </li>
                <li><span className="text-surface-600 mx-2">/</span></li>
                <li>
                  <span className="text-accent-500 font-medium">About Us</span>
                </li>
              </ol>
            </nav>
            
            <span className="inline-block bg-accent-500 text-brand-900 font-bold text-xs uppercase tracking-widest px-4 py-2 rounded mb-6 shadow-md">
              Pest Control Experts
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white leading-tight">
              About Village Plumbers
            </h1>
            
            <p className="text-xl text-surface-300 mb-8 max-w-2xl leading-relaxed">
              Your trusted pest control professionals serving homeowners and businesses nationwide with fast, effective, and eco-friendly extermination services.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="tel:614-926-0787" 
                 className="inline-flex items-center bg-accent-500 text-brand-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-accent-600 transition shadow-xl">
                <span className="mr-3 text-xl">📞</span>
                614-926-0787
              </a>
              <Link href="/contact" 
                 className="inline-flex items-center bg-white text-brand-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-surface-100 transition shadow-lg">
                <span className="mr-3 text-xl">✉️</span>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats Bar */}
      <section className="bg-accent-500 py-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-brand-900/10">
            <div>
              <div className="text-4xl md:text-5xl font-black text-brand-900 mb-2">15+</div>
              <div className="text-brand-900/80 font-bold tracking-wide uppercase text-sm">Services</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-brand-900 mb-2">50+</div>
              <div className="text-brand-900/80 font-bold tracking-wide uppercase text-sm">Cities Served</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-brand-900 mb-2">5★</div>
              <div className="text-brand-900/80 font-bold tracking-wide uppercase text-sm">Rating</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-brand-900 mb-2">24/7</div>
              <div className="text-brand-900/80 font-bold tracking-wide uppercase text-sm">Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Content Section */}
      <section className="py-16 md:py-24 bg-surface-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Image & Badges */}
            <div className="lg:col-span-5">
              <div className="sticky top-24">
                {/* Main Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80" 
                       alt="Pest Control Professionals"
                       className="w-full aspect-[4/3] object-cover"
                       loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-transparent to-transparent"></div>
                  
                  {/* Overlay Badge */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center mr-3 shadow-inner">
                            <span className="text-brand-900 text-xl">🏆</span>
                          </div>
                          <div>
                            <p className="font-extrabold text-brand-900">100% Satisfaction</p>
                            <p className="text-xs text-surface-500 font-medium tracking-wide uppercase">Licensed & Insured</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex text-accent-500 text-lg mb-1">
                            ★★★★★
                          </div>
                          <p className="text-[10px] text-surface-500 font-bold uppercase tracking-wider">5-Star Rated</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Trust Grid */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-white rounded-xl p-5 text-center border border-surface-200 shadow-sm hover:shadow-md transition">
                    <div className="text-3xl mb-3 text-emerald-500">🛡️</div>
                    <p className="font-bold text-brand-900 text-sm">Licensed</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center border border-surface-200 shadow-sm hover:shadow-md transition">
                    <div className="text-3xl mb-3 text-blue-500">📄</div>
                    <p className="font-bold text-brand-900 text-sm">Insured</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center border border-surface-200 shadow-sm hover:shadow-md transition">
                    <div className="text-3xl mb-3 text-accent-500">⚡</div>
                    <p className="font-bold text-brand-900 text-sm">Fast Response</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 text-center border border-surface-200 shadow-sm hover:shadow-md transition">
                    <div className="text-3xl mb-3 text-purple-500">💲</div>
                    <p className="font-bold text-brand-900 text-sm">Fair Pricing</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column: Text Content */}
            <div className="lg:col-span-7">
              <span className="inline-block bg-accent-500/10 text-brand-600 font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                Who We Are
              </span>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-900 mb-8 leading-tight">
                Your Nationwide Pest Control Professionals
              </h2>
              
              <div className="prose prose-lg max-w-none text-surface-600 prose-headings:text-brand-900 prose-headings:font-bold prose-a:text-accent-600 mb-10">
                <p className="text-xl leading-relaxed mb-6 font-medium text-surface-700">
                  With a network of highly trained and certified exterminators across the country, Village Plumbers provides top-tier residential and commercial pest management solutions. 
                </p>
                <p className="mb-6 leading-relaxed">
                  We understand the unique challenges that different climates and regions present. Whether you are dealing with aggressive termite colonies in the South, seasonal rodent migrations in the North, or year-round ant invasions, our specialized teams have the local expertise and advanced treatments needed to eradicate the problem at its source.
                </p>
                
                <h3 className="text-2xl mt-8 mb-4">Our Core Capabilities</h3>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-accent-500 mr-3 mt-1">✔</span>
                    <span><strong>24/7 Emergency Services:</strong> Rapid response for severe infestations and hazardous pests like wasps or hornets.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-500 mr-3 mt-1">✔</span>
                    <span><strong>Eco-Friendly Options:</strong> Safe, sustainable treatments that protect your family and pets while eliminating pests.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-500 mr-3 mt-1">✔</span>
                    <span><strong>Comprehensive Inspections:</strong> Detailed property evaluations to identify entry points, nesting sites, and structural vulnerabilities.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-500 mr-3 mt-1">✔</span>
                    <span><strong>Preventative Maintenance:</strong> Ongoing protection plans designed to keep your property pest-free year-round.</span>
                  </li>
                </ul>

                <p className="leading-relaxed">
                  Every service call includes a thorough inspection and a customized treatment plan. We don't just spray and leave; we partner with you to implement long-term exclusion strategies. Our licensed professionals ensure all work is fully documented and complies with local and state regulations.
                </p>
              </div>
              
              {/* Contact CTA Card */}
              <div className="bg-brand-900 rounded-2xl p-8 md:p-10 text-white mt-12 relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }}></div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                  <div>
                    <h3 className="text-2xl text-white font-bold mb-3 flex items-center">
                      <span className="text-accent-500 mr-3 text-3xl">💬</span>
                      Ready to Get Started?
                    </h3>
                    <p className="text-surface-300 text-lg">
                      Contact us today for a free estimate on your pest control needs.
                    </p>
                  </div>
                  <div className="flex shrink-0">
                    <a href="tel:614-926-0787" 
                       className="inline-flex items-center bg-accent-500 text-brand-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-accent-600 transition shadow-lg w-full md:w-auto justify-center">
                      <span className="mr-3 text-xl">📞</span>
                      614-926-0787
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
