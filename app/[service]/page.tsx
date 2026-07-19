export const runtime = 'edge';

import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const serviceName = resolvedParams.service
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${serviceName} | batyspestcontrol`,
    description: `Professional ${serviceName} across the USA. Fast, reliable, and guaranteed results.`,
    alternates: {
      canonical: `https://www.batyspestcontrol.com/${resolvedParams.service}`,
    },
    openGraph: {
      title: `${serviceName} | batyspestcontrol`,
      description: `Professional ${serviceName} across the USA. Fast, reliable, and guaranteed results.`,
      url: `https://www.batyspestcontrol.com/${resolvedParams.service}`,
    }
  };
}

export default async function GenericServicePage({ params }: { params: Promise<{ service: string }> }) {
  // Convert slug to readable name
  const resolvedParams = await params;
  const serviceName = resolvedParams.service
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="bg-white min-h-[70vh] flex flex-col justify-center items-center py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-block bg-brand-50 text-brand-700 px-4 py-2 rounded-full font-bold text-sm mb-6">
          NATIONWIDE SERVICE
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-surface-900 mb-6 leading-tight">
          Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-600">{serviceName}</span>
        </h1>
        <p className="text-xl text-surface-800/80 font-light mb-10 leading-relaxed">
          We provide expert {serviceName.toLowerCase()} across all our service areas. Our certified technicians use the latest tools and eco-friendly products to ensure your property is safe and pest-free.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/#areas-we-serve" className="bg-brand-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-800 transition-all shadow-xl hover:-translate-y-1">
            Find Your Local Expert
          </Link>
          <a href="tel:614-926-0787" className="bg-surface-50 border border-gray-200 text-surface-900 px-8 py-4 rounded-xl font-bold hover:border-brand-500 hover:bg-brand-50 transition-all shadow-sm">
            Call 614-926-0787
          </a>
        </div>
      </div>
    </div>
  );
}
