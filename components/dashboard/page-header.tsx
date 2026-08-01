import { Badge } from "@/components/ui/badge";

export function PageHeader({ title, description, badge, actions }: { title: string; description: string; badge?: string; actions?: React.ReactNode }) {
  return <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div>{badge&&<Badge className="mb-3">{badge}</Badge>}<h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1><p className="mt-1.5 text-sm text-muted-foreground">{description}</p></div>{actions&&<div className="flex items-center gap-2">{actions}</div>}</div>;
}
