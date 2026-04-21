"use client";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { Github, Slack, Plug, Box, type LucideIcon } from "lucide-react";

const items: { name: string; desc: string; connected: boolean; Icon: LucideIcon }[] = [
  { name: "GitHub",  desc: "Sync issues and PRs",      connected: true,  Icon: Github },
  { name: "Slack",   desc: "Notifications and replies", connected: true,  Icon: Slack },
  { name: "Figma",   desc: "Embed designs in tasks",    connected: false, Icon: Box },
  { name: "Linear",  desc: "Two-way issue sync",        connected: false, Icon: Plug },
];

export default function Integrations() {
  const ref = useStaggerReveal();
  return (
    <div ref={ref} className="p-6 max-w-5xl mx-auto">
      <div data-animate className="mb-6">
        <h1 className="font-display text-2xl font-bold">Integrations</h1>
        <p className="text-sm text-neutral2-400">Connect NexusCore with your team's tools.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((i) => (
          <div key={i.name} data-animate className="card-obsidian p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-md bg-bg-elevated grid place-items-center text-neutral2-300">
              <i.Icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">{i.name}</div>
              <div className="text-xs text-neutral2-500">{i.desc}</div>
            </div>
            <button className={i.connected ? "btn-secondary text-xs" : "btn-primary text-xs"}>
              {i.connected ? "Connected" : "Connect"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
