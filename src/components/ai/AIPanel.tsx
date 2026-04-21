"use client";
import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { Sparkles, X, Send } from "lucide-react";

const QUICK_PROMPTS = [
  "📊 Sprint summary",
  "⚠️ Find blockers",
  "🎯 Suggest priorities",
];

const SUGGESTIONS = [
  "What's blocking the team?",
  "Summarize this sprint",
  "Who has the most overdue tasks?",
  "Suggest 3 tasks I should focus on",
];

type Msg = { role: "user" | "ai"; text: string };

export function AIPanel({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (open && panelRef.current) {
      anime({
        targets: panelRef.current,
        translateX: [400, 0],
        opacity: [0, 1],
        duration: 350,
        easing: "cubicBezier(0.16,1,0.3,1)",
      });
    }
  }, [open]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text: "Here's a quick analysis based on your workspace data: 3 tasks are overdue, 2 are blocked, and the team's velocity has improved 12% over last sprint. (Demo response — TODO: conectar a tRPC + Lovable AI Gateway)",
        },
      ]);
    }, 900);
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-[80] bg-black/40" onClick={() => onOpenChange(false)} />
      <div
        ref={panelRef}
        className="fixed top-0 right-0 z-[90] h-screen w-full max-w-[380px] card-glass border-l flex flex-col"
        style={{ borderColor: "rgba(91,45,212,0.3)", borderRadius: 0 }}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-white/5 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-gradient-brand grid place-items-center shadow-[0_0_12px_rgba(91,45,212,0.5)]">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold">NexusCore AI</div>
              <div className="text-[10px] text-neutral2-500 font-mono">Powered by Groq · llama-3.3-70b</div>
            </div>
          </div>
          <button onClick={() => onOpenChange(false)} className="text-neutral2-500 hover:text-white" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick actions */}
        <div className="p-3 flex gap-2 flex-wrap border-b border-white/5">
          {QUICK_PROMPTS.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              className="px-2.5 py-1 rounded-full text-xs bg-bg-elevated border border-white/10 hover:border-brand-500/50 hover:text-brand-300 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center gap-3 px-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-brand grid place-items-center shadow-[0_0_24px_rgba(91,45,212,0.5)] animate-float">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-sm font-medium">Ask me anything about your workspace</div>
                <div className="text-xs text-neutral2-500 mt-1">Try one of these:</div>
              </div>
              <div className="flex flex-col gap-1.5 w-full">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-left text-xs px-3 py-2 rounded-md bg-bg-elevated/50 border border-white/5 hover:border-brand-500/30 hover:bg-bg-overlay transition-colors text-neutral2-300"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
              <div
                className={
                  m.role === "user"
                    ? "max-w-[80%] bg-bg-elevated border border-white/10 rounded-lg px-3 py-2 text-sm"
                    : "max-w-[90%] bg-brand-900/30 border border-brand-500/20 rounded-lg px-3 py-2 text-sm"
                }
              >
                {m.text}
              </div>
            </div>
          ))}

          {typing && (
            <div className="bg-brand-900/30 border border-brand-500/20 rounded-lg px-3 py-3 max-w-[80px] flex gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-300 animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-brand-300 animate-pulse" style={{ animationDelay: "120ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-brand-300 animate-pulse" style={{ animationDelay: "240ms" }} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-white/5">
          <div className="flex gap-2 items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              rows={1}
              placeholder="Ask about your sprint, tasks, or team…"
              className="input-obsidian flex-1 resize-none py-2"
              style={{ height: "auto", minHeight: 36 }}
            />
            <button onClick={() => send(input)} className="btn-primary !h-9 !w-9 !p-0" aria-label="Send">
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
