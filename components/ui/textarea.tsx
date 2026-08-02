import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => (
  <textarea className={cn("flex min-h-28 w-full resize-none rounded-xl border border-input bg-card px-3.5 py-3 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50", className)} ref={ref} {...props} />
));
Textarea.displayName = "Textarea";
