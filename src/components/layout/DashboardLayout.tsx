import TopNav from "./TopNav";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  isExpanded?: boolean;
}

const DashboardLayout = ({ children, isExpanded = false }: DashboardLayoutProps) => {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <TopNav />
      <main className={cn(
        "flex-1 overflow-hidden transition-all duration-300 ease-out",
        isExpanded ? "px-0 pt-0" : "px-[50px] pt-[100px]"
      )}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
