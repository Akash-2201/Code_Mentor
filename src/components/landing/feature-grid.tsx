import {
  Shield,
  Radar,
  Activity,
  FileCheck,
  Bot,
  Lock,
  type LucideIcon,
} from "lucide-react";
import { features } from "@/lib/landing-data";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Shield,
  Radar,
  Activity,
  FileCheck,
  Bot,
  Lock,
};

const accentStyles = {
  cyan: {
    icon: "text-primary bg-primary/15 border-primary/30",
    glow: "group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]",
  },
  magenta: {
    icon: "text-neon-magenta bg-neon-magenta/15 border-neon-magenta/30",
    glow: "group-hover:shadow-[0_0_30px_rgba(236,72,153,0.2)]",
  },
  purple: {
    icon: "text-neon-purple bg-neon-purple/15 border-neon-purple/30",
    glow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]",
  },
};

export function FeatureGrid() {
  return (
    <section id="features" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Platform capabilities
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Built for <span className="text-gradient-hero">security-first</span> teams
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Every layer of your AI stack — from prompts to production — governed,
            audited, and defended in one unified control plane.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon] ?? Shield;
            const accent = accentStyles[feature.accent];
            return (
              <article
                key={feature.title}
                className={cn(
                  "group glass feature-card-glow rounded-xl p-6",
                  accent.glow
                )}
              >
                <div
                  className={cn(
                    "mb-4 flex h-11 w-11 items-center justify-center rounded-lg border",
                    accent.icon
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
