"use client";
import { useState } from "react";
import { Row, Col, Label, TA, Input, Btn, CopyBtn, Section, Alert, Tabs } from "./ToolShell";

/* ── JSON Formatter ───────────────────────────────────────────── */
export function JsonTool() {
  const [input, setInput] = useState(""); const [out, setOut] = useState(""); const [err, setErr] = useState("");
  const run = (fn: (v: unknown) => string) => {
    try { setErr(""); setOut(fn(JSON.parse(input))); } catch (e: unknown) { setErr(String(e)); }
  };
  return (
    <div>
      <Section label="JSON de entrada">
        <TA value={input} onChange={setInput} placeholder='{"key": "value"}' rows={7} />
      </Section>
      <Row style={{ marginBottom: 16 }}>
        <Btn onClick={() => run(v => JSON.stringify(v, null, 2))}>✨ Prettify</Btn>
        <Btn variant="outlined" onClick={() => run(v => JSON.stringify(v))}>📦 Minify</Btn>
        <Btn variant="outlined" onClick={() => { try { JSON.parse(input); setErr(""); setOut("✓ JSON válido"); } catch(e: unknown) { setErr(String(e)); } }}>✅ Validar</Btn>
        <Btn variant="text" onClick={() => { setInput(""); setOut(""); setErr(""); }}>Limpiar</Btn>
      </Row>
      {err && <Alert type="error">{err}</Alert>}
      {out && <Section label="Resultado" action={<CopyBtn text={out} />}><TA value={out} rows={8} readOnly /></Section>}
    </div>
  );
}

/* ── Base64 ───────────────────────────────────────────────────── */
export function Base64Tool() {
  const [tab, setTab] = useState("text"); const [mode, setMode] = useState("encode");
  const [input, setInput] = useState(""); const [out, setOut] = useState(""); const [err, setErr] = useState("");
  const [imgSrc, setImgSrc] = useState("");

  function run() {
    setErr(""); setOut("");
    try {
      if (mode === "encode") setOut(btoa(unescape(encodeURIComponent(input))));
      else setOut(decodeURIComponent(escape(atob(input.replace(/\s+/g,"")))));
    } catch(e: unknown) { setErr(String(e)); }
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => { const s = r.result as string; setImgSrc(s); setOut(s.split(",")[1] ?? s); };
    r.readAsDataURL(f);
  }

  return (
    <div>
      <Tabs value={tab} onChange={setTab} options={[{value:"text",label:"Texto"},{value:"file",label:"Archivo / Imagen"}]} />
      {tab === "text" && (
        <>
          <Tabs value={mode} onChange={setMode} options={[{value:"encode",label:"Encode"},{value:"decode",label:"Decode"}]} />
          <Section label="Entrada"><TA value={input} onChange={setInput} placeholder={mode==="encode"?"Texto a codificar…":"Base64 a decodificar…"} rows={4} /></Section>
          <Row style={{ marginBottom: 16 }}><Btn onClick={run}>⚡ {mode === "encode" ? "Codificar" : "Decodificar"}</Btn></Row>
        </>
      )}
      {tab === "file" && (
        <Section label="Seleccionar archivo">
          <input type="file" onChange={onFile} style={{ color: "var(--md-on-surface)", fontSize: 13 }} />
          {imgSrc && imgSrc.startsWith("data:image") && (
            <img src={imgSrc} alt="preview" style={{ maxWidth: "100%", maxHeight: 150, marginTop: 12, borderRadius: 8 }} />
          )}
        </Section>
      )}
      {err && <Alert type="error">{err}</Alert>}
      {out && <Section label="Resultado" action={<CopyBtn text={out} />}><TA value={out} rows={4} readOnly /></Section>}
    </div>
  );
}

/* ── URL Encode/Decode ────────────────────────────────────────── */
export function UrlEncodeTool() {
  const [mode, setMode] = useState("encode"); const [input, setInput] = useState(""); const [out, setOut] = useState("");
  function run() {
    try { setOut(mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input)); }
    catch(e: unknown) { setOut("Error: " + String(e)); }
  }
  return (
    <div>
      <Tabs value={mode} onChange={setMode} options={[{value:"encode",label:"Encode"},{value:"decode",label:"Decode"}]} />
      <Section label="Entrada"><TA value={input} onChange={setInput} placeholder={mode==="encode"?"https://ejemplo.com/búsqueda?q=hola mundo":"https%3A%2F%2Fejemplo.com..."} rows={4} /></Section>
      <Row style={{ marginBottom: 16 }}><Btn onClick={run}>⚡ {mode === "encode" ? "Codificar" : "Decodificar"}</Btn></Row>
      {out && <Section label="Resultado" action={<CopyBtn text={out} />}><TA value={out} rows={4} readOnly /></Section>}
    </div>
  );
}

/* ── JSON ↔ CSV ───────────────────────────────────────────────── */
function jsonToCsv(json: string): string {
  const arr = JSON.parse(json);
  if (!Array.isArray(arr) || !arr.length) throw new Error("Se esperaba un array de objetos");
  const keys = Object.keys(arr[0]);
  return [keys.join(","), ...arr.map((row: Record<string, unknown>) => keys.map(k => JSON.stringify(row[k] ?? "")).join(","))].join("\n");
}
function csvToJson(csv: string): string {
  const [header, ...rows] = csv.trim().split("\n").map(r => r.split(",").map(c => c.replace(/^"|"$/g,"")));
  return JSON.stringify(rows.map(row => Object.fromEntries(header.map((h,i) => [h, row[i]]))), null, 2);
}

