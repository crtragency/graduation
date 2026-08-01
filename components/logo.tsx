import Link from "next/link";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2.5 font-semibold tracking-tight", className)} aria-label="ProjectForge AI home">
      <span className="relative grid size-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 text-white shadow-lg shadow-violet-500/25">
        <Sparkles className="size-4.5" />
        <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full border border-background bg-cyan-300" />
      </span>
      {!compact && <span className="text-[15px]">ProjectForge <span className="text-violet-400">AI</span></span>}
    </Link>
  );
}
