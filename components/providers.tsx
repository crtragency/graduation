"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";

function OptionalClerkProvider({ children }: { children: React.ReactNode }) {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return key ? <ClerkProvider publishableKey={key}>{children}</ClerkProvider> : children;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <OptionalClerkProvider>
      <ThemeProvider>
        {children}
        <Toaster theme="dark" position="bottom-right" richColors closeButton />
      </ThemeProvider>
    </OptionalClerkProvider>
  );
}
