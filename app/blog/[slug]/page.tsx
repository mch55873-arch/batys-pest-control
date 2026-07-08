import Link from 'next/link';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return [
    { slug: 'pest-control-services-complete-guide' },
    { slug: 'termite-control-services-protect-your-home' },
    { slug: 'best-ways-to-handle-termites-in-texas-homes' },
    { slug: 'quick-rodent-solutions-for-surrounding-areas' }
  ];
}

const ArticleCompleteGuide = () => (
  <article className="prose prose-lg max-w-none text-gray-700">
    <p className="lead text-xl text-gray-600 font-medium mb-8">
      Pests can damage property, contaminate food, spread diseases, and create an unhealthy environment. Professional pest control services help eliminate existing infestations while preventing future pest problems. Whether you're dealing with termites, rodents, bed bugs, cockroaches, ants, or mosquitoes, the right treatment plan protects your home, family, and business.
    </p>
    <p className="mb-10">
      Professional pest control includes detailed inspections, targeted treatments, preventive solutions, and routine maintenance to keep pests from returning.
    </p>
    
    <h2 className="text-3xl font-bold text-[#0d1b2a] mt-12 mb-6">Termite Control Services</h2>
    <p>
      Termites cause billions of dollars in structural damage every year. They feed on wood, flooring, support beams, and other cellulose-based materials. Because termites usually work behind walls and under floors, many infestations go unnoticed until significant damage has already occurred.
    </p>
    <h3 className="text-2xl font-bold text-[#0d1b2a] mt-8 mb-4">Common Signs of a Termite Infestation</h3>
    <ul className="list-disc pl-6 space-y-2 mb-8">
      <li>Mud tubes on walls or foundations</li>
      <li>Hollow-sounding wood</li>
      <li>Discarded termite wings near windows and doors</li>
      <li>Doors and windows that suddenly become difficult to open</li>
      <li>Bubbling or peeling paint</li>
      <li>Small holes in wooden structures</li>
      <li>Sagging floors or ceilings</li>
    </ul>
    <p className="mb-10">
      Professional termite control starts with a detailed inspection to locate active colonies and determine the extent of the damage. Treatment options may include liquid barrier treatments, baiting systems, wood treatments, or a combination of methods for long-term protection.
    </p>

    <hr className="my-12 border-gray-200" />

    <h2 className="text-3xl font-bold text-[#0d1b2a] mt-12 mb-6">Rodent Removal Services</h2>
    <p>
      Rats and mice can contaminate food, damage electrical wiring, destroy insulation, and spread bacteria throughout a property. Rodents reproduce quickly, making early removal essential.
    </p>
    <h3 className="text-2xl font-bold text-[#0d1b2a] mt-8 mb-4">Signs of Rodent Activity</h3>
    <ul className="list-disc pl-6 space-y-2 mb-8">
      <li>Droppings in cabinets or pantries</li>
      <li>Gnaw marks on furniture or wiring</li>
      <li>Scratching sounds inside walls</li>
      <li>Nesting materials such as shredded paper or fabric</li>
      <li>Grease marks along walls</li>
      <li>Strong ammonia-like odors</li>
    </ul>
    <p className="mb-10">
      Professional rodent removal includes identifying entry points, removing existing rodents, sealing access areas, and recommending sanitation measures to reduce future infestations.
    </p>

    <hr className="my-12 border-gray-200" />

    <h2 className="text-3xl font-bold text-[#0d1b2a] mt-12 mb-6">Bed Bug Treatment</h2>
    <p>
      Bed bugs hide in mattresses, furniture, wall cracks, and upholstered items. They feed on human blood, usually during the night, and can spread rapidly between rooms and neighboring properties.
    </p>
    <h3 className="text-2xl font-bold text-[#0d1b2a] mt-8 mb-4">Common Signs of Bed Bugs</h3>
    <ul className="list-disc pl-6 space-y-2 mb-8">
      <li>Small bite marks on exposed skin</li>
      <li>Blood spots on bedding</li>
      <li>Dark fecal stains on mattresses</li>
      <li>Shed bed bug skins</li>
      <li>Live insects around mattress seams</li>
      <li>Musty odors in heavily infested rooms</li>
    </ul>
    <p className="mb-10">
      Professional treatments may include heat treatments, targeted insecticide applications, and follow-up inspections to ensure complete elimination.
    </p>

    <hr className="my-12 border-gray-200" />

    <h2 className="text-3xl font-bold text-[#0d1b2a] mt-12 mb-6">Ant and Cockroach Control</h2>
    <p>
      Ants and cockroaches are among the most common household pests. They contaminate food, spread bacteria, and multiply quickly if left untreated.
    </p>
    <h3 className="text-2xl font-bold text-[#0d1b2a] mt-8 mb-4">Ant Control</h3>
    <p className="mb-6">
      Professional ant control focuses on locating and eliminating the colony rather than simply treating visible ants. Baits, perimeter treatments, and exclusion methods help prevent reinfestation.
    </p>
    <h3 className="text-2xl font-bold text-[#0d1b2a] mt-8 mb-4">Cockroach Control</h3>
    <p className="mb-10">
      Cockroaches thrive in warm, damp areas such as kitchens, bathrooms, and basements. Treatment typically includes bait stations, crack-and-crevice applications, sanitation recommendations, and ongoing monitoring.
    </p>

    <hr className="my-12 border-gray-200" />

    <h2 className="text-3xl font-bold text-[#0d1b2a] mt-12 mb-6">Mosquito Control Services</h2>
    <p>
      Mosquitoes are more than a nuisance. They can transmit diseases and make outdoor spaces uncomfortable during warmer months.
    </p>
    <p className="mb-4">Professional mosquito control includes:</p>
    <ul className="list-disc pl-6 space-y-2 mb-8">
      <li>Property inspections</li>
      <li>Breeding site identification</li>
      <li>Larval treatments</li>
      <li>Barrier sprays</li>
      <li>Yard fogging when appropriate</li>
      <li>Standing water reduction recommendations</li>
    </ul>
    <p className="mb-10">
      Regular seasonal treatments help reduce mosquito populations around homes and commercial properties.
    </p>

    <hr className="my-12 border-gray-200" />

    <h2 className="text-3xl font-bold text-[#0d1b2a] mt-12 mb-6">Preventive Pest Control Tips</h2>
    <p>
      Preventing pests is often easier and less expensive than treating a major infestation. Homeowners can reduce pest activity by:
    </p>
    <ul className="list-disc pl-6 space-y-2 mb-8">
      <li>Sealing cracks and gaps around doors and windows</li>
      <li>Repairing leaking pipes and faucets</li>
      <li>Keeping kitchens clean and storing food in sealed containers</li>
      <li>Removing standing water and trimming vegetation near the home</li>
      <li>Cleaning gutters regularly and disposing of garbage promptly</li>
      <li>Reducing clutter in storage areas</li>
      <li>Scheduling routine pest inspections</li>
    </ul>
    <p className="mb-10">
      Consistent maintenance lowers the risk of future infestations and helps identify problems before they become severe.
    </p>

    <div className="bg-[#b18c95]/10 border-l-4 border-[#b18c95] p-6 my-10 rounded-r-xl">
      <h3 className="text-xl font-bold text-[#0d1b2a] mt-0 mb-4">When Should You Call a Professional?</h3>
      <p className="mb-4 text-gray-700">Professional pest control is recommended when:</p>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-700">
        <li>You notice recurring pest activity.</li>
        <li>DIY treatments fail.</li>
        <li>Structural damage is visible.</li>
        <li>Rodents are present inside the property.</li>
        <li>Termites or bed bugs are suspected.</li>
        <li>Multiple pest species are active.</li>
      </ul>
      <p className="mb-0 text-sm font-semibold text-[#0d1b2a]">
        Early intervention typically reduces treatment costs and limits property damage.
      </p>
    </div>
  </article>
);

