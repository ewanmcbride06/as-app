import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Building2, Sparkles } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import logo from "@/assets/logo.png";
import { Settings, UserPlus, LogOut } from "lucide-react";

const navItems = [
  { name: "Analytics", path: "/" },
  { name: "Pipeline", path: "/pipeline" },
  { name: "Campaigns", path: "/campaigns" },
  { name: "Infrastructure", path: "/infrastructure" },
  { name: "Engagement", path: "/engagement" },
  
  { name: "Leads", path: "/leads" },
];

const companies = [
  { id: 1, name: "Acme Corp", initials: "AC" },
  { id: 2, name: "TechStart Inc", initials: "TS" },
  { id: 3, name: "Global Systems", initials: "GS" },
];

const TopNav = () => {
  const location = useLocation();
  const [currentCompany, setCurrentCompany] = useState(companies[0]);

  return (
    <nav className="border-b border-border bg-card">
      <div className="px-6">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Logo" className="h-8 w-8" />
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = item.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`nav-tab flex items-center gap-2 ${
                      isActive ? "nav-tab-active" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex h-9 items-center rounded-[10px] border border-border bg-background px-3 text-sm font-medium transition-colors hover:bg-muted">
              Documentation
            </button>
            
            {/* Company Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex h-9 items-center gap-2 rounded-[10px] border border-border bg-background px-3 text-sm font-medium transition-colors hover:bg-muted focus:outline-none">
                <div className="flex h-6 w-6 items-center justify-center rounded-[6px] bg-foreground text-xs font-medium text-background">
                  {currentCompany.initials}
                </div>
                <span className="text-sm font-medium">{currentCompany.name}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-[10px]">
                <DropdownMenuLabel>Switch company</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {companies.map((company) => (
                  <DropdownMenuItem
                    key={company.id}
                    onClick={() => setCurrentCompany(company)}
                    className="flex items-center gap-3 cursor-pointer rounded-[6px]"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-[6px] bg-foreground text-xs font-medium text-background">
                      {company.initials}
                    </div>
                    <span className="flex-1 text-sm font-medium">{company.name}</span>
                    {currentCompany.id === company.id && (
                      <div className="h-2 w-2 rounded-full bg-foreground" />
                    )}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-muted-foreground rounded-[6px]">
                  <Building2 className="h-4 w-4 mr-2" />
                  Add company
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex h-[38px] items-center gap-2 overflow-hidden rounded-[10px] bg-muted pl-3 transition-colors hover:bg-muted/80 focus:outline-none">
                <span className="text-sm font-medium text-foreground">Benjamin Loki</span>
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" 
                  alt="Profile" 
                  className="h-full w-auto rounded-[10px] object-cover"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-[10px]">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer rounded-[6px]">
                  <Link to="/settings">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer rounded-[6px]">
                  <Link to="/settings/team">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invite Team
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-muted-foreground rounded-[6px]">
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
