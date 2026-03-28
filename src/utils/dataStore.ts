"use client";

import {
  ADMIN_DATA_KEY,
  DEFAULT_SITE_CONFIG,
  DEFAULT_ABOUT_BIO,
  DEFAULT_SHORT_INFO,
  DEFAULT_COUNTERS,
  DEFAULT_SKILLS,
  DEFAULT_SKILL_LIST,
  DEFAULT_EXPERIENCE,
  DEFAULT_EDUCATION,
  DEFAULT_TESTIMONIALS,
  DEFAULT_PORTFOLIO_ITEMS,
  DEFAULT_NEWS_ITEMS,
} from "./constants";

import type {
  Skill,
  ResumeItem,
  Testimonial,
  PortfolioItem,
  NewsItem,
  ShortInfoItem,
  CounterItem,
} from "@/types";

// ─── Shape of stored data ─────────────────────────────────────────────────────
export interface PortfolioData {
  siteConfig: typeof DEFAULT_SITE_CONFIG;
  aboutBio: string;
  shortInfo: ShortInfoItem[];
  counters: CounterItem[];
  skills: Skill[];
  skillList: string[];
  experience: ResumeItem[];
  education: ResumeItem[];
  testimonials: Testimonial[];
  portfolioItems: PortfolioItem[];
  newsItems: NewsItem[];
}

// ─── Defaults ─────────────────────────────────────────────────────────────────
export function getDefaults(): PortfolioData {
  return {
    siteConfig: {
      ...DEFAULT_SITE_CONFIG,
      social: [...DEFAULT_SITE_CONFIG.social],
    },
    aboutBio: DEFAULT_ABOUT_BIO,
    shortInfo: DEFAULT_SHORT_INFO.map((x) => ({ ...x })),
    counters: DEFAULT_COUNTERS.map((x) => ({ ...x })),
    skills: DEFAULT_SKILLS.map((x) => ({ ...x })),
    skillList: [...DEFAULT_SKILL_LIST],
    experience: DEFAULT_EXPERIENCE.map((x) => ({ ...x })),
    education: DEFAULT_EDUCATION.map((x) => ({ ...x })),
    testimonials: DEFAULT_TESTIMONIALS.map((x) => ({ ...x })),
    portfolioItems: DEFAULT_PORTFOLIO_ITEMS.map((x) => ({
      ...x,
      technologies: [...x.technologies],
    })),
    newsItems: DEFAULT_NEWS_ITEMS.map((x) => ({ ...x, tags: [...x.tags] })),
  };
}

// ─── Load from localStorage (or defaults) ─────────────────────────────────────
export function loadData(): PortfolioData {
  if (typeof window === "undefined") return getDefaults();
  try {
    const raw = localStorage.getItem(ADMIN_DATA_KEY);
    if (!raw) return getDefaults();
    const parsed = JSON.parse(raw) as Partial<PortfolioData>;
    const defaults = getDefaults();
    // Merge: stored values take priority, defaults fill missing keys
    return { ...defaults, ...parsed };
  } catch {
    return getDefaults();
  }
}

// ─── Save to localStorage ─────────────────────────────────────────────────────
export function saveData(data: PortfolioData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ADMIN_DATA_KEY, JSON.stringify(data));
  // Dispatch event so portfolio views can react without a full reload
  window.dispatchEvent(new Event("portfolio-data-updated"));
}

// ─── Reset to defaults ────────────────────────────────────────────────────────
export function resetData(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ADMIN_DATA_KEY);
  window.dispatchEvent(new Event("portfolio-data-updated"));
}
