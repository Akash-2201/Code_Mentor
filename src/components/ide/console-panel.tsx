"use client";

import { Terminal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const logs = [
  "[12:41:02] policy-engine: BLOCKED inference — PII-001 triggered",
  "[12:41:01] scanner: Analyzing 2,847 token stream...",
  "[12:40:58] drift-monitor: Embedding cosine delta 0.034 (threshold 0.03)",
  "[12:40:45] compliance: SOC2 evidence pack queued for export",
  "[12:40:12] gateway: Rate limit applied to swarm-7 (RATE-003)",
];

export function ConsolePanel() {
  return (
    <section className="glass-strong flex h-36 shrink-0 flex-col border-t border-border lg:h-40">
      <Tabs defaultValue="console" className="flex h-full flex-col">
        <div className="flex items-center gap-2 border-b border-border px-3">
          <Terminal className="h-3.5 w-3.5 text-primary" />
          <TabsList className="h-9 bg-transparent p-0">
            <TabsTrigger value="console" className="text-xs">
              Console
            </TabsTrigger>
            <TabsTrigger value="problems" className="text-xs">
              Problems
            </TabsTrigger>
            <TabsTrigger value="output" className="text-xs">
              Output
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="console" className="mt-0 flex-1 overflow-hidden">
          <pre className="custom-scrollbar h-full overflow-auto p-3 font-mono text-[11px] leading-relaxed text-emerald-700">
            {logs.map((line, i) => (
              <div key={i}>{line}{"\n"}</div>
            ))}
          </pre>
        </TabsContent>
        <TabsContent value="problems" className="mt-0 p-3 text-xs text-muted-foreground">
          1 critical, 1 warning, 0 info
        </TabsContent>
        <TabsContent value="output" className="mt-0 p-3 font-mono text-[11px] text-muted-foreground">
          Governance scan idle. Press Run Scan to start.
        </TabsContent>
      </Tabs>
    </section>
  );
}
