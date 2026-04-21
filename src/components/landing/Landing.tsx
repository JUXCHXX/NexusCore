"use client";
import { useEffect, useRef } from "react";
import anime from "animejs";
import Link from "next/link";
import {
  Sparkles, ArrowRight, Layout, GanttChart, Zap, Github, Workflow,
  Check, Star,
} from "lucide-react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { useCountUp } from "@/hooks/useCountUp";
import { Avatar, AvatarStack } from "@/components/shared/Avatar";

export default function Landing() {
  return (
    <div className="relative z-10">
      <Nav />
      <Hero />
      <Stats />
      <Features />
      <Pricing />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <nav className="sticky top-0 z-40 border-b border-white/[0.04] backdrop-blur-md" style={{ background: "rgba(10,10,15,0.7)" }}>
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-gradient-brand grid place-items-center shadow-[0_0_12px_rgba(91,45,212,0.5)]">
            <span className="font-display text-white text-sm font-bold">N</span>
          </div>
          <span className="font-display text-base font-bold tracking-tight">NexusCore</span>
        </Link>
        <div className="hidden md:flex items-center gap-7 text-sm text-neutral2-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#" className="hover:text-white transition-colors">Changelog</a>
          <a href="#" className="hover:text-white transition-colors">Docs</a>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/app" className="btn-ghost">Sign in</Link>
          <Link href="/app" className="btn-primary">Get started <ArrowRight className="w-3.5 h-3.5" /></Link>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = anime.timeline({ easing: "cubicBezier(0.16,1,0.3,1)" });
    tl.add({ targets: ".hero-badge",      opacity: [0, 1], translateY: [12, 0], duration: 500 })
      .add({ targets: ".hero-headline",   opacity: [0, 1], translateY: [20, 0], duration: 600 }, "-=200")
      .add({ targets: ".hero-subline",    opacity: [0, 1], translateY: [16, 0], duration: 500 }, "-=300")
      .add({ targets: ".hero-cta",        opacity: [0, 1], translateY: [12, 0], duration: 400, delay: anime.stagger(80) }, "-=200")
      .add({ targets: ".hero-proof",      opacity: [0, 1], translateY: [10, 0], duration: 400 }, "-=200")
      .add({ targets: ".hero-screenshot", opacity: [0, 1], translateY: [40, 0], scale: [0.97, 1], duration: 800 }, "-=100");

    // Partículas flotantes
    const root = particlesRef.current;
    if (root) {
      anime({
        targets: root.querySelectorAll(".particle"),
        translateX: () => anime.random(-30, 30),
        translateY: () => anime.random(-30, 30),
        opacity: () => [anime.random(1, 3) * 0.1, anime.random(3, 5) * 0.1],
        duration: () => anime.random(4000, 8000),
        delay: () => anime.random(0, 2000),
        direction: "alternate",
        loop: true,
        easing: "easeInOutSine",
      });
    }
  }, []);

  return (
    <section ref={heroRef} className="relative px-6 pt-16 pb-24 overflow-hidden">
      {/* Particles layer */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="particle absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: 2 + Math.random() * 3,
              height: 2 + Math.random() * 3,
              background: i % 3 === 0 ? "var(--aqua-400)" : "var(--brand-400)",
              opacity: 0.3,
              boxShadow: "0 0 8px currentColor",
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto text-center relative">
        <div className="hero-badge inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/40 border border-brand-500/30 text-xs text-brand-300 mb-8" style={{ opacity: 0 }}>
          <Sparkles className="w-3 h-3" />
          Now with AI-powered sprint insights
          <ArrowRight className="w-3 h-3" />
        </div>

        <h1 className="hero-headline font-display text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]" style={{ opacity: 0 }}>
          The project workspace<br />built for{" "}
          <span className="text-gradient-brand">engineering teams</span>
        </h1>

        <p className="hero-subline mt-6 text-base md:text-lg text-neutral2-400 max-w-xl mx-auto" style={{ opacity: 0 }}>
          NexusCore combines Kanban boards, Gantt charts, and AI insights into one
          beautiful workspace. Ship faster, together.
        </p>

        <div className="mt-9 flex items-center justify-center gap-3 flex-wrap">
          <Link href="/app" className="hero-cta btn-primary !h-11 !px-5 text-sm" style={{ opacity: 0 }}>
            Start for free <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="#features" className="hero-cta btn-secondary !h-11 !px-5 text-sm" style={{ opacity: 0 }}>
            View demo
          </a>
        </div>

        <div className="hero-proof mt-8 flex items-center justify-center gap-4 text-xs text-neutral2-500" style={{ opacity: 0 }}>
          <AvatarStack names={["Ana", "John", "Maria", "Diego", "Liam"]} size="sm" />
          <span>Trusted by 2,000+ teams</span>
          <div className="flex items-center gap-0.5 text-amber2-400">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
          </div>
        </div>

        {/* Screenshot mockup */}
        <div className="hero-screenshot relative mt-16 mx-auto max-w-5xl" style={{ opacity: 0, perspective: 1200 }}>
          <div
            className="absolute -inset-4 -z-10"
            style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(91,45,212,0.35) 0%, transparent 70%)", filter: "blur(40px)" }}
          />
          <div
            className="rounded-2xl border border-white/10 overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
            style={{ transform: "rotateX(4deg)", background: "var(--bg-surface)" }}
          >
            <DashboardPreview />
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardPreview() {
  // mini mockup del dashboard
  return (
    <div className="flex h-[440px]">
      <div className="w-[180px] border-r border-white/5 p-3 flex flex-col gap-1">
        <div className="flex items-center gap-2 mb-3 px-1">
          <div className="w-5 h-5 rounded bg-gradient-brand" />
          <span className="font-display text-xs font-bold">NexusCore</span>
        </div>
        <div className="h-7 rounded-md bg-bg-elevated mb-2" />
        <div className="text-[9px] text-neutral2-600 px-2 mt-2 uppercase tracking-wider">Projects</div>
        {["Overview", "Board", "Gantt"].map((t, i) => (
          <div key={t} className={`px-2 py-1.5 rounded-md text-[11px] ${i === 1 ? "bg-brand-900/30 text-brand-300" : "text-neutral2-500"}`}>
            • {t}
          </div>
        ))}
        <div className="text-[9px] text-neutral2-600 px-2 mt-3 uppercase tracking-wider">Workspace</div>
        {["Members", "Settings"].map((t) => (
          <div key={t} className="px-2 py-1.5 rounded-md text-[11px] text-neutral2-500">• {t}</div>
        ))}
      </div>
      <div className="flex-1 flex flex-col">
        <div className="h-9 border-b border-white/5 px-3 flex items-center text-[11px] text-neutral2-500">
          Acme Engineering / Board
        </div>
        <div className="flex-1 p-3 grid grid-cols-4 gap-2">
          {["TODO", "IN PROGRESS", "IN REVIEW", "DONE"].map((c, ci) => {
            const colors = ["#52525F", "#06B0D8", "#5B2DD4", "#10B981"];
            return (
              <div key={c} className="flex flex-col gap-1.5">
                <div className="text-[9px] uppercase tracking-wider text-neutral2-500 mb-1 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full" style={{ background: colors[ci] }} />
                  {c}
                </div>
                {Array.from({ length: 3 - (ci % 2) }).map((_, j) => (
                  <div key={j} className="rounded-md bg-bg-elevated border border-white/5 p-2">
                    <div className="h-1.5 w-3/4 rounded-full bg-white/10 mb-1.5" />
                    <div className="h-1 w-full rounded-full bg-white/5 mb-1" />
                    <div className="h-1 w-1/2 rounded-full bg-white/5" />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Stats() {
  const stats = [
    { v: 2000, suffix: "+ teams" },
    { v: 50000, suffix: "+ tasks/week" },
    { v: 99.9, suffix: "% uptime", float: true },
    { v: 200, suffix: "ms avg response", prefix: "<" },
  ];
  return (
    <section className="border-y border-white/5 bg-bg-surface/50">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => <StatItem key={i} {...s} />)}
      </div>
    </section>
  );
}

function StatItem({ v, suffix, prefix, float }: { v: number; suffix: string; prefix?: string; float?: boolean }) {
  const ref = useRevealOnScroll<HTMLDivElement>();
  const numRef = useCountUp(v, {
    format: (n) => (float ? n.toFixed(1) : Math.round(n).toLocaleString()),
  });
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-3xl md:text-4xl font-bold text-gradient-brand">
        {prefix}<span ref={numRef}>0</span>
      </div>
      <div className="text-xs text-neutral2-500 mt-1">{suffix.replace(/^[+%]/, "")}</div>
    </div>
  );
}

function Features() {
  const features = [
    { icon: Layout,      title: "Kanban Boards",      desc: "Drag-and-drop columns with smooth, snappy interactions.", color: "brand" },
    { icon: GanttChart,  title: "Gantt & Timeline",   desc: "Plan sprints visually with dependencies and milestones.",  color: "aqua" },
    { icon: Sparkles,    title: "AI Sprint Insights", desc: "Generate summaries, find blockers, and prioritize fast.",  color: "brand-glow" },
    { icon: Zap,         title: "Real-time collab",   desc: "See changes live across boards, comments, and presence.",  color: "aqua" },
    { icon: Github,      title: "GitHub Sync",        desc: "Link issues, PRs and branches directly to tasks.",         color: "neutral" },
    { icon: Workflow,    title: "Custom Workflows",   desc: "Define statuses, automations and per-project rules.",      color: "jade" },
  ];
  return (
    <section id="features" className="px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display text-3xl md:text-5xl font-bold">Everything your team needs</h2>
          <p className="mt-4 text-neutral2-400">Built for modern engineering teams who ship fast.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => <FeatureCard key={i} {...f} />)}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, desc, color }: { icon: typeof Layout; title: string; desc: string; color: string }) {
  const ref = useRevealOnScroll<HTMLDivElement>();
  const colorMap: Record<string, { bg: string; text: string }> = {
    brand:        { bg: "bg-brand-900/40",     text: "text-brand-400" },
    aqua:         { bg: "bg-aqua-900/40",      text: "text-aqua-400" },
    "brand-glow": { bg: "bg-brand-900/40",     text: "text-brand-400" },
    neutral:      { bg: "bg-neutral2-800/60",  text: "text-neutral2-300" },
    jade:         { bg: "bg-jade-900/40",      text: "text-jade-400" },
  };
  const c = colorMap[color];
  return (
    <div
      ref={ref}
      className="card-obsidian p-5 group hover:-translate-y-0.5"
    >
      <div className={`w-10 h-10 rounded-md grid place-items-center ${c.bg} ${color === "brand-glow" ? "shadow-[0_0_16px_rgba(91,45,212,0.4)]" : ""}`}>
        <Icon className={`w-5 h-5 ${c.text}`} />
      </div>
      <h3 className="mt-4 text-base font-semibold">{title}</h3>
      <p className="mt-1.5 text-sm text-neutral2-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      cta: "Get started free",
      ctaClass: "btn-secondary",
      features: ["Up to 3 members", "1 workspace", "Kanban board", "Basic search", "Community support", "5 AI requests / month"],
      highlight: false,
    },
    {
      name: "Pro",
      price: "$12",
      period: "per user/month",
      cta: "Start Pro trial",
      ctaClass: "btn-primary",
      features: ["Up to 15 members", "Unlimited workspaces", "Kanban + Gantt", "GitHub & Slack sync", "Real-time collaboration", "50 AI requests / day", "Priority support", "Custom workflows", "Advanced analytics", "API access"],
      highlight: true,
    },
    {
      name: "Team",
      price: "$28",
      period: "per user/month",
      cta: "Contact sales",
      ctaClass: "btn-secondary",
      features: ["Unlimited members", "SSO + SAML", "Audit logs", "Unlimited AI", "Dedicated support", "Custom contracts"],
      highlight: false,
    },
  ];
  return (
    <section id="pricing" className="px-6 py-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display text-3xl md:text-5xl font-bold">Simple, transparent pricing</h2>
          <p className="mt-4 text-neutral2-400">Pay only for what you use. Cancel anytime.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4 items-stretch">
          {plans.map((p) => <PriceCard key={p.name} {...p} />)}
        </div>
      </div>
    </section>
  );
}

function PriceCard({ name, price, period, cta, ctaClass, features, highlight }: any) {
  const ref = useRevealOnScroll<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`relative p-6 ${highlight ? "card-brand md:scale-[1.02]" : "card-obsidian"}`}
      style={highlight ? { boxShadow: "var(--glow-brand), 0 8px 32px rgba(0,0,0,0.4)" } : undefined}
    >
      {highlight && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-gradient-brand text-white shadow-[0_0_16px_rgba(91,45,212,0.6)]">
          Most popular
        </span>
      )}
      <div className="text-sm text-neutral2-400">{name}</div>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="font-display text-4xl font-bold">{price}</span>
        <span className="text-xs text-neutral2-500">{period}</span>
      </div>
      <ul className="mt-6 space-y-2.5 min-h-[260px]">
        {features.map((f: string) => (
          <li key={f} className="flex items-start gap-2 text-sm text-neutral2-300">
            <Check className="w-3.5 h-3.5 text-jade-400 mt-1 shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <Link href="/app" className={`${ctaClass} w-full mt-6`}>{cta}</Link>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-10 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral2-500">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-gradient-brand" />
          <span className="font-display font-bold text-neutral2-300">NexusCore</span>
          <span className="text-xs">© 2026</span>
        </div>
        <div className="flex items-center gap-6 text-xs">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Security</a>
          <a href="#" className="hover:text-white transition-colors">Status</a>
        </div>
      </div>
    </footer>
  );
}
