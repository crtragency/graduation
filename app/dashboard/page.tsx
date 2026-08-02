import Link from "next/link";
import { ArrowRight, BookOpenCheck, Check, FileText, FolderKanban, Languages, Presentation, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/dashboard/page-header";
import { getAppUser } from "@/lib/auth";
import { projects } from "@/lib/mock-data";

const reviewSteps = [
  { number: "01", title: "Define the problem", text: "Write the real situation your team wants to improve." },
  { number: "02", title: "List users and modules", text: "Connect every feature to a user need or project objective." },
  { number: "03", title: "Review the website", text: "Check the wording, design, responsive layout, and source files." },
  { number: "04", title: "Prepare the presentation", text: "Add verified results, team roles, documents, and references." },
];

export default async function DashboardPage() {
  const user = await getAppUser();
  const firstName = user.name.split(" ")[0];
  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <PageHeader title={`Welcome, ${firstName}`} description="Keep the project clear, accurate, and ready for your next supervisor review." actions={<Button asChild><Link href="/dashboard/generate"><BookOpenCheck /> Start a project website</Link></Button>} />

      <section className="mt-7 overflow-hidden rounded-2xl border border-[#c7dfe1] bg-[#f0f7f7] dark:bg-secondary">
        <div className="grid gap-8 p-6 lg:grid-cols-[.8fr_1.2fr] lg:p-8">
          <div><span className="text-[10px] font-bold uppercase tracking-[.16em] text-[#287c78]">Recommended workflow</span><h2 className="mt-3 text-2xl font-semibold tracking-tight">Build a project story your evaluator can follow.</h2><p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">Start with the academic problem and objectives. The design, sections, and code should support that story—not compete with it.</p><Button variant="outline" className="mt-6 bg-card" asChild><Link href="/dashboard/generate">Open the project brief <ArrowRight /></Link></Button></div>
          <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">{reviewSteps.map((step) => <article className="bg-card p-5" key={step.number}><span className="font-mono text-[10px] font-bold text-[#a47520]">{step.number}</span><h3 className="mt-4 text-sm font-semibold">{step.title}</h3><p className="mt-1 text-[11px] leading-5 text-muted-foreground">{step.text}</p></article>)}</div>
        </div>
      </section>

      <section className="mt-8 grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-border p-5"><div><h2 className="font-semibold">Project workspace</h2><p className="mt-1 text-xs text-muted-foreground">Continue a saved project or begin a fresh brief.</p></div><Button asChild variant="ghost" size="sm"><Link href="/dashboard/projects">View all <ArrowRight /></Link></Button></div>
          <div className="divide-y divide-border">{projects.slice(0, 3).map((project, index) => <Link href={`/dashboard/projects/${project.id}`} className="flex items-center gap-4 p-5 transition hover:bg-secondary/60" key={project.id}><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#e8f1f3] text-[#1f5870]"><FolderKanban className="size-4" /></span><div className="min-w-0 flex-1"><h3 className="truncate text-sm font-semibold">{project.name}</h3><p className="mt-1 truncate text-[11px] text-muted-foreground">{project.description}</p></div><span className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${index === 0 ? "bg-[#e1f1ea] text-[#287c78]" : "bg-secondary text-muted-foreground"}`}>{index === 0 ? "Ready to review" : "Draft"}</span><ArrowRight className="size-3.5 text-muted-foreground" /></Link>)}</div>
          <div className="border-t border-border bg-[#fff9e8] p-4 dark:bg-secondary"><p className="text-[11px] text-muted-foreground">Projects shown in the demo workspace are examples. Replace them with your team&apos;s verified project information.</p></div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-[#fff1c8] text-[#9a701f]"><Presentation className="size-4" /></span><div><h2 className="font-semibold">Before you present</h2><p className="mt-1 text-[10px] text-muted-foreground">A short academic review checklist</p></div></div>
          <div className="mt-6 space-y-4">{[
            [FileText, "Content", "All claims match your report and references."],
            [UsersRound, "Team roles", "Each member's contribution is described accurately."],
            [Languages, "Language", "Arabic and English terms are consistent."],
            [BookOpenCheck, "Understanding", "Your team can explain the code and design choices."],
          ].map(([Icon, title, text]) => { const ItemIcon = Icon as typeof FileText; return <div className="flex gap-3" key={title as string}><Check className="mt-0.5 size-4 shrink-0 text-[#287c78]" /><div><h3 className="text-xs font-semibold">{title as string}</h3><p className="mt-1 text-[10px] leading-4 text-muted-foreground">{text as string}</p></div></div>; })}</div>
        </Card>
      </section>
    </main>
  );
}
