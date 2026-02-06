import { useState, useMemo } from "react";
import {
  startOfDay,
  endOfDay,
  subDays,
  startOfWeek,
  startOfMonth,
  format,
  isWithinInterval,
  isSameDay,
  isBefore,
  isAfter,
} from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface DateRange {
  from: Date;
  to: Date;
}

type PresetKey =
  | "custom"
  | "today"
  | "yesterday"
  | "last_7"
  | "last_30"
  | "last_90"
  | "week_to_date"
  | "month_to_date";

interface Preset {
  key: PresetKey;
  label: string;
  getRange: () => DateRange;
}

const presets: Preset[] = [
  { key: "custom", label: "Custom", getRange: () => ({ from: subDays(new Date(), 30), to: new Date() }) },
  { key: "today", label: "Today", getRange: () => ({ from: startOfDay(new Date()), to: endOfDay(new Date()) }) },
  { key: "yesterday", label: "Yesterday", getRange: () => ({ from: startOfDay(subDays(new Date(), 1)), to: endOfDay(subDays(new Date(), 1)) }) },
  { key: "last_7", label: "Last 7 days", getRange: () => ({ from: startOfDay(subDays(new Date(), 6)), to: endOfDay(new Date()) }) },
  { key: "last_30", label: "Last 30 days", getRange: () => ({ from: startOfDay(subDays(new Date(), 29)), to: endOfDay(new Date()) }) },
  { key: "last_90", label: "Last 90 days", getRange: () => ({ from: startOfDay(subDays(new Date(), 89)), to: endOfDay(new Date()) }) },
  { key: "week_to_date", label: "Week to date", getRange: () => ({ from: startOfWeek(new Date(), { weekStartsOn: 0 }), to: endOfDay(new Date()) }) },
  { key: "month_to_date", label: "Month to date", getRange: () => ({ from: startOfMonth(new Date()), to: endOfDay(new Date()) }) },
];

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  className?: string;
}

