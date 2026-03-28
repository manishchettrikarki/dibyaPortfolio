"use client";

import { ADMIN_SESSION_KEY } from "./constants";

export function getSession(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ADMIN_SESSION_KEY);
}

export function setSession(token: string): void {
  localStorage.setItem(ADMIN_SESSION_KEY, token);
}

export function clearSession(): void {
  localStorage.removeItem(ADMIN_SESSION_KEY);
}

export function isLoggedIn(): boolean {
  return !!getSession();
}
