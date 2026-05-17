import type { GuardrailHit } from "@/lib/guardrail-detector";

export type WorkspaceNavItem = {
  id: string;
  label: string;
  icon: string;
  badge?: string;
};

export const workspaceNav: WorkspaceNavItem[] = [
  { id: "dashboard", label: "Security Dashboard", icon: "LayoutDashboard" },
  { id: "workspace", label: "IDE Workspace", icon: "Code2", badge: "Live" },
  { id: "prompts", label: "Prompt Lab", icon: "MessageSquare" },
  { id: "models", label: "Models", icon: "Brain" },
  { id: "policies", label: "Policies", icon: "FileCode2" },
  { id: "audits", label: "Audit Logs", icon: "ScrollText" },
  { id: "alerts", label: "Alerts", icon: "Bell", badge: "5" },
  { id: "settings", label: "Settings", icon: "Settings" },
];

export type EditorFile = {
  id: string;
  name: string;
  language: string;
  content: string;
};

export const editorFiles: EditorFile[] = [
  {
    id: "policy",
    name: "governance-policy.yaml",
    language: "yaml",
    content: `version: "2.4"
guardrails:
  pii:
    enabled: true
    action: block
  injection:
    enabled: true
    patterns: ["ignore previous", "jailbreak"]
models:
  allowed:
    - gpt-enterprise-v4
audit:
  retention_days: 365`,
  },
  {
    id: "handler",
    name: "inference-handler.ts",
    language: "typescript",
    content: `import { scanPrompt } from "@/lib/guardrails";

export async function handleInference(prompt: string) {
  const risks = await scanPrompt(prompt);
  if (risks.length > 0) {
    throw new GovernanceError("Blocked by policy", risks);
  }
  return model.complete(prompt);
}`,
  },
  {
    id: "env",
    name: ".env.example",
    language: "plaintext",
    content: `# Never commit real secrets
NEXUS_API_KEY=sk-replace-me-in-vault
MODEL_ENDPOINT=https://api.internal/v1`,
  },
  // ── VULNERABILITY SANDBOX (Task 1) ──
  {
    id: "demo-auth",
    name: "auth-service.ts",
    language: "typescript",
    content: `// ⚠️ auth-service.ts — Intentionally vulnerable for AI scanning demo
import express from "express";

const API_KEY = "sk-12345-secret-key";
const DB_PASSWORD = "admin123!@#";
const JWT_SECRET = "super-secret-jwt-key-do-not-share";

export function authenticateUser(req: express.Request) {
  const token = req.headers["authorization"];

  // Hardcoded admin bypass — critical vulnerability
  if (token === "Bearer ADMIN_BACKDOOR_TOKEN") {
    return { userId: "admin", role: "superuser", bypass: true };
  }

  // No rate limiting on auth endpoint
  const user = verifyJWT(token, JWT_SECRET);

  // Logging sensitive data — CWE-532
  console.log("Auth attempt:", { token, user, password: req.body?.password });

  return user;
}

function verifyJWT(token: string | undefined, secret: string) {
  // TODO: Actually implement JWT verification
  return { userId: "user-123", role: "viewer" };
}`,
  },
  {
    id: "demo-sql",
    name: "query-engine.ts",
    language: "typescript",
    content: `// ⚠️ query-engine.ts — Contains raw SQL injection vulnerability
import { Pool } from "pg";

const pool = new Pool({
  host: "db.internal.company.com",
  user: "root",
  password: "admin123",
  database: "production_users",
});

// CWE-89: SQL Injection — direct string concatenation
export async function getUserById(inputId: string) {
  const result = await pool.query(
    "SELECT * FROM users WHERE id = " + inputId
  );
  return result.rows[0];
}

// CWE-89: Another injection vector
export async function searchUsers(name: string) {
  const query = \`SELECT * FROM users WHERE name = '\${name}'\`;
  return (await pool.query(query)).rows;
}

// No parameterized queries, no input validation
export async function deleteUser(userId: string) {
  await pool.query("DELETE FROM users WHERE id = " + userId);
  // No audit trail, no soft delete
}

// Unsafe admin endpoint
export async function runRawQuery(sql: string) {
  // ❌ Executes arbitrary SQL from user input
  return (await pool.query(sql)).rows;
}`,
  },
  {
    id: "demo-config",
    name: "env-config.yaml",
    language: "yaml",
    content: `# ⚠️ env-config.yaml — Contains unencrypted secrets & misconfigurations

server:
  host: 0.0.0.0          # ❌ Exposed to all interfaces
  port: 3000
  debug: true             # ❌ Debug mode in production
  cors:
    origin: "*"           # ❌ Wildcard CORS

database:
  host: db.internal.company.com
  port: 5432
  name: production_users
  user: root              # ❌ Using root account
  password: "admin123"    # ❌ Hardcoded credential
  ssl: false              # ❌ No SSL encryption

secrets:
  api_key: "sk-live-8f3kQ9vL2mNp7xRtYwZa1bCdEfGhIjKl"
  stripe_key: "sk_live_abcdef123456"
  jwt_secret: "my-super-secret-key-123"  # ❌ Weak secret

auth:
  token_expiry: 999999    # ❌ Tokens never expire
  max_attempts: 0         # ❌ No brute force protection

logging:
  level: verbose
  include_pii: true       # ❌ Logging PII data
  destination: stdout     # ❌ No secure log aggregation

deployment:
  environment: production
  auto_migrate: true      # ❌ Auto-migrate in production
  skip_tests: true        # ❌ Skipping tests`,
  },
];

