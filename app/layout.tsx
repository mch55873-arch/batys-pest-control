import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: "Nationwide Pest Control",
  description: "Fast and reliable 24/7 pest control services across the USA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${outfit.variable}`}>
      <body suppressHydrationWarning className="bg-white text-gray-900 antialiased font-sans">
        
        {/* TOP BAR */}
        <div className="bg-surface-900 text-gray-300 hidden sm:block border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center py-2 text-xs md:text-sm">
                    {/* Social Icons */}
                    <div className="flex items-center space-x-3 mb-2 md:mb-0">
                        <a href="#" className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 hover:text-accent-400 transition-colors">f</a>
                        <a href="#" className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 hover:text-accent-400 transition-colors">t</a>
                        <a href="#" className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 hover:text-accent-400 transition-colors">in</a>
                    </div>
                    {/* Contact Info */}
                    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                        <div className="flex items-center group">
                            <span className="mr-2 text-brand-500 group-hover:text-accent-500 transition-colors">📍</span>
                            <span className="group-hover:text-white transition-colors">Nationwide Service, USA</span>
                        </div>
                        <div className="flex items-center group">
                            <span className="mr-2 text-brand-500 group-hover:text-accent-500 transition-colors">✉️</span>
                            <a href="mailto:info@batyspestcontrol.com" className="hover:text-white transition">info@batyspestcontrol.com</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* MAIN NAVIGATION */}
        <header className="sticky top-0 z-50 bg-brand-900 text-white shadow-xl shadow-brand-900/10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            
            <Link href="/" className="flex items-center gap-3 group">
               {/* Custom SVG Logo Icon */}
               <div className="relative flex items-center justify-center w-10 h-10 bg-white rounded-xl shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all">
                 <svg className="w-6 h-6 text-brand-900 absolute z-10" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                 </svg>
                 <svg className="w-8 h-8 text-accent-500 opacity-80 absolute top-1 right-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                 </svg>
               </div>
               
               {/* Typography */}
               <div className="flex flex-col justify-center">
                 <span className="font-extrabold text-xl tracking-tight leading-none text-white">Baty's</span>
                 <span className="font-bold text-xs tracking-[0.2em] text-accent-400 uppercase mt-0.5">& Pest Control</span>
               </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 font-medium text-sm text-brand-50">
               <Link href="/" className="hover:text-white hover:text-shadow transition-all relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-accent-400 after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">Home</Link>
               <Link href="/about" className="hover:text-white hover:text-shadow transition-all relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-accent-400 after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">About Us</Link>
               <Link href="/#services" className="hover:text-white hover:text-shadow transition-all relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-accent-400 after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">Our Services</Link>
               <Link href="/#areas-we-serve" className="hover:text-white hover:text-shadow transition-all relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-accent-400 after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">Areas We Serve</Link>
               <Link href="/blog" className="hover:text-white hover:text-shadow transition-all relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-accent-400 after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">Blog</Link>
               <Link href="/#contact" className="hover:text-white hover:text-shadow transition-all relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-accent-400 after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">Contact</Link>
            </div>
            
            {/* Call to Action Bar */}
            <div className="hidden lg:flex items-center space-x-3 bg-white px-5 py-2.5 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.1)] group cursor-pointer hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-shadow">
                <span className="text-2xl group-hover:scale-110 transition-transform origin-center">📞</span>
                <div>
                    <div className="text-[10px] text-surface-500 font-extrabold uppercase tracking-widest">Need Help? Talk to Experts</div>
                    <a href="tel:614-926-0787" className="text-sm font-extrabold text-brand-900 hover:text-accent-600 transition-colors">
                        (614) 926-0787
                    </a>
                </div>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden text-white text-2xl hover:text-accent-400 transition-colors">
                ☰
            </button>
            
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* COMPREHENSIVE DARK FOOTER */}
        <div className="w-full mt-auto">
            {/* 1. Pre-Footer Banner */}
            <div className="bg-brand-800 text-white py-12 px-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                    <div>
                        <h2 className="text-3xl lg:text-4xl font-extrabold mb-2 text-white">Ready to Get Started?</h2>
                        <p className="text-lg text-brand-50 font-light">Get your free 24/7 emergency pest control services estimate today - no obligation!</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                        <a href="tel:614-926-0787" className="bg-white text-brand-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-surface-50 transition-colors flex items-center justify-center gap-2 shadow-lg hover:-translate-y-1">
                            📞 (614) 926-0787
                        </a>
                        <a href="/#contact" className="bg-accent-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-accent-400 transition-colors shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2">
                            Get Free Quote ➔
                        </a>
                    </div>
                </div>
            </div>

            {/* 2. Trust Badges */}
            <div className="bg-surface-800 py-10 px-4 border-b border-white/5">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
                    <div className="flex items-center gap-4 justify-center md:justify-start group">
                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-2xl shrink-0 group-hover:bg-brand-500/20 group-hover:text-brand-400 transition-colors border border-white/5">🛡️</div>
                        <div>
                            <div className="font-bold text-sm">Licensed & Trusted</div>
                            <div className="text-xs text-surface-400">TPCL #0992001</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 justify-center md:justify-start group">
                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-2xl shrink-0 group-hover:bg-accent-500/20 group-hover:text-accent-400 transition-colors border border-white/5">⭐</div>
                        <div>
                            <div className="font-bold text-sm">Pet Friendly</div>
                            <div className="text-xs text-surface-400">Children & Pet Safe</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 justify-center md:justify-start group">
                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-2xl shrink-0 group-hover:bg-brand-500/20 group-hover:text-brand-400 transition-colors border border-white/5">✅</div>
                        <div>
                            <div className="font-bold text-sm">Satisfaction Guaranteed</div>
                            <div className="text-xs text-surface-400">Quality Work Guaranteed</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 justify-center md:justify-start group">
                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-2xl shrink-0 group-hover:bg-accent-500/20 group-hover:text-accent-400 transition-colors border border-white/5">🏠</div>
                        <div>
                            <div className="font-bold text-sm">Locally Owned</div>
                            <div className="text-xs text-surface-400">Nationwide Network</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Main Dark Footer */}
            <footer className="bg-surface-900 text-surface-200 py-20 px-4 relative">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                    {/* Col 1 */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 bg-brand-900 rounded-lg flex items-center justify-center shadow-lg">
                                <span className="text-2xl">🐞</span>
                            </div>
                            <span className="font-extrabold text-2xl text-white">Baty's Pest Control</span>
                        </div>
                        <p className="text-sm text-surface-400 mb-8 leading-relaxed font-light">
                            Your trusted local pest control partner. Fast, reliable relief anytime. Licensed & trusted – TPCL #0992001.
                        </p>
                        <div className="space-y-4 text-sm text-surface-300">
                            <div className="flex items-start gap-4">
                                <span className="text-accent-500 mt-0.5 text-lg">📍</span>
                                <span>Serving Texas & Nationwide</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-accent-500 text-lg">✉️</span>
                                <a href="mailto:info@batyspestcontrol.com" className="hover:text-white transition-colors">info@batyspestcontrol.com</a>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-accent-500 text-lg">📞</span>
                                <a href="tel:614-926-0787" className="hover:text-white transition-colors">(614) 926-0787</a>
                            </div>
                        </div>
                    </div>

                    {/* Col 2 */}
                    <div>
                        <h4 className="text-white font-bold mb-8 text-lg">Our Services</h4>
                        <ul className="space-y-4 text-sm text-surface-400">
                            <li><Link href="/termite-treatment" className="hover:text-accent-400 hover:translate-x-1 transition-all flex items-center gap-3"><span className="text-brand-500 text-[10px]">■</span> Termite Treatment</Link></li>
                            <li><Link href="/rodent-control" className="hover:text-accent-400 hover:translate-x-1 transition-all flex items-center gap-3"><span className="text-brand-500 text-[10px]">■</span> Rodent Control</Link></li>
                            <li><Link href="/bed-bug-treatment" className="hover:text-accent-400 hover:translate-x-1 transition-all flex items-center gap-3"><span className="text-brand-500 text-[10px]">■</span> Bed Bug Treatment</Link></li>
                            <li><Link href="/ant-control-services" className="hover:text-accent-400 hover:translate-x-1 transition-all flex items-center gap-3"><span className="text-brand-500 text-[10px]">■</span> Ant & Roach Control</Link></li>
                            <li><Link href="/mosquito-control" className="hover:text-accent-400 hover:translate-x-1 transition-all flex items-center gap-3"><span className="text-brand-500 text-[10px]">■</span> Mosquito Control</Link></li>
                            <li><Link href="/wildlife-removal" className="hover:text-accent-400 hover:translate-x-1 transition-all flex items-center gap-3"><span className="text-brand-500 text-[10px]">■</span> View All Services</Link></li>
                        </ul>
                    </div>

                    {/* Col 3 */}
                    <div>
                        <h4 className="text-white font-bold mb-8 text-lg">Quick Links</h4>
                        <ul className="space-y-4 text-sm text-surface-400">
                            <li><Link href="/" className="hover:text-accent-400 hover:translate-x-1 transition-all flex items-center gap-3"><span className="text-brand-500 text-[10px]">■</span> Home</Link></li>
                            <li><Link href="/about" className="hover:text-accent-400 hover:translate-x-1 transition-all flex items-center gap-3"><span className="text-brand-500 text-[10px]">■</span> About Us</Link></li>
                            <li><Link href="/#areas-we-serve" className="hover:text-accent-400 hover:translate-x-1 transition-all flex items-center gap-3"><span className="text-brand-500 text-[10px]">■</span> Service Areas</Link></li>
                            <li><Link href="/blog" className="hover:text-accent-400 hover:translate-x-1 transition-all flex items-center gap-3"><span className="text-brand-500 text-[10px]">■</span> Blog</Link></li>
                            <li><Link href="/#contact" className="hover:text-accent-400 hover:translate-x-1 transition-all flex items-center gap-3"><span className="text-brand-500 text-[10px]">■</span> Contact Us</Link></li>
                            <li><a href="#" className="hover:text-accent-400 hover:translate-x-1 transition-all flex items-center gap-3"><span className="text-brand-500 text-[10px]">■</span> Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Col 4 */}
                    <div>
                        <h4 className="text-white font-bold mb-8 text-lg">Latest From Our Blog</h4>
                        <ul className="space-y-5 text-sm text-surface-400 mb-10">
                            <li><a href="#" className="hover:text-white transition-colors flex items-start gap-3 leading-snug"><span className="text-accent-500 text-[10px] mt-1 shrink-0">■</span> 24-Hour Emergency Pest Control: What to Expect & What It Costs</a></li>
                            <li><a href="#" className="hover:text-white transition-colors flex items-start gap-3 leading-snug"><span className="text-accent-500 text-[10px] mt-1 shrink-0">■</span> How Much Does an Exterminator Cost?</a></li>
                            <li><a href="#" className="hover:text-white transition-colors flex items-start gap-3 leading-snug"><span className="text-accent-500 text-[10px] mt-1 shrink-0">■</span> Termites vs. Ants: When to Call a Pro</a></li>
                        </ul>
                        <h4 className="text-white font-bold mb-4">Follow Us</h4>
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 bg-white/5 hover:bg-accent-500 text-white rounded-lg flex items-center justify-center transition-all text-sm font-bold border border-white/5 hover:border-accent-500 hover:-translate-y-1">f</a>
                            <a href="#" className="w-10 h-10 bg-white/5 hover:bg-accent-500 text-white rounded-lg flex items-center justify-center transition-all text-sm font-bold border border-white/5 hover:border-accent-500 hover:-translate-y-1">y</a>
                            <a href="#" className="w-10 h-10 bg-white/5 hover:bg-accent-500 text-white rounded-lg flex items-center justify-center transition-all text-sm font-bold border border-white/5 hover:border-accent-500 hover:-translate-y-1">t</a>
                            <a href="#" className="w-10 h-10 bg-white/5 hover:bg-accent-500 text-white rounded-lg flex items-center justify-center transition-all text-sm font-bold border border-white/5 hover:border-accent-500 hover:-translate-y-1">i</a>
                        </div>
                    </div>
                </div>
            </footer>
            
            {/* Floating Action Buttons */}
            <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
                <button className="w-14 h-14 bg-brand-800 text-white rounded-full shadow-[0_10px_25px_rgba(4,47,46,0.5)] flex items-center justify-center text-2xl hover:-translate-y-1 transition-transform border border-white/10 relative overflow-hidden group">
                    <span className="relative z-10">💬</span>
                    <div className="absolute inset-0 bg-brand-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
                <a href="tel:614-926-0787" className="w-14 h-14 bg-accent-500 text-white rounded-full shadow-[0_10px_25px_rgba(245,158,11,0.5)] flex items-center justify-center text-2xl hover:-translate-y-1 transition-transform border border-white/10 relative overflow-hidden group">
                    <span className="relative z-10">📞</span>
                    <div className="absolute inset-0 bg-accent-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </a>
            </div>
        </div>

      </body>
    </html>
  );
}
