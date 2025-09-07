export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative mt-16 overflow-hidden">
      {/* Forest floor/grass inspired background */}
      <div className="absolute inset-0">
        {/* Main forest floor gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/60 via-green-800 to-slate-800"></div>
        
        {/* Rich forest floor layers for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/40 via-green-900/50 to-slate-700"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/30 via-transparent to-green-800/60"></div>
        
        {/* Grass and nature elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          {/* Grass blades */}
          <div className="absolute top-0 left-1/6 w-0.5 h-8 bg-emerald-400 blur-sm transform rotate-12"></div>
          <div className="absolute top-2 left-1/5 w-0.5 h-6 bg-green-400 blur-sm transform -rotate-6"></div>
          <div className="absolute top-0 left-1/4 w-0.5 h-10 bg-teal-400 blur-sm transform rotate-3"></div>
          <div className="absolute top-1 right-1/4 w-0.5 h-7 bg-emerald-500 blur-sm transform rotate-15"></div>
          <div className="absolute top-3 right-1/3 w-0.5 h-5 bg-green-500 blur-sm transform -rotate-10"></div>
          <div className="absolute top-0 right-1/5 w-0.5 h-9 bg-teal-500 blur-sm transform rotate-8"></div>
          
          {/* Small decorative flowers/moss */}
          <div className="absolute bottom-8 left-1/6 w-2 h-2 bg-emerald-300 rounded-full blur-sm opacity-60"></div>
          <div className="absolute bottom-12 right-1/5 w-1.5 h-1.5 bg-green-300 rounded-full blur-sm opacity-50"></div>
          <div className="absolute bottom-6 left-2/3 w-1 h-1 bg-teal-300 rounded-full blur-sm opacity-70"></div>
        </div>
        
        {/* Elegant animal silhouettes */}
        <div className="absolute inset-0 opacity-15">
          {/* Small rabbit silhouette */}
          <div className="absolute bottom-16 left-1/4">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" className="text-emerald-300">
              <path d="M2 10c0-1 1-2 2-2s2 1 2 2M8 10c0-1 1-2 2-2s2 1 2 2M6 8c0-2 1-4 3-4s3 2 3 4M4 6c-1 0-2-1-2-2s1-2 2-2M12 6c1 0 2-1 2-2s-1-2-2-2" stroke="currentColor" strokeWidth="0.5" fill="currentColor" fillOpacity="0.3"/>
            </svg>
          </div>
          
          {/* Small butterfly */}
          <div className="absolute bottom-20 right-1/3">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="text-teal-300">
              <path d="M6 4c-2-2-4-1-4 1s2 3 4 1M6 4c2-2 4-1 4 1s-2 3-4 1M6 2v4" stroke="currentColor" strokeWidth="0.3" fill="currentColor" fillOpacity="0.2"/>
            </svg>
          </div>
          
          {/* Tiny mushroom */}
          <div className="absolute bottom-14 right-1/6">
            <svg width="8" height="10" viewBox="0 0 8 10" fill="none" className="text-green-400">
              <path d="M4 6c-2 0-3-1-3-3s1-3 3-3 3 1 3 3-1 3-3 3M4 6v4" stroke="currentColor" strokeWidth="0.4" fill="currentColor" fillOpacity="0.2"/>
            </svg>
          </div>
        </div>
        
        {/* Forest floor watermark */}
        <div className="absolute inset-0 opacity-8">
          <div className="absolute bottom-4 right-8 text-emerald-200/40 text-xs font-mono tracking-widest transform rotate-3 select-none">
            GROWN WITH ❤️ & �
          </div>
        </div>
      </div>

      {/* Footer content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-emerald-100/90">
            
            {/* Left section - Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-emerald-100">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <a 
                  href="https://github.com/roderickhsiao/roderickhsiao.me" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-emerald-200/80 hover:text-green-200 transition-colors duration-200"
                >
                  View Source Code
                </a>

                <div className="text-emerald-200/70 text-xs mt-4">
                  Built with Next.js, TypeScript & Tailwind CSS
                </div>
              </div>
            </div>

            {/* Right section - Site Info & Hidden Gem */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-emerald-100">Site Notes</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-emerald-200/70">
                  Optimized for performance & accessibility.
                </li>
                <li className="text-emerald-200/70">
                  Zero tracking, maximum privacy.
                </li>
                {/* Hidden humorous gem */}
                <li 
                  className="text-emerald-200/50 hover:text-green-200 cursor-help" 
                  title="🎉 You found the hidden gem! This site was built with an unhealthy amount of coffee, countless AI conversations, dog walks for debugging inspiration, and the occasional existential crisis about whether this div should be flexbox or grid. But hey, it works! 🤓"
                >
                  • No developers were harmed in the making of this site*.
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-emerald-200/30">
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-emerald-200/70">
              <div>
                © {currentYear} Roderick Hsiao • Made with 💙 in the Bay Area • Crafted in collaboration with AI ✨
              </div>
              <div className="mt-2 sm:mt-0">
                Open Web Advocate • House dancer • Animal lovers • Coffee Enthusiast
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
