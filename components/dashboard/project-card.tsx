"use client";

import Link from "next/link";
import { Copy, ExternalLink, Heart, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ProjectSummary } from "@/lib/types";
import { formatRelativeTime } from "@/lib/utils";

export function ProjectCard({ project }: { project: ProjectSummary }) {
  const [favorite, setFavorite] = useState(project.favorite);
  const [menu, setMenu] = useState(false);
  return <article className="group overflow-hidden rounded-2xl border border-white/[.08] bg-card transition duration-300 hover:-translate-y-0.5 hover:border-white/[.15]">
    <Link href={`/dashboard/projects/${project.id}`} className={`relative block h-40 overflow-hidden bg-gradient-to-br ${project.thumbnail}`}>
      <div className="absolute inset-4 rounded-xl border border-white/15 bg-black/20 p-3 shadow-2xl backdrop-blur-sm"><div className="flex gap-1"><i className="size-1.5 rounded-full bg-white/40" /><i className="size-1.5 rounded-full bg-white/40" /><i className="size-1.5 rounded-full bg-white/40" /></div><div className="mt-7 grid grid-cols-[32%_1fr] gap-2"><div className="space-y-2">{[70,90,55,82].map((w)=><span key={w} className="block h-1.5 rounded-full bg-white/25" style={{width:`${w}%`}} />)}</div><div className="grid grid-cols-2 gap-2"><span className="h-14 rounded-lg bg-white/20" /><span className="h-14 rounded-lg bg-white/15" /></div></div></div>
      <Badge className="absolute bottom-3 left-3 border-black/10 bg-black/35 text-white backdrop-blur">{project.framework}</Badge>
    </Link>
    <div className="p-4"><div className="flex items-start gap-2"><div className="min-w-0 flex-1"><Link href={`/dashboard/projects/${project.id}`} className="truncate font-semibold transition hover:text-violet-300">{project.name}</Link><p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{project.description}</p></div><Button onClick={()=>setFavorite(!favorite)} variant="ghost" size="icon" className="size-8" aria-label="Favorite project"><Heart className={favorite?"fill-rose-400 text-rose-400":""} /></Button><div className="relative"><Button onClick={()=>setMenu(!menu)} variant="ghost" size="icon" className="size-8"><MoreHorizontal /></Button>{menu&&<div className="absolute right-0 top-9 z-10 w-40 rounded-xl border border-white/10 bg-[#11111b] p-1.5 text-xs shadow-panel"><button className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 hover:bg-white/[.06]"><Pencil className="size-3" /> Rename</button><button onClick={()=>toast.success("Project duplicated")} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 hover:bg-white/[.06]"><Copy className="size-3" /> Duplicate</button><button className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-red-400 hover:bg-red-500/10"><Trash2 className="size-3" /> Delete</button></div>}</div></div><div className="mt-4 flex items-center justify-between border-t border-white/[.06] pt-3 text-[10px] text-muted-foreground"><span className="flex items-center gap-1.5"><i className={`size-1.5 rounded-full ${project.status==='deployed'?'bg-emerald-400':project.status==='ready'?'bg-cyan-400':'bg-amber-400'}`} />{project.status}</span><span>{formatRelativeTime(project.updatedAt)}</span>{project.liveUrl&&<a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-violet-300"><ExternalLink className="size-3" /></a>}</div></div>
  </article>;
}
