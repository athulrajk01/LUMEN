import { useState, useMemo } from "react";
import {
  Lightbulb,
  Search,
  Filter,
  Sparkles,
  TrendingUp,
  Wrench,
  Leaf,
  Zap,
  DollarSign,
  CheckCircle2,
  Clock,
  XCircle,
  ChevronRight,
  Target,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { mockRecommendations } from "../data/mockRecommendations";
import { cn } from "../lib/utils";
import type {
  RecommendationCategory,
  RecommendationDifficulty,
  RecommendationPriority,
  RecommendationTier,
} from "../types/recommendation";

const priorityStyles: Record<RecommendationPriority, string> = {
  high: "bg-red-500/15 text-red-400 border-red-500/30",
  medium: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  low: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
};

const difficultyStyles: Record<RecommendationDifficulty, string> = {
  easy: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  medium: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  hard: "bg-rose-500/15 text-rose-400 border-rose-500/30",
};

const categoryLabels: Record<RecommendationCategory, string> = {
  load_shifting: "Load Shifting",
  tariff: "Tariff",
  maintenance: "Maintenance",
  carbon: "Carbon",
  efficiency: "Efficiency",
};

const categoryIcons: Record<RecommendationCategory, typeof Zap> = {
  load_shifting: TrendingUp,
  tariff: DollarSign,
  maintenance: Wrench,
  carbon: Leaf,
  efficiency: Zap,
};

const tierTabs: Array<{ value: RecommendationTier | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "quick_win", label: "Quick Wins" },
  { value: "medium_term", label: "Medium-term" },
  { value: "strategic", label: "Strategic" },
];

