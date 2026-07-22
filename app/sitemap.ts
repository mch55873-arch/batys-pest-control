import type { MetadataRoute } from 'next';
import { articles } from '@/data/articles';
import { citiesForState, cityServiceUrl, cityUrl, pestServices, states, stateUrl } from '@/lib/locations';
import { SITE } from '@/lib/site';

const TARGET_URL_COUNT = 30_950;

type SitemapItem = MetadataRoute.Sitemap[number];

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];
  const seen = new Set<string>();

  const add = (item: SitemapItem) => {
    if (urls.length >= TARGET_URL_COUNT || seen.has(item.url)) return;
    seen.add(item.url);
    urls.push(item);
  };

  [
    SITE.url,
    `${SITE.url}/services`,
    `${SITE.url}/locations`,
    `${SITE.url}/articles`,
    `${SITE.url}/about`,
    `${SITE.url}/contact`,
    `${SITE.url}/privacy-policy`,
  ].forEach((url, index) => add({ url, changeFrequency: index === 0 ? 'weekly' : 'monthly', priority: index === 0 ? 1 : 0.8 }));

  for (const service of pestServices) {
    add({ url: `${SITE.url}/services/${service.slug}`, changeFrequency: 'monthly', priority: 0.8 });
  }

  for (const article of articles) {
    add({ url: `${SITE.url}/articles/${article.slug}`, changeFrequency: 'monthly', priority: 0.7 });
  }

  for (const state of states) {
    add({ url: stateUrl(state), changeFrequency: 'monthly', priority: 0.8 });
    for (const city of citiesForState(state)) {
      add({ url: cityUrl(state, city), changeFrequency: 'monthly', priority: 0.7 });
    }
  }

  outer: for (const state of states) {
    for (const city of citiesForState(state)) {
      for (const service of pestServices) {
        add({ url: cityServiceUrl(state, city, service), changeFrequency: 'monthly', priority: 0.6 });
        if (urls.length >= TARGET_URL_COUNT) break outer;
      }
    }
  }

  return urls;
}
