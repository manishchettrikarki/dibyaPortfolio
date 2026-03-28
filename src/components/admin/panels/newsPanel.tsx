"use client";

import { useState } from "react";
import { PortfolioData } from "@/utils/dataStore";
import {
  Field,
  PanelSection,
  AdminInput,
  AdminTextarea,
  Card,
  IconBtn,
  AddBtn,
  TrashIcon,
} from "../adminUi";
import type { NewsItem } from "@/types";

interface Props {
  data: PortfolioData;
  update: (p: Partial<PortfolioData>) => void;
}

export function NewsPanel({ data, update }: Props) {
  const { newsItems } = data;
  const [expanded, setExpanded] = useState<number | null>(null);

  const set = (i: number, key: keyof NewsItem, val: string) => {
    const next = newsItems.map((x, idx) =>
      idx === i ? { ...x, [key]: val } : x,
    );
    update({ newsItems: next });
  };

  const setTags = (i: number, tagStr: string) => {
    const next = newsItems.map((x, idx) =>
      idx === i
        ? {
            ...x,
            tags: tagStr
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean),
          }
        : x,
    );
    update({ newsItems: next });
  };

  const add = () => {
    const item: NewsItem = {
      id: Date.now(),
      title: "New Post",
      excerpt: "",
      date: "",
      category: "Development",
      author: "",
      readTime: "5 min read",
      content: "",
      tags: [],
      quote: "",
    };
    update({ newsItems: [item, ...newsItems] });
    setExpanded(0);
  };

  const remove = (i: number) => {
    update({ newsItems: newsItems.filter((_, idx) => idx !== i) });
    setExpanded(null);
  };

  return (
    <div>
      <PanelSection title="Blog / News Posts">
        <AddBtn onClick={add} label="Add Post" />
        <div
          style={{
            marginTop: 14,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {newsItems.map((post, i) => (
            <div key={post.id}>
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
                    {post.title || "Untitled"}
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
                    {post.category}
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
                        value={post.title}
                        onChange={(e) => set(i, "title", e.target.value)}
                      />
                    </Field>
                    <Field label="Category">
                      <AdminInput
                        value={post.category}
                        onChange={(e) => set(i, "category", e.target.value)}
                        placeholder="Development"
                      />
                    </Field>
                    <Field label="Date">
                      <AdminInput
                        value={post.date}
                        onChange={(e) => set(i, "date", e.target.value)}
                        placeholder="July 12, 2024"
                      />
                    </Field>
                    <Field label="Author">
                      <AdminInput
                        value={post.author}
                        onChange={(e) => set(i, "author", e.target.value)}
                      />
                    </Field>
                    <Field label="Read Time">
                      <AdminInput
                        value={post.readTime}
                        onChange={(e) => set(i, "readTime", e.target.value)}
                        placeholder="8 min read"
                      />
                    </Field>
                    <Field label="Tags (comma-separated)">
                      <AdminInput
                        value={post.tags.join(", ")}
                        onChange={(e) => setTags(i, e.target.value)}
                        placeholder="Next.js, React, TypeScript"
                      />
                    </Field>
                  </div>
                  <Field label="Excerpt">
                    <AdminTextarea
                      rows={3}
                      value={post.excerpt}
                      onChange={(e) => set(i, "excerpt", e.target.value)}
                    />
                  </Field>
                  <Field label="Pull Quote (optional)">
                    <AdminInput
                      value={post.quote ?? ""}
                      onChange={(e) => set(i, "quote", e.target.value)}
                    />
                  </Field>
                  <Field label="Content (HTML)">
                    <AdminTextarea
                      rows={10}
                      value={post.content}
                      onChange={(e) => set(i, "content", e.target.value)}
                      style={{ fontFamily: "monospace", fontSize: 12 }}
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
