"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { TOOLS, CATEGORIES, type ToolMeta, type CategoryId } from "@/lib/tools-registry";

/* ── Lazy tool loader ───────────────────────────────────────────── */
async function loadTool(id: string, lang: string): Promise<React.ReactNode> {
  switch (id) {
    // Security
    case "rsa":      { const m = await import("./tools/SecurityTools"); return <m.RsaTool />; }
    case "hash":     { const m = await import("./tools/SecurityTools"); return <m.HashTool />; }
    case "bcrypt":   { const m = await import("./tools/SecurityTools"); return <m.BcryptTool />; }
    case "aes":      { const m = await import("./tools/SecurityTools"); return <m.AesTool />; }
    case "jwt":      { const m = await import("./tools/SecurityTools"); return <m.JwtTool />; }
    case "passgen":  { const m = await import("./tools/SecurityTools"); return <m.PasswordTool />; }
    // Transform
    case "json":     { const m = await import("./tools/TransformTools"); return <m.JsonTool />; }
    case "base64":   { const m = await import("./tools/TransformTools"); return <m.Base64Tool />; }
    case "urlencode":{ const m = await import("./tools/TransformTools"); return <m.UrlEncodeTool />; }
    case "jscsv":    { const m = await import("./tools/TransformTools"); return <m.JsonCsvTool />; }
    case "yamljson": { const m = await import("./tools/TransformTools"); return <m.YamlJsonTool />; }
    case "markdown": { const m = await import("./tools/TransformTools"); return <m.MarkdownTool />; }
    case "entities": { const m = await import("./tools/TransformTools"); return <m.HtmlEntitiesTool />; }
    // Network
    case "urlparser":  { const m = await import("./tools/NetworkTools"); return <m.UrlParserTool />; }
    case "regex":      { const m = await import("./tools/NetworkTools"); return <m.RegexTool />; }
    case "cors":       { const m = await import("./tools/NetworkTools"); return <m.CorsTool />; }
    case "httpstatus": { const m = await import("./tools/NetworkTools"); return <m.HttpStatusTool />; }
    case "useragent":  { const m = await import("./tools/NetworkTools"); return <m.UserAgentTool />; }
    // DevTools
    case "timestamp": { const m = await import("./tools/DevTools"); return <m.TimestampTool />; }
    case "cron":      { const m = await import("./tools/DevTools"); return <m.CronTool />; }
    case "color":     { const m = await import("./tools/DevTools"); return <m.ColorTool />; }
    case "numbase":   { const m = await import("./tools/DevTools"); return <m.NumberBaseTool />; }
    case "diff":      { const m = await import("./tools/DevTools"); return <m.DiffTool />; }
    case "uuid":      { const m = await import("./tools/DevTools"); return <m.UuidTool />; }
    // Generators
    case "qr":        { const m = await import("./tools/GeneratorTools"); return <m.QrTool />; }
    case "lorem":     { const m = await import("./tools/GeneratorTools"); return <m.LoremTool />; }
    case "debitcard": { const m = await import("./tools/GeneratorTools"); return <m.DebitCardTool lang={lang} />; }
    // Text
    case "textstats": { const m = await import("./tools/TextTools"); return <m.TextStatsTool />; }
    case "caseconv":  { const m = await import("./tools/TextTools"); return <m.CaseTool />; }
    default: return <p>Tool not found</p>;
  }
}

