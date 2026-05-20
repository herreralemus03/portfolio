import { getDictionary } from "@/lib/i18n";
import { AppBar }        from "@/app/components/AppBar";
import { CompanyLogos }  from "@/app/components/CompanyLogos";
import { SidebarDemos }  from "@/app/components/SidebarDemos";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(lang);
  return { title: t.meta.title, description: t.meta.description };
}

const MAX_YEARS = 5;

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(lang);

  return (
    <div id="top" style={{ minHeight: "100vh", background: "var(--md-surface)" }}>
      <AppBar lang={lang} t={t} />

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section style={{
        minHeight: "88vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px 24px 60px",
        maxWidth: 800,
        margin: "0 auto",
      }}>
        {/* Brand label */}
        <p className="md-label-md animate-fade-up" style={{
          color: "var(--md-primary)", textTransform: "uppercase",
          letterSpacing: 3, marginBottom: 20,
        }}>
          {t.brand}
        </p>

        {/* Main headline */}
        <h1 className="animate-fade-up" style={{
          fontSize: "clamp(40px, 7vw, 72px)",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-1.5px",
          marginBottom: 24,
          animationDelay: ".05s",
          whiteSpace: "pre-line",
        }}>
          <span className="gradient-text">{t.hero.headline}</span>
        </h1>

        {/* Sub */}
        <p className="md-body-lg animate-fade-up" style={{
          color: "var(--md-on-surface-variant)",
          maxWidth: 560,
          lineHeight: 1.7,
          marginBottom: 32,
          animationDelay: ".1s",
        }}>
          {t.hero.sub}
        </p>

        {/* Key skill chips */}
        <div className="animate-fade-up" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40, animationDelay: ".15s" }}>
          {t.hero.keySkills.map((skill) => (
            <span key={skill} className="md-chip" style={{ borderColor: "var(--md-primary-container)", color: "var(--md-on-primary-container)", background: "color-mix(in srgb, var(--md-primary-container) 20%, transparent)" }}>
              {skill}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="animate-fade-up" style={{ display: "flex", flexWrap: "wrap", gap: 12, animationDelay: ".2s" }}>
          <a href="#showcase" className="md-btn-filled" style={{ height: 48, padding: "0 28px", fontSize: 15 }}>
            {t.hero.cta1}
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"/>
            </svg>
          </a>
          <a href="mailto:herreralemus.03@gmail.com" className="md-btn-outlined" style={{ height: 48, padding: "0 28px", fontSize: 15 }}>
            {t.hero.cta2}
          </a>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          EXPERIENCE — Company logos
      ══════════════════════════════════════════════════════ */}
      <section id="experience" style={{ padding: "72px 24px", maxWidth: 900, margin: "0 auto" }}>
        <hr className="md-divider" style={{ marginBottom: 48 }} />
        <p className="md-label-md" style={{ color: "var(--md-on-surface-variant)", textTransform: "uppercase", marginBottom: 8 }}>
          {t.sections.clients}
        </p>
        <CompanyLogos sub={t.sections.clientsSub} />
      </section>

      {/* ══════════════════════════════════════════════════════
          COMPONENT SHOWCASE — Sidebar layout
      ══════════════════════════════════════════════════════ */}
      <section id="showcase" style={{ padding: "72px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <hr className="md-divider" style={{ marginBottom: 48 }} />
        <div style={{ marginBottom: 24 }}>
          <p className="md-label-md" style={{ color: "var(--md-on-surface-variant)", textTransform: "uppercase", marginBottom: 6 }}>
            {t.sections.showcase}
          </p>
          <p className="md-body-md" style={{ color: "var(--md-on-surface-variant)" }}>
            {t.sections.showcaseSub}
          </p>
        </div>
        <SidebarDemos demos={t.demos} lang={lang} />
      </section>

      {/* ══════════════════════════════════════════════════════
          TECHNICAL STACK
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "72px 24px", maxWidth: 800, margin: "0 auto" }}>
        <hr className="md-divider" style={{ marginBottom: 48 }} />
        <div style={{ marginBottom: 32 }}>
          <p className="md-label-md" style={{ color: "var(--md-on-surface-variant)", textTransform: "uppercase", marginBottom: 4 }}>
            {t.sections.techStack}
          </p>
          <p className="md-body-md" style={{ color: "var(--md-on-surface-variant)" }}>
            {t.sections.techStackSub}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 40 }}>
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
                  background: `linear-gradient(90deg, var(--md-primary), var(--md-on-primary-container))`,
                  width: `${(skill.years / MAX_YEARS) * 100}%`,
                }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {t.about.otherSkills.map((s) => (
            <span key={s} className="md-chip" style={{ height: 28, fontSize: 12, padding: "0 12px" }}>{s}</span>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════ */}
      <footer style={{
        padding: "32px 24px",
        borderTop: "1px solid var(--md-outline-variant)",
        textAlign: "center",
      }}>
        <p className="md-label-md" style={{ color: "var(--md-outline)" }}>
          {t.brand} · {t.footer.by} · {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
