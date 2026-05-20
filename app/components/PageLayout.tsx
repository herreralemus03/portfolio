"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { LeftNav }          from "./LeftNav";
import { RightStack }       from "./RightStack";
import { CompanyLogos }     from "./CompanyLogos";
import { DebitCardDemo }    from "./demos/DebitCard";
import { SkeletonSearchDemo } from "./demos/SkeletonSearch";
import type { Dict } from "@/lib/i18n";

/* ── Demo registry ──────────────────────────────────────────────── */
const DEMOS: Record<string, (lang: string) => React.ReactNode> = {
  "debit-card":      (lang) => <DebitCardDemo lang={lang} />,
  "skeleton-search": ()     => <SkeletonSearchDemo />,
};

export function PageLayout({ lang, t }: { lang: string; t: Dict }) {
  /* ── State ──────────────────────────────────────────────────── */
  const [appbarVisible, setAppbarVisible] = useState(true);
  const [contactOpen,   setContactOpen]   = useState(false);
  const [activeDemo,    setActiveDemo]    = useState(t.demos[0]?.slug ?? "");

  const lastScrollTop  = useRef(0);
  const mainRef        = useRef<HTMLDivElement>(null);
  const [mainEl, setMainEl] = useState<HTMLElement | null>(null);

  /* stable ref callback so LeftNav gets the DOM element */
  const mainRefCallback = useCallback((el: HTMLDivElement | null) => {
    mainRef.current = el;
    setMainEl(el);
  }, []);

  /* Collapse AppBar on scroll-down, reveal on scroll-up */
  const handleMainScroll = useCallback(() => {
    const el = mainRef.current;
    if (!el) return;
    const st = el.scrollTop;
    if (st > lastScrollTop.current && st > 80) setAppbarVisible(false);
    else setAppbarVisible(true);
    lastScrollTop.current = Math.max(0, st);
  }, []);

  /* Escape key + body scroll lock for contact drawer */
  useEffect(() => {
    if (!contactOpen) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setContactOpen(false); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [contactOpen]);

  const navSections = [
    { id: "hero",       label: "Overview" },
    { id: "experience", label: t.sections.clients },
    { id: "showcase",   label: t.sections.showcase,
      demos: t.demos.map((d) => ({ slug: d.slug, title: d.title })) },
  ];

  const activeD = t.demos.find((d) => d.slug === activeDemo);
  const { name, title: devTitle, contact, profile } = t.about;

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          FULL-VIEWPORT SHELL
      ══════════════════════════════════════════════════════════ */}
      <div style={{ height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden", background: "var(--md-surface)" }}>

        {/* ── AppBar (collapses to height:0) ─────────────────── */}
        <div style={{ height: appbarVisible ? 64 : 0, overflow: "hidden", transition: "height .25s ease", flexShrink: 0 }}>
          <header style={{
            height: 64, display: "flex", alignItems: "center",
            padding: "0 20px", gap: 8,
            background: "color-mix(in srgb,var(--md-surface-container) 90%,transparent)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--md-outline-variant)",
          }}>
            <button
              onClick={() => { mainRef.current?.scrollTo({ top: 0, behavior: "smooth" }); }}
              style={{ all: "unset", cursor: "pointer", fontSize: 19, fontWeight: 700, color: "var(--md-primary)", letterSpacing: 0.5, marginRight: "auto" }}
            >
              {t.brand}
            </button>
            <nav style={{ display: "flex", alignItems: "center", gap: 2 }}>
              <button className="md-btn-text" style={{ fontSize: 13 }} onClick={() => { document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth" }); mainRef.current?.scrollTo({ top: (mainRef.current?.querySelector("#showcase") as HTMLElement)?.offsetTop ?? 0, behavior: "smooth" }); }}>
                {t.nav.showcase}
              </button>
              <button className="md-btn-text" style={{ fontSize: 13 }} onClick={() => { mainRef.current?.scrollTo({ top: (mainRef.current?.querySelector("#experience") as HTMLElement)?.offsetTop ?? 0, behavior: "smooth" }); }}>
                {t.nav.experience}
              </button>
            </nav>
            <Link href={`/${t.langTarget}/`} className="md-btn-text" style={{ fontSize: 13 }}>{t.langSwitch}</Link>
            <button className="md-btn-filled" style={{ height: 36, padding: "0 16px", fontSize: 13 }} onClick={() => setContactOpen(true)}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
              </svg>
              {t.nav.contact}
            </button>
          </header>
        </div>

        {/* ── Three independently scrollable columns ──────────── */}
        <div className="three-col" style={{ flex: 1, minHeight: 0 }}>

          {/* LEFT sidebar */}
          <div className="col-panel col-border-right">
            <LeftNav
              brand={t.brand}
              sections={navSections}
              activeDemo={activeDemo}
              onDemoSelect={(slug) => {
                setActiveDemo(slug);
                /* scroll main to showcase */
                const showcase = mainRef.current?.querySelector("#showcase") as HTMLElement;
                if (showcase && mainRef.current) mainRef.current.scrollTo({ top: showcase.offsetTop, behavior: "smooth" });
              }}
              scrollRoot={mainEl}
            />
          </div>

          {/* MAIN content */}
          <div ref={mainRefCallback} onScroll={handleMainScroll} className="col-panel">

            {/* Hero */}
            <section id="hero" style={{ minHeight: "88vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "72px 40px 56px" }}>
              <p className="md-label-md animate-fade-up" style={{ color: "var(--md-primary)", textTransform: "uppercase", letterSpacing: 3, marginBottom: 20 }}>
                {t.brand}
              </p>
              <h1 className="animate-fade-up" style={{ fontSize: "clamp(36px,5.5vw,64px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-1.5px", marginBottom: 24, animationDelay: ".05s", whiteSpace: "pre-line" }}>
                <span className="gradient-text">{t.hero.headline}</span>
              </h1>
              <p className="md-body-lg animate-fade-up" style={{ color: "var(--md-on-surface-variant)", maxWidth: 520, lineHeight: 1.7, marginBottom: 32, animationDelay: ".1s" }}>
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
                <button className="md-btn-filled" style={{ height: 48, padding: "0 28px", fontSize: 15 }}
                  onClick={() => {
                    const el = mainRef.current?.querySelector("#showcase") as HTMLElement;
                    if (el && mainRef.current) mainRef.current.scrollTo({ top: el.offsetTop, behavior: "smooth" });
                  }}>
                  {t.hero.cta1}
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"/>
                  </svg>
                </button>
                <button className="md-btn-outlined" style={{ height: 48, padding: "0 28px", fontSize: 15 }} onClick={() => setContactOpen(true)}>
                  {t.hero.cta2}
                </button>
              </div>
            </section>

            {/* Experience */}
            <section id="experience" style={{ padding: "64px 40px" }}>
              <div className="md-divider" style={{ marginBottom: 48 }} />
              <p className="md-label-md" style={{ color: "var(--md-on-surface-variant)", textTransform: "uppercase", marginBottom: 8 }}>
                {t.sections.clients}
              </p>
              <CompanyLogos sub={t.sections.clientsSub} />
            </section>

            {/* Showcase */}
            <section id="showcase" style={{ padding: "64px 40px 80px" }}>
              <div className="md-divider" style={{ marginBottom: 48 }} />
              <p className="md-label-md" style={{ color: "var(--md-on-surface-variant)", textTransform: "uppercase", marginBottom: 4 }}>
                {t.sections.showcase}
              </p>
              <p className="md-body-md" style={{ color: "var(--md-on-surface-variant)", marginBottom: 32 }}>
                {t.sections.showcaseSub}
              </p>

              {/* Mobile demo tabs */}
              <div className="demo-tabs">
                {t.demos.map((demo) => (
                  <button key={demo.slug} onClick={() => setActiveDemo(demo.slug)}
                    className={`demo-tab${activeDemo === demo.slug ? " demo-tab-active" : ""}`}>
                    {demo.title}
                  </button>
                ))}
              </div>

              {activeD && (
                <div>
                  <h2 className="md-headline-sm" style={{ color: "var(--md-on-surface)", marginBottom: 6 }}>{activeD.title}</h2>
                  <p className="md-body-md" style={{ color: "var(--md-on-surface-variant)", marginBottom: 12 }}>{activeD.description}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 28 }}>
                    {activeD.tags.map((tag) => (
                      <span key={tag} className="md-chip" style={{ height: 26, fontSize: 11, padding: "0 10px" }}>{tag}</span>
                    ))}
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
          </div>

          {/* RIGHT sidebar */}
          <div className="col-panel col-border-left">
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

      {/* ── Contact Drawer (portal-style, outside the scroll container) ── */}
      {contactOpen && (
        <>
          <div className="drawer-backdrop" onClick={() => setContactOpen(false)} />
          <aside className="drawer">
            <div className="drawer-header">
              <span className="md-title-lg" style={{ color: "var(--md-on-surface)", flex: 1 }}>{t.nav.contact}</span>
              <button className="md-btn-icon" onClick={() => setContactOpen(false)} aria-label="Close">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className="drawer-body">
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 56, height: 56, borderRadius: 28, flexShrink: 0, background: "var(--md-primary-container)", color: "var(--md-on-primary-container)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700 }}>FH</div>
                <div>
                  <p className="md-title-md" style={{ color: "var(--md-on-surface)" }}>{name}</p>
                  <p className="md-body-md"  style={{ color: "var(--md-primary)" }}>{devTitle}</p>
                </div>
              </div>
              <p className="md-body-md" style={{ color: "var(--md-on-surface-variant)", lineHeight: 1.7 }}>{profile}</p>
              <hr className="md-divider" />
              <div>
                <p className="md-headline-sm" style={{ color: "var(--md-on-surface)", marginBottom: 4 }}>{t.drawer.headline}</p>
                <p className="md-label-md"    style={{ color: "var(--md-on-surface-variant)", textTransform: "uppercase" }}>{t.drawer.sub}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <a href={`mailto:${contact.email}`} className="md-btn-filled" style={{ width: "100%", justifyContent: "flex-start", gap: 12, paddingLeft: 16 }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
                  {t.drawer.sendEmail}
                </a>
                <a href={`https://linkedin.com/in/${contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="md-btn-outlined" style={{ width: "100%", justifyContent: "flex-start", gap: 12, paddingLeft: 16 }}>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  {t.drawer.openLinkedIn}
                </a>
                <a href={`https://github.com/${contact.github}`} target="_blank" rel="noopener noreferrer" className="md-btn-text" style={{ width: "100%", justifyContent: "flex-start", gap: 12, paddingLeft: 4 }}>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                  {t.drawer.openGitHub}
                </a>
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 4px" }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ color: "var(--md-on-surface-variant)", flexShrink: 0 }}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>
                  <span className="md-body-md" style={{ color: "var(--md-on-surface-variant)" }}>{contact.phone}</span>
                </div>
              </div>
              <div style={{ marginTop: "auto", paddingTop: 16 }}>
                <p className="md-label-sm" style={{ color: "var(--md-outline)", textAlign: "center" }}>{t.about.location}</p>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
