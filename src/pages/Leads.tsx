import DashboardLayout from "@/components/layout/DashboardLayout";

const Leads = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight">Leads</h1>
        <p className="text-muted-foreground">View and manage your leads here.</p>
      </div>
    </DashboardLayout>
  );
};

export default Leads;
