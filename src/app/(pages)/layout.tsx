import { AppLayout } from "@/layouts/app.layout";
import { ReactNode } from "react";

export default function PagesLayout({ children }: { children: ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}
