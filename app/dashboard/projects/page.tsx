import Link from "next/link";
import { Grid2X2, List, Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { ProjectCard } from "@/components/dashboard/project-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { projects } from "@/lib/mock-data";

export default function ProjectsPage() {
  return <main className="p-4 sm:p-6 lg:p-8"><PageHeader title="Projects" description="Create, organize, and ship every website from one place." actions={<Button asChild><Link href="/dashboard/generate"><Plus /> New project</Link></Button>} /><div className="mt-7 flex flex-col gap-3 sm:flex-row"><div className="relative max-w-md flex-1"><Search className="absolute left-3 top-3.5 size-3.5 text-muted-foreground" /><Input className="pl-9" placeholder="Search projects..." /></div><select className="h-11 rounded-xl border border-input bg-card px-3 text-xs"><option>All statuses</option><option>Deployed</option><option>Ready</option><option>Draft</option></select><select className="h-11 rounded-xl border border-input bg-card px-3 text-xs"><option>Recently updated</option><option>Name</option><option>Oldest</option></select><div className="flex rounded-xl border border-input p-1"><Button size="icon" variant="secondary" className="size-8"><Grid2X2 /></Button><Button size="icon" variant="ghost" className="size-8"><List /></Button></div></div><div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">{projects.map(project=><ProjectCard key={project.id} project={project} />)}</div></main>;
}
