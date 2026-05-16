export type NavItem = {
  id: string;
  label: string;
  icon: string;
  badge?: string;
};

export const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { id: "policies", label: "Policies", icon: "FileCode2", badge: "12" },
  { id: "models", label: "Models", icon: "Brain", badge: "8" },
  { id: "audits", label: "Audits", icon: "ShieldCheck" },
  { id: "compliance", label: "Compliance", icon: "Scale" },
  { id: "agents", label: "Agents", icon: "Bot", badge: "3" },
  { id: "settings", label: "Settings", icon: "Settings" },
];

export const governanceMetrics = [
  { label: "Policy Coverage", value: 94, color: "bg-primary" },
  { label: "Risk Score", value: 23, color: "bg-emerald-500" },
  { label: "Model Drift", value: 67, color: "bg-amber-500" },
  { label: "Audit Readiness", value: 88, color: "bg-neon-purple" },
];

export const policyViolations = [
  {
    id: "v1",
    severity: "critical" as const,
    rule: "PII-001",
    message: "Unmasked email detected in model output stream",
    model: "gpt-enterprise-v4",
    time: "2m ago",
  },
  {
    id: "v2",
    severity: "warning" as const,
    rule: "RATE-003",
    message: "Token budget exceeded for agent swarm-7",
    model: "claude-governance",
    time: "14m ago",
  },
  {
    id: "v3",
    severity: "info" as const,
    rule: "AUDIT-012",
    message: "Scheduled compliance scan completed",
    model: "system",
    time: "1h ago",
  },
];

export const auditEvents = [
  {
    id: "a1",
    actor: "policy-engine",
    action: "Blocked inference request",
    target: "customer-support-bot",
    timestamp: "12:41:02",
  },
  {
    id: "a2",
    actor: "admin@corp.ai",
    action: "Updated guardrail threshold",
    target: "toxicity-filter-v2",
    timestamp: "12:38:17",
  },
  {
    id: "a3",
    actor: "drift-monitor",
    action: "Flagged embedding shift",
    target: "retrieval-index-prod",
    timestamp: "12:22:55",
  },
  {
    id: "a4",
    actor: "compliance-bot",
    action: "Exported SOC2 evidence pack",
    target: "audit-q2-2026",
    timestamp: "11:59:00",
  },
];

export const defaultPolicyCode = `# AI Governance Policy — production.yaml
version: "2.4"
scope: enterprise

guardrails:
  pii:
    enabled: true
    action: block
    patterns: [email, ssn, phone, address]

  toxicity:
    threshold: 0.82
    action: redact

  rate_limits:
    tokens_per_minute: 120000
    concurrent_agents: 16

models:
  allowed:
    - gpt-enterprise-v4
    - claude-governance
    - embeddings-secure-v2

  require_approval:
  - fine_tune
  - deploy_production

audit:
  log_level: verbose
  retention_days: 365
  export: [soc2, iso27001, eu_ai_act]
`;
