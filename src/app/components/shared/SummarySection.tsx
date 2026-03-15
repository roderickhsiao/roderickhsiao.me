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
    <section className="bg-surface/60 backdrop-blur-xl border border-ink/8 rounded-3xl p-6 sm:p-10 space-y-8">
      <header>
        <h2 className="type-heading-sm text-ink mb-3">{title}</h2>
        <p className="type-body">{description}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {summaryItems.map((item, index) => (
          <article
            key={index}
            className="p-5 sm:p-6 bg-surface/50 border border-ink/6 rounded-2xl space-y-3 hover:shadow-md transition-shadow duration-200"
          >
            <h3 className="type-label text-ink flex items-center gap-2">
              <span className="text-accent" aria-hidden>{item.icon}</span>
              {item.title}
            </h3>
            <ul className="space-y-2">
              {item.items.map((listItem, itemIndex) => (
                <li key={itemIndex} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" aria-hidden />
                  <span className="type-body-sm leading-relaxed">{listItem}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
