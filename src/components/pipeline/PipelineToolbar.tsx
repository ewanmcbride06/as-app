import { Filter, Calendar, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LeadStatus } from "./types";
import { cn } from "@/lib/utils";

export type DateFilter = "all" | "today" | "this_week" | "this_month";
export type LeadFilter = "all" | LeadStatus;

const leadFilterOptions: { label: string; value: LeadFilter }[] = [
  { label: "All Statuses", value: "all" },
  { label: "Potential", value: "Potential" },
  { label: "Qualified", value: "Qualified" },
  { label: "Not Qualified", value: "Not Qualified" },
  { label: "Won", value: "Won" },
  { label: "Lost - Not Interest", value: "Lost - Not Interest" },
  { label: "Lost - Failed To Close", value: "Lost - Failed To Close" },
];

const dateFilterOptions: { label: string; value: DateFilter }[] = [
  { label: "All Time", value: "all" },
  { label: "Today", value: "today" },
  { label: "This Week", value: "this_week" },
  { label: "This Month", value: "this_month" },
];

interface PipelineToolbarProps {
  totalCount: number;
  selectedCount: number;
  onClearSelection: () => void;
  leadFilter: LeadFilter;
  dateFilter: DateFilter;
  onLeadFilterChange: (value: LeadFilter) => void;
  onDateFilterChange: (value: DateFilter) => void;
}

export function PipelineToolbar({
  totalCount,
  selectedCount,
  onClearSelection,
  leadFilter,
  dateFilter,
  onLeadFilterChange,
  onDateFilterChange,
}: PipelineToolbarProps) {
  const hasActiveFilters = leadFilter !== "all" || dateFilter !== "all";

  return (
    <div className="space-y-0 shrink-0">
      {/* Main Toolbar */}
      <div className="px-4 py-2.5 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Showing{" "}
          <strong className="text-foreground">{totalCount}</strong>{" "}
          meetings
        </span>

        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
              onClick={() => {
                onLeadFilterChange("all");
                onDateFilterChange("all");
              }}
            >
              <X className="h-3 w-3 mr-1" />
              Clear filters
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "gap-2 h-8 px-3 text-xs",
                  leadFilter !== "all" && "border-foreground/30"
                )}
              >
                <Filter className="h-3.5 w-3.5" />
                {leadFilter === "all" ? "Lead Status" : leadFilter}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[180px]">
              {leadFilterOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => onLeadFilterChange(option.value)}
                  className={cn(
                    "cursor-pointer text-sm",
                    leadFilter === option.value && "bg-muted font-medium"
                  )}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "gap-2 h-8 px-3 text-xs",
                  dateFilter !== "all" && "border-foreground/30"
                )}
              >
                <Calendar className="h-3.5 w-3.5" />
                {dateFilterOptions.find((o) => o.value === dateFilter)?.label}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[150px]">
              {dateFilterOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => onDateFilterChange(option.value)}
                  className={cn(
                    "cursor-pointer text-sm",
                    dateFilter === option.value && "bg-muted font-medium"
                  )}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedCount > 0 && (
        <div className="px-4 py-2.5 bg-muted/40 border-t border-border flex items-center gap-3">
          <span className="text-xs font-medium">
            {selectedCount} selected
          </span>
          <Button size="sm" variant="outline" className="h-7 text-xs">
            Update Status
          </Button>
          <Button size="sm" variant="outline" className="h-7 text-xs">
            Export CSV
          </Button>
          <Button size="sm" variant="outline" className="h-7 text-xs">
            Mark as Billed
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-7 text-xs"
            onClick={onClearSelection}
          >
            Clear
          </Button>
        </div>
      )}
    </div>
  );
}
