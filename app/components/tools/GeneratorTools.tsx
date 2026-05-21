"use client";
import { useState } from "react";
import { Row, Col, Input, Btn, CopyBtn, Section, Alert, Slider } from "./ToolShell";
import { DebitCardDemo } from "../demos/DebitCard";

/* ── QR Code ──────────────────────────────────────────────────── */
export function QrTool() {
  const [text, setText] = useState("https://herreralemus03.github.io/portfolio");
  const [size, setSize] = useState(250);
  const [qr, setQr] = useState("");
  const [err, setErr] = useState("");
  const [dark, setDark] = useState("#D0BCFF");
  const [light, setLight] = useState("#141218");

  async function generate() {
    setErr("");
    try {
      const QRCode = (await import("qrcode")).default;
      const url = await QRCode.toDataURL(text, { width: size, color: { dark, light }, margin: 2 });
      setQr(url);
    } catch(e: unknown) { setErr(String(e)); }
  }

  function download() {
    const a = document.createElement("a");
    a.href = qr; a.download = "qrcode.png"; a.click();
  }

  return (
    <div>
      <Section label="Texto o URL">
        <Input value={text} onChange={setText} placeholder="https://ejemplo.com o cualquier texto…" />
      </Section>
      <Row>
        <Col><Slider value={size} onChange={setSize} min={128} max={512} step={8} label="Tamaño (px)" /></Col>
        <Col flex="0 0 auto">
          <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, color: "var(--md-on-surface-variant)", marginBottom: 6 }}>Color QR</p>
          <input type="color" value={dark} onChange={e => setDark(e.target.value)} style={{ width: 40, height: 36, borderRadius: 6, border: "none", cursor: "pointer", padding: 2 }} />
        </Col>
        <Col flex="0 0 auto">
          <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, color: "var(--md-on-surface-variant)", marginBottom: 6 }}>Fondo</p>
          <input type="color" value={light} onChange={e => setLight(e.target.value)} style={{ width: 40, height: 36, borderRadius: 6, border: "none", cursor: "pointer", padding: 2 }} />
        </Col>
      </Row>
      <Row style={{ marginTop: 12, marginBottom: 16 }}><Btn onClick={generate}>▦ Generar QR</Btn></Row>
      {err && <Alert type="error">{err}</Alert>}
      {qr && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <img src={qr} alt="QR Code" style={{ borderRadius: 12, border: "1px solid var(--md-outline-variant)" }} />
          <Row><Btn onClick={download}>⬇ Descargar PNG</Btn></Row>
        </div>
      )}
    </div>
  );
}

/* ── Lorem Ipsum ──────────────────────────────────────────────── */
const LOREM = "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(" ");

function loremWords(n: number) {
  const words: string[] = [];
  while (words.length < n) words.push(...LOREM.slice(0, Math.min(n - words.length, LOREM.length)));
  const out = words.slice(0, n);
  out[0] = out[0][0].toUpperCase() + out[0].slice(1);
  return out.join(" ") + ".";
}
function loremSentences(n: number) {
  return Array.from({length: n}, (_, i) => loremWords(10 + (i%3)*5)).join(" ");
}
function loremParagraphs(n: number) {
  return Array.from({length: n}, (_, i) => loremSentences(3 + i%2)).join("\n\n");
}

export function LoremTool() {
  const [mode, setMode] = useState("paragraphs");
  const [amount, setAmount] = useState(3);
  const [out, setOut] = useState("");

  function gen() {
    setOut(mode === "words" ? loremWords(amount) : mode === "sentences" ? loremSentences(amount) : loremParagraphs(amount));
  }

  const modes = [{value:"words",label:"Palabras"},{value:"sentences",label:"Oraciones"},{value:"paragraphs",label:"Párrafos"}];

  return (
    <div>
      <Row style={{ marginBottom: 16 }}>
        {modes.map(m => (
          <button key={m.value} onClick={() => setMode(m.value)} style={{
            padding: "6px 16px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500,
            background: mode === m.value ? "var(--md-primary-container)" : "var(--md-surface-container-high)",
            color: mode === m.value ? "var(--md-on-primary-container)" : "var(--md-on-surface-variant)",
          }}>{m.label}</button>
        ))}
      </Row>
      <Section><Slider value={amount} onChange={setAmount} min={1} max={mode==="paragraphs"?10:mode==="sentences"?20:100} label={`Cantidad de ${modes.find(m=>m.value===mode)?.label?.toLowerCase()}`} /></Section>
      <Row style={{ marginBottom: 16 }}><Btn onClick={gen}>📜 Generar</Btn></Row>
      {out && (
        <Section action={<CopyBtn text={out} />}>
          <div style={{ padding: "12px 14px", background: "var(--md-surface-container-highest)", borderRadius: 8,
            fontSize: 14, lineHeight: 1.8, color: "var(--md-on-surface-variant)", whiteSpace: "pre-wrap" as const }}>
            {out}
          </div>
        </Section>
      )}
    </div>
  );
}

/* ── Debit Card (migrated) ────────────────────────────────────── */
export function DebitCardTool({ lang }: { lang: string }) {
  return <DebitCardDemo lang={lang} />;
}
