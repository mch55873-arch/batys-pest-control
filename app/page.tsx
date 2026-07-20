import Link from 'next/link';
import Image from 'next/image';
import database from '../data/nz_database.json';
import servicesData from '../data/services.json';
import blogData from '../data/blog.json';

export default function Home() {
  return (
    <div className="bg-white font-sans text-gray-800">
      
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-surface-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/media__1783510889927.jpg" 
            alt="Pest Control Professionals" 
            className="w-full h-full object-cover opacity-50 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-900/90 via-surface-900/70 to-surface-900/40"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left: Content */}
                <div className="lg:col-span-7">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight">
                        Emergency Pest Control Services Nationwide
                    </h1>
                    
                    <p className="text-lg text-gray-300 mb-8 max-w-xl leading-relaxed">
                        Fast, reliable, and professional pest control. Our certified team provides 24/7 emergency extermination for termites, rodents, bed bugs, and more. Protect your home and business today.
                    </p>
                    
                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4 mb-6">
                        <a href="tel:614-926-0787" className="inline-flex items-center bg-accent-500 text-white px-8 py-4 rounded font-bold text-lg hover:bg-accent-600 transition shadow-lg shadow-accent-500/20">
                            <span className="mr-2">📞</span>
                            (614) 926-0787
                        </a>
                        <a href="#contact" className="inline-flex items-center bg-transparent border-2 border-white text-white px-8 py-4 rounded font-bold text-lg hover:bg-white hover:text-surface-900 transition">
                            Get Free Quote
                        </a>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="flex text-yellow-400">★★★★★</span>
                      <span>Rated 5 stars by our customers</span>
                    </div>
                </div>
                
                {/* Right: Lead Capture Form */}
                <div className="lg:col-span-5">
                    <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8">
                        <h2 className="text-2xl font-extrabold text-surface-900 mb-2">
                            Get Free Quote
                        </h2>
                        <p className="text-gray-500 mb-6 text-sm">
                            Fill out the form and we'll get back to you within 24 hours.
                        </p>
                        
                        <form className="space-y-4">
                            <div>
                                <input type="text" placeholder="Your Name *" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:border-accent-500 focus:bg-white focus:outline-none transition-colors text-gray-800" />
                            </div>
                            <div>
                                <input type="email" placeholder="Email Address *" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:border-accent-500 focus:bg-white focus:outline-none transition-colors text-gray-800" />
                            </div>
                            <div>
                                <input type="tel" placeholder="Phone Number *" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:border-accent-500 focus:bg-white focus:outline-none transition-colors text-gray-800" />
                            </div>
                            <div>
                                <select required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:border-accent-500 focus:bg-white focus:outline-none transition-colors text-gray-800">
                                    <option value="">What type of pest?</option>
                                    <option value="termites">Termites</option>
                                    <option value="rodents">Rodents / Mice</option>
                                    <option value="bedbugs">Bed Bugs</option>
                                    <option value="roaches">Ants / Roaches</option>
                                    <option value="other">Other Pest Issue</option>
                                </select>
                            </div>
                            
                            <div className="flex items-start gap-3 mt-4">
                                <input type="checkbox" id="terms" required className="mt-1.5 w-4 h-4 rounded border-gray-300 text-accent-500 focus:ring-accent-500" />
                                <label htmlFor="terms" className="text-xs text-gray-500 leading-tight">
                                    I acknowledge and agree to the Terms & Conditions and to be contacted regarding my inquiry.
                                </label>
                            </div>

                            <div className="pt-2">
                                <button type="button" className="w-full bg-accent-500 hover:bg-accent-600 text-white py-4 rounded font-bold text-lg transition-colors shadow-lg shadow-accent-500/20">
                                    Get Free Quote →
                                </button>
                            </div>
                        </form>
                        
                        <div className="mt-6 flex items-center justify-center gap-4 text-xs font-semibold text-gray-400">
                            <span className="flex items-center gap-1"><span className="text-green-500">✓</span> Licensed</span>
                            <span className="flex items-center gap-1"><span className="text-green-500">✓</span> Insured</span>
                            <span className="flex items-center gap-1"><span className="text-green-500">✓</span> Certified</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 2. Stats Bar */}
      <section className="bg-white border-b border-gray-100 relative z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100 text-center">
              <div>
                <div className="text-3xl font-black text-accent-500 mb-1">20+</div>
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Years Exp</div>
              </div>
              <div>
                <div className="text-3xl font-black text-accent-500 mb-1">5,000+</div>
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Customers</div>
              </div>
              <div>
                <div className="text-3xl font-black text-accent-500 mb-1">5.0★</div>
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Rating</div>
              </div>
              <div>
                <div className="text-3xl font-black text-accent-500 mb-1">30min</div>
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Arrival</div>
              </div>
           </div>
        </div>
      </section>

      {/* 3. About Us Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left: Images */}
            <div className="lg:col-span-5 relative">
               <div className="rounded overflow-hidden shadow-2xl relative z-10">
                  <img src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80" alt="Pest Control Experts" className="w-full h-auto object-cover" />
               </div>
            </div>

            {/* Right: Content */}
            <div className="lg:col-span-7">
               <h4 className="text-gray-400 font-bold uppercase tracking-widest mb-3 text-xs">ABOUT US</h4>
               <h2 className="text-3xl lg:text-4xl font-extrabold text-surface-900 mb-6 leading-tight">Your Trusted Pest Control Experts Nationwide</h2>
               <p className="text-gray-600 mb-6 leading-relaxed">
                 For over a decade, Village Plumbers has been the premier choice for residential and commercial pest control. We understand that dealing with pests is stressful, which is why our certified technicians are trained to handle any infestation quickly, safely, and discreetly.
               </p>
               
               <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                 <li className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-accent-500/20 text-accent-500 flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                    <span className="text-surface-900 font-semibold text-sm">Licensed & Insured Team</span>
                 </li>
                 <li className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-accent-500/20 text-accent-500 flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                    <span className="text-surface-900 font-semibold text-sm">100% Satisfaction Guarantee</span>
                 </li>
                 <li className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-accent-500/20 text-accent-500 flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                    <span className="text-surface-900 font-semibold text-sm">24/7 Emergency Dispatch</span>
                 </li>
                 <li className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-accent-500/20 text-accent-500 flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                    <span className="text-surface-900 font-semibold text-sm">Eco-Friendly Treatments</span>
                 </li>
               </ul>

               <Link href="/about" className="inline-block bg-accent-500 text-white font-bold px-8 py-3 rounded hover:bg-accent-600 transition-colors shadow-lg shadow-accent-500/20">
                 Learn More
               </Link>
            </div>
        </div>
      </section>

      {/* 4. Services Grid */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h4 className="text-gray-400 font-bold uppercase tracking-widest mb-3 text-xs">OUR SERVICES</h4>
            <h2 className="text-3xl md:text-4xl font-extrabold text-surface-900 mb-6">Our Comprehensive Pest Control Services</h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.slice(0, 6).map((service: any, idx: number) => (
              <div key={idx} className="bg-white rounded border border-gray-100 shadow-sm hover:shadow-xl transition-all p-8 group">
                <div className="w-12 h-12 bg-accent-500/10 rounded flex items-center justify-center mb-6 text-accent-500 group-hover:bg-accent-500 group-hover:text-white transition-colors">
                  <span className="text-xl font-black">{service.name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-bold text-surface-900 mb-3">{service.name}</h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed line-clamp-3">
                  {service.description}
                </p>
                <Link href={`/${service.slug}`} className="text-accent-500 font-bold text-sm inline-flex items-center hover:text-accent-600 transition-colors">
                  Learn More <span className="ml-1 text-lg leading-none">→</span>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="inline-block bg-surface-900 text-white px-8 py-4 rounded font-bold hover:bg-surface-800 transition-colors shadow-lg">
               View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Content */}
            <div>
               <h4 className="text-gray-400 font-bold uppercase tracking-widest mb-3 text-xs">WHY US</h4>
               <h2 className="text-3xl lg:text-4xl font-extrabold text-surface-900 mb-6 leading-tight">Why Choose Village Plumbers?</h2>
               <p className="text-gray-600 mb-8 leading-relaxed">
                 We provide fast, reliable, and guaranteed pest control solutions. Here is why thousands of customers trust us to protect their homes and businesses.
               </p>
               
               <div className="space-y-6">
                 <div className="flex gap-4">
                    <div className="w-12 h-12 bg-accent-500 rounded flex items-center justify-center shrink-0 text-white text-xl font-bold">1</div>
                    <div>
                       <h4 className="text-lg font-bold text-surface-900 mb-1">24/7 Availability</h4>
                       <p className="text-sm text-gray-500">Pests don't sleep, and neither do we. We're available around the clock for emergency exterminations.</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="w-12 h-12 bg-accent-500 rounded flex items-center justify-center shrink-0 text-white text-xl font-bold">2</div>
                    <div>
                       <h4 className="text-lg font-bold text-surface-900 mb-1">Eco-Friendly & Safe</h4>
                       <p className="text-sm text-gray-500">Our treatments are tough on pests but completely safe for your family, children, and pets.</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="w-12 h-12 bg-accent-500 rounded flex items-center justify-center shrink-0 text-white text-xl font-bold">3</div>
                    <div>
                       <h4 className="text-lg font-bold text-surface-900 mb-1">Guaranteed Results</h4>
                       <p className="text-sm text-gray-500">If the pests come back between scheduled treatments, we will re-treat your property at no extra cost.</p>
                    </div>
                 </div>
               </div>
            </div>

            {/* Right: Image */}
            <div className="relative h-full min-h-[400px] rounded overflow-hidden shadow-2xl">
               <img src="/images/media__1783510930934.jpg" alt="Pest Control Technician" className="absolute inset-0 w-full h-full object-cover" />
            </div>

        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="py-24 px-4 bg-surface-900 text-white border-y border-surface-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h4 className="text-accent-500 font-bold uppercase tracking-widest mb-3 text-xs">TESTIMONIALS</h4>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">What Our Customers Say About Us</h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {[
               { name: "Sarah M.", review: "They arrived within 45 minutes of my call for a massive ant problem. The technician was polite, explained everything, and the ants were gone by the next day. Highly recommend!" },
               { name: "John D.", review: "We had a severe termite issue that other companies couldn't fix. The team from Village Plumbers did a thorough inspection and treatment. We haven't seen a termite since. True professionals." },
               { name: "Emily R.", review: "I love that they use eco-friendly products. Having a dog and a toddler, safety was my number one concern. The pest control was highly effective and completely safe. 5 stars!" },
             ].map((review, i) => (
                <div key={i} className="bg-surface-800 p-8 rounded border border-surface-700 relative">
                   <div className="text-yellow-400 mb-4 text-sm tracking-widest">★★★★★</div>
                   <p className="text-gray-300 text-sm mb-6 leading-relaxed italic">"{review.review}"</p>
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center text-surface-900 font-bold text-sm">
                         {review.name.charAt(0)}
                      </div>
                      <span className="font-bold text-white text-sm">{review.name}</span>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Accordion */}
            <div>
               <h4 className="text-gray-400 font-bold uppercase tracking-widest mb-3 text-xs">FAQS</h4>
               <h2 className="text-3xl lg:text-4xl font-extrabold text-surface-900 mb-8 leading-tight">Pest Control Services FAQs</h2>
               
               <div className="space-y-4">
                 {[
                   { q: 'How quickly can you arrive?', a: 'We offer 24/7 emergency dispatch. In most areas, we can have a technician at your property within 60-90 minutes of your call.' },
                   { q: 'Are your treatments safe for pets?', a: 'Yes. We prioritize the safety of your family and pets. We use eco-friendly and pet-safe products, applied strictly according to safety guidelines.' },
                   { q: 'Do I need to leave my house during treatment?', a: 'For most routine treatments, you do not need to leave. However, for certain intensive treatments like bed bug extermination or heavy fumigation, we will advise you on the necessary vacancy period.' },
                   { q: 'Is there a guarantee on your work?', a: 'Yes, we provide a 100% satisfaction guarantee. If pests return between your scheduled services, we will re-treat the area at no additional cost.' },
                 ].map((faq, i) => (
                    <details key={i} className="group border border-gray-200 rounded bg-gray-50 open:bg-white transition-colors">
                       <summary className="font-bold text-surface-900 p-5 cursor-pointer list-none flex justify-between items-center text-sm md:text-base">
                          {faq.q}
                          <span className="text-accent-500 font-bold text-xl group-open:rotate-45 transition-transform">+</span>
                       </summary>
                       <div className="px-5 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
                          {faq.a}
                       </div>
                    </details>
                 ))}
               </div>
            </div>

            {/* Right: Image */}
            <div className="relative h-full min-h-[500px] rounded overflow-hidden shadow-xl">
               <img src="/images/media__1783510931195.jpg" alt="Customer Service" className="absolute inset-0 w-full h-full object-cover" />
            </div>

        </div>
      </section>

      {/* 8. Service Areas Grid */}
      <section className="py-24 px-4 bg-surface-900 text-white border-y border-surface-800" id="areas-we-serve">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h4 className="text-accent-500 font-bold uppercase tracking-widest mb-3 text-xs">LOCATIONS</h4>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Pest Control Services in Major Cities & Surrounding Areas</h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {database.states.map(state => {
              const domain = 'villageplumbers.co.nz';
              const protocol = domain.includes('localhost') ? 'http' : 'https';
              const href = `${protocol}://${state.code}.${domain}`;
              
              return (
                <Link 
                  key={state.code}
                  href={href}
                  className="bg-surface-800 border border-surface-700 hover:border-accent-500 text-white font-semibold px-4 py-4 rounded transition-all text-center flex flex-col items-center gap-2 group text-sm"
                >
                  <span className="text-accent-500 text-lg group-hover:scale-110 transition-transform">📍</span>
                  {state.name}
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-12 flex justify-center gap-4">
            <Link href="/#areas-we-serve" className="inline-block bg-accent-500 text-white px-8 py-3 rounded font-bold hover:bg-accent-600 transition-colors">
               View All Areas
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Contact Section Split */}
      <section className="bg-gray-50 border-b border-gray-200" id="contact">
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">
            
            {/* Left: Info */}
            <div className="p-12 md:p-16 flex flex-col justify-center">
               <h2 className="text-3xl font-extrabold text-surface-900 mb-2">Get Immediate Help</h2>
               <p className="text-gray-500 mb-10">Available 24/7 for emergency pest control.</p>
               
               <div className="space-y-8">
                  <div className="flex items-start gap-4 bg-white p-6 rounded shadow-sm border border-gray-100">
                     <div className="w-10 h-10 bg-accent-500/10 text-accent-500 flex items-center justify-center rounded shrink-0">📞</div>
                     <div>
                        <div className="text-sm text-gray-500 font-bold mb-1">Call Us 24/7</div>
                        <a href="tel:614-926-0787" className="text-lg font-extrabold text-surface-900 hover:text-accent-500 transition-colors">614-926-0787</a>
                     </div>
                  </div>
                  
                  <div className="flex items-start gap-4 bg-white p-6 rounded shadow-sm border border-gray-100">
                     <div className="w-10 h-10 bg-accent-500/10 text-accent-500 flex items-center justify-center rounded shrink-0">✉️</div>
                     <div>
                        <div className="text-sm text-gray-500 font-bold mb-1">Email Us</div>
                        <a href="mailto:info@villageplumbers.co.nz" className="text-lg font-extrabold text-surface-900 hover:text-accent-500 transition-colors">info@villageplumbers.co.nz</a>
                     </div>
                  </div>

                  <div className="flex items-start gap-4 bg-white p-6 rounded shadow-sm border border-gray-100">
                     <div className="w-10 h-10 bg-accent-500/10 text-accent-500 flex items-center justify-center rounded shrink-0">📍</div>
                     <div>
                        <div className="text-sm text-gray-500 font-bold mb-1">Service Area</div>
                        <div className="text-lg font-extrabold text-surface-900">Nationwide across USA</div>
                     </div>
                  </div>
               </div>
            </div>
            
            {/* Right: Form */}
            <div className="bg-white p-12 md:p-16 flex flex-col justify-center border-l border-gray-100 shadow-[0_0_40px_rgba(0,0,0,0.03)]">
               <h3 className="text-2xl font-bold text-surface-900 mb-6">A online form</h3>
               <p className="text-gray-500 mb-8 text-sm">Fill out the form and we'll call you right away.</p>
               
               <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <input type="text" placeholder="First Name" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:border-accent-500 focus:bg-white focus:outline-none transition-colors text-gray-800" />
                     <input type="text" placeholder="Last Name" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:border-accent-500 focus:bg-white focus:outline-none transition-colors text-gray-800" />
                  </div>
                  <input type="email" placeholder="Email Address" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:border-accent-500 focus:bg-white focus:outline-none transition-colors text-gray-800" />
                  <textarea placeholder="How can we help?" rows={4} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:border-accent-500 focus:bg-white focus:outline-none transition-colors text-gray-800 resize-none"></textarea>
                  
                  <button type="button" className="w-full bg-accent-500 text-white font-bold px-8 py-4 rounded hover:bg-accent-600 transition-colors text-lg shadow-lg shadow-accent-500/20">
                     Submit Request
                  </button>
               </form>
            </div>

         </div>
      </section>

      {/* 10. Blog/Resources */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h4 className="text-gray-400 font-bold uppercase tracking-widest mb-3 text-xs">BLOG</h4>
            <h2 className="text-3xl md:text-4xl font-extrabold text-surface-900 mb-6">Pest Control Tips & Resources</h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogData.length > 0 ? blogData.slice(0, 4).map((post, idx) => (
              <div key={idx} className="bg-white rounded border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-shadow group flex flex-col">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img src={post.image || "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-surface-900 mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="text-accent-500 font-bold text-sm inline-flex items-center hover:text-accent-600 transition-colors mt-auto">
                    Read More <span className="ml-1">→</span>
                  </Link>
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center text-gray-500 py-10">No articles available yet.</div>
            )}
          </div>

          <div className="text-center mt-12">
            <Link href="/blog" className="inline-block bg-surface-900 text-white px-8 py-4 rounded font-bold hover:bg-surface-800 transition-colors">
               View All Articles
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
