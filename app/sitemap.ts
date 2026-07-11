import { MetadataRoute } from 'next';
import database from '../data/usa_database.json';

const DOMAIN = 'batyspestcontrol.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 1. Add Homepage and Static Pages
  sitemapEntries.push(
    {
      url: `https://www.${DOMAIN}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `https://www.${DOMAIN}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `https://www.${DOMAIN}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }
  );

  // Add Blog Posts
  const blogPosts = [
    'pest-control-services-complete-guide',
    'termite-control-services-protect-your-home',
    'best-ways-to-handle-termites-in-texas-homes',
    'quick-rodent-solutions-for-surrounding-areas',
    'the-hidden-costs-of-ignoring-pest-infestations',
    'mosquitoes-in-summer-prevention-and-fixes',
    'top-5-common-pest-emergencies-in-texas',
    'how-to-keep-roaches-away-diy-tips'
  ];

  blogPosts.forEach((slug) => {
    sitemapEntries.push({
      url: `https://www.${DOMAIN}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  // 2. Add State Pages and City Pages
  database.states.forEach((state) => {
    // State Page (e.g. https://ca.pestdefense.com)
    sitemapEntries.push({
      url: `https://${state.code}.${DOMAIN}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });

    // City Pages (e.g. https://los-angeles-ca.pestdefense.com)
    state.cities.forEach((city) => {
      sitemapEntries.push({
        url: `https://${city.slug}-${state.code}.${DOMAIN}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    });
  });

  // Next.js sitemap limit is 50,000. Our DB is ~10,000, so one file is perfect.
  return sitemapEntries;
}
