import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        // Block Ahrefs Crawler
        userAgent: 'AhrefsBot',
        disallow: '/',
      },
      {
        // Block Semrush Crawler
        userAgent: 'SemrushBot',
        disallow: '/',
      },
      {
        // Block Semrush Crawler secondary bot
        userAgent: 'SiteAuditBot',
        disallow: '/',
      },
      {
        // Block Moz Crawler
        userAgent: 'Rogerbot',
        disallow: '/',
      },
      {
        // Block Majestic Crawler
        userAgent: 'MJ12bot',
        disallow: '/',
      },
      {
        // Block Xenu Crawler
        userAgent: 'Xenu',
        disallow: '/',
      },
      {
        // Block other common bad bots/scrapers
        userAgent: ['DotBot', 'BLEXBot', 'MegaIndex.ru', 'PetalBot'],
        disallow: '/',
      },
    ],
    sitemap: 'https://villageplumbers.co.nz/sitemap.xml',
  };
}
