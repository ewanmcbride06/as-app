import { Filter, Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PipelineToolbarProps {
  totalCount: number;
  selectedCount: number;
  onClearSelection: () => void;
}

export function PipelineToolbar({
  totalCount,
  selectedCount,
  onClearSelection,
}: PipelineToolbarProps) {
  return (
    <div className="space-y-0 shrink-0">
      {/* Main Toolbar */}
      <div className="px-3 py-2.5 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Showing{" "}
          <strong className="text-foreground">{totalCount}</strong>{" "}
          meetings
        </span>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 h-8 px-3 text-xs">
                <Filter className="h-3.5 w-3.5" />
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All Statuses</DropdownMenuItem>
              <DropdownMenuItem>Potential Only</DropdownMenuItem>
              <DropdownMenuItem>Qualified Only</DropdownMenuItem>
              <DropdownMenuItem>Won Deals</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 h-8 px-3 text-xs">
                <Calendar className="h-3.5 w-3.5" />
                All Time
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Today</DropdownMenuItem>
              <DropdownMenuItem>This Week</DropdownMenuItem>
              <DropdownMenuItem>This Month</DropdownMenuItem>
              <DropdownMenuItem>All Time</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedCount > 0 && (
        <div className="px-3 py-2.5 bg-muted/40 border-t border-border flex items-center gap-3">
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
