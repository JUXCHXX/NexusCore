// Mock data para desarrollo del frontend NexusCore.
// TODO: conectar a tRPC.

export type TaskStatus = "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE" | "BLOCKED";
export type Priority = "URGENT" | "HIGH" | "MEDIUM" | "LOW";

export const mockWorkspace = {
  id: "ws_nexus",
  name: "Acme Engineering",
  slug: "acme-eng",
  plan: "PRO" as const,
  members: 8,
};

export const mockMembers = [
  { id: "m1", name: "Ana García",   email: "ana@acme.io",     role: "OWNER",  online: true,  avatarUrl: null as string | null, joinedAt: "2024-08-01" },
  { id: "m2", name: "Carlos López", email: "carlos@acme.io",  role: "ADMIN",  online: true,  avatarUrl: null, joinedAt: "2024-09-12" },
  { id: "m3", name: "María Torres", email: "maria@acme.io",   role: "MEMBER", online: false, avatarUrl: null, joinedAt: "2024-10-03" },
  { id: "m4", name: "John Smith",   email: "john@acme.io",    role: "MEMBER", online: true,  avatarUrl: null, joinedAt: "2024-11-21" },
  { id: "m5", name: "Elena Ruiz",   email: "elena@acme.io",   role: "MEMBER", online: false, avatarUrl: null, joinedAt: "2024-12-08" },
  { id: "m6", name: "Diego Méndez", email: "diego@acme.io",   role: "MEMBER", online: true,  avatarUrl: null, joinedAt: "2025-01-15" },
  { id: "m7", name: "Sofía Vargas", email: "sofia@acme.io",   role: "VIEWER", online: false, avatarUrl: null, joinedAt: "2025-02-02" },
  { id: "m8", name: "Liam Chen",    email: "liam@acme.io",    role: "MEMBER", online: true,  avatarUrl: null, joinedAt: "2025-02-18" },
];

export const mockProjects = [
  { id: "p1", name: "Mobile App v2", color: "#5B2DD4", tasksCount: 24 },
  { id: "p2", name: "API Refactor",  color: "#06B0D8", tasksCount: 11 },
  { id: "p3", name: "Design System", color: "#10B981", tasksCount: 18 },
];

export const mockColumns = [
  { id: "TODO",        name: "To Do",       color: "#52525F", order: 0 },
  { id: "IN_PROGRESS", name: "In Progress", color: "#06B0D8", order: 1 },
  { id: "IN_REVIEW",   name: "In Review",   color: "#5B2DD4", order: 2 },
  { id: "DONE",        name: "Done",        color: "#10B981", order: 3 },
  { id: "BLOCKED",     name: "Blocked",     color: "#F43F5E", order: 4 },
] as const;

export type MockTask = {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: TaskStatus;
  assigneeId: string;
  dueDate: string;
  comments: number;
  projectId: string;
  labels: string[];
};

export const mockTasks: MockTask[] = [
  { id: "t1",  title: "Design new onboarding flow",         description: "Rediseñar el flujo de bienvenida con foco en activación del primer workspace.", priority: "HIGH",   status: "IN_PROGRESS", assigneeId: "m1", dueDate: "2026-04-25", comments: 3, projectId: "p1", labels: ["design","ux"] },
  { id: "t2",  title: "Implement Stripe webhook handler",   description: "Manejar eventos de subscription updated/cancelled.", priority: "URGENT", status: "TODO",        assigneeId: "m2", dueDate: "2026-04-20", comments: 1, projectId: "p2", labels: ["backend","payments"] },
  { id: "t3",  title: "Write API documentation",            description: "Documentar todos los endpoints públicos con ejemplos.", priority: "MEDIUM", status: "IN_REVIEW",   assigneeId: "m3", dueDate: "2026-05-02", comments: 7, projectId: "p2", labels: ["docs"] },
  { id: "t4",  title: "Fix mobile navigation bug",          description: "Bottom nav se duplica en iOS Safari < 16.", priority: "HIGH",   status: "BLOCKED",     assigneeId: "m4", dueDate: "2026-04-19", comments: 4, projectId: "p1", labels: ["bug","mobile"] },
  { id: "t5",  title: "Update color token system",          description: "Renombrar tokens al nuevo sistema Obsidian.", priority: "LOW",    status: "DONE",        assigneeId: "m5", dueDate: "2026-04-10", comments: 2, projectId: "p3", labels: ["design-system"] },
  { id: "t6",  title: "Refactor task store with Zustand",   description: "", priority: "MEDIUM", status: "IN_PROGRESS", assigneeId: "m6", dueDate: "2026-04-28", comments: 5, projectId: "p1", labels: ["frontend","refactor"] },
  { id: "t7",  title: "Add Gantt drag handles",             description: "", priority: "LOW",    status: "TODO",        assigneeId: "m1", dueDate: "2026-05-10", comments: 0, projectId: "p1", labels: ["feature"] },
  { id: "t8",  title: "Audit a11y on board view",           description: "", priority: "MEDIUM", status: "TODO",        assigneeId: "m7", dueDate: "2026-05-04", comments: 1, projectId: "p3", labels: ["a11y"] },
  { id: "t9",  title: "Migrate auth to v5",                 description: "", priority: "HIGH",   status: "IN_REVIEW",   assigneeId: "m2", dueDate: "2026-04-22", comments: 3, projectId: "p2", labels: ["auth"] },
  { id: "t10", title: "Design empty states",                description: "", priority: "LOW",    status: "DONE",        assigneeId: "m1", dueDate: "2026-04-08", comments: 2, projectId: "p3", labels: ["design"] },
  { id: "t11", title: "Optimize bundle size",               description: "", priority: "MEDIUM", status: "TODO",        assigneeId: "m6", dueDate: "2026-05-08", comments: 0, projectId: "p1", labels: ["perf"] },
  { id: "t12", title: "Set up Pusher channels",             description: "", priority: "HIGH",   status: "IN_PROGRESS", assigneeId: "m4", dueDate: "2026-04-26", comments: 2, projectId: "p2", labels: ["realtime"] },
  { id: "t13", title: "Email templates for invites",        description: "", priority: "LOW",    status: "DONE",        assigneeId: "m3", dueDate: "2026-04-05", comments: 1, projectId: "p3", labels: ["email"] },
  { id: "t14", title: "Add command palette shortcuts",      description: "", priority: "MEDIUM", status: "IN_REVIEW",   assigneeId: "m8", dueDate: "2026-04-24", comments: 4, projectId: "p1", labels: ["ux"] },
  { id: "t15", title: "Database migration plan",            description: "", priority: "URGENT", status: "BLOCKED",     assigneeId: "m2", dueDate: "2026-04-21", comments: 6, projectId: "p2", labels: ["db","critical"] },
];

export const mockActivity = [
  { id: "a1", actor: "m1", text: "moved", target: "Design new onboarding flow", to: "In Progress", time: "5m ago" },
  { id: "a2", actor: "m4", text: "commented on", target: "Fix mobile navigation bug", time: "12m ago" },
  { id: "a3", actor: "m2", text: "completed", target: "Email templates for invites", time: "1h ago" },
  { id: "a4", actor: "m6", text: "created task", target: "Optimize bundle size", time: "2h ago" },
  { id: "a5", actor: "m3", text: "moved", target: "Migrate auth to v5", to: "In Review", time: "3h ago" },
  { id: "a6", actor: "m8", text: "moved", target: "Add command palette shortcuts", to: "In Review", time: "5h ago" },
];
