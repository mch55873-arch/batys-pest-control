import Link from 'next/link';
import type { Metadata } from 'next';
import servicesData from '../../data/services.json';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const serviceData = servicesData.find(s => s.slug === resolvedParams.service);
  const serviceName = serviceData ? serviceData.name : resolvedParams.service
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${serviceName} | batyspestcontrol`,
    description: `Professional ${serviceName} across the USA. Fast, reliable, and guaranteed results.`,
    alternates: {
      canonical: `https://www.batyspestcontrol.com/${resolvedParams.service}`,
    },
    openGraph: {
      title: `${serviceName} | batyspestcontrol`,
      description: `Professional ${serviceName} across the USA. Fast, reliable, and guaranteed results.`,
      url: `https://www.batyspestcontrol.com/${resolvedParams.service}`,
    }
  };
}

export default async function GenericServicePage({ params }: { params: Promise<{ service: string }> }) {
  const resolvedParams = await params;
  const service = servicesData.find((s) => s.slug === resolvedParams.service);

  if (!service) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-[#F9F7F4]">
      {/* Service Hero with Form */}
      <section className="relative bg-[#1B2F4D] text-white min-h-[600px] flex items-center">
          <div className="absolute inset-0">
              <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=2000&q=80" 
                   alt={service.name} 
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
                              Nationwide Coverage
                          </span>
                      </h1>
                      
                      <p className="text-xl text-gray-300 mb-8 max-w-xl leading-relaxed">
                          {service.description} Fast response, certified professionals, and guaranteed results for your home or business.
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
                          <span className="flex items-center"><span className="text-yellow-400 mr-2">★</span>5-Star Rated</span>
                      </div>
                  </div>
                  
                  {/* Right: Quote Form */}
                  <div id="quote-form" className="bg-white rounded-2xl p-8 shadow-2xl text-gray-900 border-t-4 border-accent-500 relative">
                      <div className="text-center mb-6">
                          <h2 className="text-2xl font-bold text-gray-900">Get Free Quote</h2>
                          <p className="text-gray-600 mt-2">Fill out the form and we'll get back to you within 24 hours.</p>
                      </div>
                      
                      <form action="#" method="post" className="space-y-4">
                          <input type="hidden" name="service" value={service.name} />
                          
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
                              <textarea name="message" rows={3} placeholder="Tell us about your pest issue..."
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
                Professional {service.name} Services
              </h2>
              <div className="prose prose-lg text-gray-600 max-w-none">
                <p className="mb-4">
                  When you are dealing with pest issues, time is of the essence. Our licensed and insured exterminators provide top-tier {service.name.toLowerCase()} solutions that protect your property and family.
                </p>
                <p className="mb-6">
                  We utilize advanced treatments and eco-friendly products to ensure that pests are eliminated at the source. Whether it's a residential home or a large commercial facility, our team arrives fully equipped to handle your needs efficiently and safely.
                </p>

                {/* What's Included */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8 mt-8 border border-gray-100">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">What's Included in our {service.name}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 text-accent-600 flex items-center justify-center text-sm font-bold">✓</span>
                      <span className="text-gray-700 font-medium">Comprehensive Inspection</span>
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
                    <p className="text-gray-600 text-sm">Reach out to our team immediately to discuss your pest problem and schedule a visit.</p>
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
                <h2 className="text-3xl font-bold mt-2">Why Choose Us for {service.name}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center mb-4">⚡</div>
                  <h3 className="font-bold text-lg mb-2">24/7 Availability</h3>
                  <p className="text-gray-400 text-sm">Pests don't wait for business hours. We are ready to help day or night.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center mb-4">🛡️</div>
                  <h3 className="font-bold text-lg mb-2">Licensed Experts</h3>
                  <p className="text-gray-400 text-sm">Our technicians are fully certified and undergo rigorous ongoing training.</p>
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
                {/* FAQ 1 */}
                <div className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow bg-gray-50/50">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-start gap-3">
                    <span className="text-accent-500 mt-0.5">Q.</span>
                    How quickly can you respond?
                  </h3>
                  <p className="text-gray-600 pl-8 text-sm leading-relaxed">
                    We pride ourselves on an emergency response time of under 60 minutes for most locations. Our local teams are always ready with fully stocked trucks.
                  </p>
                </div>
                {/* FAQ 2 */}
                <div className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow bg-gray-50/50">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-start gap-3">
                    <span className="text-accent-500 mt-0.5">Q.</span>
                    Are your treatments safe for pets?
                  </h3>
                  <p className="text-gray-600 pl-8 text-sm leading-relaxed">
                    Absolutely. We use EPA-approved products and follow strict application protocols to ensure the safety of your family and pets.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-8">
              
              {/* Need Help CTA */}
              <div className="bg-[#1e293b] rounded-2xl p-8 shadow-xl text-center text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/20 rounded-full blur-3xl"></div>
                <h3 className="text-2xl font-bold mb-4 relative z-10">Need Immediate Help?</h3>
                <p className="text-gray-400 mb-6 text-sm relative z-10">Our pest control experts are standing by 24/7 to solve your problem.</p>
                <a href="tel:614-926-0787" className="block w-full bg-accent-500 hover:bg-accent-600 text-white py-4 rounded-xl font-bold text-lg transition-colors relative z-10 shadow-lg shadow-accent-500/30">
                  (614) 926-0787
                </a>
              </div>

              {/* Service Areas Link */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                 <h3 className="font-bold text-gray-900 mb-4">Find Local Service</h3>
                 <p className="text-sm text-gray-600 mb-4">We provide {service.name.toLowerCase()} nationwide. Find an expert near you.</p>
                 <Link href="/#areas-we-serve" className="text-accent-600 font-bold hover:text-accent-700 flex items-center text-sm">
                   View Service Areas <span className="ml-1">→</span>
                 </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom CTA Banner */}
      <section className="bg-gradient-to-r from-[#1B2F4D] to-[#2a456e] py-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Book {service.name} Today!</h2>
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