export function DateRangePicker({ value, onChange, className }: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [activePreset, setActivePreset] = useState<PresetKey>("last_30");
  const [viewMonth, setViewMonth] = useState(new Date());
  const [draftFrom, setDraftFrom] = useState<Date | null>(value.from);
  const [draftTo, setDraftTo] = useState<Date | null>(value.to);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [selectingEnd, setSelectingEnd] = useState(false);

  const displayText = useMemo(() => {
    const f = value.from;
    const t = value.to;
    if (isSameDay(f, t)) return format(f, "MMM d, yyyy");
    if (f.getFullYear() === t.getFullYear()) {
      return `${format(f, "MMM d")} – ${format(t, "MMM d, yyyy")}`;
    }
    return `${format(f, "MMM d, yyyy")} – ${format(t, "MMM d, yyyy")}`;
  }, [value]);

  // Calendar grid
  const calendarDays = useMemo(() => {
    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startPad = firstDay.getDay();
    const days: { date: Date; isCurrentMonth: boolean }[] = [];

    // Pad before
    for (let i = startPad - 1; i >= 0; i--) {
      days.push({ date: subDays(firstDay, i + 1), isCurrentMonth: false });
    }
    // Current month
    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push({ date: new Date(year, month, d), isCurrentMonth: true });
    }
    // Pad after to fill 6 rows
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }
    return days;
  }, [viewMonth]);

  const handlePresetClick = (preset: Preset) => {
    setActivePreset(preset.key);
    if (preset.key !== "custom") {
      const range = preset.getRange();
      setDraftFrom(range.from);
      setDraftTo(range.to);
      setSelectingEnd(false);
      setViewMonth(range.from);
    } else {
      setSelectingEnd(false);
    }
  };

  const handleDayClick = (date: Date) => {
    setActivePreset("custom");
    if (!selectingEnd || !draftFrom) {
      setDraftFrom(date);
      setDraftTo(null);
      setSelectingEnd(true);
    } else {
      if (isBefore(date, draftFrom)) {
        setDraftTo(draftFrom);
        setDraftFrom(date);
      } else {
        setDraftTo(date);
      }
      setSelectingEnd(false);
    }
  };

  const isInRange = (date: Date): boolean => {
    const from = draftFrom;
    const to = draftTo ?? (selectingEnd && hoverDate ? hoverDate : null);
    if (!from || !to) return false;
    const start = isBefore(from, to) ? from : to;
    const end = isAfter(from, to) ? from : to;
    return isWithinInterval(date, { start: startOfDay(start), end: endOfDay(end) });
  };

  const isStart = (date: Date): boolean => !!draftFrom && isSameDay(date, draftFrom);
  const isEnd = (date: Date): boolean => {
    const end = draftTo ?? (selectingEnd && hoverDate ? hoverDate : null);
    return !!end && isSameDay(date, end);
  };

  const handleApply = () => {
    if (draftFrom && draftTo) {
      const from = isBefore(draftFrom, draftTo) ? draftFrom : draftTo;
      const to = isAfter(draftFrom, draftTo) ? draftFrom : draftTo;
      onChange({ from: startOfDay(from), to: endOfDay(to) });
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setDraftFrom(value.from);
    setDraftTo(value.to);
    setSelectingEnd(false);
    setOpen(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setDraftFrom(value.from);
      setDraftTo(value.to);
      setSelectingEnd(false);
      setViewMonth(value.from);
    }
    setOpen(isOpen);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn("gap-2 h-9 px-3 text-xs", className)}
        >
          <CalendarIcon className="h-3.5 w-3.5" />
          {displayText}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-auto p-0" sideOffset={4}>
        <div className="flex">
          {/* ── Left Panel: Presets ── */}
          <div className="w-[160px] border-r border-border py-2">
            {presets.map((preset) => (
              <button
                key={preset.key}
                onClick={() => handlePresetClick(preset)}
                className={cn(
                  "w-full text-left px-4 py-1.5 text-xs transition-colors",
                  activePreset === preset.key
                    ? "bg-muted font-medium text-foreground border-l-2 border-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border-l-2 border-transparent"
                )}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* ── Right Panel: Calendar ── */}
          <div className="p-3 w-[280px]">
            {/* Date inputs */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 px-3 py-1.5 border border-border rounded-[10px] text-xs text-center bg-background tabular-nums">
                {draftFrom ? format(draftFrom, "MMM d, yyyy") : "Start date"}
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <div className="flex-1 px-3 py-1.5 border border-border rounded-[10px] text-xs text-center bg-background tabular-nums">
                {draftTo ? format(draftTo, "MMM d, yyyy") : "End date"}
              </div>
            </div>

            {/* Month header */}
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))}
                className="h-7 w-7 flex items-center justify-center rounded-[10px] hover:bg-muted transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm font-medium">
                {format(viewMonth, "MMMM yyyy")}
              </span>
              <button
                onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))}
                className="h-7 w-7 flex items-center justify-center rounded-[10px] hover:bg-muted transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-1">
              {DAYS.map((d) => (
                <div key={d} className="h-8 flex items-center justify-center text-[11px] text-muted-foreground font-medium">
                  {d}
                </div>
              ))}
            </div>

            {/* Day grid */}
            <div className="grid grid-cols-7">
              {calendarDays.map(({ date, isCurrentMonth }, i) => {
                const inRange = isInRange(date);
                const start = isStart(date);
                const end = isEnd(date);
                const isEndpoint = start || end;

                return (
                  <div
                    key={i}
                    className={cn(
                      "h-8 flex items-center justify-center relative",
                      inRange && !isEndpoint && "bg-accent",
                      start && draftTo && "bg-gradient-to-r from-transparent to-accent",
                      end && draftFrom && "bg-gradient-to-l from-transparent to-accent",
                      start && end && "bg-transparent"
                    )}
                  >
                    <button
                      onClick={() => handleDayClick(date)}
                      onMouseEnter={() => setHoverDate(date)}
                      onMouseLeave={() => setHoverDate(null)}
                      className={cn(
                        "h-7 w-7 rounded-full text-xs transition-colors",
                        !isCurrentMonth && "text-muted-foreground/40",
                        isCurrentMonth && !isEndpoint && "hover:bg-muted",
                        isEndpoint && "bg-foreground text-background font-medium",
                        isSameDay(date, new Date()) && !isEndpoint && "font-semibold"
                      )}
                    >
                      {date.getDate()}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 mt-3 pt-3 border-t border-border">
              <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                size="sm"
                className="h-8 text-xs"
                onClick={handleApply}
                disabled={!draftFrom || !draftTo}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
