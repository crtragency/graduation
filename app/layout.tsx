import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Providers } from "@/components/providers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host?.includes("localhost") ? "http" : "https");
  const base = new URL(host ? `${protocol}://${host}` : process.env.NEXT_PUBLIC_APP_URL ?? "https://projectforge-ai.vercel.app");
  const socialImage = new URL("/og.png", base).toString();
  return {
    metadataBase: base,
    title: { default: "ProjectForge AI — Build production-ready websites with AI", template: "%s — ProjectForge AI" },
    description: "Describe your idea. ProjectForge AI designs, codes, and deploys a complete production-ready website in minutes.",
    keywords: ["AI website builder", "graduation projects", "Next.js generator", "AI SaaS", "website deployment"],
    authors: [{ name: "ProjectForge AI" }],
    creator: "ProjectForge AI",
    applicationName: "ProjectForge AI",
    openGraph: { title: "ProjectForge AI — From idea to live website", description: "Generate, preview, export, and deploy a production-ready website with AI.", type: "website", locale: "en_US", siteName: "ProjectForge AI", images: [{ url: socialImage, width: 1732, height: 909, alt: "ProjectForge AI — From idea to production" }] },
    twitter: { card: "summary_large_image", title: "ProjectForge AI", description: "From prompt to production in minutes.", images: [socialImage] },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = { width: "device-width", initialScale: 1, maximumScale: 5, colorScheme: "dark light", themeColor: "#080810" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
