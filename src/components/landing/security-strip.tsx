import { Fingerprint, KeyRound, Server, Eye } from "lucide-react";
import { trustBadges, stats } from "@/lib/landing-data";
import { Badge } from "@/components/ui/badge";

const pillars = [
  {
    icon: Fingerprint,
    title: "Identity & Access",
    text: "SSO, SCIM, and granular RBAC with just-in-time elevation.",
  },
  {
    icon: KeyRound,
    title: "Encryption",
    text: "AES-256 at rest, TLS 1.3 in transit, BYOK and HSM support.",
  },
  {
    icon: Server,
    title: "Deployment",
    text: "SaaS, VPC, on-prem, and fully air-gapped environments.",
  },
  {
    icon: Eye,
    title: "Observability",
    text: "Immutable audit trails with SIEM export and real-time alerting.",
  },
];

export function SecurityStrip() {
  return (
    <section id="security" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="glass-strong overflow-hidden rounded-2xl border border-primary/15">
          <div className="border-b border-border bg-gradient-to-r from-primary/5 via-transparent to-neon-magenta/5 px-6 py-8 sm:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neon-magenta">
              Enterprise cybersecurity
            </p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Certified. Audited. Battle-tested.
            </h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {trustBadges.map((badge) => (
                <Badge
                  key={badge}
                  variant="outline"
                  className="border-primary/25 bg-white px-3 py-1 text-xs"
                >
                  {badge}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid gap-px bg-primary/10 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="bg-muted p-6 backdrop-blur-sm sm:p-8"
              >
                <p.icon className="mb-3 h-6 w-6 text-primary" />
                <h3 className="font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-px border-t border-border bg-primary/10 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-background/80 px-6 py-8 text-center backdrop-blur-sm"
              >
                <p className="text-2xl font-bold text-primary neon-text-cyan sm:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
