"use client";

import { policyViolations } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const severityConfig = {
  critical: { icon: AlertTriangle, variant: "destructive" as const },
  warning: { icon: AlertCircle, variant: "warning" as const },
  info: { icon: Info, variant: "default" as const },
};

export function GovernancePanel() {
  return (
    <Card className="flex min-h-0 flex-col border-neon-magenta/20">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-sm">
          <span>Live Violations</span>
          <Badge variant="destructive">3 active</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="min-h-0 flex-1 p-0 pb-3">
        <ScrollArea className="h-[220px] px-3 lg:h-full lg:max-h-none">
          <ul className="space-y-2">
            {policyViolations.map((v) => {
              const cfg = severityConfig[v.severity];
              const Icon = cfg.icon;
              return (
                <li
                  key={v.id}
                  className={cn(
                    "rounded-lg border p-3 transition-colors hover:bg-primary/5",
                    v.severity === "critical" && "border-destructive/30 bg-destructive/5"
                  )}
                >
                  <div className="flex items-start gap-2">
                    <Icon
                      className={cn(
                        "mt-0.5 h-4 w-4 shrink-0",
                        v.severity === "critical" && "text-destructive",
                        v.severity === "warning" && "text-amber-400",
                        v.severity === "info" && "text-primary"
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={cfg.variant} className="text-[10px]">
                          {v.rule}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">{v.time}</span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-foreground/90">
                        {v.message}
                      </p>
                      <p className="mt-1 text-[10px] text-muted-foreground font-mono">
                        {v.model}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
