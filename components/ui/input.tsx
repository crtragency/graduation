import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, type, ...props }, ref) => (
  <input type={type} className={cn("flex h-11 w-full rounded-xl border border-input bg-white/[.035] px-3.5 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus:border-violet-500/60 focus:outline-none focus:ring-2 focus:ring-violet-500/15 disabled:cursor-not-allowed disabled:opacity-50", className)} ref={ref} {...props} />
));
Input.displayName = "Input";
