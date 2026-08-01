import Link from "next/link";
import { Activity, ArrowRight, Clock3, Code2, FolderKanban, Rocket, Sparkles, WandSparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/dashboard/page-header";
import { ProjectCard } from "@/components/dashboard/project-card";
import { getAppUser } from "@/lib/auth";
import { projects } from "@/lib/mock-data";

export default async function DashboardPage() {
  const user = await getAppUser();
  return <main className="p-4 sm:p-6 lg:p-8"><PageHeader title={`Good evening, ${user.name.split(" ")[0]}`} description="Here’s what’s happening across your projects." actions={<Button asChild><Link href="/dashboard/generate"><WandSparkles /> Generate website</Link></Button>} />
    <section className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{[
      {label:'Total projects',value:'12',note:'+3 this month',icon:FolderKanban,color:'text-violet-300 bg-violet-500/10'},
      {label:'Deployed',value:'8',note:'All systems live',icon:Rocket,color:'text-cyan-300 bg-cyan-500/10'},
      {label:'AI generations',value:'18',note:'12 remaining',icon:Sparkles,color:'text-fuchsia-300 bg-fuchsia-500/10'},
      {label:'Build minutes',value:'146',note:'of 500 monthly',icon:Zap,color:'text-amber-300 bg-amber-500/10'},
    ].map(item=><Card className="p-5" key={item.label}><div className="flex items-center justify-between"><span className={`grid size-9 place-items-center rounded-xl ${item.color}`}><item.icon className="size-4" /></span><span className="text-[10px] text-emerald-400">{item.note}</span></div><strong className="mt-5 block text-2xl font-semibold">{item.value}</strong><p className="mt-1 text-xs text-muted-foreground">{item.label}</p></Card>)}</section>
    <section className="mt-8"><div className="mb-4 flex items-center justify-between"><div><h2 className="font-semibold">Recent projects</h2><p className="mt-1 text-xs text-muted-foreground">Continue where you left off</p></div><Button asChild variant="ghost" size="sm"><Link href="/dashboard/projects">View all <ArrowRight /></Link></Button></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{projects.map(project=><ProjectCard key={project.id} project={project} />)}</div></section>
    <section className="mt-8 grid gap-4 xl:grid-cols-[1.35fr_.65fr]"><Card className="p-5"><div className="flex items-center justify-between"><div><h2 className="font-semibold">Generation activity</h2><p className="mt-1 text-xs text-muted-foreground">Projects generated over the last 14 days</p></div><Activity className="size-4 text-muted-foreground" /></div><div className="mt-7 flex h-44 items-end gap-2">{[24,38,30,62,48,78,54,90,67,82,45,72,58,88].map((height,index)=><div className="group relative flex-1" key={index}><span className="block rounded-t-md bg-gradient-to-t from-violet-600/70 to-cyan-400/70 transition group-hover:from-violet-500 group-hover:to-cyan-300" style={{height:`${height*1.6}px`}} /><small className="absolute -top-6 left-1/2 hidden -translate-x-1/2 rounded bg-black px-1.5 py-0.5 text-[9px] group-hover:block">{Math.round(height/18)}</small></div>)}</div><div className="mt-3 flex justify-between text-[9px] text-muted-foreground"><span>Jul 20</span><span>Jul 27</span><span>Aug 2</span></div></Card><Card className="p-5"><h2 className="font-semibold">Recent activity</h2><div className="mt-5 space-y-5">{[
      {icon:Rocket,text:'HealthOS deployed to production',time:'12 min ago',tone:'bg-emerald-500/10 text-emerald-300'},
      {icon:Code2,text:'EcoTrack version 7 generated',time:'2 hours ago',tone:'bg-violet-500/10 text-violet-300'},
      {icon:Clock3,text:'FinFlow domain verified',time:'Yesterday',tone:'bg-cyan-500/10 text-cyan-300'},
    ].map(item=><div className="flex gap-3" key={item.text}><span className={`grid size-8 shrink-0 place-items-center rounded-lg ${item.tone}`}><item.icon className="size-3.5" /></span><div><p className="text-xs text-white/80">{item.text}</p><small className="text-[10px] text-muted-foreground">{item.time}</small></div></div>)}</div></Card></section>
  </main>;
}
