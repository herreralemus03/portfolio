import Link from "next/link";

const demos = [
  {
    slug: "debit-card",
    title: "Debit Card Generator",
    description:
      "Tarjeta interactiva con efecto 3D, glare en tiempo real, detección automática de marca, validación Luhn y exportación como imagen.",
    tags: ["Canvas", "3D CSS", "Animation", "TypeScript"],
  },
  {
    slug: "skeleton-search",
    title: "Skeleton Search UI",
    description:
      "Interfaz de búsqueda con diseño neumórfico, skeleton loaders con shimmer animado y simulación de fetch asíncrono.",
    tags: ["Neumorphism", "Skeleton", "UX Pattern"],
  },
];

const stack = ["Java", "Go", "Flutter", "Next.js", "React", "TypeScript", "Docker"];

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--md-surface)" }}>
      <main style={{ maxWidth: 600, margin: "0 auto", padding: "72px 24px 64px" }}>

        {/* ── Hero ─────────────────────────────────────────── */}
        <section style={{ marginBottom: 64 }}>
          <p className="md-label-lg" style={{ color: "var(--md-on-surface-variant)", marginBottom: 8 }}>
            Hola, soy
          </p>
          <h1 className="md-display-sm" style={{ color: "var(--md-on-surface)", marginBottom: 12 }}>
            Fernando<br />Herrera
          </h1>
          <p className="md-title-lg" style={{ color: "var(--md-on-surface-variant)", marginBottom: 32 }}>
            Full Stack Developer
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <a
              href="https://github.com/Klerith"
              target="_blank"
              rel="noopener noreferrer"
              className="md-btn-filled"
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
            <a href="mailto:herreralemus.03@gmail.com" className="md-btn-outlined">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              Contacto
            </a>
          </div>
        </section>

        <hr className="md-divider" style={{ marginBottom: 48 }} />

        {/* ── Stack ────────────────────────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <p
            className="md-label-md"
            style={{ color: "var(--md-on-surface-variant)", marginBottom: 16, textTransform: "uppercase" }}
          >
            Stack
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {stack.map((tech) => (
              <span key={tech} className="md-chip">{tech}</span>
            ))}
          </div>
        </section>

        <hr className="md-divider" style={{ marginBottom: 48 }} />

        {/* ── Demos ────────────────────────────────────────── */}
        <section>
          <p
            className="md-label-md"
            style={{ color: "var(--md-on-surface-variant)", marginBottom: 16, textTransform: "uppercase" }}
          >
            Component Demos
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {demos.map((demo) => (
              <Link key={demo.slug} href={`/demos/${demo.slug}/`} className="md-card">
                <div style={{ padding: "20px 20px 12px" }}>
                  <h3 className="md-title-md" style={{ color: "var(--md-on-surface)", marginBottom: 8 }}>
                    {demo.title}
                  </h3>
                  <p className="md-body-md" style={{ color: "var(--md-on-surface-variant)", marginBottom: 16 }}>
                    {demo.description}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
                    {demo.tags.map((tag) => (
                      <span key={tag} className="md-chip" style={{ height: 28, fontSize: 12 }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <hr className="md-divider" />
                <div style={{ padding: "4px 8px 4px" }}>
                  <span className="md-btn-text" style={{ pointerEvents: "none" }}>
                    Ver demo
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────────── */}
        <footer style={{ marginTop: 80, paddingTop: 24, borderTop: "1px solid var(--md-outline-variant)" }}>
          <p className="md-body-md" style={{ color: "var(--md-on-surface-variant)", textAlign: "center" }}>
            Fernando Herrera · {new Date().getFullYear()}
          </p>
        </footer>
      </main>
    </div>
  );
}
