import DashboardLayout from "@/components/layout/DashboardLayout";

const Pipeline = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight">Pipeline</h1>
        <p className="text-muted-foreground">Manage your sales pipeline here.</p>
      </div>
    </DashboardLayout>
  );
};

export default Pipeline;
