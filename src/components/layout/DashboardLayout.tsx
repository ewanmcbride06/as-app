import TopNav from "./TopNav";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <TopNav />
      <main className="flex-1 px-6 lg:px-12 xl:px-16 overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
