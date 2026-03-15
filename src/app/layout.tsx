import type { ReactNode } from 'react';

// Root layout — required by Next.js App Router.
// All real pages live under [locale]/ which provides the html/body shell.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
