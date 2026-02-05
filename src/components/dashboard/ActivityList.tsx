 const activities = [
   { id: 1, action: "New user registered", time: "2 minutes ago" },
   { id: 2, action: "Report generated", time: "15 minutes ago" },
   { id: 3, action: "Settings updated", time: "1 hour ago" },
   { id: 4, action: "New order received", time: "2 hours ago" },
   { id: 5, action: "Payment processed", time: "3 hours ago" },
 ];
 
 const ActivityList = () => {
   return (
     <div className="rounded-lg border border-border bg-card">
       <div className="border-b border-border px-6 py-4">
         <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
       </div>
       <div className="divide-y divide-border">
         {activities.map((activity) => (
           <div
             key={activity.id}
             className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-muted/50"
           >
             <p className="text-sm text-foreground">{activity.action}</p>
             <p className="text-sm text-muted-foreground">{activity.time}</p>
           </div>
         ))}
       </div>
     </div>
   );
 };
 
 export default ActivityList;