function formatCurrency(n: number): string {
  return "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

export function RecommendationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState<RecommendationTier | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<
    RecommendationCategory | "all"
  >("all");
  const [sortBy, setSortBy] = useState<"savings" | "priority" | "difficulty">(
    "savings"
  );

  const filteredRecommendations = useMemo(() => {
    let list = mockRecommendations.filter((r) => {
      const matchesSearch =
        searchQuery === "" ||
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.building &&
          r.building.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTier = tierFilter === "all" || r.tier === tierFilter;
      const matchesCategory =
        categoryFilter === "all" || r.category === categoryFilter;

      return matchesSearch && matchesTier && matchesCategory;
    });

    // Sort
    const priorityRank: Record<RecommendationPriority, number> = {
      high: 0,
      medium: 1,
      low: 2,
    };
    const difficultyRank: Record<RecommendationDifficulty, number> = {
      easy: 0,
      medium: 1,
      hard: 2,
    };

    if (sortBy === "savings") {
      list = list.sort((a, b) => b.cost_saving - a.cost_saving);
    } else if (sortBy === "priority") {
      list = list.sort(
        (a, b) => priorityRank[a.priority] - priorityRank[b.priority]
      );
    } else if (sortBy === "difficulty") {
      list = list.sort(
        (a, b) => difficultyRank[a.difficulty] - difficultyRank[b.difficulty]
      );
    }

    return list;
  }, [searchQuery, tierFilter, categoryFilter, sortBy]);

  // Stats
  const total = mockRecommendations.length;
  const quickWins = mockRecommendations.filter((r) => r.tier === "quick_win")
    .length;
  const mediumTerm = mockRecommendations.filter((r) => r.tier === "medium_term")
    .length;
  const strategic = mockRecommendations.filter((r) => r.tier === "strategic")
    .length;
  const totalSavings = mockRecommendations.reduce(
    (s, r) => s + r.cost_saving,
    0
  );

  const resetFilters = () => {
    setSearchQuery("");
    setTierFilter("all");
    setCategoryFilter("all");
    setSortBy("savings");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100">
            Recommendations
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            AI-generated actions to reduce cost, energy, peak, and carbon.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="md">
            Export
          </Button>
          <Button variant="primary" size="md">
            <Sparkles className="h-4 w-4" />
            Generate New
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
          <div className="text-xs uppercase tracking-wider text-zinc-500">
            Total
          </div>
          <div className="mt-1 text-2xl font-semibold text-zinc-100">
            {total}
          </div>
        </div>
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
          <div className="text-xs uppercase tracking-wider text-emerald-400">
            Quick Wins
          </div>
          <div className="mt-1 text-2xl font-semibold text-emerald-400">
            {quickWins}
          </div>
        </div>
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
          <div className="text-xs uppercase tracking-wider text-amber-400">
            Medium-term
          </div>
          <div className="mt-1 text-2xl font-semibold text-amber-400">
            {mediumTerm}
          </div>
        </div>
        <div className="rounded-lg border border-teal-500/20 bg-teal-500/5 p-4">
          <div className="text-xs uppercase tracking-wider text-teal-400">
            Strategic
          </div>
          <div className="mt-1 text-2xl font-semibold text-teal-400">
            {strategic}
          </div>
        </div>
        <div className="rounded-lg border border-teal-500/30 bg-teal-500/10 p-4">
          <div className="text-xs uppercase tracking-wider text-teal-400">
            Total Potential
          </div>
          <div className="mt-1 text-2xl font-semibold text-teal-400">
            {formatCurrency(totalSavings)}
          </div>
          <div className="text-xs text-zinc-500">per month</div>
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
              placeholder="Search recommendation, building, or issue..."
              className={cn(
                "w-full rounded-md border border-zinc-800 bg-zinc-950/50 py-2 pl-10 pr-3 text-sm",
                "text-zinc-100 placeholder:text-zinc-500",
                "focus:border-teal-500/50 focus:outline-none focus:ring-1 focus:ring-teal-500/50"
              )}
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(
                e.target.value as RecommendationCategory | "all"
              )
            }
            className={cn(
              "rounded-md border border-zinc-800 bg-zinc-950/50 px-3 py-2 text-sm",
              "text-zinc-100 focus:border-teal-500/50 focus:outline-none"
            )}
          >
            <option value="all">All Categories</option>
            <option value="load_shifting">Load Shifting</option>
            <option value="tariff">Tariff</option>
            <option value="maintenance">Maintenance</option>
            <option value="carbon">Carbon</option>
            <option value="efficiency">Efficiency</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "savings" | "priority" | "difficulty")
            }
            className={cn(
              "rounded-md border border-zinc-800 bg-zinc-950/50 px-3 py-2 text-sm",
              "text-zinc-100 focus:border-teal-500/50 focus:outline-none"
            )}
          >
            <option value="savings">Sort: Highest Savings</option>
            <option value="priority">Sort: Priority</option>
            <option value="difficulty">Sort: Easiest First</option>
          </select>

          <Button variant="ghost" size="md" onClick={resetFilters}>
            <Filter className="h-4 w-4" />
            Reset
          </Button>
        </div>

        {/* Tier tabs */}
        <div className="mt-3 flex flex-wrap gap-2">
          {tierTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setTierFilter(tab.value)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                tierFilter === tab.value
                  ? "bg-teal-500/10 text-teal-400 border border-teal-500/30"
                  : "text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-200"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recommendations list */}
      <div className="space-y-3">
        {filteredRecommendations.map((rec) => {
          const Icon = categoryIcons[rec.category];
          return (
            <div
              key={rec.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-colors hover:border-zinc-700"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-500/10 text-teal-400">
                  <Icon className="h-5 w-5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Badges row */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="default"
                      className={priorityStyles[rec.priority]}
                    >
                      {rec.priority.toUpperCase()} PRIORITY
                    </Badge>
                    <Badge variant="info">
                      {categoryLabels[rec.category]}
                    </Badge>
                    <Badge
                      variant="default"
                      className={difficultyStyles[rec.difficulty]}
                    >
                      {rec.difficulty}
                    </Badge>
                    {rec.building && (
                      <span className="text-xs text-zinc-500">
                        · {rec.building}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="mt-2 text-base font-medium text-zinc-100">
                    {rec.title}
                  </h3>

                  {/* Problem */}
                  <div className="mt-3 space-y-2 text-sm">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        Problem
                      </span>
                      <p className="mt-0.5 text-zinc-400">{rec.problem}</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        Evidence
                      </span>
                      <p className="mt-0.5 text-zinc-500">{rec.evidence}</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-teal-500">
                        Recommended Action
                      </span>
                      <p className="mt-0.5 text-zinc-300">{rec.action}</p>
                    </div>
                  </div>

                  {/* Impact pills */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {rec.energy_saving_pct > 0 && (
                      <div className="flex items-center gap-1.5 rounded-md border border-teal-500/20 bg-teal-500/5 px-2.5 py-1 text-xs">
                        <Zap className="h-3 w-3 text-teal-400" />
                        <span className="text-zinc-400">Energy</span>
                        <span className="font-mono font-medium text-teal-400">
                          −{rec.energy_saving_pct.toFixed(1)}%
                        </span>
                      </div>
                    )}
                    {rec.cost_saving > 0 && (
                      <div className="flex items-center gap-1.5 rounded-md border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1 text-xs">
                        <DollarSign className="h-3 w-3 text-emerald-400" />
                        <span className="text-zinc-400">Cost</span>
                        <span className="font-mono font-medium text-emerald-400">
                          {formatCurrency(rec.cost_saving)}/mo
                        </span>
                      </div>
                    )}
                    {rec.carbon_saving_kg > 0 && (
                      <div className="flex items-center gap-1.5 rounded-md border border-green-500/20 bg-green-500/5 px-2.5 py-1 text-xs">
                        <Leaf className="h-3 w-3 text-green-400" />
                        <span className="text-zinc-400">CO₂</span>
                        <span className="font-mono font-medium text-green-400">
                          −{rec.carbon_saving_kg.toLocaleString("en-IN")} kg/mo
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-950/50 px-2.5 py-1 text-xs">
                      <Target className="h-3 w-3 text-zinc-500" />
                      <span className="text-zinc-500">Confidence</span>
                      <span className="font-mono text-zinc-300">
                        {(rec.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Button variant="primary" size="sm">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Implement
                    </Button>
                    <Button variant="secondary" size="sm">
                      <Clock className="h-3.5 w-3.5" />
                      Snooze
                    </Button>
                    <Button variant="ghost" size="sm">
                      <XCircle className="h-3.5 w-3.5" />
                      Dismiss
                    </Button>
                    <Button variant="ghost" size="sm">
                      View details
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredRecommendations.length === 0 && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-12 text-center">
            <Lightbulb className="mx-auto mb-3 h-8 w-8 text-zinc-700" />
            <div className="text-sm font-medium text-zinc-300">
              No recommendations match your filters
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
        <strong>Note:</strong> Recommendations are mock data for demonstration.
        Real recommendations will be generated from anomaly, optimization, and
        cost analysis engines.
      </div>
    </div>
  );
}