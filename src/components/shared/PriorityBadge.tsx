import { cn } from "@/lib/utils";
import type { Priority } from "@/lib/mock-data";
import { ArrowDown, ArrowUp, Minus, Zap } from "lucide-react";

const map: Record<Priority, { icon: typeof Zap; text: string; bg: string; label: string }> = {
  URGENT: { icon: Zap,       text: "text-rose2-400",    bg: "bg-rose2-900/30",    label: "Urgent" },
  HIGH:   { icon: ArrowUp,   text: "text-amber2-400",   bg: "bg-amber2-900/30",   label: "High" },
  MEDIUM: { icon: Minus,     text: "text-brand-300",    bg: "bg-brand-900/30",    label: "Medium" },
  LOW:    { icon: ArrowDown, text: "text-neutral2-400", bg: "bg-neutral2-800/60", label: "Low" },
};

export function PriorityBadge({ priority, className, iconOnly = false }: { priority: Priority; className?: string; iconOnly?: boolean }) {
  const p = map[priority];
  const Icon = p.icon;
  return (
    <span className={cn("inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-xs font-medium", p.bg, p.text, className)}>
      <Icon className="w-3 h-3" />
      {!iconOnly && p.label}
    </span>
  );
}
