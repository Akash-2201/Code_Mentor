"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { editorFiles, type EditorFile } from "@/lib/workspace-data";
import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center font-mono text-xs text-muted-foreground">
      Loading editor…
    </div>
  ),
});

type MonacoWorkspaceProps = {
  openTabIds: string[];
  activeFileId: string;
  onTabSelect: (id: string) => void;
  onTabClose: (id: string) => void;
  fileContents: Record<string, string>;
  onContentChange: (id: string, value: string) => void;
};

export function MonacoWorkspace({
  openTabIds,
  activeFileId,
  onTabSelect,
  onTabClose,
  fileContents,
  onContentChange,
}: MonacoWorkspaceProps) {
  const { theme } = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const monacoRef = useRef<any>(null);

  const activeFile = useMemo(
    () => editorFiles.find((f) => f.id === activeFileId) ?? editorFiles[0],
    [activeFileId]
  );

  // Define both themes on mount
  const handleMount = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (monaco: any) => {
      monacoRef.current = monaco;

      monaco.editor.defineTheme("nexus-dark", {
        base: "vs-dark",
        inherit: true,
        rules: [
          { token: "comment", foreground: "64748b", fontStyle: "italic" },
          { token: "keyword", foreground: "a78bfa" },
          { token: "string", foreground: "38bdf8" },
          { token: "number", foreground: "f472b6" },
          { token: "type", foreground: "34d399" },
        ],
        colors: {
          "editor.background": "#0f172a",
          "editor.foreground": "#e2e8f0",
          "editorLineNumber.foreground": "#475569",
          "editorLineNumber.activeForeground": "#94a3b8",
          "editor.selectionBackground": "#38bdf833",
          "editor.lineHighlightBackground": "#1e293b",
          "editorCursor.foreground": "#38bdf8",
          "editorIndentGuide.background": "#1e293b",
          "editorIndentGuide.activeBackground": "#334155",
          "editor.selectionHighlightBackground": "#38bdf822",
        },
      });

      monaco.editor.defineTheme("nexus-light", {
        base: "vs",
        inherit: true,
        rules: [
          { token: "comment", foreground: "64748b", fontStyle: "italic" },
          { token: "keyword", foreground: "7c3aed" },
          { token: "string", foreground: "2563eb" },
          { token: "number", foreground: "db2777" },
          { token: "type", foreground: "059669" },
        ],
        colors: {
          "editor.background": "#ffffff",
          "editor.foreground": "#0f172a",
          "editorLineNumber.foreground": "#94a3b8",
          "editorLineNumber.activeForeground": "#475569",
          "editor.selectionBackground": "#2563eb22",
          "editor.lineHighlightBackground": "#f8fafc",
          "editorCursor.foreground": "#2563eb",
          "editorIndentGuide.background": "#e2e8f0",
          "editorIndentGuide.activeBackground": "#cbd5e1",
          "editor.selectionHighlightBackground": "#2563eb15",
        },
      });

      monaco.editor.setTheme(theme === "light" ? "nexus-light" : "nexus-dark");
    },
    [theme]
  );

  // Switch theme dynamically when toggle is clicked
  useEffect(() => {
    if (monacoRef.current) {
      monacoRef.current.editor.setTheme(theme === "light" ? "nexus-light" : "nexus-dark");
    }
  }, [theme]);

  const openFiles = openTabIds
    .map((id) => editorFiles.find((f) => f.id === id))
    .filter(Boolean) as EditorFile[];

  return (
    <div className={cn("flex h-full min-h-0 flex-col overflow-hidden rounded-lg border border-border", theme === "light" ? "bg-white" : "bg-[#0f172a]")}>
      <div className={cn("flex shrink-0 overflow-x-auto border-b border-border custom-scrollbar", theme === "light" ? "bg-[#f1f5f9]" : "bg-[#1e293b]")}>
        {openFiles.map((file) => (
          <button
            key={file.id}
            type="button"
            onClick={() => onTabSelect(file.id)}
            className={cn(
              "group flex max-w-[180px] shrink-0 items-center gap-1.5 border-r border-border px-3 py-2 font-mono text-[11px] transition-colors",
              activeFileId === file.id
                ? "bg-primary/10 text-primary border-t-2 border-t-primary"
                : "text-muted-foreground hover:bg-accent"
            )}
          >
            <span className="truncate">{file?.name}</span>
            {openTabIds.length > 1 && (
              <span
                role="button"
                tabIndex={0}
                className="rounded p-0.5 opacity-0 hover:bg-destructive/20 group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  onTabClose(file.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.stopPropagation();
                    onTabClose(file.id);
                  }
                }}
              >
                <X className="h-3 w-3" />
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1">
        <MonacoEditor
          height="100%"
          language={activeFile?.language}
          value={fileContents[activeFileId] ?? activeFile?.content}
          onChange={(v) => onContentChange(activeFileId, v ?? "")}
          beforeMount={handleMount}
          theme={theme === "light" ? "nexus-light" : "nexus-dark"}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            fontFamily: "var(--font-jetbrains), monospace",
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            padding: { top: 12 },
            wordWrap: "on",
            automaticLayout: true,
            renderLineHighlight: "line",
            bracketPairColorization: { enabled: true },
          }}
        />
      </div>
    </div>
  );
}
