import OpenAI from "openai";
import type { GenerationResult, GeneratorRequest } from "@/lib/types";
import { slugify } from "@/lib/utils";

function demoPreview(name: string, request: GeneratorRequest) {
  const rtl = request.language === "arabic";
  return `<!doctype html><html lang="${rtl ? "ar" : "en"}" dir="${rtl ? "rtl" : "ltr"}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box}body{margin:0;font-family:Inter,Arial,sans-serif;background:#f7f9fc;color:#0f172a}.nav{height:70px;padding:0 7%;display:flex;align-items:center;justify-content:space-between;background:#fff;border-bottom:1px solid #e5e7eb}.logo{font-weight:800;color:#2563eb}.links{display:flex;gap:24px;font-size:13px;color:#64748b}.hero{min-height:420px;padding:78px 7%;display:grid;grid-template-columns:1.05fr .95fr;align-items:center;gap:50px;background:radial-gradient(circle at 70% 30%,#dbeafe,transparent 42%),#fff}.badge{display:inline-block;padding:6px 10px;border-radius:99px;background:#dbeafe;color:#1d4ed8;font-size:11px;font-weight:700}.hero h1{font-size:clamp(38px,6vw,70px);line-height:1.02;letter-spacing:-.05em;margin:18px 0}.hero p{max-width:560px;color:#64748b;line-height:1.8}.btn{display:inline-block;background:#2563eb;color:#fff;padding:13px 20px;border-radius:11px;margin-top:16px;font-weight:700}.visual{background:linear-gradient(145deg,#2563eb,#06b6d4);border-radius:28px;padding:24px;box-shadow:0 30px 80px #2563eb38;transform:rotate(2deg)}.panel{background:#ffffffed;border-radius:18px;padding:22px;min-height:265px}.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:20px}.stat{background:#f1f5f9;padding:16px;border-radius:12px}.stat b{display:block;font-size:22px}.features{padding:72px 7%}.features h2{text-align:center;font-size:38px}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:35px}.card{background:#fff;border:1px solid #e5e7eb;border-radius:18px;padding:24px;box-shadow:0 10px 30px #0f172a0d}.icon{width:40px;height:40px;border-radius:12px;background:#dbeafe;display:grid;place-items:center;color:#2563eb;font-weight:bold}@media(max-width:720px){.links{display:none}.hero{grid-template-columns:1fr;padding-top:50px}.visual{transform:none}.grid{grid-template-columns:1fr}.hero h1{font-size:44px}}</style></head><body><nav class="nav"><div class="logo">${name}</div><div class="links"><span>Home</span><span>Features</span><span>About</span><span>Contact</span></div></nav><main><section class="hero"><div><span class="badge">Built for what comes next</span><h1>${rtl ? "حل ذكي، مصمم لمستقبل أفضل" : "A smarter way to move forward."}</h1><p>${rtl ? "منصة حديثة تجمع السرعة والبساطة في تجربة واحدة متكاملة ومتجاوبة." : "A modern, responsive experience that brings clarity, speed, and everything your users need into one focused platform."}</p><a class="btn">${rtl ? "ابدأ الآن" : "Get started"}</a></div><div class="visual"><div class="panel"><small>${rtl ? "نظرة عامة" : "Overview"}</small><h3>${name} Dashboard</h3><div class="stats"><div class="stat"><b>2.4k</b><small>Users</small></div><div class="stat"><b>98%</b><small>Success</small></div><div class="stat"><b>24/7</b><small>Active</small></div></div></div></div></section><section class="features"><h2>${rtl ? "كل ما تحتاجه في مكان واحد" : "Everything you need"}</h2><div class="grid"><div class="card"><span class="icon">01</span><h3>Fast & responsive</h3><p>Optimized for every screen and every user.</p></div><div class="card"><span class="icon">02</span><h3>Secure by default</h3><p>Modern patterns with privacy built in.</p></div><div class="card"><span class="icon">03</span><h3>Easy to manage</h3><p>A clear experience from day one.</p></div></div></section></main></body></html>`;
}

export function createDemoResult(request: GeneratorRequest): GenerationResult {
  const key = request.websiteType.replace(/-/g, " ");
  const name = key.split(" ").map((part) => part[0]?.toUpperCase() + part.slice(1)).join(" ") + " Studio";
  const previewHtml = demoPreview(name, request);
  return {
    projectId: `proj_${crypto.randomUUID()}`,
    name,
    summary: `A premium ${key} website generated from your brief, with responsive layouts, accessible components, SEO metadata, and deployment configuration.`,
    pages: ["Home", "Dashboard", "About", "Contact", "Settings"],
    features: ["Responsive design", "Dark mode", "Authentication", "SEO", "Accessible UI", "Contact form"],
    palette: request.colorTheme === "ocean" ? ["#2563eb", "#06b6d4", "#f8fafc"] : ["#7c3aed", "#d946ef", "#0f172a"],
    previewHtml,
    files: [
      { path: "app/page.tsx", language: "tsx", content: `import { Hero } from "@/components/hero";\nimport { Features } from "@/components/features";\n\nexport default function HomePage() {\n  return (\n    <main>\n      <Hero />\n      <Features />\n    </main>\n  );\n}` },
      { path: "components/hero.tsx", language: "tsx", content: `export function Hero() {\n  return (\n    <section className="hero">\n      <span>Built for what comes next</span>\n      <h1>A smarter way to move forward.</h1>\n      <p>${request.prompt.replace(/`/g, "'").slice(0, 180)}</p>\n      <button>Get started</button>\n    </section>\n  );\n}` },
      { path: "app/globals.css", language: "css", content: `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n:root { color-scheme: light dark; }\nbody { margin: 0; font-family: Inter, sans-serif; }` },
      { path: "package.json", language: "json", content: JSON.stringify({ name: slugify(name), private: true, scripts: { dev: "next dev", build: "next build" }, dependencies: { next: "15.5.9", react: "19.1.4", "react-dom": "19.1.4" } }, null, 2) },
    ],
  };
}

export async function generateProject(request: GeneratorRequest): Promise<GenerationResult> {
  if (!process.env.OPENAI_API_KEY) return createDemoResult(request);
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const fallback = createDemoResult(request);
  const response = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL ?? "gpt-5-mini",
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: "You are ProjectForge AI, a senior product designer and web architect. Return valid JSON only. Create a concise production website blueprint. Never include scripts, iframes, external tracking, secrets, or unsafe HTML. The response keys must be name, summary, pages (string[]), features (string[]), palette (hex string[])." },
      { role: "user", content: JSON.stringify(request) },
    ],
  });
  try {
    const parsed = JSON.parse(response.choices[0]?.message.content ?? "{}");
    return { ...fallback, name: String(parsed.name ?? fallback.name).slice(0, 80), summary: String(parsed.summary ?? fallback.summary).slice(0, 500), pages: Array.isArray(parsed.pages) ? parsed.pages.slice(0, 12).map(String) : fallback.pages, features: Array.isArray(parsed.features) ? parsed.features.slice(0, 16).map(String) : fallback.features, palette: Array.isArray(parsed.palette) ? parsed.palette.slice(0, 8).map(String) : fallback.palette };
  } catch {
    return fallback;
  }
}
