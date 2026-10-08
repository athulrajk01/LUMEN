import { useState, useMemo } from "react";
import {
  AlertTriangle,
  Search,
  Filter,
  ChevronRight,
  RefreshCw,
  ShieldAlert,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { mockAnomalies } from "../data/mockAnomalies";
import { cn } from "../lib/utils";
import type { AnomalySeverity, AnomalyStatus } from "../types/anomaly";

const severityStyles: Record<AnomalySeverity, string> = {
  critical: "bg-red-500/15 text-red-400 border-red-500/30",
  high: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  medium: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  low: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
  info: "bg-teal-500/15 text-teal-400 border-teal-500/30",
};

const statusStyles: Record<AnomalyStatus, string> = {
  open: "bg-red-500/10 text-red-400 border-red-500/20",
  acknowledged: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  resolved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  dismissed: "bg-zinc-800 text-zinc-500 border-zinc-700",
};

function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function formatType(type: string): string {
  return type
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function AnomaliesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState<AnomalySeverity | "all">("all");
  const [statusFilter, setStatusFilter] = useState<AnomalyStatus | "all">("all");

  const filteredAnomalies = useMemo(() => {
    return mockAnomalies.filter((a) => {
      const matchesSearch =
        searchQuery === "" ||
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.building.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.anomaly_type.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSeverity =
        severityFilter === "all" || a.severity === severityFilter;

      const matchesStatus = statusFilter === "all" || a.status === statusFilter;

      return matchesSearch && matchesSeverity && matchesStatus;
    });
  }, [searchQuery, severityFilter, statusFilter]);

  const resetFilters = () => {
    setSearchQuery("");
    setSeverityFilter("all");
    setStatusFilter("all");
  };

  // Stats
  const total = mockAnomalies.length;
  const critical = mockAnomalies.filter((a) => a.severity === "critical").length;
  const high = mockAnomalies.filter((a) => a.severity === "high").length;
  const open = mockAnomalies.filter((a) => a.status === "open").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100">Anomalies</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Detected abnormal consumption patterns across your facilities.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="md">
            <RefreshCw className="h-4 w-4" />
            Run Detection
          </Button>
          <Button variant="primary" size="md">
            Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-zinc-500" />
            <div className="text-xs uppercase tracking-wider text-zinc-500">
              Total
            </div>
          </div>
          <div className="mt-2 text-2xl font-semibold text-zinc-100">{total}</div>
        </div>
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-red-400" />
            <div className="text-xs uppercase tracking-wider text-red-400">
              Critical
            </div>
          </div>
          <div className="mt-2 text-2xl font-semibold text-red-400">{critical}</div>
        </div>
        <div className="rounded-lg border border-orange-500/20 bg-orange-500/5 p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-orange-400" />
            <div className="text-xs uppercase tracking-wider text-orange-400">
              High
            </div>
          </div>
          <div className="mt-2 text-2xl font-semibold text-orange-400">{high}</div>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-zinc-500" />
            <div className="text-xs uppercase tracking-wider text-zinc-500">
              Open
            </div>
          </div>
          <div className="mt-2 text-2xl font-semibold text-zinc-100">{open}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search anomaly, building, or type..."
              className={cn(
                "w-full rounded-md border border-zinc-800 bg-zinc-950/50 py-2 pl-10 pr-3 text-sm",
                "text-zinc-100 placeholder:text-zinc-500",
                "focus:border-teal-500/50 focus:outline-none focus:ring-1 focus:ring-teal-500/50"
              )}
            />
          </div>

          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value as AnomalySeverity | "all")}
            className={cn(
              "rounded-md border border-zinc-800 bg-zinc-950/50 px-3 py-2 text-sm",
              "text-zinc-100 focus:border-teal-500/50 focus:outline-none focus:ring-1 focus:ring-teal-500/50"
            )}
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as AnomalyStatus | "all")}
            className={cn(
              "rounded-md border border-zinc-800 bg-zinc-950/50 px-3 py-2 text-sm",
              "text-zinc-100 focus:border-teal-500/50 focus:outline-none focus:ring-1 focus:ring-teal-500/50"
            )}
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="acknowledged">Acknowledged</option>
            <option value="resolved">Resolved</option>
            <option value="dismissed">Dismissed</option>
          </select>

          <Button variant="ghost" size="md" onClick={resetFilters}>
            <Filter className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>

      {/* Anomaly list */}
      <div className="space-y-3">
        {filteredAnomalies.map((a) => (
          <div
            key={a.id}
            className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-colors hover:border-zinc-700"
          >
            <div className="flex items-start gap-4">
              {/* Severity icon */}
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border",
                  severityStyles[a.severity]
                )}
              >
                <AlertTriangle className="h-5 w-5" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="default"
                    className={severityStyles[a.severity]}
                  >
                    {a.severity.toUpperCase()}
                  </Badge>
                  <Badge variant="muted">{formatType(a.anomaly_type)}</Badge>
                  <Badge
                    variant="default"
                    className={statusStyles[a.status]}
                  >
                    {a.status}
                  </Badge>
                  <span className="text-xs text-zinc-500">
                    {formatTimestamp(a.detected_at)}
                  </span>
                </div>

                <h3 className="mt-2 text-base font-medium text-zinc-100">
                  {a.title}
                </h3>

                <div className="mt-1 text-sm text-zinc-400">
                  {a.building} · {a.location}
                </div>

                <p className="mt-2 text-sm text-zinc-500">{a.description}</p>

                {/* Metrics row */}
                <div className="mt-3 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
                  <div>
                    <div className="text-zinc-500">Expected</div>
                    <div className="font-mono text-zinc-300">
                      {a.expected_value.toLocaleString("en-IN")}
                    </div>
                  </div>
                  <div>
                    <div className="text-zinc-500">Actual</div>
                    <div className="font-mono text-zinc-300">
                      {a.actual_value.toLocaleString("en-IN")}
                    </div>
                  </div>
                  <div>
                    <div className="text-zinc-500">Deviation</div>
                    <div className="font-mono text-red-400">
                      +{a.deviation_pct.toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-zinc-500">Confidence</div>
                    <div className="font-mono text-zinc-300">
                      {(a.confidence * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {a.status === "open" && (
                    <Button variant="secondary" size="sm">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Acknowledge
                    </Button>
                  )}
                  {a.status === "acknowledged" && (
                    <Button variant="secondary" size="sm">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Mark resolved
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <XCircle className="h-3.5 w-3.5" />
                    Dismiss
                  </Button>
                  <Button variant="ghost" size="sm">
                    Investigate
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Empty state */}
        {filteredAnomalies.length === 0 && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-12 text-center">
            <AlertTriangle className="mx-auto mb-3 h-8 w-8 text-zinc-700" />
            <div className="text-sm font-medium text-zinc-300">
              No anomalies match your filters
            </div>
            <div className="mt-1 text-xs text-zinc-500">
              Try resetting the filters
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="mt-4"
              onClick={resetFilters}
            >
              Reset filters
            </Button>
          </div>
        )}
      </div>

      {/* Note */}
      <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 text-xs text-amber-400/90">
        <strong>Note:</strong> Showing mock anomaly data. Real detection results will
        come from the backend anomaly engine in a future step.
      </div>
    </div>
  );
}