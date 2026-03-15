import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all paths except static files, api routes, and Next.js internals
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
