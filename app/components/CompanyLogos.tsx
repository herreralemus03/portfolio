"use client";

import { useState } from "react";

interface Company {
  name: string;
  logoUrl: string;           // primary logo URL
  logoUrl2?: string;         // secondary fallback URL
  initial: string;
  color: string;
  textColor: string;
  role: string;
  period: string;
}

/* ── Logo sources verified via WebFetch ───────────────────────────
   Davivienda  → Wikipedia Commons PNG (21 KB, confirmed ✓)
   Cuscatlán   → Wikipedia Commons PNG (112 KB, confirmed ✓)
   Equifax     → Wikipedia Commons SVG (confirmed ✓, #B32541 maroon)
   Siman       → VTEX official CDN PNG
   Freund      → freundferreteria.com official SVG
   In2Clouds   → no public logo found → initials fallback
   Digestyc    → no public logo found → initials fallback
─────────────────────────────────────────────────────────────────── */
const COMPANIES: Company[] = [
  {
    name: "Banco Davivienda",
    logoUrl:  "https://upload.wikimedia.org/wikipedia/commons/a/ac/Davivienda_Logo.png",
    logoUrl2: "https://www.davivienda.com/documents/d/global/logodavivienda",
    initial: "D", color: "#E5001C", textColor: "#fff",
    role: "Backend Developer", period: "Mar 2025 – Dic 2025",
  },
  {
    name: "Banco Cuscatlán",
    logoUrl:  "https://upload.wikimedia.org/wikipedia/commons/3/34/Banco_Cuscatl%C3%A1n.png",
    initial: "BC", color: "#003087", textColor: "#fff",
    role: "Backend Developer", period: "May 2024 – Dic 2024",
  },
  {
    name: "Equifax",
    logoUrl:  "https://upload.wikimedia.org/wikipedia/commons/1/18/Equifax_Logo.svg",
    initial: "EQ", color: "#B32541", textColor: "#fff",
    role: "Full Stack Developer", period: "Jul 2021 – May 2022",
  },
  {
    name: "Siman",
    logoUrl:  "https://simanselector.vteximg.com.br/arquivos/logo_siman_welcome_page.png?v=637251722087630000",
    logoUrl2: "https://logo.clearbit.com/siman.com",
    initial: "Si", color: "#C41230", textColor: "#fff",
    role: "Full Stack Developer", period: "May 2022 – Jul 2023",
  },
  {
    name: "Freund",
    logoUrl:  "https://www.freundferreteria.com/img/logo.svg",
    initial: "Fr", color: "#1A7C3C", textColor: "#fff",
    role: "Backend Developer", period: "Sep 2023 – Ene 2024",
  },
  {
    name: "In2Clouds",
    logoUrl: "https://media.licdn.com/dms/image/v2/C4E0BAQHZA94kpZurug/company-logo_200_200/company-logo_200_200/0/1630638388762/into_clouds_consulting_logo?e=2147483647&v=beta&t=BcFnZ76YCP6sOmUcdWBv9UuhUtUhEbYAk1JNa0kUHkQ",
    initial: "I2", color: "#0078D4", textColor: "#fff",
    role: "Cloud Architect", period: "Ago 2021 – Feb 2022",
  },
];

function LogoImage({ company }: { company: Company }) {
  const [attempt, setAttempt] = useState<"primary" | "secondary" | "fallback">("primary");

  if (attempt === "fallback") {
    return (
      <div style={{
        width: 64, height: 64, borderRadius: 14,
        background: company.color, color: company.textColor,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 15, fontWeight: 700, letterSpacing: 0.5, flexShrink: 0,
      }}>
        {company.initial}
      </div>
    );
  }

  const src = attempt === "primary" ? company.logoUrl : (company.logoUrl2 ?? "");

  const handleError = () => {
    if (attempt === "primary" && company.logoUrl2) {
      setAttempt("secondary");
    } else {
      setAttempt("fallback");
    }
  };

  return (
    /* White background so logos designed for light backgrounds are visible */
    <div style={{
      width: 80, height: 52, borderRadius: 10,
      background: "rgba(255,255,255,0.92)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "6px 10px", overflow: "hidden", flexShrink: 0,
      boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
    }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={company.name}
        onError={handleError}
        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }}
      />
    </div>
  );
}

export function CompanyLogos({ sub }: { sub: string }) {
  return (
    <div>
      <p className="md-label-md" style={{ color: "var(--md-on-surface-variant)", marginBottom: 24 }}>
        {sub}
      </p>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(148px, 1fr))",
        gap: 12,
      }}>
        {COMPANIES.map((c) => (
          <div
            key={c.name}
            style={{
              background: "var(--md-surface-container)",
              border: "1px solid var(--md-outline-variant)",
              borderRadius: 16,
              padding: "20px 16px 16px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
              transition: "border-color .2s, transform .2s, box-shadow .2s",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.borderColor = "var(--md-outline)";
              el.style.transform = "translateY(-3px)";
              el.style.boxShadow = "0 6px 18px rgba(0,0,0,0.35)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.borderColor = "var(--md-outline-variant)";
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "none";
            }}
          >
            <LogoImage company={c} />

            <div style={{ textAlign: "center", width: "100%" }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "var(--md-on-surface)", lineHeight: "16px", marginBottom: 4 }}>
                {c.name}
              </p>
              <p style={{ fontSize: 11, fontWeight: 500, color: "var(--md-primary)", marginBottom: 2 }}>
                {c.role}
              </p>
              <p style={{ fontSize: 10, color: "var(--md-outline)" }}>
                {c.period}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
