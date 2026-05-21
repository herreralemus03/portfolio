"use client";
import { useState } from "react";
import { Row, Col, Label, TA, Input, Btn, CopyBtn, Section, Alert, Select, Tabs, Slider } from "./ToolShell";

/* ── RSA ──────────────────────────────────────────────────────── */
function ab2b64(ab: ArrayBuffer) { return btoa(String.fromCharCode(...new Uint8Array(ab))); }
function b642ab(s: string): ArrayBuffer {
  const bin = atob(s.replace(/\s+/g, ""));
  const ab = new ArrayBuffer(bin.length);
  new Uint8Array(ab).forEach((_, i, a) => { a[i] = bin.charCodeAt(i); });
  return ab;
}
function toPem(ab: ArrayBuffer, type: string) {
  return `-----BEGIN ${type}-----\n${ab2b64(ab).match(/.{1,64}/g)!.join("\n")}\n-----END ${type}-----`;
}
function fromPem(pem: string) { return b642ab(pem.replace(/-----[^-]+-----/g, "").replace(/\s+/g, "")); }

export function RsaTool() {
  const [tab, setTab] = useState("generate");
  const [bits, setBits] = useState("2048");
  const [pub, setPub] = useState(""); const [priv, setPriv] = useState("");
  const [msg, setMsg] = useState(""); const [cipher, setCipher] = useState("");
  const [out, setOut] = useState(""); const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function gen() {
    setBusy(true); setErr("");
    try {
      const kp = await crypto.subtle.generateKey(
        { name: "RSA-OAEP", modulusLength: +bits, publicExponent: new Uint8Array([1,0,1]), hash: "SHA-256" },
        true, ["encrypt","decrypt"]
      );
      setPub(toPem(await crypto.subtle.exportKey("spki", kp.publicKey), "PUBLIC KEY"));
      setPriv(toPem(await crypto.subtle.exportKey("pkcs8", kp.privateKey), "PRIVATE KEY"));
    } catch (e: unknown) { setErr(String(e)); }
    setBusy(false);
  }

  async function encrypt() {
    setBusy(true); setErr("");
    try {
      const key = await crypto.subtle.importKey("spki", fromPem(pub),
        { name: "RSA-OAEP", hash: "SHA-256" }, false, ["encrypt"]);
      const enc = await crypto.subtle.encrypt({ name: "RSA-OAEP" }, key, new TextEncoder().encode(msg));
      setOut(ab2b64(enc));
    } catch (e: unknown) { setErr(String(e)); }
    setBusy(false);
  }

  async function decrypt() {
    setBusy(true); setErr("");
    try {
      const key = await crypto.subtle.importKey("pkcs8", fromPem(priv),
        { name: "RSA-OAEP", hash: "SHA-256" }, false, ["decrypt"]);
      const dec = await crypto.subtle.decrypt({ name: "RSA-OAEP" }, key, b642ab(cipher));
      setOut(new TextDecoder().decode(dec));
    } catch (e: unknown) { setErr(String(e)); }
    setBusy(false);
  }

  return (
    <div>
      <Tabs value={tab} onChange={setTab} options={[{value:"generate",label:"Generar Claves"},{value:"encrypt",label:"Cifrar"},{value:"decrypt",label:"Descifrar"}]} />
      {tab === "generate" && (
        <>
          <Section label="Tamaño de clave">
            <Select value={bits} onChange={setBits} options={[{value:"1024",label:"1024 bits"},{value:"2048",label:"2048 bits"},{value:"4096",label:"4096 bits"}]} />
          </Section>
          <Row><Btn onClick={gen} disabled={busy}>{busy ? "Generando…" : "🔑 Generar par de claves"}</Btn></Row>
          {pub && (<><Section label="Clave Pública (Public Key)" action={<CopyBtn text={pub} />}><TA value={pub} rows={6} readOnly /></Section>
          <Section label="Clave Privada (Private Key)" action={<CopyBtn text={priv} />}><TA value={priv} rows={6} readOnly /></Section></>)}
        </>
      )}
      {tab === "encrypt" && (
        <>
          <Section label="Clave Pública (PEM)"><TA value={pub} onChange={setPub} placeholder="-----BEGIN PUBLIC KEY-----..." rows={5} /></Section>
          <Section label="Mensaje a cifrar"><TA value={msg} onChange={setMsg} placeholder="Texto plano…" rows={3} mono={false} /></Section>
          <Row style={{ marginBottom: 16 }}><Btn onClick={encrypt} disabled={busy}>{busy ? "Cifrando…" : "🔐 Cifrar"}</Btn></Row>
          {out && <Section label="Resultado (Base64)" action={<CopyBtn text={out} />}><TA value={out} rows={4} readOnly /></Section>}
        </>
      )}
      {tab === "decrypt" && (
        <>
          <Section label="Clave Privada (PEM)"><TA value={priv} onChange={setPriv} placeholder="-----BEGIN PRIVATE KEY-----..." rows={5} /></Section>
          <Section label="Texto cifrado (Base64)"><TA value={cipher} onChange={setCipher} placeholder="Base64..." rows={3} /></Section>
          <Row style={{ marginBottom: 16 }}><Btn onClick={decrypt} disabled={busy}>{busy ? "Descifrando…" : "🔓 Descifrar"}</Btn></Row>
          {out && <Section label="Resultado" action={<CopyBtn text={out} />}><TA value={out} rows={3} readOnly /></Section>}
        </>
      )}
      {err && <Alert type="error">{err}</Alert>}
    </div>
  );
}

