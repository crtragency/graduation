import OpenAI from "openai";
import type { GenerationResult, GeneratorRequest } from "@/lib/types";
import { slugify } from "@/lib/utils";

type ProjectDomain = "healthcare" | "education" | "energy" | "agriculture" | "campus" | "general";

function projectDomain(request: GeneratorRequest): ProjectDomain {
  const brief = `${request.websiteType} ${request.prompt}`.toLowerCase();
  if (/hospital|health|clinic|patient|doctor|medical/.test(brief)) return "healthcare";
  if (/school|education|learning|student|teacher|hearing/.test(brief)) return "education";
  if (/energy|electric|power|solar/.test(brief)) return "energy";
  if (/agriculture|farm|soil|irrigation|crop/.test(brief)) return "agriculture";
  if (/campus|university service|maintenance request/.test(brief)) return "campus";
  return "general";
}

function projectName(domain: ProjectDomain) {
  return {
    healthcare: "Hospital Management System",
    education: "Accessible Learning Platform",
    energy: "Smart Energy Monitoring System",
    agriculture: "Smart Irrigation System",
    campus: "Campus Services Platform",
    general: "Graduation Project",
  }[domain];
}

function paletteFor(request: GeneratorRequest, domain: ProjectDomain) {
  if (request.colorTheme === "forest" || domain === "agriculture" || domain === "energy") return ["#245c4b", "#dfece4", "#f7f6f0", "#21342e"];
  if (request.colorTheme === "warm-sand") return ["#8a5b28", "#f1dfbd", "#fffaf0", "#3d3125"];
  if (request.colorTheme === "slate") return ["#344a5f", "#dde5ea", "#f7f9fa", "#1f2d38"];
  if (request.colorTheme === "healthcare-teal" || domain === "healthcare") return ["#176b68", "#d9eeeb", "#f7fbfa", "#153d4a"];
  return ["#1f5870", "#dbeaec", "#fbfaf6", "#173f52"];
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[character] ?? character);
}

