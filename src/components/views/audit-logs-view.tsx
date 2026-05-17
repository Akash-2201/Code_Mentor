"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/providers/toast-provider";
import { ScrollText, Download, User, Bot, Shield, Wrench, FileCode2, AlertTriangle } from "lucide-react";

type AuditEvent = {
  id: string;
  timestamp: string;
  actor: string;
  actorType: "user" | "system" | "ai";
  action: string;
  target: string;
  severity: "info" | "warning" | "critical";
};

const auditEvents: AuditEvent[] = [
  {
    id: "a-001",
    timestamp: "2026-05-17 19:02:14",
    actor: "Akash J.",
    actorType: "user",
    action: "Code Mentor AI Scan initiated",
    target: "auth-service.ts",
    severity: "info",
  },
  {
    id: "a-002",
    timestamp: "2026-05-17 19:03:47",
    actor: "Gemini 2.5 Flash",
    actorType: "ai",
    action: "Detected 3 critical vulnerabilities",
    target: "auth-service.ts",
    severity: "critical",
  },
  {
    id: "a-003",
    timestamp: "2026-05-17 19:04:12",
    actor: "Akash J.",
    actorType: "user",
    action: "Patch applied to auth-service.ts",
    target: "auth-service.ts → v-001 Hardcoded API Key",
    severity: "info",
  },
  {
    id: "a-004",
    timestamp: "2026-05-17 18:55:00",
    actor: "Policy Engine",
    actorType: "system",
    action: "Blocked PII extraction attempt",
    target: "customer-support-bot",
    severity: "warning",
  },
  {
    id: "a-005",
    timestamp: "2026-05-17 18:41:33",
    actor: "Akash J.",
    actorType: "user",
    action: "Updated HIPAA compliance policy",
    target: "governance-policy.yaml",
    severity: "info",
  },
  {
    id: "a-006",
    timestamp: "2026-05-17 18:30:00",
    actor: "Drift Monitor",
    actorType: "system",
    action: "Flagged embedding drift (+0.067)",
    target: "retrieval-index-prod",
    severity: "warning",
  },
  {
    id: "a-007",
    timestamp: "2026-05-17 18:12:00",
    actor: "Gemini 2.5 Pro",
    actorType: "ai",
    action: "Scanned query-engine.ts — SQL injection found",
    target: "query-engine.ts",
    severity: "critical",
  },
  {
    id: "a-008",
    timestamp: "2026-05-17 17:59:00",
    actor: "Compliance Bot",
    actorType: "system",
    action: "Exported SOC2 evidence pack",
    target: "audit-q2-2026",
    severity: "info",
  },
];

const actorIcons = {
  user: User,
  system: Shield,
  ai: Bot,
};

const severityBadge = {
  info: "text-blue-400 bg-blue-500/10 border-blue-500/30",
  warning: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  critical: "text-red-400 bg-red-500/10 border-red-500/30",
};

export function AuditLogsView() {
  const { toast } = useToast();

  return (
    <ScrollArea className="h-full">
      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ScrollText className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold">Audit Logs</h2>
            <Badge variant="outline" className="text-[10px]">
              {auditEvents?.length || 0} events
            </Badge>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => toast("Audit log exported as CSV!", "success")}
          >
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
        </div>

        {/* Table */}
        <Card className="border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-muted text-muted-foreground">
                  <th className="px-3 py-2.5 text-left font-semibold uppercase text-[10px] tracking-wider">Timestamp</th>
                  <th className="px-3 py-2.5 text-left font-semibold uppercase text-[10px] tracking-wider">Actor</th>
                  <th className="px-3 py-2.5 text-left font-semibold uppercase text-[10px] tracking-wider">Action</th>
                  <th className="px-3 py-2.5 text-left font-semibold uppercase text-[10px] tracking-wider">Target</th>
                  <th className="px-3 py-2.5 text-left font-semibold uppercase text-[10px] tracking-wider">Level</th>
                </tr>
              </thead>
              <tbody>
                {auditEvents.map((e) => {
                  const ActorIcon = actorIcons[e?.actorType] || User;
                  return (
                    <tr key={e?.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                      <td className="px-3 py-2.5 font-mono text-muted-foreground whitespace-nowrap">
                        {e?.timestamp || "N/A"}
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-1.5">
                          <ActorIcon className="h-3 w-3 text-primary shrink-0" />
                          <span className="whitespace-nowrap">{e?.actor || "N/A"}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 text-foreground font-medium">{e?.action || "N/A"}</td>
                      <td className="px-3 py-2.5 font-mono text-muted-foreground">{e?.target || "N/A"}</td>
                      <td className="px-3 py-2.5">
                        <Badge variant="outline" className={`text-[8px] uppercase ${severityBadge[e?.severity] || severityBadge.info}`}>
                          {e?.severity || "INFO"}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </ScrollArea>
  );
}
