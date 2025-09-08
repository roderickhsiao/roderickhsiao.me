interface SummaryItem {
  title: string;
  icon: React.ReactNode;
  items: string[];
}

interface SummarySectionProps {
  title: string;
  description: string;
  summaryItems: SummaryItem[];
}

export default function SummarySection({ title, description, summaryItems }: SummarySectionProps) {
  return (
    <section className="bg-gradient-to-br from-slate-50/80 via-white/90 to-slate-100/50 p-4 sm:p-6 rounded-xl border border-slate-200/60 shadow-sm space-y-5 relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 end-0 w-32 h-32 bg-gradient-to-bl from-slate-200/30 via-slate-100/20 to-transparent rounded-full transform translate-x-8 -translate-y-8"></div>
      <div className="absolute bottom-0 start-0 w-24 h-24 bg-gradient-to-tr from-slate-100/40 via-slate-50/30 to-transparent rounded-full transform -translate-x-6 translate-y-6"></div>
      
      <header className="relative">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 leading-tight">
          {title}
        </h1>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
          {description}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 relative">
        {summaryItems.map((item, index) => (
          <article key={index} className="space-y-3">
            <h2 className="text-sm sm:text-base font-semibold text-slate-800 flex items-center gap-2">
              <span className="text-slate-600">{item.icon}</span>
              {item.title}
            </h2>
            <ul className="text-xs sm:text-sm text-slate-600 space-y-1.5 ml-0 list-none">
              {item.items.map((listItem, itemIndex) => (
                <li key={itemIndex} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 shrink-0"></span>
                  <span className="leading-relaxed">{listItem}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
