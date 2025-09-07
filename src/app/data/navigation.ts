// Navigation configuration for the header component
export interface NavigationLink {
  href: string;
  label: string;
  isButton?: boolean;
}

export interface NavigationConfig {
  brand: {
    name: string;
    subtitle: string;
  };
  links: NavigationLink[];
}

export const navigationConfig: NavigationConfig = {
  brand: {
    name: "Roderick Hsiao",
    subtitle: "Frontend Engineer & Architect"
  },
  links: [
    { href: "/", label: "About" },
    { href: "/education", label: "Education" },
    { href: "/activity", label: "Activity" },
    { href: "/travel", label: "Travel" }
  ]
};

export default navigationConfig;
