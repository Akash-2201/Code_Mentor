"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useToast } from "@/components/providers/toast-provider";
import {
  Search,
  Bell,
  GitBranch,
  Play,
  Command,
  LogIn,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Header() {
  const { data: session } = useSession();
  const { toast } = useToast();

  const initials = session?.user?.name
    ?.split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "AG";

  return (
    <header className="glass-strong flex h-14 shrink-0 items-center gap-3 border-b border-border px-4 lg:px-6">
      <div className="flex items-center gap-2 lg:hidden">
        <span className="font-[var(--font-inter)] text-lg font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          Code Mentor
        </span>
      </div>

      <div className="relative hidden flex-1 max-w-md sm:block">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search policies, models, audits..."
          className="h-9 pl-9 bg-muted border-border"
          onFocus={() => toast("Search coming in v2.0!", "info")}
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
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => toast("3 governance alerts · Inbox coming in v2.0", "warning")}
              >
                <Bell className="h-4 w-4" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive neon-glow-magenta" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>3 governance alerts</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button
          size="sm"
          className="hidden sm:inline-flex gap-1.5"
          onClick={() => toast("Governance scan triggered! Check AI Reviewer panel →", "success")}
        >
          <Play className="h-3.5 w-3.5" />
          Run Scan
        </Button>

        {session?.user ? (
          <div className="flex items-center gap-1">
            <Avatar className="h-8 w-8 cursor-pointer" onClick={() => toast(`Signed in as ${session.user?.name || "User"}`, "info")}>
              {session.user.image && <AvatarImage src={session.user.image} alt={session.user.name || "User"} />}
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => signOut()}>
              <LogOut className="h-3.5 w-3.5" />
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 border-primary/30"
            onClick={() => signIn("google")}
          >
            <LogIn className="h-3.5 w-3.5" />
            Sign in
          </Button>
        )}
      </div>
    </header>
  );
}
