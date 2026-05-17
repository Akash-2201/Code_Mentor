"use client";

import { useState } from "react";
import { useToast } from "@/components/providers/toast-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, Eye, Lock, FileCode2, ToggleRight, Plus, CheckCircle2 } from "lucide-react";

type Policy = {
  id: string;
  name: string;
  description: string;
  category: string;
  status: "active" | "draft" | "disabled";
  enforcement: "block" | "warn" | "log";
  icon: typeof Shield;
};

const policies: Policy[] = [
  {
    id: "p-001",
    name: "Block PII Extraction",
    description: "Prevents models from outputting personally identifiable information including emails, SSNs, phone numbers, and physical addresses.",
    category: "Privacy",
    status: "active",
    enforcement: "block",
    icon: Eye,
  },
  {
    id: "p-002",
    name: "Force HIPAA Compliance",
    description: "Enforces Health Insurance Portability and Accountability Act rules on all medical data processed by AI models.",
    category: "Compliance",
    status: "active",
    enforcement: "block",
    icon: Shield,
  },
  {
    id: "p-003",
    name: "Prompt Injection Guard",
    description: "Detects and blocks prompt injection attacks including 'ignore previous instructions', jailbreak attempts, and role manipulation.",
    category: "Security",
    status: "active",
    enforcement: "block",
    icon: Lock,
  },
  {
    id: "p-004",
    name: "Credential Leak Prevention",
    description: "Scans all inputs and outputs for API keys, database passwords, JWT secrets, and other hardcoded credentials.",
    category: "Security",
    status: "active",
    enforcement: "block",
    icon: Lock,
  },
  {
    id: "p-005",
    name: "EU AI Act Transparency",
    description: "Ensures all AI-generated content is properly labeled and model decision audit trails are maintained per EU AI Act requirements.",
    category: "Compliance",
    status: "draft",
    enforcement: "warn",
    icon: FileCode2,
  },
  {
    id: "p-006",
    name: "Output Toxicity Filter",
    description: "Monitors model outputs for toxic, harmful, or biased content with a configurable threshold score.",
    category: "Safety",
    status: "active",
    enforcement: "warn",
    icon: Shield,
  },
];

const statusColors = {
  active: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  draft: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  disabled: "text-muted-foreground bg-muted border-border",
};

const enforcementColors = {
  block: "text-red-400 bg-red-500/10 border-red-500/30",
  warn: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  log: "text-blue-400 bg-blue-500/10 border-blue-500/30",
};

export function PoliciesView() {
  const { toast } = useToast();
  const [items, setItems] = useState(policies);

  const toggleStatus = (id: string) => {
    setItems((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: (p.status === "active" ? "disabled" : "active") as any }
          : p
      )
    );
    toast("Policy status updated!", "success");
  };

  return (
    <ScrollArea className="h-full">
      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCode2 className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold">AI Governance Policies</h2>
            <Badge variant="outline" className="text-[10px]">
              {items?.filter((p) => p?.status === "active")?.length || 0} active
            </Badge>
          </div>
          <Button size="sm" className="gap-1.5" onClick={() => toast("Policy creator launching in v2.0!", "info")}>
            <Plus className="h-3.5 w-3.5" />
            New Policy
          </Button>
        </div>

        <div className="space-y-3">
          {items.map((p) => {
            const Icon = p?.icon || Shield;
            return (
              <Card key={p?.id} className="border-border">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/5">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold">{p?.name || "Policy"}</p>
                      <Badge variant="outline" className={`text-[8px] ${statusColors[p?.status] || statusColors.disabled}`}>
                        {p?.status === "active" && <CheckCircle2 className="h-2.5 w-2.5 mr-0.5" />}
                        {p?.status?.toUpperCase() || "N/A"}
                      </Badge>
                      <Badge variant="outline" className={`text-[8px] ${enforcementColors[p?.enforcement] || enforcementColors.log}`}>
                        {p?.enforcement?.toUpperCase() || "LOG"}
                      </Badge>
                      <Badge variant="outline" className="text-[8px]">{p?.category || "General"}</Badge>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                      {p?.description || ""}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 h-8 w-8"
                    onClick={() => toggleStatus(p?.id)}
                  >
                    <ToggleRight className={`h-5 w-5 ${p?.status === "active" ? "text-emerald-400" : "text-muted-foreground"}`} />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </ScrollArea>
  );
}
