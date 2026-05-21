"use client";
import { useState } from "react";
import { Row, Col, Label, TA, Input, Btn, CopyBtn, Section, Alert } from "./ToolShell";

/* ── URL Parser ───────────────────────────────────────────────── */
export function UrlParserTool() {
  const [input, setInput] = useState("https://usuario:pass@ejemplo.com:8080/ruta/página?clave=valor&otro=123#ancla");
  let parsed: URL | null = null; let err = "";
  try { parsed = new URL(input); } catch { err = "URL inválida"; }
  const fields = parsed ? [
    ["protocol",  parsed.protocol],
    ["username",  parsed.username],
    ["password",  parsed.password],
    ["hostname",  parsed.hostname],
    ["port",      parsed.port || "(por defecto)"],
    ["pathname",  parsed.pathname],
    ["search",    parsed.search],
    ["hash",      parsed.hash],
    ["origin",    parsed.origin],
  ] : [];
  const params = parsed ? [...parsed.searchParams.entries()] : [];

  return (
    <div>
      <Section label="URL a analizar"><Input value={input} onChange={setInput} placeholder="https://ejemplo.com/ruta?q=valor" /></Section>
      {err && <Alert type="error">{err}</Alert>}
      {parsed && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 8, marginBottom: 16 }}>
            {fields.filter(([,v]) => v).map(([k, v]) => (
              <div key={k} style={{ background: "var(--md-surface-container-highest)", borderRadius: 8, padding: "8px 12px" }}>
                <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase" as const, color: "var(--md-on-surface-variant)", marginBottom: 2 }}>{k}</p>
                <code style={{ fontSize: 12, color: "var(--md-primary)", wordBreak: "break-all" as const }}>{v}</code>
              </div>
            ))}
          </div>
          {params.length > 0 && (
            <Section label="Query Params">
              <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 13 }}>
                <thead><tr>{["Parámetro","Valor"].map(h => <th key={h} style={{ textAlign: "left" as const, padding: "6px 10px", background: "var(--md-surface-container-high)", color: "var(--md-on-surface-variant)", fontSize: 11 }}>{h}</th>)}</tr></thead>
                <tbody>{params.map(([k,v], i) => (
                  <tr key={i}>{[k,v].map((c,j) => <td key={j} style={{ padding: "6px 10px", borderTop: "1px solid var(--md-outline-variant)", color: "var(--md-on-surface)" }}><code style={{ fontSize: 12 }}>{c}</code></td>)}</tr>
                ))}</tbody>
              </table>
            </Section>
          )}
        </>
      )}
    </div>
  );
}

