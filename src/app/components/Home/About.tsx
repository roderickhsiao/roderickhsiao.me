import about from "@/app/data/about";

export default function About() {
  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Tech Stack</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
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
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 rounded-full transition-all duration-200 border border-gray-200 hover:border-gray-300"
            >
              {tech.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
