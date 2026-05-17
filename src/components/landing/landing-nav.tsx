"use client";

import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { ShieldCheck, ArrowRight, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { navLinks } from "@/lib/landing-data";

export function LandingNav() {
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border bg-[#0f172a]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-lg shadow-cyan-500/30 transition-shadow group-hover:shadow-cyan-500/50">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <span className="font-[var(--font-inter)] text-lg font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Code Mentor
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {session?.user ? (
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                {session.user.image && <AvatarImage src={session.user.image} alt={session.user.name || "User"} />}
                <AvatarFallback className="text-[10px]">
                  {session.user.name?.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <Button size="sm" className="gap-1.5" asChild>
                <Link href="/ide">
                  Open IDE
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:inline-flex gap-1.5"
                onClick={() => signIn("google")}
              >
                <LogIn className="h-3.5 w-3.5" />
                Sign in
              </Button>
              <Button size="sm" className="gap-1.5" asChild>
                <Link href="/ide">
                  Launch IDE
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
