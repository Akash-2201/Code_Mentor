"use client";

import { useState } from "react";
import type { Vulnerability } from "@/lib/workspace-data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Laugh, Terminal } from "lucide-react";

type ExplainMode = "analogy" | "meme" | "technical";

const modes: { id: ExplainMode; label: string; icon: typeof BookOpen }[] = [
  { id: "analogy", label: "Analogy", icon: BookOpen },
  { id: "meme", label: "Meme", icon: Laugh },
  { id: "technical", label: "Dev", icon: Terminal },
];

type ExplainabilityCardProps = {
  vulnerability: Vulnerability;
  className?: string;
};

export function ExplainabilityCard({
  vulnerability,
  className,
}: ExplainabilityCardProps) {
  const [mode, setMode] = useState<ExplainMode>("analogy");

  const content = vulnerability.explain[mode];

  return (
    <article
      className={cn(
        "glass rounded-lg border border-primary/15 overflow-hidden",
        className
      )}
    >
      <header className="border-b border-border bg-gradient-to-r from-primary/5 to-neon-purple/5 px-3 py-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
          Explainability
        </p>
        <p className="mt-0.5 truncate text-xs font-medium">{vulnerability.title}</p>
      </header>

      <div className="flex border-b border-border">
        {modes.map((m) => {
          const Icon = m.icon;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={cn(
                "flex flex-1 items-center justify-center gap-1 py-2 text-[10px] font-medium transition-colors",
                mode === m.id
                  ? "bg-primary/15 text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-3 w-3" />
              {m.label}
            </button>
          );
        })}
      </div>

      <div className="p-3">
        {mode === "meme" ? (
          <div className="rounded-md border border-dashed border-neon-magenta/30 bg-neon-magenta/5 px-3 py-4 text-center">
            <span className="text-2xl">💀</span>
            <p className="mt-2 text-sm italic leading-relaxed text-foreground/90">
              {content}
            </p>
          </div>
        ) : (
          <p
            className={cn(
              "text-sm leading-relaxed",
              mode === "technical" ? "font-mono text-xs text-muted-foreground" : "text-foreground/90"
            )}
          >
            {content}
          </p>
        )}
        <Badge variant="outline" className="mt-3 text-[9px]">
          {vulnerability.cwe}
        </Badge>
      </div>
    </article>
  );
}
