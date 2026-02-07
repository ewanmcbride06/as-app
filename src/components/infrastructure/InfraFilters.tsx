import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, X } from "lucide-react";

// ── Filter state types ──

export interface VolumeFilter {
  emailsSent: string; // filter mailboxes where sendingVolumeCurrent <= this value
}

export interface RangeFilter {
  min: string;
  max: string;
}

export interface DurationFilter {
  preset: "all" | "gte14" | "lt14" | "custom";
  customDays: string;
}

export const defaultVolumeFilter: VolumeFilter = { emailsSent: "" };
export const defaultRangeFilter: RangeFilter = { min: "", max: "" };
export const defaultDurationFilter: DurationFilter = { preset: "all", customDays: "" };

// ── Matching helpers ──

export function matchesVolumeFilter(filter: VolumeFilter, current: number) {
  if (!filter.emailsSent) return true;
  const val = parseFloat(filter.emailsSent);
  if (isNaN(val)) return true;
  return current >= val;
}

export function matchesRangeFilter(filter: RangeFilter, value: number) {
  if (filter.min) {
    const min = parseFloat(filter.min);
    if (!isNaN(min) && value < min) return false;
  }
  if (filter.max) {
    const max = parseFloat(filter.max);
    if (!isNaN(max) && value > max) return false;
  }
  return true;
}

export function matchesDurationFilter(filter: DurationFilter, days: number) {
  if (filter.preset === "all") return true;
  if (filter.preset === "gte14") return days >= 14;
  if (filter.preset === "lt14") return days < 14;
  if (filter.preset === "custom") {
    const val = parseFloat(filter.customDays);
    if (isNaN(val)) return true;
    return days >= val;
  }
  return true;
}

export function isVolumeActive(f: VolumeFilter) { return !!f.emailsSent; }
export function isRangeActive(f: RangeFilter) { return !!f.min || !!f.max; }
export function isDurationActive(f: DurationFilter) { return f.preset !== "all"; }

// ── Shared filter shell ──

interface FilterPopoverProps {
  label: string;
  active: boolean;
  onClear: () => void;
  children: React.ReactNode;
}

function FilterPopover({ label, active, onClear, children }: FilterPopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="relative flex items-center shrink-0">
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "h-9 px-3 text-xs gap-1.5 shrink-0",
              active && "border-foreground/30 pr-7"
            )}
          >
            {label}
            {!active && (
              <ChevronDown className="h-3 w-3 ml-0.5 text-muted-foreground" />
            )}
          </Button>
        </PopoverTrigger>
        {active && (
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-sm text-muted-foreground hover:text-foreground z-10"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onClear();
              setOpen(false);
            }}
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
      <PopoverContent align="end" className="w-[220px] p-3" sideOffset={4}>
        {children}
      </PopoverContent>
    </Popover>
  );
}

// ── Volume Filter ──

interface VolumeFilterPopoverProps {
  value: VolumeFilter;
  onChange: (v: VolumeFilter) => void;
}

export function VolumeFilterPopover({ value, onChange }: VolumeFilterPopoverProps) {
  return (
    <FilterPopover
      label={value.emailsSent ? `Vol ≥ ${value.emailsSent}` : "Volume"}
      active={isVolumeActive(value)}
      onClear={() => onChange(defaultVolumeFilter)}
    >
      <div className="space-y-2">
        <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
          Min. Emails Sent
        </label>
        <Input
          type="number"
          placeholder="e.g. 3"
          className="h-8 text-xs"
          value={value.emailsSent}
          onChange={(e) => onChange({ emailsSent: e.target.value })}
          min={0}
        />
        <p className="text-[11px] text-muted-foreground">
          Show mailboxes sending at least this many emails
        </p>
      </div>
    </FilterPopover>
  );
}

// ── Range Filter (Reply Rate / Bounce Rate) ──

interface RangeFilterPopoverProps {
  label: string;
  value: RangeFilter;
  onChange: (v: RangeFilter) => void;
  unit?: string;
}

export function RangeFilterPopover({ label, value, onChange, unit = "%" }: RangeFilterPopoverProps) {
  const displayLabel = isRangeActive(value)
    ? `${label} ${value.min || "0"}–${value.max || "∞"}${unit}`
    : label;

  return (
    <FilterPopover
      label={displayLabel}
      active={isRangeActive(value)}
      onClear={() => onChange(defaultRangeFilter)}
    >
      <div className="space-y-3">
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Min {unit}
          </label>
          <Input
            type="number"
            placeholder="0"
            className="h-8 text-xs"
            value={value.min}
            onChange={(e) => onChange({ ...value, min: e.target.value })}
            min={0}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Max {unit}
          </label>
          <Input
            type="number"
            placeholder="∞"
            className="h-8 text-xs"
            value={value.max}
            onChange={(e) => onChange({ ...value, max: e.target.value })}
            min={0}
          />
        </div>
      </div>
    </FilterPopover>
  );
}

// ── Duration Filter ──

interface DurationFilterPopoverProps {
  value: DurationFilter;
  onChange: (v: DurationFilter) => void;
}

export function DurationFilterPopover({ value, onChange }: DurationFilterPopoverProps) {
  const displayLabel =
    value.preset === "gte14" ? "≥ 14 Days"
    : value.preset === "lt14" ? "< 14 Days"
    : value.preset === "custom" && value.customDays ? `≥ ${value.customDays} Days`
    : "Duration";

  return (
    <FilterPopover
      label={displayLabel}
      active={isDurationActive(value)}
      onClear={() => onChange(defaultDurationFilter)}
    >
      <div className="space-y-2">
        <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
          Preset
        </label>
        <div className="flex flex-col gap-1">
          {([
            { key: "all" as const, label: "All" },
            { key: "gte14" as const, label: "≥ 14 Days" },
            { key: "lt14" as const, label: "< 14 Days" },
            { key: "custom" as const, label: "Custom" },
          ]).map((opt) => (
            <button
              key={opt.key}
              onClick={() => onChange({ ...value, preset: opt.key, customDays: opt.key !== "custom" ? "" : value.customDays })}
              className={cn(
                "text-left px-2.5 py-1.5 rounded-[10px] text-xs transition-colors",
                value.preset === opt.key
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {value.preset === "custom" && (
          <div className="space-y-1.5 pt-1 border-t border-border">
            <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              Min. Days
            </label>
            <Input
              type="number"
              placeholder="e.g. 21"
              className="h-8 text-xs"
              value={value.customDays}
              onChange={(e) => onChange({ ...value, customDays: e.target.value })}
              min={0}
            />
          </div>
        )}
      </div>
    </FilterPopover>
  );
}
