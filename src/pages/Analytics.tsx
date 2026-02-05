 import DashboardLayout from "@/components/layout/DashboardLayout";
 
 const Analytics = () => {
   return (
     <DashboardLayout>
       <div className="space-y-8">
         <div>
           <h1 className="text-2xl font-semibold tracking-tight text-foreground">
             Analytics
           </h1>
           <p className="mt-1 text-muted-foreground">
             Track your performance metrics.
           </p>
         </div>
 
         <div className="rounded-lg border border-border bg-card p-12">
           <div className="flex flex-col items-center justify-center text-center">
             <div className="h-16 w-16 rounded-full bg-muted" />
             <h3 className="mt-4 text-lg font-medium text-foreground">
               Analytics Dashboard
             </h3>
             <p className="mt-2 max-w-sm text-sm text-muted-foreground">
               Charts and detailed analytics will be displayed here.
             </p>
           </div>
         </div>
       </div>
     </DashboardLayout>
   );
 };
 
 export default Analytics;