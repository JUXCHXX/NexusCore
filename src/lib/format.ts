import { mockMembers } from "./mock-data";

export function getMember(id: string) {
  return mockMembers.find((m) => m.id === id);
}

export function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const GRADIENTS = [
  "from-brand-600 to-aqua-500",
  "from-brand-700 to-rose2-500",
  "from-jade-500 to-aqua-500",
  "from-amber2-500 to-rose2-500",
  "from-brand-500 to-jade-500",
  "from-aqua-600 to-brand-700",
  "from-rose2-500 to-amber2-500",
  "from-jade-500 to-brand-600",
];

export function gradientFromName(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash << 5) - hash + name.charCodeAt(i);
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
}

export function relativeDate(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff === -1) return "Yesterday";
  if (diff < 0) return `${Math.abs(diff)}d overdue`;
  if (diff < 7) return `In ${diff}d`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function isOverdue(dateStr: string) {
  return new Date(dateStr).getTime() < Date.now() - 24 * 60 * 60 * 1000;
}