function demoPreview(name: string, request: GeneratorRequest) {
  const rtl = request.language === "arabic";
  const bilingual = request.language === "both";
  const domain = projectDomain(request);
  const palette = paletteFor(request, domain);
  const safeName = escapeHtml(name);
  const brief = escapeHtml(request.prompt.trim().replace(/\s+/g, " ").slice(0, 260));
  const content = rtl ? {
    overview: "نظرة عامة", problem: "المشكلة", solution: "الحل", modules: "الوحدات", technology: "التقنيات", team: "الفريق",
    label: "مشروع تخرج", headline: "مشروع عملي يبدأ من مشكلة واضحة.", intro: "نقدّم هنا فكرة المشروع وأهدافه وطريقة عمله بلغة مباشرة تساعد المشرف والمستخدم على فهم ما أنجزه الفريق.",
    review: "استعرض المشروع", document: "وثائق المشروع", problemTitle: "المشكلة التي نعمل عليها", problemText: "توضح هذه الصفحة التحدي الواقعي الذي دفع الفريق إلى بناء النظام، والفئات المتأثرة به، وحدود نطاق المشروع.",
    solutionTitle: "الحل المقترح", solutionText: "منصة منظمة تربط المهام الأساسية في مسار واحد واضح، مع صلاحيات مناسبة لكل نوع من المستخدمين.",
    modulesTitle: "الوحدات الرئيسية", modulesIntro: "كل وحدة مرتبطة بهدف واضح داخل المشروع، وليست مجرد قائمة مميزات.",
    moduleNames: ["إدارة المستخدمين والصلاحيات", "مسار العمل الأساسي", "التقارير والمتابعة"],
    moduleTexts: ["تحديد الأدوار والوصول إلى البيانات حسب مسؤولية كل مستخدم.", "تنفيذ أهم عمليات النظام بخطوات قصيرة يمكن تتبعها.", "عرض المعلومات المهمة وتوثيق النتائج دون أرقام مختلقة."],
    method: "المنهجية التقنية", methodText: "يوثّق الفريق المتطلبات، يصمم تدفق البيانات، يبني الوحدات تدريجياً، ثم يراجع قابلية الاستخدام والأمان والنتائج.",
    teamTitle: "عمل صممه وراجعه فريق المشروع", teamText: "تُعرض مساهمة كل طالب ومعلومات الإشراف والمراجع الحقيقية في النسخة النهائية.", prepared: "أُعدّ للمراجعة الأكاديمية والعرض النهائي.", steps: ["المتطلبات", "معمارية النظام", "التنفيذ", "التقييم"], roles: ["البحث", "التصميم", "التطوير", "الاختبار", "التوثيق"],
  } : {
    overview: "Overview", problem: "Problem", solution: "Solution", modules: "Modules", technology: "Technology", team: "Team",
    label: "Graduation project", headline: "A practical project built around a clear problem.", intro: "This website presents the project idea, objectives, and implementation in direct language so supervisors and users can understand what the team built.",
    review: "Explore the project", document: "Project documents", problemTitle: "The problem we are addressing", problemText: "This section explains the real-world challenge behind the system, who is affected by it, and the boundaries of the graduation project.",
    solutionTitle: "Our proposed solution", solutionText: "A focused platform that connects the essential tasks in one understandable workflow, with appropriate access for each user role.",
    modulesTitle: "Core system modules", modulesIntro: "Each module is tied to a project objective, not presented as a generic feature list.",
    moduleNames: ["Users and permissions", "Core project workflow", "Reports and review"],
    moduleTexts: ["Defines roles and access according to each user's actual responsibilities.", "Supports the system's main tasks through short, traceable steps.", "Presents useful information and documented findings without invented metrics."],
    method: "Technical methodology", methodText: "The team documents requirements, maps data flows, builds modules incrementally, then reviews usability, security, and evidence.",
    teamTitle: "Designed and reviewed by the project team", teamText: "Student contributions, supervision details, and verified references belong in the final version.", prepared: "Prepared for academic review and final presentation.", steps: ["Requirements", "Architecture", "Implementation", "Evaluation"], roles: ["Research", "Design", "Development", "Testing", "Documentation"],
  };

  return `<!doctype html><html lang="${rtl ? "ar" : "en"}" dir="${rtl ? "rtl" : "ltr"}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${safeName}</title><style>
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:Arial,"Noto Sans Arabic",sans-serif;background:${palette[2]};color:${palette[3]};line-height:1.65}a{text-decoration:none;color:inherit}.wrap{width:min(1120px,88%);margin:auto}.nav{height:74px;background:#fff;border-bottom:1px solid #dce4e2;display:flex;align-items:center}.nav .wrap{display:flex;align-items:center;justify-content:space-between}.brand{display:flex;align-items:center;gap:10px;font-size:14px;font-weight:800}.mark{width:34px;height:34px;border-radius:8px;background:${palette[0]};display:grid;place-items:center;color:#fff}.links{display:flex;align-items:center;gap:24px;font-size:12px;color:#5d6a70}.language{border:1px solid #d7dfdd;border-radius:8px;padding:6px 10px;background:#fff;color:${palette[0]};font-weight:700}.hero{padding:90px 0 76px;border-bottom:1px solid #dce4e2;background:#fff}.hero-grid{display:grid;grid-template-columns:1.08fr .92fr;gap:70px;align-items:center}.eyebrow{display:inline-flex;align-items:center;gap:8px;color:${palette[0]};font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.14em}.eyebrow:before{content:"";width:28px;height:2px;background:${palette[0]}}h1{font-size:clamp(40px,5.7vw,68px);line-height:1.08;letter-spacing:-.045em;margin:20px 0;color:${palette[3]}}.lead{max-width:630px;color:#5d6a70;font-size:16px}.actions{display:flex;gap:10px;margin-top:30px}.btn{display:inline-flex;padding:11px 18px;border-radius:8px;font-size:12px;font-weight:800;border:1px solid #ccd8d6}.btn.primary{background:${palette[0]};color:#fff;border-color:${palette[0]}}.brief{border:1px solid #cadbd8;background:${palette[1]};padding:26px;border-radius:18px}.brief small{color:${palette[0]};font-weight:800;text-transform:uppercase;letter-spacing:.12em}.brief p{margin:14px 0 0;color:#3f5558;font-size:13px}.brief-list{margin-top:22px;display:grid;gap:9px}.brief-row{display:flex;gap:10px;align-items:center;background:#ffffffb8;border:1px solid #d3e2df;padding:11px;border-radius:9px;font-size:11px}.number{display:grid;place-items:center;width:24px;height:24px;background:${palette[0]};color:white;border-radius:6px;font-size:9px;font-weight:bold}.section{padding:78px 0}.section-head{max-width:700px}.section-head span{color:${palette[0]};font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.13em}.section-head h2{font-size:clamp(30px,4vw,44px);line-height:1.15;letter-spacing:-.035em;margin:10px 0}.section-head p{color:#667476}.problem-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:36px}.statement{padding:28px;border:1px solid #d8e0de;border-radius:14px;background:#fff}.statement.solution{background:${palette[1]};border-color:#c7dcd8}.statement b{display:block;margin-bottom:10px;font-size:17px}.statement p{font-size:13px;color:#5d6a70;margin:0}.modules{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:34px}.module{border-top:3px solid ${palette[0]};background:#fff;padding:25px;border-radius:4px 4px 12px 12px;box-shadow:0 10px 26px #1b3d4610}.module strong{display:block;margin:20px 0 8px}.module p{font-size:12px;color:#637174;margin:0}.module .number{background:${palette[1]};color:${palette[0]}}.method{background:${palette[3]};color:#fff}.method .section-head span{color:${palette[1]}}.method .section-head h2{color:#fff}.method .section-head p{color:#d0dcde}.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:#ffffff26;border:1px solid #ffffff26;margin-top:38px}.step{background:${palette[3]};padding:24px;font-size:12px}.step i{font-style:normal;color:${palette[1]};font-weight:bold}.step b{display:block;margin-top:25px}.team{display:grid;grid-template-columns:.7fr 1.3fr;gap:60px;align-items:center}.team-card{border:1px solid #d7dfdd;background:#fff;padding:28px;border-radius:14px}.team-card p{color:#657174;font-size:13px}.roles{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}.roles span{padding:7px 10px;background:${palette[1]};border-radius:6px;color:${palette[0]};font-size:10px;font-weight:bold}.footer{border-top:1px solid #dce4e2;background:#fff;padding:26px 0;font-size:11px;color:#697577}.footer .wrap{display:flex;justify-content:space-between;gap:20px}
@media(max-width:780px){.links{display:none}.hero{padding:60px 0}.hero-grid,.team{grid-template-columns:1fr;gap:36px}.problem-grid,.modules{grid-template-columns:1fr}.steps{grid-template-columns:1fr 1fr}h1{font-size:42px}.actions{flex-wrap:wrap}.footer .wrap{flex-direction:column}}
</style></head><body><nav class="nav"><div class="wrap"><a class="brand" href="#overview"><span class="mark">${safeName.slice(0, 1)}</span>${safeName}</a><div class="links"><a href="#overview">${content.overview}</a><a href="#problem">${content.problem}</a><a href="#modules">${content.modules}</a><a href="#technology">${content.technology}</a><a href="#team">${content.team}</a>${bilingual ? '<span class="language">EN / العربية</span>' : ""}</div></div></nav><main><section class="hero" id="overview"><div class="wrap hero-grid"><div><span class="eyebrow">${content.label}</span><h1>${content.headline}</h1><p class="lead">${content.intro}</p><div class="actions"><a class="btn primary" href="#problem">${content.review}</a><a class="btn" href="#technology">${content.document}</a></div></div><aside class="brief"><small>${content.overview}</small><p>${brief || content.intro}</p><div class="brief-list"><div class="brief-row"><span class="number">01</span>${content.problem}</div><div class="brief-row"><span class="number">02</span>${content.solution}</div><div class="brief-row"><span class="number">03</span>${content.modules}</div></div></aside></div></section><section class="section" id="problem"><div class="wrap"><div class="section-head"><span>${content.problem} & ${content.solution}</span><h2>${content.problemTitle}</h2></div><div class="problem-grid"><article class="statement"><b>${content.problemTitle}</b><p>${content.problemText}</p></article><article class="statement solution"><b>${content.solutionTitle}</b><p>${content.solutionText}</p></article></div></div></section><section class="section" id="modules"><div class="wrap"><div class="section-head"><span>${content.modules}</span><h2>${content.modulesTitle}</h2><p>${content.modulesIntro}</p></div><div class="modules">${content.moduleNames.map((module, index) => `<article class="module"><span class="number">0${index + 1}</span><strong>${module}</strong><p>${content.moduleTexts[index]}</p></article>`).join("")}</div></div></section><section class="section method" id="technology"><div class="wrap"><div class="section-head"><span>${content.technology}</span><h2>${content.method}</h2><p>${content.methodText}</p></div><div class="steps">${content.steps.map((step, index) => `<div class="step"><i>0${index + 1}</i><b>${step}</b></div>`).join("")}</div></div></section><section class="section" id="team"><div class="wrap team"><div class="section-head"><span>${content.team}</span><h2>${content.teamTitle}</h2></div><div class="team-card"><p>${content.teamText}</p><div class="roles">${content.roles.map((role) => `<span>${role}</span>`).join("")}</div></div></div></section></main><footer class="footer"><div class="wrap"><b>${safeName}</b><span>${content.prepared}</span></div></footer></body></html>`;
}

