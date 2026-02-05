import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import ActivityList from "@/components/dashboard/ActivityList";
import { Users, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Overview
          </h1>
          <p className="mt-1 text-muted-foreground">
            Welcome back. Here's what's happening today.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value="12,459"
            change="+12% from last month"
            changeType="positive"
            icon={Users}
          />
          <StatCard
            title="Revenue"
            value="$48,294"
            change="+8% from last month"
            changeType="positive"
            icon={DollarSign}
          />
          <StatCard
            title="Orders"
            value="1,284"
            change="-3% from last month"
            changeType="negative"
            icon={ShoppingCart}
          />
          <StatCard
            title="Growth"
            value="+24%"
            change="On track"
            changeType="neutral"
            icon={TrendingUp}
          />
        </div>

        <ActivityList />
      </div>
    </DashboardLayout>
  );
};

export default Index;
