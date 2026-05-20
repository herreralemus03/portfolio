"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getDictionary } from "@/lib/i18n";

type Result = { name: string; role: string };
const MOCK: Result[] = [
  { name: "Fernando Herrera", role: "Full Stack Developer · Java · Go · Flutter" },
  { name: "Ana López",        role: "UX/UI Designer focused on minimal interfaces" },
  { name: "Carlos Ruiz",      role: "Backend Engineer specialized in cloud systems" },
];

function SkeletonCard() {
  return (
    <div className="sk-card">
      <div className="sk-bone sk-title" />
      <div className="sk-bone sk-line" />
      <div className="sk-bone sk-line sk-short" />
    </div>
  );
}

function ResultCard({ name, role }: Result) {
  return (
    <div className="sk-card sk-result"
      onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.transform = "translateY(0)")}>
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
}

export default function SkeletonSearchPage() {
  const params  = useParams();
  const lang    = (params.lang as string) || "en";
  const t       = getDictionary(lang);

  const [query,   setQuery]   = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Result[] | null>(null);

  function search() {
    if (!query.trim()) return;
    setLoading(true); setResults(null);
    setTimeout(() => { setLoading(false); setResults(MOCK); }, 2500);
  }

  return (
    <>
      <style>{`
        .sk-page{min-height:calc(100vh - 64px);background:#e6e7ee;font-family:"Segoe UI",sans-serif;display:flex;justify-content:center;align-items:flex-start;padding:40px 20px 60px;color:#4b4f5c}
        .sk-container{width:100%;max-width:650px}
        .sk-title-main{font-size:28px;font-weight:700;margin-bottom:25px;letter-spacing:.5px}
        .sk-row{display:flex;gap:14px;margin-bottom:25px}
        .sk-input{flex:1;border:none;outline:none;padding:18px 22px;border-radius:18px;background:#e6e7ee;font-size:16px;color:#555;box-shadow:8px 8px 16px #c5c7d0,-8px -8px 16px #fff;transition:box-shadow .2s}
        .sk-input:focus{box-shadow:inset 4px 4px 8px #c8cad1,inset -4px -4px 8px #fff}
        .sk-btn{border:none;padding:0 26px;border-radius:18px;background:#e6e7ee;cursor:pointer;font-weight:600;color:#4b4f5c;font-size:15px;box-shadow:8px 8px 16px #c5c7d0,-8px -8px 16px #fff;transition:transform .2s,box-shadow .2s}
        .sk-btn:hover{transform:translateY(-1px)}
        .sk-btn:active{box-shadow:inset 4px 4px 8px #c8cad1,inset -4px -4px 8px #fff}
        .sk-searching{margin-bottom:20px;font-size:14px;opacity:.65;padding-left:6px}
        .sk-list{display:flex;flex-direction:column;gap:18px}
        .sk-card{border-radius:24px;padding:22px;background:#e6e7ee;box-shadow:10px 10px 20px #c8cad1,-10px -10px 20px #fff;transition:transform .2s}
        .sk-result h3{margin:0 0 10px;font-size:18px;color:#444}
        .sk-result p{margin:0;line-height:1.5;opacity:.8}
        .sk-bone{position:relative;overflow:hidden;background:#dfe1e8;border-radius:10px}
        .sk-bone::after{content:"";position:absolute;top:0;left:-180px;width:180px;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.7),transparent);animation:sk-shimmer 1.4s infinite}
        @keyframes sk-shimmer{100%{left:100%}}
        .sk-title{height:22px;width:55%;border-radius:12px;margin-bottom:16px}
        .sk-line{height:14px;width:100%;margin-bottom:10px}
        .sk-short{width:75%}
      `}</style>

      <header className="md-appbar">
        <Link href={`/${lang}/`} className="md-btn-icon" aria-label={t.demoBack}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
          </svg>
        </Link>
        <span className="md-appbar-title">{t.skeletonSearch.title}</span>
        <Link href={`/${t.langTarget}/demos/skeleton-search/`} className="md-btn-text" style={{ height: 32, padding: "0 12px", fontSize: 13 }}>
          {t.langSwitch}
        </Link>
      </header>

      <div className="sk-page">
        <div className="sk-container">
          <div className="sk-title-main">Search Users</div>
          <div className="sk-row">
            <input className="sk-input" value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && search()}
              placeholder="Search something..." />
            <button className="sk-btn" onClick={search}>Search</button>
          </div>
          {loading && <div className="sk-searching">Searching...</div>}
          <div className="sk-list">
            {loading  && [0,1,2].map((i) => <SkeletonCard key={i} />)}
            {results  && results.map((r) => <ResultCard key={r.name} {...r} />)}
          </div>
        </div>
      </div>
    </>
  );
}
