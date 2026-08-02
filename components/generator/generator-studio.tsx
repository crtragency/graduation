"use client";

import { useState } from "react";
import {
  ArrowRight, BookOpenCheck, Braces, Check, Clipboard, Cloud, Code2,
  Download, ExternalLink, FileSearch, Github, Globe2, Lightbulb, Loader2,
  Maximize2, Monitor, PencilLine, Play, QrCode, Rocket, Smartphone,
  Tablet, Target, UsersRound, Workflow,
} from "lucide-react";
import { toast } from "sonner";
import QRCode from "qrcode";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { GenerationResult, GeneratorRequest, WebsiteType } from "@/lib/types";
import { cn } from "@/lib/utils";

const examplePrompt = "Our graduation project is a hospital management system called CareFlow. It helps reception staff manage appointments, doctors review patient records, and administrators organize staff access. Build a bilingual Arabic and English website that explains the problem, objectives, user roles, system modules, technology, team, and contact information. Use a calm, trustworthy healthcare style without invented statistics.";

const projectIdeas = [
  "Our graduation project is a smart energy monitoring system for university buildings. Explain the problem of energy waste, the sensor network, live monitoring dashboard, alert rules, reports, project methodology, team roles, and future work. Use a practical engineering style.",
  "Our graduation project is an accessible learning platform for students with hearing difficulties. Present the research problem, target users, learning modules, captioning workflow, accessibility decisions, evaluation plan, technology, and team.",
  "Our graduation project is an agriculture system that monitors soil moisture and helps farmers plan irrigation. Explain the hardware, data flow, farmer dashboard, notifications, field tests, limitations, and future improvements.",
  "Our graduation project is a campus services application that helps students find rooms, submit maintenance requests, and follow university announcements. Present the user roles, main journeys, system modules, architecture, and team contribution.",
];

const stages = [
  { label: "Reading the project brief", icon: FileSearch, detail: "Identifying the problem, audience, scope, and academic context" },
  { label: "Organizing the project story", icon: Workflow, detail: "Arranging objectives, modules, technology, and team information" },
  { label: "Choosing the visual direction", icon: Target, detail: "Matching colors and typography to the subject instead of using a generic theme" },
  { label: "Building the pages", icon: Braces, detail: "Creating responsive sections and readable source files" },
  { label: "Checking clarity and access", icon: BookOpenCheck, detail: "Reviewing hierarchy, language direction, metadata, and accessibility" },
  { label: "Preparing your review copy", icon: Cloud, detail: "Packaging the preview so your team can inspect it" },
];

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1.5 block text-xs font-semibold text-foreground">{label}</span>{hint && <span className="mb-2 block text-[10px] leading-4 text-muted-foreground">{hint}</span>}{children}</label>;
}

const selectClass = "h-11 w-full rounded-xl border border-input bg-card px-3 text-xs text-foreground outline-none transition focus:border-[#287c78] focus:ring-2 focus:ring-[#287c78]/15";

function GenerationProgress({ active }: { active: number }) {
  return (
    <div className="mx-auto w-full max-w-2xl py-8">
      <div className="flex items-center gap-4 rounded-2xl border border-[#c7dfe1] bg-[#f0f7f7] p-5 dark:bg-secondary">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#dbeaec] text-[#1f5870]"><BookOpenCheck className="size-6" /></span>
        <div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#287c78]">Preparing your project website</p><h1 className="mt-1 text-lg font-semibold">Building one clear section at a time</h1><p className="mt-1 text-xs text-muted-foreground">You will be able to review the wording, layout, and source before publishing.</p></div>
      </div>
      <div className="mt-7 space-y-2">
        {stages.map((stage, index) => {
          const done = index < active;
          const current = index === active;
          return <div className={cn("flex items-center gap-3 rounded-xl border bg-card px-4 py-3 transition", current ? "border-[#7bb0ae] shadow-sm" : done ? "border-[#cde2db]" : "border-border opacity-55")} key={stage.label}><span className={cn("grid size-8 place-items-center rounded-lg", done ? "bg-[#e1f1ea] text-[#287c78]" : current ? "bg-[#dbeaec] text-[#1f5870]" : "bg-secondary text-muted-foreground")}>{done ? <Check className="size-4" /> : <stage.icon className="size-4" />}</span><div className="flex-1"><b className="block text-xs font-semibold">{stage.label}</b><small className="text-[10px] leading-4 text-muted-foreground">{stage.detail}</small></div>{current && <Loader2 className="size-4 animate-spin text-[#287c78]" />}</div>;
        })}
      </div>
      <div className="mt-7 h-1.5 overflow-hidden rounded-full bg-secondary"><span className="block h-full rounded-full bg-[#287c78] transition-all duration-500" style={{ width: `${Math.min(((active + 1) / stages.length) * 100, 100)}%` }} /></div>
    </div>
  );
}

