"use client";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { mockProjects, mockTasks } from "@/lib/mock-data";
import { Plus, MoreHorizontal } from "lucide-react";
import { AvatarStack } from "@/components/shared/Avatar";
import { mockMembers } from "@/lib/mock-data";

export default function Projects() {
  const ref = useStaggerReveal();
  return (
    <div ref={ref} className="p-6 max-w-7xl mx-auto">
      <div data-animate className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold">Projects</h1>
          <p className="text-sm text-neutral2-400">All projects in this workspace.</p>
        </div>
        <button className="btn-primary"><Plus className="w-3.5 h-3.5" /> New project</button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockProjects.map((p) => {
          const tasks = mockTasks.filter((t) => t.projectId === p.id);
          const done = tasks.filter((t) => t.status === "DONE").length;
          const pct = Math.round((done / Math.max(1, tasks.length)) * 100);
          return (
            <div key={p.id} data-animate className="card-obsidian p-5 hover:-translate-y-0.5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-md grid place-items-center text-white text-xs font-bold" style={{ background: p.color, boxShadow: `0 0 12px ${p.color}66` }}>
                    {p.name[0]}
                  </span>
                  <div>
                    <div className="font-medium text-sm">{p.name}</div>
                    <div className="text-[10px] text-neutral2-500 font-mono">{p.tasksCount} tasks</div>
                  </div>
                </div>
                <button className="text-neutral2-500 hover:text-white"><MoreHorizontal className="w-4 h-4" /></button>
              </div>
              <div className="mb-3">
                <div className="flex items-center justify-between text-[10px] mb-1">
                  <span className="text-neutral2-500">Progress</span>
                  <span className="font-mono text-neutral2-400">{pct}%</span>
                </div>
                <div className="h-1 rounded-full bg-bg-elevated overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: p.color }} />
                </div>
              </div>
              <AvatarStack names={mockMembers.slice(0, 4).map(m => m.name)} size="sm" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
