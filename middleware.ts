import { NextRequest, NextResponse } from 'next/server';

const DOMAIN = 'batyspestcontrol.com';
const STATE_SLUGS = [
  'district-of-columbia', 'new-hampshire', 'north-carolina', 'north-dakota',
  'rhode-island', 'south-carolina', 'south-dakota', 'west-virginia',
  'massachusetts', 'pennsylvania', 'connecticut', 'new-jersey', 'new-mexico',
  'new-york', 'california', 'mississippi', 'tennessee', 'washington',
  'wisconsin', 'alabama', 'arkansas', 'colorado', 'delaware', 'florida',
  'georgia', 'illinois', 'indiana', 'kentucky', 'louisiana', 'maryland',
  'michigan', 'minnesota', 'missouri', 'montana', 'nebraska', 'oklahoma',
  'virginia', 'wyoming', 'arizona', 'hawaii', 'idaho', 'kansas', 'maine',
  'nevada', 'ohio', 'oregon', 'texas', 'utah', 'vermont', 'alaska', 'iowa',
] as const;

const STATE_SET = new Set<string>(STATE_SLUGS);

function locationFromSubdomain(subdomain: string) {
  if (STATE_SET.has(subdomain)) return { state: subdomain };
  const state = STATE_SLUGS.find((slug) => subdomain.endsWith(`-${slug}`));
  if (!state) return null;
  const city = subdomain.slice(0, -(state.length + 1));
  return city ? { state, city } : null;
}

function isAsset(pathname: string) {
  return pathname.startsWith('/_next/') || pathname.startsWith('/cdn-cgi/') || /\.[a-z0-9]{2,8}$/i.test(pathname);
}

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host')?.split(':')[0].toLowerCase() ?? '';
  if (hostname !== DOMAIN && !hostname.endsWith(`.${DOMAIN}`)) return NextResponse.next();

  const subdomain = hostname === DOMAIN ? '' : hostname.slice(0, -(DOMAIN.length + 1));

  if (subdomain === 'www') {
    url.hostname = DOMAIN;
    url.port = '';
    return NextResponse.redirect(url, 308);
  }

  if (!subdomain) {
    const segments = url.pathname.split('/').filter(Boolean);
    const state = segments[0];
    if (!state || !STATE_SET.has(state)) return NextResponse.next();

    const city = segments[1];
    const canonicalHost = city ? `${city}-${state}.${DOMAIN}` : `${state}.${DOMAIN}`;
    url.hostname = canonicalHost;
    url.port = '';
    url.pathname = city ? `/${segments.slice(2).join('/')}` : '/';
    return NextResponse.redirect(url, 308);
  }

  if (isAsset(url.pathname)) return NextResponse.next();
  if (url.pathname === '/robots.txt' || url.pathname === '/sitemap.xml') {
    url.hostname = DOMAIN;
    return NextResponse.redirect(url, 308);
  }

  const location = locationFromSubdomain(subdomain);
  if (!location) return NextResponse.next();

  const suffix = url.pathname === '/' ? '' : url.pathname;
  url.pathname = location.city
    ? `/${location.state}/${location.city}${suffix}`
    : `/${location.state}${suffix}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
