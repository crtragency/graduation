import Link from "next/link";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2.5 font-semibold tracking-tight", className)} aria-label="ProjectForge EDU home">
      <span className="relative grid size-9 place-items-center rounded-xl bg-[#2c6f8b] text-white shadow-md shadow-sky-900/15">
        <Sparkles className="size-4.5" />
        <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full border border-background bg-[#e9b44c]" />
      </span>
      {!compact && <span className="text-[15px]">ProjectForge <span className="text-[#2f7f68]">EDU</span></span>}
    </Link>
  );
}
