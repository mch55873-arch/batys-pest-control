import database from '@/data/usa_database.json';
import services from '@/data/services.json';
import { HIGH_VALUE_SERVICE_SLUGS, PRIORITY_CITY_KEYS } from './site';

export type City = { slug: string; name: string };
export type State = { code: string; name: string; slug: string; cities: City[] };
export type Service = (typeof services)[number];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const statesFromDatabase: State[] = database.states.map((state) => ({
  code: state.code.toLowerCase(),
  name: state.name,
  slug: slugify(state.name),
  cities: state.cities.map((city) => ({ slug: city.slug, name: city.name })),
}));

export const states: State[] = [
  ...statesFromDatabase,
  {
    code: 'dc',
    name: 'District of Columbia',
    slug: 'district-of-columbia',
    cities: [{ slug: 'washington', name: 'Washington' }],
  },
].sort((a, b) => a.name.localeCompare(b.name));

export const pestServices: Service[] = services;

export function findState(value: string) {
  const normalized = value.toLowerCase();
  return states.find((state) => state.slug === normalized || state.code === normalized);
}

export function findCity(state: State, citySlug: string) {
  return state.cities.find((city) => city.slug === citySlug.toLowerCase());
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

export function isPriorityCity(state: State, city: City) {
  return PRIORITY_CITY_KEYS.has(`${state.code}/${city.slug}`);
}

export function isIndexableCityService(state: State, city: City, service: Service) {
  return isPriorityCity(state, city) && HIGH_VALUE_SERVICE_SLUGS.has(service.slug);
}
