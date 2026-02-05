 import DashboardLayout from "@/components/layout/DashboardLayout";
 
 const Settings = () => {
   return (
     <DashboardLayout>
       <div className="space-y-8">
         <div>
           <h1 className="text-2xl font-semibold tracking-tight text-foreground">
             Settings
           </h1>
           <p className="mt-1 text-muted-foreground">
             Manage your preferences.
           </p>
         </div>
 
         <div className="space-y-6">
           <div className="rounded-lg border border-border bg-card p-6">
             <h3 className="text-lg font-medium text-foreground">Profile</h3>
             <p className="mt-1 text-sm text-muted-foreground">
               Update your personal information.
             </p>
             <div className="mt-6 space-y-4">
               <div>
                 <label className="text-sm font-medium text-foreground">Name</label>
                 <input
                   type="text"
                   className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                   placeholder="Your name"
                 />
               </div>
               <div>
                 <label className="text-sm font-medium text-foreground">Email</label>
                 <input
                   type="email"
                   className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                   placeholder="you@example.com"
                 />
               </div>
             </div>
           </div>
 
           <div className="rounded-lg border border-border bg-card p-6">
             <h3 className="text-lg font-medium text-foreground">Notifications</h3>
             <p className="mt-1 text-sm text-muted-foreground">
               Configure how you receive notifications.
             </p>
             <div className="mt-6 space-y-4">
               <div className="flex items-center justify-between">
                 <div>
                   <p className="text-sm font-medium text-foreground">Email notifications</p>
                   <p className="text-sm text-muted-foreground">Receive emails about activity</p>
                 </div>
                 <button className="h-6 w-11 rounded-full bg-foreground p-0.5">
                   <span className="block h-5 w-5 translate-x-5 rounded-full bg-background transition-transform" />
                 </button>
               </div>
               <div className="flex items-center justify-between">
                 <div>
                   <p className="text-sm font-medium text-foreground">Push notifications</p>
                   <p className="text-sm text-muted-foreground">Receive push notifications</p>
                 </div>
                 <button className="h-6 w-11 rounded-full bg-muted p-0.5">
                   <span className="block h-5 w-5 rounded-full bg-foreground transition-transform" />
                 </button>
               </div>
             </div>
           </div>
         </div>
       </div>
     </DashboardLayout>
   );
 };
 
 export default Settings;