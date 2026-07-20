import { MetadataRoute } from 'next';
import database from '../data/nz_database.json';

const DOMAIN = 'villageplumbers.co.nz';

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
    },
    {
      url: `https://www.${DOMAIN}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }
  );

  // Add Services Pages (105 pages)
  const servicesData = require('../data/services.json');
  servicesData.forEach((service: any) => {
    sitemapEntries.push({
      url: `https://www.${DOMAIN}/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Add Blog Posts
  const blogData = require('../data/blog.json');
  const blogPosts = blogData.map((post: any) => post.slug);

  blogPosts.forEach((slug: string) => {
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

  return sitemapEntries;
}

export const dynamic = "force-static";