import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: "Meet Our Experts & Authors | Village Plumbers",
  description: "Get to know the certified entomologists, experienced technicians, and expert authors behind Village Plumbers.",
  alternates: {
    canonical: '/author',
  },
  openGraph: {
    title: "Meet Our Experts & Authors | Village Plumbers",
    description: "Get to know the certified entomologists, experienced technicians, and expert authors behind Village Plumbers.",
    url: 'https://www.villageplumbers.co.nz/author',
  }
};

const teamMembers = [
  {
    name: "Dr. Robert Baty",
    role: "Chief Entomologist & Lead Author",
    bio: "With over 20 years of experience in structural pest control, Dr. Baty oversees all treatment protocols and writes our in-depth pest prevention guides.",
    initials: "RB",
    color: "from-brand-500 to-brand-700"
  },
  {
    name: "Sarah Jenkins",
    role: "Senior Operations Manager",
    bio: "Sarah ensures that our nationwide fleet of technicians is always ready to respond to emergencies 24/7. She contributes to our customer service blog.",
    initials: "SJ",
    color: "from-accent-400 to-accent-600"
  },
  {
    name: "Michael Chen",
    role: "Wildlife Control Specialist",
    bio: "Michael is our resident expert on humane wildlife removal and exclusion. He regularly authors articles on how to animal-proof residential properties.",
    initials: "MC",
    color: "from-blue-500 to-blue-700"
  },
  {
    name: "Elena Rodriguez",
    role: "Termite & WDO Inspector",
    bio: "Elena has conducted over 5,000 termite inspections. Her technical writing focuses on early detection of wood-destroying organisms.",
    initials: "ER",
    color: "from-[#b18c95] to-brand-900"
  }
];

export default function AuthorPage() {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Hero Banner */}
      <section className="relative pt-32 pb-24 px-4 bg-[#0d1b2a] overflow-hidden flex flex-col items-center justify-center text-center min-h-[350px]">
        <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1b2a]/80 to-[#0d1b2a]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-gray-300 font-medium mb-4 flex items-center justify-center gap-2 text-sm uppercase tracking-wider">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <span className="text-[#ff7340]">Our Team</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Meet the Experts
          </h1>
          <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto">
            The certified entomologists and experienced technicians behind our pest control solutions and educational content.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-4 bg-surface-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-surface-900 mb-4">Our Authors & Leadership</h2>
            <p className="text-lg text-surface-600 max-w-2xl mx-auto">
              Our content is written and reviewed by industry veterans who spend their days in the field. 
              Get to know the team dedicated to keeping your property pest-free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-xl shadow-brand-900/5 border border-gray-100 hover:-translate-y-2 transition-transform duration-300 group">
                <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${member.color} text-white font-bold text-3xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform`}>
                  {member.initials}
                </div>
                <h3 className="text-2xl font-bold text-surface-900 text-center mb-1">{member.name}</h3>
                <p className="text-[#ff7340] font-medium text-center text-sm mb-4 uppercase tracking-wide">{member.role}</p>
                <div className="w-12 h-1 bg-gray-100 mx-auto mb-4 rounded-full"></div>
                <p className="text-surface-600 text-center text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Guidelines CTA */}
      <section className="py-20 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center bg-brand-50 rounded-3xl p-12 border border-brand-100">
          <h3 className="text-3xl font-bold text-surface-900 mb-4">Our Editorial Promise</h3>
          <p className="text-surface-700 text-lg mb-8 max-w-2xl mx-auto">
            Every blog post and service guide published on Village Plumbers is rigorously fact-checked by our certified entomology team. We believe in providing scientifically accurate, practical, and safe advice for all your pest concerns.
          </p>
          <Link href="/blog" className="inline-flex items-center gap-2 bg-[#0d1b2a] text-white px-8 py-4 rounded-full font-bold hover:bg-[#ff7340] hover:-translate-y-1 transition-all shadow-lg hover:shadow-xl">
            Read Our Latest Articles &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
