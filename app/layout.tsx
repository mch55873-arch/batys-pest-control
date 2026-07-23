import type { Metadata } from 'next';
import { LeadPopup } from '@/components/LeadPopup';
import { SiteFooter, SiteHeader } from '@/components/SiteShell';
import { SITE } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'Pest Control Services Across the USA | Batys Pest Control', template: '%s | Batys Pest Control' },
  description: SITE.description,
  applicationName: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: '/' },
  icons: { icon: '/icon.svg' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE.url,
    siteName: SITE.name,
    title: 'Pest Control Services Across the USA',
    description: SITE.description,
    images: [{ url: '/images/pest-control-hero.webp', width: 1200, height: 630, alt: 'Batys Pest Control services and location directory' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pest Control Services Across the USA',
    description: SITE.description,
    images: ['/images/pest-control-hero.webp'],
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: SITE.name,
      url: SITE.url,
      description: SITE.description,
      telephone: SITE.phoneDisplay,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      name: SITE.name,
      url: SITE.url,
      publisher: { '@id': `${SITE.url}/#organization` },
      inLanguage: 'en-US',
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US">
      <body className="bg-white font-sans text-slate-900 antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, '\\u003c') }} />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <LeadPopup />
      </body>
    </html>
  );
}
