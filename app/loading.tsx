import { Logo } from "@/components/logo";

export default function Loading(){return <main className="grid min-h-screen place-items-center bg-background"><div className="text-center"><div className="relative mx-auto w-fit"><Logo compact/><span className="absolute -inset-3 -z-10 animate-ping rounded-2xl border border-violet-400/25"/></div><p className="mt-5 text-xs text-muted-foreground">Loading ProjectForge…</p></div></main>}
