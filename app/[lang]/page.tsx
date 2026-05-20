import Link from "next/link";
import { getDictionary } from "@/lib/i18n";
import { DemoSection } from "@/app/components/DemoSection";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(lang);
  return { title: t.meta.title, description: t.meta.description };
}

const stack = ["Java", "Go", "Flutter", "Next.js", "React", "TypeScript", "Docker", "Spring Boot", "AWS"];

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(lang);
  const MAX_YEARS = 5;

  return (
    <div style={{ minHeight: "100vh", background: "var(--md-surface)" }}>

      {/* ── Top bar ───────────────────────────────────────── */}
      <header style={{
        height: 56,
        background: "var(--md-surface-container)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <span style={{ fontSize: 18, fontWeight: 600, color: "var(--md-primary)", letterSpacing: 1 }}>
          {t.topBar.brand}
        </span>
        <Link
          href={`/${t.langTarget}/`}
          className="md-btn-text"
          style={{ height: 32, padding: "0 12px", fontSize: 13 }}
        >
          {t.langSwitch}
        </Link>
      </header>

      <main style={{ maxWidth: 680, margin: "0 auto", padding: "64px 24px 80px" }}>

        {/* ── Hero ────────────────────────────────────────── */}
        <section style={{ marginBottom: 56 }}>
          <h1 style={{
            fontSize: 52,
            fontWeight: 700,
            color: "var(--md-primary)",
            letterSpacing: -1,
            marginBottom: 8,
            lineHeight: 1.1,
          }}>
            hlstudios
          </h1>
          <p className="md-title-lg" style={{ color: "var(--md-on-surface-variant)", marginBottom: 32 }}>
            {t.hero.tagline}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <a href="https://github.com/herreralemus03" target="_blank" rel="noopener noreferrer" className="md-btn-filled">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              {t.hero.github}
            </a>
            <a href="mailto:herreralemus.03@gmail.com" className="md-btn-outlined">
              {t.hero.contact}
            </a>
          </div>
        </section>

        <hr className="md-divider" style={{ marginBottom: 48 }} />

        {/* ── Stack ───────────────────────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <p className="md-label-md" style={{ color: "var(--md-on-surface-variant)", textTransform: "uppercase", marginBottom: 16 }}>
            {t.sections.stack}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {stack.map((s) => <span key={s} className="md-chip">{s}</span>)}
          </div>
        </section>

        <hr className="md-divider" style={{ marginBottom: 48 }} />

        {/* ── Demos ───────────────────────────────────────── */}
        <section style={{ marginBottom: 64 }}>
          <p className="md-label-md" style={{ color: "var(--md-on-surface-variant)", textTransform: "uppercase", marginBottom: 16 }}>
            {t.sections.demos}
          </p>
          <DemoSection demos={t.demos} lang={lang} />
        </section>

        <hr className="md-divider" style={{ marginBottom: 48 }} />

        {/* ════════════════════════════════════════════════
            ABOUT THE AUTHOR (secondary section)
        ════════════════════════════════════════════════ */}
        <section id="about">
          <p className="md-label-md" style={{ color: "var(--md-on-surface-variant)", textTransform: "uppercase", marginBottom: 24 }}>
            {t.sections.about}
          </p>

          {/* Profile card */}
          <div style={{
            background: "var(--md-surface-container)",
            borderRadius: 12,
            padding: 24,
            marginBottom: 40,
            display: "flex",
            gap: 20,
            flexWrap: "wrap",
          }}>
            {/* Avatar */}
            <div style={{
              width: 56, height: 56, borderRadius: 28, flexShrink: 0,
              background: "var(--md-primary-container)",
              color: "var(--md-on-primary-container)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, fontWeight: 700,
            }}>
              FH
            </div>

            <div style={{ flex: 1, minWidth: 200 }}>
              <h2 className="md-headline-sm" style={{ color: "var(--md-on-surface)", marginBottom: 2 }}>
                {t.about.name}
              </h2>
              <p className="md-body-md" style={{ color: "var(--md-primary)", marginBottom: 2 }}>
                {t.about.title}
              </p>
              <p className="md-body-md" style={{ color: "var(--md-on-surface-variant)", marginBottom: 12 }}>
                {t.about.degree}
              </p>
              <p className="md-body-md" style={{ color: "var(--md-on-surface-variant)", display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                {t.about.location}
              </p>
              <p className="md-body-md" style={{ color: "var(--md-on-surface-variant)", lineHeight: 1.7, marginBottom: 20 }}>
                {t.about.profile}
              </p>

              {/* Contact links */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                <a href={`mailto:${t.about.contact.email}`} className="md-chip" style={{ textDecoration: "none", gap: 6 }}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                  </svg>
                  {t.about.contact.email}
                </a>
                <a href={`https://github.com/${t.about.contact.github}`} target="_blank" rel="noopener noreferrer" className="md-chip" style={{ textDecoration: "none", gap: 6 }}>
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                  {t.about.contact.github}
                </a>
                <a href={`https://linkedin.com/in/${t.about.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="md-chip" style={{ textDecoration: "none", gap: 6 }}>
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
                <span className="md-chip" style={{ gap: 6 }}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
                  </svg>
                  {t.about.contact.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Experience */}
          <h3 className="md-title-md" style={{ color: "var(--md-on-surface)", marginBottom: 24 }}>
            {t.sections.experience}
          </h3>
          <div style={{ position: "relative", paddingLeft: 24, marginBottom: 48 }}>
            {/* Vertical timeline line */}
            <div style={{
              position: "absolute", left: 3, top: 8, bottom: 8,
              width: 2, background: "var(--md-outline-variant)",
            }} />
            {t.about.experience.map((exp, i) => (
              <div key={i} style={{ position: "relative", marginBottom: 28 }}>
                {/* Dot */}
                <div style={{
                  position: "absolute", left: -24, top: 6,
                  width: 10, height: 10, borderRadius: "50%",
                  background: "var(--md-primary)",
                  border: "2px solid var(--md-surface)",
                }} />
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 4, marginBottom: 2 }}>
                  <span className="md-title-sm" style={{ color: "var(--md-on-surface)" }}>{exp.company}</span>
                  <span className="md-label-md" style={{ color: "var(--md-primary)" }}>{exp.role}</span>
                </div>
                <p className="md-label-md" style={{ color: "var(--md-outline)", marginBottom: 6 }}>{exp.period}</p>
                <p className="md-body-md" style={{ color: "var(--md-on-surface-variant)", lineHeight: 1.6 }}>{exp.description}</p>
              </div>
            ))}
          </div>

          {/* Technical Skills */}
          <h3 className="md-title-md" style={{ color: "var(--md-on-surface)", marginBottom: 20 }}>
            {t.sections.technicalSkills}
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 48 }}>
            {t.about.technicalSkills.map((skill) => (
              <div key={skill.name}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span className="md-label-lg" style={{ color: "var(--md-on-surface)" }}>{skill.name}</span>
                  <span className="md-label-md" style={{ color: "var(--md-on-surface-variant)" }}>
                    {skill.years} {t.about.yearsLabel}
                  </span>
                </div>
                <div style={{ height: 4, borderRadius: 2, background: "var(--md-outline-variant)" }}>
                  <div style={{
                    height: 4, borderRadius: 2,
                    background: "var(--md-primary)",
                    width: `${(skill.years / MAX_YEARS) * 100}%`,
                    transition: "width .3s",
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Other Skills */}
          <h3 className="md-title-md" style={{ color: "var(--md-on-surface)", marginBottom: 16 }}>
            {t.sections.otherSkills}
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 48 }}>
            {t.about.otherSkills.map((s) => (
              <span key={s} className="md-chip" style={{ height: 28, fontSize: 12, padding: "0 12px" }}>{s}</span>
            ))}
          </div>

          {/* Personal Skills */}
          <h3 className="md-title-md" style={{ color: "var(--md-on-surface)", marginBottom: 16 }}>
            {t.sections.personalSkills}
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 48 }}>
            {t.about.personalSkills.map((s) => (
              <span key={s} className="md-chip">{s}</span>
            ))}
          </div>

          {/* Certifications */}
          <h3 className="md-title-md" style={{ color: "var(--md-on-surface)", marginBottom: 16 }}>
            {t.sections.certifications}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
            {t.about.certifications.map((cert) => (
              <div key={cert.name + cert.year} style={{
                background: "var(--md-surface-container)",
                borderRadius: 8,
                padding: "12px 16px",
              }}>
                <p className="md-title-sm" style={{ color: "var(--md-on-surface)", marginBottom: 2 }}>{cert.name}</p>
                <p className="md-label-md" style={{ color: "var(--md-on-surface-variant)" }}>{cert.issuer} · {cert.year}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Footer ──────────────────────────────────────── */}
        <footer style={{ marginTop: 80, paddingTop: 24, borderTop: "1px solid var(--md-outline-variant)", textAlign: "center" }}>
          <p className="md-body-md" style={{ color: "var(--md-on-surface-variant)" }}>
            {t.topBar.brand} · {t.footer.by} · {new Date().getFullYear()}
          </p>
        </footer>
      </main>
    </div>
  );
}
