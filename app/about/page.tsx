import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: "About Us | batyspestcontrol",
  description: "Learn more about batyspestcontrol, your trusted partner for professional pest control services.",
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: "About Us | batyspestcontrol",
    description: "Learn more about batyspestcontrol, your trusted partner for professional pest control services.",
    url: 'https://www.batyspestcontrol.com/about',
  }
};

export default function AboutPage() {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* 1. Hero Banner */}
      <section className="relative pt-32 pb-24 px-4 bg-[#0d1b2a] overflow-hidden flex flex-col items-center justify-center text-center min-h-[400px]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/media__1783510889927.jpg" 
            alt="Pest Control Hero" 
            fill
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d1b2a]/80 via-[#0d1b2a]/60 to-[#0d1b2a]/90"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-gray-300 font-medium mb-4 flex items-center justify-center gap-2 text-sm uppercase tracking-wider">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <span className="text-[#b18c95]">About Us</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            About batyspestcontrol
          </h1>
          <p className="text-xl text-gray-200 font-light max-w-2xl mx-auto">
            Your trusted partner for professional 24/7 pest control services nationwide.
          </p>
        </div>
      </section>

      {/* 2. Section 1: Image Left, Content Right */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Image with Badge */}
          <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl group">
            <Image 
              src="/images/media__1783510889843.jpg" 
              alt="Our Team" 
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[#0d1b2a]/20 group-hover:bg-transparent transition-colors duration-500"></div>
            
            {/* Overlay Title */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <h2 className="text-6xl font-bold text-white drop-shadow-lg opacity-90">About Us</h2>
            </div>
            
            {/* Experience Badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl flex items-center justify-between border border-white/50">
              <div>
                <span className="block text-3xl font-extrabold text-[#0d1b2a]">10+</span>
                <span className="text-gray-500 font-medium text-sm">Years of Experience</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#b18c95] text-white flex items-center justify-center shadow-inner">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#b18c95]/10 text-[#b18c95] font-bold text-sm tracking-wide mb-6">
              <span className="w-2 h-2 rounded-full bg-[#b18c95]"></span>
              About Our Company
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0d1b2a] mb-6 leading-tight tracking-tight">
              Your Trusted Pest Control Partners Since 2010
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Founded with a commitment to excellence, batyspestcontrol has served local families and businesses for over a decade. Starting as a small family operation, we've grown into the go-to experts for pest control services. Our deep roots in the community mean we understand pest behaviors inside and out. You can rely on our certified team to deliver honest, efficient solutions that stand the test of time, always treating your home like our own. 
              <br /><br />
              <Link href="/author" className="text-[#ff7340] font-bold hover:underline">Meet our expert team of authors and exterminators &rarr;</Link>
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
                <div className="text-3xl font-extrabold text-[#0d1b2a] mb-1">50+</div>
                <div className="text-sm font-medium text-gray-500">Team Members</div>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
                <div className="text-3xl font-extrabold text-[#0d1b2a] mb-1">48+</div>
                <div className="text-sm font-medium text-gray-500">Areas Served</div>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
                <div className="text-3xl font-extrabold text-[#0d1b2a] mb-1">100%</div>
                <div className="text-sm font-medium text-gray-500">Satisfaction</div>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
                <div className="text-3xl font-extrabold text-[#0d1b2a] mb-1">24/7</div>
                <div className="text-sm font-medium text-gray-500">Support</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Section 2: Content Left, Image Right */}
      <section className="py-24 px-4 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#b18c95]/10 text-[#b18c95] font-bold text-sm tracking-wide mb-6">
              <span className="w-2 h-2 rounded-full bg-[#b18c95]"></span>
              Why Choose Us
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0d1b2a] mb-10 leading-tight tracking-tight">
              Why Choose batyspestcontrol?
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-[#b18c95] shrink-0 mt-1">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#0d1b2a] mb-1">Unmatched Reliability</h4>
                  <p className="text-gray-600">We've built a stellar track record by prioritizing punctuality, professionalism, and effective results. We respect your time and property.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-[#b18c95] shrink-0 mt-1">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#0d1b2a] mb-1">Lightning-Fast Response</h4>
                  <p className="text-gray-600">Pest emergencies wait for no one. Our 24/7 availability ensures we're there exactly when you need us, day or night.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-[#b18c95] shrink-0 mt-1">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#0d1b2a] mb-1">Fair, Transparent Pricing</h4>
                  <p className="text-gray-600">No hidden fees, no surprises. We provide upfront quotes and explain all costs clearly before any work begins.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-[#b18c95] shrink-0 mt-1">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#0d1b2a] mb-1">5-Star Experience</h4>
                  <p className="text-gray-600">From the first call to the final inspection, we focus on delivering a premium, stress-free customer experience.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="order-1 lg:order-2 relative h-[500px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl group">
            <Image 
              src="/images/media__1783510889865.jpg" 
              alt="Pest Control Equipment" 
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Small Badge overlay */}
            <div className="absolute bottom-6 left-6 bg-[#b18c95] text-white px-6 py-4 rounded-2xl shadow-lg border border-white/20 flex flex-col items-center justify-center">
              <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="font-extrabold text-xl leading-none">10+</span>
              <span className="text-xs font-medium opacity-90 uppercase tracking-wider mt-1">Years</span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. FAQ Section */}
      <section className="py-24 px-4 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#b18c95]/10 text-[#b18c95] font-bold text-sm tracking-wide mb-6">
              <span className="w-2 h-2 rounded-full bg-[#b18c95]"></span>
              Questions?
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0d1b2a] mb-6 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">More about our pest control services.</p>
          </div>
          
          <div className="space-y-6">
            {[
              { q: 'How soon will I see results after pest control?', a: 'Many pests begin to decline within 24 to 48 hours. Complete elimination can take several days or weeks depending on the pest species and the severity of the infestation.' },
              { q: 'Can pest control prevent future infestations?', a: 'Yes. Regular inspections, preventive treatments, and sealing entry points help reduce the risk of future pest problems.' },
              { q: 'Do you offer residential and commercial pest control?', a: 'Yes. We provide pest control services for homes, apartments, offices, restaurants, retail stores, warehouses, and other commercial properties.' },
              { q: 'What are the signs that I need professional pest control?', a: 'Common signs include droppings, damaged wood, unusual odors, nests, scratching noises, insect sightings, bite marks, and recurring pest activity.' },
              { q: 'Do you provide emergency pest control services?', a: 'Yes. We offer emergency pest control for urgent infestations involving rodents, termites, bed bugs, wasps, and other pests that require immediate attention.' }
            ].map((faq, i) => (
              <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-[#0d1b2a] mb-3">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA Section */}
      <section className="bg-[#b18c95] py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0d1b2a] mb-6 tracking-tight">Ready to Get Started?</h2>
          <p className="text-xl text-[#0d1b2a]/80 mb-10 font-medium">
            Contact batyspestcontrol today for a free consultation and let us help you with your 24/7 pest control needs.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a 
              href="tel:614-926-0787" 
              className="w-full sm:w-auto bg-[#0d1b2a] hover:bg-[#1a2b3c] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-3 hover:-translate-y-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              614-926-0787
            </a>
            <Link 
              href="/#contact" 
              className="w-full sm:w-auto bg-white hover:bg-gray-50 text-[#0d1b2a] px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-3 hover:-translate-y-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Contact Us
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[#0d1b2a] font-bold text-sm tracking-wide">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#0d1b2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              Licensed
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#0d1b2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              Insured
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#0d1b2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
              5-Star Rated
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
