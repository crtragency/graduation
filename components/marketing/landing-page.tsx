"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, BookOpenCheck, Check, ChevronDown, ClipboardList, Code2,
  FileText, FolderKanban, Github, Globe2, Languages, LayoutTemplate,
  Menu, Moon, Presentation, Rocket, ShieldCheck, Sun, UsersRound, X,
} from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

const reveal = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } };

const workflow = [
  { number: "01", title: "Write the project brief", text: "Explain the problem, who the project serves, its main modules, and what makes your solution useful." },
  { number: "02", title: "Review the structure", text: "Check the proposed pages and content before anything is built. You stay responsible for every project claim." },
  { number: "03", title: "Build and study", text: "Receive a responsive website and organized source files that your team can read, edit, and extend." },
  { number: "04", title: "Present with confidence", text: "Publish a clear link for your supervisor, demo day, portfolio, or final project discussion." },
];

const features = [
  { icon: ClipboardList, title: "A structure made for graduation projects", text: "Present the problem, objectives, solution, modules, methodology, technology, team, and documentation in a logical order." },
  { icon: Languages, title: "Arabic and English support", text: "Prepare an Arabic, English, or bilingual experience with proper reading direction and clear academic terminology." },
  { icon: LayoutTemplate, title: "Design that fits the project field", text: "Healthcare, education, engineering, business, and other projects get restrained colors and layouts suited to their subject." },
  { icon: Code2, title: "Code your team can understand", text: "Files are organized, typed, responsive, and ready for your team to review instead of being locked inside a visual editor." },
  { icon: FileText, title: "Useful documentation sections", text: "Add requirements, architecture, implementation notes, user roles, results, limitations, and future work without crowding the home page." },
  { icon: Rocket, title: "Ready to share and publish", text: "Preview on different screens, download the source, connect GitHub, or publish a link when the content is ready." },
];

const pages = [
  ["Project overview", "A direct summary of the idea, field, team, and objective."],
  ["Problem & objectives", "The real need your project addresses and the outcomes you are working toward."],
  ["System modules", "A clear explanation of features, users, roles, and main workflows."],
  ["Technical approach", "Architecture, tools, data flow, methodology, and important decisions."],
  ["Team & supervision", "Student roles, supervisor information, and responsibilities."],
  ["Documents & contact", "Reports, posters, demo links, repositories, and a way to reach the team."],
];

const faqs = [
  ["Does it write the whole graduation project for me?", "It helps you organize and present your own work as a website. Your team should verify the content, understand the code, and follow your university's academic-integrity rules."],
  ["Can I edit the website after it is created?", "Yes. You can review the source files, change content and design, download the project, and continue development with your team."],
  ["Can the website be bilingual?", "Yes. Choose Arabic, English, or both. Arabic layouts use proper right-to-left direction and the same clear information structure."],
  ["Will every project look the same?", "No. The layout, typography, colors, and page emphasis follow the subject and audience in your brief. The system avoids generic neon themes and invented statistics."],
  ["Can I show it to my supervisor before publishing?", "Yes. Use the preview to review the structure, wording, responsive layout, and source before you create a public deployment."],
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/92 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex" aria-label="Main navigation">
          <a className="transition hover:text-foreground" href="#workflow">How it works</a>
          <a className="transition hover:text-foreground" href="#included">What is included</a>
          <a className="transition hover:text-foreground" href="#principles">Our approach</a>
          <a className="transition hover:text-foreground" href="#faq">FAQ</a>
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>{theme === "dark" ? <Sun /> : <Moon />}</Button>
          <Button variant="ghost" asChild><Link href="/sign-in">Sign in</Link></Button>
          <Button asChild><Link href="/dashboard/generate">Start your project <ArrowRight /></Link></Button>
        </div>
        <Button className="md:hidden" variant="ghost" size="icon" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</Button>
      </div>
      {open && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="border-t border-border bg-background px-5 py-5 md:hidden"><nav className="flex flex-col gap-4 text-sm"><a href="#workflow" onClick={() => setOpen(false)}>How it works</a><a href="#included" onClick={() => setOpen(false)}>What is included</a><a href="#principles" onClick={() => setOpen(false)}>Our approach</a><a href="#faq" onClick={() => setOpen(false)}>FAQ</a><Button asChild className="mt-2"><Link href="/dashboard/generate">Start your project <ArrowRight /></Link></Button></nav></motion.div>}
    </header>
  );
}

