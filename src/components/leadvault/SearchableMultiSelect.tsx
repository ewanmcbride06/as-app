import { useState, useMemo, useRef } from "react";
import { Search, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SearchableMultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}

export default function SearchableMultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Search..."
}: SearchableMultiSelectProps) {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return options;
    const q = search.toLowerCase();
    return options.filter((opt) => opt.toLowerCase().includes(q));
  }, [search, options]);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const removeOption = (option: string) => {
    onChange(selected.filter((s) => s !== option));
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (containerRef.current?.contains(e.relatedTarget as Node)) return;
    setIsFocused(false);
  };

  return (
    <div className="px-4 pb-4 space-y-2" ref={containerRef} onBlur={handleBlur}>
      {/* Selected chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selected.map((item) => (
            <Badge
              key={item}
              variant="secondary"
              className="gap-1 text-xs pr-1"
            >
              {item}
              <button
                onClick={() => removeOption(item)}
                className="ml-0.5 rounded-full hover:bg-muted-foreground/20 p-0.5"
              >
                <X className="h-2.5 w-2.5" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          className="pl-8 h-8 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />
      </div>

      {/* Options list - only show when focused */}
      {isFocused && (
        <div className="max-h-[200px] overflow-y-auto scrollbar-hide -mx-4 border-t border-border">
          {filtered.length === 0 ? (
            <div className="px-4 py-3 text-center text-xs text-muted-foreground">
              No results found
            </div>
          ) : (
            filtered.map((option) => (
              <button
                key={option}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => toggleOption(option)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-4 py-1.5 text-left text-sm hover:bg-muted transition-colors",
                  selected.includes(option) && "bg-muted/50 font-medium"
                )}
              >
                <span className="flex-1 truncate">{option}</span>
                {selected.includes(option) && (
                  <Check className="h-3.5 w-3.5 text-foreground shrink-0" />
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
