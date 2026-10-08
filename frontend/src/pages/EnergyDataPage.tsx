import { useState, useMemo } from "react";
import {
  Upload,
  Download,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  Plus,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../components/ui/Table";
import { mockEnergyRecords, mockBuildings, mockCategories } from "../data/mockEnergyRecords";
import { cn } from "../lib/utils";

const ROWS_PER_PAGE = 10;

function qualityVariant(score: number): "success" | "warning" | "danger" {
  if (score >= 95) return "success";
  if (score >= 85) return "warning";
  return "danger";
}

function formatNumber(n: number, decimals = 1): string {
  return n.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function formatCurrency(n: number): string {
  return "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

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

export function EnergyDataPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [buildingFilter, setBuildingFilter] = useState("All Buildings");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter records
  const filteredRecords = useMemo(() => {
    return mockEnergyRecords.filter((r) => {
      const matchesSearch =
        searchQuery === "" ||
        r.building.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesBuilding =
        buildingFilter === "All Buildings" || r.building === buildingFilter;

      const matchesCategory =
        categoryFilter === "All Categories" || r.category === categoryFilter;

      return matchesSearch && matchesBuilding && matchesCategory;
    });
  }, [searchQuery, buildingFilter, categoryFilter]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / ROWS_PER_PAGE));
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const paginatedRecords = filteredRecords.slice(
    startIndex,
    startIndex + ROWS_PER_PAGE
  );

  const resetFilters = () => {
    setSearchQuery("");
    setBuildingFilter("All Buildings");
    setCategoryFilter("All Categories");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100">Energy Data</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Browse, filter, and manage all energy records across your organization.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="md">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="primary" size="md">
            <Plus className="h-4 w-4" />
            Import Data
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
          <div className="text-xs uppercase tracking-wider text-zinc-500">
            Total Records
          </div>
          <div className="mt-1 text-xl font-semibold text-zinc-100">
            {filteredRecords.length.toLocaleString("en-IN")}
          </div>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
          <div className="text-xs uppercase tracking-wider text-zinc-500">
            Total Energy
          </div>
          <div className="mt-1 text-xl font-semibold text-zinc-100">
            {formatNumber(filteredRecords.reduce((s, r) => s + r.energy_kwh, 0))} kWh
          </div>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
          <div className="text-xs uppercase tracking-wider text-zinc-500">
            Total Cost
          </div>
          <div className="mt-1 text-xl font-semibold text-zinc-100">
            {formatCurrency(filteredRecords.reduce((s, r) => s + r.cost, 0))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search building, location, or category..."
              className={cn(
                "w-full rounded-md border border-zinc-800 bg-zinc-950/50 py-2 pl-10 pr-3 text-sm",
                "text-zinc-100 placeholder:text-zinc-500",
                "focus:border-teal-500/50 focus:outline-none focus:ring-1 focus:ring-teal-500/50"
              )}
            />
          </div>

          {/* Building filter */}
          <select
            value={buildingFilter}
            onChange={(e) => {
              setBuildingFilter(e.target.value);
              setCurrentPage(1);
            }}
            className={cn(
              "rounded-md border border-zinc-800 bg-zinc-950/50 px-3 py-2 text-sm",
              "text-zinc-100",
              "focus:border-teal-500/50 focus:outline-none focus:ring-1 focus:ring-teal-500/50"
            )}
          >
            {mockBuildings.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>

          {/* Category filter */}
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className={cn(
              "rounded-md border border-zinc-800 bg-zinc-950/50 px-3 py-2 text-sm",
              "text-zinc-100",
              "focus:border-teal-500/50 focus:outline-none focus:ring-1 focus:ring-teal-500/50"
            )}
          >
            {mockCategories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <Button variant="ghost" size="md" onClick={resetFilters}>
            <Filter className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Building / Location</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Energy (kWh)</TableHead>
              <TableHead className="text-right">Power (kW)</TableHead>
              <TableHead className="text-right">Cost</TableHead>
              <TableHead className="text-right">CO₂ (kg)</TableHead>
              <TableHead>Quality</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRecords.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="whitespace-nowrap text-zinc-400">
                  {formatTimestamp(r.timestamp)}
                </TableCell>
                <TableCell>
                  <div className="font-medium text-zinc-200">{r.building}</div>
                  <div className="text-xs text-zinc-500">{r.location}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="muted">{r.source}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="info">{r.category}</Badge>
                </TableCell>
                <TableCell className="text-right font-mono text-zinc-200">
                  {formatNumber(r.energy_kwh)}
                </TableCell>
                <TableCell className="text-right font-mono text-zinc-400">
                  {formatNumber(r.power_kw)}
                </TableCell>
                <TableCell className="text-right font-mono text-zinc-200">
                  {formatCurrency(r.cost)}
                </TableCell>
                <TableCell className="text-right font-mono text-zinc-400">
                  {formatNumber(r.carbon_kg)}
                </TableCell>
                <TableCell>
                  <Badge variant={qualityVariant(r.quality_score)}>
                    {r.quality_score}
                  </Badge>
                </TableCell>
                <TableCell>
                  <button className="rounded p-1 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-teal-400">
                    <Eye className="h-4 w-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Empty state */}
        {paginatedRecords.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Search className="mb-3 h-8 w-8 text-zinc-700" />
            <div className="text-sm font-medium text-zinc-300">
              No records match your filters
            </div>
            <div className="mt-1 text-xs text-zinc-500">
              Try adjusting or resetting your filters
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

        {/* Pagination */}
        {paginatedRecords.length > 0 && (
          <div className="flex items-center justify-between border-t border-zinc-800 px-4 py-3">
            <div className="text-xs text-zinc-500">
              Showing <span className="text-zinc-300">{startIndex + 1}</span>–
              <span className="text-zinc-300">
                {Math.min(startIndex + ROWS_PER_PAGE, filteredRecords.length)}
              </span>{" "}
              of <span className="text-zinc-300">{filteredRecords.length}</span>{" "}
              records
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="text-xs text-zinc-400">
                Page <span className="text-zinc-200">{currentPage}</span> of{" "}
                <span className="text-zinc-200">{totalPages}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Note */}
      <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 text-xs text-amber-400/90">
        <strong>Note:</strong> Displaying mock data for layout demonstration. Real
        API integration will replace this in a future step.
      </div>
    </div>
  );
}