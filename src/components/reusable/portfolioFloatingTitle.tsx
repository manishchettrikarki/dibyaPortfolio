"use client";

import { useEffect } from "react";

export function PortfolioFloatingTitle() {
  useEffect(() => {
    const move = (e: MouseEvent) => {
      const el = document.getElementById("portfolio-titles");
      if (el) {
        el.style.left = `${e.clientX + 12}px`;
        el.style.top = `${e.clientY + 20}px`;
      }
    };
    document.addEventListener("mousemove", move);
    return () => document.removeEventListener("mousemove", move);
  }, []);

  return <div id="portfolio-titles" />;
}
