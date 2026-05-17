"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import { CollapsibleSidebar } from "@/components/workspace/collapsible-sidebar";
import { TopNavbar } from "@/components/workspace/top-navbar";
import { CenterWorkspace } from "@/components/workspace/center-workspace";
import { ReviewerPanel } from "@/components/security/reviewer-panel";
import { ConsolePanel } from "@/components/ide/console-panel";
import { MetricsBar } from "@/components/ide/metrics-bar";
import { editorFiles } from "@/lib/workspace-data";

// All views the center panel can show
export type CenterView = "editor" | "prompt" | "models" | "settings" | "policies" | "audits" | "alerts";

const initialContents = Object.fromEntries(
  editorFiles.map((f) => [f.id, f.content])
) as Record<string, string>;

export function SecurityDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [activeNav, setActiveNav] = useState("workspace");
  const [centerView, setCenterView] = useState<CenterView>("editor");
  const [openTabIds, setOpenTabIds] = useState(["policy", "handler"]);
  const [activeFileId, setActiveFileId] = useState("policy");
  const [fileContents, setFileContents] = useState(initialContents);
  const [consoleOpen, setConsoleOpen] = useState(true);

  const handleFileSelect = useCallback((id: string) => {
    setActiveFileId(id);
    setOpenTabIds((tabs) => (tabs.includes(id) ? tabs : [...tabs, id]));
    setCenterView("editor");
    setActiveNav("workspace");
  }, []);

  const handleNavChange = useCallback((id: string) => {
    setActiveNav(id);
    const navViewMap: Record<string, CenterView> = {
      prompts: "prompt",
      workspace: "editor",
      dashboard: "editor",
      models: "models",
      settings: "settings",
      policies: "policies",
      audits: "audits",
      alerts: "alerts",
    };
    setCenterView(navViewMap[id] || "editor");
  }, []);

  const handleTabClose = useCallback(
    (id: string) => {
      setOpenTabIds((tabs) => {
        const next = tabs.filter((t) => t !== id);
        if (next.length === 0) return tabs;
        if (activeFileId === id) {
          setActiveFileId(next[next.length - 1]);
        }
        return next;
      });
    },
    [activeFileId]
  );

  const handleContentChange = useCallback((id: string, value: string) => {
    setFileContents((c) => ({ ...c, [id]: value }));
  }, []);

  // TASK 2: Apply fix — inject patch into the active file
  const handleApplyFix = useCallback((patch: string) => {
    if (!patch || patch === "N/A") return;
    setFileContents((c) => ({ ...c, [activeFileId]: patch }));
  }, [activeFileId]);

  const showMetrics = useMemo(
    () => activeNav === "dashboard" || activeNav === "workspace",
    [activeNav]
  );

  // Show the reviewer panel only on workspace/dashboard views
  const showReviewer = useMemo(
    () => centerView === "editor" && rightPanelOpen,
    [centerView, rightPanelOpen]
  );

  return (
    <div className="cyber-bg relative flex h-dvh flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0 scanline" aria-hidden />

      <div className="relative z-10 flex min-h-0 flex-1">
        <CollapsibleSidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((c) => !c)}
          activeNav={activeNav}
          onNavChange={handleNavChange}
          activeFileId={activeFileId}
          onFileSelect={handleFileSelect}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <TopNavbar
            rightPanelOpen={rightPanelOpen}
            onToggleRightPanel={() => setRightPanelOpen((o) => !o)}
          />

          {showMetrics && <MetricsBar />}

          <PanelGroup direction="horizontal" className="min-h-0 flex-1">
            <Panel defaultSize={showReviewer ? 58 : 100} minSize={35}>
              <PanelGroup direction="vertical" className="h-full">
                <Panel defaultSize={consoleOpen ? 72 : 100} minSize={40}>
                  <div className="h-full p-2 pt-1">
                    <CenterWorkspace
                      openTabIds={openTabIds}
                      activeFileId={activeFileId}
                      onTabSelect={setActiveFileId}
                      onTabClose={handleTabClose}
                      fileContents={fileContents}
                      onContentChange={handleContentChange}
                      centerView={centerView}
                      onCenterViewChange={setCenterView}
                    />
                  </div>
                </Panel>

                {consoleOpen && (
                  <>
                    <PanelResizeHandle />
                    <Panel defaultSize={28} minSize={15} maxSize={45}>
                      <div className="h-full px-2 pb-2">
                        <ConsolePanel />
                      </div>
                    </Panel>
                  </>
                )}
              </PanelGroup>
            </Panel>

            {showReviewer && (
              <>
                <PanelResizeHandle />
                <Panel defaultSize={42} minSize={22} maxSize={55}>
                  <div className="glass h-full overflow-hidden rounded-lg border border-border m-2 ml-0">
                    <ReviewerPanel
                      onApplyFix={handleApplyFix}
                      activeFileContent={fileContents[activeFileId] ?? ""}
                    />
                  </div>
                </Panel>
              </>
            )}
          </PanelGroup>
        </div>
      </div>
    </div>
  );
}
