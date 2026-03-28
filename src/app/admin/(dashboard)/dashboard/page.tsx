"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/utils/adminAuth";
import { AdminDashboard } from "@/components/admin/adminDashboard";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) router.replace("/admin/login");
  }, [router]);

  if (typeof window !== "undefined" && !isLoggedIn()) return null;

  return <AdminDashboard />;
}
