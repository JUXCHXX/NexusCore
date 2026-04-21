import { cn } from "@/lib/utils";
import type { TaskStatus } from "@/lib/mock-data";

const map: Record<TaskStatus, { bg: string; text: string; border: string; dot: string; label: string; pulse?: boolean }> = {
  TODO:        { bg: "bg-neutral2-800/60",      text: "text-neutral2-400", border: "border-neutral2-700/50", dot: "bg-neutral2-500", label: "To Do" },
  IN_PROGRESS: { bg: "bg-aqua-900/40",          text: "text-aqua-400",     border: "border-aqua-500/30",     dot: "bg-aqua-400",     label: "In Progress", pulse: true },
  IN_REVIEW:   { bg: "bg-brand-900/40",         text: "text-brand-300",    border: "border-brand-500/30",    dot: "bg-brand-400",    label: "In Review" },
  DONE:        { bg: "bg-jade-900/40",          text: "text-jade-400",     border: "border-jade-500/30",     dot: "bg-jade-400",     label: "Done" },
  BLOCKED:     { bg: "bg-rose2-900/30",         text: "text-rose2-400",    border: "border-rose2-500/30",    dot: "bg-rose2-400",    label: "Blocked" },
};

export function TaskBadge({ status, className }: { status: TaskStatus; className?: string }) {
  const s = map[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border", s.bg, s.text, s.border, className)}>
      <span className={cn("w-1.5 h-1.5 rounded-full", s.dot, s.pulse && "animate-pulse")} />
      {s.label}
    </span>
  );
}
