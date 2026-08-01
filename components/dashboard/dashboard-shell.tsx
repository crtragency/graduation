"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  Bell, Blocks, ChevronDown, CreditCard, FolderKanban,
  GalleryVerticalEnd, History, LayoutDashboard, Menu, Moon, Rocket, Search,
  Settings, Shield, Sparkles, UserRound, WandSparkles, X,
} from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import type { AppUser } from "@/lib/auth";
import { AiAssistant } from "@/components/dashboard/ai-assistant";

const primaryNav = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/generate", label: "Generate website", icon: WandSparkles, highlight: true },
  { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/dashboard/templates", label: "Templates", icon: GalleryVerticalEnd },
  { href: "/dashboard/deployments", label: "Deployments", icon: Rocket },
  { href: "/dashboard/history", label: "History", icon: History },
];
const secondaryNav = [
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { href: "/dashboard/profile", label: "Profile", icon: UserRound },
];

function AccountAvatar({ user }: { user: AppUser }) {
  const clerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  if (clerk) return <UserButton appearance={{ elements: { avatarBox: "size-8" } }} />;
  return <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-[10px] font-bold text-white">{user.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span>;
}

export function DashboardShell({ user, children }: { user: AppUser; children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toggleTheme } = useTheme();
  const navItem = (item: (typeof primaryNav)[number]) => {
    const active = item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href);
    return <Link onClick={() => setMobileOpen(false)} key={item.href} href={item.href} className={cn("group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-muted-foreground transition", active ? "bg-white/[.07] text-white" : "hover:bg-white/[.045] hover:text-white", item.highlight && !active && "text-violet-300")}><item.icon className={cn("size-4", item.highlight && "text-violet-400")} />{item.label}{item.highlight && <Sparkles className="ml-auto size-3 text-violet-400" />}</Link>;
  };
  const sidebar = <><div className="flex h-16 items-center justify-between px-4"><Logo /><Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(false)}><X /></Button></div><div className="px-3"><button className="flex w-full items-center gap-3 rounded-xl border border-white/[.07] bg-white/[.025] p-2.5 text-left text-xs"><span className="grid size-7 place-items-center rounded-lg bg-violet-500/15 text-violet-300"><Blocks className="size-3.5" /></span><span className="min-w-0 flex-1"><b className="block truncate font-medium text-white">Personal workspace</b><small className="text-[10px] text-muted-foreground">Pro trial</small></span><ChevronDown className="size-3 text-muted-foreground" /></button></div><nav className="mt-5 flex-1 space-y-1 px-3">{primaryNav.map(navItem)}<p className="px-3 pb-1 pt-6 text-[9px] font-bold uppercase tracking-[.2em] text-muted-foreground/60">Manage</p>{secondaryNav.map(navItem)}{user.role === "ADMIN" && navItem({ href: "/admin", label: "Admin panel", icon: Shield })}</nav><div className="m-3 rounded-xl border border-violet-400/15 bg-gradient-to-br from-violet-500/10 to-cyan-500/5 p-3"><div className="flex items-center justify-between text-[10px]"><span className="font-medium text-white">Monthly generations</span><span className="text-violet-300">18 / 30</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[.06]"><span className="block h-full w-3/5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" /></div><Link href="/dashboard/billing" className="mt-3 inline-flex text-[10px] font-semibold text-violet-300">Upgrade plan →</Link></div></>;
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/[.07] bg-[#090910] md:flex">{sidebar}</aside>
      {mobileOpen && <div className="fixed inset-0 z-50 md:hidden"><button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="absolute inset-0 bg-black/70 backdrop-blur-sm" /><aside className="relative flex h-full w-72 flex-col border-r border-white/10 bg-[#090910]">{sidebar}</aside></div>}
      <div className="md:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-white/[.07] bg-background/80 px-4 backdrop-blur-xl sm:px-6">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(true)}><Menu /></Button>
          <button className="hidden w-full max-w-sm items-center gap-2 rounded-xl border border-white/[.07] bg-white/[.025] px-3 py-2 text-xs text-muted-foreground sm:flex"><Search className="size-3.5" /> Search projects, templates, actions... <kbd className="ml-auto rounded border border-white/10 bg-white/[.04] px-1.5 py-0.5 text-[9px]">⌘ K</kbd></button>
          <div className="ml-auto flex items-center gap-1.5"><Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme"><Moon /></Button><Button variant="ghost" size="icon" aria-label="Notifications" className="relative"><Bell /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-violet-400" /></Button><div className="mx-1 h-6 w-px bg-white/[.08]" /><AccountAvatar user={user} /></div>
        </header>
        <div className="min-h-[calc(100vh-4rem)]">{children}</div>
      </div>
      <AiAssistant />
    </div>
  );
}