/* ── Tool Modal ─────────────────────────────────────────────────── */
function ToolModal({ tool, lang, onClose }: { tool: ToolMeta; lang: string; onClose: () => void }) {
  const [node, setNode] = useState<React.ReactNode>(null);
  const cat = CATEGORIES.find(c => c.id === tool.category);

  useEffect(() => {
    loadTool(tool.id, lang).then(setNode);
  }, [tool.id, lang]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
        animation: "md-fade .2s ease" }}
      onClick={onClose}
    >
      <div
        style={{ background: "var(--md-surface-container)", borderRadius: 20,
          width: "min(920px,98%)", maxHeight: "92vh", display: "flex", flexDirection: "column",
          overflow: "hidden", animation: "md-slide-up .25s ease",
          boxShadow: "0 24px 48px rgba(0,0,0,.5)" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 20px",
          height: 60, borderBottom: "1px solid var(--md-outline-variant)", flexShrink: 0 }}>
          <span style={{ fontSize: 22 }}>{tool.icon}</span>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 16, fontWeight: 600, color: "var(--md-on-surface)", lineHeight: 1.2 }}>{tool.name}</p>
            <p style={{ fontSize: 11, color: cat?.color ?? "var(--md-on-surface-variant)" }}>{cat?.icon} {cat?.label}</p>
          </div>
          <button onClick={onClose} style={{ all: "unset", cursor: "pointer", width: 36, height: 36,
            display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: 18, color: "var(--md-on-surface-variant)",
            transition: "background .15s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "color-mix(in srgb,var(--md-on-surface-variant) 10%,transparent)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 24px 32px" }}>
          {node ?? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 120,
              color: "var(--md-on-surface-variant)", fontSize: 14 }}>
              Cargando herramienta…
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Tool Card ──────────────────────────────────────────────────── */
function ToolCard({ tool, onClick }: { tool: ToolMeta; onClick: () => void }) {
  const cat = CATEGORIES.find(c => c.id === tool.category);
  return (
    <button
      onClick={onClick}
      style={{ all: "unset", cursor: "pointer", display: "flex", flexDirection: "column",
        background: "var(--md-surface-container)", border: "1px solid var(--md-outline-variant)",
        borderRadius: 10, padding: "16px 14px", textAlign: "left" as const,
        transition: "border-color .15s, box-shadow .15s, transform .15s" }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.borderColor = cat?.color ?? "var(--md-outline)";
        el.style.boxShadow = `0 4px 12px rgba(0,0,0,.3), 0 0 0 1px ${cat?.color ?? "transparent"}20`;
        el.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.borderColor = "var(--md-outline-variant)";
        el.style.boxShadow = "none";
        el.style.transform = "translateY(0)";
      }}
    >
      <span style={{ fontSize: 28, marginBottom: 10, display: "block" }}>{tool.icon}</span>
      <p style={{ fontSize: 13, fontWeight: 600, color: "var(--md-on-surface)", marginBottom: 4, lineHeight: 1.3 }}>{tool.name}</p>
      <p style={{ fontSize: 11, color: "var(--md-on-surface-variant)", lineHeight: 1.5, flex: 1, marginBottom: 10 }}>{tool.description}</p>
      <span style={{ fontSize: 10, fontWeight: 600, color: cat?.color, textTransform: "uppercase" as const, letterSpacing: 0.5 }}>
        {cat?.icon} {cat?.label}
      </span>
    </button>
  );
}

/* ── Main Catalog ───────────────────────────────────────────────── */
const RECENT_KEY = "hl-recent-tools";