/* ── Regex Tester ─────────────────────────────────────────────── */
export function RegexTool() {
  const [pattern, setPattern] = useState("\\b\\w{5}\\b"); const [flags, setFlags] = useState("g");
  const [text, setText] = useState("Hola mundo desde el editor de expresiones regulares");
  let regex: RegExp | null = null; let matches: RegExpMatchArray[] = []; let regexErr = "";
  try {
    regex = new RegExp(pattern, flags);
    matches = [...text.matchAll(new RegExp(pattern, flags.includes("g") ? flags : flags + "g"))];
  } catch(e: unknown) { regexErr = String(e); }

  function highlight() {
    if (!regex || !pattern) return text;
    const parts: { text: string; match: boolean }[] = [];
    let last = 0;
    for (const m of matches) {
      const start = m.index ?? 0;
      if (start > last) parts.push({ text: text.slice(last, start), match: false });
      parts.push({ text: m[0], match: true });
      last = start + m[0].length;
    }
    if (last < text.length) parts.push({ text: text.slice(last), match: false });
    return parts;
  }

  const highlighted = highlight();

  return (
    <div>
      <Row>
        <Col><Section label="Expresión regular"><Input value={pattern} onChange={setPattern} placeholder="\\d+" /></Section></Col>
        <Col flex="0 0 100px"><Section label="Flags"><Input value={flags} onChange={setFlags} placeholder="gi" /></Section></Col>
      </Row>
      {regexErr && <Alert type="error">{regexErr}</Alert>}
      <Section label="Texto de prueba"><TA value={text} onChange={setText} rows={4} mono={false} /></Section>
      <Section label={`Matches encontrados: ${matches.length}`}>
        <div style={{ padding: "12px 14px", background: "var(--md-surface-container-highest)", borderRadius: 8,
          fontSize: 14, lineHeight: 1.8, wordBreak: "break-word" as const, minHeight: 60 }}>
          {Array.isArray(highlighted)
            ? highlighted.map((p, i) => p.match
              ? <mark key={i} style={{ background: "color-mix(in srgb,var(--md-primary) 30%,transparent)", color: "var(--md-on-surface)", borderRadius: 3, padding: "0 2px" }}>{p.text}</mark>
              : <span key={i}>{p.text}</span>)
            : highlighted}
        </div>
      </Section>
      {matches.length > 0 && (
        <Section label="Lista de matches">
          {matches.map((m, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "4px 0", borderBottom: "1px solid var(--md-outline-variant)", fontSize: 12 }}>
              <span style={{ color: "var(--md-outline)", width: 24 }}>#{i+1}</span>
              <code style={{ color: "var(--md-primary)" }}>{m[0]}</code>
              <span style={{ color: "var(--md-outline)", marginLeft: "auto" }}>idx: {m.index}</span>
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}

/* ── CORS Header Builder ──────────────────────────────────────── */
export function CorsTool() {
  const [origin, setOrigin] = useState("https://miapp.com");
  const [methods, setMethods] = useState({ GET: true, POST: true, PUT: true, DELETE: true, PATCH: false, OPTIONS: true });
  const [headers, setHeaders] = useState("Content-Type, Authorization");
  const [credentials, setCredentials] = useState(false);
  const [maxAge, setMaxAge] = useState("86400");

  const result = [
    `Access-Control-Allow-Origin: ${origin || "*"}`,
    `Access-Control-Allow-Methods: ${Object.entries(methods).filter(([,v])=>v).map(([k])=>k).join(", ")}`,
    headers && `Access-Control-Allow-Headers: ${headers}`,
    credentials && `Access-Control-Allow-Credentials: true`,
    maxAge && `Access-Control-Max-Age: ${maxAge}`,
  ].filter(Boolean).join("\n");

  return (
    <div>
      <Section label="Origin permitido"><Input value={origin} onChange={setOrigin} placeholder="https://miapp.com  ó  *" /></Section>
      <Section label="Métodos HTTP permitidos">
        <Row gap={8}>{Object.keys(methods).map(m => (
          <label key={m} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, cursor: "pointer", color: "var(--md-on-surface-variant)" }}>
            <input type="checkbox" checked={methods[m as keyof typeof methods]}
              onChange={e => setMethods(ms => ({...ms, [m]: e.target.checked}))}
              style={{ accentColor: "var(--md-primary)" }} />
            {m}
          </label>
        ))}</Row>
      </Section>
      <Section label="Headers permitidos"><Input value={headers} onChange={setHeaders} placeholder="Content-Type, Authorization" /></Section>
      <Row>
        <Col>
          <Section label="Max-Age (segundos)"><Input value={maxAge} onChange={setMaxAge} placeholder="86400" /></Section>
        </Col>
        <Col flex="0 0 auto" style={{ paddingTop: 20 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--md-on-surface-variant)", cursor: "pointer" }}>
            <input type="checkbox" checked={credentials} onChange={e => setCredentials(e.target.checked)} style={{ accentColor: "var(--md-primary)" }} />
            Allow-Credentials
          </label>
        </Col>
      </Row>
      <Section label="Headers generados" action={<CopyBtn text={result} />}>
        <TA value={result} rows={6} readOnly />
      </Section>
    </div>
  );
}

/* ── HTTP Status Codes ────────────────────────────────────────── */
const HTTP_CODES = [
  // 1xx
  [100,"Continue"],[101,"Switching Protocols"],[102,"Processing"],
  // 2xx
  [200,"OK"],[201,"Created"],[202,"Accepted"],[204,"No Content"],[206,"Partial Content"],
  // 3xx
  [301,"Moved Permanently"],[302,"Found"],[304,"Not Modified"],[307,"Temporary Redirect"],[308,"Permanent Redirect"],
  // 4xx
  [400,"Bad Request"],[401,"Unauthorized"],[403,"Forbidden"],[404,"Not Found"],[405,"Method Not Allowed"],
  [408,"Request Timeout"],[409,"Conflict"],[410,"Gone"],[413,"Payload Too Large"],[422,"Unprocessable Entity"],
  [429,"Too Many Requests"],
  // 5xx
  [500,"Internal Server Error"],[501,"Not Implemented"],[502,"Bad Gateway"],[503,"Service Unavailable"],[504,"Gateway Timeout"],
] as [number, string][];

const codeColor = (c: number) => c < 200 ? "#6b7280" : c < 300 ? "#22c55e" : c < 400 ? "#3b82f6" : c < 500 ? "#f97316" : "#ef4444";

export function HttpStatusTool() {
  const [search, setSearch] = useState("");
  const filtered = HTTP_CODES.filter(([c, d]) => String(c).includes(search) || d.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <Section label="Buscar código o descripción"><Input value={search} onChange={setSearch} placeholder="404, Not Found, 5xx…" /></Section>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 8 }}>
        {filtered.map(([code, desc]) => (
          <div key={code} style={{ background: "var(--md-surface-container-highest)", borderRadius: 8, padding: "10px 14px",
            borderLeft: `3px solid ${codeColor(code)}` }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: codeColor(code), display: "block" }}>{code}</span>
            <span style={{ fontSize: 12, color: "var(--md-on-surface-variant)" }}>{desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── User Agent Parser ────────────────────────────────────────── */
export function UserAgentTool() {
  const [ua, setUa] = useState(typeof navigator !== "undefined" ? navigator.userAgent : "");
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  async function parse() {
    const { UAParser } = await import("ua-parser-js");
    const p = new UAParser(ua);
    setResult(p.getResult() as unknown as Record<string, unknown>);
  }
  return (
    <div>
      <Section label="User Agent string"><TA value={ua} onChange={setUa} rows={3} /></Section>
      <Row style={{ marginBottom: 16 }}><Btn onClick={parse}>🔍 Parsear</Btn></Row>
      {result && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 8 }}>
          {(["browser","engine","os","device","cpu"] as const).map(k => (
            <div key={k} style={{ background: "var(--md-surface-container-highest)", borderRadius: 8, padding: "10px 14px" }}>
              <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase" as const, color: "var(--md-on-surface-variant)", marginBottom: 6 }}>{k}</p>
              {Object.entries(result[k] as Record<string,string> ?? {}).filter(([,v]) => v).map(([f, v]) => (
                <p key={f} style={{ fontSize: 12, color: "var(--md-on-surface)" }}><span style={{ color: "var(--md-outline)" }}>{f}: </span>{v}</p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
