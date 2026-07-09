import Link from 'next/link';

export const metadata = {
  title: "Blog & Articles | Baty's Pest Control",
  description: 'Tips, guides, and insights about pest control and home improvement.',
};

import blogPosts from '../../data/blog_posts.json';

export default function BlogPage() {
  const posts = blogPosts;

  return (
    <div className="bg-[#fcfafb] text-gray-900 min-h-screen">
      {/* 1. Hero Banner */}
      <section className="relative pt-32 pb-24 px-4 bg-[#0d1b2a] overflow-hidden flex flex-col items-center justify-center text-center min-h-[350px]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/media__1783510889843.jpg" 
            alt="Pest Control Blog" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d1b2a]/80 via-[#0d1b2a]/60 to-[#0d1b2a]/90"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Blog & Articles
          </h1>
          <p className="text-xl text-gray-200 font-light max-w-2xl mx-auto">
            Tips, guides, and insights about 24/7 emergency pest control services and home improvement.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-[#f5f5f5] py-3 px-4 border-b border-gray-200 text-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-gray-600">
          <Link href="/" className="hover:text-[#ff7340] transition-colors">Home</Link>
          <span>›</span>
          <span className="font-semibold text-gray-900">Blog</span>
        </div>
      </div>

      {/* Main Content Area */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Blog Grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post, i) => (
                <article key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 flex flex-col transition-shadow">
                  {/* Top Image Placeholder */}
                  <div className="h-48 bg-[#5a626a] flex items-center justify-center">
                    <h3 className="text-4xl font-bold text-white tracking-wide">Blog Post</h3>
                  </div>
                  
                  {/* Bottom Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="text-xl font-bold text-[#0d1b2a] mb-2 line-clamp-2 hover:text-[#ff7340] cursor-pointer transition-colors">
                      {post.title}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      {post.date}
                    </div>
                    <p className="text-gray-600 mb-6 text-sm line-clamp-3 leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                    <Link href={`/blog/${post.slug}`} className="text-[#b18c95] font-bold text-sm flex items-center gap-1 hover:text-[#0d1b2a] transition-colors">
                      Read more <span className="text-lg leading-none">→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-16">
               <button className="w-10 h-10 rounded border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 bg-white shadow-sm">
                 ‹
               </button>
               <button className="w-10 h-10 rounded border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 bg-white shadow-sm">
                 1
               </button>
               <button className="w-10 h-10 rounded border border-[#ff7340] flex items-center justify-center text-white bg-[#ff7340] font-bold shadow-sm">
                 2
               </button>
               <button className="w-10 h-10 rounded border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 bg-white shadow-sm">
                 ›
               </button>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Search Widget */}
            <div className="bg-[#f5f5f5] rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 tracking-wide text-sm uppercase">Search</h3>
              <div className="flex">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="flex-1 px-4 py-3 rounded-l-lg border border-gray-200 focus:outline-none focus:border-[#b18c95] text-sm"
                />
                <button className="bg-[#b18c95] hover:bg-[#a07c85] text-white px-4 rounded-r-lg flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
              </div>
            </div>

            {/* Categories Widget */}
            <div className="bg-[#f5f5f5] rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 tracking-wide text-sm uppercase">Categories</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="flex items-center text-gray-600 hover:text-[#ff7340] transition-colors text-sm font-medium">
                    <span className="flex-1">Uncategorized</span>
                    <span className="text-gray-400">(47)</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Need Help Widget */}
            <div className="bg-[#0d1b2a] rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
              <div className="relative z-10">
                <h3 className="font-extrabold text-2xl mb-2 text-white tracking-tight">Need Help?</h3>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                  Have questions? We're here to help 24/7!
                </p>
                <a 
                  href="tel:614-926-0787" 
                  className="flex items-center gap-3 text-lg font-bold text-white hover:text-[#ff7340] transition-colors group"
                >
                  <svg className="w-6 h-6 text-[#b18c95] group-hover:text-[#ff7340] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  (614) 926-0787
                </a>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Bottom CTA Section */}
      <section className="bg-[#b18c95] py-16 px-4">
        <div className="max-w-7xl mx-auto bg-white/10 rounded-3xl p-8 md:p-12 border border-white/20 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-sm">
          <div className="text-left flex-1">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0d1b2a] mb-2 tracking-tight">Ready to Get Started?</h2>
            <p className="text-lg text-[#0d1b2a]/80 font-medium">
              Call us for a free 24/7 emergency pest control estimate today - no obligation!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a 
              href="tel:614-926-0787" 
              className="bg-[#0d1b2a] hover:bg-[#1a2b3c] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-3 hover:-translate-y-1 whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              (614) 926-0787
            </a>
            <Link 
              href="/#contact" 
              className="bg-white hover:bg-gray-50 text-[#0d1b2a] px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-3 hover:-translate-y-1 whitespace-nowrap"
            >
              Get Free Quote <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
