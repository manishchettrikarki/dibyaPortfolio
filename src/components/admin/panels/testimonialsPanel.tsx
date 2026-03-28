"use client";

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

interface Props {
  data: PortfolioData;
  update: (p: Partial<PortfolioData>) => void;
}

export function TestimonialsPanel({ data, update }: Props) {
  const { testimonials } = data;

  const set = (i: number, key: keyof (typeof testimonials)[0], val: string) => {
    const next = testimonials.map((x, idx) =>
      idx === i ? { ...x, [key]: val } : x,
    );
    update({ testimonials: next });
  };

  const add = () =>
    update({
      testimonials: [
        ...testimonials,
        { id: Date.now(), name: "", role: "", text: "" },
      ],
    });

  const remove = (i: number) =>
    update({ testimonials: testimonials.filter((_, idx) => idx !== i) });

  return (
    <div>
      <PanelSection title="Testimonials">
        {testimonials.map((t, i) => (
          <Card key={t.id}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 14,
              }}
            >
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 10,
                  color: "#444",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                Testimonial {i + 1}
              </span>
              <IconBtn onClick={() => remove(i)} danger>
                <TrashIcon />
              </IconBtn>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
              }}
            >
              <Field label="Name">
                <AdminInput
                  value={t.name}
                  onChange={(e) => set(i, "name", e.target.value)}
                  placeholder="John Doe"
                />
              </Field>
              <Field label="Role / Company">
                <AdminInput
                  value={t.role}
                  onChange={(e) => set(i, "role", e.target.value)}
                  placeholder="CEO, Company"
                />
              </Field>
            </div>
            <Field label="Testimonial Text">
              <AdminTextarea
                rows={4}
                value={t.text}
                onChange={(e) => set(i, "text", e.target.value)}
              />
            </Field>
          </Card>
        ))}
        <AddBtn onClick={add} label="Add Testimonial" />
      </PanelSection>
    </div>
  );
}
