"use client";

import { useState, useEffect } from "react";
import { loadData, type PortfolioData } from "./dataStore";

/**
 * Returns live portfolio data from localStorage.
 * Re-renders automatically when admin saves changes
 * (via the 'portfolio-data-updated' custom event).
 */
export function usePortfolioData(): PortfolioData {
  const [data, setData] = useState<PortfolioData>(() => loadData());

  useEffect(() => {
    const handler = () => setData(loadData());
    window.addEventListener("portfolio-data-updated", handler);
    return () => window.removeEventListener("portfolio-data-updated", handler);
  }, []);

  return data;
}
