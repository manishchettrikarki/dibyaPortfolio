"use client";

import { PortfolioData } from "@/utils/dataStore";
import {
  Field,
  PanelSection,
  AdminInput,
  AdminTextarea,
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

export function AboutPanel({ data, update }: Props) {
  const { aboutBio, shortInfo, counters, skillList } = data;

  // Short info
  const setInfo = (i: number, key: "label" | "value" | "href", val: string) => {
    const next = shortInfo.map((x, idx) =>
      idx === i ? { ...x, [key]: val } : x,
    );
    update({ shortInfo: next });
  };
  const addInfo = () =>
    update({ shortInfo: [...shortInfo, { label: "New", value: "" }] });
  const removeInfo = (i: number) =>
    update({ shortInfo: shortInfo.filter((_, idx) => idx !== i) });

  // Counters
  const setCounter = (
    i: number,
    key: "value" | "suffix" | "label",
    val: string,
  ) => {
    const next = counters.map((x, idx) =>
      idx === i ? { ...x, [key]: key === "value" ? Number(val) : val } : x,
    );
    update({ counters: next });
  };
  const addCounter = () =>
    update({
      counters: [...counters, { value: 0, suffix: "+", label: "New Stat" }],
    });
  const removeCounter = (i: number) =>
    update({ counters: counters.filter((_, idx) => idx !== i) });

  // Skill list (technologies)
  const setSkillItem = (i: number, val: string) => {
    const next = skillList.map((x, idx) => (idx === i ? val : x));
    update({ skillList: next });
  };
  const addSkillItem = () => update({ skillList: [...skillList, ""] });
  const removeSkillItem = (i: number) =>
    update({ skillList: skillList.filter((_, idx) => idx !== i) });

  return (
    <div>
      <PanelSection title="Bio">
        <Field label="About Bio">
          <AdminTextarea
            rows={5}
            value={aboutBio}
            onChange={(e) => update({ aboutBio: e.target.value })}
          />
        </Field>
      </PanelSection>

      <PanelSection title="Short Info Items">
        {shortInfo.map((item, i) => (
          <Card key={i}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr auto",
                gap: 12,
                alignItems: "end",
              }}
            >
              <Field label="Label">
                <AdminInput
                  value={item.label}
                  onChange={(e) => setInfo(i, "label", e.target.value)}
                />
              </Field>
              <Field label="Value">
                <AdminInput
                  value={item.value}
                  onChange={(e) => setInfo(i, "value", e.target.value)}
                />
              </Field>
              <Field label="Link (optional)">
                <AdminInput
                  value={item.href ?? ""}
                  onChange={(e) => setInfo(i, "href", e.target.value)}
                  placeholder="mailto:…"
                />
              </Field>
              <IconBtn onClick={() => removeInfo(i)} danger>
                <TrashIcon />
              </IconBtn>
            </div>
          </Card>
        ))}
        <AddBtn onClick={addInfo} label="Add Info Row" />
      </PanelSection>

      <PanelSection title="Counters / Stats">
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
        >
          {counters.map((c, i) => (
            <Card key={i}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Row>
                  <Field label="Value">
                    <AdminInput
                      type="number"
                      value={c.value}
                      onChange={(e) => setCounter(i, "value", e.target.value)}
                      style={{ width: "100%" }}
                    />
                  </Field>
                  <Field label="Suffix">
                    <AdminInput
                      value={c.suffix}
                      onChange={(e) => setCounter(i, "suffix", e.target.value)}
                      placeholder="+"
                    />
                  </Field>
                </Row>
                <IconBtn onClick={() => removeCounter(i)} danger>
                  <TrashIcon />
                </IconBtn>
              </div>
              <Field label="Label">
                <AdminInput
                  value={c.label}
                  onChange={(e) => setCounter(i, "label", e.target.value)}
                />
              </Field>
            </Card>
          ))}
        </div>
        <AddBtn onClick={addCounter} label="Add Counter" />
      </PanelSection>

      <PanelSection title="Technologies / Skill Tags">
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
        >
          {skillList.map((s, i) => (
            <div
              key={i}
              style={{ display: "flex", gap: 8, alignItems: "center" }}
            >
              <AdminInput
                value={s}
                onChange={(e) => setSkillItem(i, e.target.value)}
                placeholder="e.g. TypeScript"
              />
              <IconBtn onClick={() => removeSkillItem(i)} danger>
                <TrashIcon />
              </IconBtn>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 10 }}>
          <AddBtn onClick={addSkillItem} label="Add Technology" />
        </div>
      </PanelSection>
    </div>
  );
}
