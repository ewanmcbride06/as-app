import TopNav from "./TopNav";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="px-6 py-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
