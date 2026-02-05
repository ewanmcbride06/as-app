import { Link, useLocation } from "react-router-dom";
import { Settings, Users, Puzzle, ArrowLeft, ChevronDown, Building2 } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const settingsNavItems = [
  { name: "Settings", path: "/settings", icon: Settings },
  { name: "Team", path: "/settings/team", icon: Users },
  { name: "Integrations", path: "/settings/integrations", icon: Puzzle },
];

const companies = [
  { id: 1, name: "Acme Corp", initials: "AC" },
  { id: 2, name: "TechStart Inc", initials: "TS" },
  { id: 3, name: "Global Systems", initials: "GS" },
];

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  const location = useLocation();
  const [currentCompany, setCurrentCompany] = useState(companies[0]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center">
                <img src={logo} alt="Logo" className="h-8 w-8" />
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <span className="text-sm font-semibold text-foreground">Settings</span>
            </div>
            <div className="flex items-center gap-3">
              {/* Company Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 rounded-[10px] border border-border px-3 py-1.5 transition-colors hover:bg-muted focus:outline-none">
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
                  <DropdownMenuItem className="cursor-pointer text-muted-foreground rounded-[6px]">
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-card flex flex-col">
          <div className="p-4 border-b border-border">
            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-[10px] hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {settingsNavItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-[10px] transition-colors ${
                    isActive
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SettingsLayout;
