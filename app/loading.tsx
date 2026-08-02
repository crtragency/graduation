import { Logo } from "@/components/logo";

export default function Loading() {
  return <main className="grid min-h-screen place-items-center bg-background"><div className="text-center"><div className="mx-auto w-fit rounded-2xl border border-[#c7dfe1] bg-[#f0f7f7] p-3 shadow-sm"><Logo compact /></div><p className="mt-5 text-xs text-muted-foreground">Preparing your workspace...</p></div></main>;
}
