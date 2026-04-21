"use client";
import { useEffect, useRef } from "react";
import anime from "animejs";
import { Check, Sparkles } from "lucide-react";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";

const usage = [
  { label: "Members",       used: 8,    max: 15, unit: "" },
  { label: "Projects",      used: 6,    max: 20, unit: "" },
  { label: "AI requests",   used: 38,   max: 50, unit: "" },
  { label: "Storage",       used: 2.1,  max: 10, unit: "GB" },
];

export default function Billing() {
  const ref = useStaggerReveal();
  return (
    <div ref={ref} className="p-6 max-w-5xl mx-auto">
      <div data-animate className="mb-6">
        <h1 className="font-display text-2xl font-bold">Billing</h1>
        <p className="text-sm text-neutral2-400">Manage your subscription and usage.</p>
      </div>

      <div data-animate className="card-brand p-6 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-medium px-2 py-0.5 rounded-full bg-gradient-brand text-white shadow-[0_0_12px_rgba(91,45,212,0.4)]">
              <Sparkles className="w-2.5 h-2.5" /> CURRENT PLAN
            </span>
            <div className="font-display text-3xl font-bold mt-2">Pro</div>
            <div className="text-sm text-neutral2-300 mt-1">$12 per user / month · Next billing: Mar 1, 2026</div>
          </div>
          <button className="btn-primary">Manage subscription</button>
        </div>
      </div>

      <div data-animate className="card-obsidian p-6 mb-6">
        <h2 className="text-sm font-semibold mb-4">Usage this month</h2>
        <div className="space-y-4">
          {usage.map((u) => <UsageBar key={u.label} {...u} />)}
        </div>
      </div>

      <div data-animate>
        <h2 className="text-sm font-semibold mb-3">Compare plans</h2>
        <div className="card-obsidian overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-4 py-3 text-left text-xs text-neutral2-500 font-medium">Feature</th>
                <th className="px-4 py-3 text-center text-xs text-neutral2-400 font-medium">Free</th>
                <th className="px-4 py-3 text-center text-xs text-brand-300 font-medium">Pro <span className="text-[9px] ml-1 px-1 py-0.5 rounded bg-brand-900/40">CURRENT</span></th>
                <th className="px-4 py-3 text-center text-xs text-neutral2-400 font-medium">Team</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Members", "3", "15", "Unlimited"],
                ["Projects", "1", "Unlimited", "Unlimited"],
                ["AI requests / mo", "5", "1,500", "Unlimited"],
                ["Real-time collab", "—", "✓", "✓"],
                ["GitHub sync", "—", "✓", "✓"],
                ["SSO + SAML", "—", "—", "✓"],
                ["Audit logs", "—", "—", "✓"],
              ].map((row) => (
                <tr key={row[0]} className="border-b border-white/[0.03]">
                  <td className="px-4 py-3 text-neutral2-300">{row[0]}</td>
                  <td className="px-4 py-3 text-center text-neutral2-400 text-xs">{row[1]}</td>
                  <td className="px-4 py-3 text-center text-brand-300 text-xs font-medium">{row[2]}</td>
                  <td className="px-4 py-3 text-center text-neutral2-400 text-xs">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function UsageBar({ label, used, max, unit }: { label: string; used: number; max: number; unit: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const pct = Math.min(100, (used / max) * 100);
  const danger = pct >= 80;
  useEffect(() => {
    if (!ref.current) return;
    anime({ targets: ref.current, width: ["0%", `${pct}%`], duration: 1000, easing: "cubicBezier(0.16,1,0.3,1)" });
  }, [pct]);
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-neutral2-300">{label}</span>
        <span className="text-xs font-mono text-neutral2-400">{used}{unit} / {max}{unit} <span className="ml-1 text-neutral2-500">({Math.round(pct)}%)</span></span>
      </div>
      <div className="h-1.5 rounded-full bg-bg-elevated overflow-hidden">
        <div ref={ref} className="h-full rounded-full" style={{ width: 0, background: danger ? "linear-gradient(90deg, #F59E0B, #F43F5E)" : "linear-gradient(90deg, #5B2DD4, #06B0D8)" }} />
      </div>
    </div>
  );
}
