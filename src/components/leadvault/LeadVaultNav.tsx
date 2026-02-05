import { Link, useLocation } from "react-router-dom";
import { Database, List } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Database", icon: Database, path: "/leads" },
  { label: "Lists", icon: List, path: "/leads/lists" },
];

export default function LeadVaultNav() {
  const location = useLocation();

  return (
    <div className="shrink-0 border-b">
      <div className="flex items-center gap-1">
        {navItems.map((item) => {
          const isActive = 
            item.path === "/leads" 
              ? location.pathname === "/leads" || location.pathname.startsWith("/leads/contacts") || location.pathname.startsWith("/leads/companies")
              : location.pathname.startsWith(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "shrink-0 flex items-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 text-sm font-medium border-b-2 -mb-[2px] transition-colors whitespace-nowrap",
                isActive
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/50"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
