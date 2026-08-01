"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, Blocks, Bot, Braces, Check, ChevronDown, CirclePlay, Cloud, Code2,
  Github, Globe2, ImageIcon, Layers3, Menu, MonitorSmartphone, Moon, Palette,
  Play, Rocket, ShieldCheck, Sparkles, Star, WandSparkles, X, Zap,
} from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

const reveal = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

const features = [
  { icon: Bot, title: "AI that understands products", description: "Describe your idea in plain language. ProjectForge plans the pages, flows, components, and content before writing a line of code.", color: "from-violet-500/25 to-fuchsia-500/5" },
  { icon: Code2, title: "Production-ready code", description: "Clean, typed, responsive projects built with modern frameworks — not screenshots, prototypes, or locked-in templates.", color: "from-cyan-500/20 to-blue-500/5" },
  { icon: MonitorSmartphone, title: "Live multi-device preview", description: "Watch your website take shape and review every screen on desktop, tablet, and mobile before publishing.", color: "from-emerald-500/20 to-teal-500/5" },
  { icon: Rocket, title: "Deploy in one click", description: "Ship to a fast global edge network, connect a custom domain, and share a live link without leaving your workspace.", color: "from-orange-500/20 to-amber-500/5" },
  { icon: Palette, title: "A complete visual system", description: "Generate accessible palettes, typography, icons, illustrations, layouts, and reusable components that feel coherent.", color: "from-pink-500/20 to-rose-500/5" },
  { icon: ShieldCheck, title: "Built for real work", description: "Version history, exports, team roles, secure APIs, input validation, and project ownership are built in from day one.", color: "from-indigo-500/20 to-violet-500/5" },
];

const testimonials = [
  { quote: "We turned our hospital management idea into a polished working website before our supervisor meeting. The entire team finally had something real to build on.", name: "Mariam Hassan", role: "Software Engineering Student", initials: "MH", tone: "bg-violet-500" },
  { quote: "ProjectForge gives students the structure they usually miss: clear pages, a strong visual system, and code they can actually study and extend.", name: "Dr. Karim Adel", role: "Graduation Project Supervisor", initials: "KA", tone: "bg-cyan-600" },
  { quote: "I had a portfolio online in one afternoon, including the project case studies I had postponed for months. The editing flow feels incredibly focused.", name: "Youssef Nabil", role: "Computer Science Graduate", initials: "YN", tone: "bg-fuchsia-600" },
];

const faqs = [
  ["Does ProjectForge generate real code?", "Yes. Every project is generated as editable source files. You can preview it, download it, send it to GitHub, or continue editing it in your own development environment."],
  ["Can I use it for a graduation project?", "Absolutely. Graduation projects are a first-class workflow with prompt templates for hospitals, schools, businesses, dashboards, portfolios, and many other project types."],
  ["Which frameworks can I export?", "The primary production workflow uses Next.js. You can also export React, HTML, Vue, and Angular versions when the generated feature set supports them."],
  ["Can I connect my own domain?", "Yes. Pro and Team workspaces can attach custom domains to deployed projects and manage them directly from the deployment screen."],
  ["Who owns the generated code?", "You own the projects and source code you generate, subject to your plan and our acceptable-use policy. Your exports are not tied to ProjectForge."],
  ["Is there a free plan?", "Yes. The free plan includes three projects per month, live preview, source export, and a ProjectForge subdomain — no credit card required."],
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[.06] bg-background/70 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex" aria-label="Main navigation">
          <a className="transition hover:text-foreground" href="#features">Features</a>
          <a className="transition hover:text-foreground" href="#showcase">How it works</a>
          <a className="transition hover:text-foreground" href="#pricing">Pricing</a>
          <a className="transition hover:text-foreground" href="#faq">FAQ</a>
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}><Moon /></Button>
          <Button variant="ghost" asChild><Link href="/sign-in">Sign in</Link></Button>
          <Button asChild><Link href="/dashboard/generate">Start building <ArrowRight /></Link></Button>
        </div>
        <Button className="md:hidden" variant="ghost" size="icon" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</Button>
      </div>
      {open && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="border-t border-white/[.06] bg-background px-5 py-5 md:hidden">
          <nav className="flex flex-col gap-4 text-sm">
            <a href="#features" onClick={() => setOpen(false)}>Features</a><a href="#showcase" onClick={() => setOpen(false)}>How it works</a><a href="#pricing" onClick={() => setOpen(false)}>Pricing</a><a href="#faq" onClick={() => setOpen(false)}>FAQ</a>
            <Button asChild className="mt-2"><Link href="/dashboard/generate">Start building <ArrowRight /></Link></Button>
          </nav>
        </motion.div>
      )}
    </header>
  );
}

