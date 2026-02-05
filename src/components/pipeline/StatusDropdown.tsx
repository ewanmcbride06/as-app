import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface StatusDropdownProps<T extends string> {
  value: T;
  options: T[];
  colorMap: Record<T, string>;
  onChange: (value: T) => void;
}

export function StatusDropdown<T extends string>({
  value,
  options,
  colorMap,
  onChange,
}: StatusDropdownProps<T>) {
  const currentColor = colorMap[value];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-[10px] border border-border bg-background hover:bg-muted/50 transition-colors"
        >
          <span
            className={cn(
              "w-2 h-2 rounded-full",
              currentColor
            )}
          />
          <span className="text-foreground">{value}</span>
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[180px]">
        {options.map((option) => {
          const optionColor = colorMap[option];
          return (
            <DropdownMenuItem
              key={option}
              onClick={() => onChange(option)}
              className={cn(
                "flex items-center gap-2 cursor-pointer text-sm",
                value === option && "bg-muted"
              )}
            >
              <span
                className={cn(
                  "w-2 h-2 rounded-full",
                  optionColor
                )}
              />
              <span>{option}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
