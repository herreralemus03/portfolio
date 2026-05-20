"use client";

import { useState } from "react";
import { LeftNav }          from "./LeftNav";
import { RightStack }       from "./RightStack";
import { CompanyLogos }     from "./CompanyLogos";
import { DebitCardDemo }    from "./demos/DebitCard";
import { SkeletonSearchDemo } from "./demos/SkeletonSearch";
import type { Dict } from "@/lib/i18n";

/* ─── Demo registry ─────────────────────────────────────────────────
   Add new demo: create demos/YourDemo.tsx, add entry here,
   add entry in lib/i18n/en.ts + es.ts (demos array).
─────────────────────────────────────────────────────────────────── */
const DEMOS: Record<string, (lang: string) => React.ReactNode> = {
  "debit-card":      (lang) => <DebitCardDemo lang={lang} />,
  "skeleton-search": ()     => <SkeletonSearchDemo />,
};

export function PageLayout({ lang, t }: { lang: string; t: Dict }) {
  const [activeDemo, setActiveDemo] = useState(t.demos[0]?.slug ?? "");
  const activeD = t.demos.find((d) => d.slug === activeDemo);

  const navSections = [
    { id: "hero",       label: "Overview" },
    { id: "experience", label: t.sections.clients },
    { id: "showcase",   label: t.sections.showcase, demos: t.demos.map((d) => ({ slug: d.slug, title: d.title })) },
  ];

  return (
    <div className="three-col">

      {/* ── Left sidebar ──────────────────────────────── */}
      <div className="col-left">
        <div className="col-sticky">
          <LeftNav
            brand={t.brand}
            sections={navSections}
            activeDemo={activeDemo}
            onDemoSelect={setActiveDemo}
          />
        </div>
      </div>

      {/* ── Main content ──────────────────────────────── */}
      <main className="col-main">

        {/* Hero */}
        <section id="hero" style={{ minHeight: "88vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "72px 40px 56px" }}>
          <p className="md-label-md animate-fade-up" style={{ color: "var(--md-primary)", textTransform: "uppercase", letterSpacing: 3, marginBottom: 20 }}>
            {t.brand}
          </p>
          <h1 className="animate-fade-up" style={{ fontSize: "clamp(36px,6vw,64px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-1.5px", marginBottom: 24, animationDelay: ".05s", whiteSpace: "pre-line" }}>
            <span className="gradient-text">{t.hero.headline}</span>
          </h1>
          <p className="md-body-lg animate-fade-up" style={{ color: "var(--md-on-surface-variant)", maxWidth: 540, lineHeight: 1.7, marginBottom: 32, animationDelay: ".1s" }}>
            {t.hero.sub}
          </p>
          <div className="animate-fade-up" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40, animationDelay: ".15s" }}>
            {t.hero.keySkills.map((s) => (
              <span key={s} className="md-chip" style={{ borderColor: "var(--md-primary-container)", color: "var(--md-on-primary-container)", background: "color-mix(in srgb,var(--md-primary-container) 20%,transparent)" }}>
                {s}
              </span>
            ))}
          </div>
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

        {/* Experience */}
        <section id="experience" style={{ padding: "64px 40px" }}>
          <div style={{ height: 1, background: "var(--md-outline-variant)", marginBottom: 48 }} />
          <p className="md-label-md" style={{ color: "var(--md-on-surface-variant)", textTransform: "uppercase", marginBottom: 8 }}>
            {t.sections.clients}
          </p>
          <CompanyLogos sub={t.sections.clientsSub} />
        </section>

        {/* Component Showcase */}
        <section id="showcase" style={{ padding: "64px 40px 80px" }}>
          <div style={{ height: 1, background: "var(--md-outline-variant)", marginBottom: 48 }} />
          <p className="md-label-md" style={{ color: "var(--md-on-surface-variant)", textTransform: "uppercase", marginBottom: 4 }}>
            {t.sections.showcase}
          </p>
          <p className="md-body-md" style={{ color: "var(--md-on-surface-variant)", marginBottom: 32 }}>
            {t.sections.showcaseSub}
          </p>

          {/* Demo tab strip (visible on mobile where LeftNav is hidden) */}
          <div className="demo-tabs">
            {t.demos.map((demo) => (
              <button
                key={demo.slug}
                onClick={() => setActiveDemo(demo.slug)}
                className={`demo-tab${activeDemo === demo.slug ? " demo-tab-active" : ""}`}
              >
                {demo.title}
              </button>
            ))}
          </div>

          {/* Active demo */}
          {activeD && (
            <div>
              <div style={{ marginBottom: 28 }}>
                <h2 className="md-headline-sm" style={{ color: "var(--md-on-surface)", marginBottom: 6 }}>
                  {activeD.title}
                </h2>
                <p className="md-body-md" style={{ color: "var(--md-on-surface-variant)", marginBottom: 12 }}>
                  {activeD.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {activeD.tags.map((tag) => (
                    <span key={tag} className="md-chip" style={{ height: 26, fontSize: 11, padding: "0 10px" }}>{tag}</span>
                  ))}
                </div>
              </div>

              <div style={{ background: "var(--md-surface-container-lowest)", borderRadius: 16, padding: 24, border: "1px solid var(--md-outline-variant)" }}>
                {DEMOS[activeDemo]?.(lang) ?? null}
              </div>
            </div>
          )}
        </section>

        <footer style={{ padding: "28px 40px", borderTop: "1px solid var(--md-outline-variant)", textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "var(--md-outline)" }}>
            {t.brand} · {t.footer.by} · {new Date().getFullYear()}
          </p>
        </footer>
      </main>

      {/* ── Right sidebar ─────────────────────────────── */}
      <div className="col-right">
        <div className="col-sticky">
          <RightStack
            skills={t.about.technicalSkills}
            yearsLabel={t.about.yearsLabel}
            otherSkills={t.about.otherSkills}
            techStackLabel={t.sections.techStack}
            techStackSub={t.sections.techStackSub}
          />
        </div>
      </div>

    </div>
  );
}
