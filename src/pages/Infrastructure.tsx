import DashboardLayout from "@/components/layout/DashboardLayout";

const Infrastructure = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight">Infrastructure</h1>
        <p className="text-muted-foreground">Manage your infrastructure settings here.</p>
      </div>
    </DashboardLayout>
  );
};

export default Infrastructure;
