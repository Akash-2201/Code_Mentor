import Link from "next/link";
import { Shield } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="border-t border-border px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <Shield className="h-4 w-4 text-primary" />
          <span className="font-bold tracking-widest text-foreground">NEXUS</span>
        </Link>
        <p className="text-center text-xs text-muted-foreground">
          © 2026 NEXUS AI Governance. Built for defenders of the intelligent enterprise.
        </p>
        <div className="flex gap-6 text-xs text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Security
          </a>
          <Link href="/ide" className="hover:text-primary transition-colors">
            IDE
          </Link>
        </div>
      </div>
    </footer>
  );
}
