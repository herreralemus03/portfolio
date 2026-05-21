"use client";
import { useState } from "react";
import { Row, TA, Btn, CopyBtn, Section } from "./ToolShell";

/* ── Text Statistics ──────────────────────────────────────────── */
export function TextStatsTool() {
  const [text, setText] = useState("");
  const words    = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars    = text.length;
  const noSpace  = text.replace(/\s/g,"").length;
  const sentences= text.split(/[.!?]+/).filter(s => s.trim()).length;
  const paras    = text.split(/\n\n+/).filter(p => p.trim()).length;
  const readTime = Math.ceil(words / 200);

  const freq = text.trim()
    ? Object.entries(
        text.toLowerCase().replace(/[^a-záéíóúüñ\s]/gi,"").split(/\s+/)
          .filter(w => w.length > 2)
          .reduce((acc: Record<string,number>, w) => { acc[w] = (acc[w]||0)+1; return acc; }, {})
      ).sort(([,a],[,b]) => b-a).slice(0, 10)
    : [];

  const stats = [
    { label: "Palabras",         value: words },
    { label: "Caracteres",       value: chars },
    { label: "Sin espacios",     value: noSpace },
    { label: "Oraciones",        value: sentences },
    { label: "Párrafos",         value: paras },
    { label: "Tiempo lectura",   value: `${readTime} min` },
  ];

  return (
    <div>
      <Section label="Texto a analizar">
        <TA value={text} onChange={setText} placeholder="Pega o escribe tu texto aquí…" rows={8} mono={false} />
      </Section>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))", gap: 8, marginBottom: 16 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: "var(--md-surface-container-highest)", borderRadius: 8, padding: "12px 14px", textAlign: "center" as const }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: "var(--md-primary)", display: "block" }}>{s.value}</span>
            <span style={{ fontSize: 11, color: "var(--md-on-surface-variant)" }}>{s.label}</span>
          </div>
        ))}
      </div>
      {freq.length > 0 && (
        <Section label="Palabras más frecuentes">
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {freq.map(([word, count], i) => (
              <div key={word} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 11, color: "var(--md-outline)", width: 16 }}>#{i+1}</span>
                <div style={{ flex: 1, background: "var(--md-surface-container-high)", borderRadius: 4, height: 20, overflow: "hidden" }}>
                  <div style={{ width: `${(count/freq[0][1])*100}%`, height: "100%",
                    background: "color-mix(in srgb,var(--md-primary) 40%,transparent)", borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: 12, color: "var(--md-on-surface)", width: 100 }}>{word}</span>
                <span style={{ fontSize: 12, color: "var(--md-primary)", width: 24, textAlign: "right" as const }}>{count}</span>
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

/* ── Case Converter ───────────────────────────────────────────── */
const CONVERSIONS: { label: string; fn: (s: string) => string }[] = [
  { label: "lowercase",    fn: s => s.toLowerCase() },
  { label: "UPPERCASE",    fn: s => s.toUpperCase() },
  { label: "Title Case",   fn: s => s.replace(/\w\S*/g, w => w[0].toUpperCase()+w.slice(1).toLowerCase()) },
  { label: "camelCase",    fn: s => s.toLowerCase().replace(/[^a-z0-9]+(.)/gi, (_,c) => c.toUpperCase()).replace(/^./, c => c.toLowerCase()) },
  { label: "PascalCase",   fn: s => s.toLowerCase().replace(/[^a-z0-9]+(.)/gi, (_,c) => c.toUpperCase()).replace(/^./, c => c.toUpperCase()) },
  { label: "snake_case",   fn: s => s.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g,"") },
  { label: "kebab-case",   fn: s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g,"") },
  { label: "SCREAMING_SNAKE", fn: s => s.toUpperCase().replace(/[^A-Z0-9]+/g,"_").replace(/^_|_$/g,"") },
  { label: "dot.case",     fn: s => s.toLowerCase().replace(/[^a-z0-9]+/g,".").replace(/^\.|\.$/g,"") },
  { label: "Sentence case", fn: s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() },
];

export function CaseTool() {
  const [input, setInput] = useState("hola mundo desarrollador full stack");

  return (
    <div>
      <Section label="Texto de entrada">
        <TA value={input} onChange={setInput} placeholder="Ingresa tu texto…" rows={3} mono={false} />
      </Section>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {CONVERSIONS.map(c => {
          const result = c.fn(input);
          return (
            <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 12,
              background: "var(--md-surface-container-highest)", borderRadius: 8, padding: "10px 14px" }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--md-on-surface-variant)", width: 140, flexShrink: 0 }}>{c.label}</span>
              <code style={{ flex: 1, fontSize: 13, color: "var(--md-on-surface)", wordBreak: "break-all" as const }}>{result}</code>
              <CopyBtn text={result} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
