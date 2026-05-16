export const features = [
  {
    icon: "Shield",
    title: "Policy Engine",
    description:
      "Declarative YAML guardrails with real-time enforcement across every model endpoint and agent workflow.",
    accent: "cyan",
  },
  {
    icon: "Radar",
    title: "Threat Detection",
    description:
      "Sub-millisecond scanning for PII leakage, prompt injection, and toxic output before it reaches users.",
    accent: "magenta",
  },
  {
    icon: "Activity",
    title: "Drift Monitor",
    description:
      "Continuous embedding and behavior analysis flags model degradation before production impact.",
    accent: "purple",
  },
  {
    icon: "FileCheck",
    title: "Compliance Automation",
    description:
      "One-click evidence packs for SOC 2, ISO 27001, EU AI Act, and NIST AI RMF audit requirements.",
    accent: "cyan",
  },
  {
    icon: "Bot",
    title: "Agent Governance",
    description:
      "Orchestrate multi-agent swarms with token budgets, approval gates, and kill-switch controls.",
    accent: "magenta",
  },
  {
    icon: "Lock",
    title: "Zero-Trust Security",
    description:
      "End-to-end encryption, RBAC, immutable audit logs, and air-gapped deployment options.",
    accent: "purple",
  },
] as const;

export const trustBadges = [
  "SOC 2 Type II",
  "ISO 27001",
  "EU AI Act",
  "NIST AI RMF",
  "HIPAA Ready",
  "FedRAMP Path",
];

export const stats = [
  { value: "99.97%", label: "Policy uptime" },
  { value: "<12ms", label: "Scan latency" },
  { value: "2.4M+", label: "Requests guarded / day" },
  { value: "140+", label: "Enterprise tenants" },
];

export const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Security", href: "#security" },
  { label: "Enterprise", href: "#enterprise" },
];
