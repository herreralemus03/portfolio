"use client";
import { useState } from "react";
import { Row, Col, Label, TA, Input, Btn, CopyBtn, Section, Alert, Select, Slider } from "./ToolShell";

/* ── Timestamp Converter ──────────────────────────────────────── */
export function TimestampTool() {
  const [unix, setUnix]   = useState(String(Math.floor(Date.now()/1000)));
  const [iso,  setIso]    = useState(new Date().toISOString());
  const [human, setHuman] = useState(new Date().toLocaleString());

  function fromUnix(v: string) {
    setUnix(v);
    const d = new Date(+v * 1000);
    if (!isNaN(d.getTime())) { setIso(d.toISOString()); setHuman(d.toLocaleString()); }
  }
  function fromIso(v: string) {
    setIso(v);
    const d = new Date(v);
    if (!isNaN(d.getTime())) { setUnix(String(Math.floor(d.getTime()/1000))); setHuman(d.toLocaleString()); }
  }
  function now() {
    const d = new Date();
    setUnix(String(Math.floor(d.getTime()/1000)));
    setIso(d.toISOString()); setHuman(d.toLocaleString());
  }

  const fields = [
    { label: "Unix Epoch (segundos)", value: unix, onChange: fromUnix },
    { label: "ISO 8601",              value: iso,  onChange: fromIso },
    { label: "Humano (local)",        value: human, onChange: (v: string) => { setHuman(v); fromIso(new Date(v).toISOString()); } },
  ];

  return (
    <div>
      <Row style={{ marginBottom: 16 }}><Btn onClick={now}>🕐 Ahora</Btn></Row>
      {fields.map(f => (
        <Section key={f.label} label={f.label} action={<CopyBtn text={f.value} />}>
          <Input value={f.value} onChange={f.onChange} />
        </Section>
      ))}
      <Section label="Zonas horarias">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 8 }}>
          {["America/El_Salvador","America/New_York","Europe/Madrid","Asia/Tokyo","UTC"].map(tz => (
            <div key={tz} style={{ background: "var(--md-surface-container-highest)", borderRadius: 8, padding: "8px 12px" }}>
              <p style={{ fontSize: 10, color: "var(--md-on-surface-variant)", marginBottom: 2 }}>{tz}</p>
              <code style={{ fontSize: 12, color: "var(--md-on-surface)" }}>
                {new Date(+unix*1000).toLocaleString("es", { timeZone: tz })}
              </code>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ── Cron Builder ─────────────────────────────────────────────── */
const CRON_PRESETS = [
  { label: "Cada minuto",          value: "* * * * *" },
  { label: "Cada hora",            value: "0 * * * *" },
  { label: "Diario a medianoche",  value: "0 0 * * *" },
  { label: "Cada lunes 9am",       value: "0 9 * * 1" },
  { label: "Primer día del mes",   value: "0 0 1 * *" },
  { label: "Cada 15 minutos",      value: "*/15 * * * *" },
  { label: "Cada 6 horas",         value: "0 */6 * * *" },
];

export function CronTool() {
  const [expr, setExpr] = useState("0 9 * * 1-5");
  const [parts, setParts] = useState(["0","9","*","*","1-5"]);
  const [desc, setDesc] = useState("");
  const labels = ["Minuto (0-59)","Hora (0-23)","Día mes (1-31)","Mes (1-12)","Día semana (0-6)"];

  async function explain(e: string) {
    try {
      const cronstrue = (await import("cronstrue")).default;
      setDesc(cronstrue.toString(e, { use24HourTimeFormat: true, locale: "es" }));
    } catch { setDesc("Expresión cron inválida"); }
  }

  function update(idx: number, val: string) {
    const p = [...parts]; p[idx] = val;
    setParts(p);
    const e = p.join(" ");
    setExpr(e); explain(e);
  }

  function setPreset(v: string) { const p = v.split(" "); setParts(p); setExpr(v); explain(v); }

  return (
    <div>
      <Section label="Presets">
        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
          {CRON_PRESETS.map(p => (
            <button key={p.value} onClick={() => setPreset(p.value)} style={{
              padding: "4px 10px", borderRadius: 16, fontSize: 11, cursor: "pointer",
              background: expr === p.value ? "var(--md-primary-container)" : "var(--md-surface-container-high)",
              color: expr === p.value ? "var(--md-on-primary-container)" : "var(--md-on-surface-variant)",
              border: "none",
            }}>{p.label}</button>
          ))}
        </div>
      </Section>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8, marginBottom: 16 }}>
        {parts.map((p, i) => (
          <div key={i}>
            <Label>{labels[i]}</Label>
            <Input value={p} onChange={v => update(i, v)} />
          </div>
        ))}
      </div>
      <Section label="Expresión completa" action={<CopyBtn text={expr} />}>
        <Input value={expr} onChange={v => { setExpr(v); const p = v.split(" "); if (p.length === 5) { setParts(p); explain(v); } }} />
      </Section>
      {desc && <Alert type="info">📅 {desc}</Alert>}
    </div>
  );
}

/* ── Color Converter ──────────────────────────────────────────── */
function hexToRgb(hex: string) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? { r: parseInt(r[1],16), g: parseInt(r[2],16), b: parseInt(r[3],16) } : null;
}
function rgbToHsl(r: number, g: number, b: number) {
  r/=255; g/=255; b/=255;
  const max=Math.max(r,g,b), min=Math.min(r,g,b); let h=0, s=0;
  const l=(max+min)/2;
  if (max!==min) { const d=max-min; s=l>0.5?d/(2-max-min):d/(max+min);
    switch(max){ case r: h=((g-b)/d+(g<b?6:0))/6; break; case g: h=((b-r)/d+2)/6; break; case b: h=((r-g)/d+4)/6; break; } }
  return { h: Math.round(h*360), s: Math.round(s*100), l: Math.round(l*100) };
}
function contrastRatio(hex: string) {
  const rgb = hexToRgb(hex); if (!rgb) return null;
  const lum = (c: number) => { const n=c/255; return n<=0.03928 ? n/12.92 : Math.pow((n+0.055)/1.055, 2.4); };
  const L = 0.2126*lum(rgb.r) + 0.7152*lum(rgb.g) + 0.0722*lum(rgb.b);
  const w = 1.0576; const b = 0.0576;
  return { vs_white: ((w+0.05)/(L+0.05)).toFixed(2), vs_black: ((L+0.05)/(b+0.05)).toFixed(2) };
}