export function createDemoResult(request: GeneratorRequest): GenerationResult {
  const domain = projectDomain(request);
  const name = projectName(domain);
  const previewHtml = demoPreview(name, request);
  const safeBrief = request.prompt.replace(/`/g, "'").replace(/\$\{/g, "").slice(0, 320);
  return {
    projectId: `proj_${crypto.randomUUID()}`,
    name,
    summary: "A structured graduation-project website that explains the problem, objectives, system modules, technical approach, and team contribution in clear, reviewable sections.",
    pages: ["Overview", "Problem & Objectives", "System Modules", "Technical Approach", "Team", "Documents & Contact"],
    features: ["Project-specific information structure", "Arabic and English support", "Responsive accessible layout", "Module and user-role explanations", "Technical methodology section", "Editable source and review copy"],
    palette: paletteFor(request, domain),
    previewHtml,
    files: [
      { path: "app/page.tsx", language: "tsx", content: `import { ProjectOverview } from "@/components/project-overview";\nimport { ProjectModules } from "@/components/project-modules";\nimport { TechnicalApproach } from "@/components/technical-approach";\n\nexport default function HomePage() {\n  return (\n    <main>\n      <ProjectOverview />\n      <ProjectModules />\n      <TechnicalApproach />\n    </main>\n  );\n}` },
      { path: "components/project-overview.tsx", language: "tsx", content: `const projectBrief = ${JSON.stringify(safeBrief)};\n\nexport function ProjectOverview() {\n  return (\n    <section aria-labelledby="project-title">\n      <p>Graduation project</p>\n      <h1 id="project-title">${name}</h1>\n      <p>{projectBrief}</p>\n      <a href="#project-modules">Explore the project</a>\n    </section>\n  );\n}` },
      { path: "components/project-modules.tsx", language: "tsx", content: `const modules = [\n  { title: "Users and permissions", description: "Access follows each user's responsibilities." },\n  { title: "Core project workflow", description: "The main tasks are presented in clear, traceable steps." },\n  { title: "Reports and review", description: "Verified information is available for project evaluation." },\n];\n\nexport function ProjectModules() {\n  return <section id="project-modules"><h2>Core system modules</h2>{modules.map((module) => <article key={module.title}><h3>{module.title}</h3><p>{module.description}</p></article>)}</section>;\n}` },
      { path: "components/technical-approach.tsx", language: "tsx", content: `export function TechnicalApproach() {\n  return (\n    <section>\n      <h2>Technical methodology</h2>\n      <ol><li>Requirements</li><li>Architecture</li><li>Implementation</li><li>Evaluation</li></ol>\n    </section>\n  );\n}` },
      { path: "app/globals.css", language: "css", content: `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n:root { --project-primary: ${paletteFor(request, domain)[0]}; --project-paper: ${paletteFor(request, domain)[2]}; }\nbody { margin: 0; background: var(--project-paper); color: #173f52; font-family: Arial, sans-serif; }` },
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
      { role: "system", content: "You are ProjectForge EDU, a senior product designer and graduation-project information architect. Return valid JSON only with keys: name, summary, pages (string[]), features (string[]), palette (hex string[]). Create a concrete, honest website blueprint that helps students explain a project they understand. Use the specific domain, audience, problem, modules, technical approach, limitations, and team context in the brief. Never invent results, statistics, testimonials, institutional approval, research findings, or users. Avoid stereotypical AI design and copy: no purple/cyan neon gradients, glassmorphism, glowing blobs, excessive floating cards, generic dashboards, fake metrics, or slogans such as 'built for what comes next'. Prefer a restrained field-appropriate palette, familiar layouts, clear hierarchy, natural project-specific wording, accessible responsive design, and restrained motion. Never include scripts, iframes, external tracking, secrets, or unsafe HTML." },
      { role: "user", content: JSON.stringify(request) },
    ],
  });
  try {
    const parsed = JSON.parse(response.choices[0]?.message.content ?? "{}");
    const name = String(parsed.name ?? fallback.name).slice(0, 80);
    return {
      ...fallback,
      name,
      summary: String(parsed.summary ?? fallback.summary).slice(0, 500),
      pages: Array.isArray(parsed.pages) ? parsed.pages.slice(0, 12).map(String) : fallback.pages,
      features: Array.isArray(parsed.features) ? parsed.features.slice(0, 16).map(String) : fallback.features,
      palette: Array.isArray(parsed.palette) ? parsed.palette.slice(0, 8).map(String) : fallback.palette,
      previewHtml: demoPreview(name, request),
    };
  } catch {
    return fallback;
  }
}
