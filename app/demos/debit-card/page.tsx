"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function formatNumber(n: string) {
  return n.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
}

function luhnCheck(num: string) {
  const arr = num
    .split("")
    .reverse()
    .map((x) => parseInt(x));
  const sum = arr.reduce(
    (acc, val, i) => acc + (i % 2 ? (val * 2 > 9 ? val * 2 - 9 : val * 2) : val),
    0
  );
  return sum % 10 === 0;
}

function detectBrand(num: string) {
  if (/^4/.test(num)) return "VISA";
  if (/^5[1-5]/.test(num)) return "MASTERCARD";
  return "";
}

export default function DebitCardPage() {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const displayNumber = formatNumber(number) || "0000 0000 0000 0000";
  const displayName = name.toUpperCase() || "NOMBRE";
  const displayValid = from || to ? `${from} - ${to}` : "00/00 - 00/00";
  const brand = detectBrand(number) || "VISA";
  const isValid = number.replace(/\D/g, "").length >= 13;
  const numberColor = isValid
    ? luhnCheck(number.replace(/\D/g, ""))
      ? "#e5e7eb"
      : "#ef4444"
    : "#e5e7eb";

  useEffect(() => {
    function animate() {
      current.current.x += (target.current.x - current.current.x) * 0.1;
      current.current.y += (target.current.y - current.current.y) * 0.1;
      if (cardRef.current) {
        cardRef.current.style.transform = `rotateX(${current.current.x}deg) rotateY(${current.current.y}deg)`;
      }
      animRef.current = requestAnimationFrame(animate);
    }
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.current.y = ((x - rect.width / 2) / rect.width) * 15;
    target.current.x = -((y - rect.height / 2) / rect.height) * 15;
    glareRef.current?.style.setProperty("--x", x + "px");
    glareRef.current?.style.setProperty("--y", y + "px");
  }

  function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    const t = e.touches[0];
    const rect = cardRef.current!.getBoundingClientRect();
    const x = t.clientX - rect.left;
    const y = t.clientY - rect.top;
    target.current.y = ((x - rect.width / 2) / rect.width) * 15;
    target.current.x = -((y - rect.height / 2) / rect.height) * 15;
    glareRef.current?.style.setProperty("--x", x + "px");
    glareRef.current?.style.setProperty("--y", y + "px");
  }

  function handleMouseLeave() {
    target.current = { x: 0, y: 0 };
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
    <div className="min-h-screen bg-slate-950 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 text-sm font-mono mb-10 transition-colors"
        >
          ← volver
        </Link>

        <h1 className="text-2xl font-bold text-white mb-2">Debit Card Generator</h1>
        <p className="text-slate-500 text-sm mb-12">
          Detección de marca automática, validación Luhn y exportación como imagen.
        </p>

        <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">

          {/* Form */}
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <input
              className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="Número"
              value={number}
              maxLength={19}
              onChange={(e) => setNumber(e.target.value)}
            />
            <input
              className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="flex gap-3">
              <input
                className="flex-1 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="Desde MM/YY"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
              <input
                className="flex-1 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="Hasta MM/YY"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
            <button
              onClick={download}
              className="mt-1 px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-colors"
            >
              Descargar imagen
            </button>

            {isValid && (
              <p className={`text-xs font-mono mt-1 text-center ${luhnCheck(number.replace(/\D/g, "")) ? "text-emerald-400" : "text-red-400"}`}>
                {luhnCheck(number.replace(/\D/g, "")) ? "✓ Número válido (Luhn)" : "✗ Número inválido (Luhn)"}
              </p>
            )}
          </div>

          {/* Card preview */}
          <div style={{ perspective: "1000px" }}>
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onMouseLeave={handleMouseLeave}
              style={{
                width: 420,
                height: 260,
                borderRadius: 18,
                overflow: "hidden",
                position: "relative",
                transformStyle: "preserve-3d",
                transition: "transform .1s ease-out",
                boxShadow: "0 25px 50px rgba(0,0,0,0.7)",
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              {/* Background image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://i.ibb.co/XrHg34Sv/Gemini-Generated-Image-qdczq0qdczq0qdcz.png"
                crossOrigin="anonymous"
                alt="card background"
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  if (cardRef.current)
                    cardRef.current.style.background =
                      "linear-gradient(135deg,#1e293b,#0f172a)";
                }}
              />

              {/* Card number */}
              <div
                style={{
                  position: "absolute",
                  bottom: 80,
                  left: 40,
                  color: numberColor,
                  fontSize: 22,
                  letterSpacing: 3,
                  textShadow: "0 2px 4px rgba(0,0,0,0.8)",
                  WebkitTextStroke: "0.4px rgba(0,0,0,0.7)",
                  fontFamily: "monospace",
                  transition: "color 0.2s",
                }}
              >
                {displayNumber}
              </div>

              {/* Name */}
              <div
                style={{
                  position: "absolute",
                  bottom: 56,
                  left: 40,
                  color: "white",
                  fontSize: 14,
                  textShadow: "0 2px 4px rgba(0,0,0,0.8)",
                  WebkitTextStroke: "0.4px rgba(0,0,0,0.7)",
                }}
              >
                {displayName}
              </div>

              {/* Valid */}
              <div
                style={{
                  position: "absolute",
                  bottom: 56,
                  left: 220,
                  color: "white",
                  fontSize: 12,
                  textShadow: "0 2px 4px rgba(0,0,0,0.8)",
                  WebkitTextStroke: "0.4px rgba(0,0,0,0.7)",
                }}
              >
                {displayValid}
              </div>

              {/* Brand */}
              <div
                style={{
                  position: "absolute",
                  bottom: 24,
                  right: 30,
                  color: "white",
                  fontSize: 26,
                  fontWeight: "bold",
                  fontStyle: "italic",
                  textShadow: "0 2px 4px rgba(0,0,0,0.8)",
                  WebkitTextStroke: "0.4px rgba(0,0,0,0.7)",
                }}
              >
                {brand}
              </div>

              {/* Glare */}
              <div
                ref={glareRef}
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(circle at var(--x,50%) var(--y,50%), rgba(255,255,255,0.25), transparent 40%)",
                  mixBlendMode: "overlay",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
