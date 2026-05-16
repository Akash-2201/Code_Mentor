"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MonacoWorkspace } from "@/components/editor/monaco-workspace";
import { PromptWorkspace } from "@/components/chat/prompt-workspace";
import { Code2, MessageSquare } from "lucide-react";

type CenterWorkspaceProps = {
  openTabIds: string[];
  activeFileId: string;
  onTabSelect: (id: string) => void;
  onTabClose: (id: string) => void;
  fileContents: Record<string, string>;
  onContentChange: (id: string, value: string) => void;
  centerView: "editor" | "prompt";
  onCenterViewChange: (view: "editor" | "prompt") => void;
};

export function CenterWorkspace(props: CenterWorkspaceProps) {
  return (
    <Tabs
      value={props.centerView}
      onValueChange={(v) => props.onCenterViewChange(v as "editor" | "prompt")}
      className="flex h-full min-h-0 flex-col"
    >
      <TabsList className="h-9 w-full shrink-0 justify-start rounded-none border-b border-border bg-muted p-0">
        <TabsTrigger value="editor" className="gap-1.5 rounded-none text-xs data-[state=active]:border-b-2 data-[state=active]:border-primary">
          <Code2 className="h-3.5 w-3.5" />
          Editor
        </TabsTrigger>
        <TabsTrigger value="prompt" className="gap-1.5 rounded-none text-xs data-[state=active]:border-b-2 data-[state=active]:border-primary">
          <MessageSquare className="h-3.5 w-3.5" />
          Prompt Lab
        </TabsTrigger>
      </TabsList>

      <TabsContent value="editor" className="mt-0 min-h-0 flex-1 data-[state=inactive]:hidden">
        <MonacoWorkspace
          openTabIds={props.openTabIds}
          activeFileId={props.activeFileId}
          onTabSelect={props.onTabSelect}
          onTabClose={props.onTabClose}
          fileContents={props.fileContents}
          onContentChange={props.onContentChange}
        />
      </TabsContent>

      <TabsContent value="prompt" className="mt-0 min-h-0 flex-1 data-[state=inactive]:hidden">
        <PromptWorkspace />
      </TabsContent>
    </Tabs>
  );
}
