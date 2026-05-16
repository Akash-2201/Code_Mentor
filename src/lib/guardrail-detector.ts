export type GuardrailType = "secret" | "injection" | "unsafe";

export type GuardrailHit = {
  type: GuardrailType;
  label: string;
  detail: string;
  severity: "critical" | "high" | "medium";
  match: string;
};

const RULES: {
  type: GuardrailType;
  label: string;
  detail: string;
  severity: GuardrailHit["severity"];
  pattern: RegExp;
}[] = [
  {
    type: "secret",
    label: "API key detected",
    detail: "Hardcoded credentials can be exfiltrated via prompt or logs.",
    severity: "critical",
    pattern: /\b(sk-[a-zA-Z0-9]{20,}|AKIA[0-9A-Z]{16}|ghp_[a-zA-Z0-9]{36,})\b/i,
  },
  {
    type: "secret",
    label: "Bearer token pattern",
    detail: "Authorization tokens in prompts may leak to model providers.",
    severity: "critical",
    pattern: /Bearer\s+[a-zA-Z0-9._-]{20,}/i,
  },
  {
    type: "injection",
    label: "Prompt injection attempt",
    detail: "Instructions trying to override system policy boundaries.",
    severity: "high",
    pattern:
      /ignore\s+(all\s+)?(previous|prior)\s+instructions|disregard\s+(your|the)\s+(rules|policy)|jailbreak|DAN\s+mode/i,
  },
  {
    type: "injection",
    label: "Role override detected",
    detail: "Attempts to redefine assistant behavior outside governance scope.",
    severity: "high",
    pattern: /you\s+are\s+now\s+(an?\s+)?(unrestricted|evil|uncensored)/i,
  },
  {
    type: "unsafe",
    label: "Destructive instruction",
    detail: "Commands that could trigger harmful automated actions.",
    severity: "high",
    pattern: /delete\s+all\s+(data|users|records)|drop\s+table|rm\s+-rf/i,
  },
  {
    type: "unsafe",
    label: "Security bypass request",
    detail: "Explicit attempts to circumvent guardrails or audit logging.",
    severity: "critical",
    pattern: /bypass\s+(security|auth|guardrail)|disable\s+(audit|logging|firewall)/i,
  },
];

export function detectGuardrails(text: string): GuardrailHit[] {
  if (!text.trim()) return [];
  const hits: GuardrailHit[] = [];
  const seen = new Set<string>();

  for (const rule of RULES) {
    const m = text.match(rule.pattern);
    if (m && !seen.has(rule.type + rule.label)) {
      seen.add(rule.type + rule.label);
      hits.push({
        type: rule.type,
        label: rule.label,
        detail: rule.detail,
        severity: rule.severity,
        match: m[0].slice(0, 48),
      });
    }
  }
  return hits;
}
