"use client";

import dynamic from "next/dynamic";
import { useCallback, useMemo } from "react";
import { editorFiles, type EditorFile } from "@/lib/workspace-data";
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
  const activeFile = useMemo(
    () => editorFiles.find((f) => f.id === activeFileId) ?? editorFiles[0],
    [activeFileId]
  );

  const handleMount = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (monaco: any) => {
      monaco.editor.defineTheme("nexus-light", {
        base: "vs",
        inherit: true,
        rules: [
          { token: "comment", foreground: "71717a" },
          { token: "keyword", foreground: "7c3aed" },
          { token: "string", foreground: "2563eb" },
          { token: "number", foreground: "db2777" },
        ],
        colors: {
          "editor.background": "#fafafa",
          "editor.foreground": "#18181b",
          "editorLineNumber.foreground": "#a1a1aa",
          "editor.selectionBackground": "#3b82f633",
          "editor.lineHighlightBackground": "#f4f4f5",
          "editorCursor.foreground": "#3b82f6",
          "editorIndentGuide.background": "#e4e4e7",
        },
      });
      monaco.editor.setTheme("nexus-light");
    },
    []
  );

  const openFiles = openTabIds
    .map((id) => editorFiles.find((f) => f.id === id))
    .filter(Boolean) as EditorFile[];

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-lg border border-border bg-[#fafafa]">
      <div className="flex shrink-0 overflow-x-auto border-b border-border bg-muted custom-scrollbar">
        {openFiles.map((file) => (
          <button
            key={file.id}
            type="button"
            onClick={() => onTabSelect(file.id)}
            className={cn(
              "group flex max-w-[180px] shrink-0 items-center gap-1.5 border-r border-border px-3 py-2 font-mono text-[11px] transition-colors",
              activeFileId === file.id
                ? "bg-primary/10 text-primary border-t-2 border-t-primary"
                : "text-muted-foreground hover:bg-muted/30"
            )}
          >
            <span className="truncate">{file.name}</span>
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
          language={activeFile.language}
          value={fileContents[activeFileId] ?? activeFile.content}
          onChange={(v) => onContentChange(activeFileId, v ?? "")}
          beforeMount={handleMount}
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
