import { MetadataRoute } from 'next';
import database from '../data/usa_database.json';

const DOMAIN = 'batyspestcontrol.com'; // Replace this with your actual domain when live

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 1. Add Homepage
  sitemapEntries.push({
    url: `https://www.${DOMAIN}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
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
