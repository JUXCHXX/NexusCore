"use client";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { mockTasks, mockProjects } from "@/lib/mock-data";

const DAYS = 30;

export default function Gantt() {
  const ref = useStaggerReveal();
  const today = new Date();
  const start = new Date(today); start.setDate(start.getDate() - 5);

  return (
    <div ref={ref} className="p-6">
      <div data-animate className="mb-5">
        <h1 className="font-display text-2xl font-bold">Gantt</h1>
        <p className="text-sm text-neutral2-400">Sprint timeline across all projects.</p>
      </div>

      <div data-animate className="card-obsidian overflow-hidden">
        {/* Header */}
        <div className="grid border-b border-white/5" style={{ gridTemplateColumns: `220px repeat(${DAYS}, minmax(28px, 1fr))` }}>
          <div className="px-3 py-2 text-[10px] uppercase tracking-wider text-neutral2-500">Task</div>
          {Array.from({ length: DAYS }).map((_, i) => {
            const d = new Date(start); d.setDate(d.getDate() + i);
            const isToday = d.toDateString() === today.toDateString();
            return (
              <div key={i} className={`text-[9px] text-center py-2 font-mono border-l border-white/[0.03] ${isToday ? "text-brand-300 bg-brand-900/20" : "text-neutral2-600"}`}>
                {d.getDate()}
              </div>
            );
          })}
        </div>

        {/* Rows */}
        {mockTasks.slice(0, 12).map((t, idx) => {
          const proj = mockProjects.find((p) => p.id === t.projectId)!;
          const dueOffset = Math.max(1, Math.min(DAYS - 1, Math.floor((new Date(t.dueDate).getTime() - start.getTime()) / 86400000)));
          const startOffset = Math.max(0, dueOffset - 4 - (idx % 3));
          const span = Math.max(2, dueOffset - startOffset);
          return (
            <div key={t.id} className="grid border-b border-white/[0.03] hover:bg-bg-overlay/30 transition-colors" style={{ gridTemplateColumns: `220px repeat(${DAYS}, minmax(28px, 1fr))` }}>
              <div className="px-3 py-2 text-xs truncate flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: proj.color }} />
                {t.title}
              </div>
              <div className="relative col-span-full" style={{ gridColumn: `2 / span ${DAYS}` }}>
                <div
                  className="absolute top-1.5 h-5 rounded-md flex items-center px-2 text-[10px] text-white font-medium shadow-sm"
                  style={{
                    left: `${(startOffset / DAYS) * 100}%`,
                    width: `${(span / DAYS) * 100}%`,
                    background: `linear-gradient(90deg, ${proj.color}aa, ${proj.color})`,
                    boxShadow: `0 0 12px ${proj.color}55`,
                  }}
                >
                  <span className="truncate">{t.id}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