const ArticleTermites = () => (
  <article className="prose prose-lg max-w-none text-gray-700">
    <p className="lead text-xl text-gray-600 font-medium mb-8">
      Termites are among the most destructive structural pests. They feed on wood and other cellulose-based materials, often causing extensive damage before homeowners notice any signs of an infestation. Professional termite control services help detect termite activity early, eliminate active colonies, and protect your property from future damage.
    </p>
    <p className="mb-10">
      Whether you own a home, rental property, office, or commercial building, routine termite inspections and timely treatment can prevent expensive repairs and preserve your property's structural integrity.
    </p>

    <h2 className="text-3xl font-bold text-[#0d1b2a] mt-12 mb-6">Our Termite Treatment Methods</h2>
    <p>Every property is different, so we select the treatment method based on the termite species, infestation level, and building structure.</p>
    
    <h3 className="text-2xl font-bold text-[#0d1b2a] mt-8 mb-4">Liquid Termite Treatment</h3>
    <p>
      Liquid termiticides create a protective barrier around the foundation of your home or building. As termites move through the treated soil, they carry the product back to the colony, helping eliminate the infestation.
    </p>
    <h4 className="font-bold text-[#0d1b2a] mt-4 mb-2">Benefits</h4>
    <ul className="list-disc pl-6 space-y-2 mb-8">
      <li>Fast protection</li>
      <li>Long-lasting barrier</li>
      <li>Effective against subterranean termites</li>
      <li>Helps prevent future infestations</li>
    </ul>

    <hr className="my-10 border-gray-200" />

    <h3 className="text-2xl font-bold text-[#0d1b2a] mt-8 mb-4">Termite Bait Systems</h3>
    <p>
      Bait stations are installed around the property to attract termites. Worker termites feed on the bait and carry it back to the colony, allowing the treatment to spread throughout the population.
    </p>
    <h4 className="font-bold text-[#0d1b2a] mt-4 mb-2">Benefits</h4>
    <ul className="list-disc pl-6 space-y-2 mb-8">
      <li>Targets the entire colony</li>
      <li>Minimal disruption to landscaping</li>
      <li>Continuous monitoring</li>
      <li>Long-term protection</li>
    </ul>

    <hr className="my-10 border-gray-200" />

    <h3 className="text-2xl font-bold text-[#0d1b2a] mt-8 mb-4">Wood Treatment</h3>
    <p>
      Wood treatments protect exposed timber by applying products directly to the wood surface or injecting treatment into affected areas.
    </p>
    <h4 className="font-bold text-[#0d1b2a] mt-4 mb-2">Commonly Used For:</h4>
    <ul className="list-disc pl-6 space-y-2 mb-8">
      <li>Framing lumber</li>
      <li>Decks and fences</li>
      <li>Wooden sheds</li>
      <li>Crawl spaces</li>
      <li>Structural beams</li>
    </ul>

    <h2 className="text-3xl font-bold text-[#0d1b2a] mt-12 mb-6">Residential & Commercial Control</h2>
    
    <h3 className="text-2xl font-bold text-[#0d1b2a] mt-8 mb-4">Residential Termite Control</h3>
    <p>Your home is one of your biggest investments. Professional termite control helps protect it from structural damage and expensive repairs. Services include complete inspections, colony detection, liquid barriers, spot treatments, and annual maintenance.</p>

    <h3 className="text-2xl font-bold text-[#0d1b2a] mt-8 mb-4">Commercial Termite Control</h3>
    <p>Businesses cannot afford structural damage or unexpected repair costs. We provide tailored solutions for office buildings, restaurants, hotels, retail stores, warehouses, schools, apartment complexes, and more to minimize disruption and provide long-term protection.</p>

    <hr className="my-12 border-gray-200" />

    <h2 className="text-3xl font-bold text-[#0d1b2a] mt-12 mb-6">How to Prevent Termites</h2>
    <p className="mb-4">Although professional treatment is the most effective solution, homeowners can reduce the risk of infestation by following good maintenance practices:</p>
    <ul className="list-disc pl-6 space-y-4 mb-8">
      <li><strong>Reduce Moisture:</strong> Repair leaking pipes, improve drainage, and keep crawl spaces dry.</li>
      <li><strong>Remove Wood-to-Soil Contact:</strong> Keep wooden siding, fences, and decks from touching the soil.</li>
      <li><strong>Store Firewood Properly:</strong> Keep firewood and lumber away from your home's foundation.</li>
      <li><strong>Seal Entry Points:</strong> Seal cracks around foundations, utility lines, windows, and doors.</li>
      <li><strong>Schedule Annual Inspections:</strong> Professional inspections can detect activity before major damage occurs.</li>
    </ul>

    <div className="bg-[#ff7340]/10 border-l-4 border-[#ff7340] p-6 my-10 rounded-r-xl">
      <h3 className="text-xl font-bold text-[#0d1b2a] mt-0 mb-4">Request a Professional Termite Inspection</h3>
      <p className="mb-4 text-gray-700">
        Termites rarely disappear without treatment. Early detection and professional termite control help protect your property from costly structural damage. Whether you need a routine inspection, an active infestation treated, or long-term preventive protection, our team provides reliable termite control solutions tailored to your property.
      </p>
      <p className="mb-0 text-sm font-semibold text-[#0d1b2a]">
        Contact us today to schedule your termite inspection and receive a customized treatment plan.
      </p>
    </div>
  </article>
);


