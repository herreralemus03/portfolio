"use client";

import { useState } from "react";

type Result = { name: string; role: string };

const MOCK: Result[] = [
  { name: "Fernando Herrera", role: "Full Stack Developer · Java · Go · Flutter" },
  { name: "Ana López",        role: "UX/UI Designer focused on minimal interfaces" },
  { name: "Carlos Ruiz",      role: "Backend Engineer specialized in cloud systems" },
];

function SkeletonCard() {
  return (
    <div className="neu-surface" style={{ padding: 20 }}>
      <div className="neu-bone" style={{ height: 18, width: "50%", marginBottom: 14 }} />
      <div className="neu-bone" style={{ height: 13, width: "100%", marginBottom: 8 }} />
      <div className="neu-bone" style={{ height: 13, width: "70%" }} />
    </div>
  );
}

function ResultCard({ name, role }: Result) {
  return (
    <div
      className="neu-surface"
      style={{ padding: 20, transition: "transform .2s, box-shadow .2s", cursor: "default" }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(-3px)";
        el.style.boxShadow = "8px 8px 18px #0f0d13, -8px -8px 18px #2b2930";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "";
      }}
    >
      <p className="md-title-sm" style={{ color: "var(--md-on-surface)", marginBottom: 6 }}>{name}</p>
      <p className="md-body-md"  style={{ color: "var(--md-on-surface-variant)" }}>{role}</p>
    </div>
  );
}

export function SkeletonSearchDemo() {
  const [query,   setQuery]   = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Result[] | null>(null);

  function search() {
    if (!query.trim()) return;
    setLoading(true); setResults(null);
    setTimeout(() => { setLoading(false); setResults(MOCK); }, 2500);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 560, margin: "0 auto" }}>

      {/* Search bar */}
      <div style={{ display: "flex", gap: 12 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
          placeholder="Search something..."
          className="neu-surface-inset"
          style={{
            flex: 1, border: "none", outline: "none",
            padding: "0 20px", height: 52, borderRadius: 26,
            color: "var(--md-on-surface)", fontSize: 15,
            fontFamily: "inherit",
          }}
        />
        <button
          onClick={search}
          className="neu-surface"
          style={{
            border: "none", padding: "0 24px", height: 52, borderRadius: 26,
            color: "var(--md-primary)", fontWeight: 600, fontSize: 14,
            cursor: "pointer", fontFamily: "inherit", flexShrink: 0,
            transition: "transform .15s, box-shadow .15s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
          onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).className = "neu-surface-inset"; }}
          onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).className = "neu-surface"; }}
        >
          Search
        </button>
      </div>

      {/* Status */}
      {loading && (
        <p className="md-label-md" style={{ color: "var(--md-on-surface-variant)", paddingLeft: 4 }}>
          Searching...
        </p>
      )}

      {/* Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {loading  && [0, 1, 2].map((i) => <SkeletonCard key={i} />)}
        {results  && results.map((r) => <ResultCard key={r.name} {...r} />)}
      </div>
    </div>
  );
}
