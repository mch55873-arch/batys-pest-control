import database from '@/data/usa_locations.json';
import services from '@/data/services.json';
import { HIGH_VALUE_SERVICE_SLUGS, PRIORITY_CITY_KEYS } from './site';
import { SITE } from './site';

export type City = { slug: string; name: string };
export type State = { code: string; name: string; slug: string; cities: [string, string][] };
export type Service = (typeof services)[number];

// This compact, pre-normalized dataset avoids allocating tens of thousands of
// duplicate city objects during every Cloudflare Worker cold start.
export const states = database.states as State[];

export const pestServices: Service[] = services;

export function findState(value: string) {
  const normalized = value.toLowerCase();
  return states.find((state) => state.slug === normalized || state.code === normalized);
}

export function findCity(state: State, citySlug: string) {
  const found = state.cities.find(([slug]) => slug === citySlug.toLowerCase());
  return found ? { slug: found[0], name: found[1] } : undefined;
}

export function citiesForState(state: State): City[] {
  return state.cities.map(([slug, name]) => ({ slug, name }));
}

export function findService(serviceSlug: string) {
  return pestServices.find((service) => service.slug === serviceSlug.toLowerCase());
}

export function statePath(state: State) {
  return `/${state.slug}`;
}

export function cityPath(state: State, city: City) {
  return `${statePath(state)}/${city.slug}`;
}

export function cityServicePath(state: State, city: City, service: Service) {
  return `${cityPath(state, city)}/${service.slug}`;
}

export function stateUrl(state: State) {
  return `https://${state.slug}.${SITE.domain}/`;
}

export function citySubdomain(state: State, city: City) {
  return `${city.slug}-${state.slug}`;
}

export function cityUrl(state: State, city: City) {
  return `https://${citySubdomain(state, city)}.${SITE.domain}/`;
}

export function cityServiceUrl(state: State, city: City, service: Service) {
  return `${cityUrl(state, city)}${service.slug}`;
}

export function isPriorityCity(state: State, city: City) {
  return PRIORITY_CITY_KEYS.has(`${state.code}/${city.slug}`);
}

export function isIndexableCityService(state: State, city: City, service: Service) {
  return isPriorityCity(state, city) && HIGH_VALUE_SERVICE_SLUGS.has(service.slug);
}
