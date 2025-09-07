export default function Contact() {
  return (
    <div className="w-full mx-auto relative aspect-[1.587/1]">
      {/* Enhanced Background for Better Contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/5 via-slate-800/8 to-slate-900/10 rounded-xl blur-2xl scale-110"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/15 via-green-50/10 to-teal-100/15 rounded-xl blur-xl scale-105"></div>

      {/* Glossy Glass Card Container */}
      <div
        className="relative w-full h-full rounded-xl overflow-hidden shadow-xl border border-white/30 flex flex-col"
        style={{
          background: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          boxShadow:
            '0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
        }}
      >
        {/* RH Logo - Absolute positioned to edge */}
        <div className="absolute top-0 start-0 mt-3 sm:mt-4 md:mt-5 lg:mt-6 ml-3 sm:ml-4 md:ml-5 lg:ml-6">
          <div className="text-white/70 text-4xl lg:text-5xl font-bold tracking-wider">
            RH
          </div>
        </div>

        {/* Header Section - Flex Layout */}
        <div className="flex justify-end p-3 sm:p-4 md:p-5 lg:p-6">
          <a
            href="https://calendly.com/roderickhsiao/30-mins"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-gray-700 text-xs sm:text-xs md:text-sm font-semibold px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full transition-all duration-300 hover:scale-105 hover:text-gray-800 hover:shadow-md backdrop-blur-sm border border-white/30"
            style={{
              background: 'rgba(255, 255, 255, 0.3)',
            }}
          >
            BOOK SESSION
          </a>
        </div>

        {/* Main Content Area - Flex Grow */}
        <div className="flex-1 flex flex-col justify-end">
          {/* Bottom Content Container */}
          <div className="p-3 sm:p-4 md:p-5 lg:p-6 space-y-3 sm:space-y-4 md:space-y-5">
            {/* Welcome Message */}
            <div>
              <p className="text-gray-600 text-sm sm:text-xs md:text-sm leading-relaxed font-normal">
                Hey, thanks for visiting! Drop me a message to discuss web
                ideas, questions, or potentially fun projects to work together.
              </p>
            </div>

            {/* Languages */}
            <div className="flex gap-2">
              <span className="inline-flex items-center px-2 py-1 text-xs sm:text-[10px] md:text-xs font-medium text-gray-600 bg-white/40 rounded-full border border-white/30">
                🇺🇸 English
              </span>
              <span className="inline-flex items-center px-2 py-1 text-xs sm:text-[10px] md:text-xs font-medium text-gray-600 bg-white/40 rounded-full border border-white/30">
                🇹🇼 Mandarin
              </span>
            </div>
          </div>
        </div>

        {/* Glass reflection overlay */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/8 via-transparent to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}