export function JsonCsvTool() {
  const [mode, setMode] = useState("json2csv"); const [input, setInput] = useState(""); const [out, setOut] = useState(""); const [err, setErr] = useState("");
  function run() {
    setErr(""); setOut("");
    try { setOut(mode === "json2csv" ? jsonToCsv(input) : csvToJson(input)); }
    catch(e: unknown) { setErr(String(e)); }
  }
  return (
    <div>
      <Tabs value={mode} onChange={setMode} options={[{value:"json2csv",label:"JSON → CSV"},{value:"csv2json",label:"CSV → JSON"}]} />
      <Section label="Entrada"><TA value={input} onChange={setInput} placeholder={mode==="json2csv"?'[{"name":"Alice","age":30},{"name":"Bob","age":25}]':"name,age\nAlice,30\nBob,25"} rows={7} /></Section>
      <Row style={{ marginBottom: 16 }}><Btn onClick={run}>⚡ Convertir</Btn></Row>
      {err && <Alert type="error">{err}</Alert>}
      {out && <Section label="Resultado" action={<CopyBtn text={out} />}><TA value={out} rows={8} readOnly /></Section>}
    </div>
  );
}

/* ── YAML ↔ JSON ──────────────────────────────────────────────── */
export function YamlJsonTool() {
  const [mode, setMode] = useState("yaml2json"); const [input, setInput] = useState(""); const [out, setOut] = useState(""); const [err, setErr] = useState("");
  async function run() {
    setErr(""); setOut("");
    try {
      const yaml = await import("js-yaml");
      if (mode === "yaml2json") setOut(JSON.stringify(yaml.load(input), null, 2));
      else setOut(yaml.dump(JSON.parse(input)));
    } catch(e: unknown) { setErr(String(e)); }
  }
  return (
    <div>
      <Tabs value={mode} onChange={setMode} options={[{value:"yaml2json",label:"YAML → JSON"},{value:"json2yaml",label:"JSON → YAML"}]} />
      <Section label="Entrada"><TA value={input} onChange={setInput} placeholder={mode==="yaml2json"?"name: Alice\nage: 30":'{"name":"Alice","age":30}'} rows={8} /></Section>
      <Row style={{ marginBottom: 16 }}><Btn onClick={run}>⚡ Convertir</Btn></Row>
      {err && <Alert type="error">{err}</Alert>}
      {out && <Section label="Resultado" action={<CopyBtn text={out} />}><TA value={out} rows={8} readOnly /></Section>}
    </div>
  );
}

/* ── Markdown Preview ─────────────────────────────────────────── */
export function MarkdownTool() {
  const [md, setMd] = useState(`# Título\n\nEscribe **markdown** aquí y ve el preview en tiempo real.\n\n- Item 1\n- Item 2\n\n\`\`\`js\nconsole.log("Hola mundo");\n\`\`\``);
  const [html, setHtml] = useState("");

  async function parse(v: string) {
    const { marked } = await import("marked");
    setHtml(await marked(v));
  }

  return (
    <div>
      <Row gap={0} style={{ alignItems: "stretch" }}>
        <Col>
          <Label>Editor</Label>
          <TA value={md} onChange={v => { setMd(v); parse(v); }} rows={16} />
        </Col>
        <div style={{ width: 1, background: "var(--md-outline-variant)", margin: "20px 12px 0" }} />
        <Col>
          <Label>Preview</Label>
          <div
            dangerouslySetInnerHTML={{ __html: html }}
            style={{ minHeight: 280, padding: "10px 14px", background: "var(--md-surface-container-highest)",
              borderRadius: 8, fontSize: 14, lineHeight: 1.7, color: "var(--md-on-surface)",
              border: "1px solid var(--md-outline-variant)", overflowY: "auto" as const }}
          />
        </Col>
      </Row>
      <style>{`
        .md-preview h1,.md-preview h2,.md-preview h3{color:var(--md-on-surface);margin:12px 0 6px}
        .md-preview code{background:var(--md-surface-container-high);padding:2px 6px;border-radius:4px;font-size:12px}
        .md-preview pre{background:var(--md-surface-container-high);padding:12px;border-radius:8px}
        .md-preview ul{padding-left:20px}
      `}</style>
    </div>
  );
}

/* ── HTML Entities ────────────────────────────────────────────── */
const ENT: Record<string, string> = {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};
const DEC: Record<string, string> = Object.fromEntries(Object.entries(ENT).map(([k,v])=>[v,k]));

export function HtmlEntitiesTool() {
  const [mode, setMode] = useState("encode"); const [input, setInput] = useState(""); const [out, setOut] = useState("");
  function run() {
    if (mode === "encode") setOut(input.replace(/[&<>"']/g, c => ENT[c]));
    else setOut(input.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, e => DEC[e] ?? e));
  }
  return (
    <div>
      <Tabs value={mode} onChange={setMode} options={[{value:"encode",label:"Encode"},{value:"decode",label:"Decode"}]} />
      <Section label="Entrada"><TA value={input} onChange={setInput} placeholder={mode==="encode"?'<h1>Hola & "Mundo"</h1>':"&lt;h1&gt;Hola &amp; &quot;Mundo&quot;&lt;/h1&gt;"} rows={5} /></Section>
      <Row style={{ marginBottom: 16 }}><Btn onClick={run}>⚡ {mode === "encode" ? "Codificar" : "Decodificar"}</Btn></Row>
      {out && <Section label="Resultado" action={<CopyBtn text={out} />}><TA value={out} rows={5} readOnly /></Section>}
    </div>
  );
}
