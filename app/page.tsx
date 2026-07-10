import Link from 'next/link';
import Image from 'next/image';
import database from '../data/usa_database.json';
import servicesData from '../data/services.json';

export default function Home() {
  return (
    <div className="bg-white">
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-surface-900 overflow-hidden">
        {/* Background Image with Premium Overlay */}
        <div className="absolute inset-0 z-0 animate-pulse-glow">
               <Image 
                 src="/images/media__1783510889927.jpg" 
                 alt="Pest Control Hero" 
                 fill
                 className="object-cover opacity-50 mix-blend-overlay transform scale-105"
                 priority
               /> 
               <div className="absolute inset-0 bg-gradient-to-r from-brand-900/95 via-brand-800/80 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 py-20 w-full animate-float" style={{ animationDuration: '8s' }}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left: Content */}
                <div className="lg:col-span-7">
                    <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-brand-50 px-5 py-2 rounded-full text-sm font-bold tracking-wider mb-8 shadow-lg">
                      🚨 NATIONWIDE 24/7 EMERGENCY PEST CONTROL
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-6 drop-shadow-lg">
                        Reliable <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-600">Pest Control</span> Services Near You
                    </h1>
                    
                    <p className="text-lg md:text-xl text-green-50 mb-8 max-w-2xl font-light leading-relaxed drop-shadow">
                        batyspestcontrol eliminates termites, rodents, bed bugs, and more. Fast response times, eco-friendly treatments, and 100% guaranteed results nationwide. Call now for expert help!
                    </p>
                    
                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4 mb-10">
                        <a href="tel:614-926-0787" className="group inline-flex items-center gap-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-accent-400 hover:to-accent-500 hover:-translate-y-1 transition-all shadow-[0_0_30px_-5px_rgba(245,158,11,0.5)]">
                            614-926-0787
                        </a>
                        <a href="#services" className="inline-flex items-center bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 hover:-translate-y-1 transition-all backdrop-blur-sm">
                            Book Online
                        </a>
                    </div>
                    
                    {/* Reviews Badge */}
                    <div className="flex items-center space-x-4 bg-white/5 backdrop-blur-xl rounded-2xl p-4 max-w-sm border border-white/10 shadow-xl">
                        <div className="flex -space-x-3">
                            {[1,2,3,4].map(i => (
                              <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-900 bg-gray-300 overflow-hidden shadow-md relative">
                                <Image src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Customer" fill sizes="40px" className="object-cover" />
                              </div>
                            ))}
                        </div>
                        <div>
                            <div className="flex text-accent-400 mb-1 text-sm drop-shadow">
                                ★★★★★
                            </div>
                            <p className="text-white text-xs font-medium opacity-90">
                                Rated 4.9/5 by 10,000+ customers
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Right: Lead Capture Form (Glassmorphism) */}
                <div className="lg:col-span-5">
                    <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/20 relative animate-float" style={{ animationDelay: '1s' }}>
                        <div className="absolute -top-5 -right-5 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-bold py-2 px-6 rounded-full shadow-[0_10px_20px_rgba(245,158,11,0.3)] transform rotate-3 text-sm">
                          Free Estimate
                        </div>
                        <h2 className="text-3xl font-extrabold text-white mb-2 drop-shadow">
                            Get Your Free Quote
                        </h2>
                        <p className="text-brand-50 mb-6 text-sm font-light opacity-90">
                            Fill out the form and a local expert will contact you within 5 minutes.
                        </p>
                        
                        <form className="space-y-4">
                            <div>
                                <input type="text" placeholder="Your Full Name *" required className="w-full px-5 py-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white/30 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/50 focus:outline-none transition-all text-surface-900 placeholder-surface-800/50" />
                            </div>
                            <div>
                                <input type="tel" placeholder="Phone Number *" required className="w-full px-5 py-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white/30 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/50 focus:outline-none transition-all text-surface-900 placeholder-surface-800/50" />
                            </div>
                            <div>
                                <input type="text" placeholder="Zip Code *" required className="w-full px-5 py-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white/30 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/50 focus:outline-none transition-all text-surface-900 placeholder-surface-800/50" />
                            </div>
                            <div>
                                <select className="w-full px-5 py-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white/30 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/50 focus:outline-none transition-all text-surface-900">
                                    <option>What type of pest?</option>
                                    <option>Termites</option>
                                    <option>Rodents / Mice</option>
                                    <option>Bed Bugs</option>
                                    <option>Ants / Roaches</option>
                                    <option>Other Pest Issue</option>
                                </select>
                            </div>
                            <div className="pt-4">
                                <button type="button" className="w-full bg-brand-600 hover:bg-brand-500 text-white py-4 rounded-xl font-bold text-xl transition-all shadow-[0_10px_20px_rgba(5,150,105,0.3)] hover:-translate-y-1 flex justify-center items-center gap-2">
                                    Get Free Quote <span>➔</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 2. About Us Section */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Square Box */}
            <div className="lg:col-span-4">
               <div className="bg-brand-900 text-white rounded-3xl aspect-square flex flex-col items-center justify-center p-8 shadow-2xl bg-[url('https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-brand-900/80 group-hover:bg-brand-900/70 transition-colors duration-500"></div>
                  <h2 className="text-4xl font-bold relative z-10 text-center text-white drop-shadow-md">About Us</h2>
               </div>
            </div>
            {/* Right: Content */}
            <div className="lg:col-span-8 lg:pl-8">
               <h3 className="text-accent-500 font-bold tracking-wider uppercase text-sm mb-2 flex items-center gap-2">
                 <span className="w-8 h-1 bg-accent-500 rounded-full"></span> Since 2010
               </h3>
               <h2 className="text-4xl lg:text-5xl font-extrabold text-surface-900 mb-6 leading-tight">Your Trusted Local Exterminators Nationwide</h2>
               <p className="text-surface-800/80 mb-6 leading-relaxed text-lg font-light">
                 For over a decade, batyspestcontrol has been the premier choice for residential and commercial pest control. We understand that dealing with pests is stressful, which is why our certified technicians are trained to handle any infestation quickly, safely, and discreetly.
               </p>
               <p className="text-surface-800/80 mb-8 leading-relaxed font-light">
                 We use environmentally responsible products that are tough on pests but safe for your family and pets. When you choose us, you are choosing peace of mind.
               </p>
               <Link href="/about" className="inline-block bg-brand-900 text-white font-bold px-8 py-4 rounded-xl hover:bg-brand-800 transition-all shadow-[0_10px_20px_rgba(4,47,46,0.2)] hover:-translate-y-1">
                 Read More
               </Link>
            </div>
        </div>
      </section>

      {/* 3. Comprehensive Services */}
      <section className="py-24 px-4 bg-surface-50 border-y border-gray-100" id="services">
        <div className="max-w-7xl mx-auto">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* Service Card 1 (Text top) */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-brand-900/5 flex flex-col hover:-translate-y-2 transition-all duration-300 group border border-gray-100">
                 <div className="h-64 w-full bg-gradient-to-br from-brand-800 to-brand-900 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <h2 className="text-5xl font-extrabold text-white tracking-wide drop-shadow-md z-10">Service</h2>
                 </div>
                 <div className="p-10 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <h3 className="text-2xl font-bold text-surface-900">Emergency Pest Control</h3>
                        <span className="text-accent-500 font-bold text-2xl leading-none group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                      <p className="text-surface-800/70 mb-6 leading-relaxed font-light">
                        Emergency Pest Control: Don't Let Pests Ruin Your Home. Imagine coming home after a long day in...
                      </p>
                    </div>
                 </div>
              </div>

              {/* Service Card 2 (Image top) */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-brand-900/5 flex flex-col hover:-translate-y-2 transition-all duration-300 group border border-gray-100">
                 <div className="h-64 w-full relative overflow-hidden">
                    <Image src="/images/media__1783510930934.jpg" alt="Residential Pest Control" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                 </div>
                 <div className="p-10 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <h3 className="text-2xl font-bold text-surface-900">Residential Pest Control</h3>
                        <span className="text-accent-500 font-bold text-2xl leading-none group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                      <p className="text-surface-800/70 mb-6 leading-relaxed font-light">
                        Living in the area means dealing with occasional seasonal pests that can wreak havoc on your home...
                      </p>
                    </div>
                 </div>
              </div>

              {/* Service Card 3 (Image top) */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-brand-900/5 flex flex-col hover:-translate-y-2 transition-all duration-300 group border border-gray-100">
                 <div className="h-64 w-full relative overflow-hidden">
                    <Image src="/images/media__1783510931195.jpg" alt="Commercial Pest Control" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                 </div>
                 <div className="p-10 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <h3 className="text-2xl font-bold text-surface-900">Commercial Pest Control</h3>
                        <span className="text-accent-500 font-bold text-2xl leading-none group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                      <p className="text-surface-800/70 mb-6 leading-relaxed font-light">
                        Dealing with pests in your business? Imagine this: It's a busy morning at your commercial property...
                      </p>
                    </div>
                 </div>
              </div>
           </div>
           
           {/* More Services Accordion */}
           <div className="max-w-4xl mx-auto">
             <details className="bg-white rounded-3xl shadow-xl shadow-brand-900/5 overflow-hidden group border border-gray-100">
               <summary className="p-8 font-extrabold text-2xl text-surface-900 cursor-pointer flex justify-between items-center bg-white border-b border-gray-50 list-none [&::-webkit-details-marker]:hidden hover:bg-surface-50 transition-colors">
                 View All Other Services
                 <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-700 flex items-center justify-center group-open:bg-accent-50 group-open:text-accent-600 transition-colors">
                   <svg className="w-6 h-6 transform transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                 </div>
               </summary>
               <div className="bg-white max-h-[600px] overflow-y-auto divide-y divide-gray-50 p-2">
                  {servicesData.map((service: any, i: number) => (
                    <Link href={`/${service.slug}`} key={i} className="flex items-center justify-between p-6 hover:bg-surface-50 transition-colors rounded-xl mx-2 my-1 cursor-pointer group/item block">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-100 to-brand-50 text-brand-700 font-extrabold flex items-center justify-center text-xl shrink-0 shadow-sm border border-brand-100 group-hover/item:scale-110 transition-transform">
                          {service.name.split(' ').slice(0,2).map((w: string) => w[0]).join('')}
                        </div>
                        <div>
                          <h4 className="text-surface-900 font-bold text-lg mb-1 group-hover/item:text-brand-700 transition-colors">{service.name}</h4>
                          <p className="text-surface-800/60 text-sm truncate max-w-md font-light">{service.description.slice(0, 80)}...</p>
                        </div>
                      </div>
                      <div className="text-gray-300 group-hover/item:text-accent-500 transition-colors group-hover/item:translate-x-1 transform">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </div>
                    </Link>
                  ))}
               </div>
             </details>
           </div>
        </div>
      </section>

      {/* 4. Why Choose Us (3 Columns) */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface-50 p-10 rounded-3xl border border-gray-100 hover:border-brand-500/30 hover:shadow-2xl hover:shadow-brand-900/5 transition-all duration-300 group">
               <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-md mb-8 text-3xl text-accent-500 group-hover:scale-110 transition-transform rotate-3 group-hover:-rotate-3">⏰</div>
               <h3 className="text-2xl font-bold text-surface-900 mb-4 group-hover:text-brand-800 transition-colors">24/7 Availability</h3>
               <p className="text-surface-800/70 leading-relaxed font-light">Pests don't sleep, and neither do we. Our team is available around the clock for emergency exterminations.</p>
            </div>
            <div className="bg-surface-50 p-10 rounded-3xl border border-gray-100 hover:border-brand-500/30 hover:shadow-2xl hover:shadow-brand-900/5 transition-all duration-300 group">
               <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-md mb-8 text-3xl text-accent-500 group-hover:scale-110 transition-transform -rotate-3 group-hover:rotate-3">🛡️</div>
               <h3 className="text-2xl font-bold text-surface-900 mb-4 group-hover:text-brand-800 transition-colors">Guaranteed Results</h3>
               <p className="text-surface-800/70 leading-relaxed font-light">We stand by our work. If the pests come back between treatments, we will re-treat at no extra cost.</p>
            </div>
            <div className="bg-surface-50 p-10 rounded-3xl border border-gray-100 hover:border-brand-500/30 hover:shadow-2xl hover:shadow-brand-900/5 transition-all duration-300 group">
               <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-md mb-8 text-3xl text-accent-500 group-hover:scale-110 transition-transform rotate-3 group-hover:-rotate-3">👨‍🔬</div>
               <h3 className="text-2xl font-bold text-surface-900 mb-4 group-hover:text-brand-800 transition-colors">Certified Experts</h3>
               <p className="text-surface-800/70 leading-relaxed font-light">Our technicians undergo rigorous training and use the latest eco-friendly technologies.</p>
            </div>
         </div>
      </section>

      {/* 5. Service Areas (States) */}
      <section id="areas" className="py-24 px-4 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h4 className="text-[#0f4a3c] font-bold uppercase tracking-wider mb-2 text-sm">Service Areas</h4>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Serving Most Major Metropolitan Areas</h2>
            <p className="text-gray-600">Find top-rated pest control professionals in your immediate area.</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 text-center">
            {database.states.map(state => {
              const domain = 'batyspestcontrol.com';
              const protocol = domain.includes('localhost') ? 'http' : 'https';
              const href = `${protocol}://${state.code}.${domain}`;
              
              return (
                <Link 
                  key={state.code}
                  href={href}
                  className="bg-gray-50 border border-gray-200 hover:border-[#ff7340] hover:shadow-md text-gray-800 font-semibold px-2 py-3 rounded-lg transition-all hover:bg-white text-sm flex flex-col items-center justify-center"
                >
                  <span className="text-[#ff7340] mb-1 text-lg">📍</span>
                  {state.name}
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-12">
             <Link href="/#areas" className="inline-block bg-[#0f4a3c] text-white font-bold px-8 py-3 rounded-full hover:bg-[#0a3128] transition-colors text-sm shadow-md">
                View All Service Areas
             </Link>
          </div>
        </div>
      </section>

      {/* 5. FAQ Section */}
      <section className="py-24 px-4 bg-surface-900 border-y border-surface-800 text-white relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-900/40 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-900/20 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
           <div>
              <h4 className="text-accent-500 font-bold uppercase tracking-wider mb-3 text-sm flex items-center gap-2">
                 <span className="w-8 h-1 bg-accent-500 rounded-full"></span> FAQ
              </h4>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-10 leading-tight">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                 {[
                   { q: 'What types of pests do you treat?', a: 'We treat termites, ants, cockroaches, bed bugs, rodents, mosquitoes, spiders, fleas, ticks, wasps, and many other common household and commercial pests.' },
                   { q: 'How often should I schedule pest control services?', a: 'Most homes benefit from quarterly pest control. Properties with recurring infestations or high pest activity may require monthly treatments.' },
                   { q: 'Are your treatments safe for children and pets?', a: 'Yes. We use products that are applied according to manufacturer guidelines. We also provide instructions about when it is safe to re-enter treated areas.' },
                   { q: 'How long does a pest control treatment take?', a: 'Most residential pest control visits take between 30 minutes and 2 hours, depending on the size of the property and the type of infestation.' },
                 ].map((faq, i) => (
                    <div key={i} className="bg-surface-800/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg hover:border-accent-500/50 transition-colors group">
                       <h4 className="font-bold text-white mb-2 flex justify-between items-center text-lg">
                          {faq.q} 
                          <span className="text-accent-500 w-8 h-8 rounded-full bg-accent-500/10 flex items-center justify-center group-hover:bg-accent-500 group-hover:text-white transition-colors">+</span>
                       </h4>
                       <p className="text-surface-50/70 text-sm font-light leading-relaxed">{faq.a}</p>
                    </div>
                 ))}
              </div>
           </div>
           <div className="rounded-3xl overflow-hidden shadow-2xl shadow-brand-900/20 h-[600px] border border-white/10 relative">
              <Image src="/images/media__1783510930934.jpg" alt="Worker" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
           </div>
        </div>
      </section>

      {/* 6. Bottom Lead Form & Contact Image */}
      <section className="py-24 px-4 max-w-7xl mx-auto" id="contact">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="rounded-3xl overflow-hidden shadow-2xl h-[500px] relative group">
               <Image src="/images/media__1783510931195.jpg" alt="Service Van" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 to-transparent z-10"></div>
               <div className="absolute bottom-10 left-10 text-white z-20">
                  <div className="text-4xl font-extrabold mb-2">Fast Response.</div>
                  <div className="text-xl font-light text-brand-50">Local experts ready to help.</div>
               </div>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
               <h2 className="text-4xl font-extrabold text-surface-900 mb-8 leading-tight">Need Reliable Pest Control? <br/><span className="text-accent-600">Contact Us Today.</span></h2>
               <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                     <input type="text" placeholder="First Name *" className="w-full px-5 py-4 bg-surface-50 border border-gray-200 rounded-xl focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all font-light" />
                     <input type="text" placeholder="Last Name *" className="w-full px-5 py-4 bg-surface-50 border border-gray-200 rounded-xl focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all font-light" />
                  </div>
                  <input type="email" placeholder="Email Address *" className="w-full px-5 py-4 bg-surface-50 border border-gray-200 rounded-xl focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all font-light" />
                  <textarea placeholder="How can we help? *" rows={4} className="w-full px-5 py-4 bg-surface-50 border border-gray-200 rounded-xl focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all font-light resize-none"></textarea>
                  <button type="button" className="bg-brand-900 text-white font-bold px-8 py-5 rounded-xl hover:bg-brand-800 transition-all w-full shadow-[0_10px_20px_rgba(4,47,46,0.2)] hover:-translate-y-1 text-lg">
                     Send Secure Message ➔
                  </button>
               </form>
            </div>
         </div>
      </section>
      
      {/* 7. Areas We Serve Grid */}
      <section className="py-24 bg-surface-50 px-4 border-t border-gray-100" id="areas-we-serve">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-surface-900 mb-6">Top Cities We Serve Nationwide</h2>
            <p className="text-lg text-surface-800/70 font-light leading-relaxed">batyspestcontrol provides guaranteed pest control services across the entire United States. Find your city below.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              { name: "New York", state: "NY", slug: "new-york" },
              { name: "Los Angeles", state: "CA", slug: "los-angeles" },
              { name: "Chicago", state: "IL", slug: "chicago" },
              { name: "Houston", state: "TX", slug: "houston" },
              { name: "Phoenix", state: "AZ", slug: "phoenix" },
              { name: "Philadelphia", state: "PA", slug: "philadelphia" },
              { name: "San Antonio", state: "TX", slug: "san-antonio" },
              { name: "San Diego", state: "CA", slug: "san-diego" },
              { name: "Dallas", state: "TX", slug: "dallas" },
              { name: "San Jose", state: "CA", slug: "san-jose" },
              { name: "Austin", state: "TX", slug: "austin" },
              { name: "Jacksonville", state: "FL", slug: "jacksonville" },
              { name: "Fort Worth", state: "TX", slug: "fort-worth" },
              { name: "Columbus", state: "OH", slug: "columbus" },
              { name: "Indianapolis", state: "IN", slug: "indianapolis" },
              { name: "Charlotte", state: "NC", slug: "charlotte" },
              { name: "San Francisco", state: "CA", slug: "san-francisco" },
              { name: "Seattle", state: "WA", slug: "seattle" },
              { name: "Denver", state: "CO", slug: "denver" },
              { name: "Washington", state: "DC", slug: "washington" },
              { name: "Nashville", state: "TN", slug: "nashville" },
              { name: "Oklahoma City", state: "OK", slug: "oklahoma-city" },
              { name: "El Paso", state: "TX", slug: "el-paso" },
              { name: "Boston", state: "MA", slug: "boston" },
              { name: "Portland", state: "OR", slug: "portland" },
              { name: "Las Vegas", state: "NV", slug: "las-vegas" },
              { name: "Detroit", state: "MI", slug: "detroit" },
              { name: "Memphis", state: "TN", slug: "memphis" },
              { name: "Louisville", state: "KY", slug: "louisville" },
              { name: "Baltimore", state: "MD", slug: "baltimore" },
              { name: "Milwaukee", state: "WI", slug: "milwaukee" },
              { name: "Albuquerque", state: "NM", slug: "albuquerque" },
              { name: "Tucson", state: "AZ", slug: "tucson" },
              { name: "Fresno", state: "CA", slug: "fresno" },
              { name: "Sacramento", state: "CA", slug: "sacramento" },
              { name: "Kansas City", state: "MO", slug: "kansas-city" },
              { name: "Mesa", state: "AZ", slug: "mesa" },
              { name: "Atlanta", state: "GA", slug: "atlanta" },
              { name: "Omaha", state: "NE", slug: "omaha" },
              { name: "Colorado Springs", state: "CO", slug: "colorado-springs" }
            ].map((loc, idx) => (
              <a 
                key={idx} 
                href={`https://${loc.slug}-${loc.state.toLowerCase()}.batyspestcontrol.com`}
                className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-accent-500 hover:shadow-lg hover:shadow-accent-500/10 transition-all group bg-white hover:-translate-y-1"
              >
                <div className="w-8 h-8 rounded-full bg-brand-50 text-brand-700 flex items-center justify-center shrink-0 group-hover:bg-accent-50 group-hover:text-accent-600 transition-colors">
                  <span className="text-sm">📍</span>
                </div>
                <span className="text-sm font-bold text-surface-800 group-hover:text-surface-900 truncate">
                  {loc.name}, {loc.state}
                </span>
              </a>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link href="/#areas" className="inline-block bg-surface-900 text-white px-10 py-4 rounded-full font-bold hover:bg-surface-800 transition-all shadow-xl hover:-translate-y-1">
               View All 15,000+ Areas ➔
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Map and Contact Info */}
      <section className="py-24 bg-white px-4">
         <div className="max-w-7xl mx-auto border-t border-gray-100 pt-20">
            <h4 className="text-gray-400 font-bold tracking-widest text-xs mb-4 uppercase">- FIND US</h4>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
               <div className="lg:col-span-4 space-y-10">
                  <h2 className="text-4xl lg:text-5xl font-extrabold text-surface-900 mb-8 leading-tight">Our Headquarters</h2>
                  
                  <div className="flex items-start gap-5 group">
                     <div className="w-14 h-14 rounded-2xl bg-surface-50 text-brand-700 flex items-center justify-center shrink-0 border border-gray-100 group-hover:border-brand-500 group-hover:bg-brand-50 transition-colors text-xl">📍</div>
                     <div>
                        <strong className="block text-surface-900 font-bold mb-1 text-lg">Address</strong>
                        <span className="text-surface-800/70 block leading-relaxed font-light">Nationwide Service<br/>USA</span>
                     </div>
                  </div>
                  
                  <div className="flex items-start gap-5 group">
                     <div className="w-14 h-14 rounded-2xl bg-surface-50 text-brand-700 flex items-center justify-center shrink-0 border border-gray-100 group-hover:border-brand-500 group-hover:bg-brand-50 transition-colors text-xl">📞</div>
                     <div>
                        <strong className="block text-surface-900 font-bold mb-1 text-lg">Phone</strong>
                        <a href="tel:614-926-0787" className="text-surface-800/70 block leading-relaxed font-light hover:text-accent-600 transition-colors">614-926-0787</a>
                     </div>
                  </div>
                  
                  <div className="flex items-start gap-5 group">
                     <div className="w-14 h-14 rounded-2xl bg-surface-50 text-brand-700 flex items-center justify-center shrink-0 border border-gray-100 group-hover:border-brand-500 group-hover:bg-brand-50 transition-colors text-xl">✉️</div>
                     <div>
                        <strong className="block text-surface-900 font-bold mb-1 text-lg">Email</strong>
                        <a href="mailto:info@batyspestcontrol.com" className="text-surface-800/70 block leading-relaxed font-light hover:text-accent-600 transition-colors">info@batyspestcontrol.com</a>
                     </div>
                  </div>
                  
                  <div className="flex items-start gap-5 group">
                     <div className="w-14 h-14 rounded-2xl bg-surface-50 text-brand-700 flex items-center justify-center shrink-0 border border-gray-100 group-hover:border-brand-500 group-hover:bg-brand-50 transition-colors text-xl">🕒</div>
                     <div>
                        <strong className="block text-surface-900 font-bold mb-1 text-lg">Business Hours</strong>
                        <span className="text-surface-800/70 block leading-relaxed font-light">Mon - Sat: 07:00 am – 07:00 pm<br/>Sun: Closed</span>
                     </div>
                  </div>
               </div>
               
               <div className="lg:col-span-8">
                  <div className="w-full h-full min-h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-brand-900/10 border border-gray-200">
                     <iframe 
                       src="https://maps.google.com/maps?q=Texas&t=&z=6&ie=UTF8&iwloc=&output=embed" 
                       width="100%" 
                       height="100%" 
                       style={{ border: 0 }} 
                       allowFullScreen={false} 
                       loading="lazy"
                     ></iframe>
                  </div>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
}
