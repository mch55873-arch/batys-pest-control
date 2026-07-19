import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // Get the subdomain by removing the base domain
  // e.g. 'dallas-tx.localhost:3000' -> 'dallas-tx'
  // e.g. 'dallas-tx.texassoilandpest.com' -> 'dallas-tx'
  
  const isLocalhost = hostname.includes('localhost');
  const baseDomain = isLocalhost ? 'localhost:3000' : 'batyspestcontrol.com';

  if (hostname !== baseDomain && hostname.endsWith(baseDomain)) {
    const subdomain = hostname.replace(`.${baseDomain}`, '');
    
    // Only rewrite if it's a valid subdomain format (not www)
    if (subdomain !== 'www' && subdomain.length > 0) {
      // Exclude global paths from being rewritten to subdomain folders
      const excludedPaths = ['/about', '/contact', '/blog'];
      const isExcluded = excludedPaths.some(p => url.pathname === p || url.pathname.startsWith(`${p}/`));
      
      if (!isExcluded) {
        // Rewrite to the dynamic subdomain route
        return NextResponse.rewrite(new URL(`/subdomain/${subdomain}${url.pathname}`, req.url));
      }
    }
  }

  return NextResponse.next();
}
