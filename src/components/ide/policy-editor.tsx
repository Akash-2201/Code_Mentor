"use client";

import { useState } from "react";
import { defaultPolicyCode } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/providers/toast-provider";
import { Save, Wand2, FileCode2, Loader2 } from "lucide-react";

export function PolicyEditor() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const lines = defaultPolicyCode.split("\n");

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast("Policy saved to workspace!", "success");
    }, 1500);
  };

  return (
    <section className="glass flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl">
      <header className="flex shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-2">
        <div className="flex items-center gap-2 min-w-0">
          <FileCode2 className="h-4 w-4 shrink-0 text-primary" />
          <span className="truncate text-sm font-medium">production.yaml</span>
          <Badge variant="secondary" className="hidden sm:inline-flex text-[10px]">
            YAML
          </Badge>
        </div>
        <div className="flex gap-1.5 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => toast("AI Assist analyzing policy rules...", "info")}
          >
            <Wand2 className="h-3.5 w-3.5" />
            AI Assist
          </Button>
          <Button size="sm" onClick={handleSave} disabled={isSaving}>
            {isSaving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </header>

      <pre className="custom-scrollbar flex-1 overflow-auto p-0 font-mono text-xs leading-relaxed sm:text-sm">
        <code className="block">
          {lines.map((line, i) => (
            <span key={i} className="flex hover:bg-primary/5">
              <span className="select-none w-10 shrink-0 border-r border-border px-2 py-0.5 text-right text-muted-foreground/60">
                {i + 1}
              </span>
              <span className="flex-1 px-3 py-0.5 text-foreground/90 whitespace-pre-wrap break-all">
                {highlightYaml(line)}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </section>
  );
}

function highlightYaml(line: string) {
  if (line.startsWith("#"))
    return <span className="text-muted-foreground">{line}</span>;
  if (line.includes(":"))
    return (
      <>
        <span className="text-neon-magenta">{line.split(":")[0]}</span>
        <span className="text-primary">:</span>
        <span className="text-foreground/80">{line.slice(line.indexOf(":") + 1)}</span>
      </>
    );
  return line;
}
