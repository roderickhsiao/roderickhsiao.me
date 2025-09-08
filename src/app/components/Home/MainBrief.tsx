import summary from '@/app/data/summary';
import contact from '@/app/data/contact';
import Image from 'next/image';

// DRY function to get icon configuration (same as Contact component)
const getIconConfig = (name: string) => {
  const lowerName = name.toLowerCase();

  if (lowerName.includes('email')) {
    return {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      path: 'M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207',
    };
  }

  if (lowerName.includes('linkedin')) {
    return {
      viewBox: '0 0 24 24',
      fill: 'currentColor',
      stroke: 'none',
      path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    };
  }

  if (lowerName.includes('𝕏')) {
    return {
      viewBox: '0 0 24 24',
      fill: 'currentColor',
      stroke: 'none',
      path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
    };
  }

  if (lowerName.includes('github')) {
    return {
      viewBox: '0 0 24 24',
      fill: 'currentColor',
      stroke: 'none',
      path: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
    };
  }

  if (lowerName.includes('medium')) {
    return {
      viewBox: '0 0 24 24',
      fill: 'currentColor',
      stroke: 'none',
      path: 'M24 16.5v2.18c-.14.01-.28.02-.43.02-2.58 0-4.47-2.16-4.64-4.85 0-.1 0-.21.01-.31 0-.06.01-.13.01-.19 0-.03 0-.07.01-.1 0-.04 0-.07.01-.11.09-1.19.51-2.29 1.11-3.16.39-.48.85-.86 1.41-1.11.48-.24.1-.35 1.66-.35h.02c.1 0 .2 0 .3.01v.6c-.11-.03-.22-.05-.34-.06-1.09.02-1.85 1.32-1.93 3.11H24v.51h-2.21s0 0 0 0c-.1 1.76.87 3.15 2.21 3.65zM19.6 5.74l.02 0v-.15H15.73L12.15 14.03 8.57 5.59H4.41v.15l.02 0c.71.16 1.09.5 1.09 1.4v10.02c0 .9-.37 1.24-1.08 1.4l-.02 0v.15h2.83v-.15l-.02 0c-.71-.16-1.09-.5-1.09-1.4V7.56L11.04 18.4h.26l4.74-11.15v10.01c-.06.68-.37.91-.96 1.04l-.02 0v.15h4.92v-.15l-.02 0c-.64-.13-.98-.36-1.04-1.04l-.03-10.26h.03c0-.9.36-1.24 1.06-1.4z',
    };
  }

  // Default link icon
  return {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    path: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
  };
};

export default function MainBrief() {
  const { profile } = summary;
  return (
    <section className="relative w-full bg-gradient-to-br from-slate-50 via-stone-50/60 to-slate-100/80 text-slate-800 p-4 sm:p-6 lg:p-8 overflow-hidden rounded-lg border border-slate-200/50 shadow-sm order-1 lg:order-2">
      {/* Background gradients - optimized for smaller width */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-50/30 via-slate-50/20 to-stone-100/40 rounded-lg"></div>
      
      {/* Simplified moving spotlights for smaller container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Spotlight 1 - smaller and optimized for narrow width */}
        <div className="absolute w-32 h-32 sm:w-40 sm:h-40 bg-emerald-600/8 rounded-full blur-2xl animate-move-horizontal-small top-[10%]"></div>
        {/* Spotlight 2 - reduced size */}
        <div className="absolute w-24 h-24 sm:w-32 sm:h-32 bg-green-600/6 rounded-full blur-2xl animate-move-vertical-small right-[10%]"></div>
      </div>
      
      <div className="relative z-10">
        {/* Magazine Style Header - optimized for right rail */}
        <div className="flex items-start gap-3">
          {/* Clean Profile Image - smaller for right rail */}
          <div className="relative shrink-0">
            <Image
              src={profile.thumbnail.url}
              width={100}
              height={120}
              alt="Profile"
              className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-lg shadow-lg"
            />
            {/* Simple accent */}
            <div className="absolute -bottom-0.5 -end-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-primary rounded-full"></div>
          </div>
          
          {/* Content - more compact */}
          <div className="flex-1 space-y-1 min-w-0">
            <div className="space-y-0.5">
              <h1 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                {profile.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-700 font-medium">
                {profile.title}
              </p>
              <div className="flex items-center gap-1 text-slate-600">
                <svg className="w-2.5 h-2.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <p className="text-xs truncate">
                  {profile.location}
                </p>
              </div>

              {/* Social Media Links - accessible touch targets */}
              <div className="flex gap-1.5 mt-1">
                {contact.filter(item => !item.name.toLowerCase().includes('calendly')).slice(0, 4).map((item, idx) => {
                  const iconConfig = getIconConfig(item.name);
                  return (
                    <a
                      key={idx}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center size-8 bg-slate-100/80 border border-slate-200/40 rounded-full hover:bg-slate-200/80 hover:border-slate-300/50 transition-all duration-200 group"
                      aria-label={`Visit ${item.name} profile`}
                      title={`Visit my ${item.name} profile`}
                    >
                      <svg
                        className="w-4 h-4 text-slate-600 group-hover:text-slate-700 transition-colors duration-200"
                        fill={iconConfig.fill}
                        stroke={iconConfig.stroke}
                        viewBox={iconConfig.viewBox}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={iconConfig.stroke === 'currentColor' ? 1.5 : undefined}
                          d={iconConfig.path}
                        />
                      </svg>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Professional Summary - more compact */}
        <div className="mt-2 sm:mt-3">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {profile.brief}
          </p>
        </div>

        {/* Expertise with magazine styling - optimized for narrow width */}
        <div className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2">
          <h2 className="text-sm sm:text-base font-bold text-slate-900">
            Expertise
          </h2>
          
          {/* Compact highlighted tags - optimized for right rail */}
          <div className="flex flex-wrap gap-1 sm:gap-1.5">
            {profile.summary.map((item, i) => (
              <span 
                key={i} 
                className="inline-block px-1.5 py-0.5 sm:px-2 sm:py-1 bg-slate-100/80 border border-slate-200/40 text-slate-800 text-xs font-medium rounded-full hover:bg-slate-200/80 hover:border-slate-300/50 transition-all duration-200"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
