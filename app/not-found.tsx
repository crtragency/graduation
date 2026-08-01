import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export default function NotFound(){return <main className="mesh-bg flex min-h-screen flex-col p-6"><Logo/><div className="m-auto max-w-lg text-center"><span className="text-gradient text-8xl font-semibold tracking-[-.08em]">404</span><h1 className="mt-6 text-3xl font-semibold">This page hasn’t been forged yet.</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">The link may have moved, or the project is private. Return to your workspace and keep building.</p><Button asChild className="mt-7"><Link href="/dashboard"><ArrowLeft/> Back to dashboard</Link></Button></div></main>}
