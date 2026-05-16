"use client";

import { useState } from "react";
import { vulnerabilities, severityColor, type Vulnerability } from "@/lib/workspace-data";
import { ExplainabilityCard } from "@/components/security/explainability-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Shield,
  ChevronDown,
  ChevronRight,
  Wrench,
  GitPullRequest,
  AlertTriangle,
} from "lucide-react";

export function ReviewerPanel() {
  const [selected, setSelected] = useState<Vulnerability>(vulnerabilities[0]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    [vulnerabilities[0].id]: true,
  });

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="flex shrink-0 items-center justify-between border-b border-border px-3 py-2">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider">
            AI Reviewer
          </span>
        </div>
        <Badge variant="destructive" className="text-[9px]">
          {vulnerabilities.length} findings
        </Badge>
      </header>

      <ScrollArea className="flex-1 min-h-0">
        <div className="space-y-2 p-2">
          {vulnerabilities.map((v) => {
            const isOpen = expanded[v.id];
            const isSelected = selected.id === v.id;
            return (
              <div
                key={v.id}
                className={cn(
                  "rounded-lg border transition-colors",
                  isSelected ? "border-primary/30 bg-primary/5" : "border-border"
                )}
              >
                <button
                  type="button"
                  className="flex w-full items-start gap-2 p-2.5 text-left"
                  onClick={() => {
                    setSelected(v);
                    setExpanded((e) => ({ ...e, [v.id]: !e[v.id] }));
                  }}
                >
                  {isOpen ? (
                    <ChevronDown className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Badge
                        className={cn("text-[9px] uppercase", severityColor(v.severity))}
                      >
                        {v.severity}
                      </Badge>
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {v.file}:{v.line}
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-medium leading-snug">{v.title}</p>
                  </div>
                </button>

                {isOpen && (
                  <div className="space-y-2 border-t border-border px-2.5 pb-2.5 pt-2">
                    <div className="flex gap-2 rounded-md border border-amber-500/20 bg-amber-500/5 p-2">
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-amber-400 mt-0.5" />
                      <p className="text-[11px] leading-relaxed text-muted-foreground">
                        {v.remediation}
                      </p>
                    </div>

                    <div className="rounded-md border border-border bg-muted p-2">
                      <p className="mb-1 text-[9px] font-semibold uppercase text-primary">
                        Suggested patch
                      </p>
                      <pre className="overflow-x-auto font-mono text-[10px] text-emerald-700 whitespace-pre-wrap">
                        {v.patch}
                      </pre>
                    </div>

                    <div className="flex gap-1.5">
                      <Button variant="outline" size="sm" className="h-7 flex-1 text-[10px] gap-1">
                        <Wrench className="h-3 w-3" />
                        Apply fix
                      </Button>
                      <Button size="sm" className="h-7 flex-1 text-[10px] gap-1">
                        <GitPullRequest className="h-3 w-3" />
                        Open PR
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <div className="shrink-0 border-t border-border p-2">
        <ExplainabilityCard vulnerability={selected} />
      </div>
    </div>
  );
}
