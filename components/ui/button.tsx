import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-lg shadow-violet-500/20 hover:-translate-y-0.5 hover:bg-violet-500",
        secondary: "bg-secondary text-secondary-foreground hover:bg-white/10",
        outline: "border border-white/10 bg-white/[.035] hover:border-white/20 hover:bg-white/[.07]",
        ghost: "hover:bg-white/[.07] hover:text-white",
        destructive: "bg-red-500 text-white hover:bg-red-600",
      },
      size: { default: "h-10 px-4", sm: "h-8 rounded-lg px-3 text-xs", lg: "h-12 rounded-xl px-6 text-[15px]", icon: "size-10 p-0" },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { asChild?: boolean }

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { buttonVariants };
