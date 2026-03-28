"use client";

import { useState, useEffect, JSX } from "react";
import { useRouter } from "next/navigation";
import { clearSession } from "@/utils/adminAuth";
import {
  loadData,
  saveData,
  resetData,
  type PortfolioData,
} from "@/utils/dataStore";
import { ADMIN_SECTIONS, type AdminSectionId } from "@/utils/constants";
import { SiteInfoPanel } from "./panels/siteInfoPanel";
import { AboutPanel } from "./panels/aboutPanel";
import { SkillsPanel } from "./panels/skillsPanel";
import { ExperiencePanel } from "./panels/experiencePanel";
import { EducationPanel } from "./panels/educationPanel";
import { TestimonialsPanel } from "./panels/testimonialsPanel";
import { PortfolioPanel } from "./panels/portfolioPanel";
import { NewsPanel } from "./panels/newsPanel";

const ICON: Record<string, JSX.Element> = {
  user: (
    <svg
      width={15}
      height={15}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  "file-text": (
    <svg
      width={15}
      height={15}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14,2 14,8 20,8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10,9 9,9 8,9" />
    </svg>
  ),
  "bar-chart": (
    <svg
      width={15}
      height={15}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  ),
  briefcase: (
    <svg
      width={15}
      height={15}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  book: (
    <svg
      width={15}
      height={15}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  message: (
    <svg
      width={15}
      height={15}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  grid: (
    <svg
      width={15}
      height={15}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  newspaper: (
    <svg
      width={15}
      height={15}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
      <path d="M18 14h-8" />
      <path d="M15 18h-5" />
      <path d="M10 6h8v4h-8V6Z" />
    </svg>
  ),
};

export function AdminDashboard() {
  const router = useRouter();
  const [active, setActive] = useState<AdminSectionId>("site");
  const [data, setData] = useState<PortfolioData | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setData(loadData());
  }, []);

  const update = (patch: Partial<PortfolioData>) => {
    setData((prev) => (prev ? { ...prev, ...patch } : prev));
  };

  const save = () => {
    if (!data) return;
    saveData(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const reset = () => {
    if (!confirm("Reset all data to defaults? This cannot be undone.")) return;
    resetData();
    setData(loadData());
  };

  const logout = () => {
    clearSession();
    router.push("/admin/login");
  };

  if (!data) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#666",
        }}
      >
        Loading…
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#0d0d0d",
        fontFamily: "'Mulish', system-ui, sans-serif",
      }}
    >
      {/* ── Sidebar ── */}
      <aside
        style={{
          width: 220,
          flexShrink: 0,
          background: "#111",
          borderRight: "1px solid #1f1f1f",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "28px 24px 20px",
            borderBottom: "1px solid #1f1f1f",
          }}
        >
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800,
              fontSize: 14,
              color: "#fff",
              marginBottom: 2,
            }}
          >
            Portfolio Admin
          </p>
          <p
            style={{
              fontSize: 10,
              color: "#444",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            Content Manager
          </p>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 0" }}>
          {ADMIN_SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              style={
                {
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "11px 24px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background 0.2s",
                  background: active === s.id ? "#1a1a1a" : "none",
                  color: active === s.id ? "#fff" : "#555",
                  borderLeft: `2px solid ${active === s.id ? "#fff" : "transparent"}`,
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                } as React.CSSProperties
              }
            >
              <span
                style={{
                  color: active === s.id ? "#fff" : "#444",
                  flexShrink: 0,
                }}
              >
                {ICON[s.icon]}
              </span>
              {s.label}
            </button>
          ))}
        </nav>

        {/* Footer actions */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid #1f1f1f",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <button onClick={save} style={actionBtn("#fff", "#000")}>
            {saved ? "✓ Saved!" : "Save Changes"}
          </button>
          <button
            onClick={reset}
            style={actionBtn("transparent", "#666", "#333")}
          >
            Reset Defaults
          </button>
          <button
            onClick={logout}
            style={actionBtn("transparent", "#555", "transparent")}
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "40px 48px",
          maxWidth: 900,
        }}
      >
        {/* Top save bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 36,
            paddingBottom: 24,
            borderBottom: "1px solid #1f1f1f",
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                fontSize: 20,
                color: "#fff",
                marginBottom: 4,
              }}
            >
              {ADMIN_SECTIONS.find((s) => s.id === active)?.label}
            </h1>
            <p style={{ fontSize: 12, color: "#444" }}>
              Edit and save your portfolio content
            </p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={reset}
              style={actionBtn("transparent", "#555", "#222")}
            >
              Reset
            </button>
            <button onClick={save} style={actionBtn("#fff", "#000")}>
              {saved ? "✓ Saved!" : "Save"}
            </button>
          </div>
        </div>

        {/* Panels */}
        {active === "site" && <SiteInfoPanel data={data} update={update} />}
        {active === "about" && <AboutPanel data={data} update={update} />}
        {active === "skills" && <SkillsPanel data={data} update={update} />}
        {active === "experience" && (
          <ExperiencePanel data={data} update={update} />
        )}
        {active === "education" && (
          <EducationPanel data={data} update={update} />
        )}
        {active === "testimonials" && (
          <TestimonialsPanel data={data} update={update} />
        )}
        {active === "portfolio" && (
          <PortfolioPanel data={data} update={update} />
        )}
        {active === "news" && <NewsPanel data={data} update={update} />}
      </main>
    </div>
  );
}

function actionBtn(
  bg: string,
  color: string,
  border?: string,
): React.CSSProperties {
  return {
    padding: "9px 14px",
    background: bg,
    color,
    border: `1px solid ${border ?? bg}`,
    fontFamily: "'Montserrat', sans-serif",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "2px",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "opacity 0.2s",
    width: "100%",
  };
}
