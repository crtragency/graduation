import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getAppUser } from "@/lib/auth";

export const metadata:Metadata={title:"Admin",robots:{index:false,follow:false}};
export default async function AdminLayout({children}:{children:React.ReactNode}){const user=await getAppUser();return <DashboardShell user={user}>{children}</DashboardShell>}
