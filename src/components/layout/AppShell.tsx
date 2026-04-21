"use client";
import { ReactNode, useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { CommandMenu } from "./CommandMenu";
import { AIPanel } from "@/components/ai/AIPanel";
import { CursorGlow } from "@/components/shared/CursorGlow";

export function AppShell({ children }: { children: ReactNode }) {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j") {
        e.preventDefault();
        setAiOpen((v) => !v);
      }
      if (e.key === "Escape") {
        setCmdOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex w-full min-h-screen relative">
      <CursorGlow />
      <Sidebar onOpenCommand={() => setCmdOpen(true)} onOpenAI={() => setAiOpen(true)} />
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <Topbar onOpenCommand={() => setCmdOpen(true)} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
      <CommandMenu open={cmdOpen} onOpenChange={setCmdOpen} />
      <AIPanel open={aiOpen} onOpenChange={setAiOpen} />
    </div>
  );
}
