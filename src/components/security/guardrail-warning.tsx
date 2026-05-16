"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { GuardrailHit } from "@/lib/guardrail-detector";
import {
  KeyRound,
  Syringe,
  Skull,
  X,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const typeConfig = {
  secret: {
    icon: KeyRound,
    border: "border-destructive/50",
    bg: "bg-destructive/10",
    glow: "shadow-[0_0_24px_rgba(244,63,94,0.35)]",
    label: "Secret exposure",
  },
  injection: {
    icon: Syringe,
    border: "border-amber-500/50",
    bg: "bg-amber-500/10",
    glow: "shadow-[0_0_24px_rgba(245,158,11,0.25)]",
    label: "Prompt injection",
  },
  unsafe: {
    icon: Skull,
    border: "border-neon-magenta/50",
    bg: "bg-neon-magenta/10",
    glow: "shadow-[0_0_24px_rgba(236,72,153,0.3)]",
    label: "Unsafe instruction",
  },
};

type GuardrailWarningProps = {
  hits: GuardrailHit[];
  onDismiss?: () => void;
  className?: string;
};

export function GuardrailWarning({ hits, onDismiss, className }: GuardrailWarningProps) {
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (hits.length > 0) {
      setVisible(true);
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 600);
      return () => clearTimeout(t);
    }
    setVisible(false);
  }, [hits]);

  if (!visible || hits.length === 0) return null;

  const primary = hits[0];
  const cfg = typeConfig[primary.type];
  const Icon = cfg.icon;

  return (
    <div
      role="alert"
      className={cn(
        "guardrail-alert relative overflow-hidden rounded-lg border p-3",
        cfg.border,
        cfg.bg,
        cfg.glow,
        pulse && "animate-[guardrail-shake_0.5s_ease-in-out]",
        className
      )}
    >
      <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent,transparent_8px,rgba(244,63,94,0.03)_8px,rgba(244,63,94,0.03)_16px)]" />

      <div className="relative flex gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-current/30 bg-white">
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-3.5 w-3.5 text-destructive" />
              <p className="text-xs font-bold uppercase tracking-wider">
                Guardrail blocked · {cfg.label}
              </p>
            </div>
            {onDismiss && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 shrink-0"
                onClick={onDismiss}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>

          <p className="mt-1 text-sm font-medium">{primary.label}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{primary.detail}</p>
          <p className="mt-2 font-mono text-[10px] text-destructive/90 truncate">
            Match: &quot;{primary.match}&quot;
          </p>

          {hits.length > 1 && (
            <p className="mt-2 text-[10px] text-muted-foreground">
              +{hits.length - 1} additional violation{hits.length > 2 ? "s" : ""}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
