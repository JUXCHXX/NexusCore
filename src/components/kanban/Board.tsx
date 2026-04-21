"use client";
import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import {
  DndContext, DragOverlay, PointerSensor, useSensor, useSensors,
  closestCorners, type DragEndEvent, type DragStartEvent,
} from "@dnd-kit/core";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { Plus, Filter, MessageSquare, MoreHorizontal } from "lucide-react";
import { TaskBadge } from "@/components/shared/TaskBadge";
import { PriorityBadge } from "@/components/shared/PriorityBadge";
import { Avatar } from "@/components/shared/Avatar";
import { mockColumns, mockTasks, type MockTask, type TaskStatus } from "@/lib/mock-data";
import { getMember, relativeDate, isOverdue } from "@/lib/format";

const colTopColor: Record<TaskStatus, string> = {
  TODO: "transparent",
  IN_PROGRESS: "var(--aqua-500)",
  IN_REVIEW: "transparent",
  DONE: "var(--jade-500)",
  BLOCKED: "var(--rose-500)",
};

export default function Board() {
  const [tasks, setTasks] = useState(mockTasks);
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = boardRef.current?.querySelectorAll(".kanban-card");
    if (!cards) return;
    anime({
      targets: Array.from(cards),
      opacity: [0, 1],
      translateY: [16, 0],
      scale: [0.97, 1],
      duration: 400,
      delay: anime.stagger(30),
      easing: "cubicBezier(0.16,1,0.3,1)",
    });
  }, []);

  const onDragStart = (e: DragStartEvent) => setActiveId(e.active.id as string);
  const onDragEnd = (e: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = e;
    if (!over) return;
    const newCol = over.id as TaskStatus;
    setTasks((prev) => prev.map((t) => (t.id === active.id ? { ...t, status: newCol } : t)));
  };

  const active = tasks.find((t) => t.id === activeId);

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-5">
        <button className="btn-primary"><Plus className="w-3.5 h-3.5" /> New Task</button>
        <button className="btn-ghost"><Filter className="w-3.5 h-3.5" /> Filter</button>
        <button className="btn-ghost">Group by</button>
        <div className="ml-auto flex items-center gap-1 p-1 rounded-md bg-bg-elevated border border-white/5">
          <button className="px-2.5 py-1 text-xs rounded bg-bg-overlay text-white">Board</button>
          <button className="px-2.5 py-1 text-xs rounded text-neutral2-500">List</button>
        </div>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div ref={boardRef} className="flex gap-3 overflow-x-auto pb-4 -mx-6 px-6 flex-1">
          {mockColumns.map((col) => {
            const colTasks = tasks.filter((t) => t.status === col.id);
            return (
              <Column key={col.id} id={col.id} name={col.name} count={colTasks.length} topColor={colTopColor[col.id as TaskStatus]}>
                {colTasks.map((t) => <KanbanCard key={t.id} task={t} />)}
              </Column>
            );
          })}
        </div>

        <DragOverlay>
          {active && <KanbanCard task={active} dragging />}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

function Column({ id, name, count, topColor, children }: any) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div className="w-[280px] shrink-0 flex flex-col" style={{ borderTop: `2px solid ${topColor}` }}>
      <div className="flex items-center justify-between px-2 py-2.5">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral2-400">{name}</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-bg-elevated text-neutral2-400 border border-white/5">{count}</span>
        </div>
        <button className="text-neutral2-500 hover:text-white" aria-label="Add"><Plus className="w-3.5 h-3.5" /></button>
      </div>
      <div ref={setNodeRef} className={`flex-1 min-h-[120px] p-1.5 space-y-2 rounded-lg transition-colors ${isOver ? "bg-brand-900/10 ring-1 ring-brand-500/30" : ""}`}>
        {children}
      </div>
    </div>
  );
}

function KanbanCard({ task, dragging }: { task: MockTask; dragging?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: task.id });
  const m = getMember(task.assigneeId)!;
  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`kanban-card card-obsidian p-3 cursor-grab active:cursor-grabbing select-none ${dragging || isDragging ? "shadow-lg !rotate-1 !scale-[1.02] opacity-90" : "hover:-translate-y-0.5"}`}
    >
      <div className="flex items-center justify-between mb-1.5">
        <PriorityBadge priority={task.priority} iconOnly />
        <TaskBadge status={task.status} />
      </div>
      <div className="text-sm font-medium leading-snug mb-1.5">{task.title}</div>
      {task.description && (
        <div className="text-xs text-neutral2-500 line-clamp-2 mb-2">{task.description}</div>
      )}
      <div className="flex flex-wrap gap-1 mb-2">
        {task.labels.map((l) => (
          <span key={l} className="text-[10px] px-1.5 py-0.5 rounded bg-bg-elevated text-neutral2-400 font-mono">#{l}</span>
        ))}
      </div>
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/[0.04]">
        <Avatar name={m.name} size="sm" />
        <div className="flex items-center gap-2 text-[10px] text-neutral2-500">
          <span className={`font-mono ${isOverdue(task.dueDate) && task.status !== "DONE" ? "text-rose2-400" : ""}`}>
            {relativeDate(task.dueDate)}
          </span>
          <span className="flex items-center gap-0.5">
            <MessageSquare className="w-3 h-3" /> {task.comments}
          </span>
          <button className="hover:text-white"><MoreHorizontal className="w-3 h-3" /></button>
        </div>
      </div>
    </div>
  );
}
