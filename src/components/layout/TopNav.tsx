import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Settings, UserPlus, LogOut, Building2 } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import logo from "@/assets/logo.png";

const navItems = [
  { name: "Analytics", path: "/" },
  { name: "Pipeline", path: "/pipeline" },
  { name: "Campaigns", path: "/campaigns" },
  { name: "Infrastructure", path: "/infrastructure" },
  { name: "Engagement", path: "/engagement" },
  { name: "Personas", path: "/personas" },
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
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);

  return (
    <>
      <nav className="border-b border-border bg-card">
        <div className="px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center">
                <img src={logo} alt="Logo" className="h-8 w-8" />
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
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
              <Button variant="default" size="sm">
                Documentation
              </Button>
              
              {/* Company Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 transition-colors hover:bg-muted focus:outline-none">
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-foreground text-xs font-medium text-background">
                    {currentCompany.initials}
                  </div>
                  <span className="text-sm font-medium">{currentCompany.name}</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Switch company</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {companies.map((company) => (
                    <DropdownMenuItem
                      key={company.id}
                      onClick={() => setCurrentCompany(company)}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <div className="flex h-6 w-6 items-center justify-center rounded bg-foreground text-xs font-medium text-background">
                        {company.initials}
                      </div>
                      <span className="flex-1 text-sm font-medium">{company.name}</span>
                      {currentCompany.id === company.id && (
                        <div className="h-2 w-2 rounded-full bg-foreground" />
                      )}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-muted-foreground">
                    <Building2 className="h-4 w-4 mr-2" />
                    Add company
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-3 rounded-full bg-muted px-3 py-1.5 transition-colors hover:bg-muted/80 focus:outline-none">
                  <span className="text-sm font-medium text-foreground">Benjamin Loki</span>
                  <div className="h-8 w-8 overflow-hidden rounded-full bg-muted-foreground">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" 
                      alt="Profile" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => setSettingsOpen(true)}
                    className="cursor-pointer"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setInviteOpen(true)}
                    className="cursor-pointer"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invite Team
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-muted-foreground">
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Settings Dialog */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground">Account and application settings will go here.</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Invite Team Dialog */}
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Invite Team</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground">Team invitation functionality will go here.</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TopNav;
