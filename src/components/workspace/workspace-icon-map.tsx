import {
  LayoutDashboard,
  Code2,
  MessageSquare,
  Brain,
  FileCode2,
  ScrollText,
  Bell,
  Settings,
  FolderTree,
  Shield,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  LayoutDashboard,
  Code2,
  MessageSquare,
  Brain,
  FileCode2,
  ScrollText,
  Bell,
  Settings,
  FolderTree,
  Shield,
};

export function WorkspaceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = icons[name] ?? Shield;
  return <Icon className={className} />;
}
