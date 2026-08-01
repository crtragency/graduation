import type { ProjectSummary } from "@/lib/types";

export const projects: ProjectSummary[] = [
  { id: "proj_healthos", name: "HealthOS Dashboard", slug: "healthos-dashboard", description: "Hospital operations and patient management platform", status: "deployed", framework: "Next.js", thumbnail: "from-blue-600 to-cyan-400", updatedAt: "2026-08-02T00:20:00Z", liveUrl: "https://healthos-demo.vercel.app", favorite: true },
  { id: "proj_ecotrack", name: "EcoTrack", slug: "ecotrack", description: "Smart energy monitoring graduation project", status: "ready", framework: "Next.js", thumbnail: "from-emerald-600 to-lime-400", updatedAt: "2026-08-01T18:10:00Z" },
  { id: "proj_finflow", name: "FinFlow", slug: "finflow", description: "Personal finance dashboard and insights", status: "deployed", framework: "React", thumbnail: "from-violet-600 to-fuchsia-400", updatedAt: "2026-07-31T14:30:00Z", liveUrl: "https://finflow-demo.vercel.app" },
  { id: "proj_portfolio", name: "Creative Portfolio", slug: "creative-portfolio", description: "Editorial portfolio for a product designer", status: "draft", framework: "Next.js", thumbnail: "from-orange-500 to-rose-400", updatedAt: "2026-07-29T09:15:00Z" },
];

export const templates = [
  { id: "t1", name: "HealthOS", category: "Graduation", description: "Complete hospital operations dashboard", color: "from-blue-600 to-cyan-400", pages: 8, uses: "2.4k" },
  { id: "t2", name: "Nova Portfolio", category: "Portfolio", description: "Minimal portfolio with rich case studies", color: "from-violet-600 to-pink-400", pages: 6, uses: "1.8k" },
  { id: "t3", name: "CourseFlow", category: "Education", description: "Modern course and school management portal", color: "from-orange-500 to-amber-300", pages: 10, uses: "1.2k" },
  { id: "t4", name: "DineBook", category: "Restaurant", description: "Restaurant website with reservations", color: "from-rose-600 to-orange-400", pages: 5, uses: "980" },
  { id: "t5", name: "LaunchKit", category: "Landing", description: "High-converting startup landing page", color: "from-cyan-600 to-indigo-500", pages: 4, uses: "3.1k" },
  { id: "t6", name: "CommerceOS", category: "E-commerce", description: "Storefront, product pages, and admin", color: "from-emerald-600 to-teal-400", pages: 12, uses: "1.6k" },
];
