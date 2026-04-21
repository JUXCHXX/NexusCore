"use client";
import { useEffect, useRef } from "react";
import anime from "animejs";
import { Sparkles, ArrowRight, TrendingUp, TrendingDown } from "lucide-react";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { useCountUp } from "@/hooks/useCountUp";
import { TaskBadge } from "@/components/shared/TaskBadge";
import { PriorityBadge } from "@/components/shared/PriorityBadge";
import { Avatar, AvatarStack } from "@/components/shared/Avatar";
import { mockTasks, mockMembers, mockProjects, mockActivity } from "@/lib/mock-data";
import { getMember, relativeDate, isOverdue } from "@/lib/format";

export default function Overview() {
  const ref = useStaggerReveal();
  const me = mockMembers[0];

  return (
    <div ref={ref} className="p-6 max-w-7xl mx-auto">
      <div data-animate className="mb-6">
        <h1 className="font-display text-2xl md:text-3xl font-bold">Good morning, {me.name.split(" ")[0]} 👋</h1>
        <p className="text-sm text-neutral2-400 mt-1">Here's what's happening in Acme Engineering today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Tasks today"  value={24} trend="+12%" up data-animate />
        <StatCard label="In Progress"  value={8}  trend="+3"   up />
        <StatCard label="Completed"    value={15} trend="+22%" up />
        <StatCard label="Overdue"      value={3}  trend="-1"   down />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* LEFT 2/3 */}
        <div className="lg:col-span-2 space-y-4">
          {/* Recent tasks */}
          <div data-animate className="card-obsidian p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold">Recent Tasks</h2>
              <button className="text-xs text-brand-300 hover:text-brand-200 flex items-center gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-1">
              {mockTasks.slice(0, 8).map((t) => {
                const m = getMember(t.assigneeId)!;
                const proj = mockProjects.find((p) => p.id === t.projectId)!;
                return (
                  <div key={t.id} className="flex items-center gap-3 py-2 px-2 rounded-md hover:bg-bg-overlay/50 transition-colors group">
                    <input type="checkbox" className="w-3.5 h-3.5 rounded border-white/20 bg-bg-elevated accent-brand-500" />
                    <PriorityBadge priority={t.priority} iconOnly />
                    <div className="flex-1 min-w-0 text-sm truncate">{t.title}</div>
                    <span className="hidden md:inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded font-mono" style={{ background: `${proj.color}22`, color: proj.color }}>
                      <span className="w-1 h-1 rounded-full" style={{ background: proj.color }} /> {proj.name}
                    </span>
                    <TaskBadge status={t.status} />
                    <span className={`text-xs font-mono w-16 text-right ${isOverdue(t.dueDate) && t.status !== "DONE" ? "text-rose2-400" : "text-neutral2-500"}`}>
                      {relativeDate(t.dueDate)}
                    </span>
                    <Avatar name={m.name} size="sm" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activity feed */}
          <div data-animate className="card-obsidian p-5">
            <h2 className="text-sm font-semibold mb-4">Activity</h2>
            <div className="relative pl-6">
              <div className="absolute left-2.5 top-2 bottom-2 w-px bg-white/5" />
              {mockActivity.map((a) => {
                const m = getMember(a.actor)!;
                return (
                  <div key={a.id} className="relative flex items-start gap-3 mb-4 last:mb-0">
                    <div className="absolute -left-6 top-0">
                      <Avatar name={m.name} size="sm" />
                    </div>
                    <div className="flex-1 text-sm">
                      <span className="font-medium">{m.name.split(" ")[0]}</span>{" "}
                      <span className="text-neutral2-400">{a.text}</span>{" "}
                      <span className="text-neutral2-200">"{a.target}"</span>
                      {a.to && (
                        <>
                          {" "}
                          <span className="text-neutral2-400">to</span>{" "}
                          <TaskBadge status={a.to.replace(" ", "_").toUpperCase() as any} />
                        </>
                      )}
                      <div className="text-[10px] text-neutral2-600 font-mono mt-0.5">{a.time}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT 1/3 */}
        <div className="space-y-4">
          <AIInsightsCard />

          <div data-animate className="card-obsidian p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold">Team Online</h2>
              <span className="text-xs text-neutral2-500">{mockMembers.filter(m => m.online).length} of {mockMembers.length}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {mockMembers.map((m) => <Avatar key={m.id} name={m.name} online={m.online} size="md" />)}
            </div>
          </div>

          <div data-animate className="card-obsidian p-5">
            <h2 className="text-sm font-semibold mb-3">Upcoming Deadlines</h2>
            <div className="space-y-3">
              {mockTasks.filter(t => t.status !== "DONE").slice(0, 4).map((t) => {
                const days = Math.max(0, Math.ceil((new Date(t.dueDate).getTime() - Date.now()) / 86400000));
                const pct = Math.max(8, Math.min(100, (1 - days / 14) * 100));
                const danger = days <= 2;
                return (
                  <div key={t.id}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="truncate flex-1">{t.title}</span>
                      <span className={`font-mono ${danger ? "text-rose2-400" : "text-neutral2-500"}`}>{days}d</span>
                    </div>
                    <div className="h-1 rounded-full bg-bg-elevated overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: danger ? "var(--rose-500)" : "var(--brand-500)" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, trend, up, down, ...rest }: any) {
  const ref = useCountUp(value);
  return (
    <div {...rest} className="card-obsidian p-4">
      <div className="text-xs text-neutral2-500">{label}</div>
      <div className="mt-1 flex items-baseline gap-2">
        <span ref={ref} className="font-display text-3xl font-bold">0</span>
        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded inline-flex items-center gap-0.5 ${up ? "bg-jade-900/40 text-jade-400" : "bg-rose2-900/30 text-rose2-400"}`}>
          {up ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
          {trend}
        </span>
      </div>
      <div className="text-[10px] text-neutral2-600 mt-1">vs last week</div>
    </div>
  );
}

function AIInsightsCard() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    anime({ targets: ref.current.querySelector(".sparkle"), rotate: [0, 360], duration: 8000, loop: true, easing: "linear" });
  }, []);
  return (
    <div data-animate ref={ref} className="card-brand p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-md bg-gradient-brand grid place-items-center shadow-[0_0_12px_rgba(91,45,212,0.5)]">
          <Sparkles className="sparkle w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-sm font-semibold">Sprint Analysis</span>
      </div>
      <p className="text-xs text-neutral2-300 leading-relaxed">
        Your team's velocity is up <span className="text-brand-300 font-medium">12%</span> this sprint.
        Watch out for <span className="text-rose2-300 font-medium">2 blocked tasks</span> on Mobile App v2 —
        consider reassigning the API dependency.
      </p>
      <button className="mt-4 w-full btn-secondary !h-8 text-xs">
        <Sparkles className="w-3 h-3" /> Generate new analysis
      </button>
    </div>
  );
}
