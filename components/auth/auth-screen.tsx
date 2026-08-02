"use client";

import Link from "next/link";
import { SignIn, SignUp } from "@clerk/nextjs";
import { ArrowRight, BookOpenCheck, Check, FileText, Presentation } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

const clerkAppearance = {
  elements: {
    rootBox: "w-full",
    cardBox: "w-full",
    card: "w-full bg-card border border-border shadow-lg",
    headerTitle: "text-foreground",
    headerSubtitle: "text-muted-foreground",
    socialButtonsBlockButton: "border-border bg-card text-foreground",
    formFieldInput: "bg-card border-border text-foreground",
    footerActionLink: "text-[#1f5870]",
  },
};

export function AuthScreen({ mode }: { mode: "sign-in" | "sign-up" }) {
  const enabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-[.9fr_1.1fr]">
      <section className="relative hidden overflow-hidden border-r border-border bg-[#f0f7f7] p-10 lg:flex lg:flex-col">
        <Logo />
        <div className="my-auto max-w-lg">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#c7dfe1] bg-white px-3 py-1.5 text-xs text-[#1f5870]"><BookOpenCheck className="size-3.5" /> Graduation project workspace</span>
          <h1 className="mt-7 text-5xl font-semibold leading-tight tracking-[-.05em] text-[#173f52]">Give your project a clear place to be understood.</h1>
          <p className="mt-5 max-w-md text-sm leading-7 text-slate-600">Organize the idea, review the content with your team, understand the source, and prepare a website for academic presentation.</p>
          <ul className="mt-8 space-y-4 text-sm text-slate-700">{[[FileText, "Structure the problem, objectives, and modules"], [Check, "Review every claim before you publish"], [Presentation, "Share a focused website with your supervisor"]].map(([Icon, item]) => { const ItemIcon = Icon as typeof FileText; return <li className="flex gap-3" key={item as string}><span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white text-[#287c78]"><ItemIcon className="size-4" /></span><span className="pt-1.5">{item as string}</span></li>; })}</ul>
        </div>
        <p className="text-xs text-slate-500">© 2026 ProjectForge EDU</p>
      </section>
      <section className="flex items-center justify-center p-5 sm:p-10">
        <div className="w-full max-w-md"><div className="mb-8 lg:hidden"><Logo /></div>{enabled ? (mode === "sign-in" ? <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" fallbackRedirectUrl="/dashboard" appearance={clerkAppearance} /> : <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" fallbackRedirectUrl="/dashboard" appearance={clerkAppearance} />) : <div className="rounded-2xl border border-border bg-card p-7 shadow-lg"><span className="grid size-11 place-items-center rounded-xl bg-[#dbeaec] text-[#1f5870]"><BookOpenCheck className="size-5" /></span><h1 className="mt-6 text-2xl font-semibold">{mode === "sign-in" ? "Welcome back" : "Create your student workspace"}</h1><p className="mt-2 text-sm leading-6 text-muted-foreground">Account sign-in is not configured in this preview. Continue to the demonstration workspace to explore the project workflow.</p><Button className="mt-7 w-full" asChild><Link href="/dashboard">Continue to demo <ArrowRight /></Link></Button><p className="mt-5 text-center text-xs text-muted-foreground">{mode === "sign-in" ? <>New to ProjectForge? <Link className="font-semibold text-[#1f5870]" href="/sign-up">Create an account</Link></> : <>Already have an account? <Link className="font-semibold text-[#1f5870]" href="/sign-in">Sign in</Link></>}</p></div>}</div>
      </section>
    </main>
  );
}
