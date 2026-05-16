import Link from "next/link";
import { ArrowRight, Play, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section className="relative px-4 pb-20 pt-32 sm:px-6 sm:pt-40 lg:px-8 lg:pt-44">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <Badge
            variant="outline"
            className="mb-6 gap-1.5 border-primary/30 bg-primary/5 px-3 py-1 text-xs uppercase tracking-widest glow-ring"
          >
            <ShieldCheck className="h-3 w-3 text-primary" />
            Enterprise AI Governance
          </Badge>

          <h1 className="max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block text-foreground">Command every</span>
            <span className="text-gradient-hero mt-1 block">AI deployment</span>
            <span className="mt-2 block text-foreground/90 text-3xl sm:text-4xl md:text-5xl">
              with <span className="text-shimmer font-bold">zero compromise</span>
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            NEXUS is the governance IDE for security teams who need real-time policy
            enforcement, compliance automation, and full visibility across models,
            agents, and inference pipelines.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button size="lg" className="h-12 px-8 text-base gap-2" asChild>
              <Link href="/ide">
                Open Governance IDE
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base gap-2 border-primary/30"
            >
              <Play className="h-4 w-4" />
              Watch demo
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Sub-12ms policy checks
            </span>
            <span className="h-1 w-1 rounded-full bg-primary/40" />
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Zero-trust architecture
            </span>
            <span className="h-1 w-1 rounded-full bg-primary/40 hidden sm:block" />
            <span className="hidden sm:inline">Air-gapped deployment ready</span>
          </div>
        </div>

        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary/20 via-neon-purple/20 to-neon-magenta/20 blur-2xl" />
          <div className="glass-strong glow-ring relative overflow-hidden rounded-xl border border-border">
            <div className="flex items-center gap-2 border-b border-border bg-muted px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-destructive/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="flex-1 text-center font-mono text-[10px] text-muted-foreground">
                nexus-governance — production cluster
              </span>
              <Badge variant="success" className="text-[10px]">
                SECURE
              </Badge>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-[11px] leading-relaxed sm:text-xs">
              <code>
                <span className="text-muted-foreground">{"# Live governance snapshot"}</span>
                {"\n"}
                <span className="text-neon-magenta">policies_active</span>
                <span className="text-primary">:</span> 127
                <span className="text-muted-foreground"> {"  # enforced across 8 models"}</span>
                {"\n"}
                <span className="text-neon-magenta">violations_blocked</span>
                <span className="text-primary">:</span>{" "}
                <span className="text-emerald-400">2,847</span>
                <span className="text-muted-foreground"> {"  # last 24h"}</span>
                {"\n"}
                <span className="text-neon-magenta">compliance_score</span>
                <span className="text-primary">:</span> 98.7%
                {"\n"}
                <span className="text-neon-magenta">threat_level</span>
                <span className="text-primary">:</span>{" "}
                <span className="text-primary">LOW</span>
                <span className="text-muted-foreground"> {"  # all systems nominal"}</span>
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
