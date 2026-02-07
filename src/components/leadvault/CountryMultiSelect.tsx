import { useState, useMemo, useRef } from "react";
import { Search, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { countries, type Country } from "./countries";

interface CountryMultiSelectProps {
  selected: string[];
  onChange: (selected: string[]) => void;
}

export default function CountryMultiSelect({ selected, onChange }: CountryMultiSelectProps) {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return countries;
    const q = search.toLowerCase();
    return countries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q)
    );
  }, [search]);

  const toggleCountry = (name: string) => {
    if (selected.includes(name)) {
      onChange(selected.filter((s) => s !== name));
    } else {
      onChange([...selected, name]);
    }
  };

  const removeCountry = (name: string) => {
    onChange(selected.filter((s) => s !== name));
  };

  const selectedCountries = selected
    .map((name) => countries.find((c) => c.name === name))
    .filter(Boolean) as Country[];

  const handleBlur = (e: React.FocusEvent) => {
    // Don't close if focus moves within the container
    if (containerRef.current?.contains(e.relatedTarget as Node)) return;
    setIsFocused(false);
  };

  return (
    <div className="p-[10px] space-y-2" ref={containerRef} onBlur={handleBlur}>
      {/* Selected chips */}
      {selectedCountries.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selectedCountries.map((c) => (
            <Badge
              key={c.code}
              variant="secondary"
              className="gap-1 text-xs pr-1"
            >
              <span className="text-sm leading-none">{c.flag}</span>
              {c.name}
              <button
                onClick={() => removeCountry(c.name)}
                className="ml-0.5 rounded-full hover:bg-muted-foreground/20 p-0.5"
              >
                <X className="h-2.5 w-2.5" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Search + dropdown container */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search countries..."
            className="pl-8 h-8 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
          />
        </div>

        {/* Country list - positioned as dropdown menu */}
        {isFocused && (
          <div className="absolute left-0 right-0 top-full mt-[10px] z-50 max-h-[200px] overflow-y-auto scrollbar-hide rounded-[10px] border border-border bg-popover shadow-md">
            {filtered.length === 0 ? (
              <div className="px-3 py-3 text-center text-xs text-muted-foreground">
                No countries found
              </div>
            ) : (
              filtered.map((country) => (
                <button
                  key={country.code}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => toggleCountry(country.name)}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 py-1.5 text-left text-sm hover:bg-muted transition-colors",
                    selected.includes(country.name) && "bg-muted/50 font-medium"
                  )}
                >
                  <span className="text-base leading-none">{country.flag}</span>
                  <span className="flex-1 truncate">{country.name}</span>
                  {selected.includes(country.name) && (
                    <Check className="h-3.5 w-3.5 text-foreground shrink-0" />
                  )}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
