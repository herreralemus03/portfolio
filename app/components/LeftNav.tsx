"use client";

import { useEffect, useState } from "react";

interface DemoItem { slug: string; title: string }
interface NavSection { id: string; label: string; demos?: DemoItem[] }

interface Props {
  brand: string;
  sections: NavSection[];
  activeDemo: string;
  onDemoSelect: (slug: string) => void;
  scrollRoot: HTMLElement | null;
}

export function LeftNav({ brand, sections, activeDemo, onDemoSelect, scrollRoot }: Props) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  /* Re-run when the scrollable container is available */
  useEffect(() => {
    if (!scrollRoot) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id); });
      },
      { root: scrollRoot, rootMargin: "-10% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = scrollRoot.querySelector(`#${id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [scrollRoot, sections]);

  function scrollMainTo(id: string) {
    if (!scrollRoot) return;
    const el = scrollRoot.querySelector(`#${id}`) as HTMLElement;
    if (el) scrollRoot.scrollTo({ top: el.offsetTop, behavior: "smooth" });
  }

  return (
    <div style={{ padding: "28px 0", minHeight: "100%" }}>
      {/* Brand */}
      <div style={{ padding: "0 20px 28px" }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: "var(--md-primary)", letterSpacing: 0.5 }}>
          {brand}
        </span>
      </div>

      {sections.map((sec) => {
        const secActive = activeId === sec.id;
        return (
          <div key={sec.id}>
            <button
              onClick={() => { scrollMainTo(sec.id); setActiveId(sec.id); }}
              style={{
                all: "unset", cursor: "pointer", display: "flex", alignItems: "center",
                gap: 10, width: "100%", padding: "8px 20px",
                borderLeft: `2px solid ${secActive ? "var(--md-primary)" : "transparent"}`,
                background: secActive ? "color-mix(in srgb,var(--md-primary) 8%,transparent)" : "transparent",
                transition: "background .15s, border-color .15s",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", flexShrink: 0, transition: "background .15s",
                background: secActive ? "var(--md-primary)" : "var(--md-outline)" }} />
              <span style={{ fontSize: 13, fontWeight: 500, letterSpacing: 0.1,
                color: secActive ? "var(--md-primary)" : "var(--md-on-surface-variant)" }}>
                {sec.label}
              </span>
            </button>

            {/* Demo subsections */}
            {sec.demos?.map((demo) => {
              const on = activeDemo === demo.slug;
              return (
                <button
                  key={demo.slug}
                  onClick={() => onDemoSelect(demo.slug)}
                  style={{
                    all: "unset", cursor: "pointer", display: "flex", alignItems: "center",
                    gap: 8, width: "100%", padding: "6px 20px 6px 38px",
                    borderLeft: `2px solid ${on ? "var(--md-primary)" : "transparent"}`,
                    background: on ? "color-mix(in srgb,var(--md-primary) 6%,transparent)" : "transparent",
                    transition: "background .15s, border-color .15s",
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" style={{ flexShrink: 0 }}>
                    <rect x="1" y="1" width="8" height="8" rx="2"
                      fill={on ? "var(--md-primary)" : "none"}
                      stroke={on ? "var(--md-primary)" : "var(--md-outline)"}
                      strokeWidth="1.5" />
                  </svg>
                  <span style={{ fontSize: 12, lineHeight: "16px", fontWeight: on ? 600 : 400,
                    color: on ? "var(--md-primary)" : "var(--md-on-surface-variant)" }}>
                    {demo.title}
                  </span>
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
