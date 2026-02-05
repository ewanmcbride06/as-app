import { Link, useLocation } from "react-router-dom";
import { Settings, Users, Puzzle, ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.png";
import { Separator } from "@/components/ui/separator";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const settingsNavItems = [
  { name: "General", path: "/settings", icon: Settings },
  { name: "Team", path: "/settings/team", icon: Users },
  { name: "Integrations", path: "/settings/integrations", icon: Puzzle },
];

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col">
        <div className="p-4 flex items-center gap-3">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-8 w-8" />
          </Link>
          <Separator orientation="vertical" className="h-6" />
          <span className="text-sm font-semibold text-foreground">Settings</span>
        </div>
        
        <Separator />
        
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

        <div className="p-4 border-t border-border">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-[10px] hover:bg-muted transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
};

export default SettingsLayout;
