"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useToast } from "@/components/providers/toast-provider";
import { cn } from "@/lib/utils";
import { workspaceNav, editorFiles, demoFiles } from "@/lib/workspace-data";
import { WorkspaceIcon } from "@/components/workspace/workspace-icon-map";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronLeft, ChevronRight, ShieldCheck, File, LogIn, LogOut, Download, AlertTriangle } from "lucide-react";

type CollapsibleSidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
  activeNav: string;
  onNavChange: (id: string) => void;
  activeFileId: string;
  onFileSelect: (id: string) => void;
};

// All IDs that actually swap the center view — ALL are now active
const activeNavIds = new Set(["dashboard", "workspace", "prompts", "models", "settings", "policies", "audits", "alerts"]);

export function CollapsibleSidebar({
  collapsed,
  onToggle,
  activeNav,
  onNavChange,
  activeFileId,
  onFileSelect,
}: CollapsibleSidebarProps) {
  const { data: session } = useSession();
  const { toast } = useToast();

  const initials = session?.user?.name
    ?.split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "N";

  const handleNavClick = (id: string) => {
    if (activeNavIds.has(id)) {
      onNavChange(id);
    } else {
      toast(`${id} — Feature coming in v2.0!`, "info");
    }
  };

  // TASK 5: Download demo files as a single text bundle
  const handleDownloadDemo = () => {
    const content = demoFiles
      .map((f) => `${"=".repeat(60)}\n// FILE: ${f?.name}\n${"=".repeat(60)}\n${f?.content}\n`)
      .join("\n\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "code-mentor-demo-files.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast("Demo files downloaded!", "success");
  };

  // Separate original and demo files
  const originalFiles = editorFiles.filter((f) => !f.id.startsWith("demo-"));

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
            <Link href="/" className="flex min-w-0 items-center gap-2 px-1 group">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-lg shadow-cyan-500/30 transition-shadow group-hover:shadow-cyan-500/50">
                <ShieldCheck className="h-4 w-4 text-white" />
              </div>
              <span className="truncate font-[var(--font-inter)] text-sm font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Code Mentor
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
                onClick={() => handleNavClick(item.id)}
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
          <div className="mt-2 flex min-h-0 flex-1 flex-col border-t border-border overflow-hidden">
            {/* Original files */}
            <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Explorer
            </p>
            <div className="custom-scrollbar space-y-0.5 overflow-y-auto px-1.5">
              {originalFiles.map((f) => (
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
                  <span className="truncate">{f?.name}</span>
                </button>
              ))}
            </div>

            {/* Demo files */}
            <div className="mt-1 border-t border-border">
              <div className="flex items-center justify-between px-3 py-2">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Demo Files
                </p>
              </div>
              <div className="custom-scrollbar space-y-0.5 overflow-y-auto px-1.5 pb-1">
                {demoFiles.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => onFileSelect(f.id)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left font-mono text-[11px] transition-colors",
                      activeFileId === f.id
                        ? "bg-amber-500/10 text-amber-400"
                        : "text-muted-foreground hover:bg-amber-500/5"
                    )}
                  >
                    <AlertTriangle className="h-3 w-3 shrink-0 text-amber-500/60" />
                    <span className="truncate">{f?.name}</span>
                  </button>
                ))}
              </div>
              <div className="px-1.5 pb-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full h-7 text-[10px] gap-1.5 border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
                  onClick={handleDownloadDemo}
                >
                  <Download className="h-3 w-3" />
                  Download Demo Files
                </Button>
              </div>
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

        {/* Auth section */}
        <div className="border-t border-border p-2">
          {session?.user ? (
            <div className={cn("flex items-center gap-2", collapsed && "justify-center")}>
              <Avatar className="h-7 w-7 shrink-0">
                {session.user.image && <AvatarImage src={session.user.image} alt={session.user.name || "User"} />}
                <AvatarFallback className="text-[9px]">{initials}</AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-medium">{session.user.name || "User"}</p>
                  <p className="truncate text-[9px] text-muted-foreground">{session.user.email || ""}</p>
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 shrink-0"
                onClick={() => signOut()}
              >
                <LogOut className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className={cn("w-full gap-1.5 text-[10px] border-primary/30", collapsed && "px-2")}
              onClick={() => signIn("google")}
            >
              <LogIn className="h-3 w-3 shrink-0" />
              {!collapsed && "Sign in with Google"}
            </Button>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
}
