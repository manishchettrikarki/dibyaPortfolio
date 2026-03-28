import React from "react";

// ─── Field wrapper ────────────────────────────────────────────────────────────
export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label
        style={{
          display: "block",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: "#666",
          marginBottom: 8,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────
export function PanelSection({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 40 }}>
      {title && (
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#555",
            marginBottom: 20,
            paddingBottom: 10,
            borderBottom: "1px solid #1f1f1f",
          }}
        >
          {title}
        </p>
      )}
      {children}
    </div>
  );
}

// ─── Text input ───────────────────────────────────────────────────────────────
export const AdminInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => (
  <input
    ref={ref}
    {...props}
    style={{
      width: "100%",
      padding: "10px 14px",
      background: "#1a1a1a",
      border: "1px solid #2a2a2a",
      color: "#fff",
      fontSize: 14,
      fontFamily: "inherit",
      outline: "none",
      transition: "border-color 0.2s",
      ...props.style,
    }}
    onFocus={(e) => {
      e.target.style.borderColor = "#555";
      props.onFocus?.(e);
    }}
    onBlur={(e) => {
      e.target.style.borderColor = "#2a2a2a";
      props.onBlur?.(e);
    }}
  />
));
AdminInput.displayName = "AdminInput";

// ─── Textarea ─────────────────────────────────────────────────────────────────
export const AdminTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>((props, ref) => (
  <textarea
    ref={ref}
    rows={4}
    {...props}
    style={{
      width: "100%",
      padding: "10px 14px",
      background: "#1a1a1a",
      border: "1px solid #2a2a2a",
      color: "#fff",
      fontSize: 14,
      fontFamily: "inherit",
      outline: "none",
      resize: "vertical",
      transition: "border-color 0.2s",
      ...props.style,
    }}
    onFocus={(e) => {
      e.target.style.borderColor = "#555";
      props.onFocus?.(e);
    }}
    onBlur={(e) => {
      e.target.style.borderColor = "#2a2a2a";
      props.onBlur?.(e);
    }}
  />
));
AdminTextarea.displayName = "AdminTextarea";

// ─── Select ───────────────────────────────────────────────────────────────────
export function AdminSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        padding: "10px 14px",
        background: "#1a1a1a",
        border: "1px solid #2a2a2a",
        color: "#fff",
        fontSize: 14,
        fontFamily: "inherit",
        outline: "none",
        cursor: "pointer",
      }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

// ─── Card wrapper ─────────────────────────────────────────────────────────────
export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: "#141414",
        border: "1px solid #1f1f1f",
        padding: "20px 24px",
        marginBottom: 14,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Row of two fields ────────────────────────────────────────────────────────
export function Row({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      {children}
    </div>
  );
}

// ─── Icon button ─────────────────────────────────────────────────────────────
export function IconBtn({
  onClick,
  title,
  children,
  danger,
}: {
  onClick: () => void;
  title?: string;
  children: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        color: danger ? "#f87171" : "#555",
        padding: 6,
        transition: "color 0.2s",
        flexShrink: 0,
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.color = danger
          ? "#ef4444"
          : "#fff")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.color = danger
          ? "#f87171"
          : "#555")
      }
    >
      {children}
    </button>
  );
}

// ─── Add button ───────────────────────────────────────────────────────────────
export function AddBtn({
  onClick,
  label,
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 18px",
        background: "none",
        border: "1px dashed #333",
        color: "#555",
        cursor: "pointer",
        width: "100%",
        fontFamily: "'Montserrat', sans-serif",
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "2px",
        textTransform: "uppercase",
        transition: "color 0.2s, border-color 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = "#fff";
        (e.currentTarget as HTMLElement).style.borderColor = "#555";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = "#555";
        (e.currentTarget as HTMLElement).style.borderColor = "#333";
      }}
    >
      <svg
        width={14}
        height={14}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
      {label ?? "Add Item"}
    </button>
  );
}

// ─── Delete icon ─────────────────────────────────────────────────────────────
export function TrashIcon() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}
