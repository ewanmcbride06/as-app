import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Upload, Download, Plus, User, Users, Building2, List, Settings, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface LeadVaultLayoutProps {
  children: ReactNode;
}

const navItems = [
  { label: "Contacts", icon: Users, path: "/leads" },
  { label: "Companies", icon: Building2, path: "/leads/companies" },
  { label: "Lists", icon: List, path: "/leads/lists" },
  { label: "Settings", icon: Settings, path: "/leads/settings" },
];

export default function LeadVaultLayout({ children }: LeadVaultLayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Header - Sticky */}
      <header className="sticky top-0 z-50 h-14 border-b bg-background flex items-center px-4 gap-4">
        {/* Logo */}
        <Link to="/leads" className="flex items-center gap-2 font-semibold text-lg shrink-0">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">LV</span>
          </div>
          <span>LeadVault</span>
        </Link>

        {/* Global Search */}
        <div className="flex-1 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, domain, or title..."
              className="pl-9 h-9 bg-muted/50"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline" size="sm" className="gap-2">
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Create List
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 ml-2">
                <Avatar className="h-7 w-7">
                  <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=JD" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Account Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Left Navigation */}
        <nav className="w-48 border-r bg-muted/30 p-3 shrink-0">
          <div className="space-y-1">
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
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
