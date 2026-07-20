import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import blogData from '../../../data/blog.json';

export function generateStaticParams() {
  return blogData.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = blogData.find((p) => p.slug === resolvedParams.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | batyspestcontrol',
    };
  }

  return {
    title: `${post.title} | batyspestcontrol`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = blogData.find((p) => p.slug === resolvedParams.slug);
  
  if (!post) {
    notFound();
  }

  // Get recent 2 posts
  const recentPosts = blogData.filter(p => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="bg-[#fcfafb] text-gray-900 min-h-screen">
      {/* 1. Hero Banner */}
      <section className="relative pt-32 pb-24 px-4 bg-[#0d1b2a] overflow-hidden flex flex-col justify-end min-h-[450px]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={post.image || "/images/media__1783510889843.jpg"} 
            alt={post.title} 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d1b2a]/60 via-[#0d1b2a]/80 to-[#0d1b2a]/95"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="inline-block px-3 py-1 bg-[#ff7340] text-white text-xs font-bold rounded uppercase tracking-wider mb-4">
            {post.category}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight max-w-4xl leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-gray-300 font-medium text-sm">
            <span className="flex items-center gap-2">
              <span className="text-[#ff7340]">📅</span>
              {post.date}
            </span>
            <span className="flex items-center gap-2">
              <span className="text-[#ff7340]">⏱️</span>
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-[#f5f5f5] py-3 px-4 border-b border-gray-200 text-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-gray-600 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#ff7340] transition-colors">Home</Link>
          <span>›</span>
          <Link href="/blog" className="hover:text-[#ff7340] transition-colors">Blog</Link>
          <span>›</span>
          <span className="font-semibold text-gray-900 truncate">{post.title}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Article Content */}
          <div className="lg:col-span-8">
            
            <article className="prose prose-lg max-w-none text-gray-700 prose-headings:text-[#0d1b2a] prose-a:text-[#ff7340]" dangerouslySetInnerHTML={{ __html: post.content }} />

            {/* Post Navigation Links */}
            <div className="flex justify-between items-center py-8 border-y border-gray-200 mt-16">
              <Link href="/blog" className="text-sm font-bold text-gray-500 hover:text-[#ff7340] transition-colors flex items-center gap-2">
                <span className="text-lg">←</span> Back to Blog
              </Link>
            </div>

            {/* Comment Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-[#0d1b2a] mb-2">Leave a Reply</h3>
              <p className="text-gray-500 text-sm mb-6">Your email address will not be published. Required fields are marked *</p>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Comment *</label>
                  <textarea rows={6} className="w-full px-4 py-3 bg-white rounded-lg border border-gray-200 focus:border-[#ff7340] focus:ring-1 focus:ring-[#ff7340] focus:outline-none transition-colors" required></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Name *</label>
                    <input type="text" className="w-full px-4 py-3 bg-white rounded-lg border border-gray-200 focus:border-[#ff7340] focus:ring-1 focus:ring-[#ff7340] focus:outline-none transition-colors" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                    <input type="email" className="w-full px-4 py-3 bg-white rounded-lg border border-gray-200 focus:border-[#ff7340] focus:ring-1 focus:ring-[#ff7340] focus:outline-none transition-colors" required />
                  </div>
                </div>
                <button type="button" className="bg-[#ff7340] hover:bg-[#e66633] text-white font-bold px-8 py-3 rounded-lg shadow-sm transition-colors">
                  Post Comment
                </button>
              </form>
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
                  placeholder="Search articles..." 
                  className="flex-1 px-4 py-3 rounded-l-lg border border-gray-200 focus:outline-none focus:border-[#ff7340] text-sm"
                />
                <button className="bg-[#ff7340] hover:bg-[#e66633] text-white px-4 rounded-r-lg flex items-center justify-center transition-colors">
                  <span className="sr-only">Search</span>
                  🔍
                </button>
              </div>
            </div>

            {/* Recent Posts Widget */}
            <div className="bg-[#f5f5f5] rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 tracking-wide text-sm uppercase">Recent Posts</h3>
              <ul className="space-y-4">
                {recentPosts.length > 0 ? recentPosts.map((rp) => (
                  <li key={rp.slug} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                    <Link href={`/blog/${rp.slug}`} className="block font-bold text-[#0d1b2a] hover:text-[#ff7340] transition-colors text-sm mb-1">{rp.title}</Link>
                    <span className="text-xs text-gray-500">{rp.date}</span>
                  </li>
                )) : (
                  <li className="text-sm text-gray-500">No other posts available.</li>
                )}
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
                  <span className="text-2xl">📞</span>
                  614-926-0787
                </a>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Bottom CTA Section */}
      <section className="bg-[#0d1b2a] py-16 px-4">
        <div className="max-w-7xl mx-auto bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-sm">
          <div className="text-left flex-1">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">Ready to Get Started?</h2>
            <p className="text-lg text-gray-300 font-medium">
              Call us for a free 24/7 emergency pest control estimate today - no obligation!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a 
              href="tel:614-926-0787" 
              className="bg-[#ff7340] hover:bg-[#e66633] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-3 hover:-translate-y-1 whitespace-nowrap"
            >
              <span className="text-xl">📞</span>
              614-926-0787
            </a>
            <Link 
              href="/contact" 
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
