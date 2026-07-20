import Link from 'next/link';
import blogData from '../../data/blog.json';

export const metadata = {
  title: "Blog & Articles | Village Plumbers",
  description: 'Expert tips, guides, and insights about pest control and home improvement from Village Plumbers.',
  alternates: {
    canonical: 'https://www.villageplumbers.co.nz/blog',
  }
};

export default function BlogPage() {
  const posts = blogData;

  return (
    <main className="bg-surface-50">
      {/* 1. Hero Section */}
      <section className="relative bg-brand-900 text-white py-20 md:py-28">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80" 
            alt="Village Plumbers Blog" 
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
                  <span className="text-accent-500 font-medium">Blog</span>
                </li>
              </ol>
            </nav>
            
            <span className="inline-block bg-accent-500 text-brand-900 font-bold text-xs uppercase tracking-widest px-4 py-2 rounded mb-6 shadow-md">
              Pest Control Tips & Guides
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white leading-tight">
              Village Plumbers Blog
            </h1>
            
            <p className="text-xl text-surface-300 mb-8 max-w-2xl leading-relaxed">
              Expert tips, guides, and insights about pest control and home protection from the professionals at Village Plumbers.
            </p>
            
            {/* Search Box */}
            <form role="search" method="get" action="/blog" className="max-w-xl">
              <div className="flex gap-2">
                <input type="search" 
                       name="s" 
                       placeholder="Search articles..."
                       className="flex-1 px-5 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-surface-300 focus:outline-none focus:border-accent-500 focus:bg-white/20 transition shadow-inner" />
                <button type="submit" 
                        className="px-6 py-4 bg-accent-500 text-brand-900 rounded-xl font-black hover:bg-accent-600 transition shadow-lg">
                  <span className="sr-only">Search</span>
                  🔍
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 2. Category Filter */}
      <section className="bg-white border-b border-surface-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center gap-4 py-4 overflow-x-auto scrollbar-hide">
            <span className="text-surface-500 font-bold uppercase tracking-wider text-sm whitespace-nowrap">Filter:</span>
            
            <Link href="/blog" 
                  className="px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition bg-accent-500 text-brand-900 shadow-sm">
              All Posts
            </Link>
            
            <Link href="/blog?category=guides" 
                  className="px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition bg-surface-100 text-surface-700 hover:bg-surface-200">
              Guides
            </Link>
            
            <Link href="/blog?category=termites" 
                  className="px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition bg-surface-100 text-surface-700 hover:bg-surface-200">
              Termites
            </Link>
            
            <Link href="/blog?category=rodents" 
                  className="px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition bg-surface-100 text-surface-700 hover:bg-surface-200">
              Rodents
            </Link>
            
            <Link href="/blog?category=tips" 
                  className="px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition bg-surface-100 text-surface-700 hover:bg-surface-200">
              Tips
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Blog Posts Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-surface-500">Coming Soon</h2>
              <p className="text-surface-400 mt-2">We are currently preparing our blog articles. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <article key={post.slug} className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-surface-100 group flex flex-col ${index === 0 && posts.length > 2 ? 'md:col-span-2 lg:col-span-3 lg:flex-row' : ''}`}>
                  <Link href={`/blog/${post.slug}`} className={`block flex-grow flex ${index === 0 && posts.length > 2 ? 'flex-col lg:flex-row' : 'flex-col'}`}>
                    
                    {/* Thumbnail */}
                    <div className={`relative overflow-hidden ${index === 0 && posts.length > 2 ? 'lg:w-1/2 aspect-video lg:aspect-auto' : 'aspect-video'}`}>
                      <img src={post.image || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80'} 
                           alt={post.title}
                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                           loading={index === 0 ? "eager" : "lazy"} />
                      
                      {/* Category Badge */}
                      <span className="absolute top-4 left-4 bg-accent-500 text-brand-900 text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                        {post.category}
                      </span>
                    </div>
                    
                    {/* Content */}
                    <div className={`p-6 lg:p-8 flex flex-col justify-center flex-grow ${index === 0 && posts.length > 2 ? 'lg:w-1/2 bg-white' : ''}`}>
                      {/* Meta */}
                      <div className="flex items-center gap-4 text-sm text-surface-500 font-medium mb-4">
                        <span className="flex items-center">
                          <span className="mr-2 text-accent-500">📅</span>
                          <time dateTime={post.date}>{post.date}</time>
                        </span>
                        <span className="flex items-center">
                          <span className="mr-2 text-accent-500">⏱️</span>
                          {post.readTime || '5 min read'}
                        </span>
                      </div>
                      
                      {/* Title */}
                      <h2 className={`${index === 0 && posts.length > 2 ? 'text-2xl lg:text-4xl' : 'text-xl lg:text-2xl'} font-black text-brand-900 mb-4 group-hover:text-brand-600 transition-colors line-clamp-3 leading-tight`}>
                        {post.title}
                      </h2>
                      
                      {/* Excerpt */}
                      <p className={`text-surface-600 line-clamp-3 mb-6 flex-grow ${index === 0 && posts.length > 2 ? 'text-lg leading-relaxed' : 'leading-relaxed'}`}>
                        {post.excerpt}
                      </p>
                      
                      {/* Read More */}
                      <span className="inline-flex items-center text-accent-500 font-black tracking-wide uppercase text-sm group-hover:text-accent-600 transition-colors mt-auto">
                        Read More
                        <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
          
        </div>
      </section>
    </main>
  );
}
