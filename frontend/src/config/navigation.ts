import {
  LayoutDashboard,
  Database,
  Activity,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Settings2,
  Lightbulb,
  Sliders,
  DollarSign,
  Leaf,
  FileText,
  ShieldCheck,
  Bell,
  Cpu,
  Calendar,
  Target,
  Layers,
  ScrollText,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
  badge?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navigation: NavSection[] = [
  {
    title: "Overview",
    items: [
      { label: "Overview", path: "/", icon: LayoutDashboard },
    ],
  },
  {
    title: "Data",
    items: [
      { label: "Energy Data", path: "/energy-data", icon: Database },
      { label: "Consumption", path: "/consumption", icon: Activity },
      { label: "Analytics", path: "/analytics", icon: BarChart3 },
      { label: "Data Quality", path: "/data-quality", icon: ShieldCheck },
    ],
  },
  {
    title: "Intelligence",
    items: [
      { label: "Forecasting", path: "/forecasting", icon: TrendingUp },
      { label: "Anomalies", path: "/anomalies", icon: AlertTriangle, badge: "3" },
      { label: "Optimization", path: "/optimization", icon: Settings2 },
      { label: "Recommendations", path: "/recommendations", icon: Lightbulb },
    ],
  },
  {
    title: "Simulation",
    items: [
      { label: "What-If Simulator", path: "/simulator", icon: Sliders },
      { label: "Scenarios", path: "/scenarios", icon: Layers },
      { label: "Goals", path: "/goals", icon: Target },
    ],
  },
  {
    title: "Money & Carbon",
    items: [
      { label: "Cost Intelligence", path: "/cost", icon: DollarSign },
      { label: "Carbon Intelligence", path: "/carbon", icon: Leaf },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Assets / Loads", path: "/assets", icon: Cpu },
      { label: "Schedules", path: "/schedules", icon: Calendar },
      { label: "Alerts", path: "/alerts", icon: Bell },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Reports", path: "/reports", icon: FileText },
      { label: "Audit Log", path: "/audit", icon: ScrollText },
      { label: "Settings", path: "/settings", icon: Settings },
    ],
  },
];

export const navigationFlat: NavItem[] = navigation.flatMap(
  (section) => section.items
);