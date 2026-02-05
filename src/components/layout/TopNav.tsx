 import { Link, useLocation } from "react-router-dom";
 import { LayoutDashboard, BarChart3, Settings, Users } from "lucide-react";
 
 const navItems = [
   { name: "Dashboard", path: "/", icon: LayoutDashboard },
   { name: "Analytics", path: "/analytics", icon: BarChart3 },
   { name: "Users", path: "/users", icon: Users },
   { name: "Settings", path: "/settings", icon: Settings },
 ];
 
 const TopNav = () => {
   const location = useLocation();
 
   return (
     <nav className="border-b border-border bg-card">
       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
         <div className="flex h-16 items-center justify-between">
           <div className="flex items-center gap-8">
             <Link to="/" className="flex items-center gap-2">
               <div className="h-8 w-8 rounded-lg bg-foreground" />
               <span className="text-lg font-semibold tracking-tight text-foreground">
                 Dashboard
               </span>
             </Link>
             <div className="hidden md:flex md:items-center md:gap-1">
               {navItems.map((item) => {
                 const isActive = location.pathname === item.path;
                 return (
                   <Link
                     key={item.name}
                     to={item.path}
                     className={`nav-link flex items-center gap-2 ${
                       isActive ? "nav-link-active" : ""
                     }`}
                   >
                     <item.icon className="h-4 w-4" />
                     {item.name}
                   </Link>
                 );
               })}
             </div>
           </div>
           <div className="flex items-center gap-4">
             <div className="h-8 w-8 rounded-full bg-muted" />
           </div>
         </div>
       </div>
     </nav>
   );
 };
 
 export default TopNav;