function ProductDemo() {
  const code = [
    ["1", "export default function HospitalDashboard() {"],
    ["2", "  return ("],
    ["3", "    <DashboardShell>"],
    ["4", "      <PatientOverview />"],
    ["5", "      <AppointmentChart />"],
    ["6", "      <RecentActivity />"],
    ["7", "    </DashboardShell>"],
    ["8", "  );"],
    ["9", "}"],
  ];
  return (
    <motion.div initial={{ opacity: 0, y: 40, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: .45, duration: .8 }} className="relative mx-auto mt-16 max-w-6xl">
      <div className="absolute -inset-14 -z-10 rounded-[50%] bg-violet-600/15 blur-3xl" />
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c15] shadow-panel">
        <div className="flex h-11 items-center justify-between border-b border-white/[.07] px-4">
          <div className="flex gap-1.5"><i className="size-2.5 rounded-full bg-red-400/80" /><i className="size-2.5 rounded-full bg-amber-400/80" /><i className="size-2.5 rounded-full bg-emerald-400/80" /></div>
          <div className="flex items-center gap-2 rounded-md border border-white/[.06] bg-white/[.035] px-4 py-1 text-[10px] text-white/45"><ShieldCheck className="size-3" /> projectforge.ai/preview/hospital-os</div>
          <div className="text-[10px] text-emerald-400"><span className="mr-1 inline-block size-1.5 rounded-full bg-emerald-400" /> Live</div>
        </div>
        <div className="grid min-h-[470px] lg:grid-cols-[38%_62%]">
          <div className="border-b border-white/[.07] bg-[#090910] lg:border-b-0 lg:border-r">
            <div className="flex h-11 items-center border-b border-white/[.06] px-4 text-xs"><Braces className="mr-2 size-3.5 text-violet-400" /> app/dashboard/page.tsx</div>
            <div className="overflow-hidden p-4 font-mono text-[11px] leading-7 text-white/70 sm:p-6 sm:text-xs">
              {code.map(([line, text]) => <div className="flex" key={line}><span className="mr-5 w-3 select-none text-right text-white/20">{line}</span><code className={line === "1" ? "text-fuchsia-300" : line === "4" || line === "5" || line === "6" ? "text-cyan-300" : ""}>{text}</code></div>)}
              <div className="mt-7 flex items-center gap-2 text-emerald-400"><span className="size-1.5 animate-pulse rounded-full bg-emerald-400" /> 32 files generated in 18s</div>
            </div>
          </div>
          <div className="relative overflow-hidden bg-[#f6f8fb] p-4 text-slate-900 sm:p-6">
            <div className="flex items-center justify-between"><div className="flex items-center gap-2 font-semibold"><span className="grid size-8 place-items-center rounded-lg bg-blue-600 text-xs font-bold text-white">H</span> HealthOS</div><div className="flex items-center gap-2"><span className="hidden text-xs text-slate-500 sm:inline">Dr. Sarah Ahmed</span><span className="size-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600" /></div></div>
            <div className="mt-7"><p className="text-xs text-slate-500">Monday, August 2</p><h3 className="mt-1 text-xl font-semibold">Good morning, Sarah</h3></div>
            <div className="mt-5 grid grid-cols-3 gap-2.5">
              {[['Patients','1,248','+8%'],['Appointments','34','Today'],['Occupancy','78%','12 beds']].map(([label,value,note]) => <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4" key={label}><p className="text-[9px] text-slate-500 sm:text-[11px]">{label}</p><strong className="mt-1 block text-lg sm:text-xl">{value}</strong><span className="text-[8px] font-medium text-emerald-600 sm:text-[10px]">{note}</span></div>)}
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-[1.3fr_.7fr]">
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex justify-between text-xs"><strong>Patient activity</strong><span className="text-slate-400">This week</span></div><div className="mt-5 flex h-24 items-end gap-2">{[40,62,49,78,58,88,72,92,67,82,95,76].map((h,i) => <i key={i} className="flex-1 rounded-t bg-gradient-to-t from-blue-600 to-cyan-400" style={{height:`${h}%`,opacity:.5+(i/24)}} />)}</div></div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><strong className="text-xs">Upcoming</strong><div className="mt-3 space-y-3">{['09:30 Consultation','11:00 Follow-up','13:15 Surgery'].map((item,i) => <div className="flex gap-2 text-[9px]" key={item}><span className={`mt-1 size-2 rounded-full ${i===0?'bg-blue-500':i===1?'bg-violet-500':'bg-cyan-500'}`} /><span>{item}</span></div>)}</div></div>
            </div>
            <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-xl bg-slate-950 px-3 py-2 text-[9px] text-white shadow-xl"><Sparkles className="size-3 text-violet-400" /> Preview updated</div>
          </div>
        </div>
      </div>
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="glass absolute -left-6 top-20 hidden rounded-xl px-3.5 py-3 text-xs shadow-xl lg:flex lg:items-center lg:gap-2"><span className="grid size-7 place-items-center rounded-lg bg-emerald-500/15 text-emerald-400"><Check className="size-3.5" /></span><span><b className="block text-white">SEO optimized</b><small className="text-white/45">Lighthouse 98</small></span></motion.div>
      <motion.div animate={{ y: [0, 9, 0] }} transition={{ repeat: Infinity, duration: 5, delay: .5 }} className="glass absolute -right-7 bottom-16 hidden rounded-xl px-3.5 py-3 text-xs shadow-xl lg:flex lg:items-center lg:gap-2"><span className="grid size-7 place-items-center rounded-lg bg-violet-500/15 text-violet-400"><Cloud className="size-3.5" /></span><span><b className="block text-white">Ready to deploy</b><small className="text-white/45">Global edge network</small></span></motion.div>
    </motion.div>
  );
}

export function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <Navbar />
      <section className="noise mesh-bg relative px-5 pb-24 pt-36 sm:pt-44">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="aurora pointer-events-none absolute left-1/2 top-20 -z-0 h-96 w-[70vw] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-600/20 via-fuchsia-500/10 to-cyan-500/15 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><Badge className="border-violet-400/20 bg-violet-400/10 px-3 py-1.5 text-violet-200"><Sparkles className="size-3" /> AI website builder for ambitious ideas <ArrowRight className="size-3" /></Badge></motion.div>
          <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1, duration: .7 }} className="mx-auto mt-7 max-w-5xl text-balance text-5xl font-semibold leading-[1.03] tracking-[-.055em] sm:text-7xl lg:text-[86px]">Turn an idea into a <span className="text-gradient">live product.</span></motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .22 }} className="mx-auto mt-7 max-w-2xl text-balance text-base leading-7 text-muted-foreground sm:text-lg">Describe the website you need. ProjectForge AI plans it, designs it, writes production-ready code, and deploys it — all from one focused workspace.</motion.p>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .32 }} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild className="w-full sm:w-auto"><Link href="/dashboard/generate"><WandSparkles /> Generate your website <ArrowRight /></Link></Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild><a href="#showcase"><CirclePlay /> Watch how it works</a></Button>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5 }} className="mt-4 text-xs text-muted-foreground">Free to start · No credit card · Export your code anytime</motion.p>
        </div>
        <ProductDemo />
      </section>

      <section className="border-y border-white/[.06] bg-white/[.015] py-9">
        <div className="container text-center"><p className="text-xs font-medium uppercase tracking-[.22em] text-muted-foreground">Built for students, creators, and product teams</p><div className="mt-7 grid grid-cols-2 items-center gap-6 text-sm font-semibold text-white/40 sm:grid-cols-3 lg:grid-cols-6">{["Cairo University","Mansoura Tech","Nile University","Future Labs","Alexandria CS","Forge Academy"].map((name) => <span key={name}>{name}</span>)}</div></div>
      </section>

      <section className="container py-24 sm:py-32">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .3 }} variants={reveal} transition={{ duration: .55 }} className="grid gap-8 sm:grid-cols-3">
          {[['12,000+','projects created'],['32 sec','average first preview'],['98/100','average Lighthouse score']].map(([value,label],i)=><div className="text-center sm:border-r sm:border-white/[.07] sm:last:border-0" key={value}><strong className={`text-4xl font-semibold tracking-tight ${i===1?'text-cyan-300':i===2?'text-violet-300':''}`}>{value}</strong><p className="mt-2 text-sm text-muted-foreground">{label}</p></div>)}
        </motion.div>
      </section>

      <section id="features" className="container pb-24 sm:pb-32">
        <div className="mx-auto max-w-2xl text-center"><Badge>Everything in one workspace</Badge><h2 className="mt-5 text-balance text-4xl font-semibold tracking-[-.04em] sm:text-5xl">From blank page to production, <span className="text-gradient">without the busywork.</span></h2><p className="mt-5 text-muted-foreground">Every tool you need to create, refine, and ship a serious website — designed as one continuous workflow.</p></div>
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{features.map((feature,index)=><motion.article initial="hidden" whileInView="visible" viewport={{once:true,amount:.2}} variants={reveal} transition={{delay:index*.05}} key={feature.title} className={`gradient-border group rounded-2xl bg-gradient-to-br ${feature.color} p-6 transition duration-300 hover:-translate-y-1`}><span className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/[.06] text-violet-300 transition group-hover:scale-105"><feature.icon className="size-5" /></span><h3 className="mt-6 text-lg font-semibold">{feature.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.description}</p></motion.article>)}</div>
      </section>

      <section id="showcase" className="border-y border-white/[.06] bg-white/[.018] py-24 sm:py-32">
        <div className="container grid items-center gap-14 lg:grid-cols-[.82fr_1.18fr]">
          <motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={reveal}><Badge><Zap className="size-3 text-cyan-300" /> One prompt. Complete project.</Badge><h2 className="mt-5 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">A clear process you can <span className="text-gradient">watch unfold.</span></h2><p className="mt-5 max-w-xl leading-7 text-muted-foreground">ProjectForge works like an expert product team: it understands the brief, plans the experience, creates the system, checks quality, and prepares the deployment.</p><ol className="mt-9 space-y-5">{[['01','Describe your idea','Write naturally or start from a curated prompt.'],['02','Review the plan','Confirm pages, features, style, and language.'],['03','Watch it build','Follow every file and preview update in real time.'],['04','Publish anywhere','Deploy, export, clone, or connect GitHub.']].map(([n,title,text])=><li className="flex gap-4" key={n}><span className="grid size-9 shrink-0 place-items-center rounded-full border border-violet-400/25 bg-violet-400/10 text-xs font-bold text-violet-300">{n}</span><div><h3 className="text-sm font-semibold">{title}</h3><p className="mt-1 text-sm text-muted-foreground">{text}</p></div></li>)}</ol></motion.div>
          <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} className="glass overflow-hidden rounded-2xl">
            <div className="flex items-center justify-between border-b border-white/[.07] px-4 py-3"><span className="text-xs font-medium">Generation timeline</span><Badge className="border-emerald-400/20 bg-emerald-400/10 text-emerald-300"><span className="size-1.5 rounded-full bg-emerald-400" /> Building</Badge></div>
            <div className="grid min-h-[440px] sm:grid-cols-[210px_1fr]"><div className="border-b border-white/[.07] p-4 sm:border-b-0 sm:border-r"><p className="mb-4 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Build steps</p>{[['Analyzing request',Check],['Planning pages',Check],['Writing code',Braces],['Generating images',ImageIcon],['Optimizing SEO',Globe2],['Deploying',Cloud]].map(([label,Icon],i)=><div className={`mb-2 flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs ${i===2?'bg-violet-500/10 text-violet-300':i<2?'text-emerald-400':'text-muted-foreground'}`} key={label as string}><Icon className={`size-3.5 ${i===2?'animate-pulse':''}`} />{label as string}</div>)}</div><div className="p-5"><div className="rounded-xl border border-white/[.07] bg-[#080810] p-4 font-mono text-[11px] leading-6 text-white/65"><p className="text-violet-300">// Creating dashboard components</p><p><span className="text-fuchsia-300">const</span> metrics = await getMetrics();</p><p><span className="text-cyan-300">return</span> &#60;AnalyticsGrid data=&#123;metrics&#125; /&#62;;</p><p className="mt-3 text-emerald-400">✓ app/dashboard/page.tsx</p><p className="text-emerald-400">✓ components/analytics-grid.tsx</p><p className="text-emerald-400">✓ lib/queries.ts</p><p className="mt-3 animate-pulse text-white/35">Generating app/settings/page.tsx_</p></div><div className="mt-4 grid grid-cols-3 gap-2">{[['18','files'],['6','pages'],['73%','complete']].map(([v,l])=><div className="rounded-lg border border-white/[.06] bg-white/[.025] p-3 text-center" key={l}><b className="block text-sm">{v}</b><small className="text-[9px] text-muted-foreground">{l}</small></div>)}</div></div></div>
          </motion.div>
        </div>
      </section>

      <section className="container py-24 sm:py-32">
        <div className="mx-auto max-w-2xl text-center"><Badge><Star className="size-3 fill-current text-amber-300" /> Loved by builders</Badge><h2 className="mt-5 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Ideas ship faster when the <span className="text-gradient">tools disappear.</span></h2></div>
        <div className="mt-14 grid gap-4 lg:grid-cols-3">{testimonials.map((item,index)=><motion.figure initial="hidden" whileInView="visible" viewport={{once:true}} variants={reveal} transition={{delay:index*.08}} key={item.name} className="rounded-2xl border border-white/[.08] bg-white/[.025] p-6"><div className="flex gap-0.5 text-amber-300">{Array.from({length:5}).map((_,i)=><Star className="size-3.5 fill-current" key={i} />)}</div><blockquote className="mt-5 text-sm leading-7 text-white/78">“{item.quote}”</blockquote><figcaption className="mt-7 flex items-center gap-3"><span className={`grid size-10 place-items-center rounded-full ${item.tone} text-xs font-bold text-white`}>{item.initials}</span><span><b className="block text-sm">{item.name}</b><small className="text-xs text-muted-foreground">{item.role}</small></span></figcaption></motion.figure>)}</div>
      </section>

      <section id="pricing" className="border-y border-white/[.06] bg-white/[.018] py-24 sm:py-32">
        <div className="container"><div className="mx-auto max-w-2xl text-center"><Badge>Simple pricing</Badge><h2 className="mt-5 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Start free. Upgrade when you <span className="text-gradient">ship more.</span></h2><p className="mt-5 text-muted-foreground">No hidden usage fees. Keep every line of code you generate.</p></div><div className="mx-auto mt-14 grid max-w-5xl gap-5 lg:grid-cols-3">{[
          {name:'Free',price:'$0',desc:'For exploring ideas and student projects.',features:['3 projects / month','Live responsive preview','Next.js & HTML export','ProjectForge subdomain'],cta:'Start free',featured:false},
          {name:'Pro',price:'$19',desc:'For students and independent builders.',features:['30 projects / month','Advanced AI generation','Vercel & GitHub deployment','Custom domains','Version history','Priority generation'],cta:'Start 14-day trial',featured:true},
          {name:'Team',price:'$49',desc:'For teams, labs, and project groups.',features:['Unlimited team projects','5 workspace members','Realtime collaboration','Admin analytics','Shared templates','Priority support'],cta:'Create a team',featured:false},
        ].map(plan=><article key={plan.name} className={`relative rounded-2xl border p-6 ${plan.featured?'border-violet-400/40 bg-violet-500/[.08] shadow-glow':'border-white/[.08] bg-card'}`}>{plan.featured&&<Badge className="absolute -top-3 right-5 border-violet-400/30 bg-violet-500 text-white">Most popular</Badge>}<h3 className="text-lg font-semibold">{plan.name}</h3><p className="mt-2 min-h-11 text-sm text-muted-foreground">{plan.desc}</p><div className="mt-6"><strong className="text-4xl tracking-tight">{plan.price}</strong><span className="text-sm text-muted-foreground"> / month</span></div><Button className="mt-6 w-full" variant={plan.featured?'default':'outline'} asChild><Link href="/sign-up">{plan.cta}<ArrowRight /></Link></Button><ul className="mt-6 space-y-3">{plan.features.map(item=><li className="flex gap-2.5 text-sm text-muted-foreground" key={item}><Check className="mt-0.5 size-4 text-emerald-400" />{item}</li>)}</ul></article>)}</div></div>
      </section>

      <section id="faq" className="container py-24 sm:py-32"><div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><div><Badge>Questions, answered</Badge><h2 className="mt-5 text-4xl font-semibold tracking-[-.04em]">Everything you need to know.</h2><p className="mt-4 text-sm leading-6 text-muted-foreground">Still have a question? Talk to the AI assistant or reach our support team.</p><Button variant="outline" className="mt-7"><Bot /> Ask ProjectForge</Button></div><div className="divide-y divide-white/[.08] border-y border-white/[.08]">{faqs.map(([question,answer])=><details className="group py-5" key={question}><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium"><span>{question}</span><ChevronDown className="size-4 shrink-0 text-muted-foreground transition group-open:rotate-180" /></summary><p className="max-w-2xl pt-3 text-sm leading-6 text-muted-foreground">{answer}</p></details>)}</div></div></section>

      <section className="container pb-24"><div className="noise relative overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-600/25 via-fuchsia-500/10 to-cyan-500/10 px-6 py-16 text-center sm:px-12 sm:py-20"><div className="absolute left-1/2 top-0 -z-10 h-60 w-3/4 -translate-x-1/2 rounded-full bg-violet-500/30 blur-3xl" /><Badge className="border-white/10 bg-white/10 text-white"><Sparkles className="size-3" /> Your idea is ready</Badge><h2 className="mx-auto mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-[-.045em] sm:text-6xl">Build the website you wish already existed.</h2><p className="mx-auto mt-5 max-w-xl text-muted-foreground">Start with one sentence. Leave with a complete, editable, deployable project.</p><Button size="lg" className="mt-8" asChild><Link href="/dashboard/generate"><WandSparkles /> Start building for free <ArrowRight /></Link></Button></div></section>

      <footer className="border-t border-white/[.07] bg-white/[.012]"><div className="container grid gap-10 py-12 md:grid-cols-[1.4fr_repeat(3,1fr)]"><div><Logo /><p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">The AI product studio for turning ambitious ideas into production-ready websites.</p><div className="mt-5 flex gap-2"><Button size="icon" variant="outline" aria-label="GitHub"><Github /></Button><Button size="icon" variant="outline" aria-label="Community"><Globe2 /></Button></div></div>{[['Product',['Generator','Templates','Deployments','Pricing']],['Company',['About','Blog','Careers','Contact']],['Resources',['Documentation','Guides','Status','Privacy']]].map(([title,items])=><div key={title as string}><h3 className="text-sm font-semibold">{title as string}</h3><ul className="mt-4 space-y-3 text-sm text-muted-foreground">{(items as string[]).map(item=><li key={item}><a className="transition hover:text-foreground" href="#">{item}</a></li>)}</ul></div>)}</div><div className="container flex flex-col justify-between gap-3 border-t border-white/[.06] py-5 text-xs text-muted-foreground sm:flex-row"><p>© 2026 ProjectForge AI. All rights reserved.</p><p>Built for people who turn ideas into reality.</p></div></footer>
    </main>
  );
}
