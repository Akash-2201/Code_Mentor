"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MonacoWorkspace } from "@/components/editor/monaco-workspace";
import { PromptWorkspace } from "@/components/chat/prompt-workspace";
import { ModelsView } from "@/components/views/models-view";
import { SettingsView } from "@/components/views/settings-view";
import { PoliciesView } from "@/components/views/policies-view";
import { AuditLogsView } from "@/components/views/audit-logs-view";
import { AlertsView } from "@/components/views/alerts-view";
import { Code2, MessageSquare, Brain, Settings, FileCode2, ScrollText, Bell } from "lucide-react";
import type { CenterView } from "@/components/workspace/security-dashboard";

type CenterWorkspaceProps = {
  openTabIds: string[];
  activeFileId: string;
  onTabSelect: (id: string) => void;
  onTabClose: (id: string) => void;
  fileContents: Record<string, string>;
  onContentChange: (id: string, value: string) => void;
  centerView: CenterView;
  onCenterViewChange: (view: CenterView) => void;
};

const tabItems = [
  { value: "editor", label: "Editor", icon: Code2 },
  { value: "prompt", label: "Prompt Lab", icon: MessageSquare },
  { value: "models", label: "Models", icon: Brain },
  { value: "policies", label: "Policies", icon: FileCode2 },
  { value: "audits", label: "Audit Logs", icon: ScrollText },
  { value: "alerts", label: "Alerts", icon: Bell },
  { value: "settings", label: "Settings", icon: Settings },
];

export function CenterWorkspace(props: CenterWorkspaceProps) {
  return (
    <Tabs
      value={props.centerView}
      onValueChange={(v) => props.onCenterViewChange(v as CenterView)}
      className="flex h-full min-h-0 flex-col"
    >
      <TabsList className="h-9 w-full shrink-0 justify-start rounded-none border-b border-border bg-muted p-0 overflow-x-auto">
        {tabItems.map((tab) => {
          const Icon = tab.icon;
          return (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="gap-1.5 rounded-none text-xs whitespace-nowrap data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary"
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
            </TabsTrigger>
          );
        })}
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

      <TabsContent value="models" className="mt-0 min-h-0 flex-1 data-[state=inactive]:hidden">
        <ModelsView />
      </TabsContent>

      <TabsContent value="policies" className="mt-0 min-h-0 flex-1 data-[state=inactive]:hidden">
        <PoliciesView />
      </TabsContent>

      <TabsContent value="audits" className="mt-0 min-h-0 flex-1 data-[state=inactive]:hidden">
        <AuditLogsView />
      </TabsContent>

      <TabsContent value="alerts" className="mt-0 min-h-0 flex-1 data-[state=inactive]:hidden">
        <AlertsView />
      </TabsContent>

      <TabsContent value="settings" className="mt-0 min-h-0 flex-1 data-[state=inactive]:hidden">
        <SettingsView />
      </TabsContent>
    </Tabs>
  );
}
