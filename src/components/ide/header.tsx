"use client";

import {
  Search,
  Bell,
  GitBranch,
  Play,
  Command,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Header() {
  return (
    <header className="glass-strong flex h-14 shrink-0 items-center gap-3 border-b border-border px-4 lg:px-6">
      <div className="flex items-center gap-2 lg:hidden">
        <span className="text-lg font-bold tracking-wider text-primary neon-text-cyan">
          NEXUS
        </span>
      </div>

      <div className="relative hidden flex-1 max-w-md sm:block">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search policies, models, audits..."
          className="h-9 pl-9 bg-muted border-border"
        />
        <kbd className="absolute right-2 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded border border-border bg-muted/50 px-1.5 py-0.5 text-[10px] text-muted-foreground md:flex">
          <Command className="h-2.5 w-2.5" />K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Badge variant="success" className="hidden sm:inline-flex">
          All systems nominal
        </Badge>

        <div className="hidden items-center gap-1 text-xs text-muted-foreground md:flex">
          <GitBranch className="h-3.5 w-3.5 text-primary" />
          <span>main</span>
          <span className="text-primary/50">/</span>
          <span>prod-governance</span>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive neon-glow-magenta" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>3 governance alerts</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button size="sm" className="hidden sm:inline-flex gap-1.5">
          <Play className="h-3.5 w-3.5" />
          Run Scan
        </Button>

        <Avatar className="h-8 w-8">
          <AvatarFallback>AG</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
