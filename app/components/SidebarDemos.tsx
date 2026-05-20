"use client";

import { useState } from "react";
import { DebitCardDemo }     from "./demos/DebitCard";
import { SkeletonSearchDemo } from "./demos/SkeletonSearch";
import { getDictionary }     from "@/lib/i18n";

/* ─── Registry ─────────────────────────────────────────────────────
   Add a new demo here:
   1. Create app/components/demos/YourDemo.tsx
   2. Add entry below
   3. Add translation entry in lib/i18n/en.ts + es.ts (demos array)
───────────────────────────────────────────────────────────────── */
const DEMOS: Record<string, (lang: string) => React.ReactNode> = {
  "debit-card":     (lang) => <DebitCardDemo lang={lang} />,
  "skeleton-search": ()    => <SkeletonSearchDemo />,
};

interface DemoEntry { slug: string; title: string; description: string; tags: string[] }

export function SidebarDemos({ demos, lang }: { demos: DemoEntry[]; lang: string }) {
  const [active, setActive] = useState(demos[0]?.slug ?? "");
  const t = getDictionary(lang);

  const activeDemo = demos.find((d) => d.slug === active);

  return (
    <div className="sidebar-demos">
      {/* Sidebar list */}
      <nav className="sidebar-list" aria-label="demos">
        {demos.map((demo) => (
          <button
            key={demo.slug}
            className={`sidebar-item${active === demo.slug ? " active" : ""}`}
            onClick={() => setActive(demo.slug)}
            style={{ all: "unset", cursor: "pointer", display: "block", width: "100%" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              {/* Active indicator dot */}
              <span style={{
                width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
                background: active === demo.slug ? "var(--md-primary)" : "var(--md-outline)",
                transition: "background .15s",
              }} />
              <span className="md-title-sm" style={{ color: active === demo.slug ? "var(--md-primary)" : "var(--md-on-surface)" }}>
                {demo.title}
              </span>
            </div>
            <p className="md-body-md" style={{
              color: "var(--md-on-surface-variant)",
              paddingLeft: 14,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>
              {demo.description}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, paddingLeft: 14, marginTop: 8 }}>
              {demo.tags.map((tag) => (
                <span key={tag} className="md-chip" style={{ height: 22, fontSize: 11, padding: "0 8px" }}>{tag}</span>
              ))}
            </div>
          </button>
        ))}
      </nav>

      {/* Content panel */}
      <div className="sidebar-content">
        {activeDemo && (
          <div>
            <h3 className="md-headline-sm" style={{ color: "var(--md-on-surface)", marginBottom: 4 }}>
              {activeDemo.title}
            </h3>
            <p className="md-body-md" style={{ color: "var(--md-on-surface-variant)", marginBottom: 28 }}>
              {activeDemo.description}
            </p>
            {DEMOS[active]?.(lang) ?? (
              <p className="md-body-md" style={{ color: "var(--md-outline)" }}>
                {t.viewDemo}…
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
