"use client";

import { useState } from "react";
import { useToast } from "@/components/providers/toast-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Settings, Shield, Bell, Eye, Database, Loader2 } from "lucide-react";

type ToggleSetting = {
  id: string;
  label: string;
  description: string;
  icon: typeof Shield;
  enabled: boolean;
};

const initialSettings: ToggleSetting[] = [
  {
    id: "pii",
    label: "PII Detection",
    description: "Automatically block prompts and outputs containing PII like emails, SSNs, and phone numbers.",
    icon: Eye,
    enabled: true,
  },
  {
    id: "injection",
    label: "Injection Guard",
    description: "Detect and block prompt injection attacks like 'ignore previous instructions'.",
    icon: Shield,
    enabled: true,
  },
  {
    id: "alerts",
    label: "Real-time Alerts",
    description: "Send governance alerts to Slack, PagerDuty, or email when violations occur.",
    icon: Bell,
    enabled: false,
  },
  {
    id: "audit",
    label: "Verbose Audit Logging",
    description: "Log all model interactions, policy decisions, and compliance events.",
    icon: Database,
    enabled: true,
  },
];

export function SettingsView() {
  const { toast } = useToast();
  const [settings, setSettings] = useState(initialSettings);
  const [isSaving, setIsSaving] = useState(false);

  const toggle = (id: string) => {
    setSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast("Settings saved successfully!", "success");
    }, 1500);
  };

  return (
    <ScrollArea className="h-full">
      <div className="space-y-4 p-4 max-w-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold">Governance Settings</h2>
          </div>
          <Button size="sm" onClick={handleSave} disabled={isSaving} className="gap-1.5">
            {isSaving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <div className="space-y-3">
          {settings.map((s) => {
            const Icon = s?.icon || Shield;
            return (
              <Card key={s?.id} className="border-border">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/5">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">{s?.label || "Setting"}</p>
                      <Badge
                        variant="outline"
                        className={`text-[9px] ${
                          s?.enabled
                            ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
                            : "text-muted-foreground"
                        }`}
                      >
                        {s?.enabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                      {s?.description || ""}
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={s?.enabled}
                    onClick={() => toggle(s?.id)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                      s?.enabled ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform ${
                        s?.enabled ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <p className="text-sm font-semibold text-primary">Environment</p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-muted-foreground">Project:</span>
                <span className="ml-2 font-mono">code-mentor-496518</span>
              </div>
              <div>
                <span className="text-muted-foreground">Region:</span>
                <span className="ml-2 font-mono">us-central1</span>
              </div>
              <div>
                <span className="text-muted-foreground">Model:</span>
                <span className="ml-2 font-mono">gemini-2.5-pro</span>
              </div>
              <div>
                <span className="text-muted-foreground">Auth:</span>
                <span className="ml-2 font-mono">Service Account</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
