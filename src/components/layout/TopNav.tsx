import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, BarChart3, Settings, Users, ChevronDown, Check } from "lucide-react";
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

const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Analytics", path: "/analytics", icon: BarChart3 },
  { name: "Users", path: "/users", icon: Users },
  { name: "Settings", path: "/settings", icon: Settings },
];

const profiles = [
  { id: 1, name: "Alex Morgan", email: "alex@example.com", initials: "AM" },
  { id: 2, name: "Jordan Lee", email: "jordan@example.com", initials: "JL" },
  { id: 3, name: "Sam Wilson", email: "sam@example.com", initials: "SW" },
];

const TopNav = () => {
  const location = useLocation();
  const [currentProfile, setCurrentProfile] = useState(profiles[0]);

  return (
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
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="default" size="sm">
              Documentation
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted focus:outline-none">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-xs font-medium text-background">
                  {currentProfile.initials}
                </div>
                <div className="hidden text-left sm:block">
                  <p className="text-sm font-medium text-foreground">{currentProfile.name}</p>
                  <p className="text-xs text-muted-foreground">{currentProfile.email}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Switch profile</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {profiles.map((profile) => (
                  <DropdownMenuItem
                    key={profile.id}
                    onClick={() => setCurrentProfile(profile)}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-xs font-medium text-background">
                      {profile.initials}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{profile.name}</p>
                      <p className="text-xs text-muted-foreground">{profile.email}</p>
                    </div>
                    {currentProfile.id === profile.id && (
                      <Check className="h-4 w-4 text-foreground" />
                    )}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-muted-foreground">
                  Add another account
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
