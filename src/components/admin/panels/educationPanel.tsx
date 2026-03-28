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

export function EducationPanel({ data, update }: Props) {
  const { education } = data;

  const set = (i: number, key: keyof (typeof education)[0], val: string) => {
    const next = education.map((x, idx) =>
      idx === i ? { ...x, [key]: val } : x,
    );
    update({ education: next });
  };

  const add = () =>
    update({
      education: [
        { period: "", title: "", subtitle: "", description: "" },
        ...education,
      ],
    });

  const remove = (i: number) =>
    update({ education: education.filter((_, idx) => idx !== i) });

  return (
    <div>
      <PanelSection title="Education">
        <AddBtn onClick={add} label="Add Education" />
        <div
          style={{
            marginTop: 14,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {education.map((item, i) => (
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
                    placeholder="2011 – 2015"
                  />
                </Field>
                <Field label="Degree / Title">
                  <AdminInput
                    value={item.title}
                    onChange={(e) => set(i, "title", e.target.value)}
                    placeholder="B.Sc. Computer Science"
                  />
                </Field>
              </div>
              <Field label="Institution">
                <AdminInput
                  value={item.subtitle}
                  onChange={(e) => set(i, "subtitle", e.target.value)}
                  placeholder="University Name"
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
