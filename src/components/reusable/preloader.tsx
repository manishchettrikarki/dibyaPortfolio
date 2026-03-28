"use client";

import { useEffect, useState } from "react";

export function Preloader() {
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setDone(true), 900);
    const t2 = setTimeout(() => setGone(true), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (gone) return null;

  return (
    <div className={`preloader ${done ? "preloader--done" : ""}`}>
      <div className="preloader__panel preloader__panel--left" />
      <div className="preloader__panel preloader__panel--right" />
      <div className="preloader__line" />
    </div>
  );
}