async function readResponse(response: Response) {
  const text = await response.text();
  try { return text ? JSON.parse(text) : {}; } catch { return {}; }
}

async function requestGeneration(request: GeneratorRequest): Promise<GenerationResult> {
  let lastError: unknown;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 90_000);
    try {
      const response = await fetch("/api/generate", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(request), signal: controller.signal });
      const body = await readResponse(response);
      if (!response.ok) throw new Error(typeof body.error === "string" ? body.error : "The project could not be generated.");
      if (!body.data) throw new Error("The server returned an incomplete project. Please try again.");
      return body.data as GenerationResult;
    } catch (error) {
      lastError = error;
      if (attempt === 0 && (error instanceof TypeError || (error instanceof DOMException && error.name === "AbortError"))) await new Promise((resolve) => window.setTimeout(resolve, 800));
      else break;
    } finally {
      window.clearTimeout(timeout);
    }
  }
  if (lastError instanceof DOMException && lastError.name === "AbortError") throw new Error("The preview took too long to respond. Please try again in a moment.");
  if (lastError instanceof TypeError) throw new Error("The preview server is unavailable. Refresh the page, then try again.");
  throw lastError instanceof Error ? lastError : new Error("The project could not be generated. Please try again.");
}

function ResultWorkspace({ result, onNew }: { result: GenerationResult; onNew: () => void }) {
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [selectedFile, setSelectedFile] = useState(result.files[0]?.path ?? "");
  const [liveUrl, setLiveUrl] = useState(result.liveUrl);
  const [qr, setQr] = useState<string>();
  const selected = result.files.find((file) => file.path === selectedFile) ?? result.files[0];
  const width = viewport === "desktop" ? "100%" : viewport === "tablet" ? "768px" : "390px";

  const download = async () => {
    try {
      const response = await fetch("/api/export", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name: result.name, files: result.files }) });
      if (!response.ok) throw new Error("The export could not be prepared.");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${result.name.toLowerCase().replace(/\s+/g, "-")}.zip`;
      anchor.click();
      URL.revokeObjectURL(url);
      toast.success("Project files downloaded");
    } catch { toast.error("The export server is unavailable. Please try again."); }
  };

  const deploy = async () => {
    toast.loading("Preparing the public website...", { id: "deploy" });
    try {
      const response = await fetch("/api/deploy", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name: result.name, files: result.files }) });
      const body = await readResponse(response);
      if (!response.ok) throw new Error(typeof body.error === "string" ? body.error : "Connect a Vercel account before publishing.");
      setLiveUrl(body.url);
      toast.success("Website published successfully", { id: "deploy" });
    } catch (error) { toast.error(error instanceof TypeError ? "The publishing server is unavailable." : error instanceof Error ? error.message : "The website could not be published.", { id: "deploy" }); }
  };

  const github = async () => {
    toast.loading("Preparing the repository...", { id: "github" });
    try {
      const response = await fetch("/api/github", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name: result.name, files: result.files }) });
      const body = await readResponse(response);
      if (!response.ok) throw new Error(typeof body.error === "string" ? body.error : "Connect GitHub before creating a repository.");
      toast.success("GitHub repository created", { id: "github" });
    } catch (error) { toast.error(error instanceof TypeError ? "The GitHub service is unavailable." : error instanceof Error ? error.message : "The repository could not be created.", { id: "github" }); }
  };

  const showQr = async () => {
    const value = liveUrl ?? `${location.origin}/dashboard/projects/${result.projectId}`;
    setQr(await QRCode.toDataURL(value, { width: 260, margin: 2, color: { dark: "#173f52", light: "#ffffff" } }));
  };

  const copyLink = async () => { await navigator.clipboard.writeText(liveUrl ?? location.href); toast.success("Review link copied"); };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      <div className="flex flex-col gap-3 border-b border-border bg-card px-4 py-3 lg:flex-row lg:items-center">
        <div className="flex min-w-0 items-center gap-3"><span className="grid size-9 place-items-center rounded-xl bg-[#e1f1ea] text-[#287c78]"><Check className="size-4" /></span><div className="min-w-0"><h1 className="truncate text-sm font-semibold">{result.name}</h1><p className="text-[10px] text-muted-foreground">Review copy ready · {result.files.length} source files · {result.pages.length} suggested sections</p></div></div>
        <div className="flex flex-wrap items-center gap-2 lg:ml-auto"><Button variant="ghost" size="sm" onClick={onNew}>New brief</Button><Button variant="outline" size="sm" onClick={download}><Download /> Download</Button><Button variant="outline" size="sm" onClick={github}><Github /> GitHub</Button><Button variant="outline" size="sm" onClick={showQr}><QrCode /> Share</Button><Button size="sm" onClick={deploy}><Rocket /> {liveUrl ? "Update website" : "Publish"}</Button>{liveUrl && <Button size="icon" variant="ghost" asChild><a href={liveUrl} target="_blank" rel="noreferrer" aria-label="Open public website"><ExternalLink /></a></Button>}</div>
      </div>
      <div className="grid border-b border-border bg-[#fff9e8] dark:bg-secondary lg:grid-cols-[1.2fr_.8fr]">
        <div className="border-b border-border px-5 py-4 lg:border-b-0 lg:border-r"><p className="text-[9px] font-bold uppercase tracking-[.15em] text-[#a47520]">Project summary</p><p className="mt-2 max-w-3xl text-xs leading-5 text-foreground/80">{result.summary}</p></div>
        <div className="flex flex-wrap items-center gap-2 px-5 py-4"><span className="text-[9px] font-bold uppercase tracking-[.15em] text-muted-foreground">Sections</span>{result.pages.slice(0, 5).map((page) => <span className="rounded-full border border-border bg-card px-2.5 py-1 text-[9px]" key={page}>{page}</span>)}</div>
      </div>
      <div className="flex flex-1 flex-col overflow-hidden xl:grid xl:grid-cols-[248px_1fr]">
        <aside className="hidden border-r border-border bg-card p-3 xl:block"><div className="px-2 py-2 text-[9px] font-bold uppercase tracking-[.18em] text-muted-foreground">Project files</div><div className="mt-1 space-y-0.5">{result.files.map((file) => <button onClick={() => { setSelectedFile(file.path); setTab("code"); }} className={cn("flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[11px] text-muted-foreground hover:bg-secondary hover:text-foreground", selectedFile === file.path && tab === "code" && "bg-[#e8f1f3] text-[#173f52]")} key={file.path}><Code2 className="size-3" /><span className="truncate">{file.path}</span></button>)}</div><div className="mt-6 px-2 py-2 text-[9px] font-bold uppercase tracking-[.18em] text-muted-foreground">Included in the plan</div><div className="space-y-2 px-2 text-[10px] leading-4 text-muted-foreground">{result.features.map((item) => <p className="flex gap-2" key={item}><Check className="mt-0.5 size-3 shrink-0 text-[#287c78]" />{item}</p>)}</div></aside>
        <section className="flex min-w-0 flex-1 flex-col bg-secondary/40">
          <div className="flex h-12 items-center border-b border-border bg-card px-3"><div className="flex rounded-lg border border-border bg-secondary p-0.5"><button onClick={() => setTab("preview")} className={cn("rounded-md px-3 py-1.5 text-[11px]", tab === "preview" && "bg-card text-foreground shadow-sm")}>Website preview</button><button onClick={() => setTab("code")} className={cn("rounded-md px-3 py-1.5 text-[11px]", tab === "code" && "bg-card text-foreground shadow-sm")}>Source code</button></div>{tab === "preview" && <div className="ml-auto flex items-center gap-1"><Button size="icon" variant={viewport === "desktop" ? "secondary" : "ghost"} className="size-8" onClick={() => setViewport("desktop")} aria-label="Desktop preview"><Monitor /></Button><Button size="icon" variant={viewport === "tablet" ? "secondary" : "ghost"} className="size-8" onClick={() => setViewport("tablet")} aria-label="Tablet preview"><Tablet /></Button><Button size="icon" variant={viewport === "mobile" ? "secondary" : "ghost"} className="size-8" onClick={() => setViewport("mobile")} aria-label="Mobile preview"><Smartphone /></Button><div className="mx-1 h-5 w-px bg-border" /><Button size="icon" variant="ghost" className="size-8" aria-label="Maximize preview"><Maximize2 /></Button></div>}</div>
          {tab === "preview" ? <div className="soft-scrollbar flex flex-1 justify-center overflow-auto p-3 sm:p-6"><div className="h-[calc(100vh-12.5rem)] overflow-hidden rounded-xl border border-border bg-white shadow-[0_18px_50px_rgba(23,63,82,.12)] transition-[width] duration-300" style={{ width, maxWidth: "100%" }}><iframe title="Generated graduation project website preview" sandbox="allow-forms allow-modals allow-popups" className="size-full bg-white" srcDoc={result.previewHtml} /></div></div> : <div className="flex min-h-0 flex-1 flex-col bg-[#112f3d] text-white"><div className="flex h-10 items-center gap-2 border-b border-white/10 px-4 text-[10px] text-white/60"><Code2 className="size-3" />{selected?.path}<Button onClick={() => { navigator.clipboard.writeText(selected?.content ?? ""); toast.success("Code copied"); }} variant="ghost" size="icon" className="ml-auto size-7 text-white hover:bg-white/10 hover:text-white"><Clipboard /></Button></div><pre className="soft-scrollbar flex-1 overflow-auto p-5 font-mono text-[11px] leading-6 text-white/75"><code>{selected?.content}</code></pre></div>}
        </section>
      </div>
      {qr && <div className="fixed inset-0 z-[70] grid place-items-center bg-[#173f52]/55 p-5 backdrop-blur-sm" onClick={() => setQr(undefined)}><div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 text-center shadow-2xl" onClick={(event) => event.stopPropagation()}><img src={qr} alt="Project share QR code" className="mx-auto size-56 rounded-xl bg-white p-2" /><h2 className="mt-5 font-semibold">Share this project review</h2><p className="mt-1 text-xs text-muted-foreground">Scan the code or copy the link for your team and supervisor.</p><div className="mt-5 flex gap-2"><Button variant="outline" className="flex-1" onClick={copyLink}><Clipboard /> Copy link</Button><Button className="flex-1" onClick={() => setQr(undefined)}>Done</Button></div></div></div>}
    </div>
  );
}

export function GeneratorStudio() {
  const [request, setRequest] = useState<GeneratorRequest>({ prompt: "", websiteType: "graduation", colorTheme: "academic-blue", typography: "modern", framework: "nextjs", language: "both" });
  const [status, setStatus] = useState<"idle" | "generating" | "done">("idle");
  const [activeStage, setActiveStage] = useState(0);
  const [result, setResult] = useState<GenerationResult>();
  const chars = request.prompt.length;
  const update = <K extends keyof GeneratorRequest>(key: K, value: GeneratorRequest[K]) => setRequest((current) => ({ ...current, [key]: value }));

  const generate = async () => {
    if (request.prompt.trim().length < 40) { toast.error("Add a little more detail about the problem, users, and project modules."); return; }
    setStatus("generating");
    setActiveStage(0);
    setResult(undefined);
    const timers = stages.slice(1).map((_, index) => window.setTimeout(() => setActiveStage(index + 1), (index + 1) * 650));
    try {
      const data = await requestGeneration(request);
      await new Promise((resolve) => window.setTimeout(resolve, Math.max(0, stages.length * 650 - 500)));
      setResult(data);
      setStatus("done");
    } catch (error) {
      setStatus("idle");
      toast.error(error instanceof Error ? error.message : "The project could not be generated. Please try again.");
    } finally { timers.forEach(window.clearTimeout); }
  };

  const improve = () => {
    if (!request.prompt.trim()) { update("prompt", examplePrompt); return; }
    update("prompt", `${request.prompt.trim()} Clearly explain the real problem, target users, project objectives, main modules, team contribution, technical approach, limitations, and future work. Use field-appropriate colors and natural project-specific language. Do not invent results, statistics, testimonials, or claims.`);
    toast.success("Your brief now includes the points evaluators usually need");
  };

  if (status === "done" && result) return <ResultWorkspace result={result} onNew={() => { setStatus("idle"); setResult(undefined); }} />;
  if (status === "generating") return <main className="grid min-h-[calc(100vh-4rem)] place-items-center p-5"><GenerationProgress active={activeStage} /></main>;

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
          <div><Badge className="border-[#c7dfe1] bg-[#f0f7f7] text-[#1f5870]"><BookOpenCheck className="size-3.5" /> Graduation project website</Badge><h1 className="mt-5 text-3xl font-semibold tracking-[-.04em] sm:text-5xl">Start with what your project actually solves.</h1><p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">Write as if you are explaining the project to your supervisor. Mention the problem, users, modules, and what your team built.</p></div>
          <div className="grid grid-cols-3 gap-2">{[[Target, "Problem", "What needs to change?"], [UsersRound, "Users", "Who will use it?"], [Workflow, "Modules", "How does it work?"]].map(([Icon, title, text]) => { const ItemIcon = Icon as typeof Target; return <div className="rounded-xl border border-border bg-card p-3" key={title as string}><ItemIcon className="size-4 text-[#287c78]" /><p className="mt-3 text-[11px] font-semibold">{title as string}</p><p className="mt-1 text-[9px] leading-4 text-muted-foreground">{text as string}</p></div>; })}</div>
        </div>

        <div className="mt-9 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center gap-3 border-b border-border bg-[#f0f7f7] px-5 py-4 dark:bg-secondary"><span className="grid size-9 place-items-center rounded-lg bg-[#dbeaec] text-[#1f5870]"><PencilLine className="size-4" /></span><div><h2 className="text-sm font-semibold">Project brief</h2><p className="text-[10px] text-muted-foreground">The details here become the content and structure of your website.</p></div></div>
          <div className="p-4 sm:p-6"><Textarea autoFocus value={request.prompt} onChange={(event) => update("prompt", event.target.value)} maxLength={5000} placeholder="Example: Our graduation project is a hospital management system. It helps reception staff manage appointments..." className="min-h-52 p-4 text-sm leading-7" /><div className="mt-2 flex items-center justify-between"><span className="text-[10px] text-muted-foreground">Use real project details. You can edit everything later.</span><span className="text-[10px] text-muted-foreground">{chars} / 5000</span></div><div className="mt-4 flex flex-wrap gap-2"><Button size="sm" variant="outline" onClick={improve}><BookOpenCheck /> Complete the brief</Button><Button size="sm" variant="ghost" onClick={() => update("prompt", projectIdeas[Math.floor(Math.random() * projectIdeas.length)])}><Lightbulb /> Try a project idea</Button><Button size="sm" variant="ghost" onClick={() => update("prompt", examplePrompt)}><Play /> Hospital example</Button></div></div>
        </div>

        <div className="mt-5 grid gap-5 rounded-2xl border border-border bg-card p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
          <Field label="Project category" hint="Helps choose a familiar information structure"><select className={selectClass} value={request.websiteType} onChange={(event) => update("websiteType", event.target.value as WebsiteType)}>{["graduation", "hospital", "school", "business", "portfolio", "ecommerce", "landing", "restaurant", "company", "personal"].map((type) => <option key={type} value={type}>{type === "graduation" ? "General graduation project" : type === "ecommerce" ? "E-commerce" : type[0].toUpperCase() + type.slice(1)}</option>)}</select></Field>
          <Field label="Visual direction" hint="A restrained palette that fits your subject"><select className={selectClass} value={request.colorTheme} onChange={(event) => update("colorTheme", event.target.value)}><option value="academic-blue">Academic blue</option><option value="healthcare-teal">Healthcare teal</option><option value="forest">Environmental green</option><option value="warm-sand">Warm sand</option><option value="slate">Technical slate</option><option value="custom">Choose from the brief</option></select></Field>
          <Field label="Typography" hint="Choose how formal the project should feel"><select className={selectClass} value={request.typography} onChange={(event) => update("typography", event.target.value)}><option value="modern">Clear modern sans</option><option value="editorial">Academic serif</option><option value="technical">Technical mono accents</option><option value="friendly">Friendly rounded</option></select></Field>
          <Field label="Framework" hint="The source-code format for your team"><select className={selectClass} value={request.framework} onChange={(event) => update("framework", event.target.value as GeneratorRequest["framework"])}><option value="nextjs">Next.js</option><option value="react">React</option><option value="html">HTML</option><option value="vue">Vue</option><option value="angular">Angular</option></select></Field>
          <Field label="Website language" hint="Arabic pages use proper right-to-left layout"><select className={selectClass} value={request.language} onChange={(event) => update("language", event.target.value as GeneratorRequest["language"])}><option value="both">Arabic + English</option><option value="arabic">Arabic</option><option value="english">English</option></select></Field>
          <div className="flex items-end"><div className="w-full rounded-xl border border-[#ead9a8] bg-[#fff9e8] px-4 py-3 dark:bg-secondary"><span className="text-[10px] font-semibold text-[#8c681f]">What you will receive</span><p className="mt-1 text-[11px] leading-4 text-muted-foreground">A reviewable website, source files, and a clear section plan.</p></div></div>
        </div>

        <div className="mt-6 flex flex-col items-center"><Button size="lg" onClick={generate} className="min-w-64">Build my project website <ArrowRight /></Button><p className="mt-3 flex items-center gap-1.5 text-[10px] text-muted-foreground"><Check className="size-3 text-[#287c78]" /> Review the facts, understand the code, and follow your university guidelines.</p></div>
      </div>
    </main>
  );
}
