"use client";

import { useEffect, useState } from "react";

interface DemoItem { slug: string; title: string }
interface NavSection { id: string; label: string; demos?: DemoItem[] }

interface Props {
  brand: string;
  sections: NavSection[];
  activeDemo: string;
  onDemoSelect: (slug: string) => void;
}

export function LeftNav({ brand, sections, activeDemo, onDemoSelect }: Props) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const ids = sections.map((s) => s.id);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-64px 0px -55% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div style={{ padding: "28px 0" }}>
      {/* Brand */}
      <div style={{ padding: "0 20px 28px" }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: "var(--md-primary)", letterSpacing: 0.5 }}>
          {brand}
        </span>
      </div>

      {/* Sections */}
      {sections.map((sec) => {
        const secActive = activeId === sec.id;
        return (
          <div key={sec.id}>
            <button
              onClick={() => { scrollTo(sec.id); setActiveId(sec.id); }}
              style={{
                all: "unset", cursor: "pointer", display: "flex",
                alignItems: "center", gap: 10, width: "100%",
                padding: "8px 20px",
                borderLeft: `2px solid ${secActive ? "var(--md-primary)" : "transparent"}`,
                background: secActive ? "color-mix(in srgb,var(--md-primary) 8%,transparent)" : "transparent",
                transition: "background .15s, border-color .15s",
              }}
              onMouseEnter={(e) => {
                if (!secActive) (e.currentTarget as HTMLButtonElement).style.background = "color-mix(in srgb,var(--md-primary) 4%,transparent)";
              }}
              onMouseLeave={(e) => {
                if (!secActive) (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", flexShrink: 0, background: secActive ? "var(--md-primary)" : "var(--md-outline)", transition: "background .15s" }} />
              <span style={{ fontSize: 13, fontWeight: 500, color: secActive ? "var(--md-primary)" : "var(--md-on-surface-variant)", letterSpacing: 0.1 }}>
                {sec.label}
              </span>
            </button>

            {/* Demo subsections */}
            {sec.demos && (
              <div style={{ overflow: "hidden" }}>
                {sec.demos.map((demo) => {
                  const demoActive = activeDemo === demo.slug;
                  return (
                    <button
                      key={demo.slug}
                      onClick={() => { onDemoSelect(demo.slug); scrollTo(sec.id); }}
                      style={{
                        all: "unset", cursor: "pointer", display: "flex",
                        alignItems: "center", gap: 8, width: "100%",
                        padding: "6px 20px 6px 38px",
                        borderLeft: `2px solid ${demoActive ? "var(--md-primary)" : "transparent"}`,
                        background: demoActive ? "color-mix(in srgb,var(--md-primary) 6%,transparent)" : "transparent",
                        transition: "background .15s, border-color .15s",
                      }}
                      onMouseEnter={(e) => {
                        if (!demoActive) (e.currentTarget as HTMLButtonElement).style.background = "color-mix(in srgb,var(--md-primary) 3%,transparent)";
                      }}
                      onMouseLeave={(e) => {
                        if (!demoActive) (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" style={{ flexShrink: 0 }}>
                        <rect x="1" y="1" width="8" height="8" rx="2"
                          fill={demoActive ? "var(--md-primary)" : "none"}
                          stroke={demoActive ? "var(--md-primary)" : "var(--md-outline)"}
                          strokeWidth="1.5"
                        />
                      </svg>
                      <span style={{ fontSize: 12, fontWeight: demoActive ? 600 : 400, color: demoActive ? "var(--md-primary)" : "var(--md-on-surface-variant)", lineHeight: "16px" }}>
                        {demo.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
