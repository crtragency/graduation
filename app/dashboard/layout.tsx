import type { Metadata } from "next";
import { getAppUser } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export const metadata: Metadata = { title: "Dashboard", robots: { index: false, follow: false } };

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getAppUser();
  return <DashboardShell user={user}>{children}</DashboardShell>;
}
