import Link from "next/link";

const demos = [
  {
    slug: "debit-card",
    title: "Debit Card Generator",
    description:
      "Tarjeta de crédito/débito interactiva con efecto 3D, glare en tiempo real, detección de marca, validación Luhn y exportación como imagen.",
    tags: ["Canvas", "3D CSS", "Animation", "TypeScript"],
    accent: "emerald",
  },
  {
    slug: "skeleton-search",
    title: "Skeleton Search UI",
    description:
      "Interfaz de búsqueda con diseño neumórfico, skeleton loaders con shimmer animado y simulación de fetch asíncrono.",
    tags: ["Neumorphism", "Skeleton", "UX Pattern"],
    accent: "violet",
  },
];

const stack = [
  "Java", "Go", "Flutter", "Next.js", "React", "TypeScript", "Docker",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 max-w-4xl mx-auto w-full">

      {/* Hero */}
      <section className="mb-24">
        <p className="text-emerald-400 text-sm font-mono mb-4 tracking-wider">
          Hola, soy
        </p>
        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4 tracking-tight leading-tight">
          Fernando<br />Herrera
        </h1>
        <p className="text-xl text-slate-400 mb-3 font-light">
          Full Stack Developer
        </p>
        <p className="text-sm text-slate-500 mb-10 font-mono tracking-wider">
          Java · Go · Flutter · Next.js
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com/Klerith"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-900 text-sm font-semibold hover:bg-slate-100 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>
          <a
            href="mailto:herreralemus.03@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-700 text-slate-300 text-sm font-medium hover:border-slate-500 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            Contacto
          </a>
        </div>
      </section>

      {/* Tech stack */}
      <section className="mb-24">
        <p className="text-xs uppercase tracking-widest text-slate-600 mb-5 font-mono">
          Stack
        </p>
        <div className="flex flex-wrap gap-2">
          {stack.map((tech) => (
            <span
              key={tech}
              className="text-sm px-3.5 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Demos */}
      <section>
        <p className="text-xs uppercase tracking-widest text-slate-600 mb-8 font-mono">
          Component Demos
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          {demos.map((demo) => (
            <Link
              key={demo.slug}
              href={`/demos/${demo.slug}/`}
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-slate-600 hover:bg-slate-800/80 transition-all duration-200"
            >
              <h3 className="text-base font-semibold text-white mb-2">
                {demo.title}
              </h3>
              <p className="text-sm text-slate-400 mb-5 leading-relaxed">
                {demo.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {demo.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 group-hover:border-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-mono group-hover:gap-2 transition-all">
                Ver demo <span className="translate-x-0 group-hover:translate-x-1 transition-transform inline-block">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-32 pt-8 border-t border-slate-800 text-slate-600 text-xs font-mono text-center">
        Fernando Herrera · {new Date().getFullYear()}
      </footer>
    </main>
  );
}
