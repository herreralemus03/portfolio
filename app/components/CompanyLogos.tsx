"use client";

import { useState } from "react";

interface Company {
  name: string;
  domain: string;
  initial: string;
  color: string;
  textColor: string;
  role: string;
  period: string;
}

const COMPANIES: Company[] = [
  { name: "Banco Davivienda", domain: "davivienda.com",      initial: "D",   color: "#C8102E", textColor: "#fff", role: "Backend Dev",   period: "2025" },
  { name: "Banco Cuscatlán",  domain: "bancocuscatlan.com",  initial: "BC",  color: "#004B87", textColor: "#fff", role: "Backend Dev",   period: "2024" },
  { name: "Equifax",          domain: "equifax.com",         initial: "EQ",  color: "#C8102E", textColor: "#fff", role: "Full Stack Dev", period: "2021" },
  { name: "Siman",            domain: "siman.com",           initial: "Si",  color: "#B22222", textColor: "#fff", role: "Full Stack Dev", period: "2022" },
  { name: "Freund",           domain: "freund.com.sv",       initial: "Fr",  color: "#1A7C3C", textColor: "#fff", role: "Backend Dev",   period: "2023" },
  { name: "In2Clouds",        domain: "in2clouds.com",       initial: "I2C", color: "#0078D4", textColor: "#fff", role: "Cloud Architect","period": "2021" },
  { name: "Digestyc",         domain: "digestyc.gob.sv",     initial: "Dg",  color: "#1B4F8A", textColor: "#fff", role: "Full Stack Dev", period: "2021" },
];

function LogoImage({ company }: { company: Company }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="company-initial"
        style={{ background: company.color, color: company.textColor }}
      >
        {company.initial}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://logo.clearbit.com/${company.domain}`}
      alt={company.name}
      className="company-logo-img"
      onError={() => setFailed(true)}
    />
  );
}

export function CompanyLogos({ sub }: { sub: string }) {
  return (
    <div>
      <p className="md-label-md" style={{ color: "var(--md-on-surface-variant)", marginBottom: 20 }}>
        {sub}
      </p>
      <div className="companies-grid">
        {COMPANIES.map((c) => (
          <div key={c.name} className="company-card">
            <LogoImage company={c} />
            <div style={{ textAlign: "center" }}>
              <p className="md-label-lg" style={{ color: "var(--md-on-surface)", fontSize: 11, lineHeight: "16px" }}>
                {c.name}
              </p>
              <p className="md-label-sm" style={{ color: "var(--md-primary)" }}>{c.role}</p>
              <p className="md-label-sm" style={{ color: "var(--md-outline)" }}>{c.period}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
