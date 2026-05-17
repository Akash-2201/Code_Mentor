"use client";

import { useState } from "react";
import { useToast } from "@/components/providers/toast-provider";
import { vulnerabilities as fallbackData, severityColor, type Vulnerability } from "@/lib/workspace-data";
import { ExplainabilityCard } from "@/components/security/explainability-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Shield,
  ChevronDown,
  ChevronRight,
  Wrench,
  GitPullRequest,
  AlertTriangle,
  Loader2,
  Bot,
  CheckCircle2,
} from "lucide-react";

type ReviewerPanelProps = {
  onApplyFix?: (patchedCode: string) => void;
  activeFileContent?: string;
};

export function ReviewerPanel({ onApplyFix, activeFileContent }: ReviewerPanelProps) {
  const { toast } = useToast();

  const [liveData, setLiveData] = useState<Vulnerability[]>(fallbackData);
  const [isScanning, setIsScanning] = useState(false);
  const [selected, setSelected] = useState<Vulnerability>(fallbackData[0]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    [fallbackData[0]?.id]: true,
  });
  const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set());

  // Scan the ACTIVE file content (real code from editor)
  const runGeminiScan = async () => {
    setIsScanning(true);
    setAppliedIds(new Set());
    toast("AI scan started — Gemini is analyzing your code...", "info");
    try {
      const codeToScan = activeFileContent || `const SECRET = "sk-live-123456789";`;

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: codeToScan }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();

      if (data?.error) {
        toast(`Scan error: ${data.error}`, "warning");
        return;
      }

      if (data?.analysis) {
        const rawIssues = data?.analysis?.issues || [];
        const safeIssues = rawIssues.map((iss: any) =>
          typeof iss === "string" ? iss : iss?.title || iss?.message || JSON.stringify(iss)
        );

        let newVulns: Vulnerability[] = [];

        if (data?.analysis?.vulnerabilities && Array.isArray(data.analysis.vulnerabilities)) {
          newVulns = data.analysis.vulnerabilities.map((v: any, idx: number) => ({
            id: v?.id || `gemini-vuln-${idx}`,
            title: v?.title || safeIssues[idx] || "Unknown Vulnerability",
            severity: (v?.severity?.toLowerCase() || "high") as any,
            file: v?.file || "scanned-code.ts",
            line: v?.line || 0,
            cwe: v?.cwe || "N/A",
            remediation: v?.remediation || "Review and remediate this finding.",
            patch: v?.patch || "N/A",
            suggestedPatch: v?.suggestedPatch || v?.suggested_patch || null,
            explain: {
              analogy: v?.explain?.analogy || "N/A",
              meme: v?.explain?.meme || "Insert 'This is fine' dog meme here.",
              technical: v?.explain?.technical || "Awaiting technical review.",
            }
          }));
        } else if (safeIssues.length > 0) {
          newVulns = safeIssues.map((iss: string, idx: number) => ({
            id: `gemini-issue-${idx}`,
            title: iss,
            severity: "high" as any,
            file: "scanned-code.ts",
            line: 0,
            cwe: "N/A",
            remediation: "N/A",
            patch: "N/A",
            suggestedPatch: null,
            explain: {
              analogy: "N/A",
              meme: "Insert 'This is fine' dog meme here.",
              technical: "Awaiting technical review.",
            }
          }));
        }

        if (newVulns.length > 0) {
          setLiveData(newVulns);
          setSelected(newVulns[0]);
          const newExpanded: Record<string, boolean> = {};
          newVulns.forEach(v => { newExpanded[v.id] = true; });
          setExpanded(newExpanded);
          toast(`Scan complete — ${newVulns.length} finding(s) detected!`, "success");
        } else {
          toast("Scan complete — No vulnerabilities found!", "success");
        }
      }
    } catch (error: any) {
      console.error("Failed to scan", error);
      toast(`Scan failed: ${error?.message || "Unknown error"}`, "warning");
    } finally {
      setIsScanning(false);
    }
  };

  // TASK 2: Apply Fix — use suggestedPatch to OVERWRITE the editor content
  const handleApplyFix = (v: Vulnerability) => {
    // Prefer suggestedPatch (full corrected code), fall back to diff-based patch
    const fullFix = v?.suggestedPatch;
    const diffPatch = v?.patch;

    if (fullFix && onApplyFix) {
      // suggestedPatch is the full corrected code — overwrite directly
      onApplyFix(fullFix);
      setAppliedIds((prev) => new Set(prev).add(v?.id));
      toast("🛡️ Nexus fixed your code!", "success");
      return;
    }

    if (diffPatch && diffPatch !== "N/A" && onApplyFix) {
      // Fallback: apply diff-style patch
      const currentContent = activeFileContent || "";
      const patchLines = diffPatch.split("\n");
      const addedLines = patchLines
        .filter((l: string) => l.startsWith("+"))
        .map((l: string) => l.slice(2))
        .join("\n");
      const removedLines = patchLines
        .filter((l: string) => l.startsWith("-"))
        .map((l: string) => l.slice(2));

      let patched = currentContent;
      if (removedLines.length > 0) {
        for (const line of removedLines) {
          if (line.trim() && patched.includes(line.trim())) {
            patched = patched.replace(line.trim(), "");
          }
        }
        patched = patched.trim() + "\n\n// 🛡️ Security patch applied:\n" + addedLines;
      } else if (addedLines) {
        patched = currentContent + "\n\n// 🛡️ Security patch applied:\n" + addedLines;
      }

      onApplyFix(patched);
      setAppliedIds((prev) => new Set(prev).add(v?.id));
      toast("🛡️ Nexus fixed your code!", "success");
      return;
    }

    toast("No patch available for this finding.", "warning");
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="flex shrink-0 items-center justify-between border-b border-border px-3 py-2">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider">
            AI Reviewer
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={runGeminiScan}
            disabled={isScanning}
            size="sm"
            className="h-6 text-[10px] bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isScanning ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <Bot className="h-3 w-3 mr-1" />}
            {isScanning ? "Scanning..." : "Run AI Scan"}
          </Button>
          <Badge variant="destructive" className="text-[9px]">
            {liveData?.length || 0} findings
          </Badge>
        </div>
      </header>

      {isScanning && (
        <div className="flex flex-col items-center justify-center gap-3 p-6 border-b border-border bg-primary/5">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-xs text-muted-foreground animate-pulse">
            Gemini is analyzing your code for vulnerabilities...
          </p>
          <p className="text-[10px] text-muted-foreground">This may take 30–60 seconds</p>
        </div>
      )}

      <ScrollArea className="flex-1 min-h-0">
        <div className="space-y-2 p-2">
          {liveData.map((v) => {
            const isOpen = expanded[v?.id];
            const isSelected = selected?.id === v?.id;
            const isApplied = appliedIds.has(v?.id);
            return (
              <div
                key={v?.id}
                className={cn(
                  "rounded-lg border transition-colors",
                  isApplied
                    ? "border-emerald-500/30 bg-emerald-500/5"
                    : isSelected
                    ? "border-primary/30 bg-primary/5"
                    : "border-border"
                )}
              >
                <button
                  type="button"
                  className="flex w-full items-start gap-2 p-2.5 text-left"
                  onClick={() => {
                    if (v) setSelected(v);
                    if (v?.id) setExpanded((e) => ({ ...e, [v.id]: !e[v.id] }));
                  }}
                >
                  {isOpen ? (
                    <ChevronDown className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {isApplied ? (
                        <Badge className="text-[9px] uppercase text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
                          <CheckCircle2 className="h-2.5 w-2.5 mr-0.5" />
                          Fixed
                        </Badge>
                      ) : (
                        <Badge className={cn("text-[9px] uppercase", severityColor(v?.severity || "low"))}>
                          {v?.severity || "LOW"}
                        </Badge>
                      )}
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {v?.file || "N/A"}:{v?.line || 0}
                      </span>
                    </div>
                    <p className={cn("mt-1 text-xs font-medium leading-snug", isApplied && "line-through text-muted-foreground")}>
                      {v?.title || "N/A"}
                    </p>
                  </div>
                </button>

                {isOpen && (
                  <div className="space-y-2 border-t border-border px-2.5 pb-2.5 pt-2">
                    <div className="flex gap-2 rounded-md border border-amber-500/20 bg-amber-500/5 p-2">
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-amber-400 mt-0.5" />
                      <p className="text-[11px] leading-relaxed text-muted-foreground">
                        {v?.remediation || "N/A"}
                      </p>
                    </div>

                    {/* Show suggested patch preview */}
                    {v?.suggestedPatch && (
                      <div className="rounded-md border border-emerald-500/20 bg-emerald-500/5 p-2">
                        <p className="mb-1 text-[9px] font-semibold uppercase text-emerald-400">
                          Full corrected code
                        </p>
                        <pre className="overflow-x-auto font-mono text-[10px] text-emerald-400 whitespace-pre-wrap max-h-32 custom-scrollbar">
                          {v.suggestedPatch}
                        </pre>
                      </div>
                    )}

                    {/* Show diff patch */}
                    <div className="rounded-md border border-border bg-[#0f172a] p-2">
                      <p className="mb-1 text-[9px] font-semibold uppercase text-primary">
                        Diff patch
                      </p>
                      <pre className="overflow-x-auto font-mono text-[10px] text-primary/80 whitespace-pre-wrap">
                        {v?.patch || "N/A"}
                      </pre>
                    </div>

                    <div className="flex gap-1.5">
                      <Button
                        variant={isApplied ? "secondary" : "outline"}
                        size="sm"
                        className={cn(
                          "h-7 flex-1 text-[10px] gap-1",
                          isApplied && "text-emerald-400"
                        )}
                        disabled={isApplied}
                        onClick={() => handleApplyFix(v)}
                      >
                        {isApplied ? (
                          <><CheckCircle2 className="h-3 w-3" /> Applied</>
                        ) : (
                          <><Wrench className="h-3 w-3" /> Apply fix</>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        className="h-7 flex-1 text-[10px] gap-1"
                        onClick={() => toast("Pull request created on branch fix/security-patch", "success")}
                      >
                        <GitPullRequest className="h-3 w-3" />
                        Open PR
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <div className="shrink-0 border-t border-border p-2">
        <ExplainabilityCard vulnerability={selected} />
      </div>
    </div>
  );
}