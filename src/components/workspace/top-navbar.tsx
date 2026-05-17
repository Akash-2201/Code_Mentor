"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useToast } from "@/components/providers/toast-provider";
import { useTheme } from "@/components/providers/theme-provider";
import {
  Search,
  Bell,
  GitBranch,
  Play,
  Command,
  Activity,
  PanelRight,
  LogOut,
  LogIn,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type TopNavbarProps = {
  rightPanelOpen: boolean;
  onToggleRightPanel: () => void;
};

export function TopNavbar({ rightPanelOpen, onToggleRightPanel }: TopNavbarProps) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const { theme, toggle: toggleTheme } = useTheme();

  const initials = session?.user?.name
    ?.split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "SEC";

  return (
    <header className="glass-strong flex h-11 shrink-0 items-center gap-2 border-b border-border px-3">
      <div className="relative hidden min-w-0 flex-1 max-w-sm md:block">
        <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search policies, logs, CVEs..."
          className="h-8 border-primary/15 bg-muted pl-8 text-xs"
          onFocus={() => toast("Search coming in v2.0!", "info")}
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
        {/* Theme toggle — Sun/Moon */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? (
            <Sun className="h-3.5 w-3.5 text-amber-400" />
          ) : (
            <Moon className="h-3.5 w-3.5 text-primary" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="relative h-8 w-8"
          onClick={() => toast("3 governance alerts · Inbox coming in v2.0", "warning")}
        >
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

        <Button
          size="sm"
          className="hidden h-8 gap-1 text-xs sm:inline-flex"
          onClick={() => toast("Governance scan triggered! Check AI Reviewer panel →", "success")}
        >
          <Play className="h-3 w-3" />
          Scan
        </Button>

        {/* Auth section */}
        {session?.user ? (
          <div className="flex items-center gap-1">
            <Avatar className="h-7 w-7 cursor-pointer" onClick={() => toast(`Signed in as ${session.user?.name || "User"}`, "info")}>
              {session.user.image && <AvatarImage src={session.user.image} alt={session.user.name || "User"} />}
              <AvatarFallback className="text-[10px]">{initials}</AvatarFallback>
            </Avatar>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => signOut()}
              aria-label="Sign out"
            >
              <LogOut className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="h-7 gap-1.5 text-[10px] border-primary/30"
            onClick={() => signIn("google")}
          >
            <LogIn className="h-3 w-3" />
            Sign in
          </Button>
        )}
      </div>
    </header>
  );
}
