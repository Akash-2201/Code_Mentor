"use client";

import {
  Search,
  Bell,
  GitBranch,
  Play,
  Command,
  Activity,
  PanelRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type TopNavbarProps = {
  rightPanelOpen: boolean;
  onToggleRightPanel: () => void;
};

export function TopNavbar({ rightPanelOpen, onToggleRightPanel }: TopNavbarProps) {
  return (
    <header className="glass-strong flex h-11 shrink-0 items-center gap-2 border-b border-border px-3">
      <div className="relative hidden min-w-0 flex-1 max-w-sm md:block">
        <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search policies, logs, CVEs..."
          className="h-8 border-primary/15 bg-muted pl-8 text-xs"
        />
        <kbd className="absolute right-2 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded border border-border px-1 py-0.5 text-[9px] text-muted-foreground lg:flex">
          <Command className="h-2.5 w-2.5" />K
        </kbd>
      </div>

      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
        <GitBranch className="h-3 w-3 text-primary" />
        <span className="hidden sm:inline">main</span>
        <span className="text-primary/40">/</span>
        <span className="hidden sm:inline text-foreground/80">prod-sec</span>
      </div>

      <Badge variant="success" className="hidden h-5 text-[9px] sm:inline-flex">
        <Activity className="mr-1 h-3 w-3" />
        Healthy
      </Badge>

      <div className="ml-auto flex items-center gap-1">
        <Button variant="ghost" size="icon" className="relative h-8 w-8">
          <Bell className="h-3.5 w-3.5" />
          <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-destructive" />
        </Button>

        <Button
          variant={rightPanelOpen ? "secondary" : "ghost"}
          size="icon"
          className="h-8 w-8"
          onClick={onToggleRightPanel}
          aria-label="Toggle security panel"
        >
          <PanelRight className="h-3.5 w-3.5" />
        </Button>

        <Button size="sm" className="hidden h-8 gap-1 text-xs sm:inline-flex">
          <Play className="h-3 w-3" />
          Scan
        </Button>

        <Avatar className="h-7 w-7">
          <AvatarFallback className="text-[10px]">SEC</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
