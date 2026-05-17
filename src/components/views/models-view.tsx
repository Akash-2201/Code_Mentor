"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, Shield, Activity, Cpu, CheckCircle2, AlertTriangle } from "lucide-react";

const models = [
  {
    name: "Gemini 2.5 Pro",
    provider: "Google Cloud",
    status: "active" as const,
    risk: 12,
    drift: 0.021,
    calls: "14.2k",
    lastAudit: "2h ago",
    compliance: ["SOC2", "ISO-27001"],
  },
  {
    name: "Gemini 2.5 Flash",
    provider: "Google Cloud",
    status: "active" as const,
    risk: 8,
    drift: 0.012,
    calls: "31.7k",
    lastAudit: "1h ago",
    compliance: ["SOC2", "EU-AI-Act"],
  },
  {
    name: "GPT Enterprise v4",
    provider: "OpenAI",
    status: "restricted" as const,
    risk: 34,
    drift: 0.067,
    calls: "2.1k",
    lastAudit: "6h ago",
    compliance: ["SOC2"],
  },
  {
    name: "Claude Governance",
    provider: "Anthropic",
    status: "pending" as const,
    risk: 19,
    drift: 0.033,
    calls: "0",
    lastAudit: "Never",
    compliance: [],
  },
];

const statusConfig = {
  active: { label: "Active", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30", icon: CheckCircle2 },
  restricted: { label: "Restricted", color: "text-amber-400 bg-amber-500/10 border-amber-500/30", icon: AlertTriangle },
  pending: { label: "Pending", color: "text-muted-foreground bg-muted border-border", icon: Activity },
};

export function ModelsView() {
  return (
    <ScrollArea className="h-full">
      <div className="space-y-4 p-4">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-bold">Model Registry</h2>
          <Badge variant="outline" className="text-[10px]">
            {models.length} registered
          </Badge>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {models.map((m) => {
            const cfg = statusConfig[m?.status] ?? statusConfig.pending;
            const StatusIcon = cfg.icon;
            return (
              <Card key={m?.name} className="border-border metric-card-glow">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-sm">{m?.name || "Unknown"}</p>
                      <p className="text-[10px] text-muted-foreground">{m?.provider || "N/A"}</p>
                    </div>
                    <Badge className={`text-[9px] ${cfg.color}`}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {cfg.label}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-lg font-bold tabular-nums">{m?.risk ?? 0}%</p>
                      <p className="text-[9px] text-muted-foreground">Risk Score</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold tabular-nums">{m?.drift ?? 0}</p>
                      <p className="text-[9px] text-muted-foreground">Drift Δ</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold tabular-nums">{m?.calls || "0"}</p>
                      <p className="text-[9px] text-muted-foreground">24h Calls</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-[10px] mb-1">
                      <span className="text-muted-foreground">Risk</span>
                      <span className="text-muted-foreground">{m?.risk ?? 0}%</span>
                    </div>
                    <Progress
                      value={m?.risk ?? 0}
                      className="h-1"
                      indicatorClassName={
                        (m?.risk ?? 0) > 30 ? "bg-amber-500" : "bg-emerald-500"
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {(m?.compliance || []).map((c) => (
                        <Badge key={c} variant="outline" className="text-[8px] px-1">
                          <Shield className="h-2 w-2 mr-0.5" />
                          {c}
                        </Badge>
                      ))}
                    </div>
                    <span className="text-[9px] text-muted-foreground">
                      Audited {m?.lastAudit || "Never"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </ScrollArea>
  );
}
