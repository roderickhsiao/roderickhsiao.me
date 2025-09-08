import clsx from 'clsx';
import { unstable_ViewTransition as ViewTransition } from 'react';

import Header from './Header';
import LandscapeSVG from './LandscapeSVG';
import SmokeCanvas from './SmokeCanvas';
import { navigationConfig } from '@/app/data/navigation';
import type { ReactNode } from 'react';

// Responsive, modern grid layout with elegant color tokens and parallax scrolling
export default function MainLayout({
  hero,
  main,
  rightRail,
  footer,
}: {
  header?: ReactNode;
  hero?: ReactNode;
  main: ReactNode;
  rightRail?: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="main-layout min-h-screen bg-neutral text-primary">
      <>
        <div className="w-full">
          <div className="relative w-full h-80 overflow-hidden">
            <LandscapeSVG />
            <SmokeCanvas />

            {/* Watermark text crafted into the forest */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Subtle forest watermark - Open Web Advocate */}
              <div className="absolute bottom-8 right-8 z-10 hidden sm:block">
                <div className="text-white/50 text-md font-light tracking-widest select-none">
                  <p className="drop-shadow-lg filter">OPEN WEB ADVOCATE</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={clsx('fixed start-0 end-0 z-50 top-0 mt-4')}>
          <div className="px-4 sm:px-6">
            <Header
              brandName={navigationConfig.brand.name}
              brandSubtitle={navigationConfig.brand.subtitle}
              links={navigationConfig.links}
            />
          </div>
        </div>
      </>

      <div className="relative isolate z-0">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4 sm:gap-8 lg:gap-12 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-6 pb-6 sm:pb-8">
          <main className="w-full bg-gradient-to-br from-slate-600/5 via-stone-100/60 to-emerald-800/8 p-4 sm:p-6 lg:p-8 order-1 lg:order-1 min-h-fit relative overflow-hidden rounded-lg shadow-sm border border-slate-200/50">
            {/* Subtle layered background */}
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/3 to-transparent rounded-lg"></div>
            <div className="text-slate-800 leading-relaxed space-y-4 sm:space-y-6">
              <ViewTransition>{main}</ViewTransition>
            </div>
          </main>
          <div className="w-full order-2 lg:order-2 lg:sticky lg:top-24 lg:bottom-0 self-start space-y-6 sm:space-y-8">
            {/* Hero Section at top of right rail */}
            {hero}

            {/* Right Rail Content */}
            {rightRail && (
              <ViewTransition>
                <aside className="w-full">
                  <div className="bg-gradient-to-b from-slate-200/90 via-slate-100/70 to-slate-50/40 p-4 sm:p-6 lg:p-8 relative overflow-hidden rounded-lg shadow-lg border border-slate-300/70">
                    {/* Enhanced darker gradient focused on top */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-300/50 via-slate-200/30 to-transparent rounded-lg"></div>
                    <div className="absolute top-0 start-0 end-0 h-1/2 bg-gradient-to-b from-slate-400/20 via-slate-300/15 to-transparent rounded-t-lg"></div>

                    {/* Stronger texture overlay at top */}
                    <div className="absolute inset-0 opacity-50">
                      <div className="absolute top-0 end-0 w-48 h-32 bg-gradient-to-bl from-slate-300/40 via-slate-200/25 to-transparent rounded-full transform translate-x-12 -translate-y-8"></div>
                      <div className="absolute top-0 start-0 w-32 h-24 bg-gradient-to-br from-slate-200/35 via-slate-100/20 to-transparent rounded-full transform -translate-x-8 -translate-y-4"></div>
                    </div>

                    <div className="relative z-10 text-slate-700 space-y-3 sm:space-y-4">
                      {rightRail}
                    </div>
                  </div>
                </aside>
              </ViewTransition>
            )}
          </div>
        </div>

        {footer && <div className="w-full">{footer}</div>}
      </div>
    </div>
  );
}
