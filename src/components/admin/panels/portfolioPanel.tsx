"use client";

import { useState } from "react";
import { PortfolioData } from "@/utils/dataStore";
import {
  Field,
  PanelSection,
  AdminInput,
  AdminTextarea,
  AdminSelect,
  Card,
  IconBtn,
  AddBtn,
  TrashIcon,
} from "../adminUi";
import type { PortfolioItem } from "@/types";

interface Props {
  data: PortfolioData;
  update: (p: Partial<PortfolioData>) => void;
}

const CATEGORY_OPTIONS = [
  { label: "Web", value: "web" },
  { label: "Design", value: "design" },
  { label: "Video", value: "video" },
  { label: "Audio", value: "audio" },
];

const TYPE_OPTIONS = [
  { label: "Image", value: "image" },
  { label: "Video", value: "video" },
  { label: "Audio", value: "audio" },
];

export function PortfolioPanel({ data, update }: Props) {
  const { portfolioItems } = data;
  const [expanded, setExpanded] = useState<number | null>(null);

  const set = (i: number, key: keyof PortfolioItem, val: string) => {
    const next = portfolioItems.map((x, idx) =>
      idx === i ? { ...x, [key]: val } : x,
    );
    update({ portfolioItems: next });
  };

  const setTech = (i: number, techStr: string) => {
    const next = portfolioItems.map((x, idx) =>
      idx === i
        ? {
            ...x,
            technologies: techStr
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean),
          }
        : x,
    );
    update({ portfolioItems: next });
  };

  const add = () => {
    const newItem: PortfolioItem = {
      id: Date.now(),
      title: "New Project",
      category: "web",
      categoryLabel: "Web",
      type: "image",
      client: "",
      date: "",
      description: "",
      technologies: [],
    };
    update({ portfolioItems: [newItem, ...portfolioItems] });
    setExpanded(0);
  };

  const remove = (i: number) => {
    update({ portfolioItems: portfolioItems.filter((_, idx) => idx !== i) });
    setExpanded(null);
  };

  return (
    <div>
      <PanelSection title="Portfolio Items">
        <AddBtn onClick={add} label="Add Project" />
        <div
          style={{
            marginTop: 14,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {portfolioItems.map((item, i) => (
            <div key={item.id}>
              {/* Accordion header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 20px",
                  background: "#141414",
                  border: "1px solid #1f1f1f",
                  cursor: "pointer",
                  userSelect: "none",
                }}
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                <div>
                  <span
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#fff",
                    }}
                  >
                    {item.title || "Untitled"}
                  </span>
                  <span
                    style={{
                      marginLeft: 12,
                      fontSize: 10,
                      color: "#444",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.category}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 11, color: "#444" }}>
                    {expanded === i ? "▲" : "▼"}
                  </span>
                  <IconBtn
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      remove(i);
                    }}
                    danger
                  >
                    <TrashIcon />
                  </IconBtn>
                </div>
              </div>

              {/* Accordion body */}
              {expanded === i && (
                <Card style={{ borderTop: "none" }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 14,
                    }}
                  >
                    <Field label="Title">
                      <AdminInput
                        value={item.title}
                        onChange={(e) => set(i, "title", e.target.value)}
                      />
                    </Field>
                    <Field label="Category Label">
                      <AdminInput
                        value={item.categoryLabel}
                        onChange={(e) =>
                          set(i, "categoryLabel", e.target.value)
                        }
                        placeholder="Web Design"
                      />
                    </Field>
                    <Field label="Category">
                      <AdminSelect
                        value={item.category}
                        onChange={(v) => set(i, "category", v)}
                        options={CATEGORY_OPTIONS}
                      />
                    </Field>
                    <Field label="Type">
                      <AdminSelect
                        value={item.type}
                        onChange={(v) => set(i, "type", v)}
                        options={TYPE_OPTIONS}
                      />
                    </Field>
                    <Field label="Client">
                      <AdminInput
                        value={item.client}
                        onChange={(e) => set(i, "client", e.target.value)}
                      />
                    </Field>
                    <Field label="Date">
                      <AdminInput
                        value={item.date}
                        onChange={(e) => set(i, "date", e.target.value)}
                        placeholder="June 2024"
                      />
                    </Field>
                    <Field label="Live URL (optional)">
                      <AdminInput
                        value={item.url ?? ""}
                        onChange={(e) => set(i, "url", e.target.value)}
                        placeholder="https://…"
                      />
                    </Field>
                    <Field label="Technologies (comma-separated)">
                      <AdminInput
                        value={item.technologies.join(", ")}
                        onChange={(e) => setTech(i, e.target.value)}
                        placeholder="React, Next.js, TypeScript"
                      />
                    </Field>
                  </div>
                  <Field label="Description">
                    <AdminTextarea
                      rows={4}
                      value={item.description}
                      onChange={(e) => set(i, "description", e.target.value)}
                    />
                  </Field>
                </Card>
              )}
            </div>
          ))}
        </div>
      </PanelSection>
    </div>
  );
}
