import { Link, useLocation } from "react-router-dom";
import { Users, Building2, List, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Contacts", icon: Users, path: "/leads" },
  { label: "Companies", icon: Building2, path: "/leads/companies" },
  { label: "Lists", icon: List, path: "/leads/lists" },
  { label: "Settings", icon: Settings, path: "/leads/settings" },
];

export default function LeadVaultNav() {
  const location = useLocation();

  return (
    <div className="flex shrink-0 items-center gap-1 border-b">
      {navItems.map((item) => {
        const isActive = 
          item.path === "/leads" 
            ? location.pathname === "/leads" || location.pathname.startsWith("/leads/contacts")
            : location.pathname.startsWith(item.path);
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-[2px] transition-colors",
              isActive
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/50"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
