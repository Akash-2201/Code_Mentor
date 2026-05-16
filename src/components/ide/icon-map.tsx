import {
  LayoutDashboard,
  FileCode2,
  Brain,
  ShieldCheck,
  Scale,
  Bot,
  Settings,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  FileCode2,
  Brain,
  ShieldCheck,
  Scale,
  Bot,
  Settings,
};

export function NavIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] ?? LayoutDashboard;
  return <Icon className={className} />;
}
