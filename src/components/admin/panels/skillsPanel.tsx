"use client";

import { PortfolioData } from "@/utils/dataStore";
import {
  Field,
  PanelSection,
  AdminInput,
  Card,
  Row,
  IconBtn,
  AddBtn,
  TrashIcon,
} from "../adminUi";

interface Props {
  data: PortfolioData;
  update: (p: Partial<PortfolioData>) => void;
}

export function SkillsPanel({ data, update }: Props) {
  const { skills } = data;

  const set = (i: number, key: "name" | "value", val: string) => {
    const next = skills.map((s, idx) =>
      idx === i
        ? {
            ...s,
            [key]:
              key === "value" ? Math.min(100, Math.max(0, Number(val))) : val,
          }
        : s,
    );
    update({ skills: next });
  };

  const add = () =>
    update({ skills: [...skills, { name: "New Skill", value: 80 }] });
  const remove = (i: number) =>
    update({ skills: skills.filter((_, idx) => idx !== i) });

  return (
    <div>
      <PanelSection title="Skill Bars">
        {skills.map((skill, i) => (
          <Card key={i}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr auto",
                gap: 16,
                alignItems: "end",
              }}
            >
              <Field label="Skill Name">
                <AdminInput
                  value={skill.name}
                  onChange={(e) => set(i, "name", e.target.value)}
                />
              </Field>
              <Field label="Level (0–100)">
                <AdminInput
                  type="number"
                  min={0}
                  max={100}
                  value={skill.value}
                  onChange={(e) => set(i, "value", e.target.value)}
                />
              </Field>
              <IconBtn onClick={() => remove(i)} danger>
                <TrashIcon />
              </IconBtn>
            </div>

            {/* Visual bar preview */}
            <div style={{ marginTop: 14 }}>
              <div style={{ height: 3, background: "#222", width: "100%" }}>
                <div
                  style={{
                    height: 3,
                    background: "#fff",
                    width: `${skill.value}%`,
                    transition: "width 0.4s ease",
                  }}
                />
              </div>
              <p
                style={{
                  fontSize: 11,
                  color: "#444",
                  marginTop: 4,
                  textAlign: "right",
                }}
              >
                {skill.value}%
              </p>
            </div>
          </Card>
        ))}
        <AddBtn onClick={add} label="Add Skill" />
      </PanelSection>
    </div>
  );
}
