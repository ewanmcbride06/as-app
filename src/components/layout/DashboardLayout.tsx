 import TopNav from "./TopNav";
 
 interface DashboardLayoutProps {
   children: React.ReactNode;
 }
 
 const DashboardLayout = ({ children }: DashboardLayoutProps) => {
   return (
     <div className="dashboard-container">
       <TopNav />
       <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
         {children}
       </main>
     </div>
   );
 };
 
 export default DashboardLayout;