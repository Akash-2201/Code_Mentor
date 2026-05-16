"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { workspaceNav, editorFiles } from "@/lib/workspace-data";
import { WorkspaceIcon } from "@/components/workspace/workspace-icon-map";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronLeft, ChevronRight, Shield, File } from "lucide-react";

type CollapsibleSidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
  activeNav: string;
  onNavChange: (id: string) => void;
  activeFileId: string;
  onFileSelect: (id: string) => void;
};

export function CollapsibleSidebar({
  collapsed,
  onToggle,
  activeNav,
  onNavChange,
  activeFileId,
  onFileSelect,
}: CollapsibleSidebarProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "glass-strong flex h-full shrink-0 flex-col border-r border-border transition-[width] duration-300 ease-out",
          collapsed ? "w-[52px]" : "w-56 xl:w-60"
        )}
      >
        <div className="flex h-12 items-center justify-between border-b border-border px-2">
          {!collapsed && (
            <Link href="/" className="flex min-w-0 items-center gap-2 px-1">
              <Shield className="h-5 w-5 shrink-0 text-primary" />
              <span className="truncate text-xs font-bold tracking-widest text-primary">
                NEXUS
              </span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={onToggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        <nav className="space-y-0.5 p-1.5">
          {workspaceNav.map((item) => {
            const active = activeNav === item.id;
            const btn = (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavChange(item.id)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-all",
                  active
                    ? "bg-primary/15 text-primary border border-primary/25"
                    : "text-muted-foreground hover:bg-primary/5 hover:text-foreground",
                  collapsed && "justify-center px-2"
                )}
              >
                <WorkspaceIcon
                  name={item.icon}
                  className={cn("h-4 w-4 shrink-0", active && "text-primary")}
                />
                {!collapsed && (
                  <>
                    <span className="flex-1 truncate text-left text-xs">
                      {item.label}
                    </span>
                    {item.badge && (
                      <Badge variant="outline" className="h-4 px-1 text-[9px]">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </button>
            );

            if (collapsed) {
              return (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>{btn}</TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              );
            }
            return btn;
          })}
        </nav>

        {!collapsed && (
          <div className="mt-2 flex min-h-0 flex-1 flex-col border-t border-border">
            <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Explorer
            </p>
            <div className="custom-scrollbar flex-1 space-y-0.5 overflow-y-auto px-1.5 pb-2">
              {editorFiles.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => onFileSelect(f.id)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left font-mono text-[11px] transition-colors",
                    activeFileId === f.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/50"
                  )}
                >
                  <File className="h-3 w-3 shrink-0" />
                  <span className="truncate">{f.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {!collapsed && (
          <div className="border-t border-border p-2">
            <div className="rounded-md border border-primary/15 bg-primary/5 px-2 py-2">
              <p className="text-[10px] text-primary font-medium">Threat level</p>
              <p className="text-xs text-muted-foreground">LOW · 3 findings</p>
            </div>
          </div>
        )}
      </aside>
    </TooltipProvider>
  );
}
