import type { MetadataRoute } from 'next';
import { articles } from '@/data/articles';
import { citiesForState, cityServiceUrl, cityUrl, isIndexableCityService, pestServices, states, stateUrl } from '@/lib/locations';
import { SITE } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [
    { url: SITE.url, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE.url}/services`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE.url}/locations`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE.url}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE.url}/about`, changeFrequency: 'yearly', priority: 0.5 },
  ];

  for (const service of pestServices) {
    urls.push({ url: `${SITE.url}/services/${service.slug}`, changeFrequency: 'monthly', priority: 0.8 });
  }

  for (const article of articles) {
    urls.push({ url: `${SITE.url}/blog/${article.slug}`, changeFrequency: 'monthly', priority: 0.7 });
  }

  for (const state of states) {
    urls.push({ url: stateUrl(state), changeFrequency: 'monthly', priority: 0.8 });
    for (const city of citiesForState(state)) {
      urls.push({ url: cityUrl(state, city), changeFrequency: 'monthly', priority: 0.7 });
      for (const service of pestServices) {
        if (!isIndexableCityService(state, city, service)) continue;
        urls.push({ url: cityServiceUrl(state, city, service), changeFrequency: 'monthly', priority: 0.6 });
      }
    }
  }

  return urls;
}
