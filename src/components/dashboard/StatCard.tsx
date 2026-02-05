 import { LucideIcon } from "lucide-react";
 
 interface StatCardProps {
   title: string;
   value: string;
   change?: string;
   changeType?: "positive" | "negative" | "neutral";
   icon: LucideIcon;
 }
 
 const StatCard = ({ title, value, change, changeType = "neutral", icon: Icon }: StatCardProps) => {
   const changeColor = {
     positive: "text-foreground",
     negative: "text-muted-foreground",
     neutral: "text-muted-foreground",
   };
 
   return (
     <div className="stat-card">
       <div className="flex items-center justify-between">
         <p className="text-sm font-medium text-muted-foreground">{title}</p>
         <Icon className="h-5 w-5 text-muted-foreground" />
       </div>
       <div className="mt-4">
         <p className="text-3xl font-semibold tracking-tight text-foreground">{value}</p>
         {change && (
           <p className={`mt-1 text-sm ${changeColor[changeType]}`}>
             {change}
           </p>
         )}
       </div>
     </div>
   );
 };
 
 export default StatCard;