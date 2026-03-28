"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setSession, isLoggedIn } from "@/utils/adminAuth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) router.replace("/admin/dashboard");
  }, [router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Please enter username and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (res.ok && data.token) {
        setSession(data.token);
        router.push("/admin/dashboard");
      } else {
        setError(data.error || "Login failed.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
        padding: 24,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          background: "#141414",
          border: "1px solid #222",
          padding: "48px 40px",
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: 40, textAlign: "center" }}>
          <div
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800,
              fontSize: 20,
              color: "#fff",
              letterSpacing: "1px",
              marginBottom: 6,
            }}
          >
            Portfolio Admin
          </div>
          <p
            style={{
              fontSize: 12,
              color: "#666",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Sign in to continue
          </p>
        </div>

        <form onSubmit={submit}>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              placeholder="admin"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#fff")}
              onBlur={(e) => (e.target.style.borderColor = "#333")}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="••••••••"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#fff")}
              onBlur={(e) => (e.target.style.borderColor = "#333")}
            />
          </div>

          {error && (
            <p
              style={{
                marginBottom: 16,
                padding: "10px 14px",
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#f87171",
                fontSize: 13,
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: loading ? "#333" : "#fff",
              color: "#000",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.25s",
            }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p
          style={{
            marginTop: 28,
            textAlign: "center",
            fontSize: 11,
            color: "#444",
          }}
        >
          Default: admin / admin123
          <br />
          <span style={{ color: "#333" }}>
            Set ADMIN_USERNAME + ADMIN_PASSWORD in .env.local
          </span>
        </p>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "'Montserrat', sans-serif",
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: "2px",
  textTransform: "uppercase",
  color: "#888",
  marginBottom: 8,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px 14px",
  background: "#1a1a1a",
  border: "1px solid #333",
  color: "#fff",
  fontSize: 14,
  fontFamily: "inherit",
  outline: "none",
  transition: "border-color 0.2s",
};
