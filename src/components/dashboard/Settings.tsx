"use client";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";

export default function Settings() {
  const ref = useStaggerReveal();
  return (
    <div ref={ref} className="p-6 max-w-3xl mx-auto">
      <div data-animate className="mb-6">
        <h1 className="font-display text-2xl font-bold">Settings</h1>
        <p className="text-sm text-neutral2-400">Workspace preferences and configuration.</p>
      </div>

      <Section title="General" data-animate>
        <Field label="Workspace name" value="Acme Engineering" />
        <Field label="Slug" value="acme-eng" mono />
        <Field label="Timezone" value="UTC-5 · America/Bogota" />
      </Section>

      <Section title="Branding" data-animate>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-brand grid place-items-center text-2xl font-display font-bold text-white">A</div>
          <div className="flex-1">
            <button className="btn-secondary">Upload logo</button>
            <p className="text-xs text-neutral2-500 mt-2">Recommended 256×256, PNG or SVG.</p>
          </div>
        </div>
      </Section>

      <Section title="Danger zone" data-animate danger>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">Delete workspace</div>
            <div className="text-xs text-neutral2-500">This action is permanent and cannot be undone.</div>
          </div>
          <button className="px-3 h-9 rounded-md text-xs font-medium bg-rose2-500/10 text-rose2-400 border border-rose2-500/30 hover:bg-rose2-500/20 transition">
            Delete workspace
          </button>
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children, danger, ...rest }: any) {
  return (
    <div {...rest} className={`p-5 mb-4 ${danger ? "rounded-lg border border-rose2-500/30 bg-rose2-900/10" : "card-obsidian"}`}>
      <h2 className="text-sm font-semibold mb-4">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <label className="text-xs text-neutral2-500 mb-1 block">{label}</label>
      <input defaultValue={value} className={`input-obsidian ${mono ? "font-mono" : ""}`} />
    </div>
  );
}
