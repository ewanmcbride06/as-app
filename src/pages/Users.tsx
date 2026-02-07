 
 
 const users = [
   { id: 1, name: "Alex Morgan", email: "alex@example.com", role: "Admin", status: "Active" },
   { id: 2, name: "Jordan Lee", email: "jordan@example.com", role: "Editor", status: "Active" },
   { id: 3, name: "Sam Wilson", email: "sam@example.com", role: "Viewer", status: "Inactive" },
   { id: 4, name: "Taylor Swift", email: "taylor@example.com", role: "Editor", status: "Active" },
   { id: 5, name: "Casey Jones", email: "casey@example.com", role: "Viewer", status: "Active" },
 ];
 
 const Users = () => {
   return (
     <>
       <div className="space-y-8">
         <div>
           <h1 className="text-2xl font-semibold tracking-tight text-foreground">
             Users
           </h1>
           <p className="mt-1 text-muted-foreground">
             Manage your team members.
           </p>
         </div>
 
         <div className="rounded-lg border border-border bg-card overflow-hidden">
           <table className="w-full">
             <thead className="border-b border-border bg-muted/50">
               <tr>
                 <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                   Name
                 </th>
                 <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                   Email
                 </th>
                 <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                   Role
                 </th>
                 <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                   Status
                 </th>
               </tr>
             </thead>
             <tbody className="divide-y divide-border">
               {users.map((user) => (
                 <tr key={user.id} className="transition-colors hover:bg-muted/50">
                   <td className="px-6 py-4 text-sm font-medium text-foreground">
                     {user.name}
                   </td>
                   <td className="px-6 py-4 text-sm text-muted-foreground">
                     {user.email}
                   </td>
                   <td className="px-6 py-4 text-sm text-muted-foreground">
                     {user.role}
                   </td>
                   <td className="px-6 py-4 text-sm">
                     <span
                       className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                         user.status === "Active"
                           ? "bg-foreground text-background"
                           : "bg-muted text-muted-foreground"
                       }`}
                     >
                       {user.status}
                     </span>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       </div>
     </>
   );
 };
 
 export default Users;