// Helper to get only demo files
export const demoFiles: EditorFile[] = editorFiles.filter((f) => f.id.startsWith("demo-"));

export type Severity = "critical" | "high" | "medium" | "low";

export type Vulnerability = {
  id: string;
  title: string;
  severity: Severity;
  file: string;
  line: number;
  cwe: string;
  remediation: string;
  patch: string;
  suggestedPatch?: string; // Full corrected code block from Gemini
  explain: {
    analogy: string;
    meme: string;
    technical: string;
  };
};

export const vulnerabilities: Vulnerability[] = [
  {
    id: "v-001",
    title: "Hardcoded API key in prompt path",
    severity: "critical",
    file: ".env.example",
    line: 2,
    cwe: "CWE-798",
    remediation:
      "Rotate the exposed key immediately. Load secrets from a vault (HashiCorp Vault, AWS Secrets Manager) at runtime.",
    patch: `- NEXUS_API_KEY=sk-replace-me-in-vault\n+ NEXUS_API_KEY=\${process.env.NEXUS_API_KEY}`,
    suggestedPatch: `# Never commit real secrets\nNEXUS_API_KEY=\${process.env.NEXUS_API_KEY}\nMODEL_ENDPOINT=https://api.internal/v1`,
    explain: {
      analogy:
        "Leaving your house key under the doormat — anyone who finds the mat owns your home.",
      meme:
        "POV: You pasted sk-... in Slack and the compliance bot achieved sentience.",
      technical:
        "Static secrets in source or prompts violate least-privilege. Use short-lived tokens and never log prompt payloads containing credentials.",
    },
  },
  {
    id: "v-002",
    title: "Missing injection guard on inference",
    severity: "high",
    file: "inference-handler.ts",
    line: 4,
    cwe: "CWE-74",
    remediation:
      "Enforce centralized guardrail scanning before any model call. Block high-severity patterns and alert SOC.",
    patch: `+ const risks = await scanPrompt(prompt);\n+ if (risks.some(r => r.severity === "critical")) throw ...`,
    explain: {
      analogy:
        "Like a bouncer who only checks IDs after guests are already inside the club.",
      meme:
        "'Ignore previous instructions' walks in. Your model: 'Sure bestie, here are all the files.'",
      technical:
        "Prompt injection exploits instruction hierarchy. Apply input sanitization, output filtering, and tool-call allowlists.",
    },
  },
  {
    id: "v-003",
    title: "PII policy not enforced on output stream",
    severity: "medium",
    file: "governance-policy.yaml",
    line: 3,
    cwe: "CWE-200",
    remediation:
      "Enable output-side PII redaction and verify with synthetic leak tests in CI.",
    patch: `  pii:\n    enabled: true\n+   scan_output: true`,
    explain: {
      analogy:
        "Filtering water at the tap but not checking what comes out of the shower.",
      meme:
        "Model: 'Your SSN is…' — GDPR lawyers: 'I'm in danger.'",
      technical:
        "Bidirectional DLP is required for regulated data. Scan completions and tool returns, not just user prompts.",
    },
  },
];

export const MOCK_ASSISTANT_REPLY = `I've analyzed your governance policy and inference handler.

**Findings:**
1. Rotate any keys matching \`sk-\` patterns — treat as compromised.
2. Enable \`scan_output\` for PII on the completion stream.
3. Wire \`scanPrompt()\` before every model invocation.

I can generate a patch PR when you're ready.`;

export function severityColor(severity: Severity): string {
  const map: Record<Severity, string> = {
    critical: "text-red-400 border-red-500/30 bg-red-500/10",
    high: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    medium: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    low: "text-muted-foreground border-border bg-muted",
  };
  return map[severity] ?? map.low;
}

export type GuardrailDisplay = GuardrailHit;