function ProjectOutline() {
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .25, duration: .65 }} className="relative">
      <div className="absolute -left-5 -top-5 size-20 rounded-full bg-[#f2d991]/35" />
      <div className="relative overflow-hidden rounded-[28px] border border-[#c7dfe1] bg-card shadow-[0_28px_80px_rgba(23,63,82,.13)]">
        <div className="flex items-center justify-between border-b border-border bg-[#f0f7f7] px-5 py-4">
          <div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#287c78]">Project website plan</p><h2 className="mt-1 text-sm font-semibold text-[#173f52]">CareFlow · Hospital Management System</h2></div>
          <Badge className="bg-white text-[#287c78]"><Check className="size-3" /> Ready to review</Badge>
        </div>
        <div className="grid sm:grid-cols-[160px_1fr]">
          <aside className="border-b border-border bg-[#fbfaf6] p-4 sm:border-b-0 sm:border-r">
            <p className="mb-3 text-[9px] font-bold uppercase tracking-[.16em] text-muted-foreground">Website sections</p>
            {["Overview", "The problem", "Objectives", "System modules", "Technology", "Team"].map((item, index) => <div key={item} className={`mb-1.5 flex items-center gap-2 rounded-lg px-2.5 py-2 text-[10px] ${index === 0 ? "bg-[#dbeaec] font-semibold text-[#173f52]" : "text-muted-foreground"}`}><span className={`size-1.5 rounded-full ${index === 0 ? "bg-[#287c78]" : "bg-[#d5d1c5]"}`} />{item}</div>)}
          </aside>
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-2 text-[10px] font-semibold text-[#287c78]"><BookOpenCheck className="size-3.5" /> Graduation project overview</div>
            <h3 className="mt-3 max-w-md text-2xl font-semibold leading-tight tracking-tight text-[#173f52]">A clearer way to coordinate hospital work.</h3>
            <p className="mt-3 max-w-lg text-xs leading-5 text-slate-600">CareFlow brings patient records, appointments, and staff workflows into one secure system designed by our graduation team.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-[#fbfaf6] p-4"><span className="text-[9px] font-bold uppercase tracking-wider text-[#a47520]">Project problem</span><p className="mt-2 text-[11px] leading-5 text-slate-700">Scattered records and disconnected scheduling slow down daily hospital work.</p></div>
              <div className="rounded-xl border border-border bg-[#f0f7f7] p-4"><span className="text-[9px] font-bold uppercase tracking-wider text-[#287c78]">Proposed solution</span><p className="mt-2 text-[11px] leading-5 text-slate-700">A role-based platform with focused modules for staff, patients, and administrators.</p></div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">{["Patient records", "Appointments", "Staff roles", "Reports"].map((item) => <span className="rounded-full border border-border bg-white px-3 py-1.5 text-[9px] text-slate-600" key={item}>{item}</span>)}</div>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-4 -right-3 rounded-xl border border-[#ead9a8] bg-[#fff9e8] px-4 py-3 shadow-lg"><p className="text-[9px] font-bold uppercase tracking-wider text-[#8c681f]">Next review</p><p className="mt-1 text-[11px] font-semibold text-[#173f52]">Check objectives with supervisor</p></div>
    </motion.div>
  );
}

