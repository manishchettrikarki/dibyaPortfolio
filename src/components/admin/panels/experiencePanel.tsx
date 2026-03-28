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

export function ExperiencePanel({ data, update }: Props) {
  const { experience } = data;

  const set = (i: number, key: keyof (typeof experience)[0], val: string) => {
    const next = experience.map((x, idx) =>
      idx === i ? { ...x, [key]: val } : x,
    );
    update({ experience: next });
  };

  const add = () =>
    update({
      experience: [
        { period: "", title: "", subtitle: "", description: "" },
        ...experience,
      ],
    });

  const remove = (i: number) =>
    update({ experience: experience.filter((_, idx) => idx !== i) });

  return (
    <div>
      <PanelSection title="Work Experience">
        <AddBtn onClick={add} label="Add Experience" />
        <div
          style={{
            marginTop: 14,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {experience.map((item, i) => (
            <Card key={i}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
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
                  Entry {i + 1}
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
                <Field label="Period">
                  <AdminInput
                    value={item.period}
                    onChange={(e) => set(i, "period", e.target.value)}
                    placeholder="2021 – Present"
                  />
                </Field>
                <Field label="Job Title">
                  <AdminInput
                    value={item.title}
                    onChange={(e) => set(i, "title", e.target.value)}
                    placeholder="Senior Developer"
                  />
                </Field>
              </div>
              <Field label="Company / Subtitle">
                <AdminInput
                  value={item.subtitle}
                  onChange={(e) => set(i, "subtitle", e.target.value)}
                  placeholder="Company Name"
                />
              </Field>
              <Field label="Description">
                <AdminTextarea
                  rows={3}
                  value={item.description}
                  onChange={(e) => set(i, "description", e.target.value)}
                />
              </Field>
            </Card>
          ))}
        </div>
      </PanelSection>
    </div>
  );
}
