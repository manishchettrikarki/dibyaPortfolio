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

export function SiteInfoPanel({ data, update }: Props) {
  const { siteConfig } = data;

  const set = (key: keyof typeof siteConfig, value: string) =>
    update({ siteConfig: { ...siteConfig, [key]: value } });

  const setSocial = (
    i: number,
    key: "icon" | "url" | "label",
    value: string,
  ) => {
    const social = siteConfig.social.map((s, idx) =>
      idx === i ? { ...s, [key]: value } : s,
    );
    update({ siteConfig: { ...siteConfig, social } });
  };

  const addSocial = () =>
    update({
      siteConfig: {
        ...siteConfig,
        social: [
          ...siteConfig.social,
          { icon: "github", url: "", label: "GitHub" },
        ],
      },
    });

  const removeSocial = (i: number) =>
    update({
      siteConfig: {
        ...siteConfig,
        social: siteConfig.social.filter((_, idx) => idx !== i),
      },
    });

  return (
    <div>
      <PanelSection title="Basic Info">
        <Row>
          <Field label="Name">
            <AdminInput
              value={siteConfig.name}
              onChange={(e) => set("name", e.target.value)}
            />
          </Field>
          <Field label="Role / Title">
            <AdminInput
              value={siteConfig.role}
              onChange={(e) => set("role", e.target.value)}
            />
          </Field>
        </Row>
        <Field label="Tagline / Hero Text">
          <AdminInput
            value={siteConfig.tagline}
            onChange={(e) => set("tagline", e.target.value)}
          />
        </Field>
        <Row>
          <Field label="Email">
            <AdminInput
              type="email"
              value={siteConfig.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </Field>
          <Field label="Phone">
            <AdminInput
              value={siteConfig.phone}
              onChange={(e) => set("phone", e.target.value)}
            />
          </Field>
        </Row>
        <Row>
          <Field label="Location">
            <AdminInput
              value={siteConfig.location}
              onChange={(e) => set("location", e.target.value)}
            />
          </Field>
          <Field label="CV File Path">
            <AdminInput
              value={siteConfig.cvFile}
              onChange={(e) => set("cvFile", e.target.value)}
              placeholder="/cv/my-cv.pdf"
            />
          </Field>
        </Row>
      </PanelSection>

      <PanelSection title="Social Links">
        {siteConfig.social.map((s, i) => (
          <Card key={i}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr 1fr auto",
                gap: 12,
                alignItems: "end",
              }}
            >
              <Field label="Icon name">
                <AdminInput
                  value={s.icon}
                  onChange={(e) => setSocial(i, "icon", e.target.value)}
                  placeholder="github"
                />
              </Field>
              <Field label="URL">
                <AdminInput
                  value={s.url}
                  onChange={(e) => setSocial(i, "url", e.target.value)}
                  placeholder="https://…"
                />
              </Field>
              <Field label="Label">
                <AdminInput
                  value={s.label}
                  onChange={(e) => setSocial(i, "label", e.target.value)}
                  placeholder="GitHub"
                />
              </Field>
              <IconBtn onClick={() => removeSocial(i)} title="Remove" danger>
                <TrashIcon />
              </IconBtn>
            </div>
          </Card>
        ))}
        <AddBtn onClick={addSocial} label="Add Social Link" />
      </PanelSection>
    </div>
  );
}