export function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <Navbar />
      <section className="relative border-b border-border px-5 pb-24 pt-32 sm:pt-40">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-35" />
        <div className="container relative grid items-center gap-16 lg:grid-cols-[.9fr_1.1fr]">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
            <Badge className="border-[#c7dfe1] bg-[#f0f7f7] px-3 py-1.5 text-[#1f5870]"><BookOpenCheck className="size-3.5" /> Made for graduation project teams</Badge>
            <h1 className="mt-7 max-w-3xl text-balance text-5xl font-semibold leading-[1.06] tracking-[-.05em] sm:text-6xl">Build a website that explains your <span className="text-[#1f5870]">graduation project clearly.</span></h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">Turn your team&apos;s idea into a structured, presentation-ready website. Plan the content, review every claim, study the code, and share the result with your supervisor.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button size="lg" asChild><Link href="/dashboard/generate">Start your project website <ArrowRight /></Link></Button><Button size="lg" variant="outline" asChild><a href="#workflow"><Presentation /> See the learning workflow</a></Button></div>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="size-3.5 text-[#287c78]" /> Your team reviews the content and keeps ownership of the source code.</p>
          </motion.div>
          <ProjectOutline />
        </div>
      </section>

      <section id="workflow" className="container py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}><Badge>Step by step</Badge><h2 className="mt-5 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">From a rough idea to a clear project story.</h2><p className="mt-5 max-w-lg leading-7 text-muted-foreground">The workspace guides your team through the decisions that matter. It does not hide the project behind a single magic button.</p></motion.div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">{workflow.map((item, index) => <motion.article initial="hidden" whileInView="visible" viewport={{ once: true, amount: .25 }} variants={reveal} transition={{ delay: index * .06 }} key={item.number} className="bg-card p-7"><span className="font-mono text-sm font-bold text-[#a47520]">{item.number}</span><h3 className="mt-8 text-lg font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p></motion.article>)}</div>
        </div>
      </section>

      <section id="included" className="border-y border-border bg-[#f2f7f6] py-24 dark:bg-secondary/35 sm:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center"><Badge>Designed for academic presentation</Badge><h2 className="mt-5 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">The right information, in an order people can follow.</h2><p className="mt-5 leading-7 text-muted-foreground">A good project website should help the reader understand your work—not distract them with effects or generic marketing language.</p></div>
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{features.map((feature, index) => <motion.article initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={reveal} transition={{ delay: index * .04 }} key={feature.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm"><span className="grid size-11 place-items-center rounded-xl bg-[#e5f0ef] text-[#287c78]"><feature.icon className="size-5" /></span><h3 className="mt-6 text-lg font-semibold">{feature.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.text}</p></motion.article>)}</div>
        </div>
      </section>

      <section className="container py-24 sm:py-32">
        <div className="grid items-start gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28"><Badge><FolderKanban className="size-3.5" /> Suggested structure</Badge><h2 className="mt-5 text-4xl font-semibold tracking-[-.04em]">A project website with room for the real work.</h2><p className="mt-5 leading-7 text-muted-foreground">The home page gives the short version. Dedicated sections let evaluators inspect the objectives, implementation, and team contribution in detail.</p></div>
          <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">{pages.map(([title, text], index) => <div className="grid gap-3 p-6 sm:grid-cols-[48px_1fr]" key={title}><span className="grid size-9 place-items-center rounded-lg bg-[#fff4d7] font-mono text-xs font-bold text-[#8c681f]">{String(index + 1).padStart(2, "0")}</span><div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p></div></div>)}</div>
        </div>
      </section>

      <section id="principles" className="container pb-24 sm:pb-32">
        <div className="overflow-hidden rounded-[28px] bg-[#173f52] text-white">
          <div className="grid lg:grid-cols-[1.05fr_.95fr]">
            <div className="p-8 sm:p-12 lg:p-16"><Badge className="border-white/20 bg-white/10 text-white"><ShieldCheck className="size-3.5" /> Academic integrity</Badge><h2 className="mt-6 text-4xl font-semibold tracking-[-.04em]">A helpful starting point, not a substitute for learning.</h2><p className="mt-5 max-w-xl leading-7 text-white/75">ProjectForge helps organize, design, and present work your team understands. Review generated text, replace assumptions with real evidence, cite your sources, and follow your university&apos;s policies.</p><div className="mt-8 grid gap-3 sm:grid-cols-2">{["No invented results or testimonials", "No generic AI-style design", "Readable source files", "Every claim remains reviewable"].map((item) => <div className="flex items-center gap-2 text-sm text-white/85" key={item}><Check className="size-4 text-[#82c3b9]" />{item}</div>)}</div></div>
            <div className="border-t border-white/10 bg-[#1b4b60] p-8 sm:p-12 lg:border-l lg:border-t-0"><Globe2 className="size-8 text-[#f2d991]" /><h3 className="mt-8 text-2xl font-semibold">A human, field-appropriate design.</h3><p className="mt-4 text-sm leading-7 text-white/70">Healthcare projects feel calm and trustworthy. Education projects feel accessible and organized. Engineering projects prioritize systems and evidence. The design follows the subject instead of repeating the same neon template.</p><div className="mt-8 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.06] p-4"><UsersRound className="size-5 text-[#82c3b9]" /><p className="text-sm text-white/80">Built to be reviewed by students, teammates, supervisors, and project evaluators.</p></div></div>
          </div>
        </div>
      </section>

      <section id="faq" className="border-t border-border py-24 sm:py-32">
        <div className="container grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><div><Badge>Common questions</Badge><h2 className="mt-5 text-4xl font-semibold tracking-[-.04em]">Before you start.</h2><p className="mt-4 text-muted-foreground">Clear answers about ownership, editing, and responsible use.</p></div><div className="divide-y divide-border border-y border-border">{faqs.map(([question, answer]) => <details className="group py-5" key={question}><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">{question}<ChevronDown className="size-4 shrink-0 text-muted-foreground transition group-open:rotate-180" /></summary><p className="max-w-2xl pt-3 text-sm leading-6 text-muted-foreground">{answer}</p></details>)}</div></div>
      </section>

      <section className="container pb-24"><div className="rounded-[28px] border border-[#d9cfb2] bg-[#fff8e6] px-6 py-14 text-center dark:bg-secondary sm:px-12"><Presentation className="mx-auto size-8 text-[#a47520]" /><h2 className="mt-5 text-3xl font-semibold tracking-[-.035em] sm:text-4xl">Ready to explain your graduation project clearly?</h2><p className="mx-auto mt-4 max-w-xl leading-7 text-muted-foreground">Start with the problem your team is solving. The workspace will help you turn it into a structured website you can review and present.</p><Button size="lg" className="mt-7" asChild><Link href="/dashboard/generate">Create the project brief <ArrowRight /></Link></Button></div></section>

      <footer className="border-t border-border bg-card"><div className="container grid gap-10 py-12 sm:grid-cols-[1.5fr_1fr_1fr]"><div><Logo /><p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">A focused workspace for planning, building, and presenting graduation project websites.</p></div><div><h3 className="text-sm font-semibold">Project workflow</h3><div className="mt-4 space-y-3 text-sm text-muted-foreground"><a className="block hover:text-foreground" href="#workflow">How it works</a><a className="block hover:text-foreground" href="#included">Website sections</a><a className="block hover:text-foreground" href="#principles">Responsible use</a></div></div><div><h3 className="text-sm font-semibold">Workspace</h3><div className="mt-4 space-y-3 text-sm text-muted-foreground"><Link className="block hover:text-foreground" href="/dashboard/generate">Start a project</Link><Link className="block hover:text-foreground" href="/dashboard/templates">Templates</Link><a className="flex items-center gap-2 hover:text-foreground" href="https://github.com/crtragency/graduation" target="_blank" rel="noreferrer"><Github className="size-4" /> GitHub</a></div></div></div><div className="container flex flex-col justify-between gap-3 border-t border-border py-5 text-xs text-muted-foreground sm:flex-row"><p>© 2026 ProjectForge EDU.</p><p>Built for students who want to understand and present their work.</p></div></footer>
    </main>
  );
}
