"use client";

import { Bot, Send, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", text: "Hi! I can help refine a prompt, explain generated code, or plan your next feature." }]);
  const [value, setValue] = useState("");
  const submit = () => { if (!value.trim()) return; setMessages((items) => [...items, { role: "user", text: value.trim() }, { role: "assistant", text: "I’ve added that to the project context. Open the generator to apply it to your current build." }]); setValue(""); };
  return <><Button onClick={() => setOpen(true)} className="fixed bottom-5 right-5 z-40 size-12 rounded-2xl p-0 shadow-2xl shadow-violet-500/25" aria-label="Open AI assistant"><Bot className="size-5" /><span className="pulse-ring absolute inset-0 rounded-2xl border border-violet-400" /></Button>{open&&<div className="fixed bottom-5 right-5 z-50 flex h-[500px] max-h-[calc(100vh-2.5rem)] w-[360px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c15] shadow-panel"><div className="flex items-center gap-3 border-b border-white/[.07] p-4"><span className="grid size-9 place-items-center rounded-xl bg-violet-500/15 text-violet-300"><Sparkles className="size-4" /></span><div><b className="block text-sm">Forge Assistant</b><span className="flex items-center gap-1 text-[10px] text-emerald-400"><i className="size-1.5 rounded-full bg-emerald-400" /> Ready</span></div><Button onClick={() => setOpen(false)} variant="ghost" size="icon" className="ml-auto"><X /></Button></div><div className="soft-scrollbar flex-1 space-y-3 overflow-y-auto p-4">{messages.map((message,index)=><div key={index} className={`max-w-[86%] rounded-xl px-3 py-2.5 text-xs leading-5 ${message.role==='assistant'?'bg-white/[.055] text-white/75':'ml-auto bg-violet-600 text-white'}`}>{message.text}</div>)}</div><form onSubmit={(e)=>{e.preventDefault();submit()}} className="flex gap-2 border-t border-white/[.07] p-3"><Input value={value} onChange={(e)=>setValue(e.target.value)} placeholder="Ask anything..." className="h-10" /><Button size="icon" type="submit"><Send /></Button></form></div>}</>;
}
