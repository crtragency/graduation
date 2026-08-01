import { Braces, Copy, History, Rocket, RotateCcw, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const events=[
  {title:'HealthOS version 7 deployed',description:'Production deployment completed successfully.',time:'12 minutes ago',icon:Rocket,tone:'bg-emerald-500/10 text-emerald-300',badge:'Deployment'},
  {title:'EcoTrack generated from prompt',description:'Added realtime energy charts, device cards, and weekly reports.',time:'2 hours ago',icon:Sparkles,tone:'bg-violet-500/10 text-violet-300',badge:'Generation'},
  {title:'FinFlow duplicated',description:'Created “FinFlow — Client demo” from production version 4.',time:'Yesterday',icon:Copy,tone:'bg-cyan-500/10 text-cyan-300',badge:'Project'},
  {title:'Creative Portfolio restored',description:'Restored version 2 after reviewing layout changes.',time:'3 days ago',icon:RotateCcw,tone:'bg-amber-500/10 text-amber-300',badge:'Version'},
  {title:'HealthOS code exported',description:'Downloaded a Next.js archive with 34 project files.',time:'5 days ago',icon:Braces,tone:'bg-fuchsia-500/10 text-fuchsia-300',badge:'Export'},
];

export default function HistoryPage(){return <main className="p-4 sm:p-6 lg:p-8"><PageHeader title="Activity history" description="A complete timeline of generations, edits, exports, and deployments."/><Card className="mt-7 overflow-hidden"><div className="flex items-center justify-between border-b p-5"><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-xl bg-violet-500/10 text-violet-300"><History className="size-4"/></span><div><h2 className="text-sm font-semibold">Workspace activity</h2><p className="text-[10px] text-muted-foreground">Personal workspace</p></div></div><Button variant="outline" size="sm">Last 30 days</Button></div><div className="p-5 sm:p-7"><div className="relative space-y-7 before:absolute before:bottom-3 before:left-[18px] before:top-3 before:w-px before:bg-white/[.08]">{events.map(item=><div className="relative flex gap-4" key={item.title}><span className={`relative z-10 grid size-9 shrink-0 place-items-center rounded-xl border border-white/[.07] ${item.tone}`}><item.icon className="size-4"/></span><div className="flex-1 rounded-xl border border-white/[.06] bg-white/[.02] p-4"><div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start"><div><div className="flex flex-wrap items-center gap-2"><h3 className="text-xs font-medium">{item.title}</h3><Badge className="text-[9px]">{item.badge}</Badge></div><p className="mt-1.5 text-[11px] text-muted-foreground">{item.description}</p></div><time className="text-[10px] text-muted-foreground">{item.time}</time></div></div></div>)}</div></div></Card></main>}
