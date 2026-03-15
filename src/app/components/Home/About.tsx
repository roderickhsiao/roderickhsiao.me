import about from "@/app/data/about";

export default function About() {
  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg sm:text-xl font-bold mb-1 text-[var(--gaudi-ink)] tracking-[-0.02em] text-balance">Tech Stack</h3>
        <p className="text-[var(--color-muted)] text-sm leading-relaxed">
          Built with modern web technologies for optimal performance and developer experience.
        </p>
      </div>

      {/* Tech Stack List */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {about.map((tech, idx) => (
            <a
              key={idx}
              href={tech.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:text-[var(--gaudi-terracotta)] border-[var(--ds-border-pill)] [background:var(--gaudi-pill-bg)] rounded-full text-[rgb(45_37_26_/_0.92)]"
            >
              {tech.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
