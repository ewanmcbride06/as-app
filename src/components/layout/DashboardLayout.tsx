 import TopNav from "./TopNav";
 
 interface DashboardLayoutProps {
   children: React.ReactNode;
 }
 
const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="dashboard-container">
      <TopNav />
      <main className="px-6 py-8 lg:px-8">
        {children}
      </main>
    </div>
  );
};
 
 export default DashboardLayout;