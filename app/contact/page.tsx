import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Village Plumbers',
  description: 'Contact Village Plumbers for pest control services. We offer 24/7 emergency service and free estimates.',
  alternates: {
    canonical: 'https://www.villageplumbers.co.nz/contact',
  }
};

export default function ContactPage() {
  return (
    <main className="bg-surface-50">
      {/* 1. Hero Section */}
      <section className="relative bg-brand-900 text-white py-20 md:py-28">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=2000&q=80" 
            alt="Contact Village Plumbers" 
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
                  <span className="text-accent-500 font-medium">Contact Us</span>
                </li>
              </ol>
            </nav>
            
            <span className="inline-block bg-accent-500 text-brand-900 font-bold text-xs uppercase tracking-widest px-4 py-2 rounded mb-6 shadow-md">
              Get In Touch
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white leading-tight">
              Contact Village Plumbers
            </h1>
            
            <p className="text-xl text-surface-300 mb-8 max-w-2xl leading-relaxed">
              Have questions or need a quote? We're here to help with all your pest control needs across the nation.
            </p>
            
            {/* Quick Contact Buttons */}
            <div className="flex flex-wrap gap-4">
              <a href="tel:614-926-0787" 
                 className="inline-flex items-center bg-accent-500 text-brand-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-accent-600 transition shadow-xl">
                <span className="mr-3 text-xl">📞</span>
                614-926-0787
              </a>
              <a href="mailto:info@villageplumbers.co.nz" 
                 className="inline-flex items-center bg-white text-brand-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-surface-100 transition shadow-lg">
                <span className="mr-3 text-xl">✉️</span>
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quick Info Bar */}
      <section className="bg-white border-b border-surface-200 py-6">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-6">
            <div className="flex items-center text-surface-600">
              <span className="text-accent-500 text-2xl mr-3">⏱️</span>
              <span className="font-bold tracking-wide">24/7 Emergency Service</span>
            </div>
            <div className="flex items-center text-surface-600">
              <span className="text-emerald-500 text-2xl mr-3">🛡️</span>
              <span className="font-bold tracking-wide">100% Satisfaction Guaranteed</span>
            </div>
            <div className="flex items-center text-surface-600">
              <span className="text-accent-500 text-2xl mr-3">💲</span>
              <span className="font-bold tracking-wide">Free Estimates</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Contact Content Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left: Contact Info */}
            <div className="lg:col-span-5">
              <span className="inline-block bg-accent-500/10 text-brand-600 font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-4">
                Contact Information
              </span>
              
              <h2 className="text-3xl md:text-4xl font-black text-brand-900 mb-6 leading-tight">
                Let's Connect
              </h2>
              
              <p className="text-surface-600 text-lg mb-10 leading-relaxed font-medium">
                Whether you're looking for a quote, have questions about our pest control services, or need immediate assistance, our team is ready to help.
              </p>
              
              {/* Contact Cards */}
              <div className="space-y-5 mb-10">
                <a href="tel:614-926-0787" className="flex items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group border border-surface-100">
                  <div className="w-16 h-16 bg-accent-500 rounded-2xl flex items-center justify-center mr-5 flex-shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                    <span className="text-brand-900 text-2xl">📞</span>
                  </div>
                  <div>
                    <span className="block text-surface-500 text-sm font-bold uppercase tracking-wider mb-1">Phone</span>
                    <span className="text-brand-900 font-black text-xl group-hover:text-brand-600 transition">
                      614-926-0787
                    </span>
                  </div>
                </a>
                
                <a href="mailto:info@villageplumbers.co.nz" className="flex items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group border border-surface-100">
                  <div className="w-16 h-16 bg-accent-500 rounded-2xl flex items-center justify-center mr-5 flex-shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                    <span className="text-brand-900 text-2xl">✉️</span>
                  </div>
                  <div>
                    <span className="block text-surface-500 text-sm font-bold uppercase tracking-wider mb-1">Email</span>
                    <span className="text-brand-900 font-black text-lg group-hover:text-brand-600 transition">
                      info@villageplumbers.co.nz
                    </span>
                  </div>
                </a>
                
                <div className="flex items-start p-6 bg-white rounded-2xl shadow-sm border border-surface-100">
                  <div className="w-16 h-16 bg-accent-500 rounded-2xl flex items-center justify-center mr-5 flex-shrink-0 shadow-inner">
                    <span className="text-brand-900 text-2xl">📍</span>
                  </div>
                  <div>
                    <span className="block text-surface-500 text-sm font-bold uppercase tracking-wider mb-1">Service Area</span>
                    <address className="text-brand-900 font-bold text-lg not-italic leading-relaxed">
                      Nationwide Coverage<br/>
                      USA
                    </address>
                  </div>
                </div>
              </div>
              
              {/* Business Hours */}
              <div className="bg-brand-900 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }}></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <span className="text-accent-500 mr-3 text-2xl">⏱️</span>
                    Business Hours
                  </h3>
                  <div className="space-y-4 text-surface-300">
                    <div className="flex justify-between items-center pb-3 border-b border-brand-800">
                      <span className="font-medium">Monday - Friday</span>
                      <span className="font-bold text-white">8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-brand-800">
                      <span className="font-medium">Saturday</span>
                      <span className="font-bold text-white">9:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-brand-800">
                      <span className="font-medium">Sunday</span>
                      <span className="font-bold text-white">Emergency Only</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-5 border-t border-brand-800 flex items-center bg-brand-800/50 -mx-4 -mb-4 p-4 rounded-b-xl">
                    <span className="text-accent-500 text-2xl mr-3">⚡</span>
                    <span className="text-accent-500 font-extrabold tracking-wide uppercase text-sm">24/7 Emergency Service</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right: Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-surface-100">
                <h3 className="text-3xl font-black text-brand-900 mb-3">
                  Send Us a Message
                </h3>
                <p className="text-surface-600 mb-8 font-medium text-lg">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-brand-900 mb-2 uppercase tracking-wide">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input type="text" 
                             id="name"
                             name="name" 
                             placeholder="John Smith"
                             required
                             className="w-full px-5 py-4 bg-surface-50 rounded-xl border-2 border-surface-200 focus:border-accent-500 focus:bg-white focus:outline-none transition shadow-sm font-medium text-brand-900 placeholder-surface-400" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-bold text-brand-900 mb-2 uppercase tracking-wide">
                        Phone Number
                      </label>
                      <input type="tel" 
                             id="phone"
                             name="phone" 
                             placeholder="(555) 123-4567"
                             className="w-full px-5 py-4 bg-surface-50 rounded-xl border-2 border-surface-200 focus:border-accent-500 focus:bg-white focus:outline-none transition shadow-sm font-medium text-brand-900 placeholder-surface-400" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-brand-900 mb-2 uppercase tracking-wide">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input type="email" 
                           id="email"
                           name="email" 
                           placeholder="you@example.com"
                           required
                           className="w-full px-5 py-4 bg-surface-50 rounded-xl border-2 border-surface-200 focus:border-accent-500 focus:bg-white focus:outline-none transition shadow-sm font-medium text-brand-900 placeholder-surface-400" />
                  </div>
                  
                  <div>
                    <label htmlFor="service" className="block text-sm font-bold text-brand-900 mb-2 uppercase tracking-wide">
                      Service Needed
                    </label>
                    <select id="service" name="service" className="w-full px-5 py-4 bg-surface-50 rounded-xl border-2 border-surface-200 focus:border-accent-500 focus:bg-white focus:outline-none transition shadow-sm font-medium text-brand-900 appearance-none">
                      <option value="">Select a service...</option>
                      <option value="termite">Termite Treatment</option>
                      <option value="rodent">Rodent Control</option>
                      <option value="bedbug">Bed Bug Treatment</option>
                      <option value="ant">Ant & Roach Control</option>
                      <option value="mosquito">Mosquito Control</option>
                      <option value="other">Other / Not Sure</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-brand-900 mb-2 uppercase tracking-wide">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea id="message" 
                              name="message" 
                              rows={5}
                              placeholder="How can we help you?"
                              required
                              className="w-full px-5 py-4 bg-surface-50 rounded-xl border-2 border-surface-200 focus:border-accent-500 focus:bg-white focus:outline-none transition shadow-sm font-medium text-brand-900 placeholder-surface-400 resize-none"></textarea>
                  </div>
                  
                  <button type="submit" 
                          className="w-full bg-accent-500 hover:bg-accent-600 text-brand-900 font-black text-lg py-5 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 mt-4">
                    Send Message
                  </button>
                  <p className="text-center text-sm text-surface-500 font-medium mt-4">
                    We respect your privacy. No spam ever.
                  </p>
                </form>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </main>
  );
}