/* ── Hash ─────────────────────────────────────────────────────── */
function hexEncode(ab: ArrayBuffer) { return [...new Uint8Array(ab)].map(b=>b.toString(16).padStart(2,"0")).join(""); }

export function HashTool() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Record<string,string>>({});
  const [compare, setCompare] = useState("");

  async function compute() {
    if (!input) return;
    const data = new TextEncoder().encode(input);
    const r: Record<string,string> = {};
    r["MD5"] = (await import("md5")).default(input);
    for (const algo of ["SHA-1","SHA-256","SHA-384","SHA-512"] as const)
      r[algo] = hexEncode(await crypto.subtle.digest(algo, data));
    setResults(r);
  }

  return (
    <div>
      <Section label="Texto de entrada">
        <TA value={input} onChange={setInput} placeholder="Ingresa el texto a hashear…" rows={4} mono={false} />
      </Section>
      <Row style={{ marginBottom: 20 }}>
        <Btn onClick={compute}>🔢 Calcular hashes</Btn>
        <Btn variant="outlined" onClick={() => { setInput(""); setResults({}); }}>Limpiar</Btn>
      </Row>
      {Object.entries(results).map(([algo, hash]) => (
        <Section key={algo} label={algo} action={<CopyBtn text={hash} />}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <code style={{ flex: 1, background: "var(--md-surface-container-highest)", padding: "8px 12px",
              borderRadius: 8, fontSize: 12, wordBreak: "break-all" as const, color: "var(--md-on-surface)" }}>
              {hash}
            </code>
          </div>
          {compare && (
            <p style={{ fontSize: 11, marginTop: 4, color: compare.toLowerCase() === hash ? "#4ade80" : "#f87171" }}>
              {compare.toLowerCase() === hash ? "✓ Coincide" : "✗ No coincide"}
            </p>
          )}
        </Section>
      ))}
      <Section label="Comparar con hash conocido">
        <Input value={compare} onChange={setCompare} placeholder="Pega un hash para comparar…" />
      </Section>
    </div>
  );
}

/* ── Bcrypt ───────────────────────────────────────────────────── */
export function BcryptTool() {
  const [tab, setTab] = useState("hash");
  const [input, setInput] = useState(""); const [hash, setHash] = useState("");
  const [rounds, setRounds] = useState(10); const [out, setOut] = useState("");
  const [busy, setBusy] = useState(false); const [match, setMatch] = useState<boolean|null>(null);

  async function doHash() {
    setBusy(true);
    const bcrypt = await import("bcryptjs");
    setOut(await bcrypt.hash(input, rounds));
    setBusy(false);
  }
  async function doVerify() {
    setBusy(true);
    const bcrypt = await import("bcryptjs");
    setMatch(await bcrypt.compare(input, hash));
    setBusy(false);
  }

  return (
    <div>
      <Tabs value={tab} onChange={setTab} options={[{value:"hash",label:"Hashear"},{value:"verify",label:"Verificar"}]} />
      <Section label="Texto / Contraseña"><Input value={input} onChange={setInput} placeholder="Contraseña o texto…" /></Section>
      {tab === "hash" && (
        <>
          <Section><Slider value={rounds} onChange={setRounds} min={4} max={14} label="Rounds (costo)" /></Section>
          <Btn onClick={doHash} disabled={busy || !input}>{busy ? "Hasheando…" : "🧂 Generar Hash Bcrypt"}</Btn>
          {out && <Section label="Hash resultante" action={<CopyBtn text={out} />} style={{ marginTop: 16 }}><TA value={out} rows={2} readOnly /></Section>}
        </>
      )}
      {tab === "verify" && (
        <>
          <Section label="Hash bcrypt"><Input value={hash} onChange={setHash} placeholder="$2b$10$…" /></Section>
          <Btn onClick={doVerify} disabled={busy || !input || !hash}>{busy ? "Verificando…" : "✅ Verificar"}</Btn>
          {match !== null && <div style={{ marginTop: 16 }}><Alert type={match ? "success" : "error"}>{match ? "✓ ¡Las contraseñas coinciden!" : "✗ Las contraseñas NO coinciden."}</Alert></div>}
        </>
      )}
    </div>
  );
}

