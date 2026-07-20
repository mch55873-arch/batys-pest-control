import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter', display: 'swap' });
const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.villageplumbers.co.nz'),
  title: "Nationwide Pest Control | Village Plumbers",
  description: "Fast and reliable 24/7 pest control services across the USA. Trusted by thousands.",
  keywords: ["Pest Control", "Exterminators Near Me", "Local Pest Control", "Termite Treatment", "Bed Bug Exterminator"],
  publisher: "Village Plumbers",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Nationwide Pest Control | Village Plumbers",
    description: "Fast and reliable 24/7 pest control services across the USA.",
    url: 'https://www.villageplumbers.co.nz',
    siteName: "Village Plumbers",
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: "Village Plumbers Logo",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Nationwide Pest Control",
    description: "Fast and reliable 24/7 pest control services across the USA.",
    images: ['/logo.png'],
  },
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${outfit.variable}`}>
      <body suppressHydrationWarning className="bg-white text-gray-900 antialiased font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": ["Person", "Organization"],
                  "@id": "https://www.villageplumbers.co.nz/#person",
                  "name": "Village Plumbers",
                  "url": "https://www.villageplumbers.co.nz",
                  "logo": {
                    "@type": "ImageObject",
                    "@id": "https://www.villageplumbers.co.nz/#logo",
                    "url": "https://www.villageplumbers.co.nz/logo.png",
                    "contentUrl": "https://www.villageplumbers.co.nz/logo.png",
                    "caption": "Village Plumbers",
                    "inLanguage": "en-US"
                  },
                  "image": {
                    "@id": "https://www.villageplumbers.co.nz/#logo"
                  },
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+1-614-926-0787",
                    "contactType": "customer service"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.villageplumbers.co.nz/#website",
                  "url": "https://www.villageplumbers.co.nz",
                  "name": "Nationwide Pest Control",
                  "publisher": {
                    "@id": "https://www.villageplumbers.co.nz/#person"
                  },
                  "inLanguage": "en-US",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://www.villageplumbers.co.nz/?s={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                },
                {
                  "@type": "WebPage",
                  "@id": "https://www.villageplumbers.co.nz/#webpage",
                  "url": "https://www.villageplumbers.co.nz/",
                  "name": "Nationwide Pest Control | Village Plumbers",
                  "about": {
                    "@id": "https://www.villageplumbers.co.nz/#person"
                  },
                  "isPartOf": {
                    "@id": "https://www.villageplumbers.co.nz/#website"
                  },
                  "inLanguage": "en-US"
                },
                {
                  "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
                  "@id": "https://www.villageplumbers.co.nz/#localbusiness",
                  "name": "Village Plumbers",
                  "description": "Fast and reliable 24/7 pest control services across the USA.",
                  "url": "https://www.villageplumbers.co.nz",
                  "telephone": "614-926-0787",
                  "priceRange": "$$",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Nationwide Service",
                    "addressLocality": "Columbus",
                    "addressRegion": "OH",
                    "postalCode": "43215",
                    "addressCountry": "USA"
                  },
                  "image": "https://www.villageplumbers.co.nz/logo.png"
                }
              ]
            })
          }}
        />
        
        {/* TOP BAR */}
        <div className="bg-red-600 text-white hidden sm:block border-b border-red-700">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center py-2 text-xs md:text-sm font-bold">
                    <div className="flex items-center space-x-2">
                        <span className="animate-pulse">🚨</span>
                        <span>24/7 Emergency Pest Control & Extermination - Fully Licensed & Insured</span>
                    </div>
                    <div className="flex items-center space-x-6">
                        <a href="tel:614-926-0787" className="hover:text-yellow-200 transition-colors flex items-center gap-2">
                            <span>📞</span> 614-926-0787
                        </a>
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
                 <span className="font-extrabold text-xl tracking-tight leading-none text-white">Village Plumbers</span>
                 <span className="font-bold text-xs tracking-[0.2em] text-accent-400 uppercase mt-0.5">& Pest Control</span>
               </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 font-medium text-sm text-brand-50">
               <Link href="/" className="hover:text-white hover:text-shadow transition-all relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-accent-400 after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">Home</Link>
               <Link href="/about" className="hover:text-white hover:text-shadow transition-all relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-accent-400 after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">About Us</Link>
               <Link href="/services" className="hover:text-white hover:text-shadow transition-all relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-accent-400 after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">Our Services</Link>
               <Link href="/#areas-we-serve" className="hover:text-white hover:text-shadow transition-all relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-accent-400 after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">Areas We Serve</Link>
               <Link href="/blog" className="hover:text-white hover:text-shadow transition-all relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-accent-400 after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">Blog</Link>
               <Link href="/contact" className="hover:text-white hover:text-shadow transition-all relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-accent-400 after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">Contact</Link>
            </div>
            
            {/* Call to Action Bar */}
            <div className="hidden lg:flex items-center space-x-3 bg-white px-5 py-2.5 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.1)] group cursor-pointer hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-shadow">
                <span className="text-2xl group-hover:scale-110 transition-transform origin-center">📞</span>
                <div>
                    <div className="text-[10px] text-surface-500 font-extrabold uppercase tracking-widest">Need Help? Talk to Experts</div>
                    <a href="tel:614-926-0787" className="text-sm font-extrabold text-brand-900 hover:text-accent-600 transition-colors">
                        614-926-0787
                    </a>
                </div>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden text-brand-50 hover:text-white p-2" aria-label="Menu">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            
          </div>
        </header>

        <div className="min-h-screen flex flex-col">
            {children}
            
            <footer className="bg-[#0a1128] text-white pt-24 pb-20 md:pb-12 border-t border-brand-800 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }}></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8">
                    
                    {/* Col 1 */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-3">
                           <div className="relative flex items-center justify-center w-12 h-12 bg-brand-900 rounded-xl shadow-lg border border-white/10">
                             <span className="text-2xl">🛡️</span>
                           </div>
                           <div className="flex flex-col justify-center">
                             <span className="font-extrabold text-2xl tracking-tight leading-none text-white">Village Plumbers</span>
                             <span className="font-bold text-xs tracking-[0.2em] text-accent-500 uppercase mt-0.5">Pest Control</span>
                           </div>
                        </Link>
                        <p className="text-surface-400 text-sm leading-relaxed pr-4">
                            We provide fast, reliable, and eco-friendly pest control services nationwide. Available 24/7 for all your residential and commercial needs.
                        </p>
                        <div className="flex items-center gap-4 text-surface-400 text-sm">
                            <span className="flex items-center gap-2"><span className="text-accent-500">✓</span> Licensed</span>
                            <span className="flex items-center gap-2"><span className="text-accent-500">✓</span> Insured</span>
                            <span className="flex items-center gap-2"><span className="text-accent-500">✓</span> Bonded</span>
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
                            <li><Link href="/services" className="hover:text-accent-400 hover:translate-x-1 transition-all flex items-center gap-3"><span className="text-brand-500 text-[10px]">■</span> View All Services</Link></li>
                        </ul>
                    </div>

                    {/* Col 3 */}
                    <div>
                        <h4 className="text-white font-bold mb-8 text-lg">Quick Links</h4>
                        <ul className="space-y-4 text-sm text-surface-400">
                            <li><Link href="/" className="hover:text-accent-400 hover:translate-x-1 transition-all flex items-center gap-3"><span className="text-brand-500 text-[10px]">■</span> Home</Link></li>
                            <li><Link href="/about" className="hover:text-accent-400 hover:translate-x-1 transition-all flex items-center gap-3"><span className="text-brand-500 text-[10px]">■</span> About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-accent-400 hover:translate-x-1 transition-all flex items-center gap-3"><span className="text-brand-500 text-[10px]">■</span> Contact Us</Link></li>
                            <li><Link href="/privacy-policy" className="hover:text-accent-400 hover:translate-x-1 transition-all flex items-center gap-3"><span className="text-brand-500 text-[10px]">■</span> Privacy Policy</Link></li>
                            <li><Link href="/terms-of-service" className="hover:text-accent-400 hover:translate-x-1 transition-all flex items-center gap-3"><span className="text-brand-500 text-[10px]">■</span> Terms of Service</Link></li>
                            <li><Link href="/author" className="hover:text-accent-400 hover:translate-x-1 transition-all flex items-center gap-3"><span className="text-brand-500 text-[10px]">■</span> Meet Our Team</Link></li>
                            <li><Link href="/sitemap.xml" className="hover:text-accent-400 hover:translate-x-1 transition-all flex items-center gap-3"><span className="text-brand-500 text-[10px]">■</span> HTML Sitemap</Link></li>
                        </ul>
                    </div>

                    {/* Col 4 */}
                    <div>
                        <h4 className="text-white font-bold mb-8 text-lg">Latest From Our Blog</h4>
                        <ul className="space-y-5 text-sm text-surface-400 mb-10">
                            <li><Link href="/blog" className="hover:text-white transition-colors flex items-start gap-3 leading-snug"><span className="text-accent-500 text-[10px] mt-1 shrink-0">■</span> 24-Hour Emergency Pest Control: What to Expect</Link></li>
                            <li><Link href="/blog" className="hover:text-white transition-colors flex items-start gap-3 leading-snug"><span className="text-accent-500 text-[10px] mt-1 shrink-0">■</span> How Much Does an Exterminator Cost?</Link></li>
                        </ul>
                        <h4 className="text-white font-bold mb-4">Follow Us</h4>
                        <div className="flex gap-3">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 hover:bg-accent-500 text-white rounded-lg flex items-center justify-center transition-all text-sm font-bold border border-white/5 hover:border-accent-500 hover:-translate-y-1">f</a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 hover:bg-accent-500 text-white rounded-lg flex items-center justify-center transition-all text-sm font-bold border border-white/5 hover:border-accent-500 hover:-translate-y-1">X</a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 hover:bg-accent-500 text-white rounded-lg flex items-center justify-center transition-all text-sm font-bold border border-white/5 hover:border-accent-500 hover:-translate-y-1">in</a>
                        </div>
                    </div>
                </div>
                
                {/* Copyright Bar */}
                <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-surface-500 relative z-10">
                    <div>&copy; {new Date().getFullYear()} Village Plumbers. All rights reserved. A subsidiary of Nationwide Home Services LLC.</div>
                    <div className="flex items-center gap-2">
                        <span className="bg-surface-800 px-2 py-1 rounded border border-white/5">DMCA Protected</span>
                    </div>
                </div>
            </footer>
            
            {/* Mobile Sticky CTA Bar */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-5px_15px_rgba(0,0,0,0.1)] p-3">
                <a href="tel:614-926-0787" className="flex items-center justify-center w-full bg-red-600 hover:bg-red-700 text-white font-black text-lg py-3 rounded-xl uppercase tracking-wider animate-bounce shadow-lg shadow-red-500/30">
                    <span className="mr-2 text-2xl">📞</span> Call Now For Emergency
                </a>
            </div>

            {/* Floating Action Buttons (Desktop Only) */}
            <div className="hidden md:flex fixed bottom-6 right-6 flex-col gap-3 z-50">
                <button className="w-14 h-14 bg-brand-800 text-white rounded-full shadow-[0_10px_25px_rgba(4,47,46,0.5)] flex items-center justify-center text-2xl hover:-translate-y-1 transition-transform border border-white/10 relative overflow-hidden group">
                    <span className="relative z-10">💬</span>
                    <div className="absolute inset-0 bg-brand-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
                <a href="tel:614-926-0787" className="w-14 h-14 bg-red-600 text-white rounded-full shadow-[0_10px_25px_rgba(220,38,38,0.5)] flex items-center justify-center text-2xl hover:-translate-y-1 transition-transform border border-white/10 relative overflow-hidden group">
                    <span className="relative z-10 animate-pulse">📞</span>
                    <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </a>
            </div>
        </div>

      </body>
    </html>
  );
}
