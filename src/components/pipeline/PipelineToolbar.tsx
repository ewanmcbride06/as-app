import { Filter, Calendar, ChevronDown, Columns, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface PipelineToolbarProps {
  totalCount: number;
  selectedCount: number;
  onClearSelection: () => void;
}

const columnOptions = [
  "Date",
  "Invitee",
  "Lead Status",
  "Call Status",
  "Taken",
  "Billing",
  "Time",
  "Details",
];

export function PipelineToolbar({
  totalCount,
  selectedCount,
  onClearSelection,
}: PipelineToolbarProps) {
  return (
    <div className="space-y-0">
      {/* Main Toolbar */}
      <div className="border-b border-border px-4 py-2.5 flex items-center justify-between bg-background shrink-0">
        <span className="text-sm text-muted-foreground">
          Showing{" "}
          <strong className="text-foreground">{totalCount}</strong>{" "}
          meetings
        </span>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 h-8 text-xs">
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
              <Button variant="outline" size="sm" className="gap-2 h-8 text-xs">
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

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 h-8 text-xs">
                <Columns className="h-3.5 w-3.5" />
                Columns
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48">
              <div className="space-y-2">
                {columnOptions.map((col) => (
                  <label
                    key={col}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <Checkbox defaultChecked />
                    {col}
                  </label>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Button size="sm" variant="outline" className="gap-2 h-8 text-xs">
            <Plus className="h-3.5 w-3.5" />
            Payout
          </Button>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedCount > 0 && (
        <div className="border-b border-border px-4 py-2.5 bg-muted/40 flex items-center gap-3 shrink-0">
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
