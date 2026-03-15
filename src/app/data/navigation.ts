// Navigation configuration for the header component
// Text labels live in en.json under the 'nav' namespace
export interface NavigationLink {
  href: string;
  /** Translation key within the 'nav' namespace (e.g. 'about', 'travel') */
  key: string;
}

export interface NavigationConfig {
  links: NavigationLink[];
}

export const navigationConfig: NavigationConfig = {
  links: [
    { href: '/', key: 'about' },
    { href: '/activity', key: 'activity' },
    { href: '/projects', key: 'projects' },
    { href: '/travel', key: 'travel' },
    { href: '/education', key: 'education' },
  ],
};

export default navigationConfig;