export function ToolCatalog({ lang }: { lang: string }) {
  const [activeCat, setActiveCat]   = useState<CategoryId | "all">("all");
  const [search, setSearch]         = useState("");
  const [activeTool, setActiveTool] = useState<ToolMeta | null>(null);
  const [recent, setRecent]         = useState<string[]>([]);

  useEffect(() => {
    try { setRecent(JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]")); } catch { /* */ }
  }, []);

  const openTool = useCallback((tool: ToolMeta) => {
    setActiveTool(tool);
    setRecent(prev => {
      const next = [tool.id, ...prev.filter(id => id !== tool.id)].slice(0, 6);
      try { localStorage.setItem(RECENT_KEY, JSON.stringify(next)); } catch { /* */ }
      return next;
    });
  }, []);

  const filtered = useMemo(() => TOOLS.filter(t => {
    const matchesCat = activeCat === "all" || t.category === activeCat;
    const q = search.toLowerCase();
    const matchesSearch = !q || t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.tags.some(tag => tag.includes(q));
    return matchesCat && matchesSearch;
  }), [activeCat, search]);

  const recentTools = recent.map(id => TOOLS.find(t => t.id === id)).filter(Boolean) as ToolMeta[];
  const catCounts = Object.fromEntries(CATEGORIES.map(c => [c.id, TOOLS.filter(t => t.category === c.id).length]));

  return (
    <>
      <div style={{ display: "flex", height: "100%", gap: 0 }}>

        {/* ── Category sidebar ─────────────────────────────── */}
        <aside style={{ width: 180, flexShrink: 0, borderRight: "1px solid var(--md-outline-variant)",
          display: "flex", flexDirection: "column", padding: "16px 0" }}>
          {/* All tools */}
          {([
            { id: "all" as const, label: "All tools", icon: "☰", color: "var(--md-on-surface-variant)", count: TOOLS.length },
            ...CATEGORIES.map(c => ({ ...c, count: catCounts[c.id] })),
          ] as { id: CategoryId | "all"; label: string; icon: string; color: string; count: number }[]).map(item => {
            const active = activeCat === item.id;
            return (
              <button key={item.id} onClick={() => setActiveCat(item.id as CategoryId | "all")}
                style={{ all: "unset", cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
                  padding: "8px 16px", borderLeft: `2px solid ${active ? item.color : "transparent"}`,
                  background: active ? `color-mix(in srgb,${item.color} 10%,transparent)` : "transparent",
                  transition: "background .15s, border-color .15s" }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = "color-mix(in srgb,var(--md-on-surface-variant) 5%,transparent)"; }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
              >
                <span style={{ fontSize: 14 }}>{item.icon}</span>
                <span style={{ fontSize: 12, fontWeight: active ? 600 : 400, flex: 1,
                  color: active ? item.color : "var(--md-on-surface-variant)" }}>{item.label}</span>
                <span style={{ fontSize: 10, color: "var(--md-outline)", background: "var(--md-surface-container-high)",
                  borderRadius: 10, padding: "1px 6px" }}>{item.count}</span>
              </button>
            );
          })}
        </aside>

        {/* ── Main catalog area ─────────────────────────────── */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>

          {/* Search */}
          <div style={{ position: "relative", marginBottom: 20 }}>
            <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
              color: "var(--md-on-surface-variant)" }}
              width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar herramientas… (hash, encrypt, json, regex…)"
              style={{ width: "100%", height: 40, paddingLeft: 36, paddingRight: 12, borderRadius: 8,
                background: "var(--md-surface-container-high)", border: "1px solid var(--md-outline-variant)",
                color: "var(--md-on-surface)", fontSize: 13, outline: "none", boxSizing: "border-box" as const }}
              onFocus={e => { e.target.style.borderColor = "var(--md-primary)"; }}
              onBlur={e => { e.target.style.borderColor = "var(--md-outline-variant)"; }}
            />
          </div>

          {/* Recently used */}
          {!search && recentTools.length > 0 && activeCat === "all" && (
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const,
                letterSpacing: 0.8, color: "var(--md-on-surface-variant)", marginBottom: 10 }}>
                Usadas recientemente
              </p>
              <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
                {recentTools.map(t => (
                  <button key={t.id} onClick={() => openTool(t)} style={{
                    all: "unset", cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                    padding: "5px 12px", borderRadius: 16, fontSize: 12, fontWeight: 500,
                    background: "var(--md-surface-container-high)", border: "1px solid var(--md-outline-variant)",
                    color: "var(--md-on-surface-variant)", transition: "border-color .15s, color .15s" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = "var(--md-outline)"; el.style.color = "var(--md-on-surface)"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = "var(--md-outline-variant)"; el.style.color = "var(--md-on-surface-variant)"; }}
                  >
                    <span>{t.icon}</span>{t.name}
                  </button>
                ))}
              </div>
              <div style={{ height: 1, background: "var(--md-outline-variant)", margin: "20px 0" }} />
            </div>
          )}

          {/* Tool grid — grouped by category */}
          {!search && activeCat === "all"
            ? CATEGORIES.map(cat => {
                const catTools = TOOLS.filter(t => t.category === cat.id);
                return (
                  <div key={cat.id} style={{ marginBottom: 32 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                      <span style={{ fontSize: 16 }}>{cat.icon}</span>
                      <p style={{ fontSize: 13, fontWeight: 600, color: cat.color }}>{cat.label}</p>
                      <span style={{ fontSize: 11, color: "var(--md-outline)", marginLeft: 4 }}>({catTools.length})</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(155px,1fr))", gap: 10 }}>
                      {catTools.map(t => <ToolCard key={t.id} tool={t} onClick={() => openTool(t)} />)}
                    </div>
                  </div>
                );
              })
            : (
              <>
                {filtered.length === 0
                  ? <p style={{ color: "var(--md-on-surface-variant)", fontSize: 14, padding: "24px 0" }}>
                      No se encontraron herramientas para &quot;{search}&quot;
                    </p>
                  : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(155px,1fr))", gap: 10 }}>
                      {filtered.map(t => <ToolCard key={t.id} tool={t} onClick={() => openTool(t)} />)}
                    </div>
                }
              </>
            )
          }
        </div>
      </div>

      {/* Modal */}
      {activeTool && <ToolModal tool={activeTool} lang={lang} onClose={() => setActiveTool(null)} />}
    </>
  );
}