export function ColorTool() {
  const [hex, setHex] = useState("#D0BCFF");
  const rgb = hexToRgb(hex);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;
  const contrast = contrastRatio(hex);

  return (
    <div>
      <Section label="Selector de color">
        <Row>
          <input type="color" value={hex} onChange={e => setHex(e.target.value)}
            style={{ width: 64, height: 64, borderRadius: 12, border: "none", cursor: "pointer", padding: 4, background: "transparent" }} />
          <Col>
            <Input value={hex} onChange={v => setHex(v.startsWith("#") ? v : "#"+v)} placeholder="#RRGGBB" />
          </Col>
        </Row>
      </Section>
      <div style={{ width: "100%", height: 80, borderRadius: 12, background: hex, marginBottom: 16,
        boxShadow: "0 2px 8px rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 13, color: hsl && hsl.l > 50 ? "#000" : "#fff", opacity: 0.7 }}>Vista previa</span>
      </div>
      {rgb && hsl && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 8, marginBottom: 16 }}>
          {[
            { label: "HEX",  value: hex, copy: hex },
            { label: "RGB",  value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, copy: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
            { label: "HSL",  value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, copy: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
            { label: "HSV",  value: `${rgb.r} ${rgb.g} ${rgb.b}`, copy: "" },
          ].map(f => (
            <div key={f.label} style={{ background: "var(--md-surface-container-highest)", borderRadius: 8, padding: "10px 12px" }}>
              <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase" as const, color: "var(--md-on-surface-variant)", marginBottom: 4 }}>{f.label}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <code style={{ fontSize: 12, color: "var(--md-on-surface)" }}>{f.value}</code>
                {f.copy && <CopyBtn text={f.copy} />}
              </div>
            </div>
          ))}
        </div>
      )}
      {contrast && (
        <Section label="Contraste WCAG (ratio)">
          <Row gap={8}>
            {[["vs Blanco", contrast.vs_white], ["vs Negro", contrast.vs_black]].map(([l, r]) => (
              <div key={l} style={{ flex: 1, background: "var(--md-surface-container-highest)", borderRadius: 8, padding: "10px 14px", textAlign: "center" as const }}>
                <p style={{ fontSize: 11, color: "var(--md-on-surface-variant)", marginBottom: 4 }}>{l}</p>
                <span style={{ fontSize: 22, fontWeight: 700, color: +r >= 4.5 ? "#4ade80" : "#f97316" }}>{r}:1</span>
                <p style={{ fontSize: 10, color: +r >= 7 ? "#4ade80" : +r >= 4.5 ? "#84cc16" : "#f97316" }}>
                  {+r >= 7 ? "AAA ✓" : +r >= 4.5 ? "AA ✓" : "Falla"}
                </p>
              </div>
            ))}
          </Row>
        </Section>
      )}
    </div>
  );
}

/* ── Number Base Converter ────────────────────────────────────── */
export function NumberBaseTool() {
  const [val, setVal] = useState("255");
  const [from, setFrom] = useState("10");
  const num = parseInt(val, +from);
  const ok = !isNaN(num) && num >= 0;

  const conversions = ok ? [
    { base: 2,  label: "Binario (2)",       prefix: "0b", value: num.toString(2) },
    { base: 8,  label: "Octal (8)",         prefix: "0o", value: num.toString(8) },
    { base: 10, label: "Decimal (10)",      prefix: "",   value: num.toString(10) },
    { base: 16, label: "Hexadecimal (16)",  prefix: "0x", value: num.toString(16).toUpperCase() },
  ] : [];

  return (
    <div>
      <Row>
        <Col><Section label="Número de entrada"><Input value={val} onChange={setVal} placeholder="255" /></Section></Col>
        <Col flex="0 0 160px">
          <Section label="Base de entrada">
            <Select value={from} onChange={setFrom} options={[{value:"2",label:"Binario (2)"},{value:"8",label:"Octal (8)"},{value:"10",label:"Decimal (10)"},{value:"16",label:"Hexadecimal (16)"}]} />
          </Section>
        </Col>
      </Row>
      {!ok && val && <Alert type="error">Número inválido para la base seleccionada.</Alert>}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
        {conversions.map(c => (
          <div key={c.base} style={{ background: "var(--md-surface-container-highest)", borderRadius: 8, padding: "10px 14px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            borderLeft: `3px solid ${+from === c.base ? "var(--md-primary)" : "transparent"}` }}>
            <span style={{ fontSize: 12, color: "var(--md-on-surface-variant)", width: 140 }}>{c.label}</span>
            <code style={{ flex: 1, fontSize: 14, color: "var(--md-on-surface)", fontWeight: +from === c.base ? 700 : 400 }}>
              {c.prefix}{c.value}
            </code>
            <CopyBtn text={c.prefix + c.value} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Diff Checker ─────────────────────────────────────────────── */
export function DiffTool() {
  const [left, setLeft] = useState("Hola mundo\nEsta línea existe\nFin del texto");
  const [right, setRight] = useState("Hola mundo\nEsta línea fue modificada\nNueva línea añadida\nFin del texto");
  const [result, setResult] = useState<{value: string; added?: boolean; removed?: boolean}[]>([]);

  async function compare() {
    const { diffLines } = await import("diff");
    setResult(diffLines(left, right));
  }

  return (
    <div>
      <Row>
        <Col><Section label="Texto A (original)"><TA value={left}  onChange={setLeft}  rows={8} mono={false} /></Section></Col>
        <Col><Section label="Texto B (modificado)"><TA value={right} onChange={setRight} rows={8} mono={false} /></Section></Col>
      </Row>
      <Btn onClick={compare}>📊 Comparar</Btn>
      {result.length > 0 && (
        <Section label="Diferencias" style={{ marginTop: 16 }}>
          <div style={{ background: "var(--md-surface-container-highest)", borderRadius: 8, padding: "12px", fontFamily: "monospace", fontSize: 12, lineHeight: 1.8 }}>
            {result.map((part, i) => (
              <span key={i} style={{
                display: "block",
                background: part.added ? "color-mix(in srgb,#4ade80 15%,transparent)"
                  : part.removed ? "color-mix(in srgb,#f87171 15%,transparent)" : "transparent",
                color: part.added ? "#4ade80" : part.removed ? "#f87171" : "var(--md-on-surface)",
                padding: "0 8px", borderRadius: 4,
              }}>
                {(part.added ? "+ " : part.removed ? "- " : "  ") + part.value.replace(/\n$/, "")}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 8, fontSize: 12 }}>
            <span style={{ color: "#4ade80" }}>+ {result.filter(p=>p.added).length} añadidas</span>
            <span style={{ color: "#f87171" }}>- {result.filter(p=>p.removed).length} eliminadas</span>
          </div>
        </Section>
      )}
    </div>
  );
}

/* ── UUID Generator ───────────────────────────────────────────── */
export function UuidTool() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);
  const [validate, setValidate] = useState("");

  function gen() { setUuids(Array.from({length: count}, () => crypto.randomUUID())); }
  const isValid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(validate);

  return (
    <div>
      <Section><Slider value={count} onChange={setCount} min={1} max={20} label="Cantidad a generar" /></Section>
      <Row style={{ marginBottom: 20 }}><Btn onClick={gen}>🆔 Generar UUIDs v4</Btn></Row>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
        {uuids.map((u, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8,
            background: "var(--md-surface-container-highest)", borderRadius: 8, padding: "8px 12px" }}>
            <code style={{ flex: 1, fontSize: 13, color: "var(--md-on-surface)" }}>{u}</code>
            <CopyBtn text={u} />
          </div>
        ))}
      </div>
      {uuids.length > 0 && <div style={{ marginBottom: 12 }}><CopyBtn text={uuids.join("\n")} /></div>}
      <Section label="Validar UUID">
        <Input value={validate} onChange={setValidate} placeholder="550e8400-e29b-41d4-a716-446655440000" />
        {validate && <p style={{ fontSize: 12, marginTop: 6, color: isValid ? "#4ade80" : "#f87171" }}>
          {isValid ? "✓ UUID v4 válido" : "✗ UUID inválido"}
        </p>}
      </Section>
    </div>
  );
}
