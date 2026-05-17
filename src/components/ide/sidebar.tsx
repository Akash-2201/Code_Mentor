"use client";

import { cn } from "@/lib/utils";
import { navItems } from "@/lib/mock-data";
import { NavIcon } from "@/components/ide/icon-map";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

type SidebarProps = {
  activeId: string;
  onNavigate: (id: string) => void;
  collapsed?: boolean;
};

export function Sidebar({ activeId, onNavigate, collapsed }: SidebarProps) {
  return (
    <aside
      className={cn(
        "glass-strong flex shrink-0 flex-col border-r border-border transition-all",
        collapsed ? "w-16" : "w-56 lg:w-60"
      )}
    >
      <Link
        href="/"
        className="flex h-14 items-center gap-2 border-b border-border px-4 transition-colors hover:bg-primary/5 group"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-lg shadow-cyan-500/30 shrink-0 transition-shadow group-hover:shadow-cyan-500/50">
          <ShieldCheck className="h-4 w-4 text-white" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate font-[var(--font-inter)] text-sm font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Code Mentor
            </p>
            <p className="truncate text-[10px] uppercase text-muted-foreground">
              AI Security IDE
            </p>
          </div>
        )}
      </Link>

      <nav className="flex-1 space-y-0.5 p-2 custom-scrollbar overflow-y-auto">
        {navItems.map((item) => {
          const active = activeId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all",
                active
                  ? "bg-primary/15 text-primary border border-primary/25 neon-glow-cyan"
                  : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
              )}
            >
              <NavIcon
                name={item.icon}
                className={cn("h-4 w-4 shrink-0", active && "text-primary")}
              />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left truncate">{item.label}</span>
                  {item.badge && (
                    <Badge variant={active ? "default" : "outline"} className="text-[10px] px-1.5">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {!collapsed && (
        <>
          <Separator className="bg-primary/10" />
          <div className="p-3 text-[10px] text-muted-foreground leading-relaxed">
            <span className="text-primary font-medium">EU AI Act</span> compliance
            mode active. Last sync 4m ago.
          </div>
        </>
      )}
    </aside>
  );
}
