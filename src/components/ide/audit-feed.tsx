"use client";

import { auditEvents } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity } from "lucide-react";

export function AuditFeed() {
  return (
    <Card className="border-primary/15">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Activity className="h-4 w-4 text-primary" />
          Audit Stream
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 pb-3">
        <ScrollArea className="h-48 px-3">
          <ul className="space-y-3 font-mono text-[11px]">
            {auditEvents.map((e) => (
              <li key={e.id} className="border-l-2 border-primary/30 pl-3">
                <span className="text-primary/70">[{e.timestamp}]</span>
                <p className="mt-0.5 text-foreground/90">
                  <span className="text-neon-purple">{e.actor}</span>
                  {" → "}
                  {e.action}
                </p>
                <p className="text-muted-foreground">{e.target}</p>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
