# Semantic SEO architecture

## Source context

Batys helps a US property owner understand a pest problem, evaluate the next service step, and locate an appropriate independent provider category. It does not claim to be the applicator operating in every city.

## Topical hierarchy

1. Country: United States
2. Jurisdiction: 50 states plus District of Columbia
3. Location: valid city or community
4. Pest entity: ants, cockroaches, bed bugs, termites, rodents, mosquitoes, ticks, stinging pests, spiders, and household pests
5. Search intent: identification, inspection, treatment, removal, exclusion, prevention, recurring management, or commercial use case

## Page roles

- Home: defines the source context and exposes the primary entity clusters.
- Service hub: connects pest entities to treatment and inspection intents.
- National service page: explains the service entity, decision criteria, and related predicates.
- State hub: connects jurisdiction and locations without inventing local provider claims.
- City hub: connects one location to all relevant pest/service entities.
- City-service page: answers a single location plus service intent and links laterally only to contextually related services.

## Internal linking rules

- Parent-child links: home → service/state → city → city-service.
- Contextual bridges: service pages → locations; city pages → all services; city-service pages → same-category services.
- Every indexable page must be reachable through crawlable HTML links.
- Anchor text names the destination entity; generic “click here” anchors are avoided.
- Breadcrumbs reproduce the real hierarchy and match canonical URLs.

## Content rules

- Keep one dominant intent per URL.
- State what is known and avoid fabricated prices, reviews, addresses, response times, licenses, or guarantees.
- Distinguish pest identification, inspection, treatment, exclusion, and prevention.
- Add local material only when it is verifiable and useful: climate/seasonality, species relevance, state regulator, provider coverage, and original observations.
- Structured data must match visible page content.
- Do not index generated combinations that lack enough distinct value.

## Controlled indexing

- Index the home page, service hub, 69 national service pages, all jurisdiction hubs, priority city hubs, and a first batch of high-value priority city-service pages.
- Non-priority generated city and city-service URLs remain accessible and `follow`, but `noindex` until reviewed or enriched.
- Sitemap contains only canonical, indexable URLs.
- Expansion decisions use Search Console impressions, queries, crawl data, and lead quality—not URL volume alone.

## Entity and schema model

- `Organization` and `WebSite` describe Batys.
- `Service` describes visible pest-service content.
- `areaServed` identifies the visible city and state context.
- `BreadcrumbList` describes the actual navigational hierarchy.
- Do not emit `LocalBusiness`, ratings, reviews, telephone, physical address, or provider credentials until those facts exist and are visible.