/* ── AES-256 ──────────────────────────────────────────────────── */
async function aesEncrypt(text: string, pass: string): Promise<string> {
  const enc = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv   = crypto.getRandomValues(new Uint8Array(12));
  const base = await crypto.subtle.importKey("raw", enc.encode(pass), "PBKDF2", false, ["deriveKey"]);
  const key  = await crypto.subtle.deriveKey({name:"PBKDF2",salt,iterations:100000,hash:"SHA-256"}, base, {name:"AES-GCM",length:256}, false, ["encrypt"]);
  const ct   = await crypto.subtle.encrypt({name:"AES-GCM",iv}, key, enc.encode(text));
  const combined = new Uint8Array(salt.length + iv.length + ct.byteLength);
  combined.set(salt, 0); combined.set(iv, 16); combined.set(new Uint8Array(ct), 28);
  return btoa(String.fromCharCode(...combined));
}
async function aesDecrypt(b64: string, pass: string): Promise<string> {
  const enc  = new TextEncoder();
  const buf  = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
  const salt = buf.slice(0, 16); const iv = buf.slice(16, 28); const ct = buf.slice(28);
  const base = await crypto.subtle.importKey("raw", enc.encode(pass), "PBKDF2", false, ["deriveKey"]);
  const key  = await crypto.subtle.deriveKey({name:"PBKDF2",salt,iterations:100000,hash:"SHA-256"}, base, {name:"AES-GCM",length:256}, false, ["decrypt"]);
  return new TextDecoder().decode(await crypto.subtle.decrypt({name:"AES-GCM",iv}, key, ct));
}

export function AesTool() {
  const [tab, setTab] = useState("encrypt");
  const [pass, setPass] = useState(""); const [text, setText] = useState("");
  const [out, setOut] = useState(""); const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);

  async function run() {
    setBusy(true); setErr(""); setOut("");
    try { setOut(tab === "encrypt" ? await aesEncrypt(text, pass) : await aesDecrypt(text, pass)); }
    catch (e: unknown) { setErr(String(e)); }
    setBusy(false);
  }

  return (
    <div>
      <Tabs value={tab} onChange={(v) => { setTab(v); setOut(""); setErr(""); }}
        options={[{value:"encrypt",label:"Cifrar"},{value:"decrypt",label:"Descifrar"}]} />
      <Section label="Passphrase (clave secreta)">
        <Input value={pass} onChange={setPass} type="password" placeholder="Ingresa la clave secreta…" />
      </Section>
      <Section label={tab === "encrypt" ? "Texto a cifrar" : "Texto cifrado (Base64)"}>
        <TA value={text} onChange={setText} placeholder={tab === "encrypt" ? "Texto plano…" : "Base64 cifrado…"} rows={4} />
      </Section>
      <Row style={{ marginBottom: 16 }}>
        <Btn onClick={run} disabled={busy || !pass || !text}>{busy ? "Procesando…" : tab === "encrypt" ? "🔐 Cifrar" : "🔓 Descifrar"}</Btn>
        <Btn variant="outlined" onClick={() => { setText(""); setOut(""); setErr(""); }}>Limpiar</Btn>
      </Row>
      {out && <Section label="Resultado" action={<CopyBtn text={out} />}><TA value={out} rows={4} readOnly /></Section>}
      {err && <Alert type="error">{err}</Alert>}
    </div>
  );
}

/* ── JWT ──────────────────────────────────────────────────────── */
function b64url(s: string) {
  try { return JSON.parse(atob(s.replace(/-/g,"+").replace(/_/g,"/").padEnd(s.length + (4 - s.length%4)%4,"="))); }
  catch { return null; }
}

