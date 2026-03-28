// ─── Sections ─────────────────────────────────────────────────────────────────
export type SectionId = "home" | "about" | "portfolio" | "news" | "contact";

// ─── Nav ──────────────────────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  section: SectionId;
}

// ─── Social ───────────────────────────────────────────────────────────────────
export interface SocialLink {
  icon: string;
  url: string;
  label: string;
}

// ─── About ───────────────────────────────────────────────────────────────────
export interface ShortInfoItem {
  label: string;
  value: string;
  href?: string;
}

export interface CounterItem {
  value: number;
  suffix: string;
  label: string;
}

export interface Skill {
  name: string;
  value: number;
}

export interface ResumeItem {
  period: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
}

// ─── Portfolio ───────────────────────────────────────────────────────────────
export type PortfolioCategory = "all" | "web" | "design" | "video" | "audio";

export interface PortfolioItem {
  id: number;
  title: string;
  category: Exclude<PortfolioCategory, "all"> | string;
  categoryLabel: string;
  type: "image" | "video" | "audio";
  client: string;
  date: string;
  url?: string;
  description: string;
  technologies: string[];
}

export interface PortfolioFilter {
  label: string;
  value: PortfolioCategory | string;
}

// ─── News ─────────────────────────────────────────────────────────────────────
export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  author: string;
  readTime: string;
  content: string;
  tags: string[];
  quote?: string;
}

// ─── Contact ──────────────────────────────────────────────────────────────────
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type FormStatus = {
  type: "idle" | "loading" | "success" | "error";
  message: string;
};
