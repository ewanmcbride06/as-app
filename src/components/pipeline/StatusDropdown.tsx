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
          className={cn(
            "inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-[10px] border bg-background hover:bg-muted/50 transition-colors",
            currentColor
          )}
        >
          <span
            className={cn(
              "w-2 h-2 rounded-full border-2",
              currentColor.replace("text-", "border-")
            )}
          />
          <span>{value}</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[160px] bg-background">
        {options.map((option) => {
          const optionColor = colorMap[option];
          return (
            <DropdownMenuItem
              key={option}
              onClick={() => onChange(option)}
              className={cn(
                "flex items-center gap-2 cursor-pointer",
                value === option && "bg-muted"
              )}
            >
              <span
                className={cn(
                  "w-2 h-2 rounded-full border-2",
                  optionColor.replace("text-", "border-")
                )}
              />
              <span className={optionColor.split(" ")[1]}>{option}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
