import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("inline-flex items-center gap-1 rounded-full border border-border bg-secondary/70 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground", className)} {...props} />;
}
