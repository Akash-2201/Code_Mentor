"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { useToast } from "@/components/providers/toast-provider";

export function LandingFooter() {
  const { toast } = useToast();

  return (
    <footer className="border-t border-border px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-cyan-400">
            <ShieldCheck className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="font-[var(--font-inter)] font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Code Mentor
          </span>
        </Link>
        <p className="text-center text-xs text-muted-foreground">
          © 2026 Code Mentor. Your AI Security Partner. Built for defenders of the intelligent enterprise.
        </p>
        <div className="flex gap-6 text-xs text-muted-foreground">
          <button
            type="button"
            onClick={() => toast("Privacy policy — coming soon!", "info")}
            className="hover:text-primary transition-colors"
          >
            Privacy
          </button>
          <button
            type="button"
            onClick={() => toast("Security documentation — coming soon!", "info")}
            className="hover:text-primary transition-colors"
          >
            Security
          </button>
          <Link href="/ide" className="hover:text-primary transition-colors">
            IDE
          </Link>
        </div>
      </div>
    </footer>
  );
}
