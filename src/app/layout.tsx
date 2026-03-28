import "@/styles/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Dibya Guragain - QA Engineer & Web Developer",
  description:
    "Portfolio showcasing QA projects, web applications, and research work by Dibya Guragain. Experienced QA Engineer and Web Developer with a passion for quality assurance, web development, and research. Explore my portfolio to see my work in QA automation, web application testing, and research projects.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
