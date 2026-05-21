"use client";
import { useState } from "react";

/* ── Shared layout primitives for all tools ────────────────────── */

export function Row({ children, gap = 12, style }: { children: React.ReactNode; gap?: number; style?: React.CSSProperties }) {
  return <div style={{ display: "flex", gap, flexWrap: "wrap" as const, ...style }}>{children}</div>;
}

export function Col({ children, flex = 1, style }: { children: React.ReactNode; flex?: number | string; style?: React.CSSProperties }) {
  return <div style={{ flex, minWidth: 0, ...style }}>{children}</div>;
}

export function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase" as const,
      color: "var(--md-on-surface-variant)", marginBottom: 6 }}>
      {children}
    </p>
  );
}

export function TA({
  value, onChange, placeholder, rows = 5, mono = true, readOnly = false,
}: {
  value: string; onChange?: (v: string) => void; placeholder?: string;
  rows?: number; mono?: boolean; readOnly?: boolean;
}) {
  return (
    <textarea
      value={value}
      readOnly={readOnly}
      placeholder={placeholder}
      rows={rows}
      onChange={(e) => onChange?.(e.target.value)}
      style={{
        width: "100%", padding: "10px 12px", resize: "vertical" as const,
        background: "var(--md-surface-container-highest)",
        border: "1px solid var(--md-outline-variant)",
        borderRadius: 8, color: "var(--md-on-surface)",
        fontFamily: mono ? "monospace" : "inherit", fontSize: 12,
        outline: "none", boxSizing: "border-box" as const,
      }}
      onFocus={(e) => { e.target.style.borderColor = "var(--md-primary)"; }}
      onBlur={(e) => { e.target.style.borderColor = "var(--md-outline-variant)"; }}
    />
  );
}

export function Input({
  value, onChange, placeholder, type = "text",
}: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%", height: 40, padding: "0 12px",
        background: "var(--md-surface-container-highest)",
        border: "1px solid var(--md-outline-variant)",
        borderRadius: 8, color: "var(--md-on-surface)", fontSize: 13,
        outline: "none", boxSizing: "border-box" as const,
      }}
      onFocus={(e) => { e.target.style.borderColor = "var(--md-primary)"; }}
      onBlur={(e) => { e.target.style.borderColor = "var(--md-outline-variant)"; }}
    />
  );
}

export function Btn({
  children, onClick, variant = "filled", disabled = false, small = false,
}: {
  children: React.ReactNode; onClick?: () => void;
  variant?: "filled" | "outlined" | "text"; disabled?: boolean; small?: boolean;
}) {
  const base: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
    height: small ? 32 : 40, padding: `0 ${small ? 12 : 20}px`,
    borderRadius: 20, fontSize: small ? 12 : 13, fontWeight: 500, cursor: "pointer",
    border: "none", whiteSpace: "nowrap" as const,
    opacity: disabled ? 0.5 : 1, transition: "opacity .15s",
  };
  const styles: Record<string, React.CSSProperties> = {
    filled:   { ...base, background: "var(--md-primary)", color: "var(--md-on-primary)" },
    outlined: { ...base, background: "transparent", color: "var(--md-primary)", border: "1px solid var(--md-outline)" },
    text:     { ...base, background: "transparent", color: "var(--md-primary)" },
  };
  return <button style={styles[variant]} onClick={onClick} disabled={disabled}>{children}</button>;
}

export function CopyBtn({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  return (
    <Btn small variant="text" onClick={() => {
      navigator.clipboard.writeText(text);
      setOk(true); setTimeout(() => setOk(false), 2000);
    }}>
      {ok ? "✓ Copiado" : "Copiar"}
    </Btn>
  );
}

export function Section({ label, children, action, style }: { label?: string; children: React.ReactNode; action?: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ marginBottom: 20, ...style }}>
      {(label || action) && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          {label && <Label>{label}</Label>}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

export function Alert({ type, children }: { type: "error" | "success" | "info"; children: React.ReactNode }) {
  const colors = {
    error:   { bg: "color-mix(in srgb,#f87171 12%,transparent)", border: "#f87171", text: "#fca5a5" },
    success: { bg: "color-mix(in srgb,#4ade80 12%,transparent)", border: "#4ade80", text: "#86efac" },
    info:    { bg: "color-mix(in srgb,var(--md-primary) 12%,transparent)", border: "var(--md-primary)", text: "var(--md-primary)" },
  }[type];
  return (
    <div style={{ padding: "10px 14px", borderRadius: 8, background: colors.bg,
      border: `1px solid ${colors.border}`, color: colors.text, fontSize: 13 }}>
      {children}
    </div>
  );
}

export function Select({
  value, onChange, options,
}: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} style={{
      height: 40, padding: "0 12px", borderRadius: 8, fontSize: 13,
      background: "var(--md-surface-container-highest)",
      border: "1px solid var(--md-outline-variant)",
      color: "var(--md-on-surface)", outline: "none",
    }}>
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

export function Tabs({
  value, onChange, options,
}: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <div style={{ display: "flex", gap: 4, background: "var(--md-surface-container-high)",
      borderRadius: 10, padding: 4, marginBottom: 20 }}>
      {options.map((o) => (
        <button key={o.value} onClick={() => onChange(o.value)} style={{
          flex: 1, height: 32, borderRadius: 7, border: "none", cursor: "pointer",
          fontSize: 13, fontWeight: 500, transition: "background .15s, color .15s",
          background: value === o.value ? "var(--md-primary-container)" : "transparent",
          color: value === o.value ? "var(--md-on-primary-container)" : "var(--md-on-surface-variant)",
        }}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Slider({
  value, onChange, min, max, step = 1, label,
}: { value: number; onChange: (v: number) => void; min: number; max: number; step?: number; label?: string }) {
  return (
    <div>
      {label && <Label>{label}: <span style={{ color: "var(--md-primary)" }}>{value}</span></Label>}
      <input type="range" value={value} min={min} max={max} step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: "var(--md-primary)" }} />
    </div>
  );
}
