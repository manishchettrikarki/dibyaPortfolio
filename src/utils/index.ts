import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function animateCounter(
  end: number,
  onUpdate: (value: number) => void,
  duration = 1500,
): () => void {
  const startTime = performance.now();
  function step(now: number) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    onUpdate(Math.round(eased * end));
    if (progress < 1) requestAnimationFrame(step);
  }
  const id = requestAnimationFrame(step);
  return () => cancelAnimationFrame(id);
}
