import DashboardLayout from "@/components/layout/DashboardLayout";

const Personas = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight">Personas</h1>
        <p className="text-muted-foreground">Define and manage your target personas here.</p>
      </div>
    </DashboardLayout>
  );
};

export default Personas;
