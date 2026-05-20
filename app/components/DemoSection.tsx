"use client";

import { useState, useEffect, useCallback } from "react";
import { DebitCardDemo }    from "./demos/DebitCard";
import { SkeletonSearchDemo } from "./demos/SkeletonSearch";
import { getDictionary }    from "@/lib/i18n";

/* ─── Demo registry ────────────────────────────────────────────────
   To add a new demo:
   1. Create  app/components/demos/YourDemo.tsx  (export YourDemo)
   2. Add an entry below
   3. Add translations in lib/i18n/en.ts and es.ts (demos array)
─────────────────────────────────────────────────────────────────── */
type DemoSlug = keyof typeof DEMOS;
const DEMOS = {
  "debit-card":     (lang: string) => <DebitCardDemo lang={lang} />,
  "skeleton-search": (_lang: string) => <SkeletonSearchDemo />,
} satisfies Record<string, (lang: string) => React.ReactNode>;

interface DemoEntry {
  slug: string;
  title: string;
  description: string;
  tags: string[];
}

export function DemoSection({ demos, lang }: { demos: DemoEntry[]; lang: string }) {
  const t = getDictionary(lang);
  const [active, setActive] = useState<DemoSlug | null>(null);

  const close = useCallback(() => setActive(null), []);

  /* Escape key + body scroll lock */
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close]);

  const activeDemo = demos.find((d) => d.slug === active);

  return (
    <>
      {/* Demo cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {demos.map((demo) => (
          <button
            key={demo.slug}
            onClick={() => setActive(demo.slug as DemoSlug)}
            style={{ all: "unset", cursor: "pointer", display: "block", width: "100%" }}
          >
            <div className="md-card">
              <div style={{ padding: "20px 20px 12px" }}>
                <h3 className="md-title-md" style={{ color: "var(--md-on-surface)", marginBottom: 8 }}>
                  {demo.title}
                </h3>
                <p className="md-body-md" style={{ color: "var(--md-on-surface-variant)", marginBottom: 16 }}>
                  {demo.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {demo.tags.map((tag) => (
                    <span key={tag} className="md-chip" style={{ height: 28, fontSize: 12, padding: "0 12px" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <hr className="md-divider" />
              <div style={{ padding: "4px 8px" }}>
                <span className="md-btn-text" style={{ pointerEvents: "none" }}>
                  {t.viewDemo}
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {active && (
        <div
          className="md-backdrop"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={activeDemo?.title}
        >
          <div className="md-modal" onClick={(e) => e.stopPropagation()}>

            {/* Header */}
            <header className="md-modal-header">
              <span className="md-modal-title">{activeDemo?.title}</span>
              <button
                className="md-btn-icon"
                onClick={close}
                aria-label="Close"
                style={{ flexShrink: 0 }}
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>

            {/* Body */}
            <div className="md-modal-body">
              {DEMOS[active]?.(lang) ?? null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
