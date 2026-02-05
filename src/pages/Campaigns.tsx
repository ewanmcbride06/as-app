import DashboardLayout from "@/components/layout/DashboardLayout";

const Campaigns = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight">Campaigns</h1>
        <p className="text-muted-foreground">Create and manage your campaigns here.</p>
      </div>
    </DashboardLayout>
  );
};

export default Campaigns;
