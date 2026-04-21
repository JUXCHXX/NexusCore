"use client";
import { Plus, MoreHorizontal } from "lucide-react";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { Avatar } from "@/components/shared/Avatar";
import { mockMembers, mockTasks } from "@/lib/mock-data";

const roleColor: Record<string, string> = {
  OWNER:  "bg-brand-900/40 text-brand-300 border-brand-500/30",
  ADMIN:  "bg-aqua-900/40 text-aqua-400 border-aqua-500/30",
  MEMBER: "bg-neutral2-800/60 text-neutral2-300 border-neutral2-700/50",
  VIEWER: "bg-neutral2-800/30 text-neutral2-400 border-neutral2-700/30",
};

export default function Members() {
  const ref = useStaggerReveal();
  const admins = mockMembers.filter((m) => m.role === "OWNER" || m.role === "ADMIN").length;
  const pending = 3;

  return (
    <div ref={ref} className="p-6 max-w-7xl mx-auto">
      <div data-animate className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold">Members</h1>
          <p className="text-sm text-neutral2-400">Manage who has access to this workspace.</p>
        </div>
        <button className="btn-primary"><Plus className="w-3.5 h-3.5" /> Invite member</button>
      </div>

      <div data-animate className="grid grid-cols-3 gap-4 mb-6">
        <Stat label="Total members" value={mockMembers.length} />
        <Stat label="Admins" value={admins} />
        <Stat label="Pending invites" value={pending} />
      </div>

      <div data-animate className="card-obsidian overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[10px] uppercase tracking-wider text-neutral2-500 border-b border-white/5">
              <th className="px-4 py-3 font-medium">Member</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Tasks</th>
              <th className="px-4 py-3 font-medium">Joined</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium w-10" />
            </tr>
          </thead>
          <tbody>
            {mockMembers.map((m) => {
              const tasks = mockTasks.filter((t) => t.assigneeId === m.id).length;
              return (
                <tr key={m.id} className="border-b border-white/[0.03] hover:bg-bg-overlay/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={m.name} online={m.online} size="md" />
                      <div>
                        <div className="font-medium">{m.name}</div>
                        <div className="text-xs text-neutral2-500 font-mono">{m.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${roleColor[m.role]}`}>{m.role}</span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-neutral2-400">{tasks}</td>
                  <td className="px-4 py-3 text-xs text-neutral2-500">{new Date(m.joinedAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-xs">
                    <span className={`inline-flex items-center gap-1.5 ${m.online ? "text-jade-400" : "text-neutral2-500"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${m.online ? "bg-jade-400 animate-pulse" : "bg-neutral2-600"}`} />
                      {m.online ? "Online" : "Offline"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-neutral2-500 hover:text-white"><MoreHorizontal className="w-4 h-4" /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div data-animate className="mt-6">
        <h2 className="text-sm font-semibold mb-3">Pending invitations</h2>
        <div className="space-y-2">
          {[
            { email: "alex@acme.io",   role: "MEMBER" },
            { email: "noor@acme.io",   role: "ADMIN" },
            { email: "sam@acme.io",    role: "MEMBER" },
          ].map((p) => (
            <div key={p.email} className="card-obsidian p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-bg-elevated border border-white/5 grid place-items-center text-xs text-neutral2-500">@</div>
                <div>
                  <div className="text-sm font-mono">{p.email}</div>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full border ${roleColor[p.role]}`}>{p.role}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="btn-ghost text-xs">Resend</button>
                <button className="btn-ghost text-xs text-rose2-400 hover:text-rose2-300">Cancel</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="card-obsidian p-4">
      <div className="text-xs text-neutral2-500">{label}</div>
      <div className="font-display text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}
