"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getDictionary } from "@/lib/i18n";

function formatNumber(n: string) {
  return n.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
}
function luhnCheck(num: string) {
  const arr = num.split("").reverse().map((x) => parseInt(x));
  const sum = arr.reduce((acc, val, i) => acc + (i % 2 ? (val * 2 > 9 ? val * 2 - 9 : val * 2) : val), 0);
  return sum % 10 === 0;
}
function detectBrand(num: string) {
  if (/^4/.test(num)) return "VISA";
  if (/^5[1-5]/.test(num)) return "MASTERCARD";
  return "";
}

export default function DebitCardPage() {
  const params   = useParams();
  const lang     = (params.lang as string) || "en";
  const t        = getDictionary(lang);
  const dc       = t.debitCard;

  const cardRef  = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const animRef  = useRef<number>(0);
  const target   = useRef({ x: 0, y: 0 });
  const current  = useRef({ x: 0, y: 0 });

  const [number, setNumber] = useState("");
  const [name,   setName]   = useState("");
  const [from,   setFrom]   = useState("");
  const [to,     setTo]     = useState("");

  const raw           = number.replace(/\D/g, "");
  const displayNumber = formatNumber(number) || "0000 0000 0000 0000";
  const displayName   = name.toUpperCase() || "NOMBRE";
  const displayValid  = from || to ? `${from} - ${to}` : "00/00 - 00/00";
  const brand         = detectBrand(number) || "VISA";
  const isLong        = raw.length >= 13;
  const isValid       = isLong && luhnCheck(raw);
  const numColor      = isLong ? (isValid ? "#e5e7eb" : "#ef4444") : "#e5e7eb";

  useEffect(() => {
    function animate() {
      current.current.x += (target.current.x - current.current.x) * 0.1;
      current.current.y += (target.current.y - current.current.y) * 0.1;
      if (cardRef.current)
        cardRef.current.style.transform = `rotateX(${current.current.x}deg) rotateY(${current.current.y}deg)`;
      animRef.current = requestAnimationFrame(animate);
    }
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  function move(x: number, y: number, rect: DOMRect) {
    target.current.y = ((x - rect.width  / 2) / rect.width)  *  15;
    target.current.x = ((y - rect.height / 2) / rect.height) * -15;
    glareRef.current?.style.setProperty("--x", x + "px");
    glareRef.current?.style.setProperty("--y", y + "px");
  }

  async function download() {
    if (!cardRef.current) return;
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(cardRef.current, { scale: 3 });
    const a = document.createElement("a");
    a.download = "tarjeta-pro.webp";
    a.href = canvas.toDataURL("image/webp", 0.95);
    a.click();
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--md-surface)" }}>
      {/* App Bar */}
      <header className="md-appbar">
        <Link href={`/${lang}/`} className="md-btn-icon" aria-label={t.demoBack}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
          </svg>
        </Link>
        <span className="md-appbar-title">{dc.title}</span>
        <Link href={`/${t.langTarget}/demos/debit-card/`} className="md-btn-text" style={{ height: 32, padding: "0 12px", fontSize: 13 }}>
          {t.langSwitch}
        </Link>
      </header>

      <main style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px 64px" }}>
        <p className="md-body-md" style={{ color: "var(--md-on-surface-variant)", marginBottom: 40 }}>
          {dc.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 48, alignItems: "flex-start" }}>
          {/* Form */}
          <div style={{
            background: "var(--md-surface-container)", borderRadius: 12, padding: 24,
            flex: "1 1 280px", display: "flex", flexDirection: "column", gap: 20,
          }}>
            <p className="md-title-sm" style={{ color: "var(--md-on-surface)" }}>{dc.formTitle}</p>

            {[
              { id: "cn", label: dc.number,   value: number, set: setNumber, max: 19, placeholder: "0000 0000 0000 0000" },
              { id: "nm", label: dc.cardName, value: name,   set: setName,   placeholder: "NOMBRE APELLIDO" },
            ].map(({ id, label, value, set, max, placeholder }) => (
              <div key={id} className="md-field">
                <label htmlFor={id}>{label}</label>
                <input id={id} className="md-input" placeholder={placeholder} value={value}
                  maxLength={max} onChange={(e) => set(e.target.value)} />
              </div>
            ))}

            <div style={{ display: "flex", gap: 12 }}>
              {[
                { id: "fr", label: dc.from, value: from, set: setFrom },
                { id: "to", label: dc.to,   value: to,   set: setTo   },
              ].map(({ id, label, value, set }) => (
                <div key={id} className="md-field" style={{ flex: 1 }}>
                  <label htmlFor={id}>{label}</label>
                  <input id={id} className="md-input" placeholder="MM/YY" value={value} onChange={(e) => set(e.target.value)} />
                </div>
              ))}
            </div>

            <button onClick={download} className="md-btn-filled" style={{ width: "100%" }}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>
              </svg>
              {dc.download}
            </button>

            {isLong && (
              <div style={{
                display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 8,
                background: isValid ? "color-mix(in srgb,#4ade80 12%,transparent)" : "color-mix(in srgb,#f87171 12%,transparent)",
              }}>
                <span className="md-label-lg" style={{ color: isValid ? "#4ade80" : "#f87171" }}>
                  {isValid ? `✓ ${dc.luhnValid}` : `✗ ${dc.luhnInvalid}`}
                </span>
              </div>
            )}
          </div>

          {/* Card preview */}
          <div style={{ flex: "0 0 auto", display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
            <p className="md-label-md" style={{ color: "var(--md-on-surface-variant)", textTransform: "uppercase" }}>
              {dc.preview}
            </p>
            <div style={{ perspective: "1000px" }}>
              <div
                ref={cardRef}
                onMouseMove={(e) => move(e.clientX - cardRef.current!.getBoundingClientRect().left, e.clientY - cardRef.current!.getBoundingClientRect().top, cardRef.current!.getBoundingClientRect())}
                onTouchMove={(e) => { const r = cardRef.current!.getBoundingClientRect(); move(e.touches[0].clientX - r.left, e.touches[0].clientY - r.top, r); }}
                onMouseLeave={() => { target.current = { x: 0, y: 0 }; }}
                style={{
                  width: 380, height: 236, borderRadius: 16, overflow: "hidden",
                  position: "relative", transformStyle: "preserve-3d",
                  boxShadow: "0 25px 50px rgba(0,0,0,.7)", cursor: "pointer", userSelect: "none",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://i.ibb.co/XrHg34Sv/Gemini-Generated-Image-qdczq0qdczq0qdcz.png"
                  crossOrigin="anonymous" alt=""
                  style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; if (cardRef.current) cardRef.current.style.background = "linear-gradient(135deg,#1e293b,#0f172a)"; }}
                />
                <div style={{ position: "absolute", bottom: 72, left: 36, color: numColor, fontSize: 20, letterSpacing: 3, textShadow: "0 2px 4px rgba(0,0,0,.8)", fontFamily: "monospace", transition: "color .2s" }}>{displayNumber}</div>
                <div style={{ position: "absolute", bottom: 50, left: 36,  color: "white", fontSize: 13, textShadow: "0 2px 4px rgba(0,0,0,.8)" }}>{displayName}</div>
                <div style={{ position: "absolute", bottom: 50, left: 200, color: "white", fontSize: 12, textShadow: "0 2px 4px rgba(0,0,0,.8)" }}>{displayValid}</div>
                <div style={{ position: "absolute", bottom: 22, right: 28, color: "white", fontSize: 24, fontWeight: "bold", fontStyle: "italic", textShadow: "0 2px 4px rgba(0,0,0,.8)" }}>{brand}</div>
                <div ref={glareRef} style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at var(--x,50%) var(--y,50%),rgba(255,255,255,.25),transparent 40%)", mixBlendMode: "overlay" }} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
