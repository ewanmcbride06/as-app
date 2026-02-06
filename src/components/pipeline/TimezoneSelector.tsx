import { useState, useMemo } from "react";
import { Globe, Search, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { timezones, findTimezoneOption, type TimezoneOption } from "./timezones";

interface TimezoneSelectorProps {
  value: string;
  onChange: (tz: string) => void;
}

export function TimezoneSelector({ value, onChange }: TimezoneSelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selected = findTimezoneOption(value);

  const filtered = useMemo(() => {
    if (!search.trim()) return timezones;
    const q = search.toLowerCase();
    return timezones.filter(
      (tz) =>
        tz.label.toLowerCase().includes(q) ||
        tz.value.toLowerCase().includes(q) ||
        tz.offset.toLowerCase().includes(q)
    );
  }, [search]);

  const handleSelect = (tz: TimezoneOption) => {
    onChange(tz.value);
    setOpen(false);
    setSearch("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 h-9 px-3 text-xs"
        >
          <Globe className="h-3.5 w-3.5" />
          <span>{selected.flag}</span>
          <span className="max-w-[120px] truncate">{selected.label}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[320px] p-0" sideOffset={4}>
        {/* Search */}
        <div className="p-2 border-b border-border">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search timezones..."
              className="pl-8 h-8 text-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        {/* List */}
        <div className="max-h-[280px] overflow-y-auto scrollbar-hide">
          {filtered.length === 0 ? (
            <div className="px-3 py-4 text-center text-xs text-muted-foreground">
              No timezones found
            </div>
          ) : (
            filtered.map((tz) => (
              <button
                key={tz.value}
                onClick={() => handleSelect(tz)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs hover:bg-muted transition-colors",
                  value === tz.value && "bg-muted font-medium"
                )}
              >
                <span className="text-base leading-none">{tz.flag}</span>
                <span className="flex-1 truncate">{tz.label}</span>
                <span className="text-muted-foreground text-[10px] tabular-nums shrink-0">
                  {tz.offset}
                </span>
                {value === tz.value && (
                  <Check className="h-3.5 w-3.5 text-foreground shrink-0" />
                )}
              </button>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
