'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationLink {
  href: string;
  label: string;
  isButton?: boolean;
}

interface HeaderProps {
  brandName: string;
  brandSubtitle: string;
  links: NavigationLink[];
}

const getGlassStyles = (isActive: boolean, isButton: boolean) => {
  if (isButton) {
    return {
      backgroundColor: 'color-mix(in srgb, #bbbbbc 20%, transparent)',
      boxShadow: `
        inset 0 0 0 1px color-mix(in srgb, #fff 10%, transparent),
        inset 2px 1px 0px -1px color-mix(in srgb, #fff 90%, transparent),
        inset -1.5px -1px 0px -1px color-mix(in srgb, #fff 80%, transparent),
        inset -2px -6px 1px -5px color-mix(in srgb, #fff 60%, transparent),
        inset -1px 2px 3px -1px color-mix(in srgb, #000 20%, transparent),
        inset 0px -4px 1px -2px color-mix(in srgb, #000 10%, transparent),
        0px 3px 6px 0px color-mix(in srgb, #000 8%, transparent)
      `,
    };
  }

  return {
    backgroundColor: isActive
      ? 'color-mix(in srgb, #bbbbbc 25%, transparent)'
      : 'transparent',
  };
};

const headerGlassStyles = {
  backgroundColor: 'color-mix(in srgb, #bbbbbc 12%, transparent)',
  backdropFilter: 'blur(8px) saturate(150%)',
  WebkitBackdropFilter: 'blur(8px) saturate(150%)',
  boxShadow: `
    inset 0 0 0 1px color-mix(in srgb, #fff 10%, transparent),
    inset 1.8px 3px 0px -2px color-mix(in srgb, #fff 90%, transparent),
    inset -2px -2px 0px -2px color-mix(in srgb, #fff 80%, transparent),
    inset -3px -8px 1px -6px color-mix(in srgb, #fff 60%, transparent),
    inset -0.3px -1px 4px 0px color-mix(in srgb, #000 12%, transparent),
    inset -1.5px 2.5px 0px -2px color-mix(in srgb, #000 20%, transparent),
    inset 0px 3px 4px -2px color-mix(in srgb, #000 20%, transparent),
    inset 2px -6.5px 1px -4px color-mix(in srgb, #000 10%, transparent),
    0px 1px 5px 0px color-mix(in srgb, #000 10%, transparent),
    0px 6px 16px 0px color-mix(in srgb, #000 8%, transparent)
  `,
  transition:
    'background-color 400ms cubic-bezier(1, 0, 0.4, 1), box-shadow 400ms cubic-bezier(1, 0, 0.4, 1)',
};

export default function Header({
  brandName,
  brandSubtitle,
  links,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header
      className="relative rounded-2xl md:rounded-full overflow-hidden"
      style={headerGlassStyles}
    >
      {/* Content with proper text color */}
      <div className="relative">
        <nav
          className="flex items-center justify-between px-4 py-3"
          role="navigation"
          aria-label="Main Navigation"
        >
          {/* Logo and Title Section */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="font-bold text-sm text-gray-800 transition-colors duration-200 hover:text-gray-600"
            >
              {brandName}
            </Link>
            <div className="hidden sm:block w-px h-4 bg-gray-600/50"></div>
            <span className="hidden sm:block text-xs font-medium text-gray-700">
              {brandSubtitle}
            </span>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 text-gray-800 hover:text-blue-600"
                  style={getGlassStyles(isActive(link.href), false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md transition-all duration-200 text-gray-800 hover:text-blue-600"
            style={{
              backgroundColor: 'color-mix(in srgb, #bbbbbc 15%, transparent)',
            }}
            aria-label="Toggle mobile menu"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden rounded-b-lg mt-1"
            style={headerGlassStyles}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {links.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className="block px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 text-gray-800 hover:text-blue-600"
                    style={getGlassStyles(isActive(link.href), false)}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
