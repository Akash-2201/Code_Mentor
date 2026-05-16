import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section id="enterprise" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-neon-purple/15 to-neon-magenta/20" />
          <div className="absolute inset-0 backdrop-blur-3xl" />
          <div className="glass-strong relative border border-primary/25 px-8 py-12 text-center sm:px-16 sm:py-16">
            <Building2 className="mx-auto h-10 w-10 text-primary" />
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              Ready to govern AI at enterprise scale?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Join security teams at Fortune 500 companies using NEXUS to ship AI
              faster — without sacrificing compliance or control.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <Button size="lg" className="h-12 gap-2 px-8" asChild>
                <Link href="/ide">
                  Start free in IDE
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="neon" size="lg" className="h-12 px-8">
                Contact sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
