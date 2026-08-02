"use client";

import { BookOpen, MessageCircleQuestion, Send, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", text: "Tell me which part of your graduation project you want to explain. I can help organize the idea, pages, and presentation content." }]);
  const [value, setValue] = useState("");

  const submit = () => {
    if (!value.trim()) return;
    setMessages((items) => [
      ...items,
      { role: "user", text: value.trim() },
      { role: "assistant", text: "I have noted that point. Add the concrete details to your brief so your supervisor and visitors can understand the project without guessing." },
    ]);
    setValue("");
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="fixed bottom-5 right-5 z-40 size-12 rounded-2xl bg-[#1f5870] p-0 shadow-lg shadow-[#1f5870]/20 hover:bg-[#173f52]" aria-label="Open project guide"><MessageCircleQuestion className="size-5" /></Button>
      {open && <div className="fixed bottom-5 right-5 z-50 flex h-[500px] max-h-[calc(100vh-2.5rem)] w-[360px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border bg-[#f0f7f7] p-4">
          <span className="grid size-9 place-items-center rounded-xl bg-[#dbeaec] text-[#1f5870]"><BookOpen className="size-4" /></span>
          <div><b className="block text-sm text-foreground">Project guide</b><span className="flex items-center gap-1 text-[10px] text-[#287c78]"><i className="size-1.5 rounded-full bg-[#287c78]" /> Ready to help</span></div>
          <Button onClick={() => setOpen(false)} variant="ghost" size="icon" className="ml-auto"><X /></Button>
        </div>
        <div className="soft-scrollbar flex-1 space-y-3 overflow-y-auto p-4">
          {messages.map((message, index) => <div key={index} className={`max-w-[86%] rounded-xl px-3 py-2.5 text-xs leading-5 ${message.role === "assistant" ? "bg-secondary text-foreground" : "ml-auto bg-[#1f5870] text-white"}`}>{message.text}</div>)}
        </div>
        <form onSubmit={(event) => { event.preventDefault(); submit(); }} className="flex gap-2 border-t border-border p-3">
          <Input value={value} onChange={(event) => setValue(event.target.value)} placeholder="Ask about your project..." className="h-10" />
          <Button size="icon" type="submit" aria-label="Send"><Send /></Button>
        </form>
      </div>}
    </>
  );
}
