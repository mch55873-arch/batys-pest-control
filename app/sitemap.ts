import type { MetadataRoute } from 'next';
import { cityPath, cityServicePath, isIndexableCityService, isPriorityCity, pestServices, states, statePath } from '@/lib/locations';
import { SITE } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [
    { url: SITE.url, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE.url}/services`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE.url}/locations`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE.url}/about`, changeFrequency: 'yearly', priority: 0.5 },
  ];

  for (const service of pestServices) {
    urls.push({ url: `${SITE.url}/services/${service.slug}`, changeFrequency: 'monthly', priority: 0.8 });
  }

  for (const state of states) {
    urls.push({ url: `${SITE.url}${statePath(state)}`, changeFrequency: 'monthly', priority: 0.8 });
    for (const city of state.cities) {
      if (!isPriorityCity(state, city)) continue;
      urls.push({ url: `${SITE.url}${cityPath(state, city)}`, changeFrequency: 'monthly', priority: 0.7 });
      for (const service of pestServices) {
        if (!isIndexableCityService(state, city, service)) continue;
        urls.push({ url: `${SITE.url}${cityServicePath(state, city, service)}`, changeFrequency: 'monthly', priority: 0.6 });
      }
    }
  }

  return urls;
}