export function JwtTool() {
  const [token, setToken] = useState("");
  const parts = token.trim().split(".");
  const valid = parts.length === 3;
  const header  = valid ? b64url(parts[0]) : null;
  const payload = valid ? b64url(parts[1]) : null;
  const now = Math.floor(Date.now() / 1000);
  const exp = payload?.exp;
  const expired = exp && exp < now;

  return (
    <div>
      <Section label="Token JWT">
        <TA value={token} onChange={setToken} placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9…" rows={3} />
      </Section>
      {!valid && token && <Alert type="error">Token inválido — debe tener 3 partes separadas por puntos.</Alert>}
      {valid && header && (
        <>
          {exp && <Alert type={expired ? "error" : "success"}>{expired ? `✗ Token expirado — ${new Date(exp*1000).toLocaleString()}` : `✓ Válido hasta ${new Date(exp*1000).toLocaleString()}`}</Alert>}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
            <Section label="Header" action={<CopyBtn text={JSON.stringify(header, null, 2)} />}>
              <TA value={JSON.stringify(header, null, 2)} rows={5} readOnly />
            </Section>
            <Section label="Payload" action={<CopyBtn text={JSON.stringify(payload, null, 2)} />}>
              <TA value={JSON.stringify(payload, null, 2)} rows={5} readOnly />
            </Section>
          </div>
          <Section label="Signature (no verificada)">
            <code style={{ fontSize: 11, wordBreak: "break-all" as const, color: "var(--md-on-surface-variant)" }}>{parts[2]}</code>
          </Section>
        </>
      )}
    </div>
  );
}

/* ── Password Generator ───────────────────────────────────────── */
const CHARS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  nums:  "0123456789",
  syms:  "!@#$%^&*()-_=+[]{}|;:,.<>?",
};

export function PasswordTool() {
  const [len, setLen] = useState(20);
  const [opts, setOpts] = useState({ lower: true, upper: true, nums: true, syms: true });
  const [count, setCount] = useState(5);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [exclude, setExclude] = useState("");

  function gen() {
    let pool = "";
    if (opts.lower) pool += CHARS.lower;
    if (opts.upper) pool += CHARS.upper;
    if (opts.nums)  pool += CHARS.nums;
    if (opts.syms)  pool += CHARS.syms;
    if (exclude) pool = [...pool].filter(c => !exclude.includes(c)).join("");
    if (!pool) return;
    const arr = new Uint32Array(len * count);
    crypto.getRandomValues(arr);
    setPasswords(Array.from({length: count}, (_, i) =>
      Array.from({length: len}, (__, j) => pool[arr[i*len+j] % pool.length]).join("")
    ));
  }

  function strength(p: string) {
    let s = 0;
    if (/[a-z]/.test(p)) s++; if (/[A-Z]/.test(p)) s++; if (/[0-9]/.test(p)) s++; if (/[^a-zA-Z0-9]/.test(p)) s++;
    if (p.length >= 16) s++; if (p.length >= 24) s++;
    const labels = ["", "Muy débil","Débil","Aceptable","Fuerte","Muy fuerte","Excelente"];
    const colors = ["","#ef4444","#f97316","#eab308","#84cc16","#22c55e","#10b981"];
    return { label: labels[s], color: colors[s] };
  }

  return (
    <div>
      <Row>
        <Col><Slider value={len} onChange={setLen} min={8} max={128} label="Longitud" /></Col>
        <Col flex="0 0 auto"><Slider value={count} onChange={setCount} min={1} max={20} label="Cantidad" /></Col>
      </Row>
      <Section label="Caracteres incluir" style={{ marginTop: 12 }}>
        <Row gap={8}>
          {(Object.keys(opts) as (keyof typeof opts)[]).map(k => (
            <label key={k} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer", color: "var(--md-on-surface-variant)" }}>
              <input type="checkbox" checked={opts[k]} onChange={e => setOpts(o => ({...o, [k]: e.target.checked}))}
                style={{ accentColor: "var(--md-primary)" }} />
              {k === "lower" ? "a-z" : k === "upper" ? "A-Z" : k === "nums" ? "0-9" : "!@#…"}
            </label>
          ))}
        </Row>
      </Section>
      <Section label="Excluir caracteres">
        <Input value={exclude} onChange={setExclude} placeholder="ej. 0O1lI (caracteres ambiguos)" />
      </Section>
      <Btn onClick={gen}>🛡️ Generar contraseñas</Btn>
      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
        {passwords.map((p, i) => {
          const s = strength(p);
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8,
              background: "var(--md-surface-container-highest)", borderRadius: 8, padding: "8px 12px" }}>
              <code style={{ flex: 1, fontSize: 13, color: "var(--md-on-surface)", letterSpacing: 0.5 }}>{p}</code>
              <span style={{ fontSize: 11, color: s.color, flexShrink: 0 }}>{s.label}</span>
              <CopyBtn text={p} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
