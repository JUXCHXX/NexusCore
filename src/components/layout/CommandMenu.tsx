"use client";
import { Command } from "cmdk";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import anime from "animejs";
import { mockTasks } from "@/lib/mock-data";

export function CommandMenu({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && panelRef.current) {
      anime({
        targets: panelRef.current,
        opacity: [0, 1],
        scale: [0.96, 1],
        duration: 220,
        easing: "cubicBezier(0.16,1,0.3,1)",
      });
    }
  }, [open]);

  if (!open) return null;

  const go = (path: string) => { onOpenChange(false); router.push(path); };

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-start pt-[15vh] px-4"
      style={{ background: "rgba(5,5,7,0.7)", backdropFilter: "blur(8px)" }}
      onClick={() => onOpenChange(false)}
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg card-glass rounded-xl shadow-2xl overflow-hidden"
      >
        <Command className="w-full">
          <div className="flex items-center gap-2 px-4 h-12 border-b border-white/5">
            <Search className="w-4 h-4 text-neutral2-500" />
            <Command.Input
              autoFocus
              placeholder="Search tasks, projects, members…"
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-neutral2-600"
            />
            <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-bg-overlay text-neutral2-400 border border-white/5">ESC</kbd>
          </div>

          <Command.List className="max-h-[380px] overflow-y-auto py-2">
            <Command.Empty className="py-8 text-center text-sm text-neutral2-500">No results found.</Command.Empty>

            <Command.Group heading="Navigation" className="text-[10px] uppercase tracking-wider text-neutral2-500 px-3 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2">
              <Item onSelect={() => go("/app")} kbd="G O">Overview</Item>
              <Item onSelect={() => go("/app/board")} kbd="G B">Board</Item>
              <Item onSelect={() => go("/app/gantt")} kbd="G G">Gantt</Item>
              <Item onSelect={() => go("/app/members")} kbd="G M">Members</Item>
              <Item onSelect={() => go("/app/billing")}>Billing</Item>
            </Command.Group>

            <Command.Group heading="Actions" className="text-[10px] uppercase tracking-wider text-neutral2-500 px-3 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2">
              <Item onSelect={() => onOpenChange(false)} kbd="⌘N">Create new task</Item>
              <Item onSelect={() => onOpenChange(false)} kbd="⌘I">Invite member</Item>
              <Item onSelect={() => onOpenChange(false)} kbd="⌘J">Open AI Assistant</Item>
            </Command.Group>

            <Command.Group heading="Tasks" className="text-[10px] uppercase tracking-wider text-neutral2-500 px-3 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2">
              {mockTasks.slice(0, 6).map((t) => (
                <Item key={t.id} onSelect={() => go("/app/board")}>
                  <span className="font-mono text-[10px] text-neutral2-500 mr-2">{t.id}</span>
                  {t.title}
                </Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}

function Item({ children, onSelect, kbd }: { children: React.ReactNode; onSelect: () => void; kbd?: string }) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex items-center gap-2 px-3 py-2 mx-2 rounded-md text-sm text-neutral2-300 cursor-pointer data-[selected=true]:bg-bg-overlay data-[selected=true]:text-white data-[selected=true]:border-l-2 data-[selected=true]:border-brand-500 transition-colors"
    >
      <span className="flex-1 truncate">{children}</span>
      {kbd && <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-bg-overlay text-neutral2-400 border border-white/5">{kbd}</kbd>}
    </Command.Item>
  );
}
