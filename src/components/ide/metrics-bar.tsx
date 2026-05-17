"use client";

import { governanceMetrics } from "@/lib/mock-data";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

export function MetricsBar() {
  return (
    <section className="grid grid-cols-2 gap-2 p-3 lg:grid-cols-4 lg:gap-3 lg:p-4">
      {governanceMetrics.map((m) => (
        <Card key={m?.label} className="border-border metric-card-glow">
          <CardContent className="p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {m?.label || "N/A"}
            </p>
            <p className="mt-1 text-2xl font-bold tabular-nums text-foreground">
              {m?.value ?? 0}
              <span className="text-sm font-normal text-muted-foreground">%</span>
            </p>
            <Progress
              value={m?.value}
              className="mt-2 h-1"
              indicatorClassName={m?.color}
            />
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
