"use client";
import Link from "next/link";

const projectItems = [
  { to: "/app", label: "Overview",  icon: LayoutDashboard, end: true },
  { to: "/app/board",    label: "Board",    icon: KanbanSquare },
  { to: "/app/gantt",    label: "Gantt",    icon: GanttChart },
  { to: "/app/projects", label: "Projects", icon: FolderKanban },
];
const workspaceItems = [
  { to: "/app/members",      label: "Members",      icon: Users },
  { to: "/app/integrations", label: "Integrations", icon: Plug },
  { to: "/app/settings",     label: "Settings",     icon: Settings },
];

export function Sidebar({ onOpenCommand, onOpenAI }: { onOpenCommand: () => void; onOpenAI: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    anime({ targets: el, opacity: [0, 1], translateX: [-16, 0], duration: 500, easing: "cubicBezier(0.16,1,0.3,1)" });
    const items = el.querySelectorAll(".sidebar-item");
    anime({
      targets: Array.from(items),
      opacity: [0, 1],
      translateX: [-8, 0],
      duration: 350,
      delay: anime.stagger(35, { start: 200 }),
      easing: "cubicBezier(0.16,1,0.3,1)",
    });
  }, []);

  const me = mockMembers[0];

  return (
    <aside
      ref={ref}
      className="sidebar w-[240px] h-screen sticky top-0 bg-bg-surface border-r border-white/[0.04] flex flex-col z-30"
      style={{ opacity: 0 }}
    >
      {/* Logo */}
      <div className="h-[52px] px-4 flex items-center border-b border-white/[0.04]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-gradient-brand grid place-items-center shadow-[0_0_12px_rgba(91,45,212,0.5)]">
            <span className="font-display text-white text-sm font-bold">N</span>
          </div>
          <span className="font-display text-base font-bold tracking-tight">NexusCore</span>
        </div>
      </div>

      {/* Workspace switcher */}
      <div className="px-2 pt-2 sidebar-item">
        <div className="text-xs text-neutral2-500 px-2">Workspace switcher</div>
      </div>

      {/* Search / cmd k */}
      <div className="px-2 pt-2 sidebar-item">
        <button
          onClick={onOpenCommand}
          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-bg-elevated border border-white/5 hover:border-white/10 text-neutral2-500 text-xs transition-colors"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="flex-1 text-left">Search…</span>
          <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-bg-overlay text-neutral2-400 border border-white/5">⌘K</kbd>
        </button>
      </div>

      <div className="h-px bg-white/[0.04] mx-3 my-3" />

      {/* PROJECTS */}
      <div className="sidebar-item">
        <div className="nav-section-label">Projects</div>
        {projectItems.map((it) => (
          <Link key={it.to} href={it.to} className={cn("nav-item", pathname === it.to && "active")}>
            <it.icon className="nav-icon w-3.5 h-3.5" />
            <span>{it.label}</span>
          </Link>
        ))}
      </div>

      {/* WORKSPACE */}
      <div className="sidebar-item mt-2">
        <div className="nav-section-label">Workspace</div>
        {workspaceItems.map((it) => (
          <Link key={it.to} href={it.to} className={cn("nav-item", pathname === it.to && "active")}>
            <it.icon className="nav-icon w-3.5 h-3.5" />
            <span>{it.label}</span>
          </Link>
        ))}
      </div>

      <div className="h-px bg-white/[0.04] mx-3 my-3" />

      {/* AI */}
      <div className="sidebar-item px-2">
        <button
          onClick={onOpenAI}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium text-brand-300 transition-all"
          style={{
            background: "linear-gradient(135deg, rgba(91,45,212,0.15) 0%, rgba(6,176,216,0.08) 100%)",
            border: "1px solid rgba(91,45,212,0.3)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-brand)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = "";
          }}
        >
          <Sparkles className="w-4 h-4 text-brand-400" />
          <span>AI Assistant</span>
          <kbd className="ml-auto font-mono text-[10px] px-1.5 py-0.5 rounded bg-bg-overlay text-neutral2-400 border border-white/5">⌘J</kbd>
        </button>
      </div>

      <div className="flex-1" />

      {/* User menu */}
      <div className="p-2 border-t border-white/[0.04] sidebar-item">
        <div className="text-xs text-neutral2-500 px-2">User menu</div>
      </div>
    </aside>
  );
}