export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  const title = slug === 'pest-control-services-complete-guide' 
    ? 'Pest Control Services: Complete Guide to Protecting Your Home and Business'
    : slug === 'termite-control-services-protect-your-home'
    ? 'Termite Control Services: Protect Your Home from Costly Termite Damage'
    : slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="bg-[#fcfafb] text-gray-900 min-h-screen">
      {/* 1. Hero Banner */}
      <section className="relative pt-32 pb-24 px-4 bg-[#0d1b2a] overflow-hidden flex flex-col justify-end min-h-[450px]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/media__1783510889843.jpg" 
            alt="Pest Control Blog Post" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d1b2a]/60 via-[#0d1b2a]/80 to-[#0d1b2a]/95"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="inline-block px-3 py-1 bg-[#ff7340] text-white text-xs font-bold rounded uppercase tracking-wider mb-4">
            Pest Advice
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight max-w-4xl leading-tight">
            {title}
          </h1>
          <div className="flex items-center gap-6 text-gray-300 font-medium text-sm">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              February 2, 2026
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              By Baty's Pest Control
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
          <span className="font-semibold text-gray-900 truncate">{title}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Article Content */}
          <div className="lg:col-span-8">
            
            {slug === 'termite-control-services-protect-your-home' ? <ArticleTermites /> : <ArticleCompleteGuide />}

            {/* Post Navigation Links */}
            <div className="flex justify-between items-center py-8 border-y border-gray-200 mt-16">
              <a href="#" className="text-sm font-bold text-gray-500 hover:text-[#ff7340] transition-colors flex items-center gap-2">
                <span className="text-lg">←</span> Previous Post
              </a>
              <a href="#" className="text-sm font-bold text-gray-500 hover:text-[#ff7340] transition-colors flex items-center gap-2">
                Next Post <span className="text-lg">→</span>
              </a>
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
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Website</label>
                  <input type="url" className="w-full px-4 py-3 bg-white rounded-lg border border-gray-200 focus:border-[#ff7340] focus:ring-1 focus:ring-[#ff7340] focus:outline-none transition-colors" />
                </div>
                <div className="flex items-start gap-3">
                  <input type="checkbox" id="save-info" className="mt-1" />
                  <label htmlFor="save-info" className="text-sm text-gray-600">Save my name, email, and website in this browser for the next time I comment.</label>
                </div>
                <button type="button" className="bg-[#ffaa00] hover:bg-[#e69900] text-white font-bold px-8 py-3 rounded-lg shadow-sm transition-colors">
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
                  placeholder="Search..." 
                  className="flex-1 px-4 py-3 rounded-l-lg border border-gray-200 focus:outline-none focus:border-[#b18c95] text-sm"
                />
                <button className="bg-[#b18c95] hover:bg-[#a07c85] text-white px-4 rounded-r-lg flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
              </div>
            </div>

            {/* Recent Posts Widget */}
            <div className="bg-[#f5f5f5] rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 tracking-wide text-sm uppercase">Recent Posts</h3>
              <ul className="space-y-4">
                <li className="border-b border-gray-200 pb-4">
                  <Link href="/blog/termite-control-services-protect-your-home" className="block font-bold text-[#0d1b2a] hover:text-[#ff7340] transition-colors text-sm mb-1">Termite Control Services: Protect Your Home</Link>
                  <span className="text-xs text-gray-500">February 2, 2026</span>
                </li>
                <li className="border-b border-gray-200 pb-4">
                  <Link href="/blog/pest-control-services-complete-guide" className="block font-bold text-[#0d1b2a] hover:text-[#ff7340] transition-colors text-sm mb-1">Complete Guide to Protecting Your Home</Link>
                  <span className="text-xs text-gray-500">February 2, 2026</span>
                </li>
              </ul>
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
