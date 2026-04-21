"use client";
import { Bell, Search, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { Avatar } from "@/components/shared/Avatar";
import { mockMembers } from "@/lib/mock-data";

const labelMap: Record<string, string> = {
  app: "Acme Engineering",
  board: "Board",
  gantt: "Gantt",
  members: "Members",
  billing: "Billing",
  settings: "Settings",
  projects: "Projects",
  integrations: "Integrations",
};

export function Topbar({ onOpenCommand }: { onOpenCommand: () => void }) {
  const pathname = usePathname() || "/";
  const segments = pathname.split("/").filter(Boolean);
  const me = mockMembers[0];

  return (
    <header className="h-[52px] sticky top-0 z-20 flex items-center px-5 gap-3 border-b border-white/[0.04] backdrop-blur-md" style={{ background: "rgba(10,10,15,0.7)" }}>
      <nav className="flex items-center gap-1.5 text-sm">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="w-3 h-3 text-neutral2-600" />}
            <span className={i === segments.length - 1 ? "text-neutral2-100" : "text-neutral2-500"}>
              {labelMap[seg] ?? seg}
            </span>
          </div>
        ))}
      </nav>

      <div className="flex-1" />

      <button
        onClick={onOpenCommand}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md bg-bg-elevated border border-white/5 hover:border-white/10 text-neutral2-500 text-xs transition-colors min-w-[220px]"
      >
        <Search className="w-3.5 h-3.5" />
        <span className="flex-1 text-left">Search…</span>
        <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-bg-overlay text-neutral2-400 border border-white/5">⌘K</kbd>
      </button>

      <button className="relative w-8 h-8 grid place-items-center rounded-md hover:bg-bg-overlay transition-colors text-neutral2-400" aria-label="Notifications">
        <Bell className="w-4 h-4" />
        <span className="notification-dot absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-aqua-400" />
      </button>

      <Avatar name={me.name} size="sm" online />
    </header>
  );
}
