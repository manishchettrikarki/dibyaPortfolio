"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      dot.current!.style.left = `${e.clientX}px`;
      dot.current!.style.top = `${e.clientY}px`;
      ring.current!.style.left = `${e.clientX}px`;
      ring.current!.style.top = `${e.clientY}px`;
    };

    const enter = () => {
      dot.current?.classList.add("cursor-dot--hover");
      ring.current?.classList.add("cursor-ring--hover");
    };

    const leave = () => {
      dot.current?.classList.remove("cursor-dot--hover");
      ring.current?.classList.remove("cursor-ring--hover");
    };

    const bindLinks = () => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    };

    document.addEventListener("mousemove", move);
    bindLinks();

    const observer = new MutationObserver(bindLinks);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", move);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  );
}
