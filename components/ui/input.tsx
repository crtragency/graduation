import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, type, ...props }, ref) => (
  <input type={type} className={cn("flex h-11 w-full rounded-xl border border-input bg-card px-3.5 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50", className)} ref={ref} {...props} />
));
Input.displayName = "Input";
