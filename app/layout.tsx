import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Providers } from "@/components/providers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host?.includes("localhost") ? "http" : "https");
  const base = new URL(host ? `${protocol}://${host}` : process.env.NEXT_PUBLIC_APP_URL ?? "https://projectforge-edu.vercel.app");
  const socialImage = new URL("/og-edu.png", base).toString();
  return {
    metadataBase: base,
    title: { default: "ProjectForge EDU — Graduation project websites", template: "%s — ProjectForge EDU" },
    description: "Plan, build, review, and publish a clear website for your graduation project with structured academic content and editable source code.",
    keywords: ["graduation project website", "student project", "academic portfolio", "Next.js", "project presentation"],
    authors: [{ name: "ProjectForge EDU" }],
    creator: "ProjectForge EDU",
    applicationName: "ProjectForge EDU",
    openGraph: {
      title: "ProjectForge EDU — Explain your graduation project clearly",
      description: "Turn your project brief into a structured, presentation-ready website your team can review and understand.",
      type: "website", locale: "en_US", siteName: "ProjectForge EDU",
      images: [{ url: socialImage, width: 1732, height: 909, alt: "ProjectForge EDU graduation project website builder" }],
    },
    twitter: { card: "summary_large_image", title: "ProjectForge EDU", description: "Your graduation project, explained clearly.", images: [socialImage] },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = { width: "device-width", initialScale: 1, maximumScale: 5, colorScheme: "light dark", themeColor: "#f8f6ef" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body><Providers>{children}</Providers></body></html>;
}
