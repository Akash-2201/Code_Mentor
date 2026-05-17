"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/providers/toast-provider";
import { Bell, AlertTriangle, ShieldAlert, Key, Database, CheckCircle2, Clock } from "lucide-react";

type Alert = {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "warning" | "info";
  source: string;
  time: string;
  acknowledged: boolean;
};

const alerts: Alert[] = [
  {
    id: "al-001",
    title: "Critical Hardcoded Key Found",
    description: "Hardcoded API key 'sk-12345-secret-key' detected in auth-service.ts line 4. Immediate rotation required.",
    severity: "critical",
    source: "Credential Scanner",
    time: "2 min ago",
    acknowledged: false,
  },
  {
    id: "al-002",
    title: "SQL Injection Vulnerability Detected",
    description: "Raw SQL concatenation found in query-engine.ts:getUserById(). CWE-89 — use parameterized queries.",
    severity: "critical",
    source: "Code Analyzer",
    time: "5 min ago",
    acknowledged: false,
  },
  {
    id: "al-003",
    title: "Unencrypted Secrets in Config",
    description: "env-config.yaml contains 3 plaintext credentials (api_key, stripe_key, jwt_secret).",
    severity: "critical",
    source: "Secret Scanner",
    time: "8 min ago",
    acknowledged: false,
  },
  {
    id: "al-004",
    title: "PII Detected in Model Output",
    description: "customer-support-bot returned an email address in response. Output PII filter triggered.",
    severity: "warning",
    source: "PII Monitor",
    time: "14 min ago",
    acknowledged: true,
  },
  {
    id: "al-005",
    title: "Token Budget Exceeded",
    description: "Agent swarm-7 consumed 145,000 tokens in the last hour, exceeding the 120,000 limit.",
    severity: "warning",
    source: "Rate Limiter",
    time: "22 min ago",
    acknowledged: true,
  },
  {
    id: "al-006",
    title: "Model Drift Detected",
    description: "Embedding shift of +0.067 detected on retrieval-index-prod. Performance degradation possible.",
    severity: "warning",
    source: "Drift Monitor",
    time: "38 min ago",
    acknowledged: true,
  },
  {
    id: "al-007",
    title: "SOC2 Evidence Pack Exported",
    description: "Quarterly compliance evidence pack audit-q2-2026 was successfully generated and exported.",
    severity: "info",
    source: "Compliance Bot",
    time: "1h ago",
    acknowledged: true,
  },
];

const severityConfig = {
  critical: { icon: ShieldAlert, color: "text-red-400", border: "border-red-500/30 bg-red-500/5", badge: "text-red-400 bg-red-500/10 border-red-500/30" },
  warning: { icon: AlertTriangle, color: "text-amber-400", border: "border-amber-500/30 bg-amber-500/5", badge: "text-amber-400 bg-amber-500/10 border-amber-500/30" },
  info: { icon: CheckCircle2, color: "text-blue-400", border: "border-blue-500/30 bg-blue-500/5", badge: "text-blue-400 bg-blue-500/10 border-blue-500/30" },
};

export function AlertsView() {
  const { toast } = useToast();
  const unacked = alerts?.filter((a) => !a?.acknowledged)?.length || 0;

  return (
    <ScrollArea className="h-full">
      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold">Security Alerts</h2>
            {unacked > 0 && (
              <Badge variant="destructive" className="text-[10px]">
                {unacked} unacknowledged
              </Badge>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => toast("All alerts marked as read!", "success")}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Mark all read
          </Button>
        </div>

        <div className="space-y-2">
          {alerts.map((a) => {
            const cfg = severityConfig[a?.severity] || severityConfig.info;
            const AlertIcon = cfg.icon;
            return (
              <Card
                key={a?.id}
                className={`border ${!a?.acknowledged ? cfg.border : "border-border"} transition-all`}
              >
                <CardContent className="flex gap-3 p-3">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${cfg.badge}`}>
                    <AlertIcon className={`h-4 w-4 ${cfg.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold">{a?.title || "Alert"}</p>
                      <Badge variant="outline" className={`text-[8px] uppercase ${cfg.badge}`}>
                        {a?.severity || "INFO"}
                      </Badge>
                      {!a?.acknowledged && (
                        <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                      {a?.description || ""}
                    </p>
                    <div className="mt-1.5 flex items-center gap-3 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-2.5 w-2.5" />
                        {a?.time || "N/A"}
                      </span>
                      <span>Source: {a?.source || "N/A"}</span>
                    </div>